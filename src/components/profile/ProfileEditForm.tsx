
import React from 'react';
import { Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface ProfileEditFormProps {
  profileForm: {
    full_name: string;
    company: string;
  };
  setProfileForm: React.Dispatch<React.SetStateAction<{
    full_name: string;
    company: string;
  }>>;
  onSave: () => void;
  onCancel: () => void;
  isUpdating: boolean;
}

export const ProfileEditForm = ({
  profileForm,
  setProfileForm,
  onSave,
  onCancel,
  isUpdating
}: ProfileEditFormProps) => {
  return (
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
          <Button onClick={onSave} disabled={isUpdating}>
            <Save className="h-4 w-4 mr-2" />
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
