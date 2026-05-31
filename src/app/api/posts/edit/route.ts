import { z } from "zod"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"


// Define the schema once — validation + types in one place
const EditPostSchema = z.object({
    authorId: z.string().min(1, { message: "Username is required" }),
    postId: z.coerce.number().min(1, { message: "Post ID is required" }),
    title: z.string().trim().min(1, { message: "Title is required" }),
    content: z.string().trim().min(1, { message: "Content is required" })
});

// Infer the TypeScript type for free
type EditBody = z.infer<typeof EditPostSchema>

export async function PATCH(req: Request) {
  let body: unknown

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Replace all manual field checks with a single safeParse call
  const result = EditPostSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  // result.data is now fully typed as EditBody 
  const { authorId, postId, title, content }: EditBody = result.data

  
  const [post] = await db.select().from(posts).where(eq(posts.id, postId))

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  if (post.authorId !== authorId) {
    return NextResponse.json(
        { error: "Only authors can edit their posts"},
        { status: 403 }
    )
  }
  const [editedPost] = await db.update(posts).set({title, content})
                        .where(eq(posts.id, postId)).returning()

  return NextResponse.json({
    message: "Post edited successfully",
    post: editedPost,
  }, {status: 200})
}
