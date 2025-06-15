
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminStats } from './AdminStats';
import { AdminFilters } from './AdminFilters';
import { PendingReviewsTab } from './PendingReviewsTab';
import { WebsiteGrid } from './WebsiteGrid';
import { MyWebsitesTable } from './MyWebsitesTable';
import { Website } from '@/hooks/useWebsites';

interface AdminPanelTabsProps {
  isAdmin: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  allWebsites: Website[];
  userWebsites: Website[];
  allWebsitesLoading: boolean;
  searchTerm: string;
  selectedCategory: string;
  selectedStatus: string;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedStatus: (status: string) => void;
  setReviewingWebsite: (website: Website | null) => void;
  handleEditWebsite: (website: Website) => void;
  handleDelete: (websiteId: string) => void;
  handleQuickAction: (websiteId: string, action: string) => void;
  formatPrice: (price: number) => string;
  getStatusColor: (status: string) => string;
  pendingCount: number;
  approvedCount: number;
  featuredCount: number;
}

export function AdminPanelTabs({
  isAdmin,
  activeTab,
  setActiveTab,
  allWebsites,
  userWebsites,
  allWebsitesLoading,
  searchTerm,
  selectedCategory,
  selectedStatus,
  setSearchTerm,
  setSelectedCategory,
  setSelectedStatus,
  setReviewingWebsite,
  handleEditWebsite,
  handleDelete,
  handleQuickAction,
  formatPrice,
  getStatusColor,
  pendingCount,
  approvedCount,
  featuredCount
}: AdminPanelTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className={`grid w-full ${isAdmin ? 'grid-cols-4' : 'grid-cols-1'}`}>
        {isAdmin && <TabsTrigger value="review">Review Submissions ({pendingCount})</TabsTrigger>}
        {isAdmin && <TabsTrigger value="all-websites">All Websites ({allWebsites.length})</TabsTrigger>}
        {isAdmin && <TabsTrigger value="my-websites">My Websites ({userWebsites.length})</TabsTrigger>}
        <TabsTrigger value="analytics">{isAdmin ? 'Analytics' : 'Dashboard'}</TabsTrigger>
      </TabsList>

      {/* Admin Review Tab */}
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

      {/* Analytics/Dashboard Tab */}
      <TabsContent value="analytics" className="space-y-6">
        <AdminStats
          pendingCount={pendingCount}
          approvedCount={approvedCount}
          featuredCount={featuredCount}
          userWebsitesCount={userWebsites.length}
          isAdmin={isAdmin}
        />
      </TabsContent>
    </Tabs>
  );
}
