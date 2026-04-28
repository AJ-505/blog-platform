import { HelloWidget } from "../components/HelloWidget";

// This is a SERVER Component. It does NOT have "use client" at the top.
export default function HomePage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>📝 Welcome to the Blog Platform</h1>
      <p>If you are seeing this, the Next.js server is running successfully.</p>

      {/* 
        We embed our interactive, client-side widget here.
        The frontend team builds these widgets, and the team lead strings them together on the page!
      */}
      <HelloWidget />
    </main>
  );
}
