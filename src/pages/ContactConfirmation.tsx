import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Mail, ArrowRight, Home, Sparkles, MessageCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactConfirmation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || 'there';
  const email = searchParams.get('email');
  const type = searchParams.get('type') || 'general';

  useEffect(() => {
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

  const steps = [
    {
      icon: Mail,
      title: 'Email Sent',
      description: 'Confirmation email delivered',
      status: 'complete',
    },
    {
      icon: MessageCircle,
      title: 'Team Review',
      description: 'Our experts analyze your needs',
      status: 'current',
    },
    {
      icon: Zap,
      title: 'Response',
      description: `Within ${getResponseTime()}`,
      status: 'upcoming',
    },
  ];

  return (
    <AppLayout>
      <SEOHead
        title="Message Received - WebInHour"
        description="Your message has been successfully received. We'll get back to you shortly."
        keywords="contact confirmation, message received"
      />

      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Success Animation */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border-2 border-green-500/30"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </motion.div>
              </motion.div>
              
              {/* Decorative rings */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{ delay: 0.3, duration: 1, repeat: Infinity, repeatDelay: 2 }}
                className="absolute inset-0 rounded-full border-2 border-green-500/40"
              />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Thanks, <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">{name}</span>!
            </h1>
            <p className="text-muted-foreground text-lg">
              Your message is on its way to our team.
            </p>
            {email && (
              <p className="text-sm text-muted-foreground mt-2">
                Confirmation sent to <span className="text-foreground font-medium">{email}</span>
              </p>
            )}
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isComplete = step.status === 'complete';
                    const isCurrent = step.status === 'current';
                    
                    return (
                      <React.Fragment key={index}>
                        <div className="flex flex-col items-center text-center flex-1">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.15 }}
                            className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                              isComplete 
                                ? 'bg-green-500/20 text-green-500 border-2 border-green-500/30' 
                                : isCurrent 
                                  ? 'bg-primary/20 text-primary border-2 border-primary/30 animate-pulse' 
                                  : 'bg-muted/50 text-muted-foreground border-2 border-border'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </motion.div>
                          <p className={`font-medium text-sm ${isComplete ? 'text-green-500' : isCurrent ? 'text-primary' : 'text-muted-foreground'}`}>
                            {step.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 max-w-[100px]">
                            {step.description}
                          </p>
                        </div>
                        
                        {index < steps.length - 1 && (
                          <div className={`h-0.5 flex-1 mx-2 mt-[-40px] ${
                            isComplete ? 'bg-green-500/50' : 'bg-border'
                          }`} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Response Time Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Expected response: {getResponseTime()}</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => navigate('/websites')}
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Browse Templates
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="border-border/50"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </motion.div>

          {/* Support Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center mt-10 text-sm text-muted-foreground"
          >
            Didn't receive an email? Check spam or{' '}
            <button
              onClick={() => navigate('/contact')}
              className="text-primary hover:underline font-medium"
            >
              try again
            </button>
          </motion.p>
        </div>
      </div>
    </AppLayout>
  );
}
