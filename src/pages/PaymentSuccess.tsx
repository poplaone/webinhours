import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import SEOHead from '@/components/seo/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Mail, ArrowRight, Home, ArrowLeft, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const sessionId = searchParams.get('session_id');
  const productId = searchParams.get('product_id');

  useEffect(() => {
    // Track successful payment
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase', {
        transaction_id: sessionId,
        value: productId?.includes('Lite') ? 299 : 599,
        currency: 'USD',
      });
    }
  }, [sessionId, productId]);

  const handleDownloadInvoice = () => {
    // Generate invoice content
    const invoiceDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const productName = productId?.includes('Lite') ? 'Custom Lite Plan' : 'Custom Pro Plan';
    const amount = productId?.includes('Lite') ? '$299.00' : '$599.00';
    
    const invoiceContent = `
================================================================================
                                  INVOICE
================================================================================

                              WebInHour
                     Professional Website Solutions
                        https://webinhour.com

--------------------------------------------------------------------------------

Invoice Date: ${invoiceDate}
Order Reference: ${sessionId || 'N/A'}

--------------------------------------------------------------------------------

BILL TO:
Customer (Details will be sent via email)

--------------------------------------------------------------------------------

ITEM DESCRIPTION                                              AMOUNT
--------------------------------------------------------------------------------
${productName.padEnd(55)}${amount}

--------------------------------------------------------------------------------
                                                    SUBTOTAL: ${amount}
                                                        TAX:  $0.00
                                                    ─────────────────
                                                       TOTAL: ${amount}
--------------------------------------------------------------------------------

PAYMENT STATUS: PAID ✓

--------------------------------------------------------------------------------

Thank you for choosing WebInHour!

For any questions regarding this invoice, please contact:
Email: team@webinhour.com
Website: https://webinhour.com/contact

================================================================================
`;

    // Create and download the file
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `WebInHour-Invoice-${sessionId || 'order'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast.success('Invoice downloaded successfully!');
  };

  return (
    <AppLayout>
      <SEOHead
        title="Payment Successful - WebInHour"
        description="Thank you for your purchase. Your order has been confirmed."
        canonicalUrl="https://webinhour.com/payment/success"
      />

      <div className="pt-24 pb-20 px-4 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>

          <Card className="bg-card/50 backdrop-blur-md border-border/50 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 to-emerald-500" />
            
            <CardHeader className="text-center pt-12 pb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-6"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
              </motion.div>
              
              <CardTitle className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Payment Successful!
              </CardTitle>
              <p className="text-muted-foreground text-lg">
                Thank you for your purchase. Your order has been confirmed.
              </p>
            </CardHeader>

            <CardContent className="space-y-6 pb-10">
              {/* Order Details */}
              <div className="bg-muted/30 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-foreground">What happens next?</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Confirmation Email</p>
                      <p className="text-sm text-muted-foreground">
                        You'll receive an email with your order details and next steps.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Download className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Project Kickoff</p>
                      <p className="text-sm text-muted-foreground">
                        Our team will reach out within an hour to begin your project.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Delivery Timeline</p>
                      <p className="text-sm text-muted-foreground">
                        Custom Lite: 2-24 hours | Custom Pro: 3-5 business days
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {sessionId && (
                <div className="text-center text-sm text-muted-foreground">
                  <p>Order Reference: <span className="font-mono">{sessionId}</span></p>
                </div>
              )}

              {/* Download Invoice */}
              <div className="flex justify-center">
                <Button
                  onClick={handleDownloadInvoice}
                  variant="secondary"
                  className="gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Download Invoice
                </Button>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="flex-1"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Return to Homepage
                </Button>
                <Button
                  onClick={() => navigate('/contact')}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
}
