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
    question: "How fast can I get a website and app?",
    answer: "You can get a professional website delivered within 24 hours. For mobile apps, development typically takes 2-4 weeks depending on complexity. Our rapid delivery process ensures you launch faster than traditional agencies."
  },
  {
    question: "What is included in the free website?",
    answer: "Every free website includes mobile-responsive design, SEO optimization, SSL security certificate, fast hosting, and access to 500+ premium templates. No hidden fees or credit card required."
  },
  {
    question: "How much does custom website design cost?",
    answer: "Custom branding and design packages start at $299. This includes unique design, brand identity, custom graphics, and dedicated support. Enterprise solutions are available for larger projects."
  },
  {
    question: "Do you offer SEO services?",
    answer: "Yes, all websites come with basic SEO optimization included. Premium SEO packages include keyword research, on-page optimization, schema markup, and monthly performance reports starting at $199/month."
  },
  {
    question: "Can I edit my website after it's built?",
    answer: "Absolutely. Every website comes with an easy-to-use content management system. You can update text, images, and add new pages without any coding knowledge."
  },
  {
    question: "What technologies do you use for website development?",
    answer: "We use modern, high-performance technologies including React, TypeScript, and Tailwind CSS. All websites are optimized for Core Web Vitals, ensuring fast load times and excellent user experience."
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes, we offer ongoing support packages that include security updates, performance monitoring, content updates, and priority technical support. Support plans start at $49/month."
  },
  {
    question: "Can you build e-commerce websites?",
    answer: "Yes, we specialize in high-conversion e-commerce websites with secure payment processing, inventory management, and mobile-optimized checkout. E-commerce solutions start at $499."
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
