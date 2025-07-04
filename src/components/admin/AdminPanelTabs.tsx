
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminStats } from './AdminStats';
import { AdminFilters } from './AdminFilters';
import { PendingReviewsTab } from './PendingReviewsTab';
import { WebsiteGrid } from './WebsiteGrid';
import { MyWebsitesTable } from './MyWebsitesTable';
import { AIAgentGrid } from './AIAgentGrid';
import { MyAIAgentsTable } from './MyAIAgentsTable';
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
      <TabsList className={`grid w-full ${isAdmin ? 'grid-cols-7' : 'grid-cols-1'}`}>
        {isAdmin && <TabsTrigger value="review">Website Reviews ({pendingCount})</TabsTrigger>}
        {isAdmin && <TabsTrigger value="ai-review">AI Agent Reviews ({aiAgentsPendingCount})</TabsTrigger>}
        {isAdmin && <TabsTrigger value="all-websites">All Websites ({allWebsites.length})</TabsTrigger>}
        {isAdmin && <TabsTrigger value="all-ai-agents">All AI Agents ({allAIAgents.length})</TabsTrigger>}
        {isAdmin && <TabsTrigger value="my-websites">My Websites ({userWebsites.length})</TabsTrigger>}
        {isAdmin && <TabsTrigger value="my-ai-agents">My AI Agents ({userAIAgents.length})</TabsTrigger>}
        <TabsTrigger value="analytics">{isAdmin ? 'Analytics' : 'Dashboard'}</TabsTrigger>
      </TabsList>

      {/* Website Review Tab */}
      {isAdmin && (
        <TabsContent value="review" className="space-y-6">
          <PendingReviewsTab
            websites={allWebsites}
            pendingCount={pendingCount}
            onReviewWebsite={setReviewingWebsite}
            onQuickAction={handleQuickAction}
            formatPrice={formatPrice}
          />
        </TabsContent>
      )}

      {/* AI Agent Review Tab */}
      {isAdmin && (
        <TabsContent value="ai-review" className="space-y-6">
          <AIAgentGrid
            agents={allAIAgents.filter(a => a.status === 'pending')}
            isLoading={allAIAgentsLoading}
            onReviewAgent={(agent) => setReviewingAgent?.(agent)}
            onEditAgent={handleEditAgent || (() => {})}
            onDeleteAgent={handleDeleteAgent || (() => {})}
            formatPrice={formatPrice}
            getStatusColor={getStatusColor}
          />
        </TabsContent>
      )}

      {/* All Websites Tab (Admin Only) */}
      {isAdmin && (
        <TabsContent value="all-websites" className="space-y-6">
          <AdminFilters
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            onStatusChange={setSelectedStatus}
          />

          <WebsiteGrid
            websites={allWebsites}
            isLoading={allWebsitesLoading}
            onReviewWebsite={setReviewingWebsite}
            onEditWebsite={handleEditWebsite}
            onDeleteWebsite={handleDelete}
            formatPrice={formatPrice}
            getStatusColor={getStatusColor}
          />
        </TabsContent>
      )}

      {/* All AI Agents Tab (Admin Only) */}
      {isAdmin && (
        <TabsContent value="all-ai-agents" className="space-y-6">
          <AdminFilters
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            onStatusChange={setSelectedStatus}
          />

          <AIAgentGrid
            agents={allAIAgents}
            isLoading={allAIAgentsLoading}
            onReviewAgent={(agent) => setReviewingAgent?.(agent)}
            onEditAgent={handleEditAgent || (() => {})}
            onDeleteAgent={handleDeleteAgent || (() => {})}
            formatPrice={formatPrice}
            getStatusColor={getStatusColor}
          />
        </TabsContent>
      )}

      {/* My Websites Tab (Admin Only) */}
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

      {/* My AI Agents Tab (Admin Only) */}
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
