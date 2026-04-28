import { HelloWidget } from "../components/HelloWidget";

// This is a SERVER Component. It does NOT have "use client" at the top.
export default function HomePage() {
  return (
    <main className="min-h-screen p-12 bg-gray-50 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
          📝 Welcome to the Blog Platform
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          If you are seeing this, the Next.js server is running successfully!
        </p>
        
        <hr className="my-8 border-gray-300" />
        
        <h2 className="text-2xl font-bold mb-2">Sample API Integration</h2>
        <p className="text-gray-700 mb-6 max-w-2xl">
          Below is a living example of how the Frontend Team (Client Components) communicates with the Backend Team (API Routes).
          Click the button below to see it in action.
        </p>

        {/* 
          We embed our interactive, client-side widget here.
          The frontend team builds these widgets, and the team lead strings them together on the page!
        */}
        <HelloWidget />
        
      </div>
    </main>
  );
}
