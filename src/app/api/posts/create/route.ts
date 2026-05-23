import { z } from "zod";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { NextResponse } from "next/server";

// Define the schema once — validation + types in one place
const CreatePostSchema = z.object({
  authorId: z.string().min(1, { message: "Username is required" })
                      .max(30, { message: "Username too long" }),
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" })
});

// Infer the TypeScript type for free
type CreateBody = z.infer<typeof CreatePostSchema>;

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Replace all manual field checks with a single safeParse call
  const result = CreatePostSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // result.data is now fully typed as CreateBody 
  const { authorId, title, content }: CreateBody = result.data;

  
  const [newPost] = await db.insert(posts).values({authorId, title, content}).returning()

  if (!newPost) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }


  return NextResponse.json({
    message: "Post created successfully",
    post: newPost,
  }, {status: 201})
}