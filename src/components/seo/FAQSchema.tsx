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
    question: "What does a complete online presence include?",
    answer: "It includes everything customers check before they buy: a professional website, a set-up Google Business profile so you appear on Search and Maps, branded social content for your channels, and local SEO so you get found. WebInHour sets all of it up together so your business looks ready everywhere."
  },
  {
    question: "How fast can you launch my online presence?",
    answer: "In hours, not weeks. Once we have your logo, colors, and basic details, we build your website, prepare your Google Business setup, and create your starter social content right away. Most businesses go live the same day instead of waiting weeks with a traditional agency."
  },
  {
    question: "Do you set up my Google Business Profile?",
    answer: "Yes. We set up or optimize your Google Business Profile, categories, description, hours, and details, so customers can find you on Google Search and Maps and you rank better in local results."
  },
  {
    question: "Do you create social media content?",
    answer: "Yes. Every presence package includes branded social content, posts, reels, captions, and profile assets, for the channels you use, so your pages look active and consistent from day one."
  },
  {
    question: "What is included in local SEO?",
    answer: "Local SEO includes keyword-focused pages, Google Business optimization, local search basics, analytics, and performance tracking, so you show up when nearby customers search for what you offer, including in AI search engines like ChatGPT and Perplexity."
  },
  {
    question: "Do I own my website and can I edit it later?",
    answer: "Yes. You own the full source code, no proprietary builder lock-in. You can update text, images, and pages yourself, and we offer ongoing support packages if you'd prefer expert help."
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
