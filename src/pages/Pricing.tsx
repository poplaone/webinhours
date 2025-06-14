
import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Star, Zap, Users, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Pricing() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Template",
      icon: Zap,
      price: "$29-99",
      period: "one-time",
      description: "Perfect for small businesses and personal projects",
      features: [
        "Professional template",
        "Instant download",
        "Basic customization guide",
        "Email support",
        "Commercial license",
        "Mobile responsive"
      ],
      popular: false,
      cta: "Browse Templates"
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
        "Basic SEO setup",
        "7-day support"
      ],
      popular: true,
      cta: "Get Started"
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
        "SEO optimization",
        "30-day support",
        "Training session"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const addOns = [
    { name: "Rush Delivery (24h)", price: "+50%" },
    { name: "Additional Pages", price: "$49/page" },
    { name: "E-commerce Setup", price: "$199" },
    { name: "Advanced SEO", price: "$149" },
    { name: "Social Media Integration", price: "$99" },
    { name: "Analytics & Tracking", price: "$79" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <DashboardHeader />
      
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Transparent Pricing</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Choose Your<br />Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No hidden fees, no monthly subscriptions. Pay once and get a professional website 
            that's yours forever.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-purple-500 border-2 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full w-fit">
                  <plan.icon className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-gray-900">
                  {plan.price}
                  <span className="text-lg font-normal text-gray-500">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                    : ''
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => navigate('/dashboard')}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add-ons Section */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Add-On Services</CardTitle>
            <p className="text-center text-gray-600">Enhance your website with additional features</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {addOns.map((addon, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">{addon.name}</span>
                  <Badge variant="secondary">{addon.price}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Marketplace Section */}
        <Card className="mb-16 bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center">
              <Users className="h-6 w-6 mr-2 text-green-600" />
              Marketplace Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">For Buyers</h3>
                <p className="text-gray-600 mb-4">
                  Access premium templates and custom websites from talented independent developers.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">$19-$299</div>
                  <p className="text-sm text-gray-600">Template range</p>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">For Sellers</h3>
                <p className="text-gray-600 mb-4">
                  Earn money by selling your templates and custom websites on our platform.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">70%</div>
                  <p className="text-sm text-gray-600">Revenue share</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">What's included in the price?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  All website files, design assets, basic setup instructions, and initial support.
                </p>
                
                <h4 className="font-semibold mb-2">Do you offer refunds?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Yes, we offer a 7-day money-back guarantee if you're not satisfied.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">How fast is delivery?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Templates are instant. Custom work typically takes 2-24 hours, or same-day with rush delivery.
                </p>
                
                <h4 className="font-semibold mb-2">Do I own the website?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Yes, you get full ownership and commercial rights to your website.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
