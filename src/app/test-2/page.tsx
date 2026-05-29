import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/Creative workspace.png";
import poeticImg from "@/assets/Poetic.png";
import spatialImg from "@/assets/spatial.png";
import PhilosophyImg from "@/assets/Philosophy.png";
import digitalImg from "@/assets/Digital.png";

export default function BrutalistPage() {
  return (
    <div className="theme-brutalist min-h-screen font-[family-name:var(--font-bricolage)] bg-background text-foreground uppercase tracking-tight selection:bg-accent selection:text-white flex flex-col">
      <header className="border-b-4 border-foreground py-4 px-6 flex flex-col md:flex-row justify-between md:items-center bg-background gap-4">
        <Link href="/" className="text-4xl md:text-6xl font-black italic tracking-tighter text-accent mix-blend-difference">
          SCRIBBLED*
        </Link>
        <nav className="flex flex-wrap gap-2 md:gap-4 font-bold text-lg">
          <Link href="#" className="border-2 border-foreground px-3 py-1 hover:bg-foreground hover:text-background transition-colors">DISCOVER</Link>
          <Link href="#" className="border-2 border-foreground px-3 py-1 hover:bg-foreground hover:text-background transition-colors">FEED</Link>
          <Link href="#" className="border-2 border-foreground px-3 py-1 hover:bg-foreground hover:text-background transition-colors">STUDIO</Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="px-6 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 border-b-4 border-foreground">
          <div className="flex flex-col justify-center">
            <h1 className="text-7xl md:text-[8rem] font-black leading-[0.85] tracking-tighter mb-8 break-words">
              SHARE<br/>
              <span className="text-primary stroke-foreground">YOUR</span><br/>
              STORY
            </h1>
            <p className="text-xl md:text-3xl font-bold max-w-xl mb-12 border-l-8 border-accent pl-6 leading-tight">
              A RAW DIGITAL SPACE FOR VISIONARIES. PUBLISH ARTICLES, BUILD COMMUNITY.
            </p>
            <div className="flex gap-4">
              <Link href="/signup" className="bg-primary text-white border-4 border-foreground px-8 py-4 text-2xl font-black shadow-[8px_8px_0px_#111] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                GET STARTED
              </Link>
            </div>
          </div>
          
          <div className="relative border-4 border-foreground p-2 bg-secondary shadow-[16px_16px_0px_#ff4500]">
            <div className="aspect-square relative overflow-hidden bg-white filter contrast-125 saturate-150">
              <Image 
                src={heroImage} 
                alt="Workspace" 
                fill 
                className="object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-300"
              />
            </div>
            <div className="absolute top-8 -left-8 bg-accent text-white font-black text-2xl p-4 transform -rotate-12 border-4 border-foreground shadow-[4px_4px_0px_#111]">
              TRENDING NOW!
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="bg-white">
          <div className="border-b-4 border-foreground p-6 bg-primary text-white">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter">CURATED_THEMES</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y-4 md:divide-y-0 md:divide-x-4 divide-foreground border-b-4 border-foreground">
            {[
              { title: "MODERN STOICISM", tag: "PHILOSOPHY", img: PhilosophyImg, color: "bg-primary" },
              { title: "DIGITAL EXPRESSION", tag: "VISUAL ARTS", img: digitalImg, color: "bg-accent" },
              { title: "POETIC STRUCTURES", tag: "LITERATURE", img: poeticImg, color: "bg-yellow-400 text-black" },
              { title: "SPATIAL DESIGN", tag: "ARCHITECTURE", img: spatialImg, color: "bg-green-500 text-black" },
            ].map((cat, i) => (
              <div key={i} className="group relative overflow-hidden">
                <div className="aspect-[4/3] relative filter grayscale contrast-150 group-hover:grayscale-0 transition-all duration-300">
                  <Image src={cat.img} alt={cat.title} fill className="object-cover border-b-4 border-foreground" />
                </div>
                <div className="p-6 bg-background h-full group-hover:bg-foreground group-hover:text-background transition-colors">
                  <div className={`inline-block px-3 py-1 border-2 border-foreground font-bold mb-4 ${cat.color} text-white`}>
                    {cat.tag}
                  </div>
                  <h3 className="text-3xl font-black leading-none group-hover:text-accent transition-colors">{cat.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-12 px-6 border-t-[16px] border-primary flex flex-col md:flex-row justify-between items-center">
        <div className="text-6xl font-black tracking-tighter text-accent">SCRIBBLED</div>
        <div className="text-xl font-bold mt-4 md:mt-0">&copy; 2026 SYSTEM</div>
      </footer>
    </div>
  );
}
