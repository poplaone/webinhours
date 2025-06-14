
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface BlogPostStructuredDataProps {
  type: 'blogPost';
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}

interface ServiceStructuredDataProps {
  type: 'service';
  name: string;
  description: string;
  provider: string;
  areaServed?: string;
  serviceType?: string;
}

interface FAQStructuredDataProps {
  type: 'faq';
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

type StructuredDataProps = BlogPostStructuredDataProps | ServiceStructuredDataProps | FAQStructuredDataProps;

const StructuredData: React.FC<StructuredDataProps> = (props) => {
  const generateStructuredData = () => {
    switch (props.type) {
      case 'blogPost':
        return {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": props.title,
          "description": props.description,
          "author": {
            "@type": "Person",
            "name": props.author
          },
          "datePublished": props.datePublished,
          "dateModified": props.dateModified || props.datePublished,
          "image": props.image,
          "url": props.url,
          "publisher": {
            "@type": "Organization",
            "name": "WebInHours",
            "logo": {
              "@type": "ImageObject",
              "url": "https://webinhours.com/logo.png"
            }
          }
        };

      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": props.name,
          "description": props.description,
          "provider": {
            "@type": "Organization",
            "name": props.provider
          },
          "areaServed": props.areaServed || "Worldwide",
          "serviceType": props.serviceType || "Web Development"
        };

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": props.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        };

      default:
        return null;
    }
  };

  const structuredData = generateStructuredData();

  if (!structuredData) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
