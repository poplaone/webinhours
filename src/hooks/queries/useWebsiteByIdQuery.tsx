
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Website } from '@/types/website';
import { fetchSingleWebsiteWithProfile } from './websiteQueryUtils';

// Function to check if string is UUID
const isUUID = (str: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

export const useWebsiteById = (slugOrId: string) => {
  return useQuery({
    queryKey: ['website', slugOrId],
    queryFn: async () => {
      if (!slugOrId) {
        console.warn('🔍 No website identifier provided');
        return null;
      }

      console.log('🔍 Fetching website by identifier:', slugOrId);
      
      try {
        let query = supabase.from('websites').select('*');
        
        // Check if identifier is UUID or slug
        if (isUUID(slugOrId)) {
          query = query.eq('id', slugOrId);
        } else {
          query = query.eq('slug', slugOrId);
        }
        
        const { data, error } = await query.maybeSingle();

        if (error) {
          console.error('❌ Error fetching website:', error);
          throw new Error(`Database error: ${error.message}`);
        }
        
        if (!data) {
          console.warn('⚠️ Website not found:', slugOrId);
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
    enabled: !!slugOrId,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });
};
