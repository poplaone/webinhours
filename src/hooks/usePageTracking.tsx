import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/utils/analytics';
import { hasAnalyticsConsent } from '@/utils/cookieConsent';

// Hook to automatically track page views on route changes (consent-aware)
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Only track if user has given analytics consent
    if (hasAnalyticsConsent()) {
      trackPageView(location.pathname + location.search);
    }
  }, [location]);
};
