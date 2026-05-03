import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) 
{
    const body = await req.json();
    const { userId, name, email } = body;

    if (!userId || !name || !email)
    {
        return Response.json(
            {error: "Missing fields"},
            {status: 400}
        );
    }

    await db
    .update(users)
    .set({
        name,
        email,
    })
    .where(eq(users.id, userId));

    return Response.json(
        {message: "Profile updated successfully"},
        {status: 200}
    );
}