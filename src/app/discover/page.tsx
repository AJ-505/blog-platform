import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/home/SiteHeader";
import { RecommendedUsers } from "@/components/discover/RecommendedUsers";
import { LikeButton } from "@/components/LikeButton";
import { getDiscoverPosts } from "@/lib/posts";
import { getRecommendedAuthors } from "@/lib/follows";
import { getLikedPostIds } from "@/lib/likes";
import { getCurrentUser } from "@/lib/server-auth";

import artImg from "@/assets/Art.png";
import bookImg from "@/assets/Book.png";
import discoverImg from "@/assets/Discover.png";
import retroImg from "@/assets/Retro.png";

export const dynamic = "force-dynamic";

type DiscoverPost = {
  id: number;
  author: string;
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

  if (diffHours < 24) {
    return `${diffHours}h`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays}d`;
  }

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

function PostActions({
  post,
  isAuthenticated,
}: {
  post: DiscoverPost;
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
          redirectTo="/discover"
        />
        <IconStat icon="💬" value={post.comments} />
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="hover:text-primary"
          aria-label="Repost"
        >
          ⟲
        </button>
        <button type="button" className="hover:text-primary" aria-label="Share">
          ↗
        </button>
      </div>
    </div>
  );
}

function PostCard({
  post,
  isAuthenticated,
}: {
  post: DiscoverPost;
  isAuthenticated: boolean;
}) {
  const hasHero = Boolean(post.image);

  return (
    <article className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur shadow-sm overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-black/10" />
            <div>
              <div className="flex items-center gap-2">
                <div className="font-semibold text-on-surface">
                  {post.author}
                </div>
                <div className="text-on-surface-variant">•</div>
                <div className="text-sm text-on-surface-variant">
                  {post.timeAgo}
                </div>
              </div>
              {post.badge ? (
                <div className="mt-1 text-[11px] tracking-wide uppercase text-secondary font-semibold">
                  {post.badge}
                </div>
              ) : null}
            </div>
          </div>

          <button
            type="button"
            className="px-4 py-2 rounded-full text-white  bg-[#A95162] text-on-surface text-sm font-medium shadow-sm border border-black/10 hover:bg-[#F2C7B8] hover:text-black transition"
          >
            Subscribe
          </button>
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
            <div className="text-sm text-on-surface-variant">
              {post.excerpt}
            </div>
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

function TrendingNow({ posts }: { posts: DiscoverPost[] }) {
  const trending = [...posts]
    .sort((a, b) => b.likes + b.comments - (a.likes + a.comments))
    .slice(0, 3);

  return (
    <section className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
          <span aria-hidden>↗</span>
          <span>TRENDING NOW</span>
        </div>

        <div className="mt-5 space-y-4">
          {trending.map((post, index) => (
            <div key={post.id}>
              <div className="text-xs font-semibold text-secondary">
                #{index + 1} {post.badge ?? "Campus"}
              </div>
              <Link
                href={`/article/${post.slug}`}
                className="mt-1 block font-medium text-on-surface hover:text-primary"
              >
                {post.title}
              </Link>
              <div className="text-xs text-on-surface-variant">
                {formatCount(post.likes + post.comments)} students talking about
                this
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/feed"
          className="mt-6 flex w-full items-center justify-center rounded-xl border border-black/10 bg-white/60 py-3 text-sm font-medium transition hover:bg-white"
        >
          See the full list
        </Link>
      </div>
    </section>
  );
}

export default async function DiscoverPage() {
  const viewer = await getCurrentUser();
  // Queried sequentially: the libsql client isn't reliable with concurrent
  // statements on the same connection (see api/user/data).
  const likedPostIds = await getLikedPostIds(viewer?.username ?? null);
  const posts = (await getDiscoverPosts()).map((post) => ({
    ...post,
    liked: likedPostIds.has(post.id),
    timeAgo: formatTimeAgo(post.createdAt),
    image: post.imageKey
      ? imageByKey[post.imageKey as keyof typeof imageByKey]
      : undefined,
  }));
  const recommendedAuthors = await getRecommendedAuthors(
    viewer?.username ?? null,
  );

  return (
    <main className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="container mx-auto max-w-[1120px] px-4 py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="space-y-8">
            {posts[0] ? (
              <PostCard post={posts[0]} isAuthenticated={Boolean(viewer)} />
            ) : null}
            <RecommendedUsers
              authors={recommendedAuthors}
              isAuthenticated={Boolean(viewer)}
            />
            {posts.slice(1).map((p) => (
              <PostCard key={p.id} post={p} isAuthenticated={Boolean(viewer)} />
            ))}
          </div>

          <aside className="space-y-6 sticky top-6">
            <TrendingNow posts={posts} />
          </aside>
        </div>
      </div>
    </main>
  );
}
