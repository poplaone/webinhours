import React, { Suspense, lazy } from 'react';
import { Hero } from '@/components/sections/Hero';

import { Footer } from '@/components/sections/Footer';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import GEOStructuredData from '@/components/seo/GEOStructuredData';
import FAQSchema from '@/components/seo/FAQSchema';
import { GridPattern } from '@/components/ui/GridPattern';

// Lazy load heavy components to improve initial page load

const MarketplacePreview = lazy(() => import('@/components/sections/MarketplacePreview').then(m => ({ default: m.MarketplacePreview })));
const Features = lazy(() => import('@/components/sections/Features').then(m => ({ default: m.Features })));
const PremiumMarketplaceServices = lazy(() => import('@/components/sections/PremiumMarketplaceServices').then(m => ({ default: m.PremiumMarketplaceServices })));
const Services = lazy(() => import('@/components/sections/Services').then(m => ({ default: m.Services })));
const TestimonialsSection = lazy(() => import('@/components/blocks/testimonials-with-marquee').then(m => ({ default: m.TestimonialsSection })));

const Index = () => {
  return (
    <AppLayout>
      {/* GEO-Optimized SEO with Answer-First Approach */}
      <SEOHead
        title="Professional Website Design & SEO Solutions | WebInHours"
        description="The fastest way to launch high-conversion websites. Get custom design, SEO optimization, and premium templates—all in one platform. Start free today."
        keywords="professional website design, SEO solutions, custom website design, high-conversion websites, premium templates, website development, SEO optimization, web design agency"
        canonicalUrl="https://webinhours.com/"
      />

      {/* Enhanced Structured Data for GEO/AI Extraction */}
      <GEOStructuredData pageType="home" />

      {/* FAQ Schema for Featured Snippets */}
      <FAQSchema />

      {/* FAQ Schema for Featured Snippets */}
      <FAQSchema />

      {/* Background layers - Grid pattern provided by AppLayout */}

      {/* All sections now float over the unified background */}
      <div className="relative z-10">
        <Hero />

        {/* Marketplace Preview */}
        <Suspense fallback={<div className="h-32 bg-card/20 animate-pulse rounded-lg mx-4 my-2 md:my-8" />}>
          <MarketplacePreview />
        </Suspense>

        {/* Services Section */}
        {/* Services Section */}
        <Suspense fallback={<div className="h-96 bg-card/20 animate-pulse rounded-lg mx-4 my-2 md:my-8" />}>
          <Services />
        </Suspense>

        {/* Features - Lazy loaded */}
        <Suspense fallback={<div className="h-64 bg-card/20 animate-pulse rounded-lg mx-4 my-2 md:my-8" />}>
          <Features />
        </Suspense>



        {/* Premium Marketplace Services */}
        <div id="premium-marketplace">
          <Suspense fallback={<div className="h-[600px] bg-card/20 animate-pulse mx-4 my-2 md:my-8" />}>
            <PremiumMarketplaceServices />
          </Suspense>
        </div>

        {/* Testimonials Marquee Section */}
        <div id="testimonials-marquee-section">
          <Suspense fallback={<div className="h-64 bg-card/20 animate-pulse mx-4 my-2 md:my-8" />}>
            <TestimonialsSection
              title="What Our Clients Say"
              description="Join hundreds of satisfied businesses who transformed their online presence with WebInHours"
              testimonials={[
                {
                  author: {
                    name: "Sarah Chen",
                    handle: "",
                    avatar: ""
                  },
                  text: "WebInHours transformed our online presence in just 24 hours. The quality exceeded our expectations, and our conversion rates increased by 40% within the first month."
                },
                {
                  author: {
                    name: "Michael Rodriguez",
                    handle: "",
                    avatar: ""
                  },
                  text: "As a startup founder, time is money. WebInHours delivered a professional website faster than I thought possible. The SEO optimization was already built-in, saving us thousands."
                },
                {
                  author: {
                    name: "Emily Watson",
                    handle: "",
                    avatar: ""
                  },
                  text: "The template quality is outstanding. Our customers love the new design, and mobile sales have doubled since launching our WebInHours site."
                },
                {
                  author: {
                    name: "David Park",
                    handle: "",
                    avatar: ""
                  },
                  text: "I was skeptical about a 24-hour turnaround, but the results speak for themselves. Clean code, beautiful design, and excellent performance scores."
                },
                {
                  author: {
                    name: "Jessica Thompson",
                    handle: "",
                    avatar: ""
                  },
                  text: "Getting a free professional website was a game-changer for my bakery. The premium branding upgrade was worth every penny. Highly recommend!"
                },
                {
                  author: {
                    name: "James Anderson",
                    handle: "",
                    avatar: ""
                  },
                  text: "Enterprise-grade security and blazing fast performance. Our compliance team was impressed with the security features built into the WebInHours platform."
                }
              ]}
            />
          </Suspense>
        </div>

        <Footer />
      </div>
    </AppLayout>
  );
};

export default Index;