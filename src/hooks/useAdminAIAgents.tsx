import { useState } from 'react';
import { useAIAgents, useUserAIAgents, useUpdateAIAgent, useDeleteAIAgent } from '@/hooks/useAIAgents';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { AIAgent } from '@/types/aiAgent';
import { useIsAdmin } from '@/hooks/useWebsites';

export const useAdminAIAgents = () => {
  const { user } = useAuth();
  const isAdmin = useIsAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAgentType, setSelectedAgentType] = useState('all');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [reviewingAgent, setReviewingAgent] = useState<AIAgent | null>(null);
  const [editingAgent, setEditingAgent] = useState<AIAgent | null>(null);

  const { toast } = useToast();
  const updateAIAgent = useUpdateAIAgent();
  const deleteAIAgent = useDeleteAIAgent();

  // Admin filters - include all AI agents for review
  const adminFilters = {
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    search: searchTerm || undefined,
    status: selectedStatus !== 'all' ? selectedStatus : undefined,
    agent_type: selectedAgentType !== 'all' ? selectedAgentType : undefined,
    includeAll: true, // Always show all AI agents in admin panel
  };

  const { data: allAIAgents = [], isLoading: allAIAgentsLoading, refetch: refetchAllAIAgents } = useAIAgents(adminFilters);
  const { data: userAIAgents = [], isLoading: userLoading, refetch: refetchUserAIAgents } = useUserAIAgents();

  const handleAIAgentUpdate = async (agentId: string, updates: any) => {
    console.log('handleAIAgentUpdate called with:', agentId, updates);
    try {
      await updateAIAgent.mutateAsync({
        id: agentId,
        updates
      });
      
      toast({
        title: "Success",
        description: "AI Agent updated successfully",
      });
      
      // Refresh data after update
      refetchAllAIAgents();
      refetchUserAIAgents();
    } catch (error) {
      console.error('Error in handleAIAgentUpdate:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update AI agent",
        variant: "destructive",
      });
    }
  };

  const handleQuickAction = async (agentId: string, action: string) => {
    console.log('handleQuickAction called with:', agentId, action);
    const updates: any = { status: action };
    
    if (action === 'approved') {
      updates.approved_at = new Date().toISOString();
    } else if (action === 'featured') {
      updates.status = 'featured';
      updates.is_featured = true;
      updates.featured_at = new Date().toISOString();
      updates.approved_at = new Date().toISOString();
    }

    await handleAIAgentUpdate(agentId, updates);
  };

  const handleDelete = async (agentId: string) => {
    if (window.confirm('Are you sure you want to delete this AI agent?')) {
      try {
        await deleteAIAgent.mutateAsync(agentId);
        toast({
          title: "Success",
          description: "AI Agent deleted successfully",
        });
        
        // Refresh data after delete
        refetchAllAIAgents();
        refetchUserAIAgents();
      } catch (error) {
        console.error('Error in handleDelete:', error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to delete AI agent",
          variant: "destructive",
        });
      }
    }
  };

  const handleEditAIAgent = (agent: AIAgent) => {
    console.log('handleEditAIAgent called with:', agent);
    setEditingAgent(agent);
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

  const pendingCount = allAIAgents.filter(a => a.status === 'pending').length;
  const approvedCount = allAIAgents.filter(a => a.status === 'approved').length;
  const featuredCount = allAIAgents.filter(a => a.status === 'featured').length;

  return {
    // State
    searchTerm,
    selectedCategory,
    selectedStatus,
    selectedAgentType,
    showUploadDialog,
    showEditDialog,
    reviewingAgent,
    editingAgent,
    isAdmin,
    allAIAgents,
    userAIAgents,
    allAIAgentsLoading,
    pendingCount,
    approvedCount,
    featuredCount,
    
    // Setters
    setSearchTerm,
    setSelectedCategory,
    setSelectedStatus,
    setSelectedAgentType,
    setShowUploadDialog,
    setShowEditDialog,
    setReviewingAgent,
    setEditingAgent,
    
    // Handlers
    handleAIAgentUpdate,
    handleQuickAction,
    handleDelete,
    handleEditAIAgent,
    getStatusColor,
    formatPrice,
    
    // Refetch functions
    refetchAllAIAgents,
    refetchUserAIAgents,
  };
};