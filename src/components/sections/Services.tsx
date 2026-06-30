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
      description: "Get a fully functional, mobile-optimized website without spending a dime. Choose from 500+ premium templates, ready for search engines, secured with free SSL, and hosted on blazing-fast servers.",
      price: "Free",
      cta: { text: "Browse Free Templates", href: "/websites" },
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
      description: "Make your business memorable with a custom design. We build unique color palettes, readable typography, and high-converting layouts that perfectly match your brand's personality.",
      price: "From $299",
      cta: { text: "Get a Custom Quote", href: "/contact" },
      image: customBrandingGif,
      detailedFeatures: [
        { title: "Custom Color Palette", description: "Psychology-backed color schemes" },
        { title: "Typography Selection", description: "Premium font pairing for readability" },
        { title: "Logo Integration", description: "Seamless brand identity alignment" },
        { title: "Conversion Optimization", description: "UX/UI designed to drive sales" },
      ],
    },
    {
      icon: PenTool,
      title: "Content Creation",
      tagline: "Words That Convert",
      description: "Turn visitors into buyers with persuasive writing. From search-friendly blog posts to clear product descriptions, we write words that capture attention and drive real business results.",
      price: "From $199",
      cta: { text: "Get a Custom Quote", href: "/contact" },
      image: contentCreationImage,
      detailedFeatures: [
        { title: "Professional Copywriting", description: "Persuasive content that converts" },
        { title: "SEO Blog Articles", description: "Keyword-rich posts to rank higher" },
        { title: "Product Descriptions", description: "Sales-driven copy for e-commerce" },
        { title: "Social Media Strategy", description: "Viral content for engagement" },
      ],
    },
  ];

  return (
    <section
      id="services"
      className="relative bg-transparent overflow-hidden py-8 sm:py-12 lg:py-16"
      aria-labelledby="services-heading"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
