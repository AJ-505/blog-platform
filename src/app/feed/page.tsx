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

import Link from "next/link";

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
    ? "px-5 py-2 rounded-full bg-primary text-on-primary text-sm font-medium"
    : "px-5 py-2 rounded-full bg-black/10 text-on-surface text-sm font-medium";

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

function PostCard({ post }: { post: FeedPost }) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white/75 backdrop-blur p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-serif text-2xl font-semibold text-primary leading-snug">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
            {post.description}
          </p>
          <div className="mt-4 text-sm text-on-surface-variant">
            {post.author}
          </div>
        </div>
        <button
          className="text-xs font-semibold text-secondary hover:underline"
          type="button"
        >
          Subscribe
        </button>
      </div>

      <div className="mt-6 flex items-center gap-6 text-sm text-on-surface-variant">
        <div className="flex items-center gap-2">
          <span aria-hidden>♡</span>
          <span>
            {post.likes >= 1000
              ? `${Math.round(post.likes / 100) / 10}k`
              : post.likes}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span aria-hidden>💬</span>
          <span>{post.comments}</span>
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
            <Pill>Campus fashion</Pill>
            <Pill href="/feed/upcoming-events">Upcoming events</Pill>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-8">
              {POSTS.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>

            <aside className="space-y-8">
              <div className="rounded-2xl bg-secondary/10 border border-black/5 p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center font-semibold text-primary">
                    A
                  </div>
                  <div>
                    <div className="text-xs tracking-wide uppercase text-on-surface-variant">
                      Newest
                    </div>
                    <div className="mt-1 font-semibold text-primary">
                      IKWEJI MAN
                    </div>
                    <div className="text-xs text-on-surface-variant">
                      posted 15hrs ago
                    </div>
                    <p className="mt-4 text-on-surface leading-relaxed">
                      “If the library vending machine swallows my last $5 for a
                      Red Bull at 3 AM one more time, I’m officially starting a
                      revolution. Who’s with me?
                      <br />
                      <br />
                      #ExamSurvival”
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm text-on-surface-variant">
                      <span className="inline-flex -space-x-2">
                        <span className="w-7 h-7 rounded-full bg-pink-400 ring-2 ring-white" />
                        <span className="w-7 h-7 rounded-full bg-orange-300 ring-2 ring-white" />
                        <span className="w-7 h-7 rounded-full bg-violet-300 ring-2 ring-white" />
                      </span>
                      <span>200 Students checking the vibe</span>
                    </div>
                  </div>
                  <div className="ml-auto text-xs text-secondary">
                    Relatable
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-amber-100/60 border border-black/5 p-8">
                <div className="text-secondary font-semibold">
                  Weekly Hot Take
                </div>
                <p className="mt-4 text-sm text-on-surface-variant leading-relaxed">
                  “Campus coffee tastes like burnt disappointment but we still
                  queue for 20 minutes every morning. Why are we like this?”
                </p>
                <div className="mt-3 text-xs text-on-surface-variant">
                  643 VOTES
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
