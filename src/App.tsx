
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PlanSelection from "./pages/PlanSelection";
import ProductForm from "./pages/ProductForm";
import Results from "./pages/Results";
import ApiSettings from "./pages/ApiSettings";
import NotFound from "./pages/NotFound";
import MobilePreview from "./components/MobilePreview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MobilePreview>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/plans" element={<PlanSelection />} />
            <Route path="/product-form" element={<ProductForm />} />
            <Route path="/results" element={<Results />} />
            <Route path="/api-settings" element={<ApiSettings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MobilePreview>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
