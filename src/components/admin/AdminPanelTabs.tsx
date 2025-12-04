import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminStats } from './AdminStats';
import { MyWebsitesTable } from './MyWebsitesTable';
import { MyAIAgentsTable } from './MyAIAgentsTable';
import { LiveSupportTab } from './LiveSupportTab';
import { Website } from '@/hooks/useWebsites';
import { AIAgent } from '@/types/aiAgent';

interface AdminPanelTabsProps {
  isAdmin: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  allWebsites: Website[];
  userWebsites: Website[];
  allWebsitesLoading: boolean;
  allAIAgents?: AIAgent[];
  userAIAgents?: AIAgent[];
  allAIAgentsLoading?: boolean;
  searchTerm: string;
  selectedCategory: string;
  selectedStatus: string;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedStatus: (status: string) => void;
  setReviewingWebsite: (website: Website | null) => void;
  setReviewingAgent?: (agent: AIAgent | null) => void;
  handleEditWebsite: (website: Website) => void;
  handleEditAgent?: (agent: AIAgent) => void;
  handleDelete: (websiteId: string) => void;
  handleDeleteAgent?: (agentId: string) => void;
  handleQuickAction: (websiteId: string, action: string) => void;
  handleQuickActionAgent?: (agentId: string, action: string) => void;
  formatPrice: (price: number) => string;
  getStatusColor: (status: string) => string;
  pendingCount: number;
  approvedCount: number;
  featuredCount: number;
  aiAgentsPendingCount?: number;
  aiAgentsApprovedCount?: number;
  aiAgentsFeaturedCount?: number;
}

export function AdminPanelTabs({
  isAdmin,
  activeTab,
  setActiveTab,
  allWebsites,
  userWebsites,
  allWebsitesLoading,
  allAIAgents = [],
  userAIAgents = [],
  allAIAgentsLoading = false,
  searchTerm,
  selectedCategory,
  selectedStatus,
  setSearchTerm,
  setSelectedCategory,
  setSelectedStatus,
  setReviewingWebsite,
  setReviewingAgent,
  handleEditWebsite,
  handleEditAgent,
  handleDelete,
  handleDeleteAgent,
  handleQuickAction,
  handleQuickActionAgent,
  formatPrice,
  getStatusColor,
  pendingCount,
  approvedCount,
  featuredCount,
  aiAgentsPendingCount = 0,
  aiAgentsApprovedCount = 0,
  aiAgentsFeaturedCount = 0
}: AdminPanelTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className={`grid w-full ${isAdmin ? 'grid-cols-4' : 'grid-cols-1'}`}>
        {isAdmin && <TabsTrigger value="my-websites">My Websites ({userWebsites.length})</TabsTrigger>}
        {isAdmin && <TabsTrigger value="my-ai-agents">My AI Agents ({userAIAgents.length})</TabsTrigger>}
        {isAdmin && <TabsTrigger value="live-support">Live Support</TabsTrigger>}
        <TabsTrigger value="analytics">{isAdmin ? 'Analytics' : 'Dashboard'}</TabsTrigger>
      </TabsList>

      {/* My Websites Tab */}
      {isAdmin && (
        <TabsContent value="my-websites" className="space-y-6">
          <MyWebsitesTable
            websites={userWebsites}
            onEditWebsite={handleEditWebsite}
            onDeleteWebsite={handleDelete}
            formatPrice={formatPrice}
            getStatusColor={getStatusColor}
          />
        </TabsContent>
      )}

      {/* My AI Agents Tab */}
      {isAdmin && (
        <TabsContent value="my-ai-agents" className="space-y-6">
          <MyAIAgentsTable
            agents={userAIAgents}
            onEditAgent={handleEditAgent || (() => {})}
            onDeleteAgent={handleDeleteAgent || (() => {})}
            formatPrice={formatPrice}
            getStatusColor={getStatusColor}
          />
        </TabsContent>
      )}

      {/* Live Support Tab */}
      {isAdmin && (
        <TabsContent value="live-support" className="space-y-6">
          <LiveSupportTab />
        </TabsContent>
      )}

      {/* Analytics/Dashboard Tab */}
      <TabsContent value="analytics" className="space-y-6">
        <AdminStats
          pendingCount={pendingCount}
          approvedCount={approvedCount}
          featuredCount={featuredCount}
          userWebsitesCount={userWebsites.length}
          aiAgentsPendingCount={aiAgentsPendingCount}
          aiAgentsApprovedCount={aiAgentsApprovedCount}
          aiAgentsFeaturedCount={aiAgentsFeaturedCount}
          userAIAgentsCount={userAIAgents.length}
          isAdmin={isAdmin}
        />
      </TabsContent>
    </Tabs>
  );
}