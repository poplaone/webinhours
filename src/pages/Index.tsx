import React, { Suspense, lazy } from 'react';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Footer } from '@/components/sections/Footer';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { GridPattern } from '@/components/ui/GridPattern';

// Lazy load heavy components to improve initial page load
const PremiumTestimonials = lazy(() => import('@/components/ui/premium-testimonials').then(m => ({ default: m.PremiumTestimonials })));
const MarketplacePreview = lazy(() => import('@/components/sections/MarketplacePreview').then(m => ({ default: m.MarketplacePreview })));
const Features = lazy(() => import('@/components/sections/Features').then(m => ({ default: m.Features })));
const PremiumMarketplaceServices = lazy(() => import('@/components/sections/PremiumMarketplaceServices').then(m => ({ default: m.PremiumMarketplaceServices })));

const Index = () => {
  return (
    <AppLayout>
      <SEOHead
        title="WebInHour - Enterprise Digital Solutions & Premium Assets"
        description="WebInHour delivers professional website development, online reputation management, social media verification, and premium digital assets. Your complete digital transformation partner."
        keywords="WebInHour, reputation management, google knowledge panel, social media verification, premium domains, digital pr services, website development"
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

        {/* Premium Marketplace Services */}
        <div id="premium-marketplace">
          <Suspense fallback={<div className="h-[600px] bg-card/20 animate-pulse mx-4 my-2 md:my-8" />}>
            <PremiumMarketplaceServices />
          </Suspense>
        </div>

        <Footer />
      </div>
    </AppLayout>
  );
};

export default Index;