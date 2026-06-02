"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { startRouteProgress } from "@/components/RouteProgress";

function formatCount(value: number) {
  if (value >= 1000) {
    return `${Math.round(value / 100) / 10}k`;
  }

  return `${value}`;
}

export function LikeButton({
  postId,
  initialLikes,
  initialLiked,
  isAuthenticated,
  redirectTo,
}: {
  postId: number;
  initialLikes: number;
  initialLiked: boolean;
  isAuthenticated: boolean;
  // Where to send guests after they sign in, so they land back where they
  // tried to like.
  redirectTo: string;
}) {
  const router = useRouter();
  const [liked, setLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(initialLikes);
  const [pending, setPending] = useState(false);

  async function toggle() {
    // Liking requires an account — bounce guests to login and bring them back.
    if (!isAuthenticated) {
      startRouteProgress();
      router.push(`/login?next=${encodeURIComponent(redirectTo)}`);
      return;
    }

    if (pending) {
      return;
    }

    const nextLiked = !liked;

    // Optimistically flip the UI, then reconcile if the request fails.
    setLiked(nextLiked);
    setLikes((count) => count + (nextLiked ? 1 : -1));
    setPending(true);

    try {
      const res = await fetch("/api/like-post", {
        method: nextLiked ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }
    } catch {
      // Roll back the optimistic update.
      setLiked(!nextLiked);
      setLikes((count) => count + (nextLiked ? -1 : 1));
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={liked}
      aria-label={liked ? "Unlike" : "Like"}
      className={`flex items-center gap-2 text-sm transition-colors hover:text-primary ${
        liked ? "text-primary" : "text-on-surface-variant"
      }`}
    >
      <span aria-hidden>{liked ? "♥" : "♡"}</span>
      <span className="font-medium text-on-surface">{formatCount(likes)}</span>
    </button>
  );
}
