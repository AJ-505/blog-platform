import { db } from "@/db";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const deleteSchema = z.object({
    commentId: z.number(),
});

export async function DELETE(req: Request) {
    let body;

    try {
        body = await req.json();
    } catch {
        return Response.json(
            { error: "Invalid or missing JSON body" },
            { status: 400 }
        );
    }

    const result = deleteSchema.safeParse(body);

    if (!result.success) {
        return Response.json(
            { error: "Invalid input" },
            { status: 400 }
        );
    }

    const { commentId } = result.data;

    await db
        .delete(comments)
        .where(eq(comments.id, commentId));

    return Response.json(
        { message: "Comment deleted successfully" },
        { status: 200 }
    );
}