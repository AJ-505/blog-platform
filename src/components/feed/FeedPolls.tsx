"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { startRouteProgress } from "@/components/RouteProgress";

type PollOption = {
  id: number;
  label: string;
  votes: number;
};

export type FeedPoll = {
  id: number;
  question: string;
  author: string;
  totalVotes: number;
  options: PollOption[];
  votedOptionId: number | null;
};

// How often to pull fresh counts so other people's votes appear without a
// reload. Short enough to feel live, long enough to stay cheap.
const REFRESH_MS = 6000;

function pct(votes: number, total: number) {
  if (total === 0) return 0;
  return Math.round((votes / total) * 100);
}

function PollCard({
  poll,
  isAuthenticated,
  onVote,
}: {
  poll: FeedPoll;
  isAuthenticated: boolean;
  onVote: (pollId: number, optionId: number) => void;
}) {
  const hasVoted = poll.votedOptionId !== null;

  return (
    <article className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur shadow-sm p-5">
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-on-surface-variant">
        <span aria-hidden>📊</span>
        <span>LIVE POLL</span>
      </div>

      <p className="mt-3 text-lg md:text-xl font-semibold text-on-surface leading-snug">
        {poll.question}
      </p>

      <div className="mt-4 space-y-3">
        {poll.options.map((option) => {
          const percentage = pct(option.votes, poll.totalVotes);
          const chosen = poll.votedOptionId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onVote(poll.id, option.id)}
              aria-pressed={chosen}
              className={`relative w-full overflow-hidden rounded-xl border px-4 py-3 text-left text-sm transition ${
                chosen
                  ? "border-[#A95162] bg-white"
                  : "border-black/10 bg-white hover:border-[#A95162]/40 hover:bg-black/[0.02]"
              }`}
            >
              {/* Result bar — only revealed once the viewer has voted. */}
              {hasVoted ? (
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 bg-[#A95162]/12 transition-[width] duration-500"
                  style={{ width: `${percentage}%` }}
                />
              ) : null}

              <span className="relative flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 font-medium text-on-surface">
                  {chosen ? <span aria-hidden>✓</span> : null}
                  {option.label}
                </span>
                {hasVoted ? (
                  <span className="shrink-0 text-on-surface-variant">
                    {percentage}%
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-on-surface-variant">
        <span>
          {poll.totalVotes} {poll.totalVotes === 1 ? "vote" : "votes"} •{" "}
          {poll.author}
        </span>
        {!isAuthenticated ? <span>Sign in to vote</span> : null}
      </div>
    </article>
  );
}

function PollComposer({
  isAuthenticated,
  redirectTo,
  onCreated,
}: {
  isAuthenticated: boolean;
  redirectTo: string;
  onCreated: () => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function reset() {
    setQuestion("");
    setOptions(["", ""]);
    setError("");
    setOpen(false);
  }

  async function submit() {
    const cleaned = options.map((o) => o.trim()).filter(Boolean);
    if (!question.trim() || cleaned.length < 2) {
      setError("Add a question and at least two options.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim(), options: cleaned }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Could not create poll.");
        return;
      }

      reset();
      onCreated();
    } catch {
      setError("Could not create poll. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <button
        type="button"
        onClick={() => {
          startRouteProgress();
          router.push(`/login?next=${encodeURIComponent(redirectTo)}`);
        }}
        className="w-full rounded-2xl border border-dashed border-black/15 bg-white/60 px-5 py-4 text-sm font-medium text-on-surface-variant transition hover:border-[#A95162]/40 hover:text-primary"
      >
        Sign in to start a poll
      </button>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl border border-dashed border-black/15 bg-white/60 px-5 py-4 text-sm font-semibold text-on-surface transition hover:border-[#A95162]/40 hover:text-primary"
      >
        + Start a poll
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur shadow-sm p-5">
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        maxLength={160}
        placeholder="Ask the campus something..."
        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-on-surface outline-none focus:border-[#A95162]/40"
        aria-label="Poll question"
      />

      <div className="mt-3 space-y-2">
        {options.map((opt, i) => (
          <input
            key={i}
            value={opt}
            onChange={(e) =>
              setOptions((prev) =>
                prev.map((o, idx) => (idx === i ? e.target.value : o)),
              )
            }
            maxLength={80}
            placeholder={`Option ${i + 1}`}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-on-surface outline-none focus:border-[#A95162]/40"
            aria-label={`Poll option ${i + 1}`}
          />
        ))}
      </div>

      {options.length < 6 ? (
        <button
          type="button"
          onClick={() => setOptions((prev) => [...prev, ""])}
          className="mt-2 text-xs font-semibold text-[#A95162] hover:underline"
        >
          + Add option
        </button>
      ) : null}

      {error ? (
        <p className="mt-3 text-sm font-medium text-[#A95162]">{error}</p>
      ) : null}

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={submit}
          disabled={submitting}
          className="rounded-full bg-[#A95162] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Posting..." : "Post poll"}
        </button>
        <button
          type="button"
          onClick={reset}
          className="text-sm font-medium text-on-surface-variant hover:text-on-surface"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export function FeedPolls({
  initialPolls,
  isAuthenticated,
  redirectTo,
}: {
  initialPolls: FeedPoll[];
  isAuthenticated: boolean;
  redirectTo: string;
}) {
  const router = useRouter();
  const [polls, setPolls] = useState<FeedPoll[]>(initialPolls);
  // Skip applying a background refresh while a vote write is in flight, so the
  // optimistic update isn't briefly clobbered by stale counts.
  const votingRef = useRef(false);

  const refresh = useCallback(async () => {
    if (votingRef.current) return;
    try {
      const res = await fetch("/api/polls", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { polls: FeedPoll[] };
      if (!votingRef.current) {
        setPolls(data.polls);
      }
    } catch {
      // Transient network error — the next tick will try again.
    }
  }, []);

  // Short-poll for fresh counts so other students' votes show up live. Pause
  // while the tab is hidden to avoid pointless background traffic.
  useEffect(() => {
    const id = setInterval(() => {
      if (document.visibilityState === "visible") {
        refresh();
      }
    }, REFRESH_MS);
    return () => clearInterval(id);
  }, [refresh]);

  const vote = useCallback(
    async (pollId: number, optionId: number) => {
      if (!isAuthenticated) {
        startRouteProgress();
        router.push(`/login?next=${encodeURIComponent(redirectTo)}`);
        return;
      }

      let shouldSend = true;

      // Optimistically move the vote and rebalance counts for snappy feedback.
      setPolls((prev) =>
        prev.map((poll) => {
          if (poll.id !== pollId) return poll;
          if (poll.votedOptionId === optionId) {
            shouldSend = false; // already this choice — no-op
            return poll;
          }

          const options = poll.options.map((option) => {
            if (option.id === optionId) {
              return { ...option, votes: option.votes + 1 };
            }
            if (option.id === poll.votedOptionId) {
              return { ...option, votes: Math.max(option.votes - 1, 0) };
            }
            return option;
          });

          const isNewVote = poll.votedOptionId === null;

          return {
            ...poll,
            options,
            votedOptionId: optionId,
            totalVotes: isNewVote ? poll.totalVotes + 1 : poll.totalVotes,
          };
        }),
      );

      if (!shouldSend) return;

      votingRef.current = true;
      try {
        const res = await fetch("/api/polls/vote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pollId, optionId }),
        });
        if (!res.ok) throw new Error("vote failed");
      } catch {
        // Reconcile with the server's authoritative counts on failure.
        await refresh();
      } finally {
        votingRef.current = false;
        // Pull the true counts once the write has landed.
        refresh();
      }
    },
    [isAuthenticated, redirectTo, router, refresh],
  );

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-on-surface">
        <span aria-hidden>⚡</span>
        <span>WEEKLY HOT TAKES</span>
      </div>

      <PollComposer
        isAuthenticated={isAuthenticated}
        redirectTo={redirectTo}
        onCreated={refresh}
      />

      {polls.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-black/15 bg-white/60 p-6 text-center text-sm text-on-surface-variant">
          No polls yet. Start the first hot take of the week.
        </p>
      ) : (
        polls.map((poll) => (
          <PollCard
            key={poll.id}
            poll={poll}
            isAuthenticated={isAuthenticated}
            onVote={vote}
          />
        ))
      )}
    </section>
  );
}
