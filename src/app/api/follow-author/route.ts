import { db } from "@/db";
import { follows, users } from "@/db/schema";
import { getCurrentUser } from "@/lib/server-auth";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const followSchema = z.object({
  followingId: z.string().trim().min(1),
});

async function readFollowingId(req: Request) {
  let body;

  try {
    body = await req.json();
  } catch {
    return { error: "Invalid or missing JSON body", status: 400 as const };
  }

  const result = followSchema.safeParse(body);

  if (!result.success) {
    return { error: "Invalid input", status: 400 as const };
  }

  return { followingId: result.data.followingId };
}

export async function POST(req: Request) {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json({ error: "Sign in to follow" }, { status: 401 });
  }

  const parsed = await readFollowingId(req);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }

  const { followingId } = parsed;
  const followerId = session.username;

  // prevent self-follow
  if (followerId === followingId) {
    return NextResponse.json(
      { error: "You cannot follow yourself" },
      { status: 400 },
    );
  }

  try {
    // the target author must actually exist
    const [target] = await db
      .select({ username: users.username })
      .from(users)
      .where(eq(users.username, followingId))
      .limit(1);

    if (!target) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // prevent duplicate follow (idempotent: treat as success)
    const [existing] = await db
      .select({ followerId: follows.followerId })
      .from(follows)
      .where(
        and(
          eq(follows.followerId, followerId),
          eq(follows.followingId, followingId),
        ),
      )
      .limit(1);

    if (existing) {
      return NextResponse.json(
        { message: "Already following this user" },
        { status: 200 },
      );
    }

    await db.insert(follows).values({ followerId, followingId });

    return NextResponse.json(
      { message: "Author followed successfully" },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /api/follow-author failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json({ error: "Sign in to unfollow" }, { status: 401 });
  }

  const parsed = await readFollowingId(req);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }

  try {
    await db
      .delete(follows)
      .where(
        and(
          eq(follows.followerId, session.username),
          eq(follows.followingId, parsed.followingId),
        ),
      );

    return NextResponse.json(
      { message: "Author unfollowed successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.error("DELETE /api/follow-author failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
