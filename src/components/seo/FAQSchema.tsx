import { Helmet } from 'react-helmet-async';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs?: FAQItem[];
}

const defaultFAQs: FAQItem[] = [
  {
    question: "Can I really get a website in 24 hours?",
    answer: "Yes! WebInHours delivers professional websites within 24 hours. Our streamlined process eliminates weeks of waiting. Choose a template, provide your content, and we handle the rest. Same-day delivery is available for urgent projects."
  },
  {
    question: "What if I need my website urgently today?",
    answer: "We offer same-day website delivery for urgent needs. Our emergency web design service can have your professional website live in just a few hours. Contact us to discuss your timeline."
  },
  {
    question: "How fast can I get a website?",
    answer: "Templates are available for instant download. Custom websites are delivered within 24 hours. For urgent projects, same-day delivery ensures you go live the same day you contact us."
  },
  {
    question: "What is included in the free website?",
    answer: "Every free website includes mobile-responsive design, SEO & GEO optimization for AI search, SSL security certificate, fast hosting, and access to 500+ premium templates. No hidden fees or credit card required."
  },
  {
    question: "How much does a 24-hour custom website cost?",
    answer: "Custom Lite packages start at $299 with 24-hour delivery. This includes template customization, logo integration, color scheme changes, content updates, and basic SEO & GEO setup."
  },
  {
    question: "Do you offer SEO and GEO optimization?",
    answer: "Yes, all websites come with SEO & GEO optimization included. This ensures your site ranks well in traditional search and AI-powered search engines like ChatGPT, Perplexity, and Google SGE."
  },
  {
    question: "Can I edit my website after it's built?",
    answer: "Absolutely. Every website comes with full source code ownership. You can update text, images, and add new pages. We also offer ongoing support packages for those who prefer expert assistance."
  },
  {
    question: "What technologies do you use for fast website development?",
    answer: "We use modern, high-performance technologies including React, TypeScript, and Tailwind CSS. All websites are optimized for Core Web Vitals, ensuring lightning-fast load times and excellent user experience."
  }
];

export const FAQSchema = ({ faqs = defaultFAQs }: FAQSchemaProps) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default FAQSchema;
