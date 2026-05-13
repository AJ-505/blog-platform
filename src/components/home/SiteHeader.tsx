import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="header glassmorphism flex items-center justify-between px-8 py-4">
      <div className="logo font-bold text-2xl" style={{ color: "#0B1F3B" }}>
        SCRIBBLED
      </div>
      <nav className="flex gap-8 items-center">
        <Link href="#" className="nav-link text-on-surface-variant">
          DISCOVER
        </Link>
        <Link href="/feed" className="nav-link text-on-surface-variant">
          FEED
        </Link>
        <Link href="#" className="nav-link text-on-surface-variant">
          CREATORS
        </Link>
        <Link href="/studio" className="nav-link text-on-surface-variant">
          STUDIO
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <input className="search-input" placeholder="search for trends" />
        <button className="btn-secondary btn-home rounded-full px-4 py-2">
          Home
        </button>
        <div className="profile-icon w-8 h-8 rounded-full bg-secondary" />
      </div>
    </header>
  );
}
