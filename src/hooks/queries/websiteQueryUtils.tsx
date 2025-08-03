
import { supabase } from '@/integrations/supabase/client';
import { Website, WebsiteFilters } from '@/types/website';

// Cache for profiles to avoid repeated fetches
const profileCache = new Map<string, any>();
const profileCacheTimeout = 1000 * 60 * 5; // 5 minutes
const profileCacheTimestamps = new Map<string, number>();

export const buildWebsitesQuery = (filters?: WebsiteFilters) => {
  let query = supabase.from('websites').select('*');

  // Apply category filter
  if (filters?.category && filters.category !== 'all') {
    console.log('🔍 Applying category filter:', filters.category);
    query = query.eq('category', filters.category);
  }

  // Apply status filter based on user role and context
  if (filters?.status && filters.status !== 'all') {
    console.log('🔍 Applying status filter:', filters.status);
    query = query.eq('status', filters.status);
  } else if (filters?.includeAll) {
    console.log('🔍 Including all websites regardless of status (admin mode)');
    // When includeAll is true, don't filter by status - show all websites
  } else {
    console.log('🔍 Applying default status filter: approved, featured');
    // Default behavior: show only approved/featured for marketplace
    query = query.in('status', ['approved', 'featured']);
  }

  // Apply featured filter
  if (filters?.featured !== undefined) {
    console.log('🔍 Applying featured filter:', filters.featured);
    query = query.eq('is_featured', filters.featured);
  }

  // Apply tags filter
  if (filters?.tags && filters.tags.length > 0) {
    console.log('🔍 Applying tags filter:', filters.tags);
    query = query.overlaps('tags', filters.tags);
  }

  // Apply search filter
  if (filters?.search && filters.search.trim()) {
    const searchTerm = filters.search.trim();
    console.log('🔍 Applying search filter:', searchTerm);
    query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`);
  }

  return query;
};

export const fetchProfilesForWebsites = async (websites: any[]) => {
  if (!websites || websites.length === 0) return websites;

  const now = Date.now();
  const userIds = [...new Set(websites.map(w => w.user_id).filter(Boolean))];
  
  // Filter out cached profiles
  const uncachedUserIds = userIds.filter(id => {
    const timestamp = profileCacheTimestamps.get(id);
    return !timestamp || (now - timestamp) > profileCacheTimeout;
  });

  console.log('🔍 Fetching profiles for user IDs:', uncachedUserIds.length, 'out of', userIds.length);

  if (uncachedUserIds.length === 0) {
    // All profiles are cached, use cached data
    return websites.map(website => ({
      ...website,
      profiles: profileCache.get(website.user_id) || null
    }));
  }

  const { data: profilesData, error: profilesError } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url')
    .in('id', uncachedUserIds);

  if (profilesError) {
    console.warn('⚠️ Error fetching profiles (non-critical):', profilesError);
    return websites;
  }

  console.log('✅ Profiles fetched successfully:', profilesData?.length || 0);
  
  // Update cache with new profiles
  profilesData?.forEach(profile => {
    profileCache.set(profile.id, profile);
    profileCacheTimestamps.set(profile.id, now);
  });
  
  // Merge profiles with websites (use cached data for existing profiles)
  return websites.map(website => ({
    ...website,
    profiles: profileCache.get(website.user_id) || null
  }));
};

export const fetchSingleWebsiteWithProfile = async (websiteData: any) => {
  if (!websiteData || !websiteData.user_id) return websiteData;

  const now = Date.now();
  const userId = websiteData.user_id;
  const timestamp = profileCacheTimestamps.get(userId);

  // Check if profile is cached and not expired
  if (timestamp && (now - timestamp) < profileCacheTimeout && profileCache.has(userId)) {
    return { ...websiteData, profiles: profileCache.get(userId) } as Website;
  }

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url')
    .eq('id', userId)
    .maybeSingle();

  if (!profileError && profileData) {
    // Cache the profile
    profileCache.set(userId, profileData);
    profileCacheTimestamps.set(userId, now);
    return { ...websiteData, profiles: profileData } as Website;
  }

  return websiteData as Website;
};
