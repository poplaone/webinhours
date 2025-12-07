# WebInHours Codebase Index
*Last Updated: November 2025*

## 📋 Overview
**WebInHours** is a comprehensive React-based marketplace platform for professional websites and AI agents, built with TypeScript, Vite, and Supabase. The application offers a full-stack solution for users to browse, purchase, and manage websites and AI agents with robust admin capabilities, performance optimization, and modern UI/UX.

### 🏗️ Architecture
- **Frontend**: React 18 + TypeScript + Vite (SWC compiler)
- **Styling**: Tailwind CSS + shadcn/ui components + Custom animations
- **Backend**: Supabase (PostgreSQL + Auth + Storage + RLS)
- **State Management**: TanStack React Query + React Context + Local state
- **Routing**: React Router DOM v6 with lazy loading
- **Performance**: Aggressive caching, code splitting, service worker, prefetching
- **Build Tool**: Vite with optimized chunks and tree-shaking disabled for stability
- **Type Safety**: Full TypeScript with strict configuration

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
│   ├── Website interface (main entity)
│   ├── WebsiteInsert (creation payload)
│   ├── WebsiteUpdate (update payload)
│   └── WebsiteFilters (query filters)
└── aiAgent.ts                     # AI agent type definitions
    ├── AIAgent interface (main entity)
    ├── AIAgentInsert (creation payload)
    ├── AIAgentUpdate (update payload)
    └── AIAgentFilters (query filters)
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