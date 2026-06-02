import { db } from "@/db";
import { postLikes, posts } from "@/db/schema";
import { getCurrentUser } from "@/lib/server-auth";
import { z } from "zod";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

const likeSchema = z.object({
  postId: z.number().int().positive(),
});

async function readPostId(req: Request) {
  let body;

  try {
    body = await req.json();
  } catch {
    return { error: "Invalid or missing JSON body", status: 400 as const };
  }

  const result = likeSchema.safeParse(body);

  if (!result.success) {
    return { error: "Invalid input", status: 400 as const };
  }

  return { postId: result.data.postId };
}

export async function POST(req: Request) {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json({ error: "Sign in to like" }, { status: 401 });
  }

  const parsed = await readPostId(req);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }

  const { postId } = parsed;
  const userId = session.username;

  try {
    // the target post must actually exist
    const [target] = await db
      .select({ id: posts.id })
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1);

    if (!target) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // prevent duplicate like (idempotent: treat as success, don't double-count)
    const [existing] = await db
      .select({ postId: postLikes.postId })
      .from(postLikes)
      .where(and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)))
      .limit(1);

    if (existing) {
      return NextResponse.json(
        { message: "Already liked this post" },
        { status: 200 },
      );
    }

    // Record the like and bump the denormalised counter together so the two
    // never drift apart.
    await db.transaction(async (tx) => {
      await tx.insert(postLikes).values({ postId, userId });
      await tx
        .update(posts)
        .set({ likes: sql`${posts.likes} + 1` })
        .where(eq(posts.id, postId));
    });

    return NextResponse.json(
      { message: "Post liked successfully" },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /api/like-post failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json({ error: "Sign in to unlike" }, { status: 401 });
  }

  const parsed = await readPostId(req);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }

  const { postId } = parsed;
  const userId = session.username;

  try {
    // Only decrement when a like row was actually removed, so repeated unlikes
    // (or unliking something never liked) can't drive the counter negative.
    const removed = await db.transaction(async (tx) => {
      const deleted = await tx
        .delete(postLikes)
        .where(and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)))
        .returning({ postId: postLikes.postId });

      if (deleted.length === 0) {
        return false;
      }

      await tx
        .update(posts)
        .set({ likes: sql`max(${posts.likes} - 1, 0)` })
        .where(eq(posts.id, postId));

      return true;
    });

    return NextResponse.json(
      {
        message: removed
          ? "Post unliked successfully"
          : "Post was not liked",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("DELETE /api/like-post failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
