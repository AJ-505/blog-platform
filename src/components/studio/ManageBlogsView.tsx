"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { startRouteProgress } from "@/components/RouteProgress";

export type ManageBlog = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  status: "PUBLISHED" | "DRAFT";
  dateLabel: string;
  likes: number;
  comments: number;
  image: StaticImageData | null;
};

function formatCount(value: number) {
  if (value >= 1000) {
    return `${Math.round(value / 100) / 10}k`;
  }
  return `${value}`;
}

function StatusPill({ status }: { status: ManageBlog["status"] }) {
  const cls =
    status === "PUBLISHED"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-black/10 text-on-surface-variant";
  return (
    <div
      className={`inline-flex items-center px-6 py-2 rounded-full text-sm font-semibold ${cls}`}
    >
      {status}
    </div>
  );
}

function Stat({ icon, value }: { icon: string; value: number }) {
  return (
    <div className="flex items-center gap-2 text-sm text-on-surface-variant">
      <span aria-hidden>{icon}</span>
      <span className="font-medium text-on-surface">{formatCount(value)}</span>
    </div>
  );
}

export function ManageBlogsView({ blogs }: { blogs: ManageBlog[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [pendingDelete, setPendingDelete] = useState<ManageBlog | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  // Build the category filter options from the posts the creator actually has.
  const categoryOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const blog of blogs) {
      if (!seen.has(blog.categorySlug)) {
        seen.set(blog.categorySlug, blog.category);
      }
    }
    return Array.from(seen, ([slug, label]) => ({ slug, label }));
  }, [blogs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogs.filter((blog) => {
      const matchesCategory =
        category === "all" || blog.categorySlug === category;
      const matchesQuery =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt.toLowerCase().includes(q) ||
        blog.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [blogs, query, category]);

  function editPost(blog: ManageBlog) {
    startRouteProgress();
    router.push(`/studio/creators?draft=${blog.id}`);
  }

  async function confirmDelete() {
    if (!pendingDelete || isDeleting) return;

    setIsDeleting(true);
    setError("");

    try {
      const response = await fetch("/api/posts/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: pendingDelete.id }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.error ?? "Could not delete this post.");
        setIsDeleting(false);
        return;
      }

      setPendingDelete(null);
      setIsDeleting(false);
      // The list is rendered from the server query, so refresh to reflect the
      // deletion instead of mutating local state.
      router.refresh();
    } catch {
      setError("Could not delete this post. Please try again.");
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full md:w-[520px] h-12 rounded-xl border border-black/10 bg-white/70 backdrop-blur px-4 outline-none focus:border-primary/40"
          placeholder="Search by title or keywords..."
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="btn-secondary px-8 py-3 rounded-full border border-black/10 bg-white/70 outline-none"
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          {categoryOptions.map((option) => (
            <option key={option.slug} value={option.slug}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-10 space-y-6">
        {blogs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-black/15 bg-white/50 p-12 text-center">
            <h2 className="text-2xl font-semibold text-on-surface">
              No stories yet
            </h2>
            <p className="mt-2 text-on-surface-variant">
              Your published posts and drafts will show up here.
            </p>
            <button
              type="button"
              onClick={() => {
                startRouteProgress();
                router.push("/studio/creators");
              }}
              className="mt-6 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-[#12345f]"
            >
              Write your first story
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-3xl border border-black/10 bg-white/50 p-10 text-center text-on-surface-variant">
            No posts match your search.
          </div>
        ) : (
          filtered.map((b) => (
            <article
              key={b.id}
              className="rounded-3xl border border-black/10 bg-white/55 backdrop-blur shadow-sm overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_120px] gap-6 items-center p-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-[170px] h-[110px] rounded-2xl overflow-hidden bg-black/5">
                    <div className="absolute top-2 left-2 z-10 px-3 py-1 rounded-full bg-white/80 text-[10px] font-semibold tracking-wide">
                      {b.category}
                    </div>
                    {b.image ? (
                      <Image
                        src={b.image}
                        alt={b.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : null}
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-6">
                    <StatusPill status={b.status} />
                    <div className="text-on-surface-variant font-semibold">
                      {b.dateLabel}
                    </div>
                  </div>

                  <h2 className="mt-4 text-2xl md:text-3xl font-medium text-on-surface">
                    {b.status === "PUBLISHED" ? (
                      <a href={`/article/${b.slug}`} className="hover:text-primary">
                        {b.title}
                      </a>
                    ) : (
                      b.title
                    )}
                  </h2>

                  <div className="mt-4 flex flex-wrap items-center gap-10">
                    <Stat icon="❤" value={b.likes} />
                    <Stat icon="💬" value={b.comments} />
                  </div>
                </div>

                <div className="flex md:flex-col items-center justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => editPost(b)}
                    className="w-11 h-11 rounded-full bg-black/10 hover:bg-black/15"
                    aria-label={`Edit ${b.title}`}
                    title="Edit post"
                  >
                    ✎
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setPendingDelete(b);
                    }}
                    className="w-11 h-11 rounded-full bg-black/10 hover:bg-red-100 hover:text-red-600"
                    aria-label={`Delete ${b.title}`}
                    title="Delete post"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {pendingDelete ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          onClick={() => {
            if (!isDeleting) setPendingDelete(null);
          }}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="delete-dialog-title"
              className="text-2xl font-semibold text-on-surface"
            >
              Delete this post?
            </h2>
            <p className="mt-3 text-on-surface-variant">
              <span className="font-medium text-on-surface">
                “{pendingDelete.title}”
              </span>{" "}
              will be permanently removed. This can&apos;t be undone.
            </p>

            {error ? (
              <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </p>
            ) : null}

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                disabled={isDeleting}
                className="rounded-xl border border-black/15 bg-white px-5 py-2.5 text-sm font-semibold text-on-surface hover:bg-black/[0.03] disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete post"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
