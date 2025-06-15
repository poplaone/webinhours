
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
  console.log('🔍 PendingReviewsTab - Website statuses:', websites.map(w => ({ title: w.title, status: w.status, created_at: w.created_at, user_id: w.user_id })));
  console.log('🟡 PendingReviewsTab - Filtered pending websites:', pendingWebsites.map(w => ({ title: w.title, id: w.id, user_id: w.user_id, created_at: w.created_at })));

  const handleRefresh = () => {
    console.log('🔄 Refreshing pending reviews...');
    window.location.reload();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Pending Reviews ({pendingWebsites.length})
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            {pendingWebsites.length === 0 && websites.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                No pending submissions found
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingWebsites.length > 0 ? (
            pendingWebsites.map((website) => (
              <div key={website.id} className="border rounded-lg p-4 space-y-3" title={website.title}>
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    {website.thumbnail_url && (
                      <img 
                        src={website.thumbnail_url} 
                        alt={website.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold" title={website.title}>{website.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{website.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{website.category}</Badge>
                        <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        <span className="text-green-600 font-medium">{formatPrice(website.price)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Submitted: {new Date(website.created_at).toLocaleDateString()} by User ID: {website.user_id.slice(0, 8)}...
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onReviewWebsite(website)}
                      title={`Review ${website.title}`}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => onQuickAction(website.id, 'approved')}
                      title={`Approve ${website.title}`}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => onQuickAction(website.id, 'featured')}
                      title={`Feature ${website.title}`}
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Feature
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => onQuickAction(website.id, 'rejected')}
                      title={`Reject ${website.title}`}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No pending submissions</h3>
              {websites.length === 0 ? (
                <p className="text-sm">No websites found in the database. Try uploading a test website.</p>
              ) : (
                <p className="text-sm">All {websites.length} websites have been reviewed. New submissions will appear here.</p>
              )}
              <Button variant="outline" className="mt-4" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh to check for new submissions
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
