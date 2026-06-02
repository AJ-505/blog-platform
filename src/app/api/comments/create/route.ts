import { db } from "@/db";
import { comments } from "@/db/schema";
import { getCurrentUser } from "@/lib/server-auth";
import { z } from "zod";

const commentSchema = z.object({
    postId: z.number(),
    content: z.string().min(1),
});

export async function POST(req: Request){
    let body;

    try{
        body = await req.json();
    } catch {
        return Response.json(
            {error: "Invalid or missing JSON body"},
            {status: 400}
        );
    }

    const result = commentSchema.safeParse(body);

    if(!result.success) {
        return Response.json(
            { error: "Invalid input" },
            { status: 400 }
        );
    }

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return Response.json(
            { error: "Sign in to comment" },
            { status: 401 }
        );
    }

    const { postId, content } = result.data;

    await db.insert(comments).values({
        postId,
        authorId: currentUser.username,
        content,
    });

    return Response.json(
        { message: "Comment added successfully" },
        { status: 201 }
    );
}
