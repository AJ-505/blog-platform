import Image from "next/image";

import { SiteHeader } from "@/components/home/SiteHeader";
import digitalImg from "@/assets/Digital.png";

function Stat({ icon, value }: { icon: string; value: number }) {
  return (
    <div className="flex items-center gap-2 text-sm text-on-surface-variant">
      <span aria-hidden>{icon}</span>
      <span>{value}</span>
    </div>
  );
}

function PostCardLarge() {
  return (
    <article className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur shadow-sm p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-black/10" />
        <div className="min-w-0 flex-1">
          <div className="font-medium text-on-surface">Sarah K.</div>
          <div className="text-sm text-on-surface-variant">
            2 hours ago • South Hall
          </div>
        </div>
        <div className="text-xs px-4 py-2 rounded-full border border-black/10 bg-white/70">
          The Fridge War
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6 items-center">
        <p className="text-on-surface-variant leading-relaxed">
          I marked my Oatly with a sharpie. I even drew a little “Sarah’s Milk”
          cow on it. ✨ Yet, here I am, pouring my cereal only to find a single,
          lonely tablespoon left at the bottom. To whoever drank my $7 oat milk:
          I hope you enjoyed your latte, because the bill is coming.
        </p>
        <div className="relative overflow-hidden rounded-xl border border-black/10 bg-white h-[140px]">
          <Image
            src={digitalImg}
            alt="Preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-6">
        <Stat icon="♡" value={124} />
        <Stat icon="💬" value={42} />
        <div className="ml-auto text-on-surface-variant">↗</div>
      </div>
    </article>
  );
}

function PostCardSmall({
  title,
  body,
  author,
  meta,
  likes,
  comments,
}: {
  title: string;
  body: string;
  author: string;
  meta: string;
  likes: number;
  comments: number;
}) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur shadow-sm p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-black/10" />
        <div>
          <div className="font-medium text-on-surface">{author}</div>
          <div className="text-sm text-on-surface-variant">{meta}</div>
        </div>
      </div>

      <h3 className="mt-5 font-medium text-secondary">{title}</h3>
      <p className="mt-3 text-on-surface-variant leading-relaxed">{body}</p>

      <div className="mt-6 flex items-center gap-6">
        <Stat icon="♡" value={likes} />
        <Stat icon="💬" value={comments} />
      </div>
    </article>
  );
}

function TrendingCard() {
  return (
    <aside className="rounded-2xl bg-[#7A3B44] text-white shadow-sm p-7">
      <div className="text-sm font-semibold tracking-wide">TRENDING NOW</div>
      <div className="mt-4 text-xl font-serif font-semibold">
        The Shared Router Incident
      </div>
      <p className="mt-4 text-white/80 leading-relaxed">
        Someone changed the WiFi password to “PayYourRentKevin” and Kevin hasn’t
        been seen outside his room since Tuesday. The campus tech forum is in
        shambles.
      </p>
      <button
        className="mt-6 w-full rounded-xl bg-white/15 border border-white/20 py-3 font-medium"
        type="button"
      >
        Read 58 Comments
      </button>
    </aside>
  );
}

export default function RoommateDramaPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="container mx-auto max-w-[1120px] px-4 py-12 flex-1">
        <div className="max-w-6xl">
          <h1 className="text-xl text-on-surface">
            Roommate <span className="underline decoration-secondary">Drama</span>
          </h1>
          <p className="mt-1 text-on-surface-variant">
            Spilling the tea on dorm life, one post at a time.
          </p>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
            <div>
              <PostCardLarge />

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <PostCardSmall
                  author="Marcus V."
                  meta="5 hours ago • West Wing"
                  title="The Laundry Mushroom"
                  body="Update: The wet towel my roommate left in the hamper three weeks ago has officially developed its own ecosystem. I think I saw a spore cloud today. I'm afraid to touch it. Do I call a botanist or a hazmat team?"
                  likes={89}
                  comments={15}
                />
                <PostCardSmall
                  author="Jamie L."
                  meta="8 hours ago • North Commons"
                  title="Stranger Danger?"
                  body="Woke up to find a complete stranger asleep on our couch. Roommate says 'it's just Tyler from Psych class.' Tyler has been here for three days. Tyler doesn't even go to this school. He just likes our beanbag chair. Help."
                  likes={210}
                  comments={34}
                />
              </div>
            </div>

            <TrendingCard />
          </div>
        </div>
      </div>
    </main>
  );
}
