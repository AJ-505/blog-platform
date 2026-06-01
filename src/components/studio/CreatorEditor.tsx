"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useMemo, useState } from "react";

import type { AuthUser } from "@/lib/auth";
import { editorJsonToMarkdown } from "@/lib/editor-markdown";

const badgeOptions = [
  "CAMPUS LIFE",
  "CAMPUS FASHION",
  "ROOMMATE DRAMA",
  "ACADEMICS",
  "STUDY",
  "SCRIBBLED ORIGINAL",
];

function ToolbarButton({
  active,
  children,
  onClick,
  label,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={
        active
          ? "h-9 min-w-9 rounded-lg bg-primary px-3 text-sm font-semibold text-white"
          : "h-9 min-w-9 rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold text-on-surface hover:border-primary/30 hover:text-primary"
      }
    >
      {children}
    </button>
  );
}

export function CreatorEditor({ user }: { user: AuthUser }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [badge, setBadge] = useState("CAMPUS LIFE");
  const [imageKey, setImageKey] = useState("book");
  const [message, setMessage] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      Placeholder.configure({
        placeholder:
          "Start writing. Use headings, quotes, lists, links, and code without touching markdown.",
      }),
    ],
    content: "<p></p>",
    editorProps: {
      attributes: {
        class:
          "creator-editor prose prose-neutral max-w-none min-h-[460px] px-1 py-2 text-on-surface outline-none",
      },
    },
    immediatelyRender: false,
  });

  const dateLabel = useMemo(() => {
    return new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }, []);

  function saveDraft() {
    if (!editor) return;
    window.localStorage.setItem(
      "scribbled:creator-draft",
      JSON.stringify({
        title,
        excerpt,
        badge,
        imageKey,
        body: editor.getJSON(),
        savedAt: new Date().toISOString(),
      }),
    );
    setMessage("Draft saved in this browser.");
  }

  async function publish() {
    if (!editor || isPublishing) return;

    const markdown = editorJsonToMarkdown(editor.getJSON()).trim();

    if (!title.trim() || !markdown) {
      setMessage("Add a title and body before publishing.");
      return;
    }

    setIsPublishing(true);
    setMessage("");

    const response = await fetch("/api/posts/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        excerpt: excerpt.trim() || undefined,
        content: markdown,
        badge,
        imageKey,
        isDiscover: true,
      }),
    });

    const data = await response.json();
    setIsPublishing(false);

    if (!response.ok) {
      setMessage(data?.error ?? "Could not publish this post.");
      return;
    }

    router.push(`/article/${data.post.slug}`);
  }

  function setLink() {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previousUrl ?? "");

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-on-surface">
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-black/10 bg-[#fbfaf7]/95 px-5 backdrop-blur">
        <Link
          href="/studio"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-on-surface hover:bg-black/5"
          aria-label="Back to studio"
          title="Back to studio"
        >
          ←
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={saveDraft}
            className="rounded-xl border border-black/15 bg-white px-5 py-2.5 text-sm font-semibold text-on-surface shadow-sm hover:bg-black/[0.03]"
          >
            Save draft
          </button>
          <button
            type="button"
            onClick={publish}
            disabled={isPublishing}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#12345f] disabled:opacity-50"
          >
            {isPublishing ? "Publishing..." : "Publish"}
          </button>
          <div className="hidden text-sm text-on-surface-variant sm:block">
            {user.name}
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-64px)] grid-cols-1 lg:grid-cols-[1fr_380px]">
        <section className="px-5 py-10 md:px-12 lg:px-20">
          <div className="mx-auto max-w-[820px]">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full bg-transparent text-4xl font-semibold leading-tight text-on-surface outline-none placeholder:text-slate-400 md:text-6xl"
              placeholder="Untitled vision"
              aria-label="Post title"
            />

            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-on-surface-variant">
              <div>{dateLabel}</div>
              <div>Markdown saved automatically on publish</div>
            </div>

            <textarea
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              maxLength={220}
              rows={2}
              className="mt-8 w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-base text-on-surface outline-none placeholder:text-slate-400 focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
              placeholder="Write a short preview for the Discover card..."
            />

            <div className="mt-8 rounded-2xl border border-black/10 bg-white p-3 shadow-sm">
              <div className="mb-3 flex flex-wrap items-center gap-2 border-b border-black/10 pb-3">
                <ToolbarButton
                  label="Heading 1"
                  active={editor?.isActive("heading", { level: 1 })}
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                >
                  H1
                </ToolbarButton>
                <ToolbarButton
                  label="Heading 2"
                  active={editor?.isActive("heading", { level: 2 })}
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                >
                  H2
                </ToolbarButton>
                <ToolbarButton
                  label="Bold"
                  active={editor?.isActive("bold")}
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                  B
                </ToolbarButton>
                <ToolbarButton
                  label="Italic"
                  active={editor?.isActive("italic")}
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                  I
                </ToolbarButton>
                <ToolbarButton
                  label="Bulleted list"
                  active={editor?.isActive("bulletList")}
                  onClick={() =>
                    editor?.chain().focus().toggleBulletList().run()
                  }
                >
                  • List
                </ToolbarButton>
                <ToolbarButton
                  label="Numbered list"
                  active={editor?.isActive("orderedList")}
                  onClick={() =>
                    editor?.chain().focus().toggleOrderedList().run()
                  }
                >
                  1. List
                </ToolbarButton>
                <ToolbarButton
                  label="Quote"
                  active={editor?.isActive("blockquote")}
                  onClick={() =>
                    editor?.chain().focus().toggleBlockquote().run()
                  }
                >
                  Quote
                </ToolbarButton>
                <ToolbarButton
                  label="Link"
                  active={editor?.isActive("link")}
                  onClick={setLink}
                >
                  Link
                </ToolbarButton>
              </div>

              <EditorContent editor={editor} />
            </div>

            {message ? (
              <p className="mt-4 rounded-xl bg-primary/5 px-4 py-3 text-sm font-medium text-primary">
                {message}
              </p>
            ) : null}
          </div>
        </section>

        <aside className="border-l border-black/10 bg-white px-6 py-8">
          <div>
            <h2 className="text-2xl font-semibold text-on-surface">
              Post settings
            </h2>
            <p className="mt-1 text-sm text-on-surface-variant">
              Tune how this story appears in Discover.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <section>
              <label className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
                Category badge
              </label>
              <select
                value={badge}
                onChange={(event) => setBadge(event.target.value)}
                className="mt-3 h-12 w-full rounded-xl border border-black/10 bg-white px-3 text-on-surface outline-none"
              >
                {badgeOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </section>

            <section>
              <label className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
                Cover image
              </label>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {["book", "art", "discover", "retro"].map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setImageKey(key)}
                    className={
                      imageKey === key
                        ? "rounded-xl border border-primary bg-primary px-4 py-3 text-sm font-semibold capitalize text-white"
                        : "rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold capitalize text-on-surface hover:border-primary/30"
                    }
                  >
                    {key}
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-black/10 bg-[#fbfaf7] p-5">
              <div className="text-sm font-semibold text-on-surface">
                Storage format
              </div>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                Creators write visually here. On publish, the post body is
                converted to markdown and saved into the existing post content
                field.
              </p>
            </section>
          </div>
        </aside>
      </div>
    </main>
  );
}
