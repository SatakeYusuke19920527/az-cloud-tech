import { CtaSection } from '@/components/lp/cta-section';
import { FeaturesSection } from '@/components/lp/features-section';
import { Footer } from '@/components/lp/footer';
import { HeroSection } from '@/components/lp/hero-section';
import { PricingSection } from '@/components/lp/pricing-section';
import { SiteHeader } from '@/components/lp/site-header';
import { UseCasesSection } from '@/components/lp/use-cases-section';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <HeroSection />
          <FeaturesSection />
          <UseCasesSection />
          <PricingSection />
          <CtaSection />
        </div>
      </main>
      <Footer className="w-full" />
    </div>
  );
}
