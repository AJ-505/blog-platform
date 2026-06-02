import { redirect } from "next/navigation";

import { SiteHeader } from "@/components/home/SiteHeader";
import { ManageBlogsView } from "@/components/studio/ManageBlogsView";
import { getCategoryByLabel } from "@/lib/categories";
import { getPostsByAuthor } from "@/lib/posts";
import { getCurrentUser } from "@/lib/server-auth";

import artImg from "@/assets/Art.png";
import bookImg from "@/assets/Book.png";
import discoverImg from "@/assets/Discover.png";
import retroImg from "@/assets/Retro.png";

// Mirrors the cover keys offered in the studio editor.
const imageByKey = {
  art: artImg,
  book: bookImg,
  discover: discoverImg,
  retro: retroImg,
} as const;

function formatTimeAgo(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(1, Math.floor(diffMs / (1000 * 60)));

  if (diffMinutes < 60) {
    return `${diffMinutes}min`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}hr${diffHours > 1 ? "s" : ""}`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
  }

  return `${Math.floor(diffDays / 7)} week${diffDays >= 14 ? "s" : ""}`;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ManageBlogsPage() {
  const user = await getCurrentUser();

  // Belt-and-suspenders: the studio layout already gates this, but never render
  // someone else's manage view if the session is missing here.
  if (!user) {
    redirect("/login?next=/studio/manage-blogs");
  }

  const rows = await getPostsByAuthor(user.username);

  const blogs = rows.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.badge ?? "UNCATEGORIZED",
    categorySlug: getCategoryByLabel(post.badge)?.slug ?? "uncategorized",
    status: (post.status === "published" ? "PUBLISHED" : "DRAFT") as
      | "PUBLISHED"
      | "DRAFT",
    dateLabel:
      post.status === "published"
        ? formatDate(post.createdAt)
        : `Saved ${formatTimeAgo(post.updatedAt)} ago`,
    likes: post.likes,
    comments: post.comments,
    image: post.imageKey
      ? (imageByKey[post.imageKey as keyof typeof imageByKey] ?? null)
      : null,
  }));

  return (
    <main className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="container mx-auto max-w-[1120px] px-4 py-12 flex-1">
        <div className="max-w-6xl">
          <div
            className="text-sm tracking-wide uppercase font-semibold"
            style={{ color: "#6AA599" }}
          >
            ───── My Creative Space
          </div>
          <h1 className="mt-4 text-5xl md:text-6xl font-semibold text-on-surface">
            Manage your blogs
          </h1>
          <p className="mt-4 text-lg text-on-surface-variant max-w-3xl">
            Refine your stories, check your reach, and keep the campus buzzing
            with latest tea
          </p>

          <ManageBlogsView blogs={blogs} />
        </div>
      </div>
    </main>
  );
}
