import Link from "next/link";

import { SiteHeader } from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SearchForm } from "@/components/search/SearchForm";
import { searchPosts, type SearchResult } from "@/lib/search";

export const dynamic = "force-dynamic";

function formatCount(value: number) {
  return value >= 1000 ? `${Math.round(value / 100) / 10}k` : `${value}`;
}

function localReturnPath(value?: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return null;
  if (value.startsWith("/search")) return null;

  return value;
}

function ResultCard({ post }: { post: SearchResult }) {
  return (
    <Link
      href={`/article/${post.slug}`}
      className="group block rounded-2xl border border-black/10 bg-white/75 backdrop-blur shadow-sm p-5 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {post.badge ? (
        <div className="text-[11px] font-semibold tracking-wide uppercase text-[#A95162]">
          {post.badge}
        </div>
      ) : null}
      <h2 className="mt-1 text-xl md:text-2xl font-semibold text-on-surface leading-snug group-hover:text-primary transition-colors">
        {post.title}
      </h2>
      <p className="mt-2 text-sm text-on-surface-variant leading-relaxed line-clamp-2">
        {post.excerpt}
      </p>
      <div className="mt-4 flex items-center justify-between text-sm text-on-surface-variant">
        <span>• {post.author}</span>
        <span className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span aria-hidden>♡</span> {formatCount(post.likes)}
          </span>
          <span className="flex items-center gap-1">
            <span aria-hidden>💬</span> {formatCount(post.comments)}
          </span>
        </span>
      </div>
    </Link>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; from?: string }>;
}) {
  const { q, from } = await searchParams;
  const query = q?.trim() ?? "";
  const returnPath = localReturnPath(from);
  const results = query ? await searchPosts(query) : [];

  return (
    <main className="bg-background min-h-screen flex flex-col">
      <SiteHeader />

      <div className="container mx-auto max-w-[820px] px-4 py-12 flex-1">
        <SearchForm query={query} returnPath={returnPath} />

        {query ? (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-on-surface-variant">
              <span className="font-semibold text-on-surface">
                {results.length}
              </span>{" "}
              {results.length === 1 ? "result" : "results"} for{" "}
              <span className="font-semibold text-[#A95162]">“{query}”</span>
            </p>

            {returnPath ? (
              <Link
                href={returnPath}
                className="inline-flex w-fit items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-on-surface shadow-sm transition hover:border-[#A95162]/30 hover:text-[#A95162]"
              >
                Back to previous page
              </Link>
            ) : null}
          </div>
        ) : (
          <p className="mt-6 text-sm text-on-surface-variant">
            Search across published posts by title, topic, category, or author.
          </p>
        )}

        {query && results.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-black/15 bg-white/60 p-10 text-center">
            <p className="text-on-surface-variant">
              No posts matched “{query}”. Try a different keyword.
            </p>
            <Link
              href="/discover"
              className="mt-5 inline-flex rounded-full bg-[#A95162] px-5 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90"
            >
              Browse Discover
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {results.map((post) => (
              <ResultCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      <SiteFooter />
    </main>
  );
}
