"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { startRouteProgress } from "@/components/RouteProgress";

export function FollowButton({
  followingId,
  initialFollowing,
  isAuthenticated,
  redirectTo,
}: {
  followingId: string;
  initialFollowing: boolean;
  isAuthenticated: boolean;
  redirectTo: string;
}) {
  const router = useRouter();
  const [following, setFollowing] = useState(initialFollowing);
  const [pending, setPending] = useState(false);

  async function toggle() {
    if (!isAuthenticated) {
      startRouteProgress();
      router.push(`/login?next=${encodeURIComponent(redirectTo)}`);
      return;
    }

    if (pending) {
      return;
    }

    const nextFollowing = !following;

    // Optimistically update
    setFollowing(nextFollowing);
    setPending(true);

    try {
      const res = await fetch("/api/follow-author", {
        method: nextFollowing ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followingId }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }
    } catch {
      // Roll back
      setFollowing(!nextFollowing);
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      aria-pressed={following}
      className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
        following
          ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
          : "bg-[#0B1F3B] text-white hover:bg-[#0B1F3B]/90"
      }`}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}
