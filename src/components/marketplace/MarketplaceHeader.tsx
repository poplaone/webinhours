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
      className="text-center mb-12" 
      initial={{
        opacity: 0,
        y: 20
      }} 
      animate={{
        opacity: 1,
        y: 0
      }} 
      transition={{
        duration: 0.8
      }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Website Template Marketplace
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
        Discover professional website templates and AI agents. Choose from our curated collection of premium designs.
      </p>
      
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card/50 backdrop-blur rounded-lg p-4 border border-border/40">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Globe className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold">{totalWebsites}</span>
          </div>
          <p className="text-sm text-muted-foreground">Templates</p>
        </div>
        
        <div className="bg-card/50 backdrop-blur rounded-lg p-4 border border-border/40">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Download className="h-5 w-5 text-green-500" />
            <span className="text-2xl font-bold">{totalDownloads}</span>
          </div>
          <p className="text-sm text-muted-foreground">Downloads</p>
        </div>
        
        <div className="bg-card/50 backdrop-blur rounded-lg p-4 border border-border/40">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Bot className="h-5 w-5 text-blue-500" />
            <span className="text-2xl font-bold">{totalAIAgents}</span>
          </div>
          <p className="text-sm text-muted-foreground">AI Agents</p>
        </div>
        
        <div className="bg-card/50 backdrop-blur rounded-lg p-4 border border-border/40">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="text-2xl font-bold">{totalUsage}</span>
          </div>
          <p className="text-sm text-muted-foreground">Usage</p>
        </div>
      </div>
    </motion.div>
  );
};