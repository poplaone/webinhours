
import React from 'react';
import { motion } from 'framer-motion';

export const ClientLogos = () => {
  const clients = [
    { name: 'TechCorp', logo: '/placeholder.svg', industry: 'Technology' },
    { name: 'Legal Partners', logo: '/placeholder.svg', industry: 'Legal' },
    { name: 'FitLife Gym', logo: '/placeholder.svg', industry: 'Fitness' },
    { name: 'Green Energy Co', logo: '/placeholder.svg', industry: 'Energy' },
    { name: 'Fashion Forward', logo: '/placeholder.svg', industry: 'Retail' },
    { name: 'Med Solutions', logo: '/placeholder.svg', industry: 'Healthcare' },
    { name: 'EduTech Pro', logo: '/placeholder.svg', industry: 'Education' },
    { name: 'Finance Plus', logo: '/placeholder.svg', industry: 'Finance' }
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Trusted by 500+ Growing Businesses</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From startups to enterprises across all industries, businesses trust us to deliver 
            exceptional web solutions that drive real results.
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div 
            className="flex gap-8 items-center"
            animate={{ x: [0, -100 * clients.length] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {[...clients, ...clients].map((client, index) => (
              <motion.div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 w-32 h-16 bg-background rounded-lg border border-border/40 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                whileHover={{ scale: 1.1, filter: 'grayscale(0%)' }}
              >
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="max-w-20 max-h-10 object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Industry Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'E-commerce', count: '150+', icon: '🛒' },
            { label: 'Professional Services', count: '200+', icon: '💼' },
            { label: 'Healthcare', count: '75+', icon: '🏥' },
            { label: 'Technology', count: '100+', icon: '💻' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 bg-background/50 rounded-lg border border-border/40"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-xl font-bold text-[#8B5CF6]">{stat.count}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
