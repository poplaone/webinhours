import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Settings, Globe } from 'lucide-react';
import { WebsiteUploadForm } from './WebsiteUploadForm';

interface AdminPanelHeaderProps {
  isAdmin: boolean;
  showUploadDialog: boolean;
  setShowUploadDialog: (show: boolean) => void;
}

export function AdminPanelHeader({ 
  isAdmin, 
  showUploadDialog, 
  setShowUploadDialog 
}: AdminPanelHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="h-8 w-8" />
          {isAdmin ? 'Admin Panel' : 'My Dashboard'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isAdmin ? 'Manage website templates' : 'View your uploaded content'}
        </p>
      </div>
      
      {/* Only show upload buttons for admin users */}
      {isAdmin && (
        <div className="flex gap-2">
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90">
                <Globe className="mr-2 h-4 w-4" />
                Upload Website
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <WebsiteUploadForm onClose={() => setShowUploadDialog(false)} />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
