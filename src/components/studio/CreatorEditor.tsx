"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useMemo, useState } from "react";

import { startRouteProgress } from "@/components/RouteProgress";
import type { AuthUser } from "@/lib/auth";
import { CATEGORY_LABELS } from "@/lib/categories";
import {
  editorJsonToMarkdown,
  markdownToEditorHtml,
} from "@/lib/editor-markdown";

export type EditorDraft = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  badge: string | null;
  imageKey: string | null;
};

const badgeOptions = CATEGORY_LABELS;

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

export function CreatorEditor({
  user,
  draft,
}: {
  user: AuthUser;
  draft?: EditorDraft;
}) {
  const router = useRouter();
  const [postId, setPostId] = useState<number | null>(draft?.id ?? null);
  const [title, setTitle] = useState(draft?.title ?? "");
  const [excerpt, setExcerpt] = useState(draft?.excerpt ?? "");
  const [badge, setBadge] = useState(draft?.badge ?? "CAMPUS LIFE");
  const [imageKey, setImageKey] = useState(draft?.imageKey ?? "book");
  const [message, setMessage] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

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
    content: draft?.content ? markdownToEditorHtml(draft.content) : "<p></p>",
    editorProps: {
      attributes: {
        class:
          "creator-editor prose prose-neutral max-w-none min-h-[460px] px-1 py-2 text-on-surface outline-none",
      },
    },
    immediatelyRender: false,
  });

  // useEditor does not re-render on selection/transaction changes in v3, so the
  // toolbar's active states must be subscribed to explicitly to stay reactive.
  const activeMarks = useEditorState({
    editor,
    selector: ({ editor }) => ({
      heading1: editor?.isActive("heading", { level: 1 }) ?? false,
      heading2: editor?.isActive("heading", { level: 2 }) ?? false,
      bold: editor?.isActive("bold") ?? false,
      italic: editor?.isActive("italic") ?? false,
      bulletList: editor?.isActive("bulletList") ?? false,
      orderedList: editor?.isActive("orderedList") ?? false,
      blockquote: editor?.isActive("blockquote") ?? false,
      link: editor?.isActive("link") ?? false,
    }),
  });

  const dateLabel = useMemo(() => {
    return new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }, []);

  async function saveDraft() {
    if (!editor || isSavingDraft) return;

    if (!title.trim()) {
      setMessage("Add a title before saving a draft.");
      return;
    }

    const markdown = editorJsonToMarkdown(editor.getJSON()).trim();

    setIsSavingDraft(true);
    setMessage("");

    const payload = {
      title: title.trim(),
      excerpt: excerpt.trim() || undefined,
      content: markdown,
      badge,
      imageKey,
      status: "draft" as const,
    };

    try {
      // Reuse the existing draft row on subsequent saves instead of piling up
      // a new draft every click.
      const response = postId
        ? await fetch("/api/posts/edit", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...payload, postId }),
          })
        : await fetch("/api/posts/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data?.error ?? "Could not save draft.");
        return;
      }

      setPostId(data.post.id);
      setLastSavedAt(new Date());
      setMessage("Draft saved.");
    } catch {
      setMessage("Could not save draft. Please try again.");
    } finally {
      setIsSavingDraft(false);
    }
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

    const payload = {
      title: title.trim(),
      excerpt: excerpt.trim() || undefined,
      content: markdown,
      badge,
      imageKey,
      isDiscover: true,
      status: "published" as const,
    };

    // Promote an existing draft in place; otherwise create a fresh post.
    const response = postId
      ? await fetch("/api/posts/edit", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, postId }),
        })
      : await fetch("/api/posts/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    const data = await response.json();
    setIsPublishing(false);

    if (!response.ok) {
      setMessage(data?.error ?? "Could not publish this post.");
      return;
    }

    startRouteProgress();
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
            disabled={isSavingDraft}
            className="rounded-xl border border-black/15 bg-white px-5 py-2.5 text-sm font-semibold text-on-surface shadow-sm hover:bg-black/[0.03] disabled:opacity-50"
          >
            {isSavingDraft ? "Saving..." : "Save draft"}
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
              <div>
                {lastSavedAt
                  ? `Draft saved at ${lastSavedAt.toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`
                  : "Markdown saved automatically on publish"}
              </div>
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
                  label="Heading"
                  active={activeMarks?.heading1}
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                >
                  Heading
                </ToolbarButton>
                <ToolbarButton
                  label="Subheading"
                  active={activeMarks?.heading2}
                  onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                >
                  Subheading
                </ToolbarButton>
                <ToolbarButton
                  label="Bold"
                  active={activeMarks?.bold}
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                  B
                </ToolbarButton>
                <ToolbarButton
                  label="Italic"
                  active={activeMarks?.italic}
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                  I
                </ToolbarButton>
                <ToolbarButton
                  label="Bulleted list"
                  active={activeMarks?.bulletList}
                  onClick={() =>
                    editor?.chain().focus().toggleBulletList().run()
                  }
                >
                  • List
                </ToolbarButton>
                <ToolbarButton
                  label="Numbered list"
                  active={activeMarks?.orderedList}
                  onClick={() =>
                    editor?.chain().focus().toggleOrderedList().run()
                  }
                >
                  1. List
                </ToolbarButton>
                <ToolbarButton
                  label="Quote"
                  active={activeMarks?.blockquote}
                  onClick={() =>
                    editor?.chain().focus().toggleBlockquote().run()
                  }
                >
                  Quote
                </ToolbarButton>
                <ToolbarButton
                  label="Link"
                  active={activeMarks?.link}
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
