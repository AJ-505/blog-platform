"use client";

import { useEffect, useState } from "react";

// EXAMPLE COMPONENT: Showing how the frontend calls the backend API
// Because this uses `useState` and `useEffect`, it MUST have "use client" at the top.
export function HelloWidget() {
  const [message, setMessage] = useState("Loading from API...");

  useEffect(() => {
    // Calling the sample API we built in src/app/api/hello/route.ts
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Failed to load from API."));
  }, []);

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginTop: "1rem",
      }}
    >
      <h3 style={{ fontWeight: "bold" }}>📡 Sample API Test Widget</h3>
      <p>{message}</p>
      <small style={{ color: "#666" }}>
        *This is a Client Component (`src/components/HelloWidget.tsx`) talking
        to a Backend API (`src/app/api/hello/route.ts`)*
      </small>
    </div>
  );
}
