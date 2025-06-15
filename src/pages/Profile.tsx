
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/hooks/useAuth';
import { useProfile, useUpdateProfile } from '@/hooks/useProfiles';
import { useUserWebsites } from '@/hooks/useWebsiteQueries';
import { useIsAdmin } from '@/hooks/useAdmin';
import SideNavbar from '@/components/layout/SideNavbar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileEditForm } from '@/components/profile/ProfileEditForm';
import { ProfileStats } from '@/components/profile/ProfileStats';
import { QuickActionsCard } from '@/components/profile/QuickActionsCard';
import { RecentPurchases } from '@/components/profile/RecentPurchases';
import { PurchaseHistoryTab } from '@/components/profile/PurchaseHistoryTab';

const Profile = () => {
  const { user } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: userWebsites } = useUserWebsites();
  const updateProfile = useUpdateProfile();
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
          <ProfileHeader
            profile={profile}
            user={user}
            isAdmin={isAdmin}
            isEditingProfile={isEditingProfile}
            setIsEditingProfile={setIsEditingProfile}
          />

          {isEditingProfile && (
            <ProfileEditForm
              profileForm={profileForm}
              setProfileForm={setProfileForm}
              onSave={handleProfileUpdate}
              onCancel={() => setIsEditingProfile(false)}
              isUpdating={updateProfile.isPending}
            />
          )}

          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="purchases">My Purchases</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <ProfileStats />
              <QuickActionsCard />
              <RecentPurchases />
            </TabsContent>

            <TabsContent value="purchases">
              <PurchaseHistoryTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Profile;
