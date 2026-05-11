import Image from "next/image";

import { SiteHeader } from "@/components/home/SiteHeader";
import digitalImg from "@/assets/Digital.png";

type EventCard = {
  id: string;
  category: string;
  title: string;
  description: string;
  cta: string;
  timeBadge?: string;
  location?: string;
};

const EVENTS: EventCard[] = [
  {
    id: "1",
    category: "ART & EXPRESSION",
    title: "Echoes of the Canvas",
    description:
      "Join the Fine Arts Department for an immersive evening of live painting and digital art installations that explore the intersection of tradition and tech.",
    cta: "Register",
    timeBadge: "Oct 24 • 6:00 PM",
  },
  {
    id: "2",
    category: "ATHLETICS",
    title: "Campus Cup Finals",
    description:
      "The season’s biggest match. Witness the top two intramural teams battle for the ultimate glory.",
    cta: "Get Tickets",
    location: "Main Arena • Court A",
  },
  {
    id: "3",
    category: "LITERARY CLUB",
    title: "Bookish Brunch",
    description:
      "Discussing ‘The Secret History’ over coffee and pastries at the Student Union.",
    cta: "View Detail →",
    timeBadge: "10:00 AM",
  },
  {
    id: "4",
    category: "FASHION SOCIETY",
    title: "Strut: Spring Runway",
    description:
      "The annual student fashion show showcasing sustainable designs and creative styling.",
    cta: "View Detail →",
    timeBadge: "Limited Entry",
  },
];

function FeaturedHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/70 shadow-sm">
      <div className="absolute inset-0">
        <Image
          src={digitalImg}
          alt="Upcoming events"
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent" />
      </div>

      <div className="relative p-10 md:p-12">
        <div className="inline-flex items-center rounded-full bg-white/20 border border-white/20 px-4 py-2 text-xs font-semibold tracking-wide text-white">
          Featured Event
        </div>
        <h1 className="mt-5 text-4xl md:text-5xl font-serif font-semibold text-white">
          Upcoming Events
        </h1>
        <p className="mt-3 text-white/85 max-w-2xl">
          Discover workshops, tournaments, and galas happening this semester on
          campus.
        </p>
      </div>
    </section>
  );
}

function EventTile({ event, variant }: { event: EventCard; variant?: "wide" | "tall" }) {
  return (
    <article
      className={
        variant === "tall"
          ? "overflow-hidden rounded-3xl border border-black/10 bg-white/80 shadow-sm"
          : "overflow-hidden rounded-3xl border border-black/10 bg-white/80 shadow-sm"
      }
    >
      <div className={variant === "tall" ? "h-[230px]" : "h-[220px]"}>
        <div className="relative h-full">
          <Image
            src={digitalImg}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {event.timeBadge ? (
            <div className="absolute top-4 left-4 rounded-full bg-white/90 border border-black/10 px-3 py-2 text-xs font-medium">
              {event.timeBadge}
            </div>
          ) : null}
        </div>
      </div>

      <div className="p-7">
        <div className="text-[11px] tracking-wide uppercase text-secondary font-semibold">
          {event.category}
        </div>
        <div className="mt-2 text-2xl font-serif font-semibold text-primary">
          {event.title}
        </div>
        {event.location ? (
          <div className="mt-2 text-sm text-on-surface-variant">
            <span aria-hidden className="mr-2">
              ⌁
            </span>
            {event.location}
          </div>
        ) : null}
        <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
          {event.description}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex -space-x-2">
            <span className="w-7 h-7 rounded-full bg-pink-300 ring-2 ring-white" />
            <span className="w-7 h-7 rounded-full bg-orange-200 ring-2 ring-white" />
            <span className="w-7 h-7 rounded-full bg-violet-200 ring-2 ring-white" />
          </div>
          <button className="btn-primary px-6 py-3 rounded-xl" type="button">
            {event.cta}
          </button>
        </div>
      </div>
    </article>
  );
}

function RecommendedCard() {
  return (
    <section className="rounded-3xl border border-black/10 bg-white/80 shadow-sm p-7">
      <div className="text-lg font-semibold text-primary">
        Recommended for You
      </div>
      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-white/60 p-4">
          <div>
            <div className="font-medium text-on-surface">Hackathon Prep Night</div>
            <div className="text-sm text-on-surface-variant">Tomorrow • 7:00 PM</div>
          </div>
          <button className="w-9 h-9 rounded-full border border-black/10 bg-white" type="button">
            +
          </button>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-white/60 p-4">
          <div>
            <div className="font-medium text-on-surface">Improv Workshop</div>
            <div className="text-sm text-on-surface-variant">Friday • 4:30 PM</div>
          </div>
          <button className="w-9 h-9 rounded-full border border-black/10 bg-white" type="button">
            +
          </button>
        </div>
      </div>
    </section>
  );
}

function CalendarSyncCard() {
  return (
    <section className="rounded-3xl border border-black/10 bg-white/80 shadow-sm p-7">
      <div className="text-lg font-semibold text-primary">Calendar Sync</div>
      <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
        Never miss a deadline or mixer. Sync SCRIBBLED with your school calendar.
      </p>
      <button className="btn-primary mt-6 w-full py-3 rounded-xl" type="button">
        Connect Google Calendar
      </button>
    </section>
  );
}

export default function UpcomingEventsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="container mx-auto max-w-[1120px] px-4 py-12 flex-1">
        <div className="max-w-6xl">
          <FeaturedHero />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <EventTile event={EVENTS[0]} variant="wide" />
            </div>
            <div className="lg:col-span-1">
              <EventTile event={EVENTS[1]} variant="tall" />
            </div>

            <div className="lg:col-span-1">
              <EventTile event={EVENTS[2]} />
            </div>
            <div className="lg:col-span-2">
              <EventTile event={EVENTS[3]} />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RecommendedCard />
            <CalendarSyncCard />
          </div>
        </div>
      </div>
    </main>
  );
}
