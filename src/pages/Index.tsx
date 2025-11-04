import React, { Suspense, lazy } from 'react';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/sections/Footer';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';

// Lazy load heavy components to improve initial page load
const AnimatedGridBackground = lazy(() => import('@/components/animations/AnimatedGridBackground'));
const PremiumTestimonials = lazy(() => import('@/components/ui/premium-testimonials').then(m => ({ default: m.PremiumTestimonials })));
const MarketplacePreview = lazy(() => import('@/components/sections/MarketplacePreview').then(m => ({ default: m.MarketplacePreview })));
const Features = lazy(() => import('@/components/sections/Features').then(m => ({ default: m.Features })));
const LeadCaptureForm = lazy(() => import('@/components/forms/LeadCaptureForm').then(m => ({ default: m.LeadCaptureForm })));
const ConsultationBooking = lazy(() => import('@/components/booking/ConsultationBooking').then(m => ({ default: m.ConsultationBooking })));
const ClientLogos = lazy(() => import('@/components/ui/ClientLogos').then(m => ({ default: m.ClientLogos })));
const Index = () => {
  return (
    <AppLayout>
      <SEOHead 
        title="WebInHours - Professional Websites Delivered in 24 Hours" 
        description="Get professional, mobile-responsive websites built in 24 hours, not weeks. Custom development, e-commerce, SEO optimization. 500+ successful projects. Money-back guarantee." 
        keywords="website development, 24 hour website, fast web design, professional websites, custom development, e-commerce, mobile responsive, SEO optimization" 
      />
      <Suspense fallback={<div className="h-screen w-full bg-background" />}>
        <AnimatedGridBackground />
      </Suspense>
      <Hero />
      
      {/* Marketplace Preview - Lazy loaded */}
      <Suspense fallback={<div className="h-32 bg-gradient-to-r from-muted/50 to-muted animate-pulse rounded-lg mx-4 my-8" />}>
        <MarketplacePreview />
      </Suspense>
      
      {/* Trust signals after hero */}
      
      
      <div className="pt-0">
        <Services />
      </div>
      
      {/* Client Logos Section - Lazy loaded */}
      <Suspense fallback={<div className="h-20 bg-muted/30 animate-pulse mx-4 my-8" />}>
        <ClientLogos />
      </Suspense>
      
      {/* Features - Lazy loaded */}
      <Suspense fallback={<div className="h-64 bg-gradient-to-r from-muted/30 to-muted/10 animate-pulse rounded-lg mx-4 my-8" />}>
        <Features />
      </Suspense>
      
      {/* Lead Capture Section - Lazy loaded */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Suspense fallback={<div className="h-32 bg-muted/20 animate-pulse rounded-lg max-w-4xl mx-auto" />}>
            <LeadCaptureForm variant="inline" incentive="Free Website Audit + $200 Bonus Package" className="max-w-4xl mx-auto" />
          </Suspense>
        </div>
      </section>
      
      {/* Testimonials - Lazy loaded */}
      <div id="testimonials">
        <Suspense fallback={<div className="h-96 bg-gradient-to-b from-muted/20 to-transparent animate-pulse mx-4 my-8" />}>
          <PremiumTestimonials />
        </Suspense>
      </div>
      
      {/* Consultation Booking Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-sm">
              Book a free consultation to discuss your project and get a custom strategy. 
              No sales pressure, just expert advice tailored to your needs.
            </p>
          </div>
          <Suspense fallback={<div className="h-40 bg-background/50 animate-pulse rounded-lg" />}>
            <ConsultationBooking />
          </Suspense>
        </div>
      </section>
      
      <CTASection />
      <Footer />
    </AppLayout>
  );
};
export default Index;