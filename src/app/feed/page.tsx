import Link from "next/link";

import { SiteHeader } from "@/components/home/SiteHeader";
import { FeedShowcase } from "@/components/feed/FeedShowcase";
import { FeedPolls } from "@/components/feed/FeedPolls";
import {
  CATEGORIES,
  getCategoryByLabel,
  getCategoryBySlug,
} from "@/lib/categories";
import { getFeedPosts } from "@/lib/posts";
import { getFeedPolls } from "@/lib/polls";
import { getCurrentUser } from "@/lib/server-auth";

export const dynamic = "force-dynamic";

type FeedPost = {
  id: number;
  slug: string;
  /** Category slug derived from the post badge; drives the URL filter. */
  category: string | undefined;
  kind: "original" | "trending";
  title: string;
  author: string;
  description: string;
  likes: number;
  comments: number;
};

function Pill({
  children,
  active,
  href,
}: {
  children: React.ReactNode;
  active?: boolean;
  href: string;
}) {
  const className = active
    ? "px-5 py-2 rounded-full bg-[#A95162] text-white text-sm font-medium shadow-sm"
    : "px-5 py-2 rounded-full bg-black/10 text-on-surface text-sm font-medium transition hover:bg-[#F6D3C7] hover:text-primary hover:shadow-sm hover:-translate-y-[1px] border border-transparent hover:border-black/10";

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function Stat({ icon, value }: { icon: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-on-surface-variant">
      <span aria-hidden>{icon}</span>
      <span className="font-medium text-on-surface">{value}</span>
    </div>
  );
}

function formatCount(value: number) {
  return value >= 1000 ? `${Math.round(value / 100) / 10}k` : `${value}`;
}

function FeedCard({ post }: { post: FeedPost }) {
  const accent = post.kind === "trending" ? "TRENDING" : "ORIGINAL";
  const category = getCategoryBySlug(post.category);

  return (
    <article className="rounded-2xl border border-black/10 bg-white/75 backdrop-blur shadow-sm overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-on-surface-variant">
                {accent}
              </span>
              {category ? (
                <span className="inline-flex items-center rounded-full bg-[#A95162]/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#A95162]">
                  {category.label}
                </span>
              ) : null}
            </div>

            <Link href={`/article/${post.slug}`} className="group block">
              <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-on-surface leading-snug group-hover:text-primary transition-colors">
                {post.title}
              </h2>

              <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
                {post.description}
              </p>
            </Link>
          </div>

          <button
            type="button"
            className="shrink-0 rounded-full bg-[#A95162] px-5 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90"
          >
            Subscribe
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="text-sm text-on-surface-variant">• {post.author}</div>

          <Link
            href={`/article/${post.slug}`}
            className="flex items-center gap-6 hover:opacity-80"
            aria-label={`Read and comment on ${post.title}`}
          >
            <Stat icon="♡" value={formatCount(post.likes)} />
            <Stat icon="💬" value={formatCount(post.comments)} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: categoryParam } = await searchParams;
  const activeCategory = getCategoryBySlug(categoryParam);
  const activeSlug = activeCategory?.slug;

  const currentUser = await getCurrentUser();
  const initialPolls = await getFeedPolls(currentUser?.username ?? null);

  // The feed is DB-backed: every published post shows here, newest first, and
  // each card links to `/article/<slug>` where it can be read and commented on.
  const posts: FeedPost[] = (await getFeedPosts()).map((post) => ({
    id: post.id,
    slug: post.slug,
    category: getCategoryByLabel(post.badge)?.slug,
    // "Trending" is just a high-engagement marker; everything else is original.
    kind: post.likes >= 1000 ? "trending" : "original",
    title: post.title,
    author: post.author,
    description: post.excerpt,
    likes: post.likes,
    comments: post.comments,
  }));

  const visiblePosts = activeSlug
    ? posts.filter((post) => post.category === activeSlug)
    : posts;

  return (
    <main className="bg-background min-h-screen flex flex-col">
      <SiteHeader />

      <div className="container mx-auto max-w-[1120px] px-4 py-12 flex-1">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full bg-black/5 px-5 py-2 text-xs font-semibold tracking-wide">
            THE DAILY BUZZ
          </div>

          <h1 className="mt-6 font-semibold leading-[1.05]">
            <span className="block text-5xl md:text-6xl text-on-surface">
              Campus
            </span>
            <span className="block text-5xl md:text-6xl text-secondary">
              Conversations
            </span>
          </h1>

          <p className="mt-5 text-on-surface-variant leading-relaxed">
            The campus social feed — dip into the themed spaces, weigh in on live
            polls, and scroll the latest sparks. Here to read long-form?{" "}
            <Link href="/discover" className="font-semibold text-[#A95162] hover:underline">
              Head to Discover
            </Link>
            .
          </p>
        </div>

        {/* Themed spaces — tappable previews into the richer feed sections. */}
        <FeedShowcase />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          <div>
            <div className="flex flex-wrap gap-3">
              <Pill href="/feed" active={!activeSlug}>
                All sparks
              </Pill>
              {CATEGORIES.map((cat) => (
                <Pill
                  key={cat.slug}
                  href={`/feed?category=${cat.slug}`}
                  active={activeSlug === cat.slug}
                >
                  {cat.label.charAt(0) + cat.label.slice(1).toLowerCase()}
                </Pill>
              ))}
            </div>

            {activeCategory ? (
              <p className="mt-6 text-sm text-on-surface-variant">
                Showing{" "}
                <span className="font-semibold text-on-surface">
                  {visiblePosts.length}
                </span>{" "}
                {visiblePosts.length === 1 ? "spark" : "sparks"} in{" "}
                <span className="font-semibold text-[#A95162]">
                  {activeCategory.label}
                </span>
                .
              </p>
            ) : null}

            {visiblePosts.length > 0 ? (
              <div className="mt-8 space-y-8">
                {visiblePosts.map((post) => (
                  <FeedCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-dashed border-black/15 bg-white/60 p-10 text-center">
                <p className="text-on-surface-variant">
                  No sparks in this category yet. Be the first to start the
                  conversation.
                </p>
                <Link
                  href="/studio/create-post"
                  className="mt-5 inline-flex rounded-full bg-[#A95162] px-5 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90"
                >
                  Write a post
                </Link>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-6">
            <FeedPolls
              initialPolls={initialPolls}
              isAuthenticated={Boolean(currentUser)}
              redirectTo="/feed"
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
