import { Suspense, lazy, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GridBackground } from "@/components/ui/GridBackground";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { preloadCriticalResources, optimizeRenderPerformance } from "@/utils/performanceOptimizer";
import { usePageTracking } from "@/hooks/usePageTracking";
import { SWUpdatePrompt } from "@/components/ui/sw-update-prompt";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load all pages including Index for optimal code splitting
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const ContactConfirmation = lazy(() => import("./pages/ContactConfirmation"));
const FAQ = lazy(() => import("./pages/FAQ"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Auth = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const SiteDetails = lazy(() => import("./pages/SiteDetails"));
const Calculator = lazy(() => import("./pages/Calculator"));
const Blog = lazy(() => import("./pages/Blog/BlogIndex"));
const BlogPost = lazy(() => import("./pages/Blog/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Landing24Hour = lazy(() => import("./pages/Landing24Hour"));
const LandingSameDay = lazy(() => import("./pages/LandingSameDay"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 🚀 AGGRESSIVE CACHING - Data stays fresh for 10 minutes
      staleTime: 1000 * 60 * 10, // 10 minutes
      gcTime: 1000 * 60 * 60, // 1 hour (formerly cacheTime)
      // Show stale data immediately while fetching fresh data
      placeholderData: (previousData: any) => previousData,
      // Disable unnecessary refetches
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      // Fast failure handling
      retry: 1,
      retryDelay: 500,
      // Enable query deduplication
      networkMode: 'online'
    },
    mutations: {
      // Faster mutation handling
      retry: 1,
      networkMode: 'online'
    }
  }
});

// Component to handle scroll to top and analytics tracking on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  // Track page views
  usePageTracking();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  // Initialize performance optimizations
  useEffect(() => {
    preloadCriticalResources();
    optimizeRenderPerformance();
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="webinhour-theme">
            <TooltipProvider>
              <BrowserRouter>
                <ScrollToTop />
                <Helmet>
                  <title>WebInHour - Professional Website Solutions</title>
                  <meta name="description" content="Launch your complete online presence in hours, not weeks. We build your website, set up Google Business, create social content, and prepare local SEO so your business looks ready everywhere customers check." />
                </Helmet>
                <GridBackground className="min-h-screen text-foreground">
                  <main id="main-content" role="main">
                    <Suspense fallback={
                      <div className="min-h-screen bg-background flex flex-col overflow-hidden">
                        {/* Header Skeleton */}
                        <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-background/95 backdrop-blur px-4 sm:px-6 flex items-center justify-between">
                          <Skeleton className="h-8 w-32 sm:h-10 sm:w-40" />
                          <div className="hidden lg:flex space-x-6">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                          <div className="flex items-center space-x-3">
                            <Skeleton className="h-9 w-9 rounded-md hidden sm:block" />
                            <Skeleton className="h-10 w-24 rounded-md" />
                          </div>
                        </header>

                        {/* Hero Layout Skeleton */}
                        <section className="wih-hero-section pt-[100px]">
                          <div className="wih-hero-container">
                            <div className="wih-hero-grid">
                              {/* Left Column Skeleton */}
                              <div className="wih-hero-column hidden sm:flex">
                                <Skeleton className="w-full aspect-[4/3] rounded-lg shadow-md" />
                                <Skeleton className="w-full aspect-[4/3] rounded-lg shadow-md relative -left-12" />
                                <Skeleton className="w-full aspect-[4/3] rounded-lg shadow-md" />
                              </div>

                              {/* Center Content Skeleton */}
                              <div className="wih-hero-center w-full flex flex-col items-center">
                                <Skeleton className="h-8 w-48 mb-8 rounded-full" />
                                
                                <div className="w-full max-w-3xl mx-auto border border-primary/10 p-6 sm:p-8 rounded-sm">
                                  <Skeleton className="h-10 sm:h-16 w-3/4 mx-auto mb-4" />
                                  <Skeleton className="h-10 sm:h-16 w-1/2 mx-auto mb-8" />
                                  <Skeleton className="h-4 sm:h-6 w-full mx-auto mb-2" />
                                  <Skeleton className="h-4 sm:h-6 w-5/6 mx-auto mb-2" />
                                  <Skeleton className="h-4 sm:h-6 w-2/3 mx-auto" />
                                </div>
                                
                                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                                  <Skeleton className="h-14 w-full sm:w-64 rounded-lg" />
                                  <Skeleton className="h-14 w-full sm:w-48 rounded-lg" />
                                </div>
                              </div>

                              {/* Right Column Skeleton */}
                              <div className="wih-hero-column hidden sm:flex">
                                <Skeleton className="w-full aspect-[4/3] rounded-lg shadow-md" />
                                <Skeleton className="w-full aspect-[4/3] rounded-lg shadow-md relative -right-12" />
                                <Skeleton className="w-full aspect-[4/3] rounded-lg shadow-md" />
                              </div>
                            </div>
                            
                            {/* Mobile Slider Skeleton */}
                            <div className="wih-hero-mobile-slider block sm:hidden mt-8">
                              <Skeleton className="w-[280px] h-[350px] rounded-2xl mx-auto" />
                            </div>
                          </div>
                        </section>
                      </div>
                    }>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/contact/confirmation" element={<ContactConfirmation />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/how-it-works" element={<HowItWorks />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/websites" element={
                          <ErrorBoundary>
                            <Marketplace />
                          </ErrorBoundary>
                        } />
                        {/* Redirect old /marketplace URL to /websites for backward compatibility */}
                        <Route path="/marketplace" element={<Navigate to="/websites" replace />} />
                        <Route path="/calculator" element={<Calculator />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/site/:slugOrId" element={<SiteDetails />} />
                        <Route path="/24-hour-website" element={<Landing24Hour />} />
                        <Route path="/same-day-delivery" element={<LandingSameDay />} />
                        <Route path="/profile" element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        } />
                        <Route path="/admin-panel" element={
                          <AdminRoute>
                            <AdminPanel />
                          </AdminRoute>
                        } />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </main>
                </GridBackground>
                <Toaster />
              </BrowserRouter>
            </TooltipProvider>
            <SWUpdatePrompt />
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
