
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Target, Users } from 'lucide-react';
import { Card } from "@/components/ui/card";

export const Features = () => {
  const features = [
    "24/7 Support & Maintenance",
    "SEO-Optimized Development",
    "Mobile-Responsive Design",
    "Fast Turnaround Times",
    "Modern Technology Stack",
    "Unlimited Revisions"
  ];

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Why Choose WebInHours?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              We combine speed, quality, and innovation to deliver exceptional web solutions 
              that drive your business forward.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center space-x-3 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-foreground group-hover:text-[#8B5CF6] transition-colors duration-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 border-border/40 bg-card/50 backdrop-blur hover:shadow-xl transition-all duration-500 group">
              <div className="space-y-6">
                {[
                  { icon: Clock, title: "Rapid Development", desc: "Projects completed in hours, not weeks" },
                  { icon: Target, title: "Precision Focused", desc: "Every detail crafted to perfection" },
                  { icon: Users, title: "Expert Team", desc: "Experienced developers and designers" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-[#8B5CF6]/10 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <item.icon className="h-8 w-8 text-[#8B5CF6] transition-transform duration-300 group-hover:rotate-6" />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
