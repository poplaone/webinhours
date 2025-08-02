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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8"
    >
      <h1 className="text-4xl font-bold text-foreground mb-4">
        Website Template Marketplace
      </h1>
      <p className="text-lg text-muted-foreground mb-6">
        Discover professional website templates and AI agents. Choose from our curated collection of premium designs.
      </p>
      
      <div className="flex justify-center gap-8 text-center">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          <div>
            <div className="text-2xl font-bold text-foreground">{totalWebsites}</div>
            <div className="text-sm text-muted-foreground">Templates</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          <div>
            <div className="text-2xl font-bold text-foreground">{totalDownloads}</div>
            <div className="text-sm text-muted-foreground">Downloads</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <div>
            <div className="text-2xl font-bold text-foreground">{totalAIAgents}</div>
            <div className="text-sm text-muted-foreground">AI Agents</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          <div>
            <div className="text-2xl font-bold text-foreground">{totalUsage}</div>
            <div className="text-sm text-muted-foreground">Usage</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};