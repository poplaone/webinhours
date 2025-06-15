
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Settings,
} from 'lucide-react';
import { useWebsites, useUserWebsites, useUpdateWebsite, useDeleteWebsite, useIsAdmin } from '@/hooks/useWebsites';
import { useAuth } from '@/hooks/useAuth';
import { WebsiteUploadForm } from '@/components/admin/WebsiteUploadForm';
import { WebsiteEditForm } from '@/components/admin/WebsiteEditForm';
import { WebsiteReviewModal } from '@/components/admin/WebsiteReviewModal';
import { AdminStats } from '@/components/admin/AdminStats';
import { AdminFilters } from '@/components/admin/AdminFilters';
import { PendingReviewsTab } from '@/components/admin/PendingReviewsTab';
import { WebsiteGrid } from '@/components/admin/WebsiteGrid';
import { MyWebsitesTable } from '@/components/admin/MyWebsitesTable';
import { useToast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const { user } = useAuth();
  const isAdmin = useIsAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(isAdmin ? 'review' : 'my-websites');
  const [reviewingWebsite, setReviewingWebsite] = useState(null);
  const [editingWebsite, setEditingWebsite] = useState(null);

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

  const handleWebsiteUpdate = async (websiteId: string, updates: any) => {
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
      toast({
        title: "Error",
        description: "Failed to update website",
        variant: "destructive",
      });
    }
  };

  const handleQuickAction = async (websiteId: string, action: string) => {
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
        toast({
          title: "Error",
          description: "Failed to delete website",
          variant: "destructive",
        });
      }
    }
  };

  const handleEditWebsite = (website: any) => {
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

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8" />
            {isAdmin ? 'Admin Panel' : 'My Dashboard'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isAdmin ? 'Manage website templates and marketplace' : 'Manage your uploaded websites'}
          </p>
        </div>
        
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogTrigger asChild>
            <Button className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90">
              <Plus className="mr-2 h-4 w-4" />
              Upload Website
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <WebsiteUploadForm onClose={() => setShowUploadDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className={`grid w-full ${isAdmin ? 'grid-cols-4' : 'grid-cols-3'}`}>
          {isAdmin && <TabsTrigger value="review">Review Submissions ({pendingCount})</TabsTrigger>}
          {isAdmin && <TabsTrigger value="all-websites">All Websites ({allWebsites.length})</TabsTrigger>}
          <TabsTrigger value="my-websites">My Websites ({userWebsites.length})</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
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

        {/* My Websites Tab */}
        <TabsContent value="my-websites" className="space-y-6">
          <MyWebsitesTable
            websites={userWebsites}
            onEditWebsite={handleEditWebsite}
            onDeleteWebsite={handleDelete}
            formatPrice={formatPrice}
            getStatusColor={getStatusColor}
          />
        </TabsContent>

        {/* Analytics Tab */}
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

      {/* Review Modal */}
      <WebsiteReviewModal
        website={reviewingWebsite}
        isOpen={!!reviewingWebsite}
        onClose={() => setReviewingWebsite(null)}
        onUpdate={handleWebsiteUpdate}
      />

      {/* Edit Modal */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {editingWebsite && (
            <WebsiteEditForm
              website={editingWebsite}
              onClose={() => {
                setShowEditDialog(false);
                setEditingWebsite(null);
              }}
              onUpdate={handleWebsiteUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
