import Image from "next/image";

import { SiteHeader } from "@/components/home/SiteHeader";

import artImg from "@/assets/Art.png";
import bookImg from "@/assets/Book.png";
import eventImg from "@/assets/Event.png";
import modelImg from "@/assets/Model.png";

type DiscoverPost = {
  id: string;
  author: string;
  badge?: string;
  timeAgo: string;
  title: string;
  excerpt: string;
  image?: unknown;
  likes: string;
  comments: string;
};

const POSTS: DiscoverPost[] = [
  {
    id: "p1",
    author: "Professor H. Whittaker",
    badge: "SCRIBBLED ORIGINAL",
    timeAgo: "12h",
    title:
      "The Secret History of the Quad: Underground Tunnels & Midnight Myths",
    excerpt:
      "Discover the hidden world beneath our feet. For decades, students have whispered about a labyrinth of tunnels connecting the oldest halls of residence...",
    image: eventImg,
    likes: "1.4k",
    comments: "86",
  },
  {
    id: "p2",
    author: "Maya Rivers",
    badge: "CAMPUS FASHION",
    timeAgo: "2d",
    title: "Retro Oversized Vibes: Why the 90s are Back on Campus",
    excerpt:
      "Ditch the tight fit. We’re exploring the rise of comfort-first campus aesthetics this fall. From oversized cable knits to baggy corduroy, here's how to nail the look...",
    image: modelImg,
    likes: "312",
    comments: "14",
  },
  {
    id: "p3",
    author: "Roommate Drama",
    badge: "ROOMMATE DRAMA",
    timeAgo: "3d",
    title: "The Shared Router Incident: A Tragedy in 3 Parts",
    excerpt:
      "Why setting the WiFi password to 'LaundryIsYourJob' was a bad idea and led to a three-week internet blackout...",
    likes: "1.2k",
    comments: "58",
  },
  {
    id: "p4",
    author: "Jordan Chen",
    badge: "CAMPUS LIFE",
    timeAgo: "6d",
    title: "Midnight Coffee Runs: The Unofficial Campus Tradition",
    excerpt:
      "Some things only happen after 11 PM — group chats, deep talks, and the collective mission to find the only café still open...",
    image: artImg,
    likes: "780",
    comments: "33",
  },
  {
    id: "p5",
    author: "Elena M.",
    badge: "STUDY",
    timeAgo: "1w",
    title: "How I Study When I Don’t Feel Like Studying",
    excerpt:
      "A realistic system for low-motivation days: micro-tasks, ambient noise, and the 20-minute promise that actually works...",
    image: bookImg,
    likes: "2.1k",
    comments: "104",
  },
];

function IconStat({ icon, value }: { icon: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-on-surface-variant">
      <span aria-hidden>{icon}</span>
      <span className="font-medium text-on-surface">{value}</span>
    </div>
  );
}

function PostActions({ likes, comments }: { likes: string; comments: string }) {
  return (
    <div className="mt-5 flex items-center justify-between text-on-surface-variant">
      <div className="flex items-center gap-6">
        <IconStat icon="♡" value={likes} />
        <IconStat icon="💬" value={comments} />
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="hover:text-primary"
          aria-label="Repost"
        >
          ⟲
        </button>
        <button type="button" className="hover:text-primary" aria-label="Share">
          ↗
        </button>
      </div>
    </div>
  );
}

function PostCard({ post }: { post: DiscoverPost }) {
  const hasHero = Boolean(post.image);

  return (
    <article className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur shadow-sm overflow-hidden">
      <div className="p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-black/10" />
            <div>
              <div className="flex items-center gap-2">
                <div className="font-semibold text-on-surface">
                  {post.author}
                </div>
                <div className="text-on-surface-variant">•</div>
                <div className="text-sm text-on-surface-variant">
                  {post.timeAgo}
                </div>
              </div>
              {post.badge ? (
                <div className="mt-1 text-[11px] tracking-wide uppercase text-secondary font-semibold">
                  {post.badge}
                </div>
              ) : null}
            </div>
          </div>

          <button
            type="button"
            className="px-4 py-2 rounded-full text-white  bg-[#A95162] text-on-surface text-sm font-medium shadow-sm border border-black/10 hover:bg-[#F2C7B8] hover:text-black transition"
          >
            Subscribe
          </button>
        </div>

        <h2 className="mt-4 text-2xl md:text-3xl font-serif font-semibold text-on-surface leading-snug">
          {post.title}
        </h2>
        <p className="mt-3 text-on-surface-variant leading-relaxed">
          {post.excerpt}
        </p>
      </div>

      {hasHero ? (
        <div className="px-6 md:px-7 pb-6 md:pb-7">
          <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-black/5 h-[240px] md:h-[300px]">
            <Image
              src={post.image as never}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
          <PostActions likes={post.likes} comments={post.comments} />
        </div>
      ) : (
        <div className="px-6 md:px-7 pb-6 md:pb-7">
          <div className="rounded-2xl border border-black/10 bg-white/60 p-5">
            <div className="text-sm text-on-surface-variant">
              {post.excerpt}
            </div>
          </div>
          <PostActions likes={post.likes} comments={post.comments} />
        </div>
      )}
    </article>
  );
}

function RecommendedUsers() {
  const users = [
    { name: "Sarah K." },
    { name: "Jordan Chen" },
    { name: "Elena M." },
  ];

  return (
    <section className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur shadow-sm overflow-hidden">
      <div className="p-5 flex items-center justify-between">
        <div className="font-semibold text-on-surface">Recommended for you</div>
        <button
          type="button"
          className="text-on-surface-variant hover:text-primary"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className="px-5 pb-5 grid grid-cols-3 gap-4">
        {users.map((u) => (
          <div
            key={u.name}
            className="rounded-2xl border border-black/10 bg-white/70 p-4 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-black/10 mx-auto" />
            <div className="mt-3 text-sm font-medium text-on-surface truncate">
              {u.name}
            </div>
            <button
              type="button"
              className="mt-3 w-full rounded-full bg-[#A95162] text-white py-2 text-sm font-medium shadow-sm border border-black/10 hover:bg-[#F2C7B8] hover:text-black transition"
            >
              Follow
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrendingNow() {
  return (
    <section className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
          <span aria-hidden>↗</span>
          <span>TRENDING NOW</span>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <div className="text-xs font-semibold text-secondary">
              #1 Campus Life
            </div>
            <div className="mt-1 font-medium text-on-surface">
              The Shared Router Incident
            </div>
            <div className="text-xs text-on-surface-variant">
              5.4k students talking about this
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-secondary">
              #2 Food & Drink
            </div>
            <div className="mt-1 font-medium text-on-surface">
              Midnight Coffee Runs
            </div>
            <div className="text-xs text-on-surface-variant">
              2.1k mentions today
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-secondary">
              #3 Academics
            </div>
            <div className="mt-1 font-medium text-on-surface">
              The Library Ghost is Back
            </div>
            <div className="text-xs text-on-surface-variant">
              18k spooky whispers
            </div>
          </div>
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-xl border border-black/10 bg-white/60 py-3 text-sm font-medium hover:bg-white"
        >
          See the full list
        </button>
      </div>
    </section>
  );
}

export default function DiscoverPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="container mx-auto max-w-[1120px] px-4 py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="space-y-8">
            <PostCard post={POSTS[0]} />
            <RecommendedUsers />
            {POSTS.slice(1).map((p) => (
              <PostCard key={p.id} post={p} />
            ))}

            {/* Extra posts for scroll */}
            <PostCard
              post={{
                id: "p6",
                author: "Campus Chronicle",
                badge: "CAMPUS LIFE",
                timeAgo: "1w",
                title: "Dorm Room Decor on a Budget: The 5-Item Rule",
                excerpt:
                  "A quick guide to making your space feel like you without spending a fortune — lighting, texture, and one bold statement piece...",
                image: artImg,
                likes: "540",
                comments: "22",
              }}
            />
            <PostCard
              post={{
                id: "p7",
                author: "Late Night Lab",
                badge: "ACADEMICS",
                timeAgo: "2w",
                title: "Group Projects: The Survival Manual",
                excerpt:
                  "How to assign roles, set deadlines, and avoid the classic 'seen at 2:13 AM' teammate situation...",
                image: bookImg,
                likes: "1.9k",
                comments: "97",
              }}
            />
          </div>

          <aside className="space-y-6 sticky top-6">
            <TrendingNow />
          </aside>
        </div>
      </div>
    </main>
  );
}
