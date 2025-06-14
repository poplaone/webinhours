
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
  Upload
} from 'lucide-react';
import { useWebsites, useUserWebsites, useUpdateWebsite, useDeleteWebsite } from '@/hooks/useWebsites';
import { useAuth } from '@/hooks/useAuth';
import { WebsiteUploadForm } from '@/components/admin/WebsiteUploadForm';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'business', label: 'Business' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'blog', label: 'Blog' },
  { value: 'landing_page', label: 'Landing Page' },
  { value: 'saas', label: 'SaaS' },
  { value: 'nonprofit', label: 'Non-Profit' },
  { value: 'education', label: 'Education' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'creative', label: 'Creative' },
  { value: 'other', label: 'Other' },
];

const AdminPanel = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('marketplace');

  const { toast } = useToast();
  const updateWebsite = useUpdateWebsite();
  const deleteWebsite = useDeleteWebsite();

  // Filters for marketplace view
  const marketplaceFilters = {
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    search: searchTerm || undefined,
    status: selectedStatus !== 'all' ? selectedStatus : undefined,
  };

  const { data: marketplaceWebsites = [], isLoading: marketplaceLoading } = useWebsites(marketplaceFilters);
  const { data: userWebsites = [], isLoading: userLoading } = useUserWebsites();

  const handleStatusUpdate = async (websiteId: string, newStatus: string) => {
    try {
      await updateWebsite.mutateAsync({
        id: websiteId,
        updates: { 
          status: newStatus as any,
          ...(newStatus === 'approved' && { approved_at: new Date().toISOString() }),
          ...(newStatus === 'featured' && { 
            is_featured: true, 
            featured_at: new Date().toISOString(),
            approved_at: new Date().toISOString()
          })
        }
      });
      
      toast({
        title: "Success",
        description: `Website status updated to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update website status",
        variant: "destructive",
      });
    }
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

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8" />
            Admin Panel
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage website templates and marketplace
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="my-websites">My Websites</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-6">
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

          {/* Marketplace Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaceLoading ? (
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
              marketplaceWebsites.map((website) => (
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

                    <div className="flex flex-wrap gap-1 mb-3">
                      {website.tags?.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Eye className="h-4 w-4" />
                      <span>{website.views_count} views</span>
                      <span>•</span>
                      <span>⭐ {website.rating_average?.toFixed(1) || '0.0'}</span>
                    </div>

                    <div className="flex gap-2">
                      {website.preview_url && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={website.preview_url} target="_blank" rel="noopener noreferrer">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </a>
                        </Button>
                      )}
                      
                      {/* Admin actions */}
                      <Select 
                        value={website.status} 
                        onValueChange={(value) => handleStatusUpdate(website.id, value)}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="featured">Featured</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

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

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Websites</p>
                    <p className="text-2xl font-bold">{marketplaceWebsites.length}</p>
                  </div>
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
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
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                    <p className="text-2xl font-bold">
                      {userWebsites.reduce((sum, w) => sum + w.views_count, 0)}
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                    <p className="text-2xl font-bold">$0.00</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
