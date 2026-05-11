import Image, { StaticImageData } from "next/image";
import poeticImg from "@/assets/Poetic.png";
import spatialImg from "@/assets/spatial.png";
import PhilosophyImg from "@/assets/Philosophy.png";
import digitalImg from "@/assets/Digital.png";

type Category = {
  title: string;
  tag: string;
  img: string | StaticImageData;
};

const DEFAULT_CATEGORIES: Category[] = [
  { title: "Modern Stoicism", tag: "PHILOSOPHY", img: PhilosophyImg },
  { title: "Digital Expression", tag: "VISUAL ARTS", img: digitalImg },
  { title: "Poetic Structures", tag: "LITERATURE", img: poeticImg },
  {
    title: "Spatial Design",
    tag: "ARCHITECTURE",
    img: spatialImg,
  },
];

export function CategoryGrid({
  categories = DEFAULT_CATEGORIES,
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
          <h2 className="mt-2 text-4xl md:text-5xl font-serif font-semibold text-primary">
            Explore Categories
          </h2>
        </div>

        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-primary transition"
        >
          SEE ALL TOPICS
          <span aria-hidden className="text-lg leading-none">
            →
          </span>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <a
            key={cat.title}
            href="#"
            className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <Image
              src={cat.img}
              alt={cat.title}
              width={520}
              height={640}
              className="w-full h-[260px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="text-[10px] tracking-wide uppercase text-white/75">
                {cat.tag}
              </div>
              <div className="mt-1 text-xl font-serif font-semibold text-white">
                {cat.title}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 group-hover:ring-black/10" />
          </a>
        ))}
      </div>
    </section>
  );
}
