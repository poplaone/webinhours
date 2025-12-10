import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { X, Cookie, Settings, Shield, BarChart3, Megaphone, Cog } from 'lucide-react';
import {
  hasConsentDecision,
  getConsentPreferences,
  acceptAllCookies,
  declineOptionalCookies,
  saveConsentPreferences,
  needsConsentRefresh,
  type ConsentPreferences,
} from '@/utils/cookieConsent';

interface CookieConsentProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export const CookieConsent = ({ forceOpen = false, onClose }: CookieConsentProps) => {
  const [showConsent, setShowConsent] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const [functionalEnabled, setFunctionalEnabled] = useState(true);

  useEffect(() => {
    if (forceOpen) {
      // Load existing preferences when opening preferences modal
      const preferences = getConsentPreferences();
      if (preferences) {
        setAnalyticsEnabled(preferences.analytics);
        setMarketingEnabled(preferences.marketing);
        setFunctionalEnabled(preferences.functional ?? true);
      }
      setShowConsent(true);
      setShowPreferences(true);
      return;
    }

    // Show if no consent decision or consent needs refresh
    if (!hasConsentDecision() || needsConsentRefresh()) {
      setShowConsent(true);
    }
  }, [forceOpen]);

  const handleAcceptAll = () => {
    acceptAllCookies();
    setShowConsent(false);
    onClose?.();
  };

  const handleDecline = () => {
    declineOptionalCookies();
    setShowConsent(false);
    onClose?.();
  };

  const handleSavePreferences = () => {
    saveConsentPreferences({
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
      functional: functionalEnabled,
    });
    setShowConsent(false);
    setShowPreferences(false);
    onClose?.();
  };

  const handleClose = () => {
    if (forceOpen) {
      setShowConsent(false);
      onClose?.();
    } else {
      // If first time, treat close as decline
      handleDecline();
    }
  };

  if (!showConsent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-background/50 backdrop-blur-sm">
      <Card className="w-full max-w-lg bg-background border shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {showPreferences ? 'Cookie Preferences' : 'We Value Your Privacy'}
                </h3>
                <p className="text-xs text-muted-foreground">
                  GDPR & CCPA Compliant
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 -mt-1 -mr-2"
              onClick={handleClose}
              aria-label="Close cookie consent"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {showPreferences ? (
            /* Preferences View */
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Customize which cookies you want to allow. We use Google Consent Mode v2 to ensure your preferences are respected across all Google services.
              </p>

              {/* Essential Cookies - Always On */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-green-500 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Essential Cookies</p>
                    <p className="text-xs text-muted-foreground">Required for site functionality</p>
                  </div>
                </div>
                <Switch checked disabled className="data-[state=checked]:bg-green-500" />
              </div>

              {/* Functional Cookies */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Cog className="h-4 w-4 text-blue-500 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Functional Cookies</p>
                    <p className="text-xs text-muted-foreground">Enhanced features & preferences</p>
                  </div>
                </div>
                <Switch
                  checked={functionalEnabled}
                  onCheckedChange={setFunctionalEnabled}
                />
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-4 w-4 text-purple-500 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Analytics Cookies</p>
                    <p className="text-xs text-muted-foreground">Help us improve our website (GA4)</p>
                  </div>
                </div>
                <Switch
                  checked={analyticsEnabled}
                  onCheckedChange={setAnalyticsEnabled}
                />
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Megaphone className="h-4 w-4 text-orange-500 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Marketing Cookies</p>
                    <p className="text-xs text-muted-foreground">Personalized ads (Google Ads)</p>
                  </div>
                </div>
                <Switch
                  checked={marketingEnabled}
                  onCheckedChange={setMarketingEnabled}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button onClick={handleSavePreferences} className="flex-1">
                  Save Preferences
                </Button>
                <Button onClick={handleAcceptAll} variant="outline" className="flex-1">
                  Accept All
                </Button>
              </div>
            </div>
          ) : (
            /* Initial Banner View */
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking "Accept All", you consent to our use of cookies.{' '}
                <a href="/privacy" className="underline hover:text-primary">
                  Privacy Policy
                </a>
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleAcceptAll} className="flex-1">
                  Accept All
                </Button>
                <Button onClick={handleDecline} variant="outline" className="flex-1">
                  Reject All
                </Button>
                <Button
                  onClick={() => setShowPreferences(true)}
                  variant="ghost"
                  className="flex-1 gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Customize
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

// Hook to open cookie preferences from anywhere
export const useCookiePreferences = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPreferences = () => setIsOpen(true);
  const closePreferences = () => setIsOpen(false);

  return {
    isOpen,
    openPreferences,
    closePreferences,
    PreferencesModal: isOpen ? (
      <CookieConsent forceOpen onClose={closePreferences} />
    ) : null,
  };
};
