import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/Creative workspace.png";
import poeticImg from "@/assets/Poetic.png";
import spatialImg from "@/assets/spatial.png";
import PhilosophyImg from "@/assets/Philosophy.png";
import digitalImg from "@/assets/Digital.png";

export default function RetroPage() {
  return (
    <div className="theme-retro min-h-screen font-[family-name:var(--font-oswald)] bg-background text-foreground flex flex-col uppercase tracking-widest">
      <header className="border-b-2 border-border p-6 flex justify-between items-center bg-card sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-primary animate-pulse flex items-center justify-center text-background font-bold">S</div>
          <Link href="/" className="text-2xl font-bold text-primary tracking-widest" style={{ textShadow: "2px 2px 0px var(--color-accent)" }}>
            SCRIBBLED
          </Link>
        </div>
        <nav className="hidden md:flex gap-8 text-sm">
          <Link href="#" className="hover:text-primary hover:drop-shadow-[0_0_8px_var(--color-primary)] transition-all">DISCOVER</Link>
          <Link href="#" className="hover:text-primary hover:drop-shadow-[0_0_8px_var(--color-primary)] transition-all">FEED</Link>
          <Link href="#" className="hover:text-primary hover:drop-shadow-[0_0_8px_var(--color-primary)] transition-all">CREATORS</Link>
        </nav>
        <div>
          <Link href="/signup" className="border-2 border-primary text-primary px-6 py-2 text-sm hover:bg-primary hover:text-background transition-colors hover:shadow-[0_0_15px_var(--color-primary)]">
            LOGIN_SEQ
          </Link>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-12 relative overflow-hidden">
        {/* Scanlines effect overlay */}
        <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 opacity-20"></div>

        <section className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
              <div className="inline-block bg-accent text-white px-3 py-1 text-xs mb-4 animate-bounce">
                SYS.READY //
              </div>
              <h1 className="text-6xl md:text-8xl font-bold leading-none text-white drop-shadow-[4px_4px_0px_var(--color-accent)]">
                SHARE<br/>YOUR<br/><span className="text-primary drop-shadow-[4px_4px_0px_var(--color-border)]">STORY</span>
              </h1>
              <p className="text-xl text-muted-foreground border-l-2 border-primary pl-4 max-w-md">
                A PREMIUM DIGITAL SPACE FOR VISIONARIES. ESTABLISH YOUR FREQUENCY.
              </p>
              <div className="flex gap-4 pt-4">
                <Link href="/signup" className="bg-primary text-background border-2 border-primary px-8 py-3 font-bold hover:bg-background hover:text-primary transition-all shadow-[4px_4px_0px_var(--color-accent)]">
                  INITIATE
                </Link>
              </div>
            </div>

            <div className="relative">
              {/* Decorative retro frame */}
              <div className="absolute inset-0 border-2 border-primary translate-x-4 translate-y-4 z-0"></div>
              <div className="absolute inset-0 border-2 border-accent -translate-x-4 -translate-y-4 z-0"></div>
              
              <div className="relative z-10 bg-card p-2 border-2 border-border">
                <div className="aspect-[4/3] relative overflow-hidden filter sepia hue-rotate-180 contrast-125 saturate-150">
                  <Image 
                    src={heroImage} 
                    alt="Workspace" 
                    fill 
                    className="object-cover mix-blend-screen"
                  />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto mt-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-2 border-border pb-4">
            <h2 className="text-4xl text-white drop-shadow-[2px_2px_0px_var(--color-primary)]">DATABASE // MODULES</h2>
            <Link href="#" className="text-accent hover:text-primary transition-colors flex items-center gap-2">
              [ ACCESS_ALL ]
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "MODERN STOICISM", tag: "PHILOSOPHY", img: PhilosophyImg },
              { title: "DIGITAL EXPRESSION", tag: "VISUAL ARTS", img: digitalImg },
              { title: "POETIC STRUCTURES", tag: "LITERATURE", img: poeticImg },
              { title: "SPATIAL DESIGN", tag: "ARCHITECTURE", img: spatialImg },
            ].map((cat, i) => (
              <div key={i} className="group cursor-pointer border-2 border-border p-2 bg-card hover:border-primary transition-colors">
                <div className="aspect-square relative overflow-hidden mb-4 filter grayscale group-hover:grayscale-0 contrast-150 transition-all">
                  <Image 
                    src={cat.img} 
                    alt={cat.title} 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-accent/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="text-xs text-accent mb-2">{'>>'} {cat.tag}</div>
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{cat.title}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
