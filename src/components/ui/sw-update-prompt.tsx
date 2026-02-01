import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface WindowEventMap {
    'sw-update-available': CustomEvent;
  }
}

export function SWUpdatePrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Check if service worker is supported
    if (!('serviceWorker' in navigator)) return;

    const handleSWUpdate = (reg: ServiceWorkerRegistration) => {
      setRegistration(reg);
      setShowPrompt(true);
    };

    // Listen for SW updates
    const checkForUpdates = async () => {
      try {
        const reg = await navigator.serviceWorker.getRegistration();
        if (!reg) return;

        // Check for waiting worker (update available)
        if (reg.waiting) {
          handleSWUpdate(reg);
          return;
        }

        // Listen for new updates
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available
              handleSWUpdate(reg);
            }
          });
        });

        // Periodically check for updates (every 5 minutes)
        const interval = setInterval(() => {
          reg.update().catch(() => {});
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error('SW update check failed:', error);
      }
    };

    // Listen for custom event from SW
    const handleCustomEvent = () => {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) handleSWUpdate(reg);
      });
    };

    window.addEventListener('sw-update-available', handleCustomEvent);
    
    // Handle controller change (when SW takes over)
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });

    checkForUpdates();

    return () => {
      window.removeEventListener('sw-update-available', handleCustomEvent);
    };
  }, []);

  const handleUpdate = () => {
    if (!registration?.waiting) {
      // No waiting worker, just reload
      window.location.reload();
      return;
    }

    // Tell the waiting SW to skip waiting and become active
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div 
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-in slide-in-from-bottom-4 duration-300"
      role="alert"
      aria-live="polite"
    >
      <div className="bg-card border border-border rounded-lg shadow-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground">
              New Version Available
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              A new version of WebInHours is ready. Refresh to get the latest features and fixes.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Button 
                size="sm" 
                onClick={handleUpdate}
                className="gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh Now
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={handleDismiss}
              >
                Later
              </Button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 rounded-md hover:bg-muted transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
