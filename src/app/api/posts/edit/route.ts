import { z } from "zod";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { getCurrentUser } from "@/lib/server-auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Define the schema once — validation + types in one place
const EditPostSchema = z
  .object({
    postId: z.coerce.number().min(1, { message: "Post ID is required" }),
    title: z.string().trim().min(1, { message: "Title is required" }),
    content: z.string().trim(),
    excerpt: z.string().trim().max(240).optional(),
    badge: z.string().trim().max(40).optional(),
    imageKey: z.string().trim().max(40).optional(),
    isDiscover: z.boolean().optional(),
    status: z.enum(["draft", "published"]).optional(),
  })
  // Published posts need a body; drafts may be saved with just a title.
  .refine((data) => data.status === "draft" || data.content.length > 0, {
    message: "Content is required",
    path: ["content"],
  });

// Infer the TypeScript type for free
type EditBody = z.infer<typeof EditPostSchema>;

export async function PATCH(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Replace all manual field checks with a single safeParse call
  const result = EditPostSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "You must be signed in to edit a post" },
      { status: 401 },
    );
  }

  const { postId, title, content, excerpt, badge, imageKey, isDiscover, status }: EditBody =
    result.data;

  try {
    const [post] = await db.select().from(posts).where(eq(posts.id, postId));

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (post.authorId !== currentUser.username) {
      return NextResponse.json(
        { error: "Only authors can edit their posts" },
        { status: 403 },
      );
    }

    // Build the update from the fields that were actually provided so callers
    // can patch a single thing (e.g. autosave a draft body) without clobbering
    // the rest of the record.
    const updates: Partial<typeof posts.$inferInsert> = {
      title,
      content,
      updatedAt: new Date(),
    };

    if (excerpt !== undefined) updates.excerpt = excerpt || post.excerpt;
    if (badge !== undefined) updates.badge = badge || null;
    if (imageKey !== undefined) updates.imageKey = imageKey || null;
    if (status !== undefined) updates.status = status;
    if (isDiscover !== undefined) updates.isDiscover = isDiscover ? 1 : 0;

    // Drafts must never leak into Discover.
    if (updates.status === "draft") updates.isDiscover = 0;

    const [editedPost] = await db
      .update(posts)
      .set(updates)
      .where(eq(posts.id, postId))
      .returning();

    return NextResponse.json(
      { message: "Post edited successfully", post: editedPost },
      { status: 200 },
    );
  } catch (err) {
    console.error("PATCH /api/posts/edit failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
