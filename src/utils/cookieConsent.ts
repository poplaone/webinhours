// Cookie Consent Management Utility - GDPR/CCPA Compliant

export interface ConsentPreferences {
  essential: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
}

const CONSENT_KEY = 'cookie-consent-preferences';
const CONSENT_VERSION = '1.0';

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

// Save consent preferences
export const saveConsentPreferences = (preferences: Omit<ConsentPreferences, 'timestamp' | 'version' | 'essential'>): void => {
  if (typeof window === 'undefined') return;
  
  const fullPreferences: ConsentPreferences = {
    essential: true, // Always true
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  
  localStorage.setItem(CONSENT_KEY, JSON.stringify(fullPreferences));
  
  // Update Google Consent Mode
  updateGoogleConsent(fullPreferences);
  
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
  });
};

// Decline optional cookies (only essential)
export const declineOptionalCookies = (): void => {
  saveConsentPreferences({
    analytics: false,
    marketing: false,
  });
};

// Clear consent (for testing or user request)
export const clearConsent = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONSENT_KEY);
};

// Update Google Consent Mode v2
export const updateGoogleConsent = (preferences: ConsentPreferences): void => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  
  window.gtag('consent', 'update', {
    analytics_storage: preferences.analytics ? 'granted' : 'denied',
    ad_storage: preferences.marketing ? 'granted' : 'denied',
    ad_user_data: preferences.marketing ? 'granted' : 'denied',
    ad_personalization: preferences.marketing ? 'granted' : 'denied',
  });
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
};

// Initialize consent mode with defaults (called early in page load)
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
  
  // Set default consent to denied
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500, // Wait for consent decision
  });
  
  // Check if user has already given consent
  const preferences = getConsentPreferences();
  if (preferences) {
    updateGoogleConsent(preferences);
    if (preferences.analytics) {
      loadGoogleAnalytics();
    }
  }
};
