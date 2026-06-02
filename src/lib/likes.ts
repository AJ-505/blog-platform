import { db } from "@/db";
import { postLikes } from "@/db/schema";
import { eq } from "drizzle-orm";

// The set of post ids the given viewer has already liked, used to render the
// initial "liked" state of like buttons. Returns an empty set for guests.
export async function getLikedPostIds(
  viewer: string | null,
): Promise<Set<number>> {
  if (!viewer) {
    return new Set();
  }

  const rows = await db
    .select({ postId: postLikes.postId })
    .from(postLikes)
    .where(eq(postLikes.userId, viewer));

  return new Set(rows.map((row) => row.postId));
}
