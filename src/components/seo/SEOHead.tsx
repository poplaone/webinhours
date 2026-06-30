
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
  title = "WebInHour - Complete Web Presence in Hours | Website + Social + SEO",
  description = "Launch your complete online presence fast: website, Google Business setup, social media content, and SEO packages designed to grow your business.",
  keywords = "web presence, online presence, social media content, Google Business setup, local SEO, website packages, content creation, social media management, fast web presence launch",
  ogImage = "/og-image.png",
  ogType = "website",
  canonicalUrl,
  noIndex = false
}) => {
  const fullTitle = title.includes('WebInHour') ? title : `${title} | WebInHour`;
  // Always derive canonical from the production origin + current path. Using
  // window.location.href would bake the prerender host (localhost) into the HTML.
  const SITE_ORIGIN = 'https://webinhour.com';
  const currentUrl =
    canonicalUrl ||
    (typeof window !== 'undefined' ? `${SITE_ORIGIN}${window.location.pathname}` : SITE_ORIGIN);

  return (
    <Helmet>
      {/* ... (meta tags remain the same) */}
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
      <meta property="og:site_name" content="WebInHour" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Additional SEO Tags */}
      <meta name="author" content="WebInHour" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />

      {/* Enhanced Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "WebInHour",
          "description": "Professional website development in 24 hours",
          "url": "https://webinhour.com",
          "logo": "https://webinhour.com/logo.png",
          "foundingDate": "2023",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+917560032111",
            "contactType": "customer service",
            "email": "support@webinhour.com",
            "availableLanguage": "English"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          },
          "sameAs": [],
          "knowsAbout": [
            "Web Presence Packages",
            "Social Media Content Creation",
            "Google Business Setup",
            "Local SEO and GEO Optimization",
            "Website Design and Development",
            "Social Media Management",
            "Content Strategy for Small Business",
            "Online Brand Visibility"
          ],
          "serviceType": "Online Presence Services",
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
            "description": "Professional websites delivered in 24 hours",
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
          "name": "Complete Web Presence Services",
          "description": "Web presence packages that include websites, social content, Google Business setup, and SEO optimization for fast business launch.",
          "provider": {
            "@type": "Organization",
            "name": "WebInHour"
          },
          "serviceType": "Online Presence",
          "category": "Website and Social Media Services",
          "areaServed": "Worldwide",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Web Presence Packages",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Presence Starter",
                  "description": "Website, Google Business setup, and starter social content package"
                },
                "price": "299",
                "priceCurrency": "USD"
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Social Content Package",
                  "description": "Posts, reels, captions, and ongoing social content creation"
                },
                "price": "199",
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
