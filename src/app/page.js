import Navigation from '@/components/ui/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import ProblemSolutionSection from '@/components/sections/ProblemSolutionSection';
import ThreeStepSection from '@/components/sections/ThreeStepSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import PricingSection from '@/components/sections/PricingSection';
import Footer from '@/components/ui/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <ProblemSolutionSection />
      <ThreeStepSection />
      <FeaturesSection />
      <PricingSection />
      <Footer />
    </main>
  );
}
