import React from 'react';
import { Helmet } from 'react-helmet-async';

interface FAQItem {
  question: string;
  answer: string;
}

interface GEOStructuredDataProps {
  pageType: 'home' | 'service' | 'faq' | 'marketplace' | 'contact' | 'about' | 'pricing';
  faqs?: FAQItem[];
  serviceName?: string;
  serviceDescription?: string;
  servicePrice?: string;
}

const GEOStructuredData: React.FC<GEOStructuredDataProps> = ({
  pageType,
  faqs,
  serviceName,
  serviceDescription,
  servicePrice,
}) => {
  // Organization Schema - E-E-A-T Foundation
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": "https://webinhour.com/#organization",
    "name": "WebInHour",
    "alternateName": ["Web In Hours", "WebInHour"],
    "url": "https://webinhour.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://webinhour.com/logo.png",
      "width": 512,
      "height": 512
    },
    "description": "Complete online presence, launched in hours, not weeks. We build your website, set up Google Business, create social content, and prepare local SEO so your business looks ready everywhere customers check.",
    "foundingDate": "2023",
    "slogan": "Complete Online Presence, Launched in Hours - Not Weeks",
    "email": "support@webinhour.com",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+917560032111", // Placeholder replaced with a valid format example, ideally user provides real number
        "contactType": "customer service",
        "email": "support@webinhour.com",
        "availableLanguage": ["English"],
        "contactOption": "TollFree",
        "areaServed": ["US", "GB", "CA", "AU", "AE"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+917560032111",
        "contactType": "sales",
        "email": "sales@webinhour.com",
        "availableLanguage": ["English"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "sameAs": [],
    "knowsAbout": [
      "Complete Online Presence Packages",
      "Website Design and Development",
      "Google Business Profile Setup",
      "Local SEO and GEO Optimization",
      "Social Media Content Creation",
      "Social Media Management",
      "Content Strategy for Small Business",
      "Online Brand Visibility",
      "Responsive Web Design",
      "E-commerce Development",
      "AI Search Optimization"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "200",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // WebSite Schema with SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://webinhour.com/#website",
    "url": "https://webinhour.com",
    "name": "WebInHour",
    "description": "Launch your complete online presence in hours: website, Google Business setup, social content, and local SEO, optimized for search and AI engines.",
    "publisher": {
      "@id": "https://webinhour.com/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://webinhour.com/websites?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Service Schema - Enhanced for GEO
  const generateServiceSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://webinhour.com/services/${serviceName?.toLowerCase().replace(/\s+/g, '-')}`,
    "name": serviceName || "Web Development Service",
    "description": serviceDescription || "Professional web development service",
    "provider": {
      "@id": "https://webinhour.com/#organization"
    },
    "serviceType": "Web Development",
    "category": "Web Services",
    "areaServed": [
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "United Kingdom" },
      { "@type": "Country", "name": "Canada" },
      { "@type": "Country", "name": "Australia" },
      { "@type": "Country", "name": "United Arab Emirates" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Complete Online Presence Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Presence Starter"
          },
          "price": "299",
          "priceCurrency": "USD",
          "priceValidUntil": "2026-12-31",
          "description": "Website, Google Business setup, and starter social content package, launched in hours"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Social Content Package"
          },
          "price": "199",
          "priceCurrency": "USD",
          "description": "Posts, reels, captions, and ongoing social content creation for your channels"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO & Local Growth"
          },
          "price": "249",
          "priceCurrency": "USD",
          "description": "Local SEO, Google Business optimization, keyword-rich pages, and analytics"
        }
        ]
      },
    "termsOfService": "https://webinhour.com/terms",
    "serviceOutput": {
      "@type": "WebSite",
      "description": "A complete online presence: website, Google Business profile, social content, and local SEO"
    }
  });

  // FAQ Schema - Critical for AI extraction
  const generateFAQSchema = () => {
    const defaultFAQs: FAQItem[] = [
      {
        question: "What does a complete online presence include?",
        answer: "A complete online presence means everything customers check before they buy: a professional website, a set-up Google Business profile so you show up on Search and Maps, branded social content for your channels, and local SEO so you get found. WebInHour sets all of it up together so your business looks ready everywhere."
      },
      {
        question: "How fast can you launch my online presence?",
        answer: "In hours, not weeks. Once we have your logo, colors, and basic details, we build your website, prepare your Google Business setup, and create your starter social content right away. Most businesses go live the same day instead of waiting weeks with a traditional agency."
      },
      {
        question: "Do you set up Google Business Profile?",
        answer: "Yes. We set up or optimize your Google Business Profile so customers can find you on Google Search and Maps, with the categories, description, and details that help you rank locally and win calls and visits."
      },
      {
        question: "Do you create social media content too?",
        answer: "Yes. Every presence package includes branded social content, posts, reels, captions, and profile assets, for the channels you actually use, so your social pages look active and consistent from day one."
      },
      {
        question: "What is included in local SEO?",
        answer: "Local SEO includes keyword-focused pages, Google Business optimization, local search basics, analytics, and performance tracking, so your business shows up when nearby customers search for what you offer."
      },
      {
        question: "Do I need technical skills to work with WebInHour?",
        answer: "No technical skills required. We handle the website build, Google Business setup, social content, and SEO for you. You provide your brand details, and our team does the rest with full support throughout."
      }
    ];

    const faqItems = faqs && faqs.length > 0 ? faqs : defaultFAQs;

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  };

  // BreadcrumbList Schema
  const generateBreadcrumbSchema = () => {
    const breadcrumbs: { name: string; url: string }[] = [
      { name: "Home", url: "https://webinhour.com" }
    ];

    switch (pageType) {
      case 'marketplace':
        breadcrumbs.push({ name: "Websites", url: "https://webinhour.com/websites" });
        break;
      case 'pricing':
        breadcrumbs.push({ name: "Pricing", url: "https://webinhour.com/pricing" });
        break;
      case 'faq':
        breadcrumbs.push({ name: "FAQ", url: "https://webinhour.com/faq" });
        break;
      case 'contact':
        breadcrumbs.push({ name: "Contact", url: "https://webinhour.com/contact" });
        break;
      case 'about':
        breadcrumbs.push({ name: "About", url: "https://webinhour.com/about" });
        break;
    }

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };
  };

  // Collect all schemas based on page type
  const schemas: object[] = [organizationSchema, websiteSchema, generateBreadcrumbSchema()];

  if (pageType === 'faq' || pageType === 'home' || pageType === 'pricing') {
    schemas.push(generateFAQSchema());
  }

  if (pageType === 'service' || pageType === 'home' || pageType === 'pricing') {
    schemas.push(generateServiceSchema());
  }

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default GEOStructuredData;
