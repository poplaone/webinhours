import React from 'react';
import { Globe2, MapPin, Palette, PenTool, Search, Share2 } from 'lucide-react';
import { AnimatedServiceCard } from '@/components/ui/animated-service-card';
import CombinedFeaturedSection from '@/components/ui/combined-featured-section';
import customBrandingGif from '@/assets/custom-branding.gif';
import contentCreationImage from '@/assets/content-creation.webp';
import comparisonBefore from '@/assets/comparison-before.webp';
import comparisonAfter from '@/assets/comparison-after.webp';

export const Services = () => {
  const presenceFoundation = [
    {
      icon: Globe2,
      title: "Professional website",
      description: "A polished home base for your offer, services, trust signals, and lead capture.",
    },
    {
      icon: MapPin,
      title: "Google Business setup",
      description: "Local profile setup so customers can find you on Google Search and Maps.",
    },
    {
      icon: Share2,
      title: "Social media content",
      description: "Branded posts, reels, captions, and profile assets for the channels you use.",
    },
    {
      icon: Search,
      title: "SEO and local visibility",
      description: "Keyword-focused pages, local search basics, analytics, and performance tracking.",
    },
  ];

  const services = [
    {
      icon: Globe2,
      title: "Presence Starter",
      tagline: "Website, Google Business & social launch",
      description: "Launch your complete web presence with a polished site, Google Business listing, and starter social media content package for fast visibility.",
      price: "From $299",
      cta: { text: "Start Your Presence Plan", href: "/contact" },
      beforeAfterSlider: {
        beforeImage: comparisonBefore,
        afterImage: comparisonAfter,
      },
      detailedFeatures: [
        { title: "Website Launch", description: "Fast professional website delivery" },
        { title: "Google Business Setup", description: "Local search presence and maps listing" },
        { title: "Social Starter Kit", description: "Social profile setup and branded templates" },
        { title: "SEO Foundation", description: "Basic on-page and GEO optimization" },
      ],
    },
    {
      icon: Palette,
      title: "Social Content Package",
      tagline: "Posts, reels, and engagement",
      description: "Build your brand across social channels with content creation, captions, reels, and management support for growth and consistency.",
      price: "From $199",
      cta: { text: "Book Content Strategy", href: "/contact" },
      image: customBrandingGif,
      detailedFeatures: [
        { title: "Branded Social Posts", description: "Swipe-ready graphics and captions" },
        { title: "Reels & Short Videos", description: "Engaging short-form content for Instagram and TikTok" },
        { title: "Content Calendar", description: "Planned posting schedule for 4 weeks" },
        { title: "Social Management", description: "Posting support and caption optimization" },
      ],
    },
    {
      icon: PenTool,
      title: "SEO & Local Growth",
      tagline: "Rank higher and get found locally",
      description: "Increase search visibility with local SEO, keyword-rich pages, Google Business optimization, and analytics that show your growth.",
      price: "From $249",
      cta: { text: "Get a Growth Quote", href: "/contact" },
      image: contentCreationImage,
      detailedFeatures: [
        { title: "Local SEO", description: "Optimize for local search and maps" },
        { title: "Google Business Management", description: "Profile setup and review systems" },
        { title: "SEO Content", description: "Keyword-rich copy for better rankings" },
        { title: "Performance Reports", description: "Simple analytics and progress tracking" },
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
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase text-primary">What we set up</p>
          <h2 id="services-heading" className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
            What we set up for you.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Website, Google Business, social content, and local SEO - connected into one launch-ready presence.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {presenceFoundation.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-lg border border-border bg-card/60 p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold tracking-normal text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase text-primary">Packages</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
            Choose your launch package.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Start with website, content, SEO, or a complete online presence package.
          </p>
        </div>

        {/* Service Cards with Schema Markup */}
        <div className="mt-6 space-y-0">
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
