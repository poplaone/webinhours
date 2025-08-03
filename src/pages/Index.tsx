import React from 'react';
import AnimatedGridBackground from '@/components/animations/AnimatedGridBackground';
import { PremiumTestimonials } from '@/components/ui/premium-testimonials';
import { TrustSignals } from '@/components/ui/trust-signals';
import { Hero } from '@/components/sections/Hero';
import { MarketplacePreview } from '@/components/sections/MarketplacePreview';
import { Services } from '@/components/sections/Services';
import { Features } from '@/components/sections/Features';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/sections/Footer';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Portfolio } from '@/components/sections/Portfolio';
import { LeadCaptureForm } from '@/components/forms/LeadCaptureForm';
import { ConsultationBooking } from '@/components/booking/ConsultationBooking';
import { ClientLogos } from '@/components/ui/ClientLogos';
const Index = () => {
  return <AppLayout>
      <SEOHead title="WebInHours - Professional Websites Delivered in 24 Hours" description="Get professional, mobile-responsive websites built in 24 hours, not weeks. Custom development, e-commerce, SEO optimization. 500+ successful projects. Money-back guarantee." keywords="website development, 24 hour website, fast web design, professional websites, custom development, e-commerce, mobile responsive, SEO optimization" />
      <AnimatedGridBackground />
      <Hero />
      
      {/* Marketplace Preview */}
      <MarketplacePreview />
      
      {/* Trust signals after hero */}
      
      
      <div className="pt-0">
        <Services />
      </div>
      
      {/* Client Logos Section */}
      <ClientLogos />
      
      <Features />
      
      {/* Portfolio Section */}
      <Portfolio />
      
      {/* Lead Capture Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <LeadCaptureForm variant="inline" incentive="Free Website Audit + $200 Bonus Package" className="max-w-4xl mx-auto" />
        </div>
      </section>
      
      <div id="testimonials">
        <PremiumTestimonials />
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
          <ConsultationBooking />
        </div>
      </section>
      
      <CTASection />
      <Footer />
    </AppLayout>;
};
export default Index;