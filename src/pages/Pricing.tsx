import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import GEOStructuredData from '@/components/seo/GEOStructuredData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Crown, Shield, Globe, MessageCircle, Share2, Code, Loader2, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDodoPayment } from '@/hooks/useDodoPayment';
import { PremiumServicesModal } from '@/components/modals/PremiumServicesModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Dodo Payments Product IDs
const DODO_PRODUCTS = {
  'Custom Lite': 'pdt_4VbxIlVYONBlZcu91PSu5',
  'Custom Pro': 'pdt_Lp3H6UAAng5cDeHMYNwqR',
} as const;

// Supported currencies with display info
type Currency = {
  code: string;
  symbol: string;
  name: string;
  flag: string;
};

const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
];

// Base prices in USD (displayed prices are always in USD)
const BASE_PRICES = {
  'Custom Lite': 299,
  'Custom Pro': 599,
};

export default function Pricing() {
  const navigate = useNavigate();
  const { initiateCheckout, isLoading } = useDodoPayment();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]); // Default to USD

  const handlePurchase = async (planName: keyof typeof DODO_PRODUCTS) => {
    setLoadingPlan(planName);
    await initiateCheckout(DODO_PRODUCTS[planName], selectedCurrency.code);
    setLoadingPlan(null);
  };

  const plans = [
    {
      name: "Template",
      icon: Zap,
      price: "Free",
      period: "forever",
      description: "Perfect for DIYers and developers",
      features: [
        "Professional template access",
        "Instant code download",
        "Basic setup guide",
        "Community support",
        "Commercial license",
        "Mobile responsive"
      ],
      popular: false,
      cta: "Browse Templates",
      action: () => navigate('/websites'),
      isPaid: false
    },
    {
      name: "Custom Lite",
      icon: Star,
      price: "$299",
      period: "project",
      description: "Ideal for businesses needing quick customization",
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
      cta: "Get Started",
      action: () => handlePurchase("Custom Lite"),
      isPaid: true
    },
    {
      name: "Custom Pro",
      icon: Crown,
      price: "$599",
      period: "project",
      description: "For businesses requiring fully custom solutions",
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
      cta: "Get Started",
      action: () => handlePurchase("Custom Pro"),
      isPaid: true
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
      cta: "Contact Us",
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
        title="Pricing - WebInHour | Free Templates + Expert Customization"
        description="Transparent pricing for every stage of growth. Start with a free template or upgrade to our Custom Lite and Custom Pro packages for expert development."
        keywords="website pricing, web development cost, free website templates, custom website packages, affordable web design"
        canonicalUrl="https://webinhours.com/pricing"
      />

      {/* GEO-Optimized Pricing Schema */}
      <GEOStructuredData pageType="pricing" />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Transparent Pricing</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Start Free,<br />Scale with Expertise
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Launch today with our free templates. When you need a professional touch or a fully custom solution, our expert team is ready to deliver.
            </p>

            {/* Currency Selector */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">Prices shown in USD</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <span>{selectedCurrency.flag}</span>
                    <span>{selectedCurrency.code}</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  {CURRENCIES.map((currency) => (
                    <DropdownMenuItem
                      key={currency.code}
                      onClick={() => setSelectedCurrency(currency)}
                      className="gap-2 cursor-pointer"
                    >
                      <span>{currency.flag}</span>
                      <span className="font-medium">{currency.code}</span>
                      <span className="text-muted-foreground text-sm">- {currency.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative bg-white/5 backdrop-blur-md flex flex-col ${plan.popular ? 'border-purple-500 border-2 scale-105 shadow-xl shadow-purple-500/10 z-10' : 'border-border/50 hover:border-purple-500/50'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 px-4 py-1 text-sm font-semibold shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4 pt-8">
                  <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full w-fit">
                    <plan.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl mb-1">{plan.name}</CardTitle>
                  <p className="text-sm text-gray-500 h-10 flex items-center justify-center px-4">{plan.description}</p>
                </CardHeader>

                <CardContent className="flex-grow flex flex-col">
                  <div className="text-center mb-8">
                    <div className="text-4xl font-bold text-gray-900">
                      {plan.price}
                      {plan.price !== "Free" && <span className="text-lg font-normal text-gray-500">/{plan.period}</span>}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full mt-auto py-6 text-lg ${plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-md'
                      : ''
                      }`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={plan.action}
                    disabled={plan.isPaid && loadingPlan === plan.name}
                  >
                    {plan.isPaid && loadingPlan === plan.name ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Premium Digital Solutions Section */}
          <div className="mb-24 text-center">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-purple-500/20 backdrop-blur-sm">
              <Badge variant="outline" className="mb-4 border-purple-500/50 text-purple-600">Ecosystem Services</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Premium Digital Solutions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Access our vetted ecosystem of enterprise-grade services.
                From reputation defense to exclusive digital asset acquisition.
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
                  <h4 className="font-semibold mb-2 text-gray-900">How does the Custom Lite plan work?</h4>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    You choose a template foundation, and our team customizes it to your brand identity (colors, logo, content) within 24 hours. It's the fastest way to get a professional site live.
                  </p>

                  <h4 className="font-semibold mb-2 text-gray-900">Is hosting included?</h4>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    We provide the deployment files. You can host anywhere (Vercel, Netlify, standard hosting), or we can set up hosting for you as part of the service.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-gray-900">What is "Custom Pro"?</h4>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    This is for unique requirements. We build features from scratch, integrate databases, set up complex forms, and provide deep SEO optimization tailored to your niche.
                  </p>

                  <h4 className="font-semibold mb-2 text-gray-900">How do I pay?</h4>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    Since we tailor every project to your needs, we invoice directly. Contact us to discuss your requirements and we'll send a secure payment link.
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
