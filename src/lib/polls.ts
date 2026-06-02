import { db } from "@/db";
import { pollOptions, pollVotes, polls, users } from "@/db/schema";
import { desc, eq, inArray } from "drizzle-orm";

export type PollOption = {
  id: number;
  label: string;
  votes: number;
};

export type Poll = {
  id: number;
  question: string;
  author: string;
  createdAt: Date;
  totalVotes: number;
  options: PollOption[];
  /** The option id the current viewer voted for, or null if they haven't. */
  votedOptionId: number | null;
};

// All feed polls, newest first, with denormalised vote counts and (when a
// viewer is given) which option that viewer has already chosen. Built so both
// the initial server render and the short-polling refresh return the same
// shape.
export async function getFeedPolls(viewer: string | null): Promise<Poll[]> {
  const pollRows = await db
    .select({
      id: polls.id,
      question: polls.question,
      author: users.name,
      createdAt: polls.createdAt,
    })
    .from(polls)
    .innerJoin(users, eq(polls.authorId, users.username))
    .orderBy(desc(polls.createdAt));

  if (pollRows.length === 0) {
    return [];
  }

  const pollIds = pollRows.map((poll) => poll.id);

  const optionRows = await db
    .select({
      id: pollOptions.id,
      pollId: pollOptions.pollId,
      label: pollOptions.label,
      votes: pollOptions.votes,
    })
    .from(pollOptions)
    .where(inArray(pollOptions.pollId, pollIds));

  // The viewer's own votes, so the UI can highlight their pick.
  const myVotes = viewer
    ? await db
        .select({ pollId: pollVotes.pollId, optionId: pollVotes.optionId })
        .from(pollVotes)
        .where(eq(pollVotes.userId, viewer))
    : [];

  const votedByPoll = new Map(myVotes.map((v) => [v.pollId, v.optionId]));

  return pollRows.map((poll) => {
    const options = optionRows
      .filter((option) => option.pollId === poll.id)
      .map((option) => ({
        id: option.id,
        label: option.label,
        votes: option.votes,
      }));

    return {
      id: poll.id,
      question: poll.question,
      author: poll.author,
      createdAt: poll.createdAt,
      totalVotes: options.reduce((sum, option) => sum + option.votes, 0),
      options,
      votedOptionId: votedByPoll.get(poll.id) ?? null,
    };
  });
}
