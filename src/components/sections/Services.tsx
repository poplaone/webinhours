
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Globe, Zap } from 'lucide-react';
import AnimatedServiceCard from '@/components/animations/AnimatedServiceCard';

export const Services = () => {
  const services = [
    {
      icon: Globe,
      title: "Custom Web Development",
      description: "Tailored websites built with modern technologies to meet your unique business needs.",
      activeColor: "#8B5CF6",
      colors: ["#8B5CF6", "#A78BFA", "#DDD6FE"]
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Responsive designs that look perfect on all devices and provide exceptional user experiences.",
      activeColor: "#0EA5E9",
      colors: ["#E0F2FE", "#7DD3FC", "#0EA5E9"]
    },
    {
      icon: Code,
      title: "Full-Stack Solutions",
      description: "Complete web applications with robust backends and intuitive frontends.",
      activeColor: "#EAB308",
      colors: ["#FEF08A", "#FDE047", "#EAB308"]
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Lightning-fast websites optimized for speed, SEO, and user engagement.",
      activeColor: "#E11D48",
      colors: ["#FECDD3", "#FDA4AF", "#E11D48"]
    }
  ];

  return (
    <section id="services" className="py-20 px-4 bg-card/30 backdrop-blur relative z-10">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive web development solutions tailored to your business needs
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AnimatedServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
                activeColor={service.activeColor}
                colors={service.colors}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
