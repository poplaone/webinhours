import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight, Clock, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
export const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">Rated 4.9/5 by 500+ clients</span>
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your
            <span className="text-primary"> Digital Presence?</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the ranks of successful businesses who chose speed, quality, and reliability. 
            Get your professional website delivered in 24 hours.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Card className="p-6 border-primary/20">
              <CardContent className="p-0">
                <MessageSquare className="w-8 h-8 text-primary mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Free Consultation</h3>
                <p className="text-sm text-muted-foreground">
                  Discuss your vision with our experts
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 border-primary/20">
              <CardContent className="p-0">
                <Clock className="w-8 h-8 text-primary mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">24-Hour Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Your website ready in just one day
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 border-primary/20">
              <CardContent className="p-0">
                <Star className="w-8 h-8 text-primary mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">100% Satisfaction</h3>
                <p className="text-sm text-muted-foreground">
                  Money-back guarantee included
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="group"
            >
              Start Your Project Today
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/contact')}
            >
              <MessageSquare className="mr-2 w-4 h-4" />
              Talk to an Expert
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};