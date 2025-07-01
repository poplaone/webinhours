
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const MarketplaceCTA = () => {
  return (
    <motion.div
      className="text-center mt-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Card className="p-8 border-[#8B5CF6]/20 bg-gradient-to-br from-[#8B5CF6]/5 to-[#A78BFA]/5">
        <CardContent className="p-0">
          <h3 className="text-2xl font-bold mb-4">Don't See What You Need?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our team can create a completely custom website tailored to your specific requirements. 
            Get a personalized quote and timeline for your unique project.
          </p>
          <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
            Request Custom Design
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
