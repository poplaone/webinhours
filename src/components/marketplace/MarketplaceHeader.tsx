import React from 'react';
import { motion } from 'framer-motion';
import { Star, Download, ExternalLink } from 'lucide-react';
interface MarketplaceHeaderProps {
  totalWebsites: number;
  totalDownloads: number;
  totalAIAgents?: number;
  totalUsage?: number;
  activeTab?: 'all' | 'websites' | 'ai-agents';
}
export const MarketplaceHeader = ({
  totalWebsites,
  totalDownloads,
  totalAIAgents = 0,
  totalUsage = 0,
  activeTab = 'all'
}: MarketplaceHeaderProps) => {
  return <motion.div className="text-center mb-12" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.8
  }}>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        {/* Title removed as requested */}
      </h1>
      
      
      {/* Trust badges */}
      {/* Trust badges removed as requested. Content now aligns from top. */}
    </motion.div>;
};