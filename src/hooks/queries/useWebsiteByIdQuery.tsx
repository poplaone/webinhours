
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
        return null;
      }

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
          throw new Error(`Database error: ${error.message}`);
        }

        if (!data) {
          return null;
        }

        // Fetch and merge profile
        return await fetchSingleWebsiteWithProfile(data);
      } catch (error) {
        throw error;
      }
    },
    enabled: !!slugOrId,
    // 🚀 AGGRESSIVE CACHING FOR INSTANT LOADS
    staleTime: 1000 * 60 * 15, // 15 minutes - data stays fresh
    gcTime: 1000 * 60 * 60 * 2, // 2 hours - keep in cache for 2 hours
    retry: 1,
    retryDelay: 500,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    networkMode: 'online'
  });
};
