import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useAdmin';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const isAdmin = useIsAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access the admin panel.",
        variant: "destructive",
      });
      navigate('/auth', { state: { from: location } });
    } else if (!authLoading && user && isAdmin === false) {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access the admin panel.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [user, authLoading, isAdmin, navigate, toast, location]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="h-16 border-b px-6 flex items-center">
          <Skeleton className="h-6 w-32" />
        </header>
        <div className="flex-1 p-6 flex gap-6">
          <Skeleton className="w-64 h-full hidden md:block" />
          <div className="flex-1 space-y-6">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!user || isAdmin === false) {
    return null;
  }

  return <>{children}</>;
};

export default AdminRoute;
