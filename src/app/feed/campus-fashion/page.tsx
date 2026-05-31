import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/home/SiteHeader";

import retroImg from "@/assets/Retro.png";
import modelImg from "@/assets/Model.png";

type Spark = {
  id: string;
  author: string;
  image: unknown;
  likes: string;
  comments: string;
  badge?: string;
};

const STREET_STYLE_SPARKS: Spark[] = [
  {
    id: "s1",
    author: "Jordan Wei",
    image: retroImg,
    likes: "1.2k",
    comments: "48",
    badge: "LIVE",
  },
  {
    id: "s2",
    author: "Lila Thorne",
    image: modelImg,
    likes: "892",
    comments: "31",
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm font-medium text-on-surface shadow-sm">
      {children}
    </span>
  );
}

function Stat({ icon, value }: { icon: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-on-surface-variant">
      <span aria-hidden>{icon}</span>
      <span className="font-semibold text-on-surface">{value}</span>
    </div>
  );
}

function HeroCard() {
  return (
    <article className="rounded-3xl border border-black/10 bg-white/75 backdrop-blur shadow-sm overflow-hidden">
      <div className="relative h-[260px] bg-black/5">
        <Image
          src={retroImg as never}
          alt="Retro Oversized Vibes"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center rounded-full bg-black/60 text-white px-3 py-1 text-[11px] font-semibold tracking-wide">
            Editorial
          </span>
        </div>
      </div>

      <div className="p-6">
        <h2 className=" text-2xl md:text-3xl font-semibold text-on-surface leading-snug">
          Retro Oversized Vibes: Why the 90s are Back on Campus
        </h2>
        <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
          The collegiate aesthetic is shifting. From chunky knits to baggy
          corduroy, the quad looks more like a 1994 film set than ever before.
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-black/10" />
            <div className="min-w-0">
              <div className="text-sm font-semibold text-on-surface">
                Maya Rivers
              </div>
              <div className="text-xs text-on-surface-variant">Fashion Editor</div>
            </div>
          </div>

          <button
            type="button"
            className="shrink-0 rounded-full bg-[#A95162] px-5 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90"
          >
            Subscribe
          </button>
        </div>
      </div>
    </article>
  );
}

function StreetStyleSparks() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-on-surface">
          Street Style Sparks
        </h3>
        <button type="button" className="text-sm text-[#A95162] font-semibold">
          View All
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {STREET_STYLE_SPARKS.map((s) => (
          <article
            key={s.id}
            className="rounded-2xl border border-black/10 bg-white/75 backdrop-blur shadow-sm overflow-hidden"
          >
            <div className="relative h-[160px] bg-black/5">
              <Image
                src={s.image as never}
                alt={s.author}
                fill
                className="object-cover object-center"
              />
              {s.badge ? (
                <div className="absolute right-3 bottom-3">
                  <span className="inline-flex items-center rounded-full bg-[#A95162] text-white px-3 py-1 text-[11px] font-semibold">
                    {s.badge}
                  </span>
                </div>
              ) : null}
            </div>

            <div className="p-4">
              <div className="text-sm font-semibold text-on-surface truncate">
                {s.author}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Stat icon="♡" value={s.likes} />
                  <Stat icon="💬" value={s.comments} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WeeklyLookbook() {
  return (
    <section className="rounded-3xl border border-black/10 bg-white/75 backdrop-blur shadow-sm overflow-hidden">
      <div className="relative h-[180px] bg-black/5">
        <Image
          src={modelImg as never}
          alt="Weekly Lookbook"
          fill
          className="object-cover object-center"
        />
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center rounded-full bg-black/60 text-white px-3 py-1 text-[11px] font-semibold tracking-wide">
            TRENDING
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className=" text-xl font-semibold text-on-surface">
          The “Library Aesthetic” Staples
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <Pill>Messenger Bags</Pill>
          <Pill>Thrifted Knits</Pill>
        </div>

        <div className="mt-6 rounded-2xl border border-[#A95162]/30 bg-[#A95162]/5 p-4">
          <div className="text-xs text-on-surface-variant">
            “Campus style isn&apos;t about the price tag; it&apos;s about the stories we
            scribble into our daily uniforms.” — Anonymous Senior
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CampusFashionPage() {
  return (
    <main className="bg-background min-h-screen flex flex-col">
      <SiteHeader />

      <div className="container mx-auto max-w-[1120px] px-4 py-10 flex-1">
        <div className="max-w-3xl">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className=" text-4xl md:text-5xl font-semibold text-on-surface">
                Campus Fashion
              </h1>
              <p className="mt-3 text-sm text-on-surface-variant">
                Style pulses from the quad —
              </p>
            </div>

            <Link
              href="/feed"
              className="mt-2 text-sm font-semibold text-[#A95162] hover:underline"
            >
              Back
            </Link>
          </div>

          <div className="mt-8 space-y-8">
            <HeroCard />
            <StreetStyleSparks />
            <WeeklyLookbook />
          </div>
        </div>
      </div>
    </main>
  );
}
