import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/Creative workspace.png";
import poeticImg from "@/assets/Poetic.png";
import spatialImg from "@/assets/spatial.png";
import PhilosophyImg from "@/assets/Philosophy.png";
import digitalImg from "@/assets/Digital.png";

export default function MinimalPage() {
  return (
    <div className="theme-minimal min-h-screen font-[family-name:var(--font-instrument)] bg-background text-foreground flex flex-col antialiased selection:bg-black selection:text-white">
      <header className="px-12 py-8 flex justify-between items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border/50">
        <Link href="/" className="text-xl font-medium tracking-tight">
          Scribbled.
        </Link>
        <nav className="hidden md:flex gap-12 text-sm text-muted-foreground">
          <Link href="#" className="hover:text-foreground transition-colors">Discover</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Feed</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Creators</Link>
        </nav>
        <div className="flex gap-4">
          <Link href="/signup" className="text-sm font-medium hover:opacity-70 transition-opacity">
            Sign In
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-12 py-24 md:py-32 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-12">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] max-w-4xl">
              A refined digital space <br className="hidden md:block"/> for visionaries.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Publish beautiful articles, build a community, and elevate your creative voice with our minimalist publishing tools.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <Link href="/signup" className="bg-foreground text-background px-8 py-3 rounded-full text-sm font-medium hover:scale-105 transition-transform">
                Start Writing
              </Link>
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Explore showcase →
              </Link>
            </div>
          </div>
          
          <div className="mt-24 w-full aspect-[21/9] bg-card rounded-3xl overflow-hidden relative border border-border/50 shadow-sm">
            <Image 
              src={heroImage} 
              alt="Workspace" 
              fill 
              className="object-cover opacity-90"
              priority
            />
          </div>
        </section>

        {/* Categories Grid */}
        <section className="px-12 py-24 max-w-7xl mx-auto border-t border-border/50">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl font-medium tracking-tight">Curated Themes</h2>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Modern Stoicism", tag: "Philosophy", img: PhilosophyImg, slug: "modern-stoicism" },
              { title: "Digital Expression", tag: "Visual Arts", img: digitalImg, slug: "sample-article" },
              { title: "Poetic Structures", tag: "Literature", img: poeticImg, slug: "poetic-structures" },
              { title: "Spatial Design", tag: "Architecture", img: spatialImg, slug: "spatial-design" },
            ].map((cat, i) => (
              <Link href={`/test-5/article/${cat.slug}`} key={i} className="group flex flex-col gap-4">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-card relative">
                  <Image 
                    src={cat.img} 
                    alt={cat.title} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">{cat.tag}</div>
                  <h3 className="text-lg font-medium tracking-tight">{cat.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="px-12 py-12 text-sm text-muted-foreground border-t border-border/50 flex justify-between items-center">
        <div>© 2026 Scribbled.</div>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Instagram</Link>
        </div>
      </footer>
    </div>
  );
}
