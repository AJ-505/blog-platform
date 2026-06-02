import { db } from "@/db";
import { follows, posts, users } from "@/db/schema";
import { and, desc, eq, sql } from "drizzle-orm";

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

export async function getStudioDashboard(authorId: string) {
  const [totals] = await db
    .select({
      totalPosts: sql<number>`count(*)`,
      publishedPosts: sql<number>`sum(case when ${posts.status} = 'published' then 1 else 0 end)`,
      draftPosts: sql<number>`sum(case when ${posts.status} = 'draft' then 1 else 0 end)`,
      totalLikes: sql<number>`coalesce(sum(${posts.likes}), 0)`,
      totalComments: sql<number>`coalesce(sum(${posts.commentCount}), 0)`,
    })
    .from(posts)
    .where(eq(posts.authorId, authorId));

  const [followers] = await db
    .select({ count: sql<number>`count(*)` })
    .from(follows)
    .where(eq(follows.followingId, authorId));

  const topPosts = await db
    .select({
      id: posts.id,
      slug: posts.slug,
      title: posts.title,
      excerpt: posts.excerpt,
      badge: posts.badge,
      likes: posts.likes,
      comments: posts.commentCount,
      status: posts.status,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
    })
    .from(posts)
    .where(eq(posts.authorId, authorId))
    .orderBy(desc(sql`${posts.likes} + ${posts.commentCount}`), desc(posts.updatedAt))
    .limit(5);

  return {
    totalPosts: Number(totals?.totalPosts ?? 0),
    publishedPosts: Number(totals?.publishedPosts ?? 0),
    draftPosts: Number(totals?.draftPosts ?? 0),
    totalLikes: Number(totals?.totalLikes ?? 0),
    totalComments: Number(totals?.totalComments ?? 0),
    followers: Number(followers?.count ?? 0),
    topPosts,
  };
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
