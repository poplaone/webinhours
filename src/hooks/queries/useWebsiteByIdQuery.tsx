
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Website } from '@/types/website';
import { fetchSingleWebsiteWithProfile } from './websiteQueryUtils';

export const useWebsiteById = (id: string) => {
  return useQuery({
    queryKey: ['website', id],
    queryFn: async () => {
      if (!id) {
        console.warn('🔍 No website ID provided');
        return null;
      }

      console.log('🔍 Fetching website by id:', id);
      
      try {
        const { data, error } = await supabase
          .from('websites')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) {
          console.error('❌ Error fetching website:', error);
          throw new Error(`Database error: ${error.message}`);
        }
        
        if (!data) {
          console.warn('⚠️ Website not found:', id);
          return null;
        }

        console.log('✅ Successfully fetched website:', data.title);
        
        // Fetch and merge profile
        return await fetchSingleWebsiteWithProfile(data);
      } catch (error) {
        console.error('💥 Website by ID query failed:', error);
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });
};
