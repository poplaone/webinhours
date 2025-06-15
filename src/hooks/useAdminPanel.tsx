
import { useState } from 'react';
import { useWebsites, useUserWebsites, useUpdateWebsite, useDeleteWebsite, useIsAdmin } from '@/hooks/useWebsites';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Website } from '@/types/website';

export const useAdminPanel = () => {
  const { user } = useAuth();
  const isAdmin = useIsAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(isAdmin ? 'review' : 'my-websites');
  const [reviewingWebsite, setReviewingWebsite] = useState<Website | null>(null);
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null);

  const { toast } = useToast();
  const updateWebsite = useUpdateWebsite();
  const deleteWebsite = useDeleteWebsite();

  // Admin filters - include all websites for review
  const adminFilters = {
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    search: searchTerm || undefined,
    status: selectedStatus !== 'all' ? selectedStatus : undefined,
    includeAll: true, // Always show all websites in admin panel
  };

  const { data: allWebsites = [], isLoading: allWebsitesLoading, refetch: refetchAllWebsites } = useWebsites(adminFilters);
  const { data: userWebsites = [], isLoading: userLoading, refetch: refetchUserWebsites } = useUserWebsites();

  const handleWebsiteUpdate = async (websiteId: string, updates: any) => {
    console.log('handleWebsiteUpdate called with:', websiteId, updates);
    try {
      await updateWebsite.mutateAsync({
        id: websiteId,
        updates
      });
      
      toast({
        title: "Success",
        description: "Website updated successfully",
      });
      
      // Refresh data after update
      refetchAllWebsites();
      refetchUserWebsites();
    } catch (error) {
      console.error('Error in handleWebsiteUpdate:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update website",
        variant: "destructive",
      });
    }
  };

  const handleQuickAction = async (websiteId: string, action: string) => {
    console.log('handleQuickAction called with:', websiteId, action);
    const updates: any = { status: action };
    
    if (action === 'approved') {
      updates.approved_at = new Date().toISOString();
    } else if (action === 'featured') {
      updates.status = 'featured';
      updates.is_featured = true;
      updates.featured_at = new Date().toISOString();
      updates.approved_at = new Date().toISOString();
    }

    await handleWebsiteUpdate(websiteId, updates);
  };

  const handleDelete = async (websiteId: string) => {
    if (window.confirm('Are you sure you want to delete this website?')) {
      try {
        await deleteWebsite.mutateAsync(websiteId);
        toast({
          title: "Success",
          description: "Website deleted successfully",
        });
        
        // Refresh data after delete
        refetchAllWebsites();
        refetchUserWebsites();
      } catch (error) {
        console.error('Error in handleDelete:', error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to delete website",
          variant: "destructive",
        });
      }
    }
  };

  const handleEditWebsite = (website: Website) => {
    console.log('handleEditWebsite called with:', website);
    setEditingWebsite(website);
    setShowEditDialog(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'featured': return 'bg-purple-100 text-purple-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
  };

  const pendingCount = allWebsites.filter(w => w.status === 'pending').length;
  const approvedCount = allWebsites.filter(w => w.status === 'approved').length;
  const featuredCount = allWebsites.filter(w => w.status === 'featured').length;

  return {
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
  };
};
