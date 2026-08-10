import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import GEOStructuredData from '@/components/seo/GEOStructuredData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Crown, Shield, Globe, MessageCircle, Share2, Code, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PremiumServicesModal } from '@/components/modals/PremiumServicesModal';
import { cn } from '@/lib/utils';
import { PricingCard } from '@/components/ui/PricingCard';
import { useAuth } from '@/hooks/useAuth';

export default function Pricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || '';

  const handleContactForPlan = (planName: string, price: string, features: string[]) => {
    const params = new URLSearchParams({
      plan: planName,
      price: price,
      features: features.join('|'),
    });
    navigate(`/contact?${params.toString()}`);
  };

  const plans = [
    {
      name: "Template",
      icon: Zap,
      price: "Free",
      period: "forever",
      description: "Perfect if you want to build it yourself",
      features: [
        "Professional template access",
        "Instant code download",
        "Basic setup guide",
        "Community support",
        "Commercial license",
        "Mobile responsive"
      ],
      popular: false,
      cta: "Download Free Templates",
      action: () => navigate('/websites'),
      isPaid: false
    },
    {
      name: "Custom Lite",
      icon: Star,
      price: "$299",
      period: "project",
      description: "Get a professional website launched within 24 hours",
      features: [
        "Template customization",
        "2-24 hour delivery",
        "Logo integration",
        "Color scheme changes",
        "Content updates",
        "Basic SEO & GEO setup",
        "7-day support"
      ],
      popular: true,
      cta: "Get My Custom Website",
      action: () => handleContactForPlan("Custom Lite", "$299", ["Template customization", "2-24 hour delivery", "Logo integration", "Color scheme changes", "Content updates", "Basic SEO & GEO setup", "7-day support"]),
      isPaid: false
    },
    {
      name: "Custom Pro",
      icon: Crown,
      price: "$599",
      period: "project",
      description: "A completely custom build tailored to your exact needs",
      features: [
        "100% custom design",
        "Advanced functionality",
        "Database integration",
        "Contact forms",
        "Analytics setup",
        "SEO & GEO optimization",
        "30-day support",
        "Training session"
      ],
      popular: false,
      cta: "Build My Custom Site",
      action: () => handleContactForPlan("Custom Pro", "$599", ["100% custom design", "Advanced functionality", "Database integration", "Contact forms", "Analytics setup", "SEO & GEO optimization", "30-day support", "Training session"]),
      isPaid: false
    },
    {
      name: "Custom Requirements",
      icon: MessageCircle,
      price: "Contact",
      period: "flexible",
      description: "Have specific needs? Let's build exactly what you require.",
      features: [
        "Unique functionality",
        "Specific API integrations",
        "Complex workflows",
        "Legacy system updates",
        "Specialized consulting",
        "Custom development",
        "Priority dedicated support"
      ],
      popular: false,
      cta: "Discuss My Project",
      action: () => navigate('/contact'),
      isPaid: false
    }
  ];

  const premiumServices = {
    reputation: {
      label: "Reputation & Verification",
      icon: Shield,
      items: [
        { name: "Reputation Repair Services", desc: "Online reputation cleanup, removals, deindexing, and protection" },
        { name: "Google Knowledge Panel", desc: "Fast and affordable Google profile creation and verification services" },
        { name: "Facebook & Instagram", desc: "Account recovery, verification, username claims, and engagement support" },
        { name: "Twitter / X Services", desc: "Verified engagement tools and trending amplification support" }
      ]
    },
    social: {
      label: "Social Growth & Claims",
      icon: Share2,
      items: [
        { name: "TikTok Services", desc: "Username claims, swaps, and automated publishing solutions" },
        { name: "YouTube Services", desc: "Content removals and custom engagement solutions for YouTube channels" },
        { name: "Reddit Services", desc: "Organic marketing, post removals, reporting, and traffic boosting" },
        { name: "Social Accounts & Pages", desc: "High-reach and verified social accounts available for acquisition" }
      ]
    },
    assets: {
      label: "Premium Assets",
      icon: Crown,
      items: [
        { name: "Rare Handles", desc: "Premium Instagram usernames and rare digital identity assets" },
        { name: "Rare Emails", desc: "Unique email assets for branding and marketing" },
        { name: "Premium Domains", desc: "High-value domains, websites, and brandable digital properties" },
        { name: "Messaging Assets", desc: "High-value email resources and WhatsApp verification services" }
      ]
    },
    business: {
      label: "Business & PR",
      icon: Globe,
      items: [
        { name: "PR Services", desc: "High-authority media features, contributor access, and guaranteed placements" },
        { name: "Established Databases", desc: "Lead generation systems, datasets, and active community extractions" },
        { name: "Connected Networking", desc: "Celebrity networks, corporate access, and exclusive partnership opportunities" },
        { name: "Influence Deals", desc: "Shoutouts, influencer promotions, and targeted exposure campaigns" }
      ]
    },
    tech: {
      label: "Tech & Dev",
      icon: Code,
      items: [
        { name: "Web & SEO Services", desc: "Full-stack development, website builds, and SEO ranking solutions" },
        { name: "AI Services", desc: "AI-driven content systems, SEO tools, and automation setup" },
        { name: "Unique Services", desc: "Specialized, high-value services with exclusive features and access" },
        { name: "Digital Utilities", desc: "Verification tools, repurposing, invites, AI utilities, and niche support" }
      ]
    },
    community: {
      label: "Community & Updates",
      icon: MessageCircle,
      items: [
        { name: "Starter Assets", desc: "Aged accounts and ready-to-use digital properties for instant deployment" },
        { name: "Buyer Requests", desc: "Active requests from buyers seeking accounts, unbans, and services" },
        { name: "Currency Exchange", desc: "Safe-trade guidelines and updates on exchange-related policies" },
        { name: "Community Warnings", desc: "Scam alerts, risk prevention, and verified safety warnings" }
      ]
    }
  };

  return (
    <AppLayout>
      <SEOHead
        title="Pricing - WebInHour | Complete Online Presence Packages"
        description="Transparent pricing for your complete online presence. Free templates to start, $299 Presence Starter with website, Google Business, and social content, plus SEO and local growth packages. Launched in hours."
        keywords="online presence pricing, web presence package cost, Google Business setup price, local SEO packages, social media content pricing, affordable presence package, WebInHour pricing"
        canonicalUrl="https://webinhour.com/pricing"
      />

      {/* GEO-Optimized Pricing Schema */}
      <GEOStructuredData pageType="pricing" />

      <div className="pt-20 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Compact Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Your Complete Online Presence. From $299. Launched in Hours.
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {user ? (
                <>Hey <span className="font-semibold text-primary">{userName || 'there'}</span>! Website, Google Business, social content, and local SEO, start free with templates, upgrade when you're ready.</>
              ) : (
                <>Website, Google Business, social content, and local SEO, start free with templates, upgrade when you're ready.</>
              )}
            </p>
          </div>

          {/* Redesigned Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {plans.map((plan, index) => (
              <PricingCard key={index} plan={plan} loadingPlan={null} />
            ))}
          </div>

          {/* Premium Digital Solutions Section */}
          <div className="mb-24 text-center">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-purple-500/20 backdrop-blur-sm">
              <Badge variant="outline" className="mb-4 border-purple-500/50 text-purple-600">Growth Services</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Take Your Brand Further</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Beyond just a website, we offer elite services to grow your digital presence. 
                From verifying your social media accounts to acquiring rare usernames.
              </p>

              <PremiumServicesModal>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg text-lg px-8 py-6 h-auto">
                  <Crown className="mr-2 h-5 w-5" />
                  View Premium Solutions
                </Button>
              </PremiumServicesModal>
            </div>
          </div>

          {/* FAQ Section */}
          <Card className="bg-white/5 backdrop-blur-md border border-border/50 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Common Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-2 text-gray-900">How does the 24-hour turnaround work?</h4>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    With our Custom Lite plan, you pick a layout, give us your logo and text, and we do the heavy lifting. We'll customize the colors, typography, and structure, handing you a ready-to-launch site within 24 hours.
                  </p>

                  <h4 className="font-semibold mb-2 text-gray-900">Do I have to pay for hosting?</h4>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    Nope! The code we write can be hosted for free on platforms like Vercel or Netlify. If you don't know how to set that up, don't worry—we'll handle the technical deployment for you.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-gray-900">Do I need my own domain name?</h4>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    You'll need to purchase your own domain name (like www.yourbusiness.com) from a registrar like GoDaddy or Namecheap. Once you have it, we'll help you connect it to your new website.
                  </p>

                  <h4 className="font-semibold mb-2 text-gray-900">What if I need ongoing changes?</h4>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    Our paid plans include a support period (7 to 30 days) for tweaks. After that, we offer affordable maintenance packages if you want us to keep managing updates for you.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
