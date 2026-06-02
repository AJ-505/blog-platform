import { db } from "@/db";
import { follows, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export type RecommendedAuthor = {
  username: string;
  name: string;
};

// Authors to surface in the "Recommended for you" panel: the newest accounts,
// minus the viewer themselves and anyone they already follow.
export async function getRecommendedAuthors(
  viewer: string | null,
  limit = 3,
): Promise<RecommendedAuthor[]> {
  const allAuthors = await db
    .select({ username: users.username, name: users.name })
    .from(users)
    .orderBy(desc(users.createdAt));

  if (!viewer) {
    return allAuthors.slice(0, limit);
  }

  const following = await db
    .select({ followingId: follows.followingId })
    .from(follows)
    .where(eq(follows.followerId, viewer));

  const excluded = new Set(following.map((f) => f.followingId));
  excluded.add(viewer);

  return allAuthors.filter((a) => !excluded.has(a.username)).slice(0, limit);
}
