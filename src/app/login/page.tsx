import Link from "next/link";

export default function LoginPage() {
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
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-primary text-center">
              Welcome Back
            </h1>
            <p className="mt-3 text-sm text-on-surface-variant text-center">
              Continue your creative journey with SCRIBBLED.
            </p>

            <form className="mt-10 space-y-6">
              <div>
                <label className="block text-xs tracking-wide uppercase text-on-surface-variant mb-2">
                  Email address
                </label>
                <input
                  className="w-full h-12 rounded-xl border border-black/10 bg-white px-4 outline-none"
                  placeholder="name@example.com"
                  type="email"
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
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-4 text-base"
              >
                Sign In
              </button>

              <div className="flex items-center gap-4 pt-2">
                <div className="h-px flex-1 bg-black/10" />
                <div className="text-xs tracking-wide uppercase text-on-surface-variant">
                  or continue with
                </div>
                <div className="h-px flex-1 bg-black/10" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="btn-secondary py-3 rounded-xl border border-black/10"
                >
                  Google
                </button>
                <button
                  type="button"
                  className="btn-secondary py-3 rounded-xl border border-black/10"
                >
                  Apple
                </button>
              </div>

              <p className="pt-4 text-sm text-on-surface-variant text-center">
                New to SCRIBBLED?{" "}
                <Link
                  href="/signup"
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
