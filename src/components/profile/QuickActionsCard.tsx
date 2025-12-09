
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
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <Button
            variant="outline"
            className="h-24 md:h-24 flex flex-col gap-2 hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/5 transition-all"
            onClick={() => navigate('/websites')}
          >
            <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-[#8B5CF6]" />
            <span className="text-xs md:text-sm">Browse</span>
          </Button>
          <Button variant="outline" className="h-24 md:h-24 flex flex-col gap-2 hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/5 transition-all">
            <Globe className="h-5 w-5 md:h-6 md:w-6 text-[#8B5CF6]" />
            <span className="text-xs md:text-sm">Downloads</span>
          </Button>
          <Button variant="outline" className="col-span-2 md:col-span-1 h-24 md:h-24 flex flex-col gap-2 hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/5 transition-all">
            <Star className="h-5 w-5 md:h-6 md:w-6 text-[#8B5CF6]" />
            <span className="text-xs md:text-sm">Favorites</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
