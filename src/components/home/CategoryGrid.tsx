import Link from "next/link";
import Image from "next/image";

import { CATEGORIES, type Category } from "@/lib/categories";

export function CategoryGrid({
  categories = CATEGORIES,
}: {
  categories?: Category[];
}) {
  return (
    <section className="categories py-14">
      <div className="flex items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-xs tracking-wide uppercase text-secondary/90">
            Curated Themes
          </p>
          <h2 className="mt-2 text-4xl md:text-5xl font-semibold text-primary">
            Explore Categories
          </h2>
        </div>

        <Link
          href="/feed"
          className="inline-flex items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-primary transition"
        >
          SEE ALL TOPICS
          <span aria-hidden className="text-lg leading-none">
            →
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/feed?category=${cat.slug}`}
            className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <Image
              src={cat.img}
              alt={cat.label}
              width={520}
              height={640}
              className="w-full h-[260px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="text-[10px] tracking-wide uppercase text-white/75">
                {cat.tag}
              </div>
              <div className="mt-1 text-xl font-semibold text-white">
                {cat.label}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 group-hover:ring-black/10" />
          </Link>
        ))}
      </div>
    </section>
  );
}
