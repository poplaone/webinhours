// Cookie Consent Management Utility - Google Consent Mode v2 Compliant
// Supports GDPR, CCPA, and future Google requirements

export interface ConsentPreferences {
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: string;
  version: string;
}

// All Google Consent Mode v2 consent types
export interface GoogleConsentState {
  analytics_storage: 'granted' | 'denied';
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
  functionality_storage: 'granted' | 'denied';
  personalization_storage: 'granted' | 'denied';
  security_storage: 'granted' | 'denied';
}

const CONSENT_KEY = 'cookie-consent-preferences';
const CONSENT_VERSION = '2.0'; // Updated for Consent Mode v2

// Get current consent preferences
export const getConsentPreferences = (): ConsentPreferences | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    
    const preferences = JSON.parse(stored) as ConsentPreferences;
    return preferences;
  } catch {
    return null;
  }
};

// Check if user has given any consent decision
export const hasConsentDecision = (): boolean => {
  return getConsentPreferences() !== null;
};

// Check if analytics consent is granted
export const hasAnalyticsConsent = (): boolean => {
  const preferences = getConsentPreferences();
  return preferences?.analytics === true;
};

// Check if marketing consent is granted
export const hasMarketingConsent = (): boolean => {
  const preferences = getConsentPreferences();
  return preferences?.marketing === true;
};

// Check if functional consent is granted
export const hasFunctionalConsent = (): boolean => {
  const preferences = getConsentPreferences();
  return preferences?.functional !== false; // Default to true if not set
};

// Convert our preferences to Google Consent Mode v2 format
export const toGoogleConsentState = (preferences: ConsentPreferences): GoogleConsentState => {
  return {
    analytics_storage: preferences.analytics ? 'granted' : 'denied',
    ad_storage: preferences.marketing ? 'granted' : 'denied',
    ad_user_data: preferences.marketing ? 'granted' : 'denied',
    ad_personalization: preferences.marketing ? 'granted' : 'denied',
    functionality_storage: preferences.functional ? 'granted' : 'denied',
    personalization_storage: preferences.analytics ? 'granted' : 'denied',
    security_storage: 'granted', // Always granted for security
  };
};

// Save consent preferences
export const saveConsentPreferences = (preferences: Omit<ConsentPreferences, 'timestamp' | 'version' | 'essential'>): void => {
  if (typeof window === 'undefined') return;
  
  const fullPreferences: ConsentPreferences = {
    essential: true, // Always true
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    functional: preferences.functional ?? true,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  
  localStorage.setItem(CONSENT_KEY, JSON.stringify(fullPreferences));
  
  // Update Google Consent Mode v2
  updateGoogleConsent(fullPreferences);
  
  // Dispatch custom event for other scripts to listen to
  window.dispatchEvent(new CustomEvent('consentUpdate', { 
    detail: fullPreferences 
  }));
  
  // If analytics is granted, load GA
  if (fullPreferences.analytics) {
    loadGoogleAnalytics();
  }
};

// Accept all cookies
export const acceptAllCookies = (): void => {
  saveConsentPreferences({
    analytics: true,
    marketing: true,
    functional: true,
  });
};

// Decline optional cookies (only essential)
export const declineOptionalCookies = (): void => {
  saveConsentPreferences({
    analytics: false,
    marketing: false,
    functional: true, // Keep functional for basic features
  });
};

// Clear consent (for testing or user request)
export const clearConsent = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONSENT_KEY);
  
  // Reset Google Consent Mode to denied
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
    });
  }
};

// Update Google Consent Mode v2 - Full implementation
export const updateGoogleConsent = (preferences: ConsentPreferences): void => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  
  const googleConsent = toGoogleConsentState(preferences);
  
  // Push consent update to dataLayer for GTM compatibility
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'consent_update',
    consent_analytics: preferences.analytics,
    consent_marketing: preferences.marketing,
    consent_functional: preferences.functional,
    consent_timestamp: preferences.timestamp,
  });
  
  // Update Google Consent Mode v2
  window.gtag('consent', 'update', googleConsent);
  
  // Log for debugging (remove in production if needed)
  console.log('[Consent Mode v2] Updated:', googleConsent);
};

// Dynamically load Google Analytics script
export const loadGoogleAnalytics = (): void => {
  if (typeof window === 'undefined') return;
  
  // Check if already loaded
  if (document.querySelector('script[src*="googletagmanager.com/gtag"]')) {
    return;
  }
  
  const script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-3PC11MVZFP';
  script.async = true;
  document.head.appendChild(script);
  
  script.onload = () => {
    // Re-initialize gtag after script loads
    if (typeof window.gtag === 'function') {
      window.gtag('js', new Date());
      window.gtag('config', 'G-3PC11MVZFP', {
        send_page_view: false,
        cookie_flags: 'SameSite=None;Secure',
      });
    }
  };
};

// Initialize consent mode with defaults (called early in page load)
// Note: This is now primarily handled in index.html for earlier execution
export const initializeConsentMode = (): void => {
  if (typeof window === 'undefined') return;
  
  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  
  // Define gtag function if not exists
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      window.dataLayer?.push(arguments);
    };
  }
  
  // Check if user has already given consent and apply it
  const preferences = getConsentPreferences();
  if (preferences) {
    updateGoogleConsent(preferences);
    if (preferences.analytics) {
      loadGoogleAnalytics();
    }
  }
};

// Get human-readable consent status for UI
export const getConsentStatusText = (): string => {
  const preferences = getConsentPreferences();
  if (!preferences) return 'No consent given';
  
  const parts: string[] = [];
  if (preferences.analytics) parts.push('Analytics');
  if (preferences.marketing) parts.push('Marketing');
  if (preferences.functional) parts.push('Functional');
  
  if (parts.length === 0) return 'Essential only';
  return parts.join(', ');
};

// Check if consent needs to be refreshed (e.g., version change)
export const needsConsentRefresh = (): boolean => {
  const preferences = getConsentPreferences();
  if (!preferences) return true;
  
  // Check if consent version has changed
  if (preferences.version !== CONSENT_VERSION) return true;
  
  // Check if consent is older than 13 months (GDPR requirement)
  const consentDate = new Date(preferences.timestamp);
  const thirteenMonthsAgo = new Date();
  thirteenMonthsAgo.setMonth(thirteenMonthsAgo.getMonth() - 13);
  
  return consentDate < thirteenMonthsAgo;
};

// Export type for window augmentation
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}
