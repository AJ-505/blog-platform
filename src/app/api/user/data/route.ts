import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { comments, follows, posts, users } from "@/db/schema";
import { getCurrentUser } from "@/lib/server-auth";

// Substack-style "download your data": returns everything tied to the account
// as a single JSON file. Password hash is never included.
export async function GET() {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const [account] = await db
      .select({
        username: users.username,
        name: users.name,
        email: users.email,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.username, session.username));

    if (!account) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // The libsql client is queried sequentially throughout this codebase;
    // concurrent statements on the connection are not reliable.
    const authoredPosts = await db
      .select()
      .from(posts)
      .where(eq(posts.authorId, session.username));
    const authoredComments = await db
      .select()
      .from(comments)
      .where(eq(comments.authorId, session.username));
    const following = await db
      .select({ username: follows.followingId, since: follows.createdAt })
      .from(follows)
      .where(eq(follows.followerId, session.username));
    const followers = await db
      .select({ username: follows.followerId, since: follows.createdAt })
      .from(follows)
      .where(eq(follows.followingId, session.username));

    const exportPayload = {
      exportedAt: new Date().toISOString(),
      account,
      posts: authoredPosts,
      comments: authoredComments,
      following,
      followers,
    };

    return new NextResponse(JSON.stringify(exportPayload, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="scribbled-${account.username}-data.json"`,
      },
    });
  } catch (err) {
    console.error("GET /api/user/data failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
