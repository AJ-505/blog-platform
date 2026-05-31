import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { or, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Define the schema once — validation + types in one place
const SignupSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(30, { message: "Username too long" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username may only contain letters, numbers and underscores",
    }),
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

// Infer the TypeScript type for free
type SignupBody = z.infer<typeof SignupSchema>;

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const result = SignupSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { username, name, email, password }: SignupBody = result.data;

  try {
    // Reject duplicates up front for a clean, specific error message
    const [existing] = await db
      .select({ username: users.username, email: users.email })
      .from(users)
      .where(or(eq(users.username, username), eq(users.email, email)));

    if (existing) {
      const field = existing.email === email ? "email" : "username";
      return NextResponse.json(
        { error: `An account with that ${field} already exists` },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [newUser] = await db
      .insert(users)
      .values({ username, name, email, passwordHash })
      .returning({
        username: users.username,
        name: users.name,
        email: users.email,
      });

    if (!newUser) {
      return NextResponse.json(
        { error: "Failed to create account" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Account created successfully", user: newUser },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /api/signup failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
