import Image from "next/image";

import { SiteHeader } from "@/components/home/SiteHeader";

import artImg from "@/assets/Art.png";
import ballImg from "@/assets/Ball.png";
import bookImg from "@/assets/Book.png";

type BlogItem = {
  id: string;
  status: "PUBLISHED" | "DRAFT";
  dateLabel: string;
  category: string;
  title: string;
  stats?: {
    views?: string;
    likes?: string;
    comments?: string;
  };
  image: unknown;
};

const BLOGS: BlogItem[] = [
  {
    id: "1",
    status: "PUBLISHED",
    dateLabel: "May 23, 2026",
    category: "LIFESTYLE",
    title: "The unspoken rules of the 3rd floor library",
    stats: { views: "12.4k", likes: "6k", comments: "350" },
    image: artImg,
  },
  {
    id: "2",
    status: "DRAFT",
    dateLabel: "Saved 2hrs ago",
    category: "DRAMA",
    title: "Why your roommates 3am ramen is a problem",
    image: ballImg,
  },
  {
    id: "3",
    status: "PUBLISHED",
    dateLabel: "June 23, 2026",
    category: "ACADEMIC",
    title: "Exam survival ,the coffee vs.Sleep debates",
    stats: { views: "1.4k", likes: "866", comments: "35" },
    image: bookImg,
  },
];

function StatusPill({ status }: { status: BlogItem["status"] }) {
  const cls =
    status === "PUBLISHED"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-black/10 text-on-surface-variant";
  return (
    <div
      className={`inline-flex items-center px-6 py-2 rounded-full text-sm font-semibold ${cls}`}
    >
      {status}
    </div>
  );
}

function Stat({ icon, value }: { icon: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2 text-sm text-on-surface-variant">
      <span aria-hidden>{icon}</span>
      <span className="font-medium text-on-surface">{value}</span>
    </div>
  );
}

export default function ManageBlogsPage() {
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
          <h1 className="mt-4 text-5xl md:text-6xl font-serif font-semibold text-on-surface">
            Manage your blogs
          </h1>
          <p className="mt-4 text-lg text-on-surface-variant max-w-3xl">
            Refine your stories, check your reach, and keep the campus buzzing
            with latest tea
          </p>

          <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <input
              className="w-full md:w-[520px] h-12 rounded-xl border border-black/10 bg-white/70 backdrop-blur px-4 outline-none"
              placeholder="Search by title other or keywords..."
            />
            <button
              type="button"
              className="btn-secondary px-8 py-3 rounded-full border border-black/10"
            >
              All Categories
            </button>
          </div>

          <div className="mt-10 space-y-6">
            {BLOGS.map((b) => (
              <article
                key={b.id}
                className="rounded-3xl border border-black/10 bg-white/55 backdrop-blur shadow-sm overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_120px] gap-6 items-center p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-[170px] h-[110px] rounded-2xl overflow-hidden bg-black/5">
                      <div className="absolute top-2 left-2 px-3 py-1 rounded-full bg-white/80 text-[10px] font-semibold tracking-wide">
                        {b.category}
                      </div>
                      <Image
                        src={b.image as never}
                        alt={b.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-6">
                      <StatusPill status={b.status} />
                      <div className="text-on-surface-variant font-semibold">
                        {b.dateLabel}
                      </div>
                    </div>

                    <h2 className="mt-4 text-2xl md:text-3xl font-medium text-on-surface">
                      {b.title}
                    </h2>

                    {b.stats ? (
                      <div className="mt-4 flex flex-wrap items-center gap-10">
                        <Stat icon="👁" value={b.stats.views} />
                        <Stat icon="❤" value={b.stats.likes} />
                        <Stat icon="💬" value={b.stats.comments} />
                      </div>
                    ) : null}
                  </div>

                  <div className="flex md:flex-col items-center justify-end gap-4">
                    <button
                      type="button"
                      className="w-11 h-11 rounded-full bg-black/10 hover:bg-black/15"
                      aria-label="Edit"
                      title="Edit"
                    >
                      ✎
                    </button>
                    <button
                      type="button"
                      className="w-11 h-11 rounded-full bg-black/10 hover:bg-black/15"
                      aria-label="Delete"
                      title="Delete"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
