import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Edit, CheckCircle, Star, XCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { Website } from '@/hooks/useWebsites';
interface PendingReviewsTabProps {
  websites: Website[];
  pendingCount: number;
  onReviewWebsite: (website: Website) => void;
  onQuickAction: (websiteId: string, action: string) => void;
  formatPrice: (price: number) => string;
}
export function PendingReviewsTab({
  websites,
  pendingCount,
  onReviewWebsite,
  onQuickAction,
  formatPrice
}: PendingReviewsTabProps) {
  // Filter for pending websites and log for debugging
  const pendingWebsites = websites.filter(w => w.status === 'pending');
  console.log('🔍 PendingReviewsTab - All websites:', websites.length);
  console.log('🔍 PendingReviewsTab - Pending websites:', pendingWebsites.length);
  console.log('🔍 PendingReviewsTab - Website statuses:', websites.map(w => ({
    title: w.title,
    status: w.status,
    created_at: w.created_at,
    user_id: w.user_id
  })));
  console.log('🟡 PendingReviewsTab - Filtered pending websites:', pendingWebsites.map(w => ({
    title: w.title,
    id: w.id,
    user_id: w.user_id,
    created_at: w.created_at
  })));
  const handleRefresh = () => {
    console.log('🔄 Refreshing pending reviews...');
    window.location.reload();
  };
  return <Card>
      
      
    </Card>;
}