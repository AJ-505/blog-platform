"use client";

import { useState } from "react";

// EXAMPLE COMPONENT: Showing how the frontend calls the backend API
// Because this uses `useState` and `onClick`, it MUST have "use client" at the top.
export function HelloWidget() {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMessage = async () => {
    setIsLoading(true);
    try {
      // Calling the sample API we built in src/app/api/hello/route.ts
      const res = await fetch("/api/hello");
      if (!res.ok) throw new Error("API returned an error");
      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Failed to load from API.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 mt-6 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50 max-w-lg">
      <h3 className="text-xl font-bold text-blue-900 mb-2">🧪 Sample API Widget</h3>
      <p className="text-blue-700 mb-4 text-sm">
        This is a demonstration of a Client Component fetching data from our Next.js backend when you click the button.
      </p>
      
      <button 
        onClick={fetchMessage}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
      >
        {isLoading ? "Loading..." : "Fetch Hello World"}
      </button>

      {message && (
        <div className="mt-4 p-4 bg-white rounded border border-blue-200 text-gray-800">
          <strong>Backend says:</strong> {message}
        </div>
      )}
    </div>
  );
}
