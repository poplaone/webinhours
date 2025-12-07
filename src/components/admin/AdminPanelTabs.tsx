import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminStats } from './AdminStats';
import { MyWebsitesTable } from './MyWebsitesTable';
import { LiveSupportTab } from './LiveSupportTab';
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
      <TabsList className={`grid w-full ${isAdmin ? 'grid-cols-3' : 'grid-cols-1'}`}>
        {isAdmin && <TabsTrigger value="my-websites">My Websites ({userWebsites.length})</TabsTrigger>}
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
          isAdmin={isAdmin}
        />
      </TabsContent>
    </Tabs>
  );
}
