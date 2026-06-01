import { db } from "@/db";
import { posts, users } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";

export async function getDiscoverPosts() {
  return db
    .select({
      id: posts.id,
      authorId: posts.authorId,
      author: users.name,
      slug: posts.slug,
      title: posts.title,
      excerpt: posts.excerpt,
      badge: posts.badge,
      imageKey: posts.imageKey,
      likes: posts.likes,
      comments: posts.commentCount,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .innerJoin(users, eq(posts.authorId, users.username))
    .where(eq(posts.isDiscover, 1))
    .orderBy(desc(posts.createdAt));
}

export async function getPostBySlug(slug: string) {
  const [post] = await db
    .select({
      id: posts.id,
      authorId: posts.authorId,
      author: users.name,
      slug: posts.slug,
      title: posts.title,
      excerpt: posts.excerpt,
      content: posts.content,
      badge: posts.badge,
      imageKey: posts.imageKey,
      likes: posts.likes,
      comments: posts.commentCount,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
    })
    .from(posts)
    .innerJoin(users, eq(posts.authorId, users.username))
    .where(and(eq(posts.slug, slug), eq(posts.isDiscover, 1)))
    .limit(1);

  return post;
}
