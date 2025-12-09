# Caching Strategy Guide

## Overview
This application implements a comprehensive caching strategy to achieve optimal performance scores and reduce bandwidth usage.

## Multi-Layer Caching Approach

### 1. HTTP Cache Headers (Server-Level)
We've configured HTTP Cache-Control headers via multiple configuration files:

- **`public/_headers`** - Generic header configuration
- **`public/netlify.toml`** - Netlify-specific configuration
- **`public/vercel.json`** - Vercel-specific configuration

### 2. Service Worker Cache (Browser-Level)
Implemented in `public/sw.js` with aggressive caching strategies:

- **Static Assets**: 1 year cache lifetime (365 days)
- **Runtime Data**: 1 week cache lifetime
- **API Responses**: 5 minutes cache lifetime

## Cache Durations by Asset Type

| Asset Type | Duration | Rationale |
|------------|----------|-----------|
| `/assets/js/*` | 1 year (immutable) | Vite generates content-hashed filenames |
| `/assets/css/*` | 1 year (immutable) | Content-hashed, safe for long caching |
| `/assets/fonts/*` | 1 year (immutable) | Fonts rarely change |
| `/assets/images/*` | 30 days | Images may be updated periodically |
| HTML pages | 1 hour + revalidate | Always fetch latest content |

## Why "immutable"?

The `immutable` directive tells browsers that this file will never change. Since Vite includes content hashes in filenames (e.g., `vendor-misc-CURIemhw.js`), any code change results in a new filename, making the old file truly immutable.

## Performance Benefits

With proper caching in place:
- **191 KB saved** on repeat visits (per Lighthouse audit)
- **Faster page loads** - cached assets load instantly
- **Reduced bandwidth** - fewer server requests
- **Better user experience** - near-instant navigation

## Monitoring Cache Performance

Use browser DevTools → Network tab:
1. Load page once (all resources downloaded)
2. Reload page
3. Check "Size" column - should show "(disk cache)" or "(memory cache)"

## Troubleshooting

If assets aren't caching:
1. Check that your hosting platform supports one of the configuration files
2. Verify Service Worker is registered (DevTools → Application → Service Workers)
3. Clear browser cache and test again
4. Run Lighthouse audit to verify cache headers are present

## Cache Invalidation

When you deploy new code:
- New hashed filenames ensure fresh content
- Service Worker updates automatically
- HTML is always revalidated
- Users get new code without manual cache clearing
