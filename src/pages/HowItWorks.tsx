
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, ShoppingCart, Rocket, MessageCircle, Users, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HowItWorks() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: Search,
      title: "Browse & Choose",
      description: "Explore our extensive collection of professional templates or describe your custom requirements",
      details: ["100+ premium templates", "Multiple categories", "Filter by industry", "AI-powered recommendations"]
    },
    {
      icon: ShoppingCart,
      title: "Purchase & Customize",
      description: "Buy your chosen template or request custom development with your specific requirements",
      details: ["Instant template download", "Custom development quotes", "Rush delivery options", "Flexible payment plans"]
    },
    {
      icon: MessageCircle,
      title: "Collaborate & Review",
      description: "Work directly with our team or the template creator to perfect your website",
      details: ["Real-time communication", "Preview before final", "Unlimited revisions", "Expert guidance"]
    },
    {
      icon: Rocket,
      title: "Launch & Support",
      description: "Get your fully functional website delivered and launched with ongoing support",
      details: ["Complete website files", "Hosting assistance", "SEO & GEO optimization", "30-day support"]
    }
  ];

  return (
    <AppLayout>
      <SEOHead
        title="How It Works - WebInHours | Free Website Selection to Premium Services"
        description="Choose your free professional website design in minutes. Add premium services like content creation, PR, and social media management as your business grows."
        keywords="free website setup, how to get free website, website selection process, premium website services, content creation services"
      />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Your Free Website,<br />Ready in Hours
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pick your favorite design from 500+ free professional templates. We handle the setup. Scale with premium services when you're ready.
            </p>
          </div>

          {/* Process Steps */}
          <div className="space-y-12 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {index + 1}
                    </div>
                  </div>

                  <Card className="flex-grow">
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl">
                        <step.icon className="h-6 w-6 mr-3 text-purple-600" />
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 text-lg">{step.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-500">
                            <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                            {detail}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex justify-center mt-8">
                    <ArrowRight className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Marketplace Section */}
          <Card className="mb-16 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl flex items-center justify-center">
                <Users className="h-8 w-8 mr-3 text-purple-600" />
                For Independent Developers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Sell Your Creations</h3>
                  <p className="text-gray-600 mb-4">
                    Join our marketplace and monetize your web development skills. List your templates
                    and custom websites for sale.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                      Keep 70% of all sales
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                      Quality review process
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                      Marketing support
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                      Global exposure
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">What You Can Sell</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">Website Templates</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">Custom Sites</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">Components</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Rocket className="h-8 w-8 text-red-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">Full Projects</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of satisfied customers who got their websites in hours, not weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={() => navigate('/dashboard')}
              >
                Browse Templates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
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
