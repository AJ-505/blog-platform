import { db } from "@/db";
import { follows } from "@/db/schema";
import { z } from "zod";
import { and, eq } from "drizzle-orm";

const followSchema = z.object({
    followerId: z.string(),
    followingId: z.string(),
});

export async function POST(req: Request) {
    let body;

    try {
        body = await req.json();
    } catch {
        return Response.json(
            { error: "Invalid or missing JSON body" },
            { status: 400 }
        );
    }

    const result = followSchema.safeParse(body);

    if (!result.success) {
        return Response.json(
            { error: "Invalid input" },
            { status: 400 }
        );
    }

    const { followerId, followingId } = result.data;

    // prevent self-follow
    if (followerId === followingId) {
        return Response.json(
            { error: "You cannot follow yourself" },
            { status: 400 }
        );
    }

    // prevent duplicate follow
    const existing = await db
        .select()
        .from(follows)
        .where(
            and(
                eq(follows.followerId, followerId),
                eq(follows.followingId, followingId)
            )
        )
        .limit(1);

    if (existing.length > 0) {
        return Response.json(
            { error: "Already following this user" },
            { status: 409 }
        );
    }

    await db.insert(follows).values({
        followerId,
        followingId,
    });

    return Response.json(
        { message: "Author followed successfully" },
        { status: 201 }
    );
}