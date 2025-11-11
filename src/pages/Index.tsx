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
      
      {/* Marketplace Preview with enhanced styling */}
      <Suspense fallback={<div className="h-32 bg-gradient-to-r from-muted/50 to-muted animate-pulse rounded-lg mx-4 my-8" />}>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 via-transparent to-emerald-500/5"></div>
          <MarketplacePreview />
        </div>
      </Suspense>
      
      {/* Enhanced Services Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent"></div>
        <Services />
      </div>
      
      
      {/* Features - Lazy loaded */}
      <Suspense fallback={<div className="h-64 bg-gradient-to-r from-muted/30 to-muted/10 animate-pulse rounded-lg mx-4 my-8" />}>
        <Features />
      </Suspense>
      

      {/* Enhanced Lead Capture Section */}
      <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-[#8B5CF6]/10 via-purple-500/5 to-pink-500/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Online Presence?</h2>
            <p className="text-xl text-muted-foreground mb-8">Join 500+ successful businesses who chose speed over waiting</p>
          </div>
          <Suspense fallback={<div className="h-32 bg-muted/20 animate-pulse rounded-lg max-w-4xl mx-auto" />}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/20 to-purple-500/20 rounded-2xl blur-xl"></div>
              <LeadCaptureForm variant="inline" incentive="Free Website Audit + $200 Bonus Package" className="max-w-4xl mx-auto relative z-10" />
            </div>
          </Suspense>
        </div>
      </section>
      
      {/* Testimonials - Lazy loaded */}
      <div id="testimonials">
        <Suspense fallback={<div className="h-96 bg-gradient-to-b from-muted/20 to-transparent animate-pulse mx-4 my-8" />}>
          <PremiumTestimonials />
        </Suspense>
      </div>
      
      {/* Mobile-Optimized Consultation Booking Section */}
      <section className="py-12 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto relative z-10">
          {/* Header Section - Mobile Optimized */}
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-3 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-[#8B5CF6]/20 to-purple-600/20 border border-[#8B5CF6]/30 mb-6 md:mb-8">
              <span className="text-lg md:text-xl">🎯</span>
              <span className="text-sm md:text-base font-semibold text-white">Free Strategy Session</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-white bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent leading-tight">
              Ready to Get Started?
            </h2>
            
            <p className="text-base md:text-lg lg:text-xl text-purple-100/90 max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8 px-2">
              Book a free 30-minute consultation to discuss your project and get a custom strategy. 
              No sales pressure, just expert advice tailored to your specific needs.
            </p>
            
            {/* Benefits - Mobile Stack, Desktop Row */}
            <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="flex items-center justify-center md:justify-start gap-3 text-purple-200 bg-white/5 rounded-lg p-3 md:bg-transparent md:p-0">
                <div className="w-3 h-3 bg-emerald-400 rounded-full flex-shrink-0"></div>
                <span className="text-sm md:text-base font-medium">Free Strategy Session</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3 text-purple-200 bg-white/5 rounded-lg p-3 md:bg-transparent md:p-0">
                <div className="w-3 h-3 bg-emerald-400 rounded-full flex-shrink-0"></div>
                <span className="text-sm md:text-base font-medium">Custom Project Quote</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3 text-purple-200 bg-white/5 rounded-lg p-3 md:bg-transparent md:p-0">
                <div className="w-3 h-3 bg-emerald-400 rounded-full flex-shrink-0"></div>
                <span className="text-sm md:text-base font-medium">No Obligation</span>
              </div>
            </div>
          </div>
          
          {/* Booking Form - Mobile Optimized */}
          <Suspense fallback={<div className="h-40 bg-white/10 animate-pulse rounded-lg backdrop-blur" />}>
            <div className="relative max-w-sm md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/30 to-purple-600/30 rounded-xl md:rounded-2xl blur-xl md:blur-2xl"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/20 p-4 md:p-6 lg:p-8">
                <ConsultationBooking />
              </div>
            </div>
          </Suspense>
          
          {/* Trust Indicators - Mobile Only */}
          <div className="md:hidden mt-8 text-center">
            <div className="flex justify-center items-center gap-4 text-purple-200/80 text-xs">
              <span>⭐ 4.9/5 Rating</span>
              <span>•</span>
              <span>🚀 24hr Response</span>
              <span>•</span>
              <span>💬 Free Advice</span>
            </div>
          </div>
        </div>
      </section>
      
      <CTASection />
      <Footer />
    </AppLayout>
  );
};
export default Index;