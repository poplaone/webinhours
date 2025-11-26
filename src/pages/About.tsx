import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, Zap, Shield, Heart } from 'lucide-react';

export default function About() {
  return (
    <AppLayout>
      <SEOHead 
        title="About Us - WebInHours | Free Website Designs + Premium Services"
        description="Offering 500+ professional website designs absolutely free. Premium services like content creation, PR, and social media management available when you need them. Your online presence, simplified."
        keywords="free website platform, professional web design, content creation services, PR services, social media management, website hosting"
      />
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">About WebInHours</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Your Free Website,<br />Your Way
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe everyone deserves a professional online presence. Choose from 500+ free website designs. 
            Enhance with premium services like content creation, PR, and social media management when you're ready to scale.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">2-24h</div>
              <p className="text-gray-600">Average Delivery</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <p className="text-gray-600">Happy Clients</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">4.9/5</div>
              <p className="text-gray-600">Customer Rating</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Zap className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">100+</div>
              <p className="text-gray-600">Templates Available</p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              WebInHours was founded with a simple belief: businesses shouldn't have to wait weeks or months 
              for a professional website. In today's fast-paced digital world, speed matters.
            </p>
            <p className="text-gray-600 mb-4">
              We've streamlined the entire web development process, from design to deployment, enabling us 
              to deliver stunning, functional websites in a fraction of the traditional time.
            </p>
            <p className="text-gray-600">
              Our platform also empowers independent developers to showcase and sell their creations, 
              creating a thriving marketplace of high-quality web solutions.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 text-red-500 mr-2" />
                Our Values
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Quality First</h4>
                  <p className="text-sm text-gray-600">Every website meets our high standards</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Speed Matters</h4>
                  <p className="text-sm text-gray-600">Fast delivery without compromising quality</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Community Driven</h4>
                  <p className="text-sm text-gray-600">Supporting developers and businesses alike</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How We're Different */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-2xl">How We're Different</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Rapid Development</h3>
                <p className="text-gray-600 text-sm">
                  Our streamlined process and pre-built components enable lightning-fast development
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Premium Quality</h3>
                <p className="text-gray-600 text-sm">
                  Every website is built with modern technologies and best practices
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Marketplace Community</h3>
                <p className="text-gray-600 text-sm">
                  Access to hundreds of templates from talented independent developers
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
