
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PurchaseHistoryTab = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-[#8B5CF6]/20 to-[#7C3AED]/20 flex items-center justify-center">
                <Globe className="h-16 w-16 text-[#8B5CF6]" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">E-commerce Template</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Full-featured online store with admin panel
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#8B5CF6]">$299</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">Download</Button>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-40 bg-gradient-to-br from-[#8B5CF6]/20 to-[#7C3AED]/20 flex items-center justify-center">
                <Globe className="h-16 w-16 text-[#8B5CF6]" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Blog Template</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Modern blog with CMS integration
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#8B5CF6]">$149</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">Download</Button>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="text-center py-8">
          <Button onClick={() => navigate('/websites')}>
            Browse More Templates
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
