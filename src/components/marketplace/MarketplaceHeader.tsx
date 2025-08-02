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
  return;
};