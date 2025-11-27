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

  return (
    <section id="services" className="py-6 md:py-20 px-4 relative z-10 my-0">
      <div className="container mx-auto w-full max-w-[1600px] space-y-8">
        <div className="space-y-0 border-2 border-primary/30 rounded-sm p-8 md:p-12">
          {services.map((service, i) => <AnimatedServiceCard key={i} service={service} index={i} />)}
        </div>

        {/* SEO & PR Services in Modern Grid Layout */}
        <CombinedFeaturedSection />
      </div>
    </section>
  );
};