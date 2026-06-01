import { z } from "zod";
import { db } from "@/db";
import { posts, users } from "@/db/schema";
import { getCurrentUser } from "@/lib/server-auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Define the schema once — validation + types in one place
const CreatePostSchema = z.object({
  authorId: z.string().trim().min(1).max(30).optional(),
  title: z.string().trim().min(1, { message: "Title is required" }),
  excerpt: z.string().trim().max(240).optional(),
  content: z.string().trim().min(1, { message: "Content is required" }),
  badge: z.string().trim().max(40).optional(),
  imageKey: z.string().trim().max(40).optional(),
  isDiscover: z.boolean().optional(),
});

// Infer the TypeScript type for free
type CreateBody = z.infer<typeof CreatePostSchema>;

function slugifyTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function excerptFromContent(content: string) {
  return content
    .replace(/^---[\s\S]*?---/, "")
    .replace(/[#_*`>\-[\]()]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);
}

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
      {
        error: "Validation failed",
        details: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  // result.data is now fully typed as CreateBody
  const currentUser = await getCurrentUser();
  const authorId = result.data.authorId ?? currentUser?.username;

  if (!authorId) {
    return NextResponse.json(
      { error: "You must be signed in to create a post" },
      { status: 401 },
    );
  }

  const { title, content, excerpt, badge, imageKey, isDiscover }: CreateBody =
    result.data;

  try {
    const [author] = await db
      .select({ username: users.username })
      .from(users)
      .where(eq(users.username, authorId));

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    const [newPost] = await db
      .insert(posts)
      .values({
        authorId,
        title,
        slug: `${slugifyTitle(title)}-${Date.now().toString(36)}`,
        excerpt: excerpt || excerptFromContent(content) || title,
        content,
        badge: badge || null,
        imageKey: imageKey || null,
        isDiscover: isDiscover ? 1 : 0,
      })
      .returning();

    if (!newPost) {
      return NextResponse.json(
        { error: "Failed to create post" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Post created successfully", post: newPost },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /api/posts/create failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
