
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
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6]/20 to-[#7C3AED]/20 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-[#8B5CF6]" />
              </div>
              <div>
                <h4 className="font-medium">E-commerce Template</h4>
                <p className="text-sm text-muted-foreground">Purchased 2 days ago</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-[#8B5CF6]">$299</p>
              <Button size="sm" variant="outline">Download</Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6]/20 to-[#7C3AED]/20 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-[#8B5CF6]" />
              </div>
              <div>
                <h4 className="font-medium">Blog Template</h4>
                <p className="text-sm text-muted-foreground">Purchased 1 week ago</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-[#8B5CF6]">$149</p>
              <Button size="sm" variant="outline">Download</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
