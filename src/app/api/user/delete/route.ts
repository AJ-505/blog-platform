import { z } from "zod";
import bcrypt from "bcryptjs";
import { eq, inArray, or } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { comments, follows, posts, users } from "@/db/schema";
import { getCurrentUser, SESSION_COOKIE } from "@/lib/server-auth";

const DeleteAccountSchema = z.object({
  password: z.string().min(1, { message: "Password is required" }),
});

export async function POST(req: Request) {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const result = DeleteAccountSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { password } = result.data;

  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, session.username));

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Require the account password to confirm an irreversible deletion.
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 403 },
      );
    }

    // Remove dependent rows explicitly so deletion is correct even if the
    // database connection isn't enforcing foreign keys. Order matters: clear
    // comments before the posts they belong to, then the posts themselves.
    const ownedPosts = await db
      .select({ id: posts.id })
      .from(posts)
      .where(eq(posts.authorId, session.username));
    const ownedPostIds = ownedPosts.map((post) => post.id);

    if (ownedPostIds.length > 0) {
      await db.delete(comments).where(inArray(comments.postId, ownedPostIds));
    }

    await db.delete(comments).where(eq(comments.authorId, session.username));
    await db
      .delete(follows)
      .where(
        or(
          eq(follows.followerId, session.username),
          eq(follows.followingId, session.username),
        ),
      );
    await db.delete(posts).where(eq(posts.authorId, session.username));
    await db.delete(users).where(eq(users.username, session.username));

    const response = NextResponse.json({ message: "Account deleted" });

    response.cookies.set(SESSION_COOKIE, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (err) {
    console.error("POST /api/user/delete failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
