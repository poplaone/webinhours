import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, MessageSquare, Shield } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useAdmin';
import { useToast } from '@/hooks/use-toast';

interface UserDropdownProps {
  profile?: {
    full_name?: string;
    avatar_url?: string;
    email?: string;
  };
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ profile }) => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const isAdmin = useIsAdmin();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Signed out successfully',
        description: 'You have been signed out of your account.',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error signing out',
        description: 'There was an error signing out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.[0].toUpperCase() || 'U';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-border hover:ring-primary transition-all">
          <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'User'} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profile?.full_name || 'User'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {profile?.email || user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile & Dashboard</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate('/support-tickets')}>
          <MessageSquare className="mr-2 h-4 w-4" />
          <span>Support Tickets</span>
        </DropdownMenuItem>
        
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/admin-panel')}>
              <Shield className="mr-2 h-4 w-4" />
              <span>Admin Panel</span>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
