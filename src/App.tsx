import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LightboardProvider } from "@/contexts/LightboardContext";
import { VolumeProvider } from "@/contexts/VolumeContext";
import { CarColorProvider } from "@/contexts/CarColorContext";
import Index from "./pages/Index";
import DesignTokens from "./pages/DesignTokens";
import ImageGenerator from "./pages/ImageGenerator";

const App = () => (
  <TooltipProvider>
    <VolumeProvider>
      <CarColorProvider>
        <LightboardProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/design-tokens" element={<DesignTokens />} />
              <Route path="/generate-images" element={<ImageGenerator />} />
            </Routes>
          </BrowserRouter>
        </LightboardProvider>
      </CarColorProvider>
    </VolumeProvider>
  </TooltipProvider>
);

export default App;
