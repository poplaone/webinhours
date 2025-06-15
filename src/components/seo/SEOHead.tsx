
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "WebInHours - Professional Websites Delivered in 24 Hours",
  description = "Get professional, mobile-responsive websites built in 24 hours, not weeks. Custom development, e-commerce, SEO optimization. 500+ successful projects. Money-back guarantee.",
  keywords = "website development, 24 hour website, fast web design, professional websites, custom development, e-commerce, mobile responsive, SEO optimization, business websites, landing pages",
  ogImage = "/placeholder.svg",
  ogType = "website",
  canonicalUrl,
  noIndex = false
}) => {
  const fullTitle = title.includes('WebInHours') ? title : `${title} | WebInHours`;
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://webinhours.com');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="WebInHours" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Additional SEO Tags */}
      <meta name="author" content="WebInHours" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      
      {/* Enhanced Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "WebInHours",
          "description": "Professional website development in 24 hours",
          "url": "https://webinhours.com",
          "logo": "https://webinhours.com/logo.png",
          "foundingDate": "2023",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-123-4567",
            "contactType": "customer service",
            "email": "support@webinhours.com",
            "availableLanguage": "English"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          },
          "sameAs": [
            "https://twitter.com/webinhours",
            "https://linkedin.com/company/webinhours"
          ],
          "serviceType": "Web Development",
          "areaServed": "Worldwide",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "200",
            "bestRating": "5",
            "worstRating": "1"
          },
          "offers": {
            "@type": "Offer",
            "description": "Professional website development services",
            "priceRange": "$199-$899",
            "availability": "https://schema.org/InStock"
          }
        })}
      </script>
      
      {/* Service Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "24-Hour Website Development",
          "description": "Professional websites delivered in 24 hours with mobile-responsive design, SEO optimization, and unlimited revisions",
          "provider": {
            "@type": "Organization",
            "name": "WebInHours"
          },
          "serviceType": "Web Development",
          "category": "Website Development",
          "areaServed": "Worldwide",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Website Development Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Business Websites",
                  "description": "Professional corporate sites"
                },
                "price": "299",
                "priceCurrency": "USD"
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "E-commerce Stores",
                  "description": "Complete online stores with payment processing"
                },
                "price": "599",
                "priceCurrency": "USD"
              }
            ]
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
