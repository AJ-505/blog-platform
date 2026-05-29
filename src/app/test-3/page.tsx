import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/Creative workspace.png";
import poeticImg from "@/assets/Poetic.png";
import spatialImg from "@/assets/spatial.png";
import PhilosophyImg from "@/assets/Philosophy.png";
import digitalImg from "@/assets/Digital.png";

export default function OrganicPage() {
  return (
    <div className="theme-organic min-h-screen font-[family-name:var(--font-instrument)] bg-background text-foreground flex flex-col">
      <header className="py-8 px-8 md:px-16 flex justify-between items-center">
        <Link href="/" className="text-3xl font-[family-name:var(--font-syne)] font-bold tracking-tight text-primary">
          scribbled.
        </Link>
        <nav className="hidden md:flex gap-12 text-sm font-medium">
          <Link href="#" className="hover:text-primary transition-colors">discover</Link>
          <Link href="#" className="hover:text-primary transition-colors">feed</Link>
          <Link href="#" className="hover:text-primary transition-colors">creators</Link>
          <Link href="#" className="hover:text-primary transition-colors">studio</Link>
        </nav>
        <div className="flex gap-4">
          <Link href="/signup" className="bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors">
            join us
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-8 md:px-16 py-12 md:py-20 max-w-[1400px] mx-auto">
          <div className="bg-card rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-16 shadow-sm">
            <div className="lg:w-1/2 space-y-8">
              <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-syne)] font-bold leading-[1.1] text-primary">
                Share your <br/>
                <span className="text-accent italic font-normal">story</span> with <br/>
                the world.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                A mindful digital space for visionaries and thinkers. Publish thoughtfully, build community, and elevate your creative voice.
              </p>
              <div className="pt-4 flex items-center gap-6">
                <Link href="/signup" className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                  Begin writing
                </Link>
                <Link href="#" className="text-primary font-medium hover:text-accent transition-colors">
                  Explore themes
                </Link>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative w-full">
              <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden relative shadow-2xl">
                <Image 
                  src={heroImage} 
                  alt="Workspace" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
              </div>
              
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 md:-left-12 bg-background/80 backdrop-blur-xl p-6 rounded-3xl border border-white/50 shadow-xl max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                  <div className="text-xs font-medium text-muted-foreground">Trending currently</div>
                </div>
                <h3 className="text-lg font-[family-name:var(--font-syne)] font-bold text-primary leading-tight">
                  The Art of Minimalist Living
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-24 px-8 md:px-16 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <p className="text-accent font-medium mb-3">Curated Themes</p>
              <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-syne)] font-bold text-primary">
                Explore Categories
              </h2>
            </div>
            <Link href="#" className="bg-card px-6 py-3 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors border border-border">
              View all topics
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Modern Stoicism", tag: "Philosophy", img: PhilosophyImg },
              { title: "Digital Expression", tag: "Visual Arts", img: digitalImg },
              { title: "Poetic Structures", tag: "Literature", img: poeticImg },
              { title: "Spatial Design", tag: "Architecture", img: spatialImg },
            ].map((cat, i) => (
              <Link href="#" key={i} className="group block">
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 relative shadow-md">
                  <Image 
                    src={cat.img} 
                    alt={cat.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <div className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full inline-block mb-3">
                      {cat.tag}
                    </div>
                    <h3 className="text-2xl font-[family-name:var(--font-syne)] font-bold text-white leading-tight">
                      {cat.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-card py-16 px-8 md:px-16 mt-auto rounded-t-[3rem]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-[family-name:var(--font-syne)] font-bold text-primary">scribbled.</div>
          <div className="flex gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
