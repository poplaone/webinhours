
import { Suspense, lazy, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from "@/components/ui/error-boundary";
import Index from "./pages/Index";
import ProtectedRoute from "./components/ProtectedRoute";
import { preloadCriticalResources, optimizeRenderPerformance } from "@/utils/performanceOptimizer";

// Lazy load components
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Blog = lazy(() => import("./pages/Blog"));
const Auth = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const SiteDetails = lazy(() => import("./pages/SiteDetails"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Reduce stale time for faster updates
      staleTime: 1000 * 60 * 5, // 5 minutes
      // Enable background refetching
      refetchOnWindowFocus: false,
      // Reduce retry attempts for faster failure handling
      retry: 1,
      // Enable query deduplication
      refetchOnMount: 'always'
    },
    mutations: {
      // Faster mutation timeout
      retry: 1
    }
  }
});

// Component to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

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
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <MotionConfig reducedMotion="always">
          <BrowserRouter>
            <ScrollToTop />
            <Helmet>
              <title>WebInHours - Professional Website Solutions</title>
              <meta name="description" content="Get your professional website ready in 24 hours. Choose from our marketplace of premium templates or get a custom design." />
            </Helmet>
            <div className="min-h-screen bg-background text-foreground">
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/marketplace" element={
                    <ErrorBoundary>
                      <Marketplace />
                    </ErrorBoundary>
                  } />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/site/:slugOrId" element={<SiteDetails />} />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
<Route path="/admin-panel" element={
                    <ProtectedRoute>
                      <AdminPanel />
                    </ProtectedRoute>
                  } />
                  <Route path="/notifications" element={
                    <ProtectedRoute>
                      <Notifications />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
            <Toaster />
          </BrowserRouter>
          </MotionConfig>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
