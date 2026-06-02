"use client";

import type { AuthUser } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Comment = {
  id: number;
  author: string;
  content: string;
  createdAt: Date | string;
};

function formatCommentDate(value: Date | string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function CommentsSection({
  postId,
  postSlug,
  initialComments,
  currentUser,
}: {
  postId: number;
  postSlug: string;
  initialComments: Comment[];
  currentUser: AuthUser | null;
}) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = content.trim();

    if (!trimmed) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, content: trimmed }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      if (response.status === 401) {
        setError("Sign in to post your comment.");
      } else {
        setError("Could not post your comment. Try again.");
      }
      return;
    }

    setContent("");
    router.refresh();
  }

  return (
    <section className="mt-16 border-t border-black/10 pt-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-wide text-secondary">
            DISCUSSION
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-on-surface">
            Comments
          </h2>
        </div>
        <div className="text-sm text-on-surface-variant">
          {initialComments.length}{" "}
          {initialComments.length === 1 ? "comment" : "comments"}
        </div>
      </div>

      {currentUser ? (
        <form onSubmit={handleSubmit} className="mt-6">
          <label htmlFor="comment" className="sr-only">
            Add a comment
          </label>
          <textarea
            id="comment"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={4}
            maxLength={1000}
            placeholder="Add your take..."
            className="w-full resize-none rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-on-surface shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="text-sm text-on-surface-variant">
              Posting as {currentUser.name}
            </p>
            <button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="rounded-full bg-[#A95162] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8f4050] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Posting..." : "Post comment"}
            </button>
          </div>
          {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
        </form>
      ) : (
        <div className="mt-6 rounded-2xl border border-black/10 bg-white/70 p-5">
          <p className="text-sm text-on-surface-variant">
            Sign in to join the discussion.
          </p>
          <Link
            href={`/login?next=${encodeURIComponent(`/article/${postSlug}`)}`}
            className="mt-3 inline-flex rounded-full bg-[#A95162] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8f4050]"
          >
            Sign in to comment
          </Link>
        </div>
      )}

      <div className="mt-8 space-y-4">
        {initialComments.length > 0 ? (
          initialComments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-2xl border border-black/10 bg-white/70 p-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <div className="font-semibold text-on-surface">
                  {comment.author}
                </div>
                <div className="text-on-surface-variant">•</div>
                <time className="text-sm text-on-surface-variant">
                  {formatCommentDate(comment.createdAt)}
                </time>
              </div>
              <p className="mt-3 whitespace-pre-wrap leading-relaxed text-on-surface-variant">
                {comment.content}
              </p>
            </article>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-black/15 bg-white/50 p-6 text-center text-on-surface-variant">
            No comments yet. Start the thread.
          </div>
        )}
      </div>
    </section>
  );
}
