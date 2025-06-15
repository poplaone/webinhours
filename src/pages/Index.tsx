
import React from 'react';
import AnimatedGridBackground from '@/components/animations/AnimatedGridBackground';
import { PremiumTestimonials } from '@/components/ui/premium-testimonials';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Features } from '@/components/sections/Features';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/sections/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 relative">
      <AnimatedGridBackground />
      <Header />
      <Hero />
      <Services />
      <Features />
      <PremiumTestimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
