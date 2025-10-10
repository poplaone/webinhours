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
  // Filter for pending websites
  const pendingWebsites = websites.filter(w => w.status === 'pending');
  
  const handleRefresh = () => {
    window.location.reload();
  };
  return <Card>
      
      
    </Card>;
}