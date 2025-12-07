import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Mail, ArrowRight, Home } from 'lucide-react';

export default function ContactConfirmation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || 'there';
  const email = searchParams.get('email');
  const type = searchParams.get('type') || 'general';

  useEffect(() => {
    // If no email param, this might be a direct visit - redirect to contact
    if (!email) {
      const timer = setTimeout(() => {
        navigate('/contact');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [email, navigate]);

  const getResponseTime = () => {
    switch (type) {
      case 'technical':
      case 'billing':
        return '2-4 hours';
      case 'custom':
        return '4-8 hours';
      default:
        return '24 hours';
    }
  };

  const nextSteps = [
    {
      title: 'Email Confirmation',
      description: 'Check your inbox for an immediate confirmation email',
      icon: Mail,
      time: 'Immediate'
    },
    {
      title: 'Team Review',
      description: 'Our team will review your inquiry and gather necessary information',
      icon: Clock,
      time: '1-2 hours'
    },
    {
      title: 'Personalized Response',
      description: 'You\'ll receive a detailed response with next steps',
      icon: CheckCircle,
      time: getResponseTime()
    }
  ];

  return (
    <AppLayout>
      <SEOHead
        title="Message Received - WebInHour"
        description="Your message has been successfully received. We'll get back to you shortly."
        keywords="contact confirmation, message received"
      />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border-4 border-green-500/20 mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Thanks for reaching out, <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{name}</span>!
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              We've received your message and our team is already on it. You should receive a confirmation email at <strong className="text-foreground">{email}</strong>
            </p>

            <Badge variant="secondary" className="text-base px-4 py-2">
              <Clock className="h-4 w-4 mr-2" />
              Expected Response Time: {getResponseTime()}
            </Badge>
          </div>

          {/* Next Steps Timeline */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">What Happens Next?</h2>

              <div className="space-y-6">
                {nextSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-lg">{step.title}</h3>
                          <Badge variant="outline">{step.time}</Badge>
                        </div>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-4">While You Wait...</h3>
              <p className="text-muted-foreground mb-6">
                Explore our marketplace of professional website templates or learn more about our custom design services.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/marketplace')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Browse Marketplace
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Support Note */}
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>
              Didn't receive a confirmation email? Check your spam folder or{' '}
              <button
                onClick={() => navigate('/contact')}
                className="text-primary hover:underline font-medium"
              >
                contact us again
              </button>
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
