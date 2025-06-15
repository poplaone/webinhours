
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { WebsiteReviewModal } from './WebsiteReviewModal';
import { WebsiteEditForm } from './WebsiteEditForm';
import { Website } from '@/hooks/useWebsites';

interface AdminPanelModalsProps {
  reviewingWebsite: Website | null;
  setReviewingWebsite: (website: Website | null) => void;
  showEditDialog: boolean;
  setShowEditDialog: (show: boolean) => void;
  editingWebsite: Website | null;
  setEditingWebsite: (website: Website | null) => void;
  handleWebsiteUpdate: (websiteId: string, updates: any) => void;
}

export function AdminPanelModals({
  reviewingWebsite,
  setReviewingWebsite,
  showEditDialog,
  setShowEditDialog,
  editingWebsite,
  setEditingWebsite,
  handleWebsiteUpdate
}: AdminPanelModalsProps) {
  return (
    <>
      {/* Review Modal */}
      <WebsiteReviewModal
        website={reviewingWebsite}
        isOpen={!!reviewingWebsite}
        onClose={() => setReviewingWebsite(null)}
        onUpdate={handleWebsiteUpdate}
      />

      {/* Edit Modal */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {editingWebsite && (
            <WebsiteEditForm
              website={editingWebsite}
              onClose={() => {
                setShowEditDialog(false);
                setEditingWebsite(null);
              }}
              onUpdate={handleWebsiteUpdate}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
