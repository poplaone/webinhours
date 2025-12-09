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
    "@type": "Organization",
    "@id": "https://webinhours.com/#organization",
    "name": "WebInHours",
    "alternateName": ["Web In Hours", "WebInHour"],
    "url": "https://webinhours.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://webinhours.com/logo.png",
      "width": 512,
      "height": 512
    },
    "description": "Professional web development services delivering high-quality websites in 24 hours. Free templates, custom branding, and content creation.",
    "foundingDate": "2023",
    "slogan": "Professional Websites in 24 Hours",
    "email": "support@webinhours.com",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-415-555-0123", // Placeholder replaced with a valid format example, ideally user provides real number
        "contactType": "customer service",
        "email": "support@webinhours.com",
        "availableLanguage": ["English"],
        "contactOption": "TollFree",
        "areaServed": ["US", "GB", "CA", "AU", "AE"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+1-415-555-0123",
        "contactType": "sales",
        "email": "sales@webinhours.com",
        "availableLanguage": ["English"]
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://twitter.com/webinhours",
      "https://linkedin.com/company/webinhours",
      "https://github.com/webinhours"
    ],
    "knowsAbout": [
      "Web Development",
      "Website Design",
      "SEO Optimization",
      "Responsive Web Design",
      "E-commerce Development",
      "Content Creation",
      "Digital Branding"
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
    "@id": "https://webinhours.com/#website",
    "url": "https://webinhours.com",
    "name": "WebInHours",
    "description": "Professional web development services delivering websites in 24 hours",
    "publisher": {
      "@id": "https://webinhours.com/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://webinhours.com/websites?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Service Schema - Enhanced for GEO
  const generateServiceSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://webinhours.com/services/${serviceName?.toLowerCase().replace(/\s+/g, '-')}`,
    "name": serviceName || "Web Development Service",
    "description": serviceDescription || "Professional web development service",
    "provider": {
      "@id": "https://webinhours.com/#organization"
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
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Free Website"
          },
          "price": "0",
          "priceCurrency": "USD",
          "description": "500+ professional templates, mobile-optimized, SEO-ready"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Branding"
          },
          "price": "299",
          "priceCurrency": "USD",
          "priceValidUntil": "2025-12-31",
          "description": "Custom design, color palette, typography, logo integration"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Content Creation"
          },
          "price": "199",
          "priceCurrency": "USD",
          "priceValidUntil": "2025-12-31",
          "description": "Professional copywriting, blog articles, product descriptions"
        }
      ]
    },
    "termsOfService": "https://webinhours.com/terms",
    "serviceOutput": {
      "@type": "WebSite",
      "description": "Professional, mobile-optimized website with SEO"
    }
  });

  // FAQ Schema - Critical for AI extraction
  const generateFAQSchema = () => {
    const defaultFAQs: FAQItem[] = [
      {
        question: "Is the free website really free?",
        answer: "Yes, our free website tier is 100% free with no hidden costs. You get access to 500+ professional templates, mobile optimization, SEO-ready structure, and free SSL certificate. Premium services like custom branding and content creation are optional upgrades."
      },
      {
        question: "How fast can I get my website?",
        answer: "Most websites are delivered within 24 hours. After you choose your template and provide your content, our team works quickly to set up and launch your site. Custom branding projects may take 2-3 business days."
      },
      {
        question: "What is included in the free website?",
        answer: "The free website includes: choice from 500+ professional templates, mobile-responsive design, basic SEO optimization, free SSL certificate, contact form integration, and ongoing hosting. You only pay if you want premium upgrades."
      },
      {
        question: "Do I need technical skills to use WebInHours?",
        answer: "No technical skills required. We handle all the technical setup, hosting, and maintenance. You simply choose a template, provide your content, and we do the rest. Our team provides full support throughout the process."
      },
      {
        question: "What premium services are available?",
        answer: "Premium services include: Custom Branding (from $299) for unique design and color schemes, Content Creation (from $199) for professional copywriting, SEO Optimization for better search rankings, and ongoing Website Maintenance for regular updates and support."
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
      { name: "Home", url: "https://webinhours.com" }
    ];

    switch (pageType) {
      case 'marketplace':
        breadcrumbs.push({ name: "Websites", url: "https://webinhours.com/websites" });
        break;
      case 'pricing':
        breadcrumbs.push({ name: "Pricing", url: "https://webinhours.com/pricing" });
        break;
      case 'faq':
        breadcrumbs.push({ name: "FAQ", url: "https://webinhours.com/faq" });
        break;
      case 'contact':
        breadcrumbs.push({ name: "Contact", url: "https://webinhours.com/contact" });
        break;
      case 'about':
        breadcrumbs.push({ name: "About", url: "https://webinhours.com/about" });
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
