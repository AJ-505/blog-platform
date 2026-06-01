import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { createSessionValue, SESSION_COOKIE } from "@/lib/server-auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Define the schema once — validation + types in one place
const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
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
      {
        error: "Validation failed",
        details: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  // result.data is now fully typed as LoginBody — no casting needed!
  const { email, password }: LoginBody = result.data;

  try {
    const [user] = await db.select().from(users).where(eq(users.email, email));

    // Use the same response whether the email or the password is wrong so
    // we don't leak which accounts exist.
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const authUser = {
      username: user.username,
      name: user.name,
      email: user.email,
    };
    const response = NextResponse.json({
      message: "Login successful",
      user: authUser,
    });

    response.cookies.set(SESSION_COOKIE, createSessionValue(authUser), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (err) {
    console.error("POST /api/login failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
