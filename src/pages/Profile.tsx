
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/hooks/useAuth';
import { useProfile, useUpdateProfile } from '@/hooks/useProfiles';
import { useUserWebsites } from '@/hooks/useWebsiteQueries';
import { useIsAdmin } from '@/hooks/useAdmin';
import AppLayout from '@/components/layout/AppLayout';
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
      if (process.env.NODE_ENV === 'development') {
        console.error('Profile update error:', error);
      }
    }
  };

  if (profileLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center pt-24">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
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
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
