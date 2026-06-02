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
    .where(and(eq(posts.isDiscover, 1), eq(posts.status, "published")))
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
    .where(
      and(
        eq(posts.slug, slug),
        eq(posts.isDiscover, 1),
        eq(posts.status, "published"),
      ),
    )
    .limit(1);

  return post;
}

// Load a draft (or any post) owned by `authorId` so it can be reopened in the
// studio editor. Restricted to the owner so drafts stay private.
export async function getDraftForEditor(id: number, authorId: string) {
  const [draft] = await db
    .select({
      id: posts.id,
      authorId: posts.authorId,
      slug: posts.slug,
      title: posts.title,
      excerpt: posts.excerpt,
      content: posts.content,
      badge: posts.badge,
      imageKey: posts.imageKey,
      status: posts.status,
    })
    .from(posts)
    .where(and(eq(posts.id, id), eq(posts.authorId, authorId)))
    .limit(1);

  return draft;
}
