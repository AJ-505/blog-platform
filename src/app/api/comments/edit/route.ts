import { db } from "@/db";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const editSchema = z.object({
    commentId: z.number(),
    content: z.string().min(1),
});

export async function PATCH(req: Request) {
    let body;

    try {
        body = await req.json();
    } catch {
        return Response.json(
            { error: "Invalid or missing JSON body" },
            { status: 400 }
        );
    }

    const result = editSchema.safeParse(body);

    if (!result.success) {
        return Response.json(
            { error: "Invalid input" },
            { status: 400 }
        );
    }

    const { commentId, content } = result.data;

    await db
        .update(comments)
        .set({ content })
        .where(eq(comments.id, commentId));

    return Response.json(
        { message: "Comment updated successfully" },
        { status: 200 }
    );
}