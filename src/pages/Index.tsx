
import React from 'react';
import AnimatedGridBackground from '@/components/animations/AnimatedGridBackground';
import { PremiumTestimonials } from '@/components/ui/premium-testimonials';
import { TrustSignals } from '@/components/ui/trust-signals';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Features } from '@/components/sections/Features';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/sections/Footer';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';

const Index = () => {
  return (
    <AppLayout>
      <SEOHead 
        title="WebInHours - Professional Websites Delivered in 24 Hours"
        description="Get professional, mobile-responsive websites built in 24 hours, not weeks. Custom development, e-commerce, SEO optimization. 500+ successful projects. Money-back guarantee."
        keywords="website development, 24 hour website, fast web design, professional websites, custom development, e-commerce, mobile responsive, SEO optimization"
      />
      <AnimatedGridBackground />
      <Hero />
      
      {/* Trust signals after hero */}
      <section className="py-8 px-4 border-b border-border/20">
        <div className="container mx-auto">
          <TrustSignals variant="compact" className="justify-center" />
        </div>
      </section>
      
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
