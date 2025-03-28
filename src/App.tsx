
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import IdeaDetail from "./pages/IdeaDetail";
import IdeaCreation from "./pages/IdeaCreation";
import ConceptDetail from "./pages/ConceptDetail";
import ConceptDetailsView from './pages/ConceptDetailsView';
import ConceptTestingResults from './pages/ConceptTestingResults';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/idea/new" element={<IdeaCreation />} />
            <Route path="/idea/:id" element={<IdeaDetail />} />
            <Route path="/concept/:id" element={<ConceptDetail />} />
            <Route path="/concept-details/:conceptId" element={<ConceptDetailsView />} />
            <Route path="/concept-testing/:id" element={<ConceptTestingResults />} />
            <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings Page</h1><p className="mt-2">Settings content will appear here.</p></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
