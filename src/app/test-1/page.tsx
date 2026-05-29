import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/Creative workspace.png";
import poeticImg from "@/assets/Poetic.png";
import spatialImg from "@/assets/spatial.png";
import PhilosophyImg from "@/assets/Philosophy.png";
import digitalImg from "@/assets/Digital.png";

export default function EditorialPage() {
  return (
    <div className="theme-editorial min-h-screen font-[family-name:var(--font-garamond)] bg-background text-foreground selection:bg-primary selection:text-primary-foreground flex flex-col">
      <header className="border-b border-border py-6 px-8 flex justify-between items-center bg-background/90 backdrop-blur-md sticky top-0 z-50">
        <div className="text-3xl font-bold tracking-tighter uppercase font-[family-name:var(--font-fraunces)]">
          Scribbled
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase">
          <Link href="#" className="hover:text-primary transition-colors">Discover</Link>
          <Link href="#" className="hover:text-primary transition-colors">Feed</Link>
          <Link href="#" className="hover:text-primary transition-colors">Creators</Link>
          <Link href="#" className="hover:text-primary transition-colors">Studio</Link>
        </nav>
        <div className="flex gap-4">
          <Link href="/signup" className="border border-foreground px-6 py-2 uppercase text-sm tracking-wider hover:bg-foreground hover:text-background transition-colors">
            Subscribe
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-8 py-20 md:py-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-4 text-primary text-sm uppercase tracking-widest font-bold">
              <span className="w-12 h-px bg-primary"></span>
              Issue No. 04
            </div>
            <h1 className="text-6xl md:text-8xl font-[family-name:var(--font-fraunces)] leading-[0.9] tracking-tight">
              Share<br />
              <span className="italic text-muted-foreground">Your Story</span><br />
              With the<br />
              World.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
              A premium digital space for visionaries and thinkers. Elevate your creative voice with our articulate publishing tools.
            </p>
            <div className="pt-4">
              <Link href="/signup" className="bg-primary text-primary-foreground px-8 py-4 text-sm tracking-widest uppercase hover:bg-foreground transition-colors inline-block">
                Start Writing
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7 relative group">
            <div className="aspect-[4/5] md:aspect-[3/2] overflow-hidden bg-muted relative">
              <Image 
                src={heroImage} 
                alt="Workspace" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-background p-6 border border-border shadow-2xl max-w-xs hidden md:block">
              <div className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Trending Now</div>
              <h3 className="text-xl font-[family-name:var(--font-fraunces)] leading-tight">The Art of Minimalist Living in a Chaotic World</h3>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="bg-secondary py-24 px-8 border-y border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16 border-b border-border pb-8">
              <h2 className="text-5xl font-[family-name:var(--font-fraunces)]">Curated Themes</h2>
              <Link href="#" className="uppercase tracking-widest text-sm font-bold hover:text-primary transition-colors flex items-center gap-2">
                See All <span className="text-xl">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {[
                { title: "Modern Stoicism", tag: "Philosophy", img: PhilosophyImg },
                { title: "Digital Expression", tag: "Visual Arts", img: digitalImg },
                { title: "Poetic Structures", tag: "Literature", img: poeticImg },
                { title: "Spatial Design", tag: "Architecture", img: spatialImg },
              ].map((cat, i) => (
                <Link href="#" key={i} className="group cursor-pointer block">
                  <div className="aspect-[3/4] overflow-hidden mb-6 relative border border-border">
                    <Image 
                      src={cat.img} 
                      alt={cat.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110 sepia-[0.3]"
                    />
                  </div>
                  <div className="text-xs tracking-widest uppercase text-primary mb-2">{cat.tag}</div>
                  <h3 className="text-2xl font-[family-name:var(--font-fraunces)] leading-tight group-hover:underline underline-offset-4">{cat.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-16 px-8 text-center border-t border-border mt-auto">
        <h2 className="text-4xl font-[family-name:var(--font-fraunces)] mb-6">Scribbled</h2>
        <p className="text-muted-foreground mb-8">Elevating digital literature.</p>
        <div className="flex justify-center gap-8 uppercase tracking-widest text-xs">
          <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
          <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
