
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Blog from "./pages/Blog";
import IdeaDetail from "./pages/IdeaDetail";
import IdeaCreation from "./pages/IdeaCreation";
import ConceptDetail from "./pages/ConceptDetail";
import ConceptDetailsView from './pages/ConceptDetailsView';
import ConceptTestingResults from './pages/ConceptTestingResults';
import ConceptTestingDashboard from './pages/ConceptTestingDashboard';
import Auth from "./pages/Auth";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/blog" element={<Blog />} />
              
              {/* Public browsing routes - no auth required */}
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Protected Routes - require auth for creation/editing */}
              <Route path="/idea/new" element={
                <ProtectedRoute>
                  <IdeaCreation />
                </ProtectedRoute>
              } />
              <Route path="/idea/:id" element={
                <ProtectedRoute>
                  <IdeaDetail />
                </ProtectedRoute>
              } />
              <Route path="/concept/:id" element={
                <ProtectedRoute>
                  <ConceptDetail />
                </ProtectedRoute>
              } />
              <Route path="/concept-details/:conceptId" element={
                <ProtectedRoute>
                  <ConceptDetailsView />
                </ProtectedRoute>
              } />
              <Route path="/concept-testing/:id" element={
                <ProtectedRoute>
                  <ConceptTestingResults />
                </ProtectedRoute>
              } />
              <Route path="/concept-testing" element={
                <ProtectedRoute>
                  <ConceptTestingDashboard />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/notifications" element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
