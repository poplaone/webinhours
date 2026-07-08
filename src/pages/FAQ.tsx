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
          question: "Can you actually get my business online in hours?",
          answer: "Yes. Once we have your logo, colors, and details, we start immediately. We don't spend weeks wireframing. We build your site, prepare your Google Business setup, and create starter social content, then push it live. That takes hours, not weeks."
        },
        {
          question: "What if my old site just crashed and I need a site today?",
          answer: "We offer an emergency same-day turnaround. If you have your assets ready, we can get a professional site live before you go to sleep tonight."
        },
        {
          question: "How does the process actually work?",
          answer: "You pick a design from our library that fits your business. You send us your text, images, and business details. We apply your brand, set up your Google Business profile, prepare social content and local SEO, and hook up your domain. We host it, and you're ready everywhere."
        }
      ]
    },
    {
      category: "Your Complete Presence",
      questions: [
        {
          question: "Do you set up my Google Business Profile?",
          answer: "Yes. We set up or optimize your Google Business Profile, categories, description, hours, and details, so customers can find you on Google Search and Maps and you rank better in local results."
        },
        {
          question: "Do you create social media content too?",
          answer: "Yes. Every presence package includes branded social content, posts, reels, captions, and profile assets, for the channels you use, so your pages look active and consistent from day one."
        },
        {
          question: "What does local SEO include?",
          answer: "Local SEO includes keyword-focused pages, Google Business optimization, local search basics, analytics, and performance tracking, so you show up when nearby customers search, including in AI search engines like ChatGPT and Perplexity."
        }
      ]
    },
    {
      category: "The Catch",
      questions: [
        {
          question: "Are the free templates actually free?",
          answer: "Yes. If you know how to code and want to deploy the template yourself, you don't pay us a dime. We make money when companies pay us to handle the customization, SEO formatting, and deployment."
        },
        {
          question: "Do I own my website?",
          answer: "Yes. You own the code. You are not locked into a proprietary builder like Wix or Squarespace. If you want to take your code and host it somewhere else, you can."
        },
        {
          question: "What if my copy is terrible?",
          answer: "Most people struggle to write good copy. We offer an add-on service where our copywriters will rewrite your text so it actually converts visitors into leads, and formats it so AI search engines can read it."
        }
      ]
    }
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
        title="FAQ - WebInHour | Complete Online Presence, Answered"
        description="Straight answers on how we set up your website, Google Business, social content, and local SEO, what it costs, how fast it launches, and why you own everything."
        keywords="online presence FAQ, Google Business setup questions, local SEO FAQ, social content questions, web presence package help, WebInHour questions"
        canonicalUrl="https://webinhour.com/faq"
      />

      {/* GEO-Optimized FAQ Schema */}
      <GEOStructuredData pageType="faq" faqs={allFaqsForSchema} />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">The details</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Straight answers.<br />No agency spin.
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              People are skeptical when we say we can set up a complete online presence, website, Google Business, social, and local SEO, in hours. Here is exactly how it works.
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
                        <AccordionTrigger className="text-left font-medium text-lg">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-base leading-relaxed">
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
              <h2 className="text-2xl font-bold mb-4">Did we miss something?</h2>
              <p className="text-gray-600 mb-6">
                If your question isn't answered here, talk to an actual human on our team.
              </p>
              <Badge variant="outline" className="cursor-pointer hover:bg-purple-100 text-base px-4 py-2">
                Talk to Engineering
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
