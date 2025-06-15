
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
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
          <Card className="p-12 border-border/40 bg-gradient-to-r from-[#8B5CF6]/10 to-[#A78BFA]/10 backdrop-blur hover:shadow-2xl transition-all duration-500 group">
            <CardContent className="p-0">
              <h2 className="text-4xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#8B5CF6] group-hover:to-[#A78BFA] group-hover:bg-clip-text transition-all duration-500">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto group-hover:text-foreground transition-colors duration-500">
                Transform your vision into reality with our rapid web development process. 
                Let's build something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-lg px-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#8B5CF6]/25 group"
                  onClick={() => navigate('/marketplace')}
                >
                  Start Your Project
                  <MessageSquare className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6] transition-all duration-300 hover:scale-105"
                >
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
