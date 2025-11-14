# WebInHours Codebase Index

## 📋 Overview
**WebInHours** is a React-based marketplace platform for professional websites and AI agents, built with TypeScript, Vite, and Supabase. The application offers a comprehensive solution for users to browse, purchase, and manage websites and AI agents with admin capabilities.

### 🏗️ Architecture
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **State Management**: TanStack React Query + React Context
- **Routing**: React Router DOM v6
- **Performance**: Aggressive caching, lazy loading, code splitting

## 📁 Project Structure

### Root Configuration Files
```
├── package.json                    # Dependencies and scripts
├── vite.config.ts                 # Vite configuration with performance optimizations
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── components.json                # shadcn/ui configuration
├── eslint.config.js               # ESLint configuration
├── postcss.config.js              # PostCSS configuration
└── README.md                      # Project documentation
```

### Source Code Structure (`src/`)

#### 🚀 Application Entry Points
```
src/
├── main.tsx                       # Application entry point with AuthProvider
├── App.tsx                        # Main app component with routing and providers
├── index.css                      # Global styles and Tailwind imports
└── vite-env.d.ts                 # Vite environment types
```

#### 📄 Pages (`src/pages/`)
All pages are lazy-loaded for optimal performance:
```
src/pages/
├── Index.tsx                      # Homepage with Hero, Services, Features
├── About.tsx                      # About page
├── Auth.tsx                       # Authentication (login/signup)
├── Blog.tsx                       # Blog page
├── Calculator.tsx                 # Project calculator
├── Checkout.tsx                   # Checkout process
├── Contact.tsx                    # Contact form
├── FAQ.tsx                        # Frequently asked questions
├── HowItWorks.tsx                # How it works explanation
├── Marketplace.tsx                # Main marketplace for websites/AI agents
├── NotFound.tsx                   # 404 error page
├── Notifications.tsx              # User notifications
├── Pricing.tsx                    # Pricing information
├── Privacy.tsx                    # Privacy policy
├── Profile.tsx                    # User profile management
├── SiteDetails.tsx               # Individual website/agent details
└── Terms.tsx                      # Terms of service
```

#### 🧩 Components (`src/components/`)

##### Layout Components (`src/components/layout/`)
```
layout/
├── AppLayout.tsx                  # Main app layout wrapper
├── DashboardHeader.tsx            # Header component
├── MobileBottomNav.tsx            # Mobile navigation
├── SideNavbar.tsx                 # Desktop sidebar navigation
└── sidebar/
    ├── AIChatSidebar.tsx         # AI chat sidebar
    ├── SidebarActions.tsx        # Sidebar action buttons
    ├── SidebarLogo.tsx           # Logo component
    └── SidebarNavigation.tsx     # Navigation links
```

##### Admin Components (`src/components/admin/`)
```
admin/
├── AdminControls.tsx              # Admin control panel
├── AdminFilters.tsx               # Filtering controls
├── AdminPanelHeader.tsx           # Admin panel header
├── AdminPanelModals.tsx           # Modal dialogs
├── AdminPanelTabs.tsx             # Tab navigation
├── AdminStats.tsx                 # Statistics dashboard
├── AIAgentGrid.tsx                # AI agent grid display
├── MyAIAgentsTable.tsx            # User's AI agents table
├── MyWebsitesTable.tsx            # User's websites table
├── PendingReviewsTab.tsx          # Pending reviews management
├── TagsManager.tsx                # Tags management
├── types.ts                       # Admin type definitions
├── WebsiteEditForm.tsx            # Website editing form
├── WebsiteGrid.tsx                # Website grid display
├── WebsitePreview.tsx             # Website preview component
├── WebsiteReviewModal.tsx         # Review modal
├── WebsiteUploadForm.tsx          # Website upload form
├── edit-form/                     # Website edit form sections
│   ├── EditBasicInfoSection.tsx
│   ├── EditFeaturesSection.tsx
│   ├── EditInclusionsSection.tsx
│   ├── EditTagsSection.tsx
│   ├── EditTechnologiesSection.tsx
│   └── EditURLSection.tsx
└── upload-form/                   # Website upload form sections
    ├── BasicInfoSection.tsx
    ├── FeaturesSection.tsx
    ├── FormActions.tsx
    ├── InclusionsSection.tsx
    ├── TagsSection.tsx
    ├── TechnologiesSection.tsx
    └── URLSection.tsx
```

##### UI Components (`src/components/ui/`)
Comprehensive shadcn/ui component library:
```
ui/
├── accordion.tsx                  # Collapsible content
├── alert-dialog.tsx               # Alert dialogs
├── alert.tsx                      # Alert messages
├── aspect-ratio.tsx               # Aspect ratio container
├── avatar.tsx                     # User avatars
├── badge.tsx                      # Status badges
├── breadcrumb.tsx                 # Navigation breadcrumbs
├── button.tsx                     # Button components
├── calendar.tsx                   # Date picker
├── card.tsx                       # Card containers
├── CardSlider.tsx                 # Sliding card component
├── carousel.tsx                   # Image carousel
├── chart.tsx                      # Data visualization
├── checkbox.tsx                   # Checkbox inputs
├── ClientLogos.tsx                # Client logo display
├── collapsible.tsx                # Collapsible sections
├── command.tsx                    # Command palette
├── context-menu.tsx               # Right-click menus
├── dialog.tsx                     # Modal dialogs
├── drawer.tsx                     # Side drawers
├── dropdown-menu.tsx              # Dropdown menus
├── empty-state.tsx                # Empty state displays
├── error-boundary.tsx             # Error handling
├── form.tsx                       # Form components
├── grid-feature-cards.tsx         # Feature card grid
├── GridBackground.tsx             # Animated grid background
├── hover-card.tsx                 # Hover cards
├── image-upload.tsx               # Image upload widget
├── input-otp.tsx                  # OTP input
├── input.tsx                      # Text inputs
├── interactive-neural-vortex-background.tsx # Animated background
├── label.tsx                      # Form labels
├── menubar.tsx                    # Menu bars
├── navigation-menu.tsx            # Navigation menus
├── OptimizedImage.tsx             # Performance-optimized images
├── pagination.tsx                 # Page navigation
├── popover.tsx                    # Popover dialogs
├── premium-testimonials.tsx       # Testimonials component
├── progress.tsx                   # Progress indicators
├── radio-group.tsx                # Radio button groups
├── resizable.tsx                  # Resizable panels
├── scroll-area.tsx                # Custom scrollbars
├── select.tsx                     # Select dropdowns
├── separator.tsx                  # Visual separators
├── sheet.tsx                      # Side sheets
├── sidebar.tsx                    # Sidebar component
├── skeleton.tsx                   # Loading skeletons
├── slider.tsx                     # Range sliders
├── sonner.tsx                     # Toast notifications
├── switch.tsx                     # Toggle switches
├── table.tsx                      # Data tables
├── tabs.tsx                       # Tab navigation
├── template-card-skeleton.tsx     # Template card loading state
├── text-rotate.tsx                # Animated text rotation
├── textarea.tsx                   # Text areas
├── theme-toggle.tsx               # Dark/light mode toggle
├── toast.tsx                      # Toast notifications
├── toaster.tsx                    # Toast container
├── toggle-group.tsx               # Toggle button groups
├── toggle.tsx                     # Toggle buttons
├── tooltip.tsx                    # Tooltips
├── trust-signals.tsx              # Trust indicators
├── use-toast.ts                   # Toast hook
├── VirtualizedGrid.tsx            # Performance-optimized grid
├── testimonials/                  # Testimonial components
│   ├── StatsSection.tsx
│   ├── TestimonialCard.tsx
│   └── TestimonialCarousel.tsx
└── text-rotate/                   # Text rotation utilities
    ├── hooks.ts
    ├── stagger-utils.ts
    ├── text-elements.ts
    ├── types.ts
    └── utils.ts
```

##### Feature-Specific Components
```
src/components/
├── ai-agents/                     # AI agent components
│   ├── AIAgentCard.tsx
│   ├── AIAgentInfographicCard.tsx
│   └── AIAgentUploadForm.tsx
├── ai/                            # AI chat components
│   ├── ChatHeader.tsx
│   ├── ChatInput.tsx
│   ├── ChatMessage.tsx
│   ├── ChatSidebar.tsx
│   ├── chatUtils.ts
│   ├── MessagesList.tsx
│   ├── QuickActions.tsx
│   └── types.ts
├── booking/                       # Booking components
│   └── ConsultationBooking.tsx
├── calculator/                    # Calculator components
│   └── ProjectCalculator.tsx
├── dashboard/                     # Dashboard components
│   ├── AIChatbot.tsx
│   ├── CategoryCards.tsx
│   ├── FeaturedSidebar.tsx
│   ├── InsightsSidebar.tsx
│   ├── masonry.css
│   └── TemplateGrid.tsx
├── filters/                       # Filter components
│   └── CategoryFilter.tsx
├── forms/                         # Form components
│   └── LeadCaptureForm.tsx
├── marketplace/                   # Marketplace components
│   ├── FastMarketplace.tsx
│   ├── MarketplaceCTA.tsx
│   ├── MarketplaceFilters.tsx
│   └── MarketplaceHeader.tsx
├── onboarding/                    # User onboarding
│   ├── AIPreferencesStep.tsx
│   ├── BrandInfoStep.tsx
│   ├── CompleteStep.tsx
│   ├── MarketTrendsStep.tsx
│   ├── OnboardingLayout.tsx
│   ├── ProductFocusStep.tsx
│   ├── StepIndicator.tsx
│   └── WelcomeStep.tsx
├── profile/                       # Profile components
│   ├── ProfileEditForm.tsx
│   ├── ProfileHeader.tsx
│   ├── ProfileStats.tsx
│   ├── PurchaseHistoryTab.tsx
│   ├── QuickActionsCard.tsx
│   └── RecentPurchases.tsx
├── sections/                      # Page sections
│   ├── CTASection.tsx
│   ├── Features.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── MarketplacePreview.tsx
│   ├── Portfolio.tsx
│   └── Services.tsx
├── seo/                          # SEO components
│   ├── SEOHead.tsx
│   └── StructuredData.tsx
├── AdminRoute.tsx                # Admin route protection
└── ProtectedRoute.tsx            # User route protection
```

#### 🎣 Hooks (`src/hooks/`)

##### Core Hooks
```
src/hooks/
├── useAuth.tsx                    # Authentication management
├── useAdmin.tsx                   # Admin functionality
├── use-mobile.tsx                 # Mobile detection
├── use-toast.ts                   # Toast notifications
└── usePerformanceMonitor.tsx      # Performance monitoring
```

##### Data Management Hooks
```
├── useWebsites.tsx                # Website data (re-exports)
├── useAIAgents.tsx                # AI agent data management
├── useProfiles.tsx                # User profile management
├── useArrayFields.tsx             # Array field utilities
├── useAdminPanel.tsx              # Admin panel functionality
├── useAdminAIAgents.tsx           # Admin AI agent management
├── useWebsiteQueries.tsx          # Website query hooks
├── useWebsiteMutations.tsx        # Website mutation hooks
├── useWebsiteUploadForm.tsx       # Website upload form
└── usePerformanceOptimizations.tsx # Performance optimizations
```

##### Query Hooks (`src/hooks/queries/`)
```
queries/
├── useMobileOptimizations.tsx     # Mobile performance
├── usePrefetchMarketplace.tsx     # Marketplace prefetching
├── usePrefetchSiteDetails.tsx     # Site details prefetching
├── useUserWebsitesQuery.tsx       # User websites query
├── useWebsiteByIdQuery.tsx        # Single website query
├── useWebsitesQuery.tsx           # All websites query
└── websiteQueryUtils.tsx          # Query utilities
```

#### 🏷️ Types (`src/types/`)
```
src/types/
├── website.ts                     # Website type definitions
└── aiAgent.ts                     # AI agent type definitions
```

#### 🔌 Integrations (`src/integrations/`)
```
src/integrations/supabase/
├── client.ts                      # Supabase client configuration
└── types.ts                       # Generated database types
```

#### 🛠️ Utilities (`src/utils/`)
```
src/utils/
├── utils.ts                       # General utilities (shadcn/ui)
├── formValidation.ts              # Form validation helpers
├── lazyLoad.ts                    # Lazy loading utilities
├── performanceManifest.ts         # Performance manifest
├── performanceOptimizer.ts        # Performance optimization tools
├── performanceUtils.ts            # Performance utilities
├── sitemapGenerator.ts            # Sitemap generation
└── websiteDataUtils.ts            # Website data utilities
```

#### 🎨 Contexts (`src/contexts/`)
```
src/contexts/
└── ThemeContext.tsx               # Theme management (dark/light mode)
```

### 🗄️ Database (`supabase/`)

#### Configuration
```
supabase/
└── config.toml                    # Supabase configuration
```

#### Migrations (`supabase/migrations/`)
Database schema evolution with 14 migration files:
```
├── 20250614111252-04e0c41a-8855-45ad-8229-8ee5a1adb804.sql
├── 20250614130156-956a155b-5eb9-4ab8-a901-1d12c5129594.sql
├── 20250615050033-53e28642-5dd4-4e2e-aacc-eb1ec8ea8b1e.sql
├── 20250615081534-66983cf9-8f65-4923-aff0-a1c5ca4025d0.sql
├── 20250615093754-1318b3ca-df7a-4ca2-8c0e-69b85612fc3d.sql
├── 20250615133448-58d376db-fc03-4fd3-9b6e-34cb4d10fa6b.sql
├── 20250615141024-b8258480-e653-43c6-8f46-f6a081647d31.sql
├── 20250704093028-fea01110-96b7-40e6-b550-fdc043e23367.sql
├── 20250708071848-37353995-8945-4d81-98d3-9c3e4b3ab03d.sql
├── 20250910121058_80d10cea-4cde-4e65-8e06-1d1d85a5bbcc.sql
├── 20251002053724_5a191f5a-0882-4e52-95ee-1c90310ce84b.sql
├── 20251010173606_00631d12-2b07-4178-b805-b1b57841b037.sql
├── 20251010180542_c3e4243c-df37-4e69-bc11-8c2e2a1ccd95.sql
└── 20251104060504_6c6684c9-b361-4f8c-a4ae-08267a050ea6.sql
```

### 📦 Public Assets (`public/`)
```
public/
├── index.html                     # HTML template
├── favicon.ico                    # Site icon
├── placeholder.svg                # Placeholder image
├── robots.txt                     # Search engine directives
├── sw.js                         # Service worker
├── _headers                      # Netlify headers
├── cache-bust.json               # Cache busting config
├── netlify.toml                  # Netlify configuration
├── vercel.json                   # Vercel configuration
└── lovable-uploads/              # User uploaded assets
    └── f22f95ca-a337-40a0-b696-96e2d06bf221.png
```

### 📚 Documentation Files
```
├── CACHING_GUIDE.md              # Caching strategy documentation
├── CLAUDE.md                     # Claude AI assistant guide
├── FREE_WEBSITE_CONTENT_STRATEGY.md # Content strategy guide
├── MARKETPLACE_PERFORMANCE_GUIDE.md # Marketplace optimization
├── MOBILE_PERFORMANCE_GUIDE.md   # Mobile performance guide
├── PERFORMANCE_QUICK_START.md    # Performance optimization guide
├── SITEDETAILS_PERFORMANCE_GUIDE.md # Site details optimization
└── .windsurfrules               # Windsurf IDE rules
```

## 🏗️ Key Architecture Patterns

### Data Flow
1. **Authentication**: Supabase Auth → `useAuth` hook → Context Provider
2. **Data Fetching**: TanStack React Query → Custom hooks → Components
3. **State Management**: React Query cache + Local React state
4. **Routing**: React Router DOM with lazy-loaded components

### Performance Optimizations
- **Lazy Loading**: All pages and heavy components
- **Aggressive Caching**: 10-minute stale time, 1-hour garbage collection
- **Code Splitting**: Vendor chunks separated from application code
- **Image Optimization**: `OptimizedImage` component with lazy loading
- **Service Worker**: Aggressive caching strategy
- **Prefetching**: Marketplace and site details prefetching

### Component Architecture
- **Atomic Design**: UI components → Feature components → Page sections → Pages
- **Compound Components**: Complex components split into manageable parts
- **Render Props**: Flexible component composition
- **Error Boundaries**: Graceful error handling

### Database Schema (Key Tables)
- **profiles**: User profile information
- **websites**: Website marketplace listings
- **ai_agents**: AI agent marketplace listings
- **RLS (Row Level Security)**: Implemented for data protection

## 🚀 Getting Started

### Prerequisites
- Node.js (with nvm recommended)
- npm or yarn

### Development Commands
```bash
npm run dev        # Start development server
npm run build      # Production build
npm run build:dev  # Development build
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

### Environment Setup
- Supabase URL: `https://dcsnxieqnpcjqqiajtvh.supabase.co`
- Environment variables in `.env`

## 🔑 Key Features

### User Features
- **Authentication**: Email/password + Google OAuth
- **Marketplace**: Browse websites and AI agents
- **Profile Management**: User dashboard and settings
- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Theme switching
- **SEO Optimized**: Meta tags and structured data

### Admin Features
- **Content Management**: CRUD operations for websites/AI agents
- **User Management**: Admin panel with user controls
- **Analytics**: Statistics dashboard
- **Review System**: Pending approvals workflow
- **Bulk Operations**: Mass updates and management

### Performance Features
- **Fast Loading**: Aggressive caching and optimization
- **Offline Support**: Service worker implementation
- **Mobile Performance**: Optimized for mobile devices
- **Progressive Enhancement**: Works without JavaScript

---

*This index was generated automatically and provides a comprehensive overview of the WebInHours codebase structure and architecture.*