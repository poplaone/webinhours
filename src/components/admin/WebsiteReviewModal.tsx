
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Website } from '@/hooks/useWebsites';
import { WebsitePreview } from './WebsitePreview';
import { AdminControls } from './AdminControls';
import { WebsiteReviewModalProps } from './types';

export function WebsiteReviewModal({ website, isOpen, onClose, onUpdate }: WebsiteReviewModalProps) {
  const [status, setStatus] = useState<'pending' | 'approved' | 'featured' | 'rejected' | 'archived'>(website?.status || 'pending');
  const [viewsCount, setViewsCount] = useState(website?.views_count || 0);
  const [downloadsCount, setDownloadsCount] = useState(website?.downloads_count || 0);
  const [ratingAverage, setRatingAverage] = useState(website?.rating_average || 0);
  const [ratingCount, setRatingCount] = useState(website?.rating_count || 0);
  const [tags, setTags] = useState<string[]>(website?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [isFeatured, setIsFeatured] = useState(website?.is_featured || false);

  if (!website) return null;

  const handleSave = () => {
    const updates = {
      status,
      views_count: viewsCount,
      downloads_count: downloadsCount,
      rating_average: ratingAverage > 0 ? ratingAverage : null,
      rating_count: ratingCount,
      tags,
      is_featured: isFeatured,
      ...(status === 'approved' && !website.approved_at && { approved_at: new Date().toISOString() }),
      ...(status === 'featured' && { 
        is_featured: true, 
        featured_at: new Date().toISOString(),
        approved_at: website.approved_at || new Date().toISOString()
      })
    };

    onUpdate(website.id, updates);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review Website: {website.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Website Preview */}
          <WebsitePreview website={website} />

          {/* Admin Controls */}
          <AdminControls
            status={status}
            viewsCount={viewsCount}
            downloadsCount={downloadsCount}
            ratingAverage={ratingAverage}
            ratingCount={ratingCount}
            tags={tags}
            newTag={newTag}
            isFeatured={isFeatured}
            onStatusChange={setStatus}
            onViewsCountChange={setViewsCount}
            onDownloadsCountChange={setDownloadsCount}
            onRatingAverageChange={setRatingAverage}
            onRatingCountChange={setRatingCount}
            onTagsChange={setTags}
            onNewTagChange={setNewTag}
            onFeaturedChange={setIsFeatured}
            onSave={handleSave}
            onCancel={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
