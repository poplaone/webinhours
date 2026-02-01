import { supabase } from '@/integrations/supabase/client';

interface ErrorReport {
  type: 'js_error' | 'resource_error' | 'unhandled_rejection' | 'chunk_load_error';
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// Debounce to prevent flooding
const reportedErrors = new Set<string>();
const MAX_REPORTS_PER_SESSION = 10;
let reportCount = 0;

function getErrorFingerprint(error: ErrorReport): string {
  return `${error.type}:${error.message.slice(0, 100)}`;
}

async function sendErrorReport(report: ErrorReport): Promise<void> {
  // Prevent duplicate reports
  const fingerprint = getErrorFingerprint(report);
  if (reportedErrors.has(fingerprint) || reportCount >= MAX_REPORTS_PER_SESSION) {
    return;
  }
  reportedErrors.add(fingerprint);
  reportCount++;

  try {
    await supabase.functions.invoke('error-reporting', {
      body: report,
    });
  } catch (e) {
    // Silently fail - don't create error loops
    console.warn('[ErrorReporter] Failed to send report:', e);
  }
}

function createErrorReport(
  type: ErrorReport['type'],
  message: string,
  stack?: string,
  metadata?: Record<string, unknown>
): ErrorReport {
  return {
    type,
    message,
    stack,
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
    metadata,
  };
}

export function initErrorReporter(): void {
  // Only run in production
  if (import.meta.env.DEV) {
    console.log('[ErrorReporter] Disabled in development');
    return;
  }

  // Capture unhandled JS errors
  window.addEventListener('error', (event) => {
    // Check if it's a script/resource load error
    if (event.target && (event.target as HTMLElement).tagName) {
      const target = event.target as HTMLElement;
      const src = (target as HTMLScriptElement).src || 
                  (target as HTMLLinkElement).href || 
                  'unknown';
      
      // Detect chunk load failures
      if (src.includes('/assets/') && src.endsWith('.js')) {
        sendErrorReport(createErrorReport(
          'chunk_load_error',
          `Failed to load chunk: ${src}`,
          undefined,
          { src, tagName: target.tagName }
        ));
        return;
      }

      sendErrorReport(createErrorReport(
        'resource_error',
        `Failed to load resource: ${src}`,
        undefined,
        { src, tagName: target.tagName }
      ));
      return;
    }

    // Regular JS error
    sendErrorReport(createErrorReport(
      'js_error',
      event.message || 'Unknown error',
      event.error?.stack,
      { 
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      }
    ));
  }, true); // Capture phase to catch resource errors

  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const message = event.reason?.message || String(event.reason) || 'Unhandled promise rejection';
    const stack = event.reason?.stack;

    // Detect chunk load failures in dynamic imports
    if (message.includes('Failed to fetch dynamically imported module') ||
        message.includes('Loading chunk') ||
        message.includes('MIME type')) {
      sendErrorReport(createErrorReport(
        'chunk_load_error',
        message,
        stack,
        { reason: String(event.reason) }
      ));
      return;
    }

    sendErrorReport(createErrorReport(
      'unhandled_rejection',
      message,
      stack
    ));
  });

  console.log('[ErrorReporter] Initialized for production');
}

// Export for manual error reporting if needed
export function reportError(
  type: ErrorReport['type'],
  message: string,
  metadata?: Record<string, unknown>
): void {
  sendErrorReport(createErrorReport(type, message, undefined, metadata));
}
