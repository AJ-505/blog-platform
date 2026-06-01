import { db } from "@/db";
import { comments, users } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export async function getCommentsForPost(postId: number) {
  return db
    .select({
      id: comments.id,
      postId: comments.postId,
      authorId: comments.authorId,
      author: users.name,
      content: comments.content,
      createdAt: comments.createdAt,
    })
    .from(comments)
    .innerJoin(users, eq(comments.authorId, users.username))
    .where(eq(comments.postId, postId))
    .orderBy(asc(comments.createdAt));
}
