
import React from 'react';
import AnimatedGridBackground from '@/components/animations/AnimatedGridBackground';
import { PremiumTestimonials } from '@/components/ui/premium-testimonials';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Features } from '@/components/sections/Features';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/sections/Footer';
import AppLayout from '@/components/layout/AppLayout';

const Index = () => {
  return (
    <AppLayout>
      <AnimatedGridBackground />
      <Hero />
      <Services />
      <Features />
      <div id="testimonials">
        <PremiumTestimonials />
      </div>
      <CTASection />
      <Footer />
    </AppLayout>
  );
};

export default Index;
