import { Suspense, lazy, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GridBackground } from "@/components/ui/GridBackground";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { preloadCriticalResources, optimizeRenderPerformance, enableServiceWorker } from "@/utils/performanceOptimizer";

// Lazy load all pages including Index for optimal code splitting
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
// Services page removed - now using homepage services section
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
const Calculator = lazy(() => import("./pages/Calculator"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 🚀 AGGRESSIVE CACHING - Data stays fresh for 10 minutes
      staleTime: 1000 * 60 * 10, // 10 minutes
      gcTime: 1000 * 60 * 60, // 1 hour (formerly cacheTime)
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
    enableServiceWorker(); // Enable aggressive caching
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="webinhours-theme">
          <TooltipProvider>
            <BrowserRouter>
            <ScrollToTop />
            <Helmet>
              <title>WebInHours - Professional Website Solutions</title>
              <meta name="description" content="Get your professional website ready in 24 hours. Choose from our marketplace of premium templates or get a custom design." />
            </Helmet>
            <GridBackground className="min-h-screen text-foreground">
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-foreground">Loading...</p>
                  </div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  {/* Services route removed - now using homepage services section */}
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
                  <Route path="/calculator" element={<Calculator />} />
                  <Route path="/site/:slugOrId" element={<SiteDetails />} />
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
                  <Route path="/notifications" element={
                    <ProtectedRoute>
                      <Notifications />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </GridBackground>
            <Toaster />
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
