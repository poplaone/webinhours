
import React from 'react';
import { AdminPanelHeader } from '@/components/admin/AdminPanelHeader';
import { AdminPanelTabs } from '@/components/admin/AdminPanelTabs';
import { AdminPanelModals } from '@/components/admin/AdminPanelModals';
import { useAdminPanel } from '@/hooks/useAdminPanel';

const AdminPanel = () => {
  const {
    // State
    searchTerm,
    selectedCategory,
    selectedStatus,
    showUploadDialog,
    showEditDialog,
    activeTab,
    reviewingWebsite,
    editingWebsite,
    isAdmin,
    allWebsites,
    userWebsites,
    allWebsitesLoading,
    pendingCount,
    approvedCount,
    featuredCount,
    
    // Setters
    setSearchTerm,
    setSelectedCategory,
    setSelectedStatus,
    setShowUploadDialog,
    setShowEditDialog,
    setActiveTab,
    setReviewingWebsite,
    setEditingWebsite,
    
    // Handlers
    handleWebsiteUpdate,
    handleQuickAction,
    handleDelete,
    handleEditWebsite,
    getStatusColor,
    formatPrice,
    
    // Refetch functions
    refetchAllWebsites,
    refetchUserWebsites,
  } = useAdminPanel();

  // Add refresh effect when tab changes or dialog closes
  React.useEffect(() => {
    if (activeTab === 'all-websites' || activeTab === 'review') {
      refetchAllWebsites();
    }
    if (activeTab === 'my-websites') {
      refetchUserWebsites();
    }
  }, [activeTab, refetchAllWebsites, refetchUserWebsites]);

  React.useEffect(() => {
    if (!showUploadDialog && !showEditDialog) {
      // Refresh data when dialogs close
      refetchAllWebsites();
      refetchUserWebsites();
    }
  }, [showUploadDialog, showEditDialog, refetchAllWebsites, refetchUserWebsites]);

  return (
    <main className="container mx-auto py-8 px-4 max-w-7xl">
      <AdminPanelHeader
        isAdmin={isAdmin}
        showUploadDialog={showUploadDialog}
        setShowUploadDialog={setShowUploadDialog}
      />

      <AdminPanelTabs
        isAdmin={isAdmin}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        allWebsites={allWebsites}
        userWebsites={userWebsites}
        allWebsitesLoading={allWebsitesLoading}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
        setSearchTerm={setSearchTerm}
        setSelectedCategory={setSelectedCategory}
        setSelectedStatus={setSelectedStatus}
        setReviewingWebsite={setReviewingWebsite}
        handleEditWebsite={handleEditWebsite}
        handleDelete={handleDelete}
        handleQuickAction={handleQuickAction}
        formatPrice={formatPrice}
        getStatusColor={getStatusColor}
        pendingCount={pendingCount}
        approvedCount={approvedCount}
        featuredCount={featuredCount}
      />

      <AdminPanelModals
        reviewingWebsite={reviewingWebsite}
        setReviewingWebsite={setReviewingWebsite}
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        editingWebsite={editingWebsite}
        setEditingWebsite={setEditingWebsite}
        handleWebsiteUpdate={handleWebsiteUpdate}
      />
    </main>
  );
};

export default AdminPanel;
