"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { saveUser, type AuthUser } from "@/lib/auth";

type LoginResponse = { message: string; user: AuthUser };

async function login(credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error ?? "Unable to sign in. Please try again.");
  }

  return data as LoginResponse;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authQuery, setAuthQuery] = useState("");

  useEffect(() => {
    const next = new URLSearchParams(window.location.search).get("next");
    setAuthQuery(next ? `?next=${encodeURIComponent(next)}` : "");
  }, []);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      saveUser(data.user);
      const nextPath =
        new URLSearchParams(window.location.search).get("next") || "/studio";
      router.push(nextPath);
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate({ email, password });
  }

  return (
    <main className="min-h-screen">
      <header className="header glassmorphism flex items-center justify-between px-8 py-4">
        <div className="logo font-bold text-2xl" style={{ color: "#0B1F3B" }}>
          SCRIBBLED
        </div>
      </header>

      <div className="container mx-auto max-w-[1120px] px-4 py-14">
        <section className="flex justify-center">
          <div className="w-full max-w-[520px] rounded-3xl bg-white/80 backdrop-blur border border-black/10 shadow-[0_18px_60px_rgba(15,23,42,0.12)] p-8 md:p-10">
            <h1 className="text-4xl md:text-5xl font-semibold text-primary text-center">
              Welcome Back
            </h1>
            <p className="mt-3 text-sm text-on-surface-variant text-center">
              Continue your creative journey with SCRIBBLED.
            </p>

            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs tracking-wide uppercase text-on-surface-variant mb-2">
                  Email address
                </label>
                <input
                  className="w-full h-12 rounded-xl border border-black/10 bg-white px-4 outline-none"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs tracking-wide uppercase text-on-surface-variant mb-2">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs font-medium text-secondary hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
                <input
                  className="w-full h-12 rounded-xl border border-black/10 bg-white px-4 outline-none"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {mutation.isError && (
                <p className="text-sm text-red-600" role="alert">
                  {mutation.error.message}
                </p>
              )}

              <button
                type="submit"
                className="btn-primary w-full py-4 text-base disabled:opacity-60"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Signing in…" : "Sign In"}
              </button>

              <div className="flex items-center gap-4 pt-2">
                <div className="h-px flex-1 bg-black/10" />
                <div className="text-xs tracking-wide uppercase text-on-surface-variant">
                  or continue with
                </div>
                <div className="h-px flex-1 bg-black/10" />
              </div>

              <div className="grid grid-cols-2 gap-4">

                {/* Google button — links to /google-signin */}
                <Link href="/google-signin" className="w-full">
                  <button
                    type="button"
                    className="btn-secondary py-3 rounded-xl border border-black/10 w-full"
                  >
                    Google
                  </button>
                </Link>

                {/* Apple button — links to /apple-signin */}
                <Link href="/apple-signin" className="w-full">
                  <button
                    type="button"
                    className="btn-secondary py-3 rounded-xl border border-black/10 w-full"
                  >
                    Apple
                  </button>
                </Link>

              </div>

              <p className="pt-4 text-sm text-on-surface-variant text-center">
                New to SCRIBBLED?{" "}
                <Link
                  href={`/signup${authQuery}`}
                  className="font-semibold text-primary underline"
                >
                  Create an account
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}