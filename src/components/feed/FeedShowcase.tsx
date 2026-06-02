import Link from "next/link";
import Image, { type StaticImageData } from "next/image";

import retroImg from "@/assets/Retro.png";
import digitalImg from "@/assets/Digital.png";
import eventImg from "@/assets/Event.png";

type Showcase = {
  href: string;
  kicker: string;
  title: string;
  blurb: string;
  img: StaticImageData;
};

// The feed's "social hub" header: tappable previews into the richer themed
// spaces. These are the destinations students explore beyond the post stream.
const SHOWCASES: Showcase[] = [
  {
    href: "/feed/campus-fashion",
    kicker: "STYLE",
    title: "Campus Fashion",
    blurb: "Street style sparks and the looks taking over the quad.",
    img: retroImg,
  },
  {
    href: "/feed/roommate-drama",
    kicker: "DORM TALES",
    title: "Roommate Drama",
    blurb: "The fridge wars, the laundry mushrooms, the 3 AM chaos.",
    img: digitalImg,
  },
  {
    href: "/feed/upcoming-events",
    kicker: "WHAT'S ON",
    title: "Upcoming Events",
    blurb: "Workshops, tournaments, and galas happening this semester.",
    img: eventImg,
  },
];

export function FeedShowcase() {
  return (
    <section className="mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SHOWCASES.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group relative overflow-hidden rounded-2xl border border-black/10 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Image
              src={card.img}
              alt={card.title}
              width={520}
              height={420}
              className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="text-[10px] font-semibold tracking-wide uppercase text-white/75">
                {card.kicker}
              </div>
              <div className="mt-1 flex items-center gap-2 text-xl font-semibold text-white">
                {card.title}
                <span
                  aria-hidden
                  className="transition group-hover:translate-x-0.5"
                >
                  →
                </span>
              </div>
              <p className="mt-1 text-sm text-white/80 leading-snug">
                {card.blurb}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
