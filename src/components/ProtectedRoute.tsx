
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute = ({ children, requireAuth = true }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user && requireAuth) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this feature.",
        variant: "destructive",
      });
      // Pass current location so user can return here after auth
      navigate('/auth', { state: { from: location } });
    }
  }, [user, loading, navigate, requireAuth, toast, location]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="h-16 border-b px-6 flex items-center">
          <Skeleton className="h-6 w-32" />
        </header>
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6 mt-8">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
          <Skeleton className="h-[300px] w-full" />
        </main>
      </div>
    );
  }

  if (!user && requireAuth) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
