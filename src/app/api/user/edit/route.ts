import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const editProfileSchema = z.object({
    userId: z.number(),
    name: z.string().min(1, {message: "name cannot be less than 1 character"}),
    email: z.string().email({message: "Invalid email format"}),
});

export async function POST(req: Request) 
{
    const body = await req.json();
   
    const result = editProfileSchema.safeParse(body);

    if(!result.success)
    {
        return Response.json(
            {
                error: "Invalid input",
                details: result.error.flatten().fieldErrors,
            },
            { status: 400 }
        );
    }

    const { userId, name, email } = result.data;

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