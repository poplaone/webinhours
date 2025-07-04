
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
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        {activeTab === 'websites' ? 'Website Template' : 
         activeTab === 'ai-agents' ? 'AI Agent' : 
         'Digital'} <span className="text-[#8B5CF6]">Marketplace</span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
        {activeTab === 'websites' ? 'Choose from our collection of professionally designed templates. Each comes with 24-hour delivery, hosting setup, and mobile optimization included.' :
         activeTab === 'ai-agents' ? 'Explore powerful AI agents to automate your business processes. Ready to deploy with documentation and support included.' :
         'Choose from our collection of website templates and AI agents. Each comes with 24-hour delivery and full support included.'}
      </p>
      
      {/* Trust badges */}
      <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span>4.8/5 Average Rating</span>
        </div>
        {(activeTab === 'all' || activeTab === 'websites') && (
          <div className="flex items-center gap-1">
            <Download className="h-4 w-4 text-green-500" />
            <span>{totalDownloads}+ Downloads</span>
          </div>
        )}
        {(activeTab === 'all' || activeTab === 'ai-agents') && totalAIAgents > 0 && (
          <div className="flex items-center gap-1">
            <Download className="h-4 w-4 text-purple-500" />
            <span>{totalUsage}+ AI Interactions</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <ExternalLink className="h-4 w-4 text-blue-500" />
          <span>24hr Delivery Guaranteed</span>
        </div>
      </div>
    </motion.div>
  );
};
