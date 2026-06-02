import type { ComponentType } from "react";

import Link from "next/link";
import { redirect } from "next/navigation";

import { SiteHeader } from "@/components/home/SiteHeader";
import { getStudioDashboard } from "@/lib/posts";
import { getCurrentUser } from "@/lib/server-auth";

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
  href,
}: {
  label: string;
  active?: boolean;
  icon: ComponentType<{ className?: string }>;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-3 text-primary font-medium"
          : "flex items-center gap-3 rounded-xl px-4 py-3 text-on-surface-variant hover:bg-black/5"
      }
    >
      <Icon className={active ? "w-5 h-5 text-primary" : "w-5 h-5"} />
      <span>{label}</span>
    </Link>
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
      <div className="mt-3 text-4xl font-semibold">{value}</div>
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

function formatCount(value: number) {
  if (value >= 1000000) return `${Math.round(value / 100000) / 10}m`;
  if (value >= 1000) return `${Math.round(value / 100) / 10}k`;
  return value.toLocaleString("en-US");
}

function formatTimeAgo(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(1, Math.floor(diffMs / (1000 * 60)));

  if (diffMinutes < 60) return `${diffMinutes}min ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}hr${diffHours > 1 ? "s" : ""} ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  return `${Math.floor(diffDays / 7)} week${diffDays >= 14 ? "s" : ""} ago`;
}

function ContentRow({
  title,
  meta,
  href,
}: {
  title: string;
  meta: string;
  href: string;
}) {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="w-12 h-12 rounded-xl bg-black/10" />
      <div className="min-w-0">
        <Link
          href={href}
          className="font-medium text-on-surface truncate hover:text-primary"
        >
          {title}
        </Link>
        <div className="text-sm text-on-surface-variant">{meta}</div>
      </div>
      <div className="ml-auto flex items-center gap-4 text-on-surface-variant">
        <Link href={href} className="hover:text-primary" aria-label={`Open ${title}`}>
          ✎
        </Link>
        <Link
          href="/studio/manage-blogs"
          className="hover:text-primary"
          aria-label="Manage blogs"
        >
          ▦
        </Link>
        <Link
          href="/studio/manage-blogs"
          className="hover:text-primary"
          aria-label="More actions"
        >
          ⋯
        </Link>
      </div>
    </div>
  );
}

export default async function StudioPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/studio");
  }

  const dashboard = await getStudioDashboard(user.username);
  const interactions = dashboard.totalLikes + dashboard.totalComments;
  const engagementRate =
    dashboard.totalPosts > 0
      ? Math.round((interactions / dashboard.totalPosts) * 10) / 10
      : 0;

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
              <SidebarLink
                label="Dashboard"
                active
                icon={DashboardIcon}
                href="/studio"
              />
              <SidebarLink
                label="Write"
                icon={FileTextIcon}
                href="/studio/creators"
              />
              <SidebarLink
                label="Manage Blogs"
                icon={UploadIcon}
                href="/studio/manage-blogs"
              />
              <SidebarLink
                label="Settings"
                icon={SettingsIcon}
                href="/settings"
              />
            </nav>
          </aside>

          {/* Main */}
          <section>
            <div className="flex items-start justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-semibold text-primary">
                  Welcome back, {user.name}
                </h1>
                <p className="mt-2 text-on-surface-variant">
                  Signed in as @{user.username}. Your studio is using live
                  posts, followers, likes, and comments.
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <StatCard
                  label="Total posts"
                  value={formatCount(dashboard.totalPosts)}
                  sub={`${formatCount(dashboard.publishedPosts)} published, ${formatCount(dashboard.draftPosts)} drafts`}
                  tone="light"
                />
              </div>
              <div className="lg:col-span-1">
                <StatCard
                  label="Followers"
                  value={formatCount(dashboard.followers)}
                  tone="dark"
                />
              </div>
              <div className="lg:col-span-1">
                <StatCard
                  label="Avg engagement"
                  value={formatCount(engagementRate)}
                  sub={`${formatCount(interactions)} total interactions`}
                  tone="mint"
                />
              </div>
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur shadow-sm p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-2xl font-semibold text-primary">
                      Content Performance
                    </div>
                    <Link
                      href="/studio/manage-blogs"
                      className="text-sm font-medium text-on-surface-variant hover:text-primary"
                    >
                      View All →
                    </Link>
                  </div>

                  <div className="mt-4 divide-y divide-black/10">
                    {dashboard.topPosts.length === 0 ? (
                      <div className="py-8 text-sm text-on-surface-variant">
                        No posts yet. Draft or publish a story to see it here.
                      </div>
                    ) : (
                      dashboard.topPosts.map((post) => (
                        <ContentRow
                          key={post.id}
                          title={post.title}
                          meta={`${post.status === "published" ? "Published" : "Draft updated"} ${formatTimeAgo(post.updatedAt)} • ${formatCount(post.likes)} likes • ${formatCount(post.comments)} comments`}
                          href={
                            post.status === "published"
                              ? `/article/${post.slug}`
                              : `/studio/creators?draft=${post.id}`
                          }
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating action button */}
          </section>
        </div>
      </div>
    </main>
  );
}
