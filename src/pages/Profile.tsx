
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Edit3, Save, X, Globe, DollarSign, Star, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/hooks/useAuth';
import { useProfile, useUpdateProfile } from '@/hooks/useProfiles';
import { useUserWebsites } from '@/hooks/useWebsiteQueries';
import { useToast } from '@/hooks/use-toast';
import { useIsAdmin } from '@/hooks/useAdmin';
import SideNavbar from '@/components/layout/SideNavbar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: userWebsites } = useUserWebsites();
  const updateProfile = useUpdateProfile();
  const { toast } = useToast();
  const isAdmin = useIsAdmin();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    company: ''
  });

  React.useEffect(() => {
    if (profile) {
      setProfileForm({
        full_name: profile.full_name || '',
        company: profile.company || ''
      });
    }
  }, [profile]);

  const handleProfileUpdate = async () => {
    try {
      await updateProfile.mutateAsync(profileForm);
      setIsEditingProfile(false);
    } catch (error) {
      console.error('Profile update error:', error);
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
                    <User className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold">{profile?.full_name || user?.email}</h1>
                  <p className="text-muted-foreground">{profile?.company || 'No company set'}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  {isAdmin && (
                    <Badge className="mt-1 bg-purple-100 text-purple-800">
                      Administrator
                    </Badge>
                  )}
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
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="purchases">My Purchases</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">
                      Websites purchased
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1,234</div>
                    <p className="text-xs text-muted-foreground">
                      Lifetime purchases
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Favorites</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      Saved websites
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-24 flex flex-col gap-2"
                      onClick={() => navigate('/marketplace')}
                    >
                      <ShoppingBag className="h-6 w-6" />
                      Browse Marketplace
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col gap-2">
                      <Globe className="h-6 w-6" />
                      Download Center
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col gap-2">
                      <Star className="h-6 w-6" />
                      My Favorites
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Purchases */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Purchases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6]/20 to-[#7C3AED]/20 rounded-lg flex items-center justify-center">
                          <Globe className="h-6 w-6 text-[#8B5CF6]" />
                        </div>
                        <div>
                          <h4 className="font-medium">E-commerce Template</h4>
                          <p className="text-sm text-muted-foreground">Purchased 2 days ago</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#8B5CF6]">$299</p>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6]/20 to-[#7C3AED]/20 rounded-lg flex items-center justify-center">
                          <Globe className="h-6 w-6 text-[#8B5CF6]" />
                        </div>
                        <div>
                          <h4 className="font-medium">Blog Template</h4>
                          <p className="text-sm text-muted-foreground">Purchased 1 week ago</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#8B5CF6]">$149</p>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="purchases">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {/* Purchase history items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <Card className="overflow-hidden">
                        <div className="h-40 bg-gradient-to-br from-[#8B5CF6]/20 to-[#7C3AED]/20 flex items-center justify-center">
                          <Globe className="h-16 w-16 text-[#8B5CF6]" />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">E-commerce Template</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Full-featured online store with admin panel
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-[#8B5CF6]">$299</span>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">Download</Button>
                              <Button size="sm" variant="outline">View</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="overflow-hidden">
                        <div className="h-40 bg-gradient-to-br from-[#8B5CF6]/20 to-[#7C3AED]/20 flex items-center justify-center">
                          <Globe className="h-16 w-16 text-[#8B5CF6]" />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">Blog Template</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Modern blog with CMS integration
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-[#8B5CF6]">$149</span>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">Download</Button>
                              <Button size="sm" variant="outline">View</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="text-center py-8">
                    <Button onClick={() => navigate('/marketplace')}>
                      Browse More Templates
                    </Button>
                  </div>
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
