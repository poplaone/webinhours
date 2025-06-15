
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LogIn, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface SidebarActionsProps {
  isAuthenticated: boolean;
}

export const SidebarActions = ({ isAuthenticated }: SidebarActionsProps) => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isAuthenticated) {
    return (
      <div className="p-4 border-t border-border/40">
        <div className="mb-3 text-sm text-muted-foreground">
          {user?.email}
        </div>
        <Button
          variant="outline"
          className="w-full justify-start gap-3"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-border/40 space-y-2">
      <Button
        variant="outline"
        className="w-full justify-start gap-3"
        onClick={() => navigate('/auth')}
      >
        <LogIn className="h-4 w-4" />
        Sign In
      </Button>
      <Button
        className="w-full justify-start gap-3 bg-[#8B5CF6] hover:bg-[#7C3AED]"
        onClick={() => navigate('/auth')}
      >
        <UserPlus className="h-4 w-4" />
        Sign Up
      </Button>
    </div>
  );
};
