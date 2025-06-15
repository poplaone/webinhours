
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '../useAuth';
import { Website } from '@/types/website';

export const useUserWebsites = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-websites', user?.id],
    queryFn: async () => {
      if (!user) {
        console.log('🔍 No user authenticated for user websites');
        return [];
      }
      
      console.log('🔍 Fetching user websites for user:', user.id);
      
      try {
        const { data, error } = await supabase
          .from('websites')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('❌ Error fetching user websites:', error);
          throw new Error(`Database error: ${error.message}`);
        }
        
        console.log('✅ Successfully fetched user websites:', data?.length || 0, 'websites');
        return (data || []) as Website[];
      } catch (error) {
        console.error('💥 User websites query failed:', error);
        throw error;
      }
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
