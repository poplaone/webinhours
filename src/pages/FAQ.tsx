
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import GEOStructuredData from '@/components/seo/GEOStructuredData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      category: "Speed & Delivery",
      questions: [
        {
          question: "Can I really get a website in 24 hours?",
          answer: "Yes! WebInHours specializes in rapid website delivery. Most custom websites are delivered within 24 hours of receiving your content. Our streamlined process eliminates weeks of waiting."
        },
        {
          question: "What if I need my website urgently today?",
          answer: "We offer same-day website delivery for urgent needs. Contact us and we'll prioritize your project. Many clients go from first contact to live website in just a few hours."
        },
        {
          question: "How does same-day website delivery work?",
          answer: "Choose a template, provide your content (logo, text, images), and our team works immediately to customize and deploy your site. Rush delivery ensures you're online the same day."
        }
      ]
    },
    {
      category: "General",
      questions: [
        {
          question: "Can I really get a website in 24 hours?",
          answer: "Yes! For most standard projects using our templates, we can have your fully functional, professional website live within 24 hours of receiving your content. We prioritize speed without compromising quality."
        },
        {
          question: "What if I need my website urgently?",
          answer: "We specialize in urgent website delivery. Our workflow is optimized for speed. Choose our 'Rush Delivery' or 'Same Day' service options when contacting us, and we'll fast-track your project."
        },
        {
          question: "Is the free website really free?",
          answer: "Yes, our free website tier is 100% free with no hidden costs. You get access to 500+ professional templates, mobile optimization, SEO-ready structure, and free SSL certificate. Premium services like custom branding and content creation are optional upgrades."
        },
        {
          question: "How does same-day website delivery work?",
          answer: "It's simple: 1. Select a template. 2. Send us your text and images. 3. Our team builds and deploys your site immediately. We use automation and efficient processes to ensure same-day delivery for qualified projects."
        },
        {
          question: "What is WebInHours?",
          answer: "WebInHours is the fastest way to get a professional website. We deliver websites in 24 hours, not weeks. Choose from 500+ free templates or get custom development with same-day delivery options."

        },
        {
          question: "Do I own my website after purchase?",
          answer: "Yes, you get full ownership and commercial rights to your website. You can modify, host, and use it however you want."
        }
      ]
    },
    // ... (other categories)
  ];

  // Flatten FAQs for GEO structured data
  const allFaqsForSchema = faqs.flatMap(category =>
    category.questions.map(q => ({
      question: q.question,
      answer: q.answer
    }))
  );

  return (
    <AppLayout>
      <SEOHead
        title="FAQ - WebInHours | 24-Hour Website Questions Answered"
        description="Answers to common questions about getting your website in 24 hours, same-day delivery options, free templates, and our fast development process. Learn how we build websites in hours, not weeks."
        keywords="24 hour website FAQ, same day website questions, fast website delivery FAQ, urgent website design help, WebInHours questions, website in 24 hours"
        canonicalUrl="https://webinhours.com/faq"
      />

      {/* GEO-Optimized FAQ Schema */}
      <GEOStructuredData pageType="faq" faqs={allFaqsForSchema} />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Frequently Asked Questions</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Got Questions?<br />We Have Answers
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to the most common questions about WebInHour, our services, and how we can help you get your website up and running quickly.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="bg-white/5 backdrop-blur-md border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <HelpCircle className="h-6 w-6 mr-3 text-purple-600" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`${categoryIndex}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact CTA */}
          <Card className="mt-16 bg-gradient-to-r from-purple-500/5 to-blue-500/5 backdrop-blur-md border-border/50">
            <CardContent className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? Our team is here to help.
              </p>
              <Badge variant="outline" className="cursor-pointer hover:bg-purple-100">
                Contact Support
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
