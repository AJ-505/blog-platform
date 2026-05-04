import Image from "next/image";

import heroImage from "@/assets/Creative workspace.png";

export function HeroSection() {
  return (
    <section className="hero grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-14">
      <div className="flex flex-col">
        <h1 className="mt-4 text-5xl md:text-6xl leading-[1.05] font-serif font-semibold">
          <span className="block text-primary">Share Your Story</span>
          <span className="block text-secondary">with the World</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed">
          A premium digital space for visionaries and thinkers. Publish
          beautiful articles, build a community, and elevate your creative voice
          with our articulate publishing tools.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <button className="btn-primary px-7 py-3 rounded-lg font-medium">
            Get Started
          </button>
          <button className="btn-secondary px-7 py-3 rounded-lg font-medium border">
            View Showcases
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl shadow-[0_18px_60px_rgba(15,23,42,0.18)]">
          <Image
            src={heroImage}
            alt="Laptop workspace"
            width={720}
            height={520}
            className="w-full h-[340px] md:h-[420px] object-cover"
            priority
          />
        </div>

        <div className="absolute right-6 top-6 bg-white/90 backdrop-blur px-4 py-3 rounded-xl shadow-sm border border-black/5 text-xs">
          <div className="flex items-start gap-2">
            <span className="mt-[6px] inline-block w-2 h-2 rounded-full bg-secondary" />
            <div>
              <div className="text-[10px] tracking-wide uppercase text-on-surface-variant">
                Trending Now
              </div>
              <a
                href="#"
                className="mt-1 block text-primary font-semibold leading-snug"
              >
                The Art of Minimalist Living
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
