import React, { Suspense, lazy } from 'react';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/sections/Footer';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';

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
      
      {/* Unified Background for entire homepage */}
      <div className="relative min-h-screen">
        {/* Single Unified Background */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          {/* Base background - solid and consistent */}
          <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950" />
          
          {/* Primary Grid Pattern - EXTRA Visible */}
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(148, 163, 184, 1) 2px, transparent 2px),
                linear-gradient(to bottom, rgba(148, 163, 184, 1) 2px, transparent 2px)
              `,
              backgroundSize: '25px 25px'
            }}
          />
          
          {/* Secondary Grid - Much more visible */}
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(99, 102, 241, 0.9) 3px, transparent 3px),
                linear-gradient(to bottom, rgba(99, 102, 241, 0.9) 3px, transparent 3px)
              `,
              backgroundSize: '100px 100px'
            }}
          />
          
          {/* Major Grid - Very prominent accent lines */}
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(139, 92, 246, 0.8) 4px, transparent 4px),
                linear-gradient(to bottom, rgba(139, 92, 246, 0.8) 4px, transparent 4px)
              `,
              backgroundSize: '300px 300px'
            }}
          />
          
          {/* Diagonal Pattern - very visible */}
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(45deg, transparent 45%, rgba(139, 92, 246, 0.4) 49%, rgba(139, 92, 246, 0.4) 51%, transparent 55%),
                linear-gradient(-45deg, transparent 45%, rgba(139, 92, 246, 0.4) 49%, rgba(139, 92, 246, 0.4) 51%, transparent 55%)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          
          {/* Dot Pattern - very prominent */}
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 1) 2px, transparent 2px)',
              backgroundSize: '25px 25px'
            }}
          />
          
          {/* Dark mode overrides - EXTRA visible */}
          <div className="absolute inset-0 dark:block hidden">
            {/* Dark mode primary grid - EXTRA visible */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(148, 163, 184, 0.9) 2px, transparent 2px),
                  linear-gradient(to bottom, rgba(148, 163, 184, 0.9) 2px, transparent 2px)
                `,
                backgroundSize: '25px 25px'
              }}
            />
            
            {/* Dark mode secondary grid - EXTRA visible */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(99, 102, 241, 0.8) 3px, transparent 3px),
                  linear-gradient(to bottom, rgba(99, 102, 241, 0.8) 3px, transparent 3px)
                `,
                backgroundSize: '100px 100px'
              }}
            />
            
            {/* Dark mode major grid - EXTRA visible */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(139, 92, 246, 0.7) 4px, transparent 4px),
                  linear-gradient(to bottom, rgba(139, 92, 246, 0.7) 4px, transparent 4px)
                `,
                backgroundSize: '300px 300px'
              }}
            />
            
            {/* Dark mode dots - EXTRA visible */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 1) 2px, transparent 2px)',
                backgroundSize: '25px 25px'
              }}
            />
          </div>
          
          {/* Enhanced floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-indigo-500/15 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-indigo-500/15 via-blue-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
        </div>

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
      </div>
    </AppLayout>
  );
};

export default Index;