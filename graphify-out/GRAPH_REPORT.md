# Graph Report - webinhours  (2026-07-10)

## Corpus Check
- 293 files · ~628,176 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1714 nodes · 3038 edges · 177 communities (94 shown, 83 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f5667ea1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- analytics.ts
- PremiumServicesModal.tsx
- FREE WEBSITE CONTENT STRATEGY
- user-confirmation.tsx
- 📱 Mobile Performance Optimizations - Complete Guide
- Site-wide / Shared Layer (affects all pages)
- button.tsx
- WebsiteEditForm.tsx
- card.tsx
- sidebar.tsx
- useAuth.tsx
- 🚀 Marketplace Performance Optimization Guide
- useAuth
- Header.tsx
- App.tsx
- animated-service-card.tsx
- use-toast.ts
- admin-notification.tsx
- ⚡ Site Details Page - Lightning Fast Performance
- compilerOptions
- ProjectCalculator.tsx
- premium-testimonials.tsx
- cn
- Index.tsx
- Profile.tsx
- AppLayout.tsx
- Hero.tsx
- CHAT UI ANIMATIONS - MICRO-SYNTAX
- Contact.tsx
- utils.ts
- formValidation.ts
- performanceUtils.ts
- WebInHour Codebase Index
- compilerOptions
- FastMarketplace.tsx
- dependencies
- components.json
- Free Templates vs. Custom Design: Stop Wasting Money on Your First Website
- input.tsx
- MobileBottomNav.tsx
- combined-featured-section.tsx
- GEO Optimization: Why ChatGPT is Ignoring Your Website
- Website in 24 Hours: How Same-Day Web Development Actually Works
- performanceOptimizer.ts
- Website
- Find Skills
- prerender.mjs
- useIsAdmin
- pagination.tsx
- useProfiles.tsx
- compilerOptions
- carousel.tsx
- SKILL.md
- Google Analytics 4 Setup Guide
- ⚡ Marketplace Performance - Quick Start Guide
- hooks.ts
- devDependencies
- Caching Strategy Guide
- MyWebsitesTable.tsx
- MobileServicesDrawer.tsx
- BlogIndex.tsx
- alert.tsx
- index.ts
- README.md
- sw.js
- AdminControls.tsx
- sheet.tsx
- ThemeContext.tsx
- manifest.json
- errorReporter.ts
- scripts
- Pricing — WebInHour
- compare.tsx
- ErrorBoundary
- index.ts
- StructuredData.tsx
- grid-feature-cards.tsx
- vercel.json
- 🎯 Tracking Examples for Key Areas
- package.json
- FAQSchema.tsx
- 🔧 Setup Steps
- **🚀 IMMEDIATE BENEFITS (Already Active!)**
- **💡 OPTIONAL ENHANCEMENTS**
- sw-update-prompt.tsx
- MarketplaceHeader.tsx
- marquee.tsx
- sonner.tsx
- StatsSection.tsx
- TestimonialCard.tsx
- TestimonialCarousel.tsx
- RotatingServices.tsx
- trust-signals.tsx
- index.ts
- class-variance-authority
- clsx
- date-fns
- dotted-map
- eslint
- @eslint/js
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- framer-motion
- globals
- gsap
- @gsap/react
- @hookform/resolvers
- input-otp
- lucide-react
- .mcp.json
- next-themes
- @radix-ui/react-accordion
- @radix-ui/react-avatar
- @radix-ui/react-checkbox
- @radix-ui/react-collapsible
- @radix-ui/react-context-menu
- @radix-ui/react-dialog
- @radix-ui/react-dropdown-menu
- @radix-ui/react-hover-card
- @radix-ui/react-label
- @radix-ui/react-menubar
- @radix-ui/react-navigation-menu
- @radix-ui/react-popover
- @radix-ui/react-progress
- @radix-ui/react-radio-group
- @radix-ui/react-scroll-area
- @radix-ui/react-select
- @radix-ui/react-separator
- @radix-ui/react-slider
- @radix-ui/react-slot
- @radix-ui/react-tabs
- @radix-ui/react-toast
- @radix-ui/react-toggle
- @radix-ui/react-toggle-group
- @radix-ui/react-tooltip
- react-day-picker
- react-dom
- react-helmet-async
- react-hook-form
- react-markdown
- react-masonry-css
- react-resizable-panels
- react-router
- react-router-dom
- recharts
- remark-gfm
- sonner
- @supabase/supabase-js
- @tabler/icons-react
- tailwind-merge
- tailwindcss-animate
- @tanstack/react-query
- terser
- @tsparticles/engine
- @tsparticles/react
- zod
- postcss
- tailwindcss
- @tailwindcss/typography
- @types/node
- @types/react-dom
- typescript-eslint
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- vite
- vercel.json
- performanceManifest.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 112 edges
2. `Button` - 59 edges
3. `useAuth()` - 44 edges
4. `Card` - 40 edges
5. `useToast()` - 40 edges
6. `Badge()` - 37 edges
7. `CardContent` - 36 edges
8. `Input` - 26 edges
9. `Site-wide / Shared Layer (affects all pages)` - 25 edges
10. `Website` - 23 edges

## Surprising Connections (you probably didn't know these)
- `GridPattern()` --references--> `react`  [EXTRACTED]
  src/components/ui/grid-feature-cards.tsx → package.json
- `BasicInfoSection()` --references--> `react`  [EXTRACTED]
  src/components/admin/upload-form/BasicInfoSection.tsx → package.json
- `Visual3()` --references--> `react`  [EXTRACTED]
  src/components/ui/animated-card-chart.tsx → package.json
- `useCarousel()` --references--> `react`  [EXTRACTED]
  src/components/ui/carousel.tsx → package.json
- `useFormField()` --references--> `react`  [EXTRACTED]
  src/components/ui/form.tsx → package.json

## Import Cycles
- 1-file cycle: `src/data/blog-posts.ts -> src/data/blog-posts.ts`

## Communities (177 total, 83 thin omitted)

### Community 0 - "analytics.ts"
Cohesion: 0.09
Nodes (43): CookieConsent(), CookieConsentProps, Switch, usePageTracking(), canTrack(), detectAndTrackAIReferrer(), initGA(), trackAIConversion() (+35 more)

### Community 1 - "PremiumServicesModal.tsx"
Cohesion: 0.06
Nodes (35): AdminControls(), AdminPanelHeader(), AdminPanelHeaderProps, AdminPanelModals(), AdminPanelModalsProps, AdminPanelTabs(), WebsitePreview(), WebsiteReviewModal() (+27 more)

### Community 2 - "FREE WEBSITE CONTENT STRATEGY"
Cohesion: 0.05
Nodes (42): **About Page**, 📊 **ANALYTICS & TRACKING**, **Blog Content Topics**, **Color Psychology**, **Conversion Funnels**, 📈 **CONVERSION OPTIMIZATION**, 🎯 **CORE VALUE PROPOSITION**, **Facebook Content** (+34 more)

### Community 3 - "user-confirmation.tsx"
Cohesion: 0.05
Nodes (41): button, contactInfo, container, content, ctaBox, ctaText, footer, footerDivider (+33 more)

### Community 4 - "📱 Mobile Performance Optimizations - Complete Guide"
Cohesion: 0.05
Nodes (39): **1. Connection-Aware Optimizations** 📶, **1. Query Caching** 📦, **1. Reduced Prefetching (Slow Connections)**, **2. Lower Image Quality**, **2. Skeleton Loading** 💀, **2. Smart Prefetching** 🧠, **3. Image Optimization** 🖼️, **3. Mobile Detection** 📱 (+31 more)

### Community 5 - "Site-wide / Shared Layer (affects all pages)"
Cohesion: 0.06
Nodes (35): #023 Contrast results (computed, WCAG 2.1), Cross-Page Consistency Issues, Design Tokens (Discovered/Extracted), Executive Summary, Fixed in this session, Issue #001, Issue #002, Issue #003 (+27 more)

### Community 6 - "button.tsx"
Cohesion: 0.12
Nodes (23): BasicInfoSection(), FeaturesSection(), FeaturesSectionProps, FormActions(), FormActionsProps, InclusionsSection(), InclusionsSectionProps, TagsSection() (+15 more)

### Community 7 - "WebsiteEditForm.tsx"
Cohesion: 0.10
Nodes (27): EditBasicInfoSection(), EditBasicInfoSectionProps, WebsiteFormData, EditFeaturesSection(), EditFeaturesSectionProps, EditInclusionsSection(), EditInclusionsSectionProps, EditTagsSection() (+19 more)

### Community 8 - "card.tsx"
Cohesion: 0.15
Nodes (10): CategoryCardsProps, Message, Card, CardContent, CardFooter, CardHeader, CardTitle, EmptyStateProps (+2 more)

### Community 9 - "sidebar.tsx"
Cohesion: 0.07
Nodes (28): Sidebar, SidebarContent, SidebarContext, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel (+20 more)

### Community 10 - "useAuth.tsx"
Cohesion: 0.16
Nodes (18): useUserWebsites(), isUUID(), useWebsiteById(), useWebsites(), buildWebsitesQuery(), fetchProfilesForWebsites(), fetchSingleWebsiteWithProfile(), profileCache (+10 more)

### Community 11 - "🚀 Marketplace Performance Optimization Guide"
Cohesion: 0.07
Nodes (28): **1. Aggressive Query Caching** ⭐⭐⭐, **2. AI Agents Hook Optimized** ⭐⭐⭐, **3. Websites Query Optimized** ⭐⭐⭐, **4. Image Loading Enhanced** ⭐⭐, **5. Navigation Preloading** ⭐⭐⭐, **6. Performance Monitoring** ⭐, **🔧 ADDITIONAL RECOMMENDATIONS**, **Already Implemented:** (+20 more)

### Community 12 - "useAuth"
Cohesion: 0.14
Nodes (23): LiveSupportTab(), getInitialMessage(), LiveChatSupport(), LeadCaptureForm(), SidebarActions(), SidebarActionsProps, SideNavbar(), ProtectedRoute() (+15 more)

### Community 13 - "Header.tsx"
Cohesion: 0.11
Nodes (22): react, react, MobileBottomNav(), useCarousel(), useFormField(), NavigationMenu, NavigationMenuContent, NavigationMenuIndicator (+14 more)

### Community 14 - "App.tsx"
Cohesion: 0.08
Nodes (25): About, AdminPanel, Auth, Blog, BlogPost, Calculator, Contact, ContactConfirmation (+17 more)

### Community 15 - "animated-service-card.tsx"
Cohesion: 0.09
Nodes (21): AnimatedCard(), CardBody(), CardDescription(), CardDescriptionProps, CardProps, CardTitle(), CardTitleProps, CardVisual() (+13 more)

### Community 16 - "use-toast.ts"
Cohesion: 0.11
Nodes (23): Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastTitle, toastVariants (+15 more)

### Community 17 - "admin-notification.tsx"
Cohesion: 0.07
Nodes (26): actionBox, AdminNotificationProps, container, content, emailLink, footer, footerLink, footerText (+18 more)

### Community 18 - "⚡ Site Details Page - Lightning Fast Performance"
Cohesion: 0.08
Nodes (25): **1. Intelligent Preloading** ⭐⭐⭐, **2. Skeleton Loader (No Blocking Spinner)** ⭐⭐⭐, **3. Image Optimization** ⭐⭐, **4. Aggressive Query Caching** ⭐⭐⭐, **Add Image Placeholder**, **Aggressive Caching**, **🔧 DEBUGGING**, **Files Modified:** (+17 more)

### Community 19 - "compilerOptions"
Cohesion: 0.08
Nodes (25): DOM, DOM.Iterable, ES2020, compilerOptions, allowImportingTsExtensions, baseUrl, isolatedModules, jsx (+17 more)

### Community 20 - "ProjectCalculator.tsx"
Cohesion: 0.13
Nodes (15): AdminFiltersProps, categories, categories, DashboardHeaderProps, Category, MarketplaceFiltersProps, RadioGroup, RadioGroupItem (+7 more)

### Community 21 - "premium-testimonials.tsx"
Cohesion: 0.12
Nodes (16): TestimonialsSection(), TestimonialsSectionProps, Avatar, AvatarFallback, AvatarImage, aggregateRatingSchema, generatePersonSchema(), generateReviewSchema() (+8 more)

### Community 22 - "cn"
Cohesion: 0.14
Nodes (14): AnimatedShinyText(), AnimatedShinyTextProps, CustomBrandingVisuals(), DropdownMenuShortcut(), FastDeliveryCard(), MobileResponsiveCard(), PerformanceSEOCard(), TechStackCard() (+6 more)

### Community 23 - "Index.tsx"
Cohesion: 0.12
Nodes (14): Footer(), FAQItem, GEOStructuredData(), GEOStructuredDataProps, AccordionContent, AccordionItem, AccordionTrigger, useCookiePreferences() (+6 more)

### Community 24 - "Profile.tsx"
Cohesion: 0.13
Nodes (17): AdminStats(), AdminStatsProps, ProfileEditForm(), ProfileHeader(), ProfileStats(), PurchaseHistoryTab(), QuickActionsCard(), RecentPurchases() (+9 more)

### Community 25 - "AppLayout.tsx"
Cohesion: 0.15
Nodes (9): AppLayout(), AppLayoutProps, PremiumServicesModal(), SEOHeadProps, GridPattern(), Separator, Feature, ProjectType (+1 more)

### Community 26 - "Hero.tsx"
Cohesion: 0.14
Nodes (13): HeroEmailCapture(), Hero(), HeroProps, LogoMarquee(), Logos, Card, CardSlider(), CardSliderProps (+5 more)

### Community 27 - "CHAT UI ANIMATIONS - MICRO-SYNTAX"
Cohesion: 0.10
Nodes (20): 1. Layout design, 2. Theme design, 3. Animation design, 4. Generate html file for each UI component and then combine them together to form a single html file, Available Tools, Button Interactions, CHAT UI ANIMATIONS - MICRO-SYNTAX, Core Message Flow (+12 more)

### Community 28 - "Contact.tsx"
Cohesion: 0.16
Nodes (18): ChatMessage, ChatSession, ConversationStatus, QUICK_RESPONSES, STATUS_CONFIG, AlertDialogAction, AlertDialogCancel, AlertDialogContent (+10 more)

### Community 29 - "utils.ts"
Cohesion: 0.10
Nodes (12): SidebarLogo(), SidebarLogoProps, Checkbox, HoverCardContent, PopoverContent, Progress, Slider, ToggleGroup (+4 more)

### Community 30 - "formValidation.ts"
Cohesion: 0.10
Nodes (16): AIAgentUploadFormData, aiAgentUploadSchema, ContactFormData, contactSchema, LeadCaptureFormData, leadCaptureSchema, ProfileUpdateFormData, profileUpdateSchema (+8 more)

### Community 31 - "performanceUtils.ts"
Cohesion: 0.12
Nodes (4): createImageObserver(), lazyLoadImage(), memoize(), SimpleCache

### Community 32 - "WebInHour Codebase Index"
Cohesion: 0.11
Nodes (18): Admin, App Entry And Routing, Auth And Profiles, Blog, Commands, Current Worktree Notes, Homepage, Key Sections (+10 more)

### Community 33 - "compilerOptions"
Cohesion: 0.11
Nodes (17): ES2023, vite.config.ts, compilerOptions, allowImportingTsExtensions, isolatedModules, lib, module, moduleDetection (+9 more)

### Community 34 - "FastMarketplace.tsx"
Cohesion: 0.15
Nodes (11): SidebarNavigation(), SidebarNavigationProps, FastMarketplace(), FastMarketplaceProps, MarketplaceFilters, OptimizedImage, OptimizedImageProps, VirtualizedGrid() (+3 more)

### Community 35 - "dependencies"
Cohesion: 0.12
Nodes (17): cmdk, embla-carousel-react, dependencies, cmdk, embla-carousel-react, playwright, @radix-ui/react-alert-dialog, @radix-ui/react-aspect-ratio (+9 more)

### Community 36 - "components.json"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 37 - "Free Templates vs. Custom Design: Stop Wasting Money on Your First Website"
Cohesion: 0.12
Nodes (16): 1. You are building an actual application, 1. You need to prove your idea, 2. You are an established enterprise, 2. You want to preserve capital, 3. Your business model is standard, Are the templates actually free?, Do templates hurt SEO?, Free Templates vs. Custom Design: Stop Wasting Money on Your First Website (+8 more)

### Community 38 - "input.tsx"
Cohesion: 0.18
Nodes (11): BasicInfoSectionProps, categories, WebsiteFormData, emailSchema, HeroEmailCaptureProps, LeadCaptureFormProps, ImageUpload(), ImageUploadProps (+3 more)

### Community 39 - "MobileBottomNav.tsx"
Cohesion: 0.22
Nodes (12): businessCategories, CategoryFilterProps, websiteCategories, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem (+4 more)

### Community 40 - "combined-featured-section.tsx"
Cohesion: 0.12
Nodes (6): CombinedFeaturedSection(), map, points, rankingsData, SEOFeature, seoFeatures

### Community 41 - "GEO Optimization: Why ChatGPT is Ignoring Your Website"
Cohesion: 0.12
Nodes (15): 1. Give the answer immediately, 2. Use hard numbers, 3. Build third-party authority, Does GEO replace traditional SEO?, GEO Optimization: Why ChatGPT is Ignoring Your Website, How AI actually picks its sources, How do I track this?, Is this just for big tech companies? (+7 more)

### Community 42 - "Website in 24 Hours: How Same-Day Web Development Actually Works"
Cohesion: 0.13
Nodes (14): 1. Start with what works, 2. Hand off your assets, 3. Push to production, Can I really get a production-ready website in 24 hours?, Do I own the code?, How we actually do it in 24 hours, Is it as good as a custom build?, Is it SEO-friendly? (+6 more)

### Community 43 - "performanceOptimizer.ts"
Cohesion: 0.21
Nodes (10): App(), AuthProvider(), rootElement, CRITICAL_IMAGES, lazyLoadSections(), measureWebVitals(), optimizeImages(), optimizeRenderPerformance() (+2 more)

### Community 44 - "Website"
Cohesion: 0.16
Nodes (11): AdminPanelTabsProps, MyWebsitesTableProps, PendingReviewsTabProps, WebsiteGridProps, EmptyState, LoadingSkeleton, TemplateCard, TemplateGrid (+3 more)

### Community 45 - "Find Skills"
Cohesion: 0.14
Nodes (13): Common Skill Categories, Find Skills, How to Help Users Find Skills, Step 1: Understand What They Need, Step 2: Check the Leaderboard First, Step 3: Search for Skills, Step 4: Verify Quality Before Recommending, Step 5: Present Options to the User (+5 more)

### Community 46 - "prerender.mjs"
Cohesion: 0.21
Nodes (11): __dirname, generateSitemap(), createServer(), __dirname, DIST, main(), MIME, __dirname (+3 more)

### Community 47 - "useIsAdmin"
Cohesion: 0.22
Nodes (10): AdminRoute(), AdminRouteProps, useIsAdmin(), useArrayFields(), useCreateWebsite(), useWebsiteUploadForm(), WebsiteFormData, prepareWebsiteData() (+2 more)

### Community 48 - "pagination.tsx"
Cohesion: 0.16
Nodes (12): ButtonProps, buttonVariants, Calendar(), CalendarProps, Pagination(), PaginationContent, PaginationEllipsis(), PaginationItem (+4 more)

### Community 49 - "useProfiles.tsx"
Cohesion: 0.16
Nodes (12): Profile, ProfileUpdate, CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums (+4 more)

### Community 50 - "compilerOptions"
Cohesion: 0.14
Nodes (13): compilerOptions, allowJs, baseUrl, noImplicitAny, noUnusedLocals, noUnusedParameters, paths, skipLibCheck (+5 more)

### Community 51 - "carousel.tsx"
Cohesion: 0.15
Nodes (12): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+4 more)

### Community 52 - "SKILL.md"
Cohesion: 0.17
Nodes (10): caveman, Example output, How to invoke, See also, What it does, Auto-Clarity, Boundaries, Intensity (+2 more)

### Community 53 - "Google Analytics 4 Setup Guide"
Cohesion: 0.17
Nodes (12): Automatic Tracking (Already Implemented), 📊 Available Tracking Functions, Core Tracking, Files Created/Modified, Google Analytics 4 Setup Guide, Manual Event Tracking (Use in Your Components), 🚀 Next Steps, ⚡ Performance Impact (+4 more)

### Community 54 - "⚡ Marketplace Performance - Quick Start Guide"
Cohesion: 0.17
Nodes (11): **Files Created:**, **Files Modified:**, ⚡ Marketplace Performance - Quick Start Guide, **📈 PERFORMANCE COMPARISON**, **🎉 RESULT**, **Step 1: First Visit**, **Step 2: Return Visit (Within 10 minutes)**, **Step 3: Hover Test** (+3 more)

### Community 55 - "hooks.ts"
Cohesion: 0.23
Nodes (6): UseTextRotationProps, useTextElements(), TextRotateProps, TextRotateRef, WordObject, splitIntoCharacters()

### Community 56 - "devDependencies"
Cohesion: 0.18
Nodes (11): autoprefixer, devDependencies, autoprefixer, rollup-plugin-visualizer, @types/react, typescript, @vitejs/plugin-react-swc, rollup-plugin-visualizer (+3 more)

### Community 57 - "Caching Strategy Guide"
Cohesion: 0.18
Nodes (11): 1. HTTP Cache Headers (Server-Level), 2. Service Worker Cache (Browser-Level), Cache Durations by Asset Type, Cache Invalidation, Caching Strategy Guide, Monitoring Cache Performance, Multi-Layer Caching Approach, Overview (+3 more)

### Community 58 - "MyWebsitesTable.tsx"
Cohesion: 0.29
Nodes (9): MyWebsitesTable(), Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader (+1 more)

### Community 59 - "MobileServicesDrawer.tsx"
Cohesion: 0.29
Nodes (9): MobileServicesDrawer(), MobileServicesDrawerProps, Drawer(), DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay (+1 more)

### Community 60 - "BlogIndex.tsx"
Cohesion: 0.25
Nodes (7): CardDescription, BlogPost, blogPosts, generateSitemap(), generateSitemapUrls(), generateSitemapXML(), SitemapUrl

### Community 61 - "alert.tsx"
Cohesion: 0.18
Nodes (8): Alert, AlertDescription, AlertTitle, alertVariants, TextRotate, TextRotateProps, TextRotateRef, WordObject

### Community 62 - "index.ts"
Cohesion: 0.31
Nodes (9): ContactEmailRequest, corsHeaders, getSafeErrorMessage(), handler(), hashClientIp(), resend, validateInput(), AdminNotification() (+1 more)

### Community 63 - "README.md"
Cohesion: 0.22
Nodes (4): 📚 Documentation, 🚀 Getting Started, 🛠 Tech Stack, WebInHours: Professional Website Marketplace

### Community 64 - "sw.js"
Cohesion: 0.28
Nodes (6): CACHE_MAX_AGE, CRITICAL_RESOURCES, isAPIRequest(), isPageRequest(), isStaticAsset(), IMPORTANT: Bump this version whenever you deploy critical fixes

### Community 65 - "AdminControls.tsx"
Cohesion: 0.33
Nodes (6): AdminControlsProps, TagsManager(), TagsManagerProps, specialTags, statusOptions, WebsiteReviewModalProps

### Community 66 - "sheet.tsx"
Cohesion: 0.22
Nodes (8): SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle, sheetVariants

### Community 67 - "ThemeContext.tsx"
Cohesion: 0.28
Nodes (7): ThemeToggle(), Theme, ThemeContext, ThemeContextType, ThemeProvider(), ThemeProviderProps, useTheme()

### Community 68 - "manifest.json"
Cohesion: 0.25
Nodes (7): background_color, display, icons, name, short_name, start_url, theme_color

### Community 69 - "errorReporter.ts"
Cohesion: 0.43
Nodes (7): createErrorReport(), ErrorReport, getErrorFingerprint(), initErrorReporter(), reportedErrors, reportError(), sendErrorReport()

### Community 70 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, build:dev, dev, lint, postbuild, preview

### Community 71 - "Pricing — WebInHour"
Cohesion: 0.29
Nodes (6): Custom Lite, Custom Pro, Custom Requirements, Notes, Pricing — WebInHour, Template (Free)

### Community 72 - "compare.tsx"
Cohesion: 0.33
Nodes (5): Compare(), CompareProps, MemoizedSparklesCore, ParticlesProps, SparklesCore()

### Community 74 - "index.ts"
Cohesion: 0.38
Nodes (6): corsHeaders, escapeHtml(), handler(), LiveSupportNotificationRequest, resend, validateInput()

### Community 75 - "StructuredData.tsx"
Cohesion: 0.33
Nodes (4): BlogPostStructuredDataProps, FAQStructuredDataProps, ServiceStructuredDataProps, StructuredDataProps

### Community 76 - "grid-feature-cards.tsx"
Cohesion: 0.40
Nodes (5): FeatureCard(), FeatureCardProps, FeatureType, genRandomPattern(), GridPattern()

### Community 77 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, framework, headers, outputDirectory, rewrites

### Community 78 - "🎯 Tracking Examples for Key Areas"
Cohesion: 0.40
Nodes (5): CTA Button Clicks, Marketplace Downloads, Newsletter Signups, Search Functionality, 🎯 Tracking Examples for Key Areas

### Community 79 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 80 - "FAQSchema.tsx"
Cohesion: 0.40
Nodes (3): defaultFAQs, FAQItem, FAQSchemaProps

### Community 82 - "🔧 Setup Steps"
Cohesion: 0.50
Nodes (4): 🔧 Setup Steps, Step 1: Get Your GA4 Measurement ID, Step 2: Update Measurement ID in Your Code, Step 3: Deploy and Test

### Community 83 - "**🚀 IMMEDIATE BENEFITS (Already Active!)**"
Cohesion: 0.50
Nodes (4): **🚀 IMMEDIATE BENEFITS (Already Active!)**, **✅ Instant Caching**, **✅ Navigation Preloading**, **✅ Smart Image Loading**

### Community 84 - "**💡 OPTIONAL ENHANCEMENTS**"
Cohesion: 0.50
Nodes (4): **Option 1: Use Ultra-Fast Component**, **Option 2: Add Virtual Scrolling (100+ items)**, **Option 3: Monitor Performance**, **💡 OPTIONAL ENHANCEMENTS**

### Community 85 - "sw-update-prompt.tsx"
Cohesion: 0.50
Nodes (3): BeforeInstallPromptEvent, SWUpdatePrompt(), WindowEventMap

## Knowledge Gaps
- **829 isolated node(s):** `supabase`, `$schema`, `style`, `rsc`, `tsx` (+824 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **83 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Header.tsx` to `dependencies`, `button.tsx`, `sidebar.tsx`, `grid-feature-cards.tsx`, `useAuth`, `animated-service-card.tsx`, `index.ts`?**
  _High betweenness centrality (0.177) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-slider`, `@radix-ui/react-slot`, `@radix-ui/react-tabs`, `@radix-ui/react-toast`, `@radix-ui/react-toggle`, `@radix-ui/react-toggle-group`, `@radix-ui/react-tooltip`, `react-day-picker`, `react-dom`, `react-helmet-async`, `react-hook-form`, `Header.tsx`, `react-markdown`, `react-masonry-css`, `react-resizable-panels`, `react-router`, `react-router-dom`, `recharts`, `remark-gfm`, `sonner`, `@supabase/supabase-js`, `@tabler/icons-react`, `tailwind-merge`, `tailwindcss-animate`, `@tanstack/react-query`, `terser`, `@tsparticles/engine`, `@tsparticles/react`, `zod`, `package.json`, `class-variance-authority`, `clsx`, `date-fns`, `dotted-map`, `framer-motion`, `gsap`, `@gsap/react`, `@hookform/resolvers`, `input-otp`, `lucide-react`, `next-themes`, `@radix-ui/react-accordion`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-collapsible`, `@radix-ui/react-context-menu`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-hover-card`, `@radix-ui/react-label`, `@radix-ui/react-menubar`, `@radix-ui/react-navigation-menu`, `@radix-ui/react-popover`, `@radix-ui/react-progress`, `@radix-ui/react-radio-group`, `@radix-ui/react-scroll-area`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Why does `useToast()` connect `useAuth` to `input.tsx`, `MobileBottomNav.tsx`, `card.tsx`, `useAuth.tsx`, `Header.tsx`, `useIsAdmin`, `use-toast.ts`, `useProfiles.tsx`, `Profile.tsx`, `Hero.tsx`, `Contact.tsx`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **What connects `supabase`, `$schema`, `style` to the rest of the system?**
  _830 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `analytics.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08928571428571429 - nodes in this community are weakly interconnected._
- **Should `PremiumServicesModal.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.061170212765957445 - nodes in this community are weakly interconnected._
- **Should `FREE WEBSITE CONTENT STRATEGY` be split into smaller, more focused modules?**
  _Cohesion score 0.046511627906976744 - nodes in this community are weakly interconnected._