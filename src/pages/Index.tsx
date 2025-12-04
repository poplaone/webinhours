import React, { Suspense, lazy } from 'react';
import { Hero } from '@/components/sections/Hero';
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

const Index = () => {
  return (
    <AppLayout>
      <SEOHead
        title="WebInHours - Choose Your Free Website Design Today"
        description="Select from 500+ professional website designs absolutely free. We handle setup and hosting. Premium services like content creation, PR, SEO & GEO, and social media management available when you need them."
        keywords="free website design, professional website templates, free business website, website setup service, content creation, PR services, social media management, website hosting, online presence"
      />

      {/* Background layers - Grid pattern */}
      <GridPattern />

      {/* All sections now float over the unified background */}
      <div className="relative z-10">
        <Hero />

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