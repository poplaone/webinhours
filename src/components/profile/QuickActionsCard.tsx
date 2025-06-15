
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Star, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const QuickActionsCard = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="h-24 flex flex-col gap-2"
            onClick={() => navigate('/marketplace')}
          >
            <ShoppingBag className="h-6 w-6" />
            Browse Marketplace
          </Button>
          <Button variant="outline" className="h-24 flex flex-col gap-2">
            <Globe className="h-6 w-6" />
            Download Center
          </Button>
          <Button variant="outline" className="h-24 flex flex-col gap-2">
            <Star className="h-6 w-6" />
            My Favorites
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
