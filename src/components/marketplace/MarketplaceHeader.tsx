
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Download, ExternalLink } from 'lucide-react';

interface MarketplaceHeaderProps {
  totalWebsites: number;
  totalDownloads: number;
}

export const MarketplaceHeader = ({ totalWebsites, totalDownloads }: MarketplaceHeaderProps) => {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Website Template <span className="text-[#8B5CF6]">Marketplace</span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
        Choose from our collection of professionally designed templates. Each comes with 24-hour delivery, 
        hosting setup, and mobile optimization included.
      </p>
      
      {/* Trust badges */}
      <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span>4.8/5 Average Rating</span>
        </div>
        <div className="flex items-center gap-1">
          <Download className="h-4 w-4 text-green-500" />
          <span>{totalDownloads}+ Happy Customers</span>
        </div>
        <div className="flex items-center gap-1">
          <ExternalLink className="h-4 w-4 text-blue-500" />
          <span>24hr Delivery Guaranteed</span>
        </div>
      </div>
    </motion.div>
  );
};
