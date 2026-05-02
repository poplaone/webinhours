
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
          answer: "Absolutely. Once we have your logo and content, our team gets to work immediately. By combining powerful templates with expert development, we skip the usual weeks of waiting and deliver a polished site within a day."
        },
        {
          question: "What if I need my website live today?",
          answer: "We've got you covered. We offer a rush same-day delivery option. Just let us know it's urgent when you contact us, and we'll fast-track your build so you're online before the day is over."
        },
        {
          question: "How exactly does the 24-hour process work?",
          answer: "It's straightforward: You pick a design foundation you like and send us your text and images. Our team then customizes the colors, fonts, and layout to match your brand, and we deploy the finished site for you to review."
        }
      ]
    },
    {
      category: "General",
      questions: [
        {
          question: "Is the free template tier actually free?",
          answer: "Yes, 100% free. You can browse and download from our library of 500+ professional templates at no cost. You only pay if you want our experts to customize the design, write your content, or handle the technical setup for you."
        },
        {
          question: "Do I own my website?",
          answer: "Yes! Unlike some subscription builders that lock you in, you get full ownership of your website code. You're free to host it anywhere and modify it however you want."
        },
        {
          question: "What if I don't know how to write website copy?",
          answer: "No problem. We offer an add-on Content Creation service where our professional copywriters will craft compelling, search-optimized text for your entire site."
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
