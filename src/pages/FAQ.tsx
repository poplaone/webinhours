
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "What is WebInHour?",
          answer: "WebInHour is a platform that delivers professional websites in hours, not weeks. We connect businesses with talented developers and offer pre-built templates for rapid deployment."
        },
        {
          question: "How fast can I get my website?",
          answer: "Templates are available for instant download. Custom websites typically take 2-24 hours, with rush delivery options available for same-day completion."
        },
        {
          question: "Do I own my website after purchase?",
          answer: "Yes, you get full ownership and commercial rights to your website. You can modify, host, and use it however you want."
        }
      ]
    },
    {
      category: "Pricing",
      questions: [
        {
          question: "What's included in the price?",
          answer: "All website files, design assets, basic setup instructions, and initial support period. Custom projects also include consultation, revisions, and basic SEO & GEO setup."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No hidden fees. Our pricing is transparent. The only additional costs might be optional add-ons you choose to purchase."
        },
        {
          question: "Do you offer refunds?",
          answer: "Yes, we offer a 7-day money-back guarantee if you're not satisfied with your purchase."
        }
      ]
    },
    {
      category: "Technical",
      questions: [
        {
          question: "What technologies do you use?",
          answer: "We use modern web technologies including React, HTML5, CSS3, JavaScript, and various frameworks depending on project requirements."
        },
        {
          question: "Will my website be mobile-friendly?",
          answer: "Yes, all our websites are fully responsive and optimized for mobile devices, tablets, and desktop computers."
        },
        {
          question: "Do you provide hosting?",
          answer: "We provide hosting assistance and recommendations, but you're free to host your website wherever you prefer."
        }
      ]
    },
    {
      category: "Marketplace",
      questions: [
        {
          question: "How can I sell my templates?",
          answer: "Join our marketplace by applying as a seller. Once approved, you can list your templates and earn 70% of each sale."
        },
        {
          question: "What are the quality requirements?",
          answer: "All templates must be original, well-coded, responsive, and meet our quality standards. We review each submission before approval."
        },
        {
          question: "How do I get paid?",
          answer: "Payments are processed monthly via PayPal or bank transfer, with detailed sales reports provided."
        }
      ]
    }
  ];

  return (
    <AppLayout>
      <SEOHead
        title="FAQ - WebInHour | Free Websites & Premium Services Questions"
        description="Answers to common questions about our free website designs, premium services like content creation and PR, setup process, and pricing. Get started with confidence."
        keywords="free website FAQ, website design questions, premium services questions, content creation help, website setup support"
      />

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
              <Card key={categoryIndex}>
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
          <Card className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50">
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
