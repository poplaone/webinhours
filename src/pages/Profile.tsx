
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Store, ShoppingBag, Plus, Settings, Edit3, Save, X, Upload, Globe, DollarSign, Tag, Image, Code, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/hooks/useAuth';
import { useProfile, useUpdateProfile } from '@/hooks/useProfiles';
import { useUserWebsites, useCreateWebsite } from '@/hooks/useWebsites';
import { useToast } from '@/hooks/use-toast';
import SideNavbar from '@/components/layout/SideNavbar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: userWebsites } = useUserWebsites();
  const updateProfile = useUpdateProfile();
  const createWebsite = useCreateWebsite();
  const { toast } = useToast();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingListing, setIsAddingListing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    company: ''
  });
  const [listingForm, setListingForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    preview_url: '',
    demo_url: '',
    tags: '',
    technologies: '',
    features: ''
  });

  React.useEffect(() => {
    if (profile) {
      setProfileForm({
        full_name: profile.full_name || '',
        company: profile.company || ''
      });
    }
  }, [profile]);

  const userRole = profile?.role || 'buyer';
  const isSeller = userRole === 'seller';

  const handleProfileUpdate = async () => {
    try {
      await updateProfile.mutateAsync(profileForm);
      setIsEditingProfile(false);
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  const handleListingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createWebsite.mutateAsync({
        title: listingForm.title,
        description: listingForm.description,
        category: listingForm.category,
        price: parseFloat(listingForm.price) || 0,
        preview_url: listingForm.preview_url,
        demo_url: listingForm.demo_url || undefined,
        tags: listingForm.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        technologies: listingForm.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
        features: listingForm.features.split(',').map(feature => feature.trim()).filter(Boolean)
      });
      
      setIsAddingListing(false);
      setListingForm({
        title: '',
        description: '',
        category: '',
        price: '',
        preview_url: '',
        demo_url: '',
        tags: '',
        technologies: '',
        features: ''
      });
      
      toast({
        title: "Success",
        description: "Listing created successfully! It's pending approval.",
      });
    } catch (error) {
      console.error('Listing creation error:', error);
    }
  };

  if (profileLoading) {
    return (
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background to-background/80">
        <SideNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#8B5CF6]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background to-background/80">
      <SideNavbar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6 lg:container">
          {/* Profile Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-full flex items-center justify-center">
                    {isSeller ? (
                      <Store className="h-10 w-10 text-white" />
                    ) : (
                      <ShoppingBag className="h-10 w-10 text-white" />
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-background border-2 border-background rounded-full p-1">
                    <Badge variant={isSeller ? "default" : "secondary"} className="text-xs">
                      {isSeller ? "Seller" : "Buyer"}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold">{profile?.full_name || user?.email}</h1>
                  <p className="text-muted-foreground">{profile?.company || 'No company set'}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              
              <Button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                variant="outline"
                className="gap-2"
              >
                {isEditingProfile ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                {isEditingProfile ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>

            {/* Quick Edit Profile Form */}
            {isEditingProfile && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        value={profileForm.full_name}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, full_name: e.target.value }))}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={profileForm.company}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleProfileUpdate} disabled={updateProfile.isPending}>
                      <Save className="h-4 w-4 mr-2" />
                      {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Profile Content */}
          <Tabs defaultValue={isSeller ? "listings" : "dashboard"} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="listings">{isSeller ? 'My Listings' : 'Purchases'}</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {isSeller ? 'Total Listings' : 'Total Purchases'}
                    </CardTitle>
                    {isSeller ? <Store className="h-4 w-4 text-muted-foreground" /> : <ShoppingBag className="h-4 w-4 text-muted-foreground" />}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userWebsites?.length || 0}</div>
                    <p className="text-xs text-muted-foreground">
                      {isSeller ? '+2 from last month' : '+1 this month'}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {isSeller ? 'Total Sales' : 'Total Spent'}
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${isSeller ? '1,234' : '567'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {isSeller ? '+15% from last month' : '+5% this month'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Rating</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.8</div>
                    <p className="text-xs text-muted-foreground">
                      Based on {isSeller ? '45 reviews' : '12 reviews'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {isSeller && (
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Button 
                        onClick={() => setIsAddingListing(true)}
                        className="h-24 flex flex-col gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED]"
                      >
                        <Plus className="h-6 w-6" />
                        Add New Listing
                      </Button>
                      <Button variant="outline" className="h-24 flex flex-col gap-2">
                        <Globe className="h-6 w-6" />
                        Visit Store
                      </Button>
                      <Button variant="outline" className="h-24 flex flex-col gap-2">
                        <Settings className="h-6 w-6" />
                        Manage Store
                      </Button>
                      <Button variant="outline" className="h-24 flex flex-col gap-2">
                        <Star className="h-6 w-6" />
                        View Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="listings" className="space-y-6">
              {isSeller && (
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">My Listings</h2>
                  <Button 
                    onClick={() => setIsAddingListing(true)}
                    className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Listing
                  </Button>
                </div>
              )}

              {/* Add Listing Form */}
              {isAddingListing && isSeller && (
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Website Listing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleListingSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="title">Website Title *</Label>
                          <Input
                            id="title"
                            value={listingForm.title}
                            onChange={(e) => setListingForm(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="E-commerce Store Template"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Category *</Label>
                          <Input
                            id="category"
                            value={listingForm.category}
                            onChange={(e) => setListingForm(prev => ({ ...prev, category: e.target.value }))}
                            placeholder="E-commerce"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={listingForm.description}
                          onChange={(e) => setListingForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe your website template..."
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="price">Price ($) *</Label>
                          <Input
                            id="price"
                            type="number"
                            value={listingForm.price}
                            onChange={(e) => setListingForm(prev => ({ ...prev, price: e.target.value }))}
                            placeholder="299"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="preview_url">Preview URL *</Label>
                          <Input
                            id="preview_url"
                            value={listingForm.preview_url}
                            onChange={(e) => setListingForm(prev => ({ ...prev, preview_url: e.target.value }))}
                            placeholder="https://example.com/preview"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="demo_url">Demo URL (optional)</Label>
                        <Input
                          id="demo_url"
                          value={listingForm.demo_url}
                          onChange={(e) => setListingForm(prev => ({ ...prev, demo_url: e.target.value }))}
                          placeholder="https://example.com/demo"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="tags">Tags (comma separated)</Label>
                          <Input
                            id="tags"
                            value={listingForm.tags}
                            onChange={(e) => setListingForm(prev => ({ ...prev, tags: e.target.value }))}
                            placeholder="E-commerce, Stripe, Admin Panel"
                          />
                        </div>
                        <div>
                          <Label htmlFor="technologies">Technologies</Label>
                          <Input
                            id="technologies"
                            value={listingForm.technologies}
                            onChange={(e) => setListingForm(prev => ({ ...prev, technologies: e.target.value }))}
                            placeholder="React, Node.js, MongoDB"
                          />
                        </div>
                        <div>
                          <Label htmlFor="features">Features</Label>
                          <Input
                            id="features"
                            value={listingForm.features}
                            onChange={(e) => setListingForm(prev => ({ ...prev, features: e.target.value }))}
                            placeholder="Responsive, SEO, Admin Dashboard"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button type="submit" disabled={createWebsite.isPending}>
                          {createWebsite.isPending ? 'Creating...' : 'Create Listing'}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setIsAddingListing(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Listings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userWebsites?.map((website) => (
                  <Card key={website.id} className="overflow-hidden">
                    <div className="h-40 bg-gradient-to-br from-[#8B5CF6]/20 to-[#7C3AED]/20 flex items-center justify-center">
                      <Globe className="h-16 w-16 text-[#8B5CF6]" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold line-clamp-1">{website.title}</h3>
                        <Badge 
                          variant={website.status === 'approved' ? 'default' : 'secondary'}
                          className="ml-2"
                        >
                          {website.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {website.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#8B5CF6]">${website.price}</span>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">View</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">Settings panel coming soon...</p>
                  <Button onClick={() => navigate('/settings')}>
                    Go to Full Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Profile;
