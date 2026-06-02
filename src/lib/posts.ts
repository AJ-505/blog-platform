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
    .where(and(eq(posts.slug, slug), eq(posts.status, "published")))
    .limit(1);

  return post;
}

// Every published post for the public `/feed` view, newest first. Unlike the
// discover query this is not scoped to `isDiscover`: the feed is the full firehose
// of campus posts. Category filtering happens in the page from each post's badge.
export async function getFeedPosts() {
  return db
    .select({
      id: posts.id,
      author: users.name,
      slug: posts.slug,
      title: posts.title,
      excerpt: posts.excerpt,
      badge: posts.badge,
      likes: posts.likes,
      comments: posts.commentCount,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .innerJoin(users, eq(posts.authorId, users.username))
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.createdAt));
}

// Every post owned by `authorId` (drafts and published), newest first, for the
// "Manage your blogs" studio view. Scoped to the owner so creators only ever
// see and act on their own work.
export async function getPostsByAuthor(authorId: string) {
  return db
    .select({
      id: posts.id,
      slug: posts.slug,
      title: posts.title,
      excerpt: posts.excerpt,
      badge: posts.badge,
      imageKey: posts.imageKey,
      likes: posts.likes,
      comments: posts.commentCount,
      status: posts.status,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
    })
    .from(posts)
    .where(eq(posts.authorId, authorId))
    .orderBy(desc(posts.createdAt));
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
