# Google Analytics 4 Setup Guide

## ✅ What's Been Implemented

Enterprise-grade Google Analytics 4 tracking has been integrated into your application with the following features:

### Core Tracking
- **Automatic page view tracking** on all route changes
- **Form submission tracking** (success/failure)
- **Button click tracking**
- **Outbound link tracking**
- **Download tracking**
- **Search tracking**
- **Error tracking**
- **Performance timing tracking**

### Files Created/Modified
1. **src/utils/analytics.ts** - Core analytics utilities
2. **src/hooks/usePageTracking.tsx** - Automatic page tracking hook
3. **index.html** - GA4 script tag added
4. **src/main.tsx** - Analytics initialization
5. **src/App.tsx** - Integrated page tracking
6. **src/pages/Contact.tsx** - Form submission tracking example

## 🔧 Setup Steps

### Step 1: Get Your GA4 Measurement ID
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property or use existing one
3. Go to **Admin** → **Data Streams** → Select your web stream
4. Copy your **Measurement ID** (format: G-XXXXXXXXXX)

### Step 2: Update Measurement ID in Your Code
Replace `G-XXXXXXXXXX` in these 2 files:

**File 1: `src/utils/analytics.ts` (line 9)**
```typescript
export const GA_MEASUREMENT_ID = 'G-YOUR-ACTUAL-ID'; // Replace with your actual GA4 Measurement ID
```

**File 2: `index.html` (line 93)**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ACTUAL-ID"></script>
```

### Step 3: Deploy and Test
1. Deploy your application
2. Visit your site and navigate through pages
3. Check Google Analytics **Realtime** view to see events coming in

## 📊 Available Tracking Functions

### Automatic Tracking (Already Implemented)
```typescript
// Page views are tracked automatically on every route change
usePageTracking(); // Already in App.tsx
```

### Manual Event Tracking (Use in Your Components)

```typescript
import { 
  trackEvent, 
  trackButtonClick, 
  trackFormSubmission,
  trackOutboundLink,
  trackDownload,
  trackSearch,
  trackError,
  trackTiming 
} from '@/utils/analytics';

// Track custom events
trackEvent('custom_event_name', { 
  custom_param: 'value' 
});

// Track button clicks
trackButtonClick('signup_button', 'hero_section');

// Track form submissions (already in Contact.tsx)
trackFormSubmission('newsletter_form', true);

// Track external link clicks
trackOutboundLink('https://example.com', 'Learn More');

// Track file downloads
trackDownload('pricing.pdf', 'pdf');

// Track search queries
trackSearch('react tutorial', 10);

// Track errors
trackError('API Error', error.stack);

// Track performance metrics
trackTiming('api_call', 'fetch_users', 1200, 'dashboard');
```

## 🎯 Tracking Examples for Key Areas

### Marketplace Downloads
```typescript
import { trackDownload } from '@/utils/analytics';

const handleDownload = (websiteTitle: string) => {
  trackDownload(websiteTitle, 'website_template');
  // ... rest of download logic
};
```

### CTA Button Clicks
```typescript
import { trackButtonClick } from '@/utils/analytics';

<Button onClick={() => {
  trackButtonClick('get_started_cta', 'hero');
  navigate('/marketplace');
}}>
  Get Started
</Button>
```

### Newsletter Signups
```typescript
import { trackFormSubmission } from '@/utils/analytics';

const handleNewsletterSubmit = async (email: string) => {
  try {
    // ... submit logic
    trackFormSubmission('newsletter_signup', true);
  } catch (error) {
    trackFormSubmission('newsletter_signup', false);
  }
};
```

### Search Functionality
```typescript
import { trackSearch } from '@/utils/analytics';

const handleSearch = (query: string, results: any[]) => {
  trackSearch(query, results.length);
};
```

## 🔍 What You'll See in GA4

Once configured, you'll automatically track:
- **Page views** with URL and title
- **User engagement** time on page, scroll depth
- **Conversions** - form submissions, button clicks
- **User demographics** - location, device, browser
- **Traffic sources** - where users come from
- **Real-time data** - live user activity

## 📈 Recommended GA4 Reports to Set Up

1. **Acquisition Overview** - See where traffic comes from
2. **Engagement > Pages and screens** - Most visited pages
3. **Engagement > Events** - All tracked events (form_submission, button_click, etc.)
4. **Tech > Overview** - Browser, OS, device data
5. **User attributes** - Demographics and interests

## 🚀 Next Steps

1. **Get your GA4 Measurement ID**
2. **Update the 2 files** mentioned above
3. **Deploy your changes**
4. **Verify tracking** in GA4 Realtime view
5. **Add custom tracking** to key user actions using the utility functions

## 🔒 Privacy & GDPR Compliance

Consider adding:
- Cookie consent banner (we can add this next)
- Privacy policy update mentioning analytics
- IP anonymization (already enabled by default in GA4)
- Data retention settings in GA4 admin

## ⚡ Performance Impact

- **Minimal** - GA4 script loads asynchronously
- **Non-blocking** - Won't slow down page load
- **Cached** - Browser caches the GA4 script
- **Optimized** - Only sends data when events occur

---

**Ready to continue? Let me know when you've set up your GA4 Measurement ID, and we can move on to the next item: Error Monitoring!**
