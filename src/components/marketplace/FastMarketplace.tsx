import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWebsites } from '@/hooks/queries/useWebsitesQuery';
import { useAIAgents } from '@/hooks/useAIAgents';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { VirtualizedGrid } from '@/components/ui/VirtualizedGrid';
import { usePrefetchMarketplace } from '@/hooks/queries/usePrefetchMarketplace';
import type { Website } from '@/types/website';
import type { AIAgent } from '@/types/aiAgent';

// Lazy load heavy components
const MarketplaceFilters = lazy(() => import('./MarketplaceFilters').then(m => ({ default: m.MarketplaceFilters })));
const AIAgentInfographicCard = lazy(() => import('@/components/ai-agents/AIAgentInfographicCard'));

interface FastMarketplaceProps {
  activeTab?: 'websites' | 'ai-agents';
  className?: string;
}

export const FastMarketplace: React.FC<FastMarketplaceProps> = ({
  activeTab = 'websites',
  className = ''
}) => {
  // Prefetch data on mount for instant loading
  usePrefetchMarketplace();

  // Use queries with aggressive caching
  const { data: websites = [], isLoading: isLoadingWebsites } = useWebsites({
    includeAll: false
  });

  const { data: aiAgents = [], isLoading: isLoadingAIAgents } = useAIAgents({
    includeAll: false,
    includeMine: true
  });

  // Check if data is from cache (instant load)
  const isFromCache = (activeTab === 'websites' ? websites : aiAgents).length > 0;
  const isLoading = activeTab === 'websites' ? isLoadingWebsites : isLoadingAIAgents;

  // If data is cached, show immediately with loading states
  const items: (Website | AIAgent)[] = activeTab === 'websites' ? websites : aiAgents;

  // Fast loading skeleton - shows immediately while data loads
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.02 }}
          className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="aspect-[16/10] bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
          <div className="p-6">
            <div className="h-6 bg-gray-700/50 rounded mb-3 animate-pulse" />
            <div className="h-4 bg-gray-700/30 rounded w-2/3 animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );

  // Optimized Website Card with lazy image loading
  const WebsiteCard = ({ template, index }: { template: Website; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.01 }}
      className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
      onClick={() => window.location.href = `/site/${template.slug || template.id}`}
    >
      <OptimizedImage
        src={template.thumbnail_url || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80'}
        alt={template.title}
        aspectRatio="16/10"
        priority={index < 4} // Load first 4 images immediately
        quality={75}
        className="group-hover:scale-110 transition-transform duration-500"
      />
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-purple-300 transition-colors">
          {template.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground capitalize">{template.category}</span>
          <span className="text-lg font-bold text-foreground">
            {Number(template.price) === 0 ? 'Free' : `$${template.price}`}
          </span>
        </div>
      </div>
    </motion.div>
  );

  // Optimized AI Agent Card
  const AIAgentCard = ({ agent, index }: { agent: AIAgent; index: number }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.01 }}
    >
      <Suspense fallback={
        <div className="h-80 bg-gray-800/50 rounded-2xl animate-pulse" />
      }>
        <AIAgentInfographicCard
          agent={agent}
          onUse={(agent) => console.log('Use agent:', agent)}
          onView={(agent) => console.log('View agent:', agent)}
        />
      </Suspense>
    </motion.div>
  );

  // Show loading skeleton while initial data loads
  if (isLoading && !isFromCache) {
    return <LoadingSkeleton />;
  }

  // If we have no data but are loading, show skeleton
  if (isLoading && items.length === 0) {
    return <LoadingSkeleton />;
  }

  // If we have cached data, show it immediately with smooth transitions
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className={className}
      >
        {items.length > 100 ? (
          // Use virtualization for large datasets
          <VirtualizedGrid
            items={items}
            itemHeight={400}
            containerHeight={800}
            overscan={10}
            renderItem={(item, index) =>
              activeTab === 'websites'
                ? <WebsiteCard template={item as Website} index={index} />
                : <AIAgentCard agent={item as AIAgent} index={index} />
            }
            keyExtractor={(item, index) => `${activeTab}-${item.id}-${index}`}
            columns={4}
          />
        ) : (
          // Standard grid for smaller datasets
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, index) =>
              activeTab === 'websites'
                ? <WebsiteCard template={item as Website} index={index} key={item.id} />
                : <AIAgentCard agent={item as AIAgent} index={index} key={item.id} />
            )}
          </div>
        )}

        {/* Show loading indicator while new data loads */}
        {isLoading && items.length > 0 && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500" />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
