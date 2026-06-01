import { db } from "@/db";
import { comments, posts, users } from "@/db/schema";
import { getCommentsForPost } from "@/lib/comments";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const commentsSchema = z.object({
  postId: z.coerce.number().int().positive(),
});

const createCommentSchema = commentsSchema.extend({
  content: z.string().trim().min(1).max(1000),
  authorId: z.string().trim().min(1).default("campus-reader"),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const result = commentsSchema.safeParse({
    postId: searchParams.get("postId"),
  });

  if (!result.success) {
    return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
  }

  try {
    const postComments = await getCommentsForPost(result.data.postId);
    return NextResponse.json({ comments: postComments }, { status: 200 });
  } catch (err) {
    console.error("GET /api/comments failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  let body;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid or missing JSON body" },
      { status: 400 },
    );
  }

  const result = createCommentSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { postId, authorId, content } = result.data;

  try {
    await db
      .insert(users)
      .values({
        username: authorId,
        name: authorId === "campus-reader" ? "Campus Reader" : authorId,
        email: `${authorId}@comments.local`,
        passwordHash: "comment-user",
      })
      .onConflictDoNothing();

    const [post] = await db
      .select({ id: posts.id, commentCount: posts.commentCount })
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const [comment] = await db
      .insert(comments)
      .values({ postId, authorId, content })
      .returning();

    await db
      .update(posts)
      .set({ commentCount: post.commentCount + 1 })
      .where(eq(posts.id, postId));

    return NextResponse.json({ comment }, { status: 201 });
  } catch (err) {
    console.error("POST /api/comments failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
