import { z } from "zod";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const editProfileSchema = z.object({
  username: z.string().min(1, { message: "username cannot be empty" }),
  name: z.string().min(1, { message: "name cannot be less than 1 character" }),
  email: z.string().email({ message: "Invalid email format" }),
});

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const result = editProfileSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: "Invalid input",
        details: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { username, name, email } = result.data;

  try {
    const [updated] = await db
      .update(users)
      .set({ name, email })
      .where(eq(users.username, username))
      .returning({ username: users.username });

    if (!updated) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Profile updated successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.error("POST /api/user/edit failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
