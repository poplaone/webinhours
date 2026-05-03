import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, ShoppingCart, Rocket, MessageCircle, Users, Zap, Code, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HowItWorks() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: Search,
      title: "1. Pick a starting point",
      description: "We don't stare at blank screens. You pick a proven layout from our library. We already know these templates convert and look great on mobile.",
      details: ["500+ Tested Layouts", "Mobile-First Code", "SEO-Ready Base", "Live Previews"]
    },
    {
      icon: Code,
      title: "2. We do the heavy lifting",
      description: "You send us your logo, colors, and copy. Our engineers handle the integration. We don't ask you to learn a complicated website builder.",
      details: ["Brand Matching", "Typography Setup", "Copy Injection", "GEO Formatting"]
    },
    {
      icon: Rocket,
      title: "3. You go live tomorrow",
      description: "Within 24 hours, we push your site to production. We host it on blazing fast servers, hook up your domain, and hand you the keys.",
      details: ["Vercel/Netlify Hosting", "Free SSL", "Domain Connection", "You Own The Code"]
    }
  ];

  return (
    <AppLayout>
      <SEOHead
        title="How It Works - WebInHour | Get Your Website in 24 Hours"
        description="Here is exactly how we deliver professional websites in 24 hours. We skip the bloat, use proven templates, and push code live fast."
        keywords="how to get website in 24 hours, fast website process, same day website delivery, rapid web development, instant website launch"
        canonicalUrl="https://WebInHour.com/how-it-works"
      />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-20 scroll-m-20">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium tracking-wide uppercase">The Process</Badge>
            <h1 className="text-4xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
              No bloat.<br />
              <span className="text-foreground">Just a live website.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              We cut out the wireframes, the endless revisions, and the \"design by committee.\" 
              Here is exactly how we get you online in 24 hours.
            </p>
          </div>

          {/* Process Steps */}
          <div className="space-y-16 mb-24 relative">

            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute left-[3.25rem] top-10 bottom-10 w-0.5 bg-gradient-to-b from-purple-600 via-blue-600 to-transparent opacity-30"></div>

            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="flex flex-col md:flex-row gap-10">
                  <div className="flex-shrink-0 z-10">
                    <div className="w-28 h-28 bg-background border-4 border-border/50 rounded-full flex items-center justify-center shadow-lg group-hover:border-purple-500/50 transition-colors duration-300">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  <Card className="flex-grow bg-white/5 backdrop-blur-md border-border/50 hover:border-primary/20 transition-all duration-300 group-hover:bg-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl md:text-3xl font-bold">
                        <step.icon className="h-8 w-8 mr-4 text-purple-500" />
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/30">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center text-sm font-medium text-foreground/80">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                            {detail}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>

          {/* Marketplace Section - For Developers */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Are you a developer?</h2>
              <p className="text-xl text-muted-foreground p-2">Stop building $500 sites on Upwork. Sell your templates to our audience.</p>
            </div>

            <Card className="bg-gradient-to-br from-purple-500/5 via-background to-blue-500/5 border-primary/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  <div className="p-8 md:p-12 space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 flex items-center">
                        <Users className="h-6 w-6 mr-3 text-purple-600" />
                        Join the Template Network
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        If you build clean, fast, mobile-ready templates, we want them in our library. 
                        You get paid every time a customer uses your design.
                      </p>
                    </div>

                    <ul className="space-y-4">
                      {[
                        "Keep 70% of the sale",
                        "We handle the hosting and customer support",
                        "Tap into a massive audience of active buyers",
                        "Get paid for code you already wrote"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center text-foreground">
                          <Shield className="h-5 w-5 mr-3 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <Button variant="outline" className="border-purple-500/50 hover:bg-purple-500/10" onClick={() => navigate('/dashboard')}>
                      Submit a Template
                    </Button>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12 border-l border-border/50 flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-6 text-center">What buyers are looking for</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Zap, label: "React Next.js", color: "text-yellow-500" },
                        { icon: ShoppingCart, label: "E-Commerce", color: "text-blue-500" },
                        { icon: Code, label: "SaaS Dashboards", color: "text-purple-500" },
                        { icon: Rocket, label: "Local Services", color: "text-red-500" }
                      ].map((item, i) => (
                        <div key={i} className="bg-background/50 border border-border/50 rounded-xl p-4 text-center hover:border-primary/50 transition-colors">
                          <item.icon className={`h-8 w-8 mx-auto mb-3 ${item.color}`} />
                          <span className="font-medium text-sm">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center py-12 rounded-2xl bg-gradient-to-b from-transparent to-purple-500/5 border border-border/50">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Stop Waiting. Launch Today.</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              You could have a live, professional website tomorrow. 
              Pick a template and let's get to work.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto"
                onClick={() => navigate('/websites')}
              >
                Browse Free Templates
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 h-auto border-2"
                onClick={() => navigate('/pricing')}
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
