
import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const RecentPurchases = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Purchases</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center py-8 text-muted-foreground">
            <p>No recent purchases found.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
