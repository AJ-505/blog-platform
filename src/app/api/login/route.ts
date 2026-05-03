import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Define the schema once — validation + types in one place
const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

// Infer the TypeScript type for free
type LoginBody = z.infer<typeof LoginSchema>;

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Replace all manual field checks with a single safeParse call
  const result = LoginSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // result.data is now fully typed as LoginBody — no casting needed!
  const { email, password }: LoginBody = result.data;

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({
    message: "Login successful",
    user: { id: user.id, name: user.name, email: user.email },
  });
}