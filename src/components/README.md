# Frontend Team Guide

Welcome to the frontend guide! This directory (`src/components/`) is where you will build all the UI pieces of the blog.

## 🤝 Your Best Friends (Documentation)

Keep these tabs open at all times:

- [**Next.js App Router Documentation**](https://nextjs.org/docs/app)
- [**Tailwind CSS Documentation**](https://tailwindcss.com/docs)
- [**Understanding Server vs Client Components**](https://nextjs.org/docs/app/building-your-application/rendering)

## 🧠 Server Components vs. Client Components (Explained Simply)

Next.js introduces a concept that splits React into two worlds:

1.  **Server Components (The Default):** These render _only_ on the server. They send pure, lightning-fast HTML to the browser.
    - **Pros:** Great for SEO, zero bundle size, can securely fetch data directly from a database.
    - **Cons:** **No Interactivity.** You cannot use `onClick`, `useState`, `useEffect`, or browser APIs like `window`.
2.  **Client Components:** These are the React components you are used to. They run in the browser.
    - **Pros:** Highly interactive. You can use all React hooks and event listeners.
    - **Cons:** Increases the amount of JavaScript the user has to download.

## The One Rule: The Interactive Boundary

To ensure you can iterate fast and write React code exactly the way you know how, follow this rule:

1. **Pages (`src/app/**/page.tsx`) are Server Components.\*\* The team lead handles data fetching here. You can write HTML and Tailwind classes here, but NO React hooks.
2. **Components (`src/components/`) are Server Components by default!** But if a component needs client-only features (hooks, event handlers, browser APIs), you MUST add `"use client";` at the very top of that file. Pure presentational/dumb components can remain server-rendered.

### When to add `"use client"` in `src/components`

If the piece of UI you are building needs any of the following, it belongs in this folder:

- `useState`, `useEffect`, or any other React hook.
- Event listeners like `onClick`, `onChange`, `onSubmit`.
- Browser-only APIs (like `window` or `localStorage`).

### Workflow Example: The Sample API Widget

If you run the app (`pnpm run dev`) and visit `http://localhost:3000`, you will see a "Sample API Integration" section. Here is exactly how that works under the hood:

1. **The Client Component (`src/components/HelloWidget.tsx`):**
   * This file starts with `"use client";`.
   * It uses `useState` to track a loading state and a message.
   * It has a `button` with an `onClick` handler. When clicked, it runs a standard `fetch("/api/hello")` to hit our backend.
   * This component handles all the visual loading logic and error states.

2. **The Server Page (`src/app/page.tsx`):**
   * This is an *actual Next.js Server Component page*. It does **NOT** have `"use client";` at the top.
   * The team lead wrote the HTML structure here.
   * The `HelloWidget` is imported and placed directly into the layout: `<HelloWidget />`.

This separation of concerns is how you and the rest of the team will build out this entire application!
