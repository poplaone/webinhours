# WebInHour Codebase Index
*Last Updated: July 2026*

## Overview
WebInHour is a React/Vite application for fast business web presence launches. The public site currently combines website templates, custom web presence packages, contact lead capture, blog/SEO content, and an admin-managed website marketplace.

Current positioning in the homepage code is shifting from website-only toward complete online presence:
- professional website
- Google Business setup
- social media content
- local SEO / GEO
- ongoing content and visibility support

## Stack
- Frontend: React 18, TypeScript, Vite, React Router
- Styling: Tailwind CSS, shadcn/ui-style primitives, custom CSS in `src/index.css`
- State/data: TanStack React Query, Supabase client, local React state
- SEO: `react-helmet-async`, structured data components, generated sitemap, prerender script
- Backend: Supabase database/auth plus Edge Functions
- Build: `vite build`, followed by `scripts/generate-sitemap.js` and `scripts/prerender.mjs`

## Commands
```bash
npm run dev        # Start Vite dev server
npm run build      # Production build + sitemap + prerender
npm run build:dev  # Development-mode Vite build
npm run lint       # ESLint
npm run preview    # Preview production build
```

## App Entry And Routing
- `src/main.tsx` mounts the React app.
- `src/App.tsx` defines providers, layout background, lazy routes, protected/admin routes, and app-wide suspense fallback.
- `scripts/routes.mjs` is the crawlable route source of truth for sitemap and prerender.

Public/static routes:
- `/`
- `/about`
- `/services`
- `/contact`
- `/contact/confirmation`
- `/faq`
- `/how-it-works`
- `/pricing`
- `/privacy`
- `/terms`
- `/websites`
- `/calculator`
- `/blog`
- `/blog/:slug`
- `/site/:slugOrId`
- `/24-hour-website`
- `/same-day-delivery`

Special routes:
- `/marketplace` redirects to `/websites`
- `/profile` is wrapped in `ProtectedRoute`
- `/admin-panel` is wrapped in `AdminRoute`
- `*` renders `NotFound`

## Homepage
Main file: `src/pages/Index.tsx`

Homepage flow:
1. `Hero`
2. `Services`
3. `Features`
4. Testimonials marquee
5. `Footer`

SEO on the homepage is currently set to:
- title: complete web presence in hours
- description: website, Google Business, social media content, and SEO packages
- canonical: `https://webinhour.com/`

## Key Sections
`src/components/sections/Hero.tsx`
- Keeps the original visual hero layout with side preview images, center framed copy, mobile card slider, and logo marquee.
- Copy now targets complete online presence rather than website-only delivery.
- Uses `HeroEmailCapture` for inline lead capture.
- Secondary CTA scrolls to `#services`.

`src/components/forms/HeroEmailCapture.tsx`
- Validates email with `zod`.
- Submits to Supabase Edge Function `send-contact-email`.
- Sends minimal lead data using `projectType: Hero Email Capture`.
- Navigates to `/contact/confirmation?email=...&type=lead` on success.

`src/components/sections/Services.tsx`
- Contains the homepage web-presence offer explanation.
- Current setup items:
  - Professional website
  - Google Business setup
  - Social media content
  - SEO and local visibility
- Current package cards:
  - Presence Starter
  - Social Content Package
  - SEO & Local Growth
- Renders `CombinedFeaturedSection` below package cards.

`src/components/ui/combined-featured-section.tsx`
- Larger supporting grid for local visibility, search/maps, content production, presence care, and reputation signals.

`src/pages/Services.tsx`
- Dedicated `/services` page.
- Lazy-loads `PremiumMarketplaceServices`.
- Includes SEO metadata and footer.

`src/components/sections/PremiumMarketplaceServices.tsx`
- Full premium services marketplace component.
- Lives off the homepage on `/services`.

## Layout And Navigation
`src/components/layout/AppLayout.tsx`
- Main app shell used by pages.

`src/components/sections/Header.tsx`
- Desktop/mobile header navigation.
- Contains direct links and menu structures.

`src/components/layout/MobileBottomNav.tsx`
- Mobile bottom navigation.

`src/components/layout/MobileServicesDrawer.tsx`
- Mobile services drawer.

`src/components/sections/Footer.tsx`
- Site footer.

## Marketplace And Website Data
`src/pages/Marketplace.tsx`
- Main `/websites` marketplace page.
- Lazy-loads filters, grid, CTA, and live chat support.

`src/components/dashboard/TemplateGrid.tsx`
- Website/template grid display.

`src/pages/SiteDetails.tsx`
- Detail page for `/site/:slugOrId`.

`src/types/website.ts`
- Website entity types.

Website data helpers:
- `src/utils/websiteDataUtils.ts`
- `src/hooks/queries/useWebsitesQuery.tsx`
- `src/hooks/queries/useWebsiteByIdQuery.tsx`
- `src/hooks/queries/useUserWebsitesQuery.tsx`
- `src/hooks/queries/usePrefetchMarketplace.tsx`
- `src/hooks/queries/usePrefetchSiteDetails.tsx`

## Admin
`src/pages/AdminPanel.tsx`
- Admin interface shell.

Admin components live under:
- `src/components/admin/`
- `src/components/admin/upload-form/`
- `src/components/admin/edit-form/`

Major admin areas:
- website upload/edit/review
- pending reviews
- live support
- tags manager
- admin stats

## Auth And Profiles
Auth:
- `src/hooks/useAuth.tsx`
- `src/components/ProtectedRoute.tsx`
- `src/components/AdminRoute.tsx`
- `src/pages/Auth.tsx`

Profiles:
- `src/pages/Profile.tsx`
- `src/components/profile/`
- `src/hooks/useProfiles.tsx`

## SEO And Prerendering
SEO components:
- `src/components/seo/SEOHead.tsx`
- `src/components/seo/StructuredData.tsx`
- `src/components/seo/GEOStructuredData.tsx`
- `src/components/seo/FAQSchema.tsx`

Route generation:
- `scripts/routes.mjs`
- `scripts/generate-sitemap.js`
- `scripts/prerender.mjs`

Generated/served SEO assets:
- `public/sitemap.xml`
- `public/robots.txt`
- `public/llms.txt`
- `public/og-image.png`

Build behavior:
- `npm run build` runs Vite.
- `postbuild` writes sitemap to `public/` and `dist/`.
- `postbuild` prerenders all routes from `scripts/routes.mjs` plus blog slugs from `src/data/blog-posts.json`.

## Blog
Routes:
- `/blog`
- `/blog/:slug`

Files:
- `src/pages/Blog/BlogIndex.tsx`
- `src/pages/Blog/BlogPost.tsx`
- `src/data/blog-posts.json`
- `src/data/blog-posts.ts`
- `public/assets/blog/`

## Supabase
Client:
- `src/integrations/supabase/client.ts`
- `src/integrations/supabase/types.ts`

Config:
- `supabase/config.toml`

Edge Functions:
- `supabase/functions/send-contact-email/index.ts`
- `supabase/functions/live-support-notification/index.ts`
- `supabase/functions/error-reporting/index.ts`

Email templates:
- `supabase/functions/send-contact-email/_templates/admin-notification.tsx`
- `supabase/functions/send-contact-email/_templates/user-confirmation.tsx`

Migrations:
- `supabase/migrations/`

Operational note:
- Lead email delivery depends on Supabase function secrets such as `RESEND_API_KEY` and `ADMIN_EMAIL`, then deploying `send-contact-email`.

## Styling And UI
Global styles:
- `src/index.css`
- Hero-specific `.wih-hero-*` classes live in `src/index.css`.

UI primitives:
- `src/components/ui/`

Common visual systems:
- shadcn-style primitives
- custom animated cards
- custom marketplace grid
- text shuffle / text rotate utilities
- theme toggle and dark mode via `ThemeContext`

## Public Assets
Key directories/files:
- `public/assets/` hero/template images
- `public/assets/blog/` blog images
- `public/uploads/` uploaded preview asset(s)
- `src/assets/` imported assets used in sections
- `public/sw.js` service worker
- `public/manifest.json`
- `public/_headers`

## Current Worktree Notes
Recent active direction:
- homepage and SEO copy are moving toward web presence packages
- `/services` hosts the full premium services marketplace
- homepage package cards are focused on presence, content, and local SEO
- `LogoMarquee.tsx` is currently restored to the original tech-logo marquee

When changing the homepage, preserve the user’s preference:
- keep the original hero UI layout
- change content/copy only unless explicitly asked for UI redesign

## Removed Or Deprecated From Older Index
The old index referenced several stale concepts/files. Current repo state does not include:
- `src/components/sections/MarketplacePreview.tsx`
- AI agent marketplace types/hooks/components from older docs
- `src/hooks/usePerformanceMonitor.tsx`
- `public/lovable-uploads/`

Use `rg --files` and `src/App.tsx` as the source of truth when this document drifts.
