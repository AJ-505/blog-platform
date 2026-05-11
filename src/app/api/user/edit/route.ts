import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const editProfileSchema = z.object({
  username: z.string().min(1, { message: "username cannot be empty" }),
  name: z.string().min(1, { message: "name cannot be less than 1 character" }),
  email: z.string().email({ message: "Invalid email format" }),
});

export async function POST(req: Request) {
  const body = await req.json();

  const result = editProfileSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      {
        error: "Invalid input",
        details: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { username, name, email } = result.data;

  await db
    .update(users)
    .set({
      name,
      email,
    })
    .where(eq(users.username, username));

  return Response.json(
    { message: "Profile updated successfully" },
    { status: 200 },
  );
}
