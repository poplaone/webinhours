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
import { preloadCriticalResources, optimizeRenderPerformance, enableServiceWorker } from "@/utils/performanceOptimizer";
import { usePageTracking } from "@/hooks/usePageTracking";

// Lazy load all pages including Index for optimal code splitting
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
// Services page removed - now using homepage services section
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
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCancel = lazy(() => import("./pages/PaymentCancel"));
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
    enableServiceWorker(); // Enable aggressive caching
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="webinhours-theme">
            <TooltipProvider>
              <BrowserRouter>
                <ScrollToTop />
                <Helmet>
                  <title>WebInHour - Professional Website Solutions</title>
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
                      <Route path="/payment/success" element={<PaymentSuccess />} />
                      <Route path="/payment/cancel" element={<PaymentCancel />} />
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
    </ErrorBoundary>
  );
}

export default App;
