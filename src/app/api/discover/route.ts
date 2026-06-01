import { getDiscoverPosts } from "@/lib/posts";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const discoverPosts = await getDiscoverPosts();
    return NextResponse.json({ posts: discoverPosts }, { status: 200 });
  } catch (err) {
    console.error("GET /api/discover failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
