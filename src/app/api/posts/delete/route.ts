import { z } from "zod"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { getCurrentUser } from "@/lib/server-auth"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"


// Define the schema once — validation + types in one place. The author is taken
// from the session, never the request body, so a caller can't delete posts they
// don't own by spoofing an authorId.
const DeletePostSchema = z.object({
    postId: z.coerce.number().min(1, { message: "Post ID is required" })
});

// Infer the TypeScript type for free
type DeleteBody = z.infer<typeof DeletePostSchema>

export async function DELETE(req: Request) {
  let body: unknown

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Replace all manual field checks with a single safeParse call
  const result = DeletePostSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "You must be signed in to delete a post" },
      { status: 401 },
    );
  }

  // result.data is now fully typed as DeleteBody
  const { postId }: DeleteBody = result.data


  const [post] = await db.select().from(posts).where(eq(posts.id, postId))

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  if (post.authorId !== currentUser.username) {
    return NextResponse.json(
        { error: "Only authors can delete their posts"},
        { status: 403 }
    )
  }
  const [deletedPost] = await db.delete(posts).where(eq(posts.id, postId)).returning()

  if (!deletedPost) {
  return NextResponse.json(
    { error: "Failed to delete post" },
    { status: 500 }
  )
}

  return NextResponse.json({
    message: "Post deleted successfully",
    post: deletedPost,
  }, {status: 200})
}
