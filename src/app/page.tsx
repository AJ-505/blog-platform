import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CTASection } from "@/components/home/CTASection";
import { HeroSection } from "@/components/home/HeroSection";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col relative">
      <div className="bg-black text-white p-3 text-center text-sm font-medium sticky top-0 z-[100] flex justify-center items-center gap-4 flex-wrap">
        <span>Test New Designs:</span>
        <Link href="/test-1" className="hover:underline bg-white/20 px-3 py-1 rounded">V1 (Editorial)</Link>
        <Link href="/test-2" className="hover:underline bg-white/20 px-3 py-1 rounded">V2 (Brutalist)</Link>
        <Link href="/test-3" className="hover:underline bg-white/20 px-3 py-1 rounded">V3 (Organic)</Link>
        <Link href="/test-4" className="hover:underline bg-white/20 px-3 py-1 rounded">V4 (Retro)</Link>
        <Link href="/test-5" className="hover:underline bg-white/20 px-3 py-1 rounded">V5 (Minimal)</Link>
      </div>
      <SiteHeader />
      <div className="container mx-auto max-w-[1120px] px-4 flex-1">
        <HeroSection />
        <CategoryGrid />
        <CTASection />
      </div>
      <SiteFooter />
    </main>
  );
}
