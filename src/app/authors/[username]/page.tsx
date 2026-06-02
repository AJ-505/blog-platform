import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq, desc, sql } from "drizzle-orm";

import { db } from "@/db";
import { users, posts as postsTable, follows } from "@/db/schema";
import { SiteHeader } from "@/components/home/SiteHeader";
import { getLikedPostIds } from "@/lib/likes";
import { getCurrentUser } from "@/lib/server-auth";
import { LikeButton } from "@/components/LikeButton";
import { FollowButton } from "@/components/FollowButton";
import { and } from "drizzle-orm";

import artImg from "@/assets/Art.png";
import bookImg from "@/assets/Book.png";
import discoverImg from "@/assets/Discover.png";
import retroImg from "@/assets/Retro.png";

const imageByKey = {
  art: artImg,
  book: bookImg,
  discover: discoverImg,
  retro: retroImg,
} as const;

function formatCount(value: number) {
  if (value >= 1000) {
    return `${Math.round(value / 100) / 10}k`;
  }
  return `${value}`;
}

function formatTimeAgo(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60)));

  if (diffHours < 24) return `${diffHours}h`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d`;
  return `${Math.floor(diffDays / 7)}w`;
}

function IconStat({ icon, value }: { icon: string; value: number }) {
  return (
    <div className="flex items-center gap-2 text-sm text-on-surface-variant">
      <span aria-hidden>{icon}</span>
      <span className="font-medium text-on-surface">{formatCount(value)}</span>
    </div>
  );
}

type AuthorPost = {
  id: number;
  author: string;
  authorUsername: string;
  slug: string;
  badge: string | null;
  timeAgo: string;
  title: string;
  excerpt: string;
  image?: unknown;
  likes: number;
  liked: boolean;
  comments: number;
};

function PostActions({
  post,
  isAuthenticated,
}: {
  post: AuthorPost;
  isAuthenticated: boolean;
}) {
  return (
    <div className="mt-5 flex items-center justify-between text-on-surface-variant">
      <div className="flex items-center gap-6">
        <LikeButton
          postId={post.id}
          initialLikes={post.likes}
          initialLiked={post.liked}
          isAuthenticated={isAuthenticated}
          redirectTo={`/authors/${post.authorUsername}`}
        />
        <IconStat icon="💬" value={post.comments} />
      </div>
      <div className="flex items-center gap-4">
        <button type="button" className="hover:text-primary" aria-label="Repost">⟲</button>
        <button type="button" className="hover:text-primary" aria-label="Share">↗</button>
      </div>
    </div>
  );
}

function AuthorPostCard({
  post,
  isAuthenticated,
}: {
  post: AuthorPost;
  isAuthenticated: boolean;
}) {
  const hasHero = Boolean(post.image);

  return (
    <article className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur shadow-sm overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-black/10 relative">
               <Image
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=${post.authorUsername}&backgroundColor=b6e3f4`}
                  alt={post.author}
                  fill
                  className="object-cover"
                  sizes="40px"
                  unoptimized
                />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="font-semibold text-on-surface">{post.author}</div>
                <div className="text-on-surface-variant">•</div>
                <div className="text-sm text-on-surface-variant">{post.timeAgo}</div>
              </div>
              {post.badge ? (
                <div className="mt-1 text-[11px] tracking-wide uppercase text-secondary font-semibold">
                  {post.badge}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <Link href={`/article/${post.slug}`} className="group block">
          <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-on-surface leading-snug group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="mt-3 text-on-surface-variant leading-relaxed">
            {post.excerpt}
          </p>
        </Link>
      </div>

      {hasHero ? (
        <div className="px-6 md:px-7 pb-6 md:pb-7">
          <Link
            href={`/article/${post.slug}`}
            className="relative block overflow-hidden rounded-2xl border border-black/10 bg-black/5 h-[240px] md:h-[300px]"
            aria-label={`Read ${post.title}`}
          >
            <Image
              src={post.image as never}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </Link>
          <PostActions post={post} isAuthenticated={isAuthenticated} />
        </div>
      ) : (
        <div className="px-6 md:px-7 pb-6 md:pb-7">
          <Link
            href={`/article/${post.slug}`}
            className="block rounded-2xl border border-black/10 bg-white/60 p-5 hover:bg-white/80"
          >
            <div className="text-sm text-on-surface-variant">{post.excerpt}</div>
          </Link>
          <PostActions post={post} isAuthenticated={isAuthenticated} />
        </div>
      )}
      <div className="px-6 pb-6 md:px-7 md:pb-7">
        <Link
          href={`/article/${post.slug}`}
          className="inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-on-surface transition hover:border-primary/30 hover:text-primary"
        >
          Read post
        </Link>
      </div>
    </article>
  );
}

export default async function AuthorProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const resolvedParams = await params;
  const username = resolvedParams.username;
  
  const viewer = await getCurrentUser();

  const [author] = await db
    .select({
      username: users.username,
      name: users.name,
      createdAt: users.createdAt,
      followerCount: sql<number>`(SELECT count(*) FROM ${follows} WHERE ${follows.followingId} = ${users.username})`,
    })
    .from(users)
    .where(eq(users.username, username));

  if (!author) {
    notFound();
  }

  const isSelf = viewer?.username === username;
  let isFollowing = false;
  if (viewer && !isSelf) {
    const [followRecord] = await db
      .select({ followerId: follows.followerId })
      .from(follows)
      .where(
        and(
          eq(follows.followerId, viewer.username),
          eq(follows.followingId, username),
        ),
      )
      .limit(1);
    isFollowing = Boolean(followRecord);
  }

  const rawPosts = await db
    .select({
      id: postsTable.id,
      slug: postsTable.slug,
      title: postsTable.title,
      excerpt: postsTable.excerpt,
      badge: postsTable.badge,
      imageKey: postsTable.imageKey,
      likes: postsTable.likes,
      commentCount: postsTable.commentCount,
      createdAt: postsTable.createdAt,
    })
    .from(postsTable)
    .where(eq(postsTable.authorId, username))
    .orderBy(desc(postsTable.createdAt));

  const likedPostIds = await getLikedPostIds(viewer?.username ?? null);

  const posts = rawPosts.map((p) => ({
    id: p.id,
    author: author.name,
    authorUsername: author.username,
    slug: p.slug,
    badge: p.badge,
    timeAgo: formatTimeAgo(p.createdAt),
    title: p.title,
    excerpt: p.excerpt,
    image: p.imageKey ? imageByKey[p.imageKey as keyof typeof imageByKey] : undefined,
    likes: p.likes,
    liked: likedPostIds.has(p.id),
    comments: p.commentCount,
  }));

  return (
    <main className="min-h-screen pb-16">
      <SiteHeader />
      <div className="container mx-auto px-4 mt-8 max-w-3xl">
        <div className="bg-white rounded-3xl p-8 mb-8 border border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 relative border-4 border-white shadow-sm">
            <Image
              src={`https://api.dicebear.com/7.x/notionists/svg?seed=${author.username}&backgroundColor=b6e3f4`}
              alt={`${author.name}'s profile`}
              fill
              className="object-cover"
              sizes="96px"
              unoptimized
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#0B1F3B]">{author.name}</h1>
            <p className="text-[#8E3B46] font-medium mt-1">
              @{author.username}
            </p>
            <div className="flex gap-4 mt-3 text-sm text-gray-600">
              <span><strong>{author.followerCount}</strong> followers</span>
              <span>Joined {author.createdAt.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
          {!isSelf && (
            <div className="ml-auto">
              <FollowButton
                followingId={author.username}
                initialFollowing={isFollowing}
                isAuthenticated={Boolean(viewer)}
                redirectTo={`/authors/${author.username}`}
              />
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#0B1F3B]">
          Posts by {author.name}
        </h2>
        
        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white/50 rounded-3xl border border-black/5">
            This author hasn&apos;t published any posts yet.
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <AuthorPostCard
                key={post.id}
                post={post}
                isAuthenticated={Boolean(viewer)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}