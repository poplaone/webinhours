
import React from 'react';
import { User, Edit3, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProfileHeaderProps {
  profile: any;
  user: any;
  isAdmin: boolean;
  isEditingProfile: boolean;
  setIsEditingProfile: (editing: boolean) => void;
}

export const ProfileHeader = ({
  profile,
  user,
  isAdmin,
  isEditingProfile,
  setIsEditingProfile
}: ProfileHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-0 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <div className="relative">
            <div className="w-24 h-24 md:w-20 md:h-20 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-full flex items-center justify-center shadow-lg md:shadow-none">
              <User className="h-10 w-10 text-white" />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold">{profile?.full_name || user?.email}</h1>
            <p className="text-muted-foreground">{profile?.company || 'No company set'}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            {isAdmin && (
              <Badge className="mt-1 bg-purple-100 text-purple-800 mx-auto md:mx-0">
                Administrator
              </Badge>
            )}
          </div>
        </div>

        <Button
          onClick={() => setIsEditingProfile(!isEditingProfile)}
          variant="outline"
          className="gap-2 w-full md:w-auto mt-2 md:mt-0"
        >
          {isEditingProfile ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
          {isEditingProfile ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>
    </div>
  );
};
