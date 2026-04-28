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
2. **Components (`src/components/`) are Client Components.** Every file in this folder MUST start with `"use client";` at the very top.

### When to use `src/components`

If the piece of UI you are building needs any of the following, it belongs in this folder:

- `useState`, `useEffect`, or any other React hook.
- Event listeners like `onClick`, `onChange`, `onSubmit`.
- Browser-only APIs (like `window` or `localStorage`).

### Workflow Example

1. Build your interactive widget (e.g., `HelloWidget.tsx`) here in `src/components/`. Add `"use client";` to the top.
2. Inside that widget, you can use `fetch()` to call our backend APIs.
3. Import your widget into the `page.tsx` file where it needs to be displayed!
