import React from 'react';
import { Palette, PenTool, Globe2 } from 'lucide-react';
import { AnimatedServiceCard } from '@/components/ui/animated-service-card';
import CombinedFeaturedSection from '@/components/ui/combined-featured-section';
import customBrandingGif from '@/assets/custom-branding.gif';
export const Services = () => {
  const services = [{
    icon: Globe2,
    tagline: "100% FREE",
    title: "FREE Professional Website",
    description: "Get a complete, professional website with everything you need to start your online presence - completely FREE forever. Includes 500+ Templates, Mobile Responsive design, SSL Security, and Basic Support.",
    beforeAfterSlider: {
      beforeImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&auto=format&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80"
    }
  }, {
    icon: Palette,
    image: customBrandingGif,
    tagline: "From $199",
    title: "Custom Design & Branding",
    description: "Make your website unique with custom colors, fonts, logos, and personalized design that matches your brand perfectly. Includes Custom Colors, Logo Integration, Brand Fonts, and Unlimited Revisions."
  }, {
    icon: PenTool,
    tagline: "$99/month",
    title: "Content Creation",
    description: "Professional content for your website, blog, and social media to engage customers and grow your business online. Services include blog writing, social media posts, email content, and product copy tailored to your brand."
  }];
  return <section id="services" className="py-6 md:py-20 px-4 relative z-10 my-0">
      <div className="container mx-auto w-full max-w-[1600px] space-y-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-green-500">🆓 Free Website + Premium Services</span>
          </div>

          <h2 className="text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl xl:font-extrabold mb-4">
            Start FREE, Upgrade When Ready
          </h2>
          <p className="text-muted-foreground mt-4 text-sm tracking-wide text-balance md:text-base">
            Get your professional website completely FREE with no hidden costs. Choose from hundreds of templates
            and upgrade to premium services only when you need advanced features, custom design, or marketing support.
          </p>
        </div>

        <div className="space-y-0">
          {services.map((service, i) => <AnimatedServiceCard key={i} service={service} index={i} />)}
        </div>

        {/* SEO & PR Services in Modern Grid Layout */}
        <CombinedFeaturedSection />
      </div>
    </section>;
};