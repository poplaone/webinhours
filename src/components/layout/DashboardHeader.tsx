
import React from 'react';
import { Search, Bell, User, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DashboardHeaderProps {
  toggleSidebar: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Sparkles className="h-5 w-5 text-[#8B5CF6]" />
            <span className="ml-2 text-xl font-semibold">Pulse Vision.AI</span>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="hidden md:flex flex-1 items-center justify-center px-4">
          <div className="w-full max-w-sm relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search ideas, projects..."
              className="w-full bg-background pl-8 rounded-full border-muted-foreground/20"
            />
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground"
            onClick={toggleSidebar}
          >
            <Sparkles className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
