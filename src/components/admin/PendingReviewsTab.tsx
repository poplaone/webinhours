
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Edit, CheckCircle, Star, XCircle } from 'lucide-react';
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
  const pendingWebsites = websites.filter(w => w.status === 'pending');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Pending Reviews ({pendingCount})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingWebsites.map((website) => (
            <div key={website.id} className="border rounded-lg p-4 space-y-3">
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
                    <h3 className="font-semibold">{website.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{website.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{website.category}</Badge>
                      <span className="text-green-600 font-medium">{formatPrice(website.price)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onReviewWebsite(website)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Review
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => onQuickAction(website.id, 'approved')}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => onQuickAction(website.id, 'featured')}
                  >
                    <Star className="h-4 w-4 mr-1" />
                    Feature
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => onQuickAction(website.id, 'rejected')}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {pendingCount === 0 && (
            <div className="text-center py-8 text-gray-500">
              No pending submissions to review
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
