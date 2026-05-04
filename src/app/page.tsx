import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CTASection } from "@/components/home/CTASection";
import { HeroSection } from "@/components/home/HeroSection";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";

export default function HomePage() {
  return (
    <main className="bg-background min-h-screen flex flex-col">
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
