import React from 'react';
import { motion } from 'framer-motion';
import { Star, Download, ExternalLink, Globe, Bot } from 'lucide-react';
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
  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg mb-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Website Template Marketplace</h1>
        <p className="text-muted-foreground">
          Discover professional website templates and AI agents. Choose from our curated collection of premium designs.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            <Bot className="h-5 w-5 text-primary mr-2" />
            <span className="text-2xl font-bold">{totalAIAgents}</span>
          </div>
          <p className="text-sm text-muted-foreground">AI Agents</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <Star className="h-5 w-5 text-primary mr-2" />
            <span className="text-2xl font-bold">{totalUsage}</span>
          </div>
          <p className="text-sm text-muted-foreground">Usage</p>
        </motion.div>
      </div>
    </div>
  );
};