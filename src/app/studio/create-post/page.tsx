"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

function TopBarButton({
  variant,
  children,
}: {
  variant: "ghost" | "outline" | "primary";
  children: React.ReactNode;
}) {
  const cls =
    variant === "primary"
      ? "btn-primary px-6 py-3 rounded-xl"
      : variant === "outline"
        ? "btn-secondary px-6 py-3 rounded-xl border border-black/15 bg-white/70"
        : "px-3 py-2 rounded-lg hover:bg-black/5";

  return (
    <button type="button" className={cls}>
      {children}
    </button>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
      {label}
      <button type="button" className="text-primary/70 hover:text-primary">
        ×
      </button>
    </div>
  );
}

function RadioRow({
  title,
  subtitle,
  selected,
}: {
  title: string;
  subtitle: string;
  selected?: boolean;
}) {
  return (
    <div
      className={
        selected
          ? "rounded-2xl border border-black/10 bg-white/80 p-5 shadow-sm"
          : "rounded-2xl border border-black/10 bg-white/60 p-5"
      }
    >
      <div className="flex items-start gap-4">
        <div className="w-9 h-9 rounded-full bg-secondary/15 flex items-center justify-center text-secondary">
          ⦿
        </div>
        <div className="flex-1">
          <div className="font-medium text-on-surface">{title}</div>
          <div className="text-sm text-on-surface-variant">{subtitle}</div>
        </div>
        <div
          className={
            selected
              ? "w-5 h-5 rounded-full border-2 border-secondary flex items-center justify-center"
              : "w-5 h-5 rounded-full border border-black/30"
          }
          aria-hidden
        >
          {selected ? (
            <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function CreatePostPage() {
  const [title, setTitle] = useState("Untitled Vision...");

  const dateLabel = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Top bar */}
      <header className="h-16 border-b border-black/10 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/studio"
            className="w-10 h-10 rounded-full hover:bg-black/5 flex items-center justify-center"
            aria-label="Back"
            title="Back"
          >
            ←
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <TopBarButton variant="outline">Save Draft</TopBarButton>
          <TopBarButton variant="primary">Publish</TopBarButton>
          <div className="w-10 h-10 rounded-full bg-black/10" />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] min-h-[calc(100vh-64px)]">
        {/* Editor */}
        <section className="px-10 md:px-16 py-14">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-5xl md:text-6xl font-serif font-semibold text-black/20 outline-none bg-transparent"
            aria-label="Post title"
          />

          <div className="mt-6 flex items-center gap-6 text-on-surface-variant">
            <div className="flex items-center gap-2">
              <span aria-hidden>📅</span>
              <span>{dateLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <span aria-hidden>⏱</span>
              <span>4 min read</span>
            </div>
          </div>

          <textarea
            className="mt-16 w-full min-h-[360px] text-lg text-black/20 outline-none bg-transparent resize-none"
            placeholder="Begin articulating the visionary..."
          />
        </section>

        {/* Settings sidebar */}
        <aside className="border-l border-black/10 bg-white">
          <div className="p-8 border-b border-black/10">
            <div className="text-2xl font-serif font-semibold text-primary">
              Post Settings
            </div>
            <div className="text-sm text-on-surface-variant">
              Fine-tune your publication
            </div>
          </div>

          <div className="p-8 space-y-10">
            <section>
              <div className="text-xs tracking-wide uppercase text-on-surface-variant font-semibold">
                Featured image
              </div>
              <div className="mt-4 rounded-2xl bg-[#E8F0FF] border border-black/10 h-[160px] flex flex-col items-center justify-center text-on-surface-variant">
                <div className="w-10 h-10 rounded-xl border border-black/20 flex items-center justify-center">
                  ▣
                </div>
                <div className="mt-3 text-xs font-semibold">
                  ADD COVER PHOTO
                </div>
              </div>
            </section>

            <section>
              <div className="text-xs tracking-wide uppercase text-on-surface-variant font-semibold">
                Categories & tags
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Chip label="Visionary" />
                <Chip label="Creative Studio" />
                <button
                  type="button"
                  className="btn-secondary px-4 py-2 rounded-full border border-black/15 bg-white"
                >
                  + Add Tag
                </button>
              </div>
              <input
                className="mt-4 w-full h-12 rounded-xl border border-black/10 bg-white px-4 outline-none"
                placeholder="Type and press enter..."
              />
            </section>

            <section>
              <div className="text-xs tracking-wide uppercase text-on-surface-variant font-semibold">
                Visibility & access
              </div>
              <div className="mt-4 space-y-4">
                <RadioRow
                  title="Public"
                  subtitle="Visible to everyone"
                  selected
                />
                <RadioRow
                  title="Members Only"
                  subtitle="Paid subscribers only"
                />
              </div>
            </section>
          </div>
        </aside>
      </div>
    </main>
  );
}
