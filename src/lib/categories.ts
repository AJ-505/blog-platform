import type { StaticImageData } from "next/image";

import bookImg from "@/assets/Book.png";
import discoverImg from "@/assets/Discover.png";
import digitalImg from "@/assets/Digital.png";
import literaryImg from "@/assets/literaryspace.png";
import modelImg from "@/assets/Model.png";
import poeticImg from "@/assets/Poetic.png";

export type Category = {
  /** Stored on posts as `badge`; shown verbatim in the studio dropdown. */
  label: string;
  /** URL-safe filter key used in `/feed?category=<slug>`. */
  slug: string;
  /** Short kicker shown above the title on the Explore Categories card. */
  tag: string;
  /** Cover image for the Explore Categories card. */
  img: StaticImageData;
};

// Single source of truth for content categories. The studio badge picker, the
// home "Explore Categories" grid, and the feed filter all read from this list
// so the available categories never drift apart.
export const CATEGORIES: Category[] = [
  {
    label: "CAMPUS LIFE",
    slug: "campus-life",
    tag: "STUDENT LIFE",
    img: discoverImg,
  },
  {
    label: "CAMPUS FASHION",
    slug: "campus-fashion",
    tag: "STYLE",
    img: modelImg,
  },
  {
    label: "ROOMMATE DRAMA",
    slug: "roommate-drama",
    tag: "DORM TALES",
    img: digitalImg,
  },
  {
    label: "ACADEMICS",
    slug: "academics",
    tag: "LEARNING",
    img: literaryImg,
  },
  {
    label: "STUDY",
    slug: "study",
    tag: "FOCUS",
    img: bookImg,
  },
  {
    label: "SCRIBBLED ORIGINAL",
    slug: "scribbled-original",
    tag: "ORIGINALS",
    img: poeticImg,
  },
];

export const CATEGORY_LABELS = CATEGORIES.map((category) => category.label);

export function getCategoryBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return CATEGORIES.find((category) => category.slug === slug);
}

export function getCategoryByLabel(label: string | null | undefined) {
  if (!label) return undefined;
  return CATEGORIES.find((category) => category.label === label);
}
