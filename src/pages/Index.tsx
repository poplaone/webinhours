import React, { Suspense, lazy } from 'react';
import { Hero } from '@/components/sections/Hero';

import { Footer } from '@/components/sections/Footer';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import GEOStructuredData from '@/components/seo/GEOStructuredData';
import FAQSchema from '@/components/seo/FAQSchema';
import { GridPattern } from '@/components/ui/GridPattern';
import { SkeletonSection, SkeletonCards } from '@/components/ui/SkeletonLoaders';

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
        title="WebInHour - Professional Website in 24 Hours | Same Day Web Development"
        description="Get your professional website in 24 hours. 500+ free SEO-ready templates, same-day customization, SEO & GEO optimization for AI search. The fastest way to launch online - not weeks, hours."
        keywords="website in 24 hours, same day website, fast website development, free website templates, SEO GEO optimized, urgent website design, WebInHour, rapid web development, get website today"
        canonicalUrl="https://webinhour.com/"
      />

      {/* Enhanced Structured Data for GEO/AI Extraction */}
      <GEOStructuredData pageType="home" />

      {/* FAQ Schema for Featured Snippets */}
      <FAQSchema />

      {/* Background layers - Grid pattern provided by AppLayout */}

      {/* All sections now float over the unified background */}
      <div className="relative z-10">
        <Hero />

        {/* Marketplace Preview */}
        <Suspense fallback={<SkeletonCards count={3} />}>
          <MarketplacePreview />
        </Suspense>

        {/* Services Section */}
        {/* Services Section */}
        <Suspense fallback={<SkeletonCards count={6} />}>
          <Services />
        </Suspense>

        {/* Features - Lazy loaded */}
        <Suspense fallback={<SkeletonSection heightClass="h-96" />}>
          <Features />
        </Suspense>



        {/* Premium Marketplace Services */}
        <div id="premium-marketplace">
          <Suspense fallback={<SkeletonSection heightClass="h-[600px]" />}>
            <PremiumMarketplaceServices />
          </Suspense>
        </div>

        {/* Testimonials Marquee Section */}
        <div id="testimonials-marquee-section">
          <Suspense fallback={<SkeletonSection heightClass="h-64" />}>
            <TestimonialsSection
              title="What Our Clients Say"
              description="Join hundreds of satisfied businesses who transformed their online presence with WebInHour"
              testimonials={[
                {
                  author: {
                    name: "Sarah Chen",
                    handle: "@sarah_events",
                    avatar: ""
                  },
                  text: "I needed a website fast for an upcoming event, and these guys actually delivered it the same day. It doesn't look like a cheap template either—it's super clean and exactly what I asked for."
                },
                {
                  author: {
                    name: "Michael Rodriguez",
                    handle: "@mrodriguez_plumbing",
                    avatar: ""
                  },
                  text: "As a small business owner, I don't have time to wait weeks for a web designer. WebInHour got my plumbing business online over the weekend, and my phone has been ringing ever since."
                },
                {
                  author: {
                    name: "Emily Watson",
                    handle: "@emilyw_consulting",
                    avatar: ""
                  },
                  text: "I grabbed one of their templates for my consulting gig. It was so easy to plug in my info, and it looks incredibly professional on my phone."
                },
                {
                  author: {
                    name: "David Park",
                    handle: "@dpark_tech",
                    avatar: ""
                  },
                  text: "Honestly, I was skeptical about the 24-hour promise. But they really did it. The team was responsive, friendly, and the final site looks fantastic."
                },
                {
                  author: {
                    name: "Jessica Thompson",
                    handle: "@jessicas_bakery",
                    avatar: ""
                  },
                  text: "Getting a free website to start my bakery was a lifesaver. Once we grew, upgrading for the premium branding was a no-brainer. The process was completely painless."
                },
                {
                  author: {
                    name: "James Anderson",
                    handle: "@janderson_logistics",
                    avatar: ""
                  },
                  text: "No hidden fees, no drawn-out meetings. Just a solid, fast website that ranks well. They actually listen to what you need and get it done."
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