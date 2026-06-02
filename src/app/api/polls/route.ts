import { db } from "@/db";
import { pollOptions, polls } from "@/db/schema";
import { getFeedPolls } from "@/lib/polls";
import { getCurrentUser } from "@/lib/server-auth";
import { z } from "zod";
import { NextResponse } from "next/server";

const createPollSchema = z.object({
  question: z.string().trim().min(1).max(160),
  options: z
    .array(z.string().trim().min(1).max(80))
    .min(2)
    .max(6),
});

// List every feed poll with live vote counts. Used both for the initial render
// and the client's short-polling refresh, so it reflects the current viewer's
// own vote when they're signed in.
export async function GET() {
  const session = await getCurrentUser();

  try {
    const data = await getFeedPolls(session?.username ?? null);
    return NextResponse.json({ polls: data }, { status: 200 });
  } catch (err) {
    console.error("GET /api/polls failed:", err);
    return NextResponse.json(
      { error: "Could not load polls." },
      { status: 500 },
    );
  }
}

// Create a poll. Any signed-in student can start one on the feed.
export async function POST(req: Request) {
  const session = await getCurrentUser();

  if (!session) {
    return NextResponse.json(
      { error: "Sign in to start a poll" },
      { status: 401 },
    );
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

  const result = createPollSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Add a question and at least two options." },
      { status: 400 },
    );
  }

  const { question, options } = result.data;

  try {
    const poll = await db.transaction(async (tx) => {
      const [created] = await tx
        .insert(polls)
        .values({ authorId: session.username, question })
        .returning({ id: polls.id });

      await tx
        .insert(pollOptions)
        .values(options.map((label) => ({ pollId: created.id, label })));

      return created;
    });

    return NextResponse.json({ pollId: poll.id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/polls failed:", err);
    return NextResponse.json(
      { error: "Could not create poll. Please try again." },
      { status: 500 },
    );
  }
}
