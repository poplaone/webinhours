import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash, 
  Star, 
  DollarSign,
  Calendar,
  Users,
  TrendingUp,
  Settings,
  Upload,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { useWebsites, useUserWebsites, useUpdateWebsite, useDeleteWebsite, useIsAdmin } from '@/hooks/useWebsites';
import { useAuth } from '@/hooks/useAuth';
import { WebsiteUploadForm } from '@/components/admin/WebsiteUploadForm';
import { WebsiteReviewModal } from '@/components/admin/WebsiteReviewModal';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'E-commerce', label: 'E-Commerce' },
  { value: 'Corporate', label: 'Corporate' },
  { value: 'SaaS', label: 'SaaS' },
  { value: 'Portfolio', label: 'Portfolio' },
  { value: 'Restaurant', label: 'Restaurant' },
  { value: 'Real Estate', label: 'Real Estate' },
  { value: 'Landing Page', label: 'Landing Page' },
  { value: 'Blog', label: 'Blog' },
  { value: 'Creative', label: 'Creative' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Education', label: 'Education' },
  { value: 'Non-Profit', label: 'Non-Profit' },
  { value: 'Other', label: 'Other' },
];

const AdminPanel = () => {
  const { user } = useAuth();
  const isAdmin = useIsAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(isAdmin ? 'review' : 'my-websites');
  const [reviewingWebsite, setReviewingWebsite] = useState(null);

  const { toast } = useToast();
  const updateWebsite = useUpdateWebsite();
  const deleteWebsite = useDeleteWebsite();

  // Admin filters - include all websites for review
  const adminFilters = {
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    search: searchTerm || undefined,
    status: selectedStatus !== 'all' ? selectedStatus : undefined,
    includeAll: isAdmin, // Admin sees all websites
  };

  const { data: allWebsites = [], isLoading: allWebsitesLoading } = useWebsites(adminFilters);
  const { data: userWebsites = [], isLoading: userLoading } = useUserWebsites();

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
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete website",
          variant: "destructive",
        });
      }
    }
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
          {isAdmin && <TabsTrigger value="all-websites">All Websites</TabsTrigger>}
          <TabsTrigger value="my-websites">My Websites</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Admin Review Tab */}
        {isAdmin && (
          <TabsContent value="review" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Pending Reviews ({pendingCount})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allWebsites.filter(w => w.status === 'pending').map((website) => (
                    <div key={website.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          {website.thumbnail_url && (
                            <img 
                              src={website.thumbnail_url} 
                              alt={website.title}
                              className="w-20 h-20 object-cover rounded"
                            />
                          )}
                          <div>
                            <h3 className="font-semibold">{website.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{website.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline">{website.category}</Badge>
                              <span className="text-green-600 font-medium">{formatPrice(website.price)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setReviewingWebsite(website)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleQuickAction(website.id, 'approved')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-purple-600 hover:bg-purple-700"
                            onClick={() => handleQuickAction(website.id, 'featured')}
                          >
                            <Star className="h-4 w-4 mr-1" />
                            Feature
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleQuickAction(website.id, 'rejected')}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {pendingCount === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No pending submissions to review
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* All Websites Tab (Admin Only) */}
        {isAdmin && (
          <TabsContent value="all-websites" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search websites..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Websites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allWebsitesLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                allWebsites.map((website) => (
                  <Card key={website.id} className="group hover:shadow-lg transition-shadow">
                    <div className="relative">
                      {website.thumbnail_url && (
                        <img 
                          src={website.thumbnail_url} 
                          alt={website.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      )}
                      {website.is_featured && (
                        <Badge className="absolute top-2 right-2 bg-purple-600">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-1">{website.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {website.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <Badge className={getStatusColor(website.status)}>
                          {website.status}
                        </Badge>
                        <span className="font-semibold text-green-600">
                          {formatPrice(website.price)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Eye className="h-4 w-4" />
                        <span>{website.views_count}</span>
                        <span>•</span>
                        <span>⭐ {website.rating_average?.toFixed(1) || '0.0'}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setReviewingWebsite(website)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDelete(website.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        )}

        {/* My Websites Tab */}
        <TabsContent value="my-websites" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Uploaded Websites</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userWebsites.map((website) => (
                    <TableRow key={website.id}>
                      <TableCell className="font-medium">{website.title}</TableCell>
                      <TableCell>{website.category}</TableCell>
                      <TableCell>{formatPrice(website.price)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(website.status)}>
                          {website.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{website.views_count}</TableCell>
                      <TableCell>
                        {website.rating_average?.toFixed(1) || '0.0'} 
                        ({website.rating_count})
                      </TableCell>
                      <TableCell>
                        {new Date(website.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDelete(website.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isAdmin && (
              <>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                        <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                      </div>
                      <Clock className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Approved</p>
                        <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Featured</p>
                        <p className="text-2xl font-bold text-purple-600">{featuredCount}</p>
                      </div>
                      <Star className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">My Websites</p>
                    <p className="text-2xl font-bold">{userWebsites.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Review Modal */}
      <WebsiteReviewModal
        website={reviewingWebsite}
        isOpen={!!reviewingWebsite}
        onClose={() => setReviewingWebsite(null)}
        onUpdate={handleWebsiteUpdate}
      />
    </div>
  );
};

export default AdminPanel;
