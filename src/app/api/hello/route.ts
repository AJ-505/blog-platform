import { NextResponse } from "next/server";

export async function GET() {
  // This is just a sample API route to demonstrate the architecture!
  return NextResponse.json({
    message: "Hello World! The backend API is successfully connected.",
  });
}
