import Image from "next/image";
import Link from "next/link";

import digitalImg from "@/assets/Digital.png";
import literaryspaceImg from "@/assets/literaryspace.png";

export default function SignupPage() {
  return (
    <main className="min-h-screen">
      <header className="header glassmorphism flex items-center justify-between px-8 py-4">
        <div className="logo font-bold text-2xl" style={{ color: "#0B1F3B" }}>
          SCRIBBLED
        </div>
        <div className="flex items-center gap-3 text-sm text-on-surface-variant">
          <span className="tracking-wide uppercase">Already a member?</span>
          <Link href="/login" className="font-semibold text-on-surface">
            Sign in
          </Link>
        </div>
      </header>

      <div className="container mx-auto max-w-[1120px] px-4 py-14">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="pr-0 lg:pr-10">
            <h1 className="text-5xl md:text-6xl leading-[1.05] font-serif font-semibold text-primary">
              Articulating the visionary,
              <br />
              together.
            </h1>
            <p className="mt-6 text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed">
              Join a global community of thinkers, writers, and creators
              dedicated to the pursuit of intellectual depth and aesthetic
              clarity.
            </p>

            <div className="mt-10 flex flex-col gap-4 max-w-xl">
              <div className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-5 shadow-sm">
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    ▣
                  </div>
                  <div>
                    <div className="font-serif text-xl font-semibold text-primary">
                      Exclusive Archives
                    </div>
                    <div className="mt-1 text-sm text-on-surface-variant leading-relaxed">
                      Access a curated library of profound literary works and
                      modern critiques.
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-5 shadow-sm">
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary font-semibold">
                    ✦
                  </div>
                  <div>
                    <div className="font-serif text-xl font-semibold text-primary">
                      Creator Studio
                    </div>
                    <div className="mt-1 text-sm text-on-surface-variant leading-relaxed">
                      Professional tools to draft, edit, and publish your
                      visionary content.
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm h-[180px]">
                <Image
                  src={digitalImg}
                  alt="Open book"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                <div className="absolute bottom-4 left-5 text-white/95 text-sm font-serif drop-shadow">
                  “The word is the architecture of the soul.”
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pl-10">
            <div className="rounded-3xl bg-white/80 backdrop-blur border border-black/10 shadow-[0_18px_60px_rgba(15,23,42,0.12)] p-8 md:p-10">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary">
                Create your account
              </h2>
              <p className="mt-2 text-sm text-on-surface-variant">
                Start your journey into the SCRIBBLED ecosystem today.
              </p>

              <form className="mt-8 space-y-5">
                <div>
                  <label className="block text-xs tracking-wide uppercase text-on-surface-variant mb-2">
                    Full name
                  </label>
                  <input
                    className="w-full h-12 rounded-xl border border-black/10 bg-white px-4 outline-none"
                    placeholder="Elias Thorne"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-wide uppercase text-on-surface-variant mb-2">
                    Email address
                  </label>
                  <input
                    className="w-full h-12 rounded-xl border border-black/10 bg-white px-4 outline-none"
                    placeholder="elias@scribbled.com"
                    type="email"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-wide uppercase text-on-surface-variant mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full h-12 rounded-xl border border-black/10 bg-white px-4 pr-12 outline-none"
                      placeholder="••••••••••••"
                      type="password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                      aria-label="Show password"
                    >
                      ◦
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-4 text-base"
                >
                  Create Account
                </button>

                <p className="text-xs text-on-surface-variant text-center">
                  By creating an account, you agree to our{" "}
                  <a href="#" className="underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
