
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight, Clock, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="p-12 border-border/40 bg-gradient-to-r from-[#8B5CF6]/10 to-[#A78BFA]/10 backdrop-blur hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/5 to-[#A78BFA]/5 opacity-50" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#A78BFA]/10 rounded-full blur-3xl translate-y-32 -translate-x-32" />
            
            <CardContent className="p-0 relative z-10">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Clock className="h-4 w-4 text-[#8B5CF6]" />
                <span className="text-sm font-medium text-[#8B5CF6]">Limited Time: 24-Hour Delivery</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#8B5CF6] group-hover:to-[#A78BFA] group-hover:bg-clip-text transition-all duration-500">
                Ready to Launch Your Success?
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto group-hover:text-foreground transition-colors duration-500 leading-relaxed">
                Join 500+ successful businesses who chose speed over waiting. Get a professional, 
                conversion-optimized website that works for you 24/7. No technical skills required.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">4.9/5 from 200+ reviews</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="font-medium">24-hour delivery guaranteed</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Free consultation included</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-lg px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#8B5CF6]/25 group/btn"
                  onClick={() => navigate('/marketplace')}
                >
                  Start Your Project Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-4 hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] transition-all duration-300 hover:scale-105 group/btn"
                  onClick={() => navigate('/contact')}
                >
                  <MessageSquare className="mr-2 h-5 w-5 transition-transform duration-300 group-hover/btn:rotate-12" />
                  Free Consultation
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mt-6">
                🎯 <strong>Special Offer:</strong> Book today and get free domain + hosting setup worth $200
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
