// Google Analytics 4 integration with GDPR-compliant consent handling

import { hasAnalyticsConsent } from './cookieConsent';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_MEASUREMENT_ID = 'G-3PC11MVZFP';

// Check if tracking is allowed
const canTrack = (): boolean => {
  if (typeof window === 'undefined') return false;
  return hasAnalyticsConsent();
};

// Initialize Google Analytics (only if consent given)
export const initGA = () => {
  if (typeof window === 'undefined') return;
  
  // dataLayer and gtag should already be initialized in index.html
  window.dataLayer = window.dataLayer || [];
  
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      window.dataLayer?.push(arguments);
    };
  }
  
  // Only send config if consent is given
  if (canTrack()) {
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false,
      custom_map: {
        'dimension1': 'content_type',
        'dimension2': 'author_name',
        'dimension3': 'ai_source',
      }
    });
  }
};

// Track page view (consent-aware)
export const trackPageView = (url: string, title?: string) => {
  if (!canTrack() || typeof window.gtag !== 'function') return;
  
  window.gtag('event', 'page_view', {
    page_path: url,
    page_title: title || document.title,
  });
};

// Track custom events (consent-aware)
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (!canTrack() || typeof window.gtag !== 'function') return;
  
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

// ============================================
// GEO-SPECIFIC TRACKING FOR AI MEASUREMENT
// ============================================

// Track AI/LLM referral traffic
export const trackAIReferral = (source: string, query?: string) => {
  trackEvent('ai_referral', {
    ai_source: source,
    ai_query: query,
    event_category: 'geo_tracking',
  });
};

// Track content citation
export const trackContentCitation = (
  contentType: string,
  contentId: string,
  contentTitle: string
) => {
  trackEvent('content_citation_opportunity', {
    content_type: contentType,
    content_id: contentId,
    content_title: contentTitle,
    event_category: 'geo_tracking',
  });
};

// Track structured data interactions
export const trackStructuredDataView = (schemaType: string, pageUrl: string) => {
  trackEvent('structured_data_view', {
    schema_type: schemaType,
    page_url: pageUrl,
    event_category: 'geo_tracking',
  });
};

// Track featured snippet candidate content views
export const trackFeaturedSnippetView = (
  question: string,
  answerPreview: string
) => {
  trackEvent('featured_snippet_view', {
    question: question,
    answer_preview: answerPreview.substring(0, 100),
    event_category: 'geo_tracking',
  });
};

// Track blog post engagement for GEO
export const trackBlogEngagement = (
  postSlug: string,
  authorName: string,
  readPercentage: number,
  timeOnPage: number
) => {
  trackEvent('blog_engagement', {
    post_slug: postSlug,
    author_name: authorName,
    read_percentage: readPercentage,
    time_on_page: timeOnPage,
    event_category: 'geo_tracking',
  });
};

// Track testimonial views (E-E-A-T signal)
export const trackTestimonialView = (
  testimonialId: string,
  authorName: string,
  company: string
) => {
  trackEvent('testimonial_view', {
    testimonial_id: testimonialId,
    author_name: authorName,
    company: company,
    event_category: 'eeat_signals',
  });
};

// Track conversion from AI-referred traffic
export const trackAIConversion = (
  conversionType: string,
  aiSource: string,
  value?: number
) => {
  trackEvent('ai_conversion', {
    conversion_type: conversionType,
    ai_source: aiSource,
    conversion_value: value,
    event_category: 'geo_tracking',
  });
};

// Track schema.org implementation effectiveness
export const trackSchemaPerformance = (
  schemaType: string,
  isValid: boolean,
  errorCount?: number
) => {
  trackEvent('schema_performance', {
    schema_type: schemaType,
    is_valid: isValid,
    error_count: errorCount || 0,
    event_category: 'geo_tracking',
  });
};

// Detect AI/LLM referrer and track automatically
export const detectAndTrackAIReferrer = () => {
  if (typeof window === 'undefined' || !canTrack()) return null;
  
  const referrer = document.referrer.toLowerCase();
  const urlParams = new URLSearchParams(window.location.search);
  
  const aiSources: Record<string, string | null> = {
    'chat.openai.com': 'chatgpt',
    'chatgpt.com': 'chatgpt',
    'perplexity.ai': 'perplexity',
    'claude.ai': 'claude',
    'bard.google.com': 'google_bard',
    'gemini.google.com': 'google_gemini',
    'you.com': 'you_ai',
    'phind.com': 'phind',
    'bing.com': referrer.includes('chat') ? 'bing_copilot' : null,
  };
  
  for (const [domain, source] of Object.entries(aiSources)) {
    if (source && referrer.includes(domain)) {
      trackAIReferral(source, urlParams.get('q') || undefined);
      return source;
    }
  }
  
  if (referrer.includes('google.com') && urlParams.get('source') === 'ai') {
    trackAIReferral('google_ai_overview', urlParams.get('q') || undefined);
    return 'google_ai_overview';
  }
  
  return null;
};

// Track Core Web Vitals for performance
export const trackWebVitals = () => {
  if (typeof window === 'undefined' || !canTrack()) return;
  
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    trackTiming('web_vitals', 'LCP', Math.round(lastEntry.startTime));
  });
  
  try {
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    // Browser doesn't support this observer
  }
  
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      if (entry.processingStart) {
        trackTiming('web_vitals', 'FID', Math.round(entry.processingStart - entry.startTime));
      }
    });
  });
  
  try {
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    // Browser doesn't support this observer
  }
  
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
      }
    });
  });
  
  try {
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        trackTiming('web_vitals', 'CLS', Math.round(clsValue * 1000));
      }
    });
  } catch (e) {
    // Browser doesn't support this observer
  }
};
