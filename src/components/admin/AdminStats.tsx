import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, CheckCircle, Star, Users } from 'lucide-react';

interface AdminStatsProps {
  pendingCount: number;
  approvedCount: number;
  featuredCount: number;
  userWebsitesCount: number;
  isAdmin: boolean;
}

export function AdminStats({ 
  pendingCount, 
  approvedCount, 
  featuredCount, 
  userWebsitesCount, 
  isAdmin 
}: AdminStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {isAdmin && (
        <>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                </div>
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Featured</p>
                  <p className="text-2xl font-bold text-purple-600">{featuredCount}</p>
                </div>
                <Star className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </>
      )}
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">My Websites</p>
              <p className="text-2xl font-bold">{userWebsitesCount}</p>
            </div>
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
