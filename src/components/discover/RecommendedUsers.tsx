"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { startRouteProgress } from "@/components/RouteProgress";
import type { RecommendedAuthor } from "@/lib/follows";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function RecommendedUsers({
  authors,
  isAuthenticated,
}: {
  authors: RecommendedAuthor[];
  isAuthenticated: boolean;
}) {
  const router = useRouter();
  const [dismissed, setDismissed] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const [followed, setFollowed] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  if (dismissed || authors.length === 0) {
    return null;
  }

  async function handleFollow(username: string) {
    // Following requires an account — bounce guests to login and bring them
    // back to Discover once they're in.
    if (!isAuthenticated) {
      startRouteProgress();
      router.push(`/login?next=${encodeURIComponent("/discover")}`);
      return;
    }

    setError(null);
    setPending(username);

    try {
      const res = await fetch("/api/follow-author", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followingId: username }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error ?? "Could not follow. Please try again.");
      }

      setFollowed((prev) => new Set(prev).add(username));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setPending(null);
    }
  }

  return (
    <section className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur shadow-sm overflow-hidden">
      <div className="p-5 flex items-center justify-between">
        <div className="font-semibold text-on-surface">Recommended for you</div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-on-surface-variant hover:text-primary"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className="px-5 grid grid-cols-3 gap-4">
        {authors.map((author) => {
          const isFollowed = followed.has(author.username);
          const isPending = pending === author.username;

          return (
            <div
              key={author.username}
              className="rounded-2xl border border-black/10 bg-white/70 p-4 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-black/10 mx-auto flex items-center justify-center text-sm font-semibold text-on-surface-variant">
                {initials(author.name)}
              </div>
              <div className="mt-3 text-sm font-medium text-on-surface truncate">
                {author.name}
              </div>
              <button
                type="button"
                onClick={() => handleFollow(author.username)}
                disabled={isFollowed || isPending}
                className={
                  isFollowed
                    ? "mt-3 w-full rounded-full bg-white text-on-surface py-2 text-sm font-medium border border-black/10 cursor-default"
                    : "mt-3 w-full rounded-full bg-[#A95162] text-white py-2 text-sm font-medium shadow-sm border border-black/10 hover:bg-[#F2C7B8] hover:text-black transition disabled:opacity-70"
                }
              >
                {isFollowed ? "Following" : isPending ? "Following…" : "Follow"}
              </button>
            </div>
          );
        })}
      </div>
      {error ? (
        <div className="px-5 pb-2 text-sm text-red-600">{error}</div>
      ) : null}
      <div className="pb-5" />
    </section>
  );
}
