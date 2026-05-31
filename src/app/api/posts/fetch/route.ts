import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
    const allPosts = await db
        .select()
        .from(posts)
        .orderBy(desc(posts.createdAt));

    return Response.json(
        {posts: allPosts},
        {status: 200}
    );
}