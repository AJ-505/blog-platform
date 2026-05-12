import type { ComponentType } from "react";

import { SiteHeader } from "@/components/home/SiteHeader";

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 13h7V4H4v9Zm0 7h7v-5H4v5Zm9 0h7V11h-7v9Zm0-16v5h7V4h-7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FileTextIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M7 3h7l3 3v15a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M14 3v3h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12h8M8 16h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 3h7l3 3v15a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 14V4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 8l4-4 4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 14v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 19V5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 19V9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 19V12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 19V7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 19V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M19.4 15a8.6 8.6 0 0 0 .1-1l2-1.2-2-3.4-2.3.5a7.5 7.5 0 0 0-1.7-1L15.9 6 12 5l-1.5 2.2a7.5 7.5 0 0 0-1.7 1l-2.3-.5-2 3.4 2 1.2a8.6 8.6 0 0 0 .1 1l-2 1.2 2 3.4 2.3-.5c.5.4 1.1.7 1.7 1L12 20l3.9 1 1.5-2.2c.6-.3 1.2-.6 1.7-1l2.3.5 2-3.4-2-1.2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SidebarLink({
  label,
  active,
  icon: Icon,
}: {
  label: string;
  active?: boolean;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <a
      href="#"
      className={
        active
          ? "flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-3 text-primary font-medium"
          : "flex items-center gap-3 rounded-xl px-4 py-3 text-on-surface-variant hover:bg-black/5"
      }
    >
      <Icon className={active ? "w-5 h-5 text-primary" : "w-5 h-5"} />
      <span>{label}</span>
    </a>
  );
}

function StatCard({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "light" | "dark" | "mint";
}) {
  const base = "rounded-2xl border border-black/10 shadow-sm p-6";
  const cls =
    tone === "dark"
      ? `${base} bg-primary text-on-primary border-black/0`
      : tone === "mint"
        ? `${base} bg-[#A7F3E5] text-primary border-black/0`
        : `${base} bg-white/80 backdrop-blur`;

  return (
    <div className={cls}>
      <div
        className={
          tone === "dark"
            ? "text-xs tracking-wide uppercase text-white/75"
            : "text-xs tracking-wide uppercase text-on-surface-variant"
        }
      >
        {label}
      </div>
      <div className="mt-3 text-4xl font-serif font-semibold">{value}</div>
      {sub ? (
        <div
          className={
            tone === "dark"
              ? "mt-2 text-sm text-white/80"
              : "mt-2 text-sm text-on-surface-variant"
          }
        >
          {sub}
        </div>
      ) : null}
      {tone === "light" ? (
        <div className="mt-6 h-14 rounded-xl bg-black/5" />
      ) : null}
    </div>
  );
}

function ContentRow({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="w-12 h-12 rounded-xl bg-black/10" />
      <div className="min-w-0">
        <div className="font-medium text-on-surface truncate">{title}</div>
        <div className="text-sm text-on-surface-variant">{meta}</div>
      </div>
      <div className="ml-auto flex items-center gap-4 text-on-surface-variant">
        <button type="button" className="hover:text-primary">
          ✎
        </button>
        <button type="button" className="hover:text-primary">
          ▦
        </button>
        <button type="button" className="hover:text-primary">
          ⋯
        </button>
      </div>
    </div>
  );
}

export default function StudioPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="container mx-auto max-w-[1240px] px-4 py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
          {/* Sidebar (studio only) */}
          <aside className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur shadow-sm p-5 sticky top-6">
            <div className="pb-4 border-b border-black/10">
              <div className="font-semibold text-primary">Creator Studio</div>
              <div className="text-xs tracking-wide uppercase text-on-surface-variant mt-1">
                Managing SCRIBBLED content
              </div>
            </div>

            <nav className="mt-4 flex flex-col gap-1">
              <SidebarLink label="Dashboard" active icon={DashboardIcon} />
              <SidebarLink label="Manage Blogs" icon={FileTextIcon} />
              <SidebarLink label="Published" icon={UploadIcon} />
              <SidebarLink label="Analytics" icon={ChartIcon} />
              <SidebarLink label="Settings" icon={SettingsIcon} />
            </nav>
          </aside>

          {/* Main */}
          <section>
            <div className="flex items-start justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-semibold text-primary">
                  Welcome back, Elena
                </h1>
                <p className="mt-2 text-on-surface-variant">
                  Your visionary insights reached 12.4k new readers this week.
                </p>
              </div>

              <button
                className="btn-primary px-6 py-3 rounded-xl"
                type="button"
              >
                Create Post
              </button>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <StatCard
                  label="Total impressions"
                  value="142.8k"
                  sub="+2.4% from last month"
                  tone="light"
                />
              </div>
              <div className="lg:col-span-1">
                <StatCard label="New followers" value="1,240" tone="dark" />
              </div>
              <div className="lg:col-span-1">
                <StatCard
                  label="Engagement rate"
                  value="8.4%"
                  sub="Top 5% in Literary category"
                  tone="mint"
                />
              </div>
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur shadow-sm p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-2xl font-serif font-semibold text-primary">
                      Content Performance
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium text-on-surface-variant hover:text-primary"
                    >
                      View All →
                    </a>
                  </div>

                  <div className="mt-4 divide-y divide-black/10">
                    <ContentRow
                      title="The Architecture of Silence"
                      meta="Published 2 days ago • 4.2k views"
                    />
                    <ContentRow
                      title="Digital Poetics in the AI Era"
                      meta="Published 1 week ago • 8.9k views"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating action button */}
            <button
              type="button"
              className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-primary text-white shadow-[0_18px_60px_rgba(11,31,59,0.30)] text-2xl"
              aria-label="Create post"
              title="Create post"
            >
              +
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}
