"use client";

import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="header glassmorphism flex items-center justify-between px-8 py-4">
      <Link
        href="/"
        className="logo font-bold text-2xl"
        style={{ color: "#0B1F3B" }}
      >
        Scribbled
      </Link>
      <nav className="flex gap-5 items-center">
        <Link href="/discover" className="nav-link font-semibold">
          Discover
        </Link>
        <Link href="/feed" className="nav-link font-semibold">
          Feed
        </Link>
        <Link href="/studio/create-post" className="nav-link font-semibold">
          Creators
        </Link>
        <Link href="/studio" className="nav-link font-semibold">
          Studio
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <input className="search-input" placeholder="Search for trends" />
        <Link
          href="/"
          className="btn-secondary btn-home rounded-full px-4 py-2"
        >
          Home
        </Link>
        <button
          type="button"
          className="profile-icon w-10 h-10 rounded-full bg-primary/10 border border-black/10 flex items-center justify-center"
          aria-label="Profile"
          title="Profile"
        >
          <span className="text-primary font-semibold">👤</span>
        </button>
      </div>
    </header>
  );
}
