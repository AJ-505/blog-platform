"use client";

import { useState, type FormEvent } from "react";

export function SearchForm({
  query,
  returnPath,
}: {
  query: string;
  returnPath: string | null;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const nextQuery = formData.get("q")?.toString().trim();

    if (!nextQuery) {
      event.preventDefault();
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
  }

  return (
    <form
      action="/search"
      role="search"
      className="flex gap-3"
      onSubmit={onSubmit}
    >
      {returnPath ? <input type="hidden" name="from" value={returnPath} /> : null}
      <input
        name="q"
        type="search"
        defaultValue={query}
        placeholder="Search posts, topics, or people..."
        aria-label="Search posts"
        className="flex-1 rounded-full border border-black/10 bg-white px-5 py-3 text-on-surface outline-none focus:border-[#A95162]/40"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="inline-flex min-w-[112px] items-center justify-center rounded-full bg-[#A95162] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-wait disabled:opacity-75"
      >
        {isSubmitting ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
