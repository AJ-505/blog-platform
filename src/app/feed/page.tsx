import Link from "next/link";

import { SiteHeader } from "@/components/home/SiteHeader";

type FeedPost = {
  id: string;
  title: string;
  author: string;
  description: string;
  likes: number;
  comments: number;
  topic?: string;
  timeAgo?: string;
};

const POSTS: FeedPost[] = [
  {
    id: "1",
    title: "Still a Writer, Even When I Wasn't Writing",
    author: "Akunnа",
    description:
      "If I had been told that somewhere along the line I would not only stop writing every day, but would also begin to dread putting my thoughts down — or worse, feel indifferent about sharing them — I would have laughed at the person who said it.",
    likes: 32,
    comments: 10,
    topic: "THE DAILY BUZZ",
    timeAgo: "12m ago",
  },
  {
    id: "2",
    title: "Campus Conversations: roommate drama is an extreme sport",
    author: "Saffron Collins",
    description:
      "Let me dish you a mix of trending news + peppered entertainment tea from around campus.",
    likes: 1000,
    comments: 450,
    topic: "CAMPUS",
    timeAgo: "1h ago",
  },
];

function Pill({
  children,
  active,
  href,
}: {
  children: React.ReactNode;
  active?: boolean;
  href?: string;
}) {
  const className = active
    ? "px-5 py-2 rounded-full bg-[#A95162] text-white text-sm font-medium shadow-sm"
    : "px-5 py-2 rounded-full bg-black/10 text-on-surface text-sm font-medium transition hover:bg-[#F6D3C7] hover:text-primary hover:shadow-sm hover:-translate-y-[1px] border border-transparent hover:border-black/10";

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} type="button">
      {children}
    </button>
  );
}

function Stat({ icon, value }: { icon: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-on-surface-variant">
      <span aria-hidden>{icon}</span>
      <span className="font-medium text-on-surface">{value}</span>
    </div>
  );
}

function OriginalPostCard({ post }: { post: FeedPost }) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white/75 backdrop-blur shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-on-surface-variant">
              ORIGINAL
            </div>

            <h2 className="mt-4 font-serif text-2xl md:text-3xl font-semibold text-on-surface leading-snug">
              {post.title}
            </h2>

            <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
              {post.description}
            </p>
          </div>

          <button
            type="button"
            className="shrink-0 rounded-full bg-[#A95162] px-5 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90"
          >
            Subscribe
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="text-sm text-on-surface-variant">• {post.author}</div>

          <div className="flex items-center gap-6">
            <Stat icon="♡" value={`${post.likes}`} />
            <Stat icon="💬" value={`${post.comments}`} />
          </div>
        </div>
      </div>
    </article>
  );
}

function NewestCard() {
  return (
    <section className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur shadow-sm p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-black/10" />
          <div className="min-w-0">
            <div className="text-xs tracking-wide uppercase text-on-surface-variant">
              Posted 15hrs ago
            </div>
            <div className="mt-1 font-semibold text-on-surface">IKWEJI MAN</div>
            <div className="mt-1 text-[11px] text-on-surface-variant">
              POSED THIS
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full bg-[#A95162] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-90"
          >
            Subscribe
          </button>
          <span className="rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold text-on-surface-variant">
            Relatable
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm text-on-surface-variant leading-relaxed">
        “If the library vending machine swallows my last $5 for a Red Bull at 3
        AM one more time, I’m officially starting a revolution. Who’s with me?”
      </p>

      <div className="mt-3 text-sm text-secondary font-semibold">
        #ExamSurvival
      </div>

      <div className="mt-5 flex items-center gap-2 text-xs text-on-surface-variant">
        <span className="inline-flex -space-x-2">
          <span className="w-7 h-7 rounded-full bg-pink-400 ring-2 ring-white" />
          <span className="w-7 h-7 rounded-full bg-orange-300 ring-2 ring-white" />
          <span className="w-7 h-7 rounded-full bg-violet-300 ring-2 ring-white" />
        </span>
        <span>200 Students checking the vibe</span>
      </div>
    </section>
  );
}

function WeeklyHotTakeCard() {
  return (
    <section className="rounded-2xl border border-black/10 bg-white/75 backdrop-blur shadow-sm p-5">
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-on-surface-variant">
        <span aria-hidden>⚡</span>
        <span>WEEKLY HOT TAKE</span>
      </div>

      <p className="mt-4 font-serif text-xl md:text-2xl font-semibold text-on-surface leading-snug">
        “Campus coffee tastes like burnt disappointment but we still queue for
        20 minutes every morning. Why are we like this?”
      </p>

      <div className="mt-5 space-y-3">
        <button
          type="button"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-left text-sm hover:bg-black/5"
        >
          I’m addicted
        </button>
        <button
          type="button"
          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-left text-sm hover:bg-black/5"
        >
          Just here for the vibe
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-on-surface-variant">
        <span>
          <span className="text-secondary font-semibold">•</span> Campus Daily
        </span>
        <button
          type="button"
          className="rounded-full bg-[#A95162] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-90"
        >
          Subscribe
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-on-surface-variant">
        <span>643 VOTES</span>
        <button type="button" className="text-[#A95162] font-semibold">
          See Results
        </button>
      </div>
    </section>
  );
}

function TrendingCard({ post }: { post: FeedPost }) {
  const likes =
    post.likes >= 1000
      ? `${Math.round(post.likes / 100) / 10}k`
      : `${post.likes}`;

  return (
    <article className="rounded-2xl border border-black/10 bg-white/75 backdrop-blur shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-on-surface-variant">
              TRENDING
            </div>

            <h3 className="mt-4 font-serif text-2xl font-semibold text-on-surface leading-snug">
              {post.title}
            </h3>

            <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
              {post.description}
            </p>
          </div>

          <button
            type="button"
            className="shrink-0 rounded-full bg-[#A95162] px-5 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90"
          >
            Subscribe
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-on-surface-variant">• {post.author}</div>
          <div className="flex items-center gap-6">
            <Stat icon="♡" value={likes} />
            <Stat icon="💬" value={`${post.comments}`} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function FeedPage() {
  return (
    <main className="bg-background min-h-screen flex flex-col">
      <SiteHeader />

      <div className="container mx-auto max-w-[1120px] px-4 py-12 flex-1">
        <div className="max-w-5xl">
          <div className="inline-flex items-center rounded-full bg-black/5 px-5 py-2 text-xs font-semibold tracking-wide">
            THE DAILY BUZZ
          </div>

          <h1 className="mt-6 font-serif font-semibold leading-[1.05]">
            <span className="block text-5xl md:text-6xl text-on-surface">
              Campus
            </span>
            <span className="block text-5xl md:text-6xl text-secondary">
              Conversations
            </span>
          </h1>

          <div className="mt-6 flex flex-wrap gap-3">
            <Pill active>All sparks</Pill>
            <Pill href="/feed/roommate-drama">Roommate drama</Pill>
            <Pill>Exam survival</Pill>
            <Pill href="/feed/campus-fashion">Campus fashion</Pill>
            <Pill href="/feed/upcoming-events">Upcoming events</Pill>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-8">
              <OriginalPostCard post={POSTS[0]} />
              <NewestCard />
            </div>

            <aside className="space-y-8">
              <WeeklyHotTakeCard />
              <TrendingCard post={POSTS[1]} />
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
