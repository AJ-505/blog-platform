import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer py-12 mt-16 border-t border-outline-variant bg-surface-variant">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h5 className="font-bold mb-2">SCRIBBLED</h5>
          <p className="text-sm text-on-surface-variant">
            Elevating voices through premium digital storytelling and curated
            aesthetics.
          </p>
        </div>
        <div>
          <h5 className="font-bold mb-2">EXPLORE</h5>
          <ul className="space-y-1">
            <li>
              <Link href="/discover" className="nav-link">
                Discover
              </Link>
            </li>
            <li>
              <Link href="/feed" className="nav-link">
                Feed
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-2">CREATE</h5>
          <ul className="space-y-1">
            <li>
              <Link href="/studio" className="nav-link">
                Studio
              </Link>
            </li>
            <li>
              <Link href="/studio/create-post" className="nav-link">
                New Post
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-2">ACCOUNT</h5>
          <ul className="space-y-1">
            <li>
              <Link href="/settings" className="nav-link">
                Settings
              </Link>
            </li>
            <li>
              <Link href="/login" className="nav-link">
                Sign in
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
