import React, { Suspense, lazy } from 'react';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/sections/Footer';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import InteractiveNeuralVortex from '@/components/ui/interactive-neural-vortex-background';
import { GridPattern } from '@/components/ui/GridPattern';

// Lazy load heavy components to improve initial page load
const PremiumTestimonials = lazy(() => import('@/components/ui/premium-testimonials').then(m => ({ default: m.PremiumTestimonials })));
const MarketplacePreview = lazy(() => import('@/components/sections/MarketplacePreview').then(m => ({ default: m.MarketplacePreview })));
const Features = lazy(() => import('@/components/sections/Features').then(m => ({ default: m.Features })));
const LeadCaptureForm = lazy(() => import('@/components/forms/LeadCaptureForm').then(m => ({ default: m.LeadCaptureForm })));

const Index = () => {
  return (
    <AppLayout>
      <SEOHead 
        title="WebInHours - Professional Websites Delivered in 24 Hours" 
        description="Get professional, mobile-responsive websites built in 24 hours, not weeks. Custom development, e-commerce, SEO optimization. 500+ successful projects. Money-back guarantee." 
        keywords="website development, 24 hour website, fast web design, professional websites, custom development, e-commerce, mobile responsive, SEO optimization" 
      />
      
      {/* Background layers - Grid behind Neural Vortex */}
      <GridPattern />
      <InteractiveNeuralVortex />

      {/* All sections now float over the unified background */}
      <div className="relative z-10">
          <Hero />
          
          {/* Marketplace Preview */}
          <Suspense fallback={<div className="h-32 bg-card/20 animate-pulse rounded-lg mx-4 my-8" />}>
            <MarketplacePreview />
          </Suspense>
          
          {/* Services Section */}
          <Services />
          
          {/* Features - Lazy loaded */}
          <Suspense fallback={<div className="h-64 bg-card/20 animate-pulse rounded-lg mx-4 my-8" />}>
            <Features />
          </Suspense>

          {/* Enhanced Lead Capture Section */}
          <section className="py-20 px-4 relative overflow-hidden">
            <div className="container mx-auto relative z-10">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Online Presence?</h2>
                <p className="text-xl text-muted-foreground mb-8">Join 500+ successful businesses who chose speed over waiting</p>
              </div>
              <Suspense fallback={<div className="h-32 bg-card/20 animate-pulse rounded-lg max-w-4xl mx-auto" />}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/10 to-purple-500/10 rounded-2xl blur-xl"></div>
                  <LeadCaptureForm variant="inline" incentive="Free Website Audit + $200 Bonus Package" className="max-w-4xl mx-auto relative z-10" />
                </div>
              </Suspense>
            </div>
          </section>
          
          {/* Testimonials - Lazy loaded */}
          <div id="testimonials">
            <Suspense fallback={<div className="h-96 bg-card/20 animate-pulse mx-4 my-8" />}>
              <PremiumTestimonials />
            </Suspense>
          </div>
          
          <CTASection />
          <Footer />
        </div>
    </AppLayout>
  );
};

export default Index;