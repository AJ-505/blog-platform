import { db } from "@/db";
import { users, follows } from "@/db/schema";
import { eq, sql, desc } from "drizzle-orm";
import { SiteHeader } from "@/components/home/SiteHeader";
import Link from "next/link";
import Image from "next/image";

export default async function AuthorsPage() {
  const authors = await db
    .select({
      username: users.username,
      name: users.name,
      followerCount: sql<number>`count(${follows.followerId})`.as("followerCount"),
    })
    .from(users)
    .leftJoin(follows, eq(users.username, follows.followingId))
    .groupBy(users.username, users.name)
    .orderBy(desc(sql`count(${follows.followerId})`));

  return (
    <main className="min-h-screen pb-16">
      <SiteHeader />
      <div className="container mx-auto px-4 mt-8 max-w-5xl">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#8E3B46" }}>
          Authors
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <Link
              key={author.username}
              href={`/authors/${author.username}`}
              className="block bg-white rounded-3xl p-6 border border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 relative">
                  <Image
                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${author.username}&backgroundColor=b6e3f4`}
                    alt={`${author.name}'s profile`}
                    fill
                    className="object-cover"
                    sizes="64px"
                    unoptimized
                  />
                </div>
                <div>
                  <h2 className="font-bold text-xl text-[#0B1F3B]">
                    {author.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    @{author.username}
                  </p>
                  <p className="text-sm font-medium mt-1 text-[#8E3B46]">
                    {author.followerCount} {author.followerCount === 1 ? "follower" : "followers"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
