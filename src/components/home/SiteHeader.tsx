"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Discover", href: "/discover" },
  { label: "Feed", href: "/feed" },
  { label: "Creators", href: "/studio/create-post" },
  { label: "Studio", href: "/studio" },
];

export function SiteHeader() {
  const pathname = usePathname();

  // A link matches when the path equals its href or is nested under it.
  // Pick the longest match so /studio/create-post highlights "Creators",
  // not "Studio".
  const activeHref = NAV_ITEMS.filter(
    ({ href }) => pathname === href || pathname.startsWith(`${href}/`),
  ).sort((a, b) => b.href.length - a.href.length)[0]?.href;

  return (
    <header className="header glassmorphism flex items-center justify-between px-8 py-4">
      <Link
        href="/"
        className="logo font-bold text-2xl flex items-center gap-2"
        style={{ color: "#0B1F3B" }}
      >
        <Image
          src="/blog_pen_logo.svg"
          alt="Scribbled logo"
          width={32}
          height={32}
        />
        SCRIBBLED
      </Link>
      <nav className="flex gap-5 items-center">
        {NAV_ITEMS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            aria-current={href === activeHref ? "page" : undefined}
            className={`nav-link font-semibold${
              href === activeHref ? " nav-link-active" : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <input className="search-input" placeholder="Search for trends" />
        <Link
          href="/"
          className="btn-secondary btn-home rounded-full px-4 py-2"
        >
          Home
        </Link>
        <Link
          href="/settings"
          className="profile-icon w-10 h-10 rounded-full bg-primary/10 border border-black/10 flex items-center justify-center"
          aria-label="Settings"
          title="Settings"
        >
          <span className="text-primary font-semibold">👤</span>
        </Link>
      </div>
    </header>
  );
}
