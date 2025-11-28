// Google Analytics 4 integration with enterprise-grade tracking

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 Measurement ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return;
  
  // Create dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || [];
  
  // Define gtag function
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };
  
  // Initialize with timestamp
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll manually track page views for SPA
  });
};

// Track page view
export const trackPageView = (url: string, title?: string) => {
  if (typeof window.gtag === 'undefined') return;
  
  window.gtag('event', 'page_view', {
    page_path: url,
    page_title: title || document.title,
  });
};

// Track custom events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window.gtag === 'undefined') return;
  
  window.gtag('event', eventName, eventParams);
};

// Track form submissions
export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent('form_submission', {
    form_name: formName,
    success: success,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location,
  });
};

// Track outbound links
export const trackOutboundLink = (url: string, linkText?: string) => {
  trackEvent('outbound_link_click', {
    url: url,
    link_text: linkText,
  });
};

// Track downloads
export const trackDownload = (fileName: string, fileType?: string) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
  });
};

// Track search
export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

// Track errors
export const trackError = (errorMessage: string, errorStack?: string) => {
  trackEvent('error', {
    error_message: errorMessage,
    error_stack: errorStack,
  });
};

// Track timing (for performance monitoring)
export const trackTiming = (
  category: string,
  variable: string,
  value: number,
  label?: string
) => {
  trackEvent('timing_complete', {
    name: variable,
    value: value,
    event_category: category,
    event_label: label,
  });
};
