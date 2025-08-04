import React from 'react';
import { motion } from 'framer-motion';
export const ClientLogos = () => {
  const clients = [{
    name: 'TechCorp',
    logo: '/placeholder.svg',
    industry: 'Technology'
  }, {
    name: 'Legal Partners',
    logo: '/placeholder.svg',
    industry: 'Legal'
  }, {
    name: 'FitLife Gym',
    logo: '/placeholder.svg',
    industry: 'Fitness'
  }, {
    name: 'Green Energy Co',
    logo: '/placeholder.svg',
    industry: 'Energy'
  }, {
    name: 'Fashion Forward',
    logo: '/placeholder.svg',
    industry: 'Retail'
  }, {
    name: 'Med Solutions',
    logo: '/placeholder.svg',
    industry: 'Healthcare'
  }, {
    name: 'EduTech Pro',
    logo: '/placeholder.svg',
    industry: 'Education'
  }, {
    name: 'Finance Plus',
    logo: '/placeholder.svg',
    industry: 'Finance'
  }];
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of successful businesses who chose us for their digital transformation
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-center p-4 bg-background/50 rounded-lg backdrop-blur-sm border"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-2 mx-auto">
                  <span className="text-xs font-medium">{client.name.substring(0, 2)}</span>
                </div>
                <p className="text-xs font-medium">{client.name}</p>
                <p className="text-xs text-muted-foreground">{client.industry}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};