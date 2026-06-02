import { db } from "@/db";
import { pollOptions, pollVotes } from "@/db/schema";
import { getCurrentUser } from "@/lib/server-auth";
import { z } from "zod";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

const voteSchema = z.object({
  pollId: z.number().int().positive(),
  optionId: z.number().int().positive(),
});

// Cast (or move) a vote. A user votes at most once per poll; voting for a
// different option moves the vote and rebalances the denormalised counters.
// The vote ledger and the per-option counters are written together so they
// never drift apart.
export async function POST(req: Request) {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json({ error: "Sign in to vote" }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid or missing JSON body" },
      { status: 400 },
    );
  }

  const result = voteSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { pollId, optionId } = result.data;
  const userId = session.username;

  try {
    // The chosen option must exist and belong to the named poll.
    const [option] = await db
      .select({ id: pollOptions.id })
      .from(pollOptions)
      .where(and(eq(pollOptions.id, optionId), eq(pollOptions.pollId, pollId)))
      .limit(1);

    if (!option) {
      return NextResponse.json(
        { error: "Option not found for this poll" },
        { status: 404 },
      );
    }

    await db.transaction(async (tx) => {
      const [existing] = await tx
        .select({ optionId: pollVotes.optionId })
        .from(pollVotes)
        .where(and(eq(pollVotes.pollId, pollId), eq(pollVotes.userId, userId)))
        .limit(1);

      if (existing?.optionId === optionId) {
        // Same choice — nothing to change.
        return;
      }

      if (existing) {
        // Move the vote: drop the old option's count, add to the new one.
        await tx
          .update(pollOptions)
          .set({ votes: sql`max(${pollOptions.votes} - 1, 0)` })
          .where(eq(pollOptions.id, existing.optionId));
        await tx
          .update(pollVotes)
          .set({ optionId })
          .where(
            and(eq(pollVotes.pollId, pollId), eq(pollVotes.userId, userId)),
          );
      } else {
        await tx.insert(pollVotes).values({ pollId, userId, optionId });
      }

      await tx
        .update(pollOptions)
        .set({ votes: sql`${pollOptions.votes} + 1` })
        .where(eq(pollOptions.id, optionId));
    });

    return NextResponse.json({ message: "Vote recorded" }, { status: 200 });
  } catch (err) {
    console.error("POST /api/polls/vote failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
