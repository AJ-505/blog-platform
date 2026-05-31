import { db } from "@/db";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const commentsSchema = z.object({
    postId: z.number(),
});

export async function POST(req: Request) {
    let body;

    try {
        body = await req.json();
    } catch {
        return Response.json(
            {error: "Invalid or missing JSON body"},
            {status: 400}
        );
    }

    const result = commentsSchema.safeParse(body);

    if(!result.success) {
        return Response.json(
            {error: "Invalid input"},
            {status: 400}
        );
    }

    const { postId } = result.data;

    try {
        const postComments = await db
            .select()
            .from(comments)
            .where(eq(comments.postId, postId));

        return Response.json(
            {comments: postComments},
            {status: 200}
        );
    } catch (err) {
        console.error("POST /api/comments failed:", err);
        return Response.json(
            {error: "Something went wrong. Please try again."},
            {status: 500}
        );
    }
}