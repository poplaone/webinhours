import React from 'react';
import { Palette, PenTool, Globe2 } from 'lucide-react';
import { AnimatedServiceCard } from '@/components/ui/animated-service-card';
import CombinedFeaturedSection from '@/components/ui/combined-featured-section';
import customBrandingGif from '@/assets/custom-branding.gif';
import contentCreationImage from '@/assets/content-creation.webp';
import comparisonBefore from '@/assets/comparison-before.webp';
import comparisonAfter from '@/assets/comparison-after.webp';

export const Services = () => {
  const services = [
    {
      icon: Globe2,
      title: "Free Website",
      tagline: "Launch Your Online Presence",
      description: "Get a fully functional, mobile-optimized website at zero cost. Choose from 500+ SEO-ready templates, secured with free SSL.",
      price: "Free",
      beforeAfterSlider: {
        beforeImage: comparisonBefore,
        afterImage: comparisonAfter,
      },
      detailedFeatures: [
        { title: "500+ Professional Templates", description: "Modern, responsive designs" },
        { title: "Mobile Optimized", description: "Perfect on all devices" },
        { title: "SEO Ready", description: "Built for search engines" },
        { title: "Free SSL Certificate", description: "Secure your visitors" },
      ],
    },
    {
      icon: Palette,
      title: "Custom Branding",
      tagline: "Stand Out from the Crowd",
      description: "Elevate your brand with bespoke web design. We craft custom color palettes, unique typography, and conversion-focused layouts.",
      price: "From $299",
      image: customBrandingGif,
      detailedFeatures: [
        { title: "Custom Color Palette", description: "Unique brand colors" },
        { title: "Typography Selection", description: "Premium font pairing" },
        { title: "Logo Integration", description: "Perfect brand alignment" },
        { title: "Conversion Optimization", description: "Designed to convert" },
      ],
    },
    {
      icon: PenTool,
      title: "Content Creation",
      tagline: "Words That Convert",
      description: "Engage your audience with professionally crafted content. From compelling copy to stunning visuals, we tell your brand story.",
      price: "From $199",
      image: contentCreationImage,
      detailedFeatures: [
        { title: "Professional Copywriting", description: "Engaging, persuasive content" },
        { title: "Blog Articles", description: "SEO-optimized posts" },
        { title: "Product Descriptions", description: "Compelling sales copy" },
        { title: "Social Media Content", description: "Platform-specific content" },
      ],
    },
  ];

  return (
    <section 
      id="services" 
      className="relative bg-background overflow-hidden"
      aria-labelledby="services-heading"
      itemScope 
      itemType="https://schema.org/ItemList"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Section Header with Answer-First Formatting */}
        <header className="text-center mb-12 lg:mb-16">
          <h2 
            id="services-heading" 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Our Services
          </h2>
          {/* TL;DR Summary for AI extraction */}
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" itemProp="description">
            Professional web development services: Free websites with 500+ templates, custom branding from $299, and content creation from $199. All services include mobile optimization, SEO, and SSL security.
          </p>
        </header>

        {/* Service Cards with Schema Markup */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <article 
              key={index} 
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/Service"
            >
              <meta itemProp="position" content={String(index + 1)} />
              <meta itemProp="name" content={service.title} />
              <meta itemProp="description" content={service.description} />
              {service.price && <meta itemProp="offers" content={service.price} />}
              <AnimatedServiceCard service={service} index={index} />
            </article>
          ))}
        </div>

        {/* SEO, GEO & PR Services in Modern Grid Layout */}
        <CombinedFeaturedSection />
      </div>
    </section>
  );
};
