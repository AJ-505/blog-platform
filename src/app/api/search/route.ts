    import { db } from "@/db";
    import { users } from "@/db/schema";
    import { ilike } from "drizzle-orm";
    import { z } from "zod";

    const searchSchema = z.object({
        query: z.string().min(1),
    });

    export async function POST(req: Request){
        let body: unknown;

        try {
            body = await req.json();
        } catch {
            return Response.json(
                { error: "Invalid or missing JSON body" },
                { status: 400 }
            );
        }

        const result = searchSchema.safeParse(body);

        if(!result.success) {
            return Response.json(
                {error: "Invalid search query" },
                { status: 400 }
            );
        }

        const { query } = result.data;

        const matchedUsers = await db
        .select({
            id: users.id,
            name: users.name,
            email: users.email,
        })
        .from(users)
        .where(ilike(users.name, `%${query}%`));

        return Response.json(
            { users: matchedUsers },
            { status: 200 }
        );
    }