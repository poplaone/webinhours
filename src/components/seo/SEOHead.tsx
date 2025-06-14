
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
  title = "WebInHours - Professional Websites Delivered in Hours",
  description = "Get professional websites built in hours, not weeks. Choose from 100+ templates or order custom development. Fast, affordable, high-quality web solutions.",
  keywords = "website development, web design, templates, custom websites, rapid development, professional websites, web development services",
  ogImage = "/placeholder.svg",
  ogType = "website",
  canonicalUrl,
  noIndex = false
}) => {
  const fullTitle = title.includes('WebInHours') ? title : `${title} | WebInHours`;
  const currentUrl = canonicalUrl || window.location.href;

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
      
      {/* Structured Data for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "WebInHours",
          "description": "Professional website development in hours",
          "url": "https://webinhours.com",
          "logo": "https://webinhours.com/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-123-4567",
            "contactType": "customer service",
            "email": "support@webinhours.com"
          },
          "sameAs": [
            "https://twitter.com/webinhours",
            "https://linkedin.com/company/webinhours"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
