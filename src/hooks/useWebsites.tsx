
// Re-export everything for backward compatibility
export * from '@/types/website';
export * from './useAdmin';
export * from './useWebsiteQueries';
export * from './useWebsiteMutations';

// Export the main hooks directly for convenience
export { useWebsites, useUserWebsites, useWebsiteById } from './useWebsiteQueries';
