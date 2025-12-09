import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, MessageCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <SEOHead
        title="Payment Cancelled - WebInHour"
        description="Your payment was cancelled. No charges have been made."
        canonicalUrl="https://webinhours.com/payment/cancel"
      />

      <div className="pt-24 pb-20 px-4 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <Card className="bg-card/50 backdrop-blur-md border-border/50 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 to-red-500" />
            
            <CardHeader className="text-center pt-12 pb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-6"
              >
                <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <XCircle className="w-12 h-12 text-orange-500" />
                </div>
              </motion.div>
              
              <CardTitle className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Payment Cancelled
              </CardTitle>
              <p className="text-muted-foreground text-lg">
                No worries! Your payment was cancelled and no charges were made.
              </p>
            </CardHeader>

            <CardContent className="space-y-6 pb-10">
              {/* Info */}
              <div className="bg-muted/30 rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-3">Need help deciding?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  If you have questions about our services or need help choosing the right plan, 
                  our team is here to help. We offer free consultations to understand your needs 
                  and recommend the best solution.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={() => navigate('/pricing')}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Pricing
                </Button>
                <Button
                  onClick={() => navigate('/pricing')}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>

              <div className="text-center">
                <Button
                  onClick={() => navigate('/contact')}
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Talk to our team
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
}
