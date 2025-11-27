import React, { Suspense, lazy } from 'react';
import { Hero } from '@/components/sections/Hero';
import { LogoMarquee } from '@/components/sections/LogoMarquee';
import { Services } from '@/components/sections/Services';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/sections/Footer';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
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
        title="WebInHours - Choose Your Free Website Design Today" 
        description="Select from 500+ professional website designs absolutely free. We handle setup and hosting. Premium services like content creation, PR, and social media management available when you need them." 
        keywords="free website design, professional website templates, free business website, website setup service, content creation, PR services, social media management, website hosting, online presence" 
      />
      
      {/* Background layers - Grid pattern */}
      <GridPattern />

      {/* All sections now float over the unified background */}
      <div className="relative z-10">
          <Hero />
          <LogoMarquee />
          
          {/* Marketplace Preview */}
          <Suspense fallback={<div className="h-32 bg-card/20 animate-pulse rounded-lg mx-4 my-2 md:my-8" />}>
            <MarketplacePreview />
          </Suspense>
          
          {/* Services Section */}
          <Services />
          
          {/* Features - Lazy loaded */}
          <Suspense fallback={<div className="h-64 bg-card/20 animate-pulse rounded-lg mx-4 my-2 md:my-8" />}>
            <Features />
          </Suspense>

          {/* Enhanced Lead Capture Section */}
          <section className="py-6 md:py-20 px-4 relative overflow-hidden">
            <div className="container mx-auto relative z-10">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h2 className="text-4xl font-bold mb-4">Start Your Free Website Today</h2>
                <p className="text-xl text-muted-foreground mb-8">Choose from 500+ professional designs. Add premium services when you're ready to grow.</p>
              </div>
              <Suspense fallback={<div className="h-32 bg-card/20 animate-pulse rounded-lg max-w-4xl mx-auto" />}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/10 to-purple-500/10 rounded-2xl blur-xl"></div>
                  <LeadCaptureForm variant="inline" incentive="Get Your FREE Website + Premium Service Consultation" className="max-w-4xl mx-auto relative z-10" />
                </div>
              </Suspense>
            </div>
          </section>
          
          {/* Testimonials - Lazy loaded */}
          <div id="testimonials">
            <Suspense fallback={<div className="h-96 bg-card/20 animate-pulse mx-4 my-2 md:my-8" />}>
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