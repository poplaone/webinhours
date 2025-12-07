import React from 'react';
import { motion } from 'framer-motion';
import { Star, Download, Globe } from 'lucide-react';

interface MarketplaceHeaderProps {
  totalWebsites: number;
  totalDownloads: number;
}

export const MarketplaceHeader = ({
  totalWebsites,
  totalDownloads,
}: MarketplaceHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg mb-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Choose Your Free Website Design</h1>
        <p className="text-muted-foreground">
          Browse 500+ professional website designs—completely free. Find the perfect design for your business. Premium services available when you need them.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <Globe className="h-5 w-5 text-primary mr-2" />
            <span className="text-2xl font-bold">{totalWebsites}</span>
          </div>
          <p className="text-sm text-muted-foreground">Templates</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <Download className="h-5 w-5 text-primary mr-2" />
            <span className="text-2xl font-bold">{totalDownloads}</span>
          </div>
          <p className="text-sm text-muted-foreground">Downloads</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <Star className="h-5 w-5 text-primary mr-2" />
            <span className="text-2xl font-bold">4.9</span>
          </div>
          <p className="text-sm text-muted-foreground">Rating</p>
        </motion.div>
      </div>
    </div>
  );
};
