import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // This is just a sample API route to demonstrate the architecture!
  const body = await req.json()
  console.log(body)
  return NextResponse.json({
    message: "Hello World! The backend API is successfully connected.",
  });
}
