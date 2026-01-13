import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./utils/scrollbarController";
import { clearAllAcknowledgments } from "./utils/acknowledgmentHelpers";
import { ShadowEffectsProvider } from "@/contexts/ShadowEffectsContext";
import { SkipLink } from "@/components/SkipLink";

// Clear acknowledgments on every app load so TeleAcknowledge fires on first click after refresh
try {
  clearAllAcknowledgments();
} catch (e) {
  console.warn("Failed to clear acknowledgments on load:", e);
}

createRoot(document.getElementById("root")!).render(
  <ShadowEffectsProvider>
    <SkipLink />
    <App />
  </ShadowEffectsProvider>
);
