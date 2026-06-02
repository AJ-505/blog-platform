import { NextResponse } from "next/server";

import { SESSION_COOKIE } from "@/lib/server-auth";

export async function POST() {
  const response = NextResponse.json({ message: "Signed out" });

  // Expire the session cookie immediately.
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
