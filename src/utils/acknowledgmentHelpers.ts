import { sendToTele } from "./teleInteraction";

const getTodayToken = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const buildAuthToken = (dateToken: string): string => {
  const reversed = dateToken.split("").reverse().join("");
  return reversed.repeat(2);
};

// Global debug state for TeleAcknowledge notifications
let showTeleAcknowledgeDebug = false;

/**
 * Toggle debug notifications for TeleAcknowledge calls
 */
export function toggleTeleAcknowledgeDebug(): boolean {
  showTeleAcknowledgeDebug = !showTeleAcknowledgeDebug;
  return showTeleAcknowledgeDebug;
}

/**
 * Get current debug state
 */
export function isTeleAcknowledgeDebugEnabled(): boolean {
  return showTeleAcknowledgeDebug;
}

/**
 * Sends a message to the Tele assistant (virtual avatar)
 * This is a centralized utility to interact with the UIFramework's TeleAcknowledge function
 * @param message - The message to send to the Tele assistant
 */
export function notifyTele(message: string): void {
  if (!message || typeof message !== "string") {
    console.warn("[notifyTele] Invalid message provided:", message);
    return;
  }

  try {
    // Create instant flash effect for visual feedback
    createFlashEffect();

    // Dispatch teleThinkingStart immediately — triggers background pulse + thinking animation
    window.dispatchEvent(new CustomEvent('teleThinkingStart'));

    // Subtle flash on avatar for visual feedback (no sound)
    const teleNav = (window as any).teleNavigation;
    if (teleNav?.flashTeleSubtle) {
      teleNav.flashTeleSubtle();
    }

    sendToTele(message);

    // Show debug notification if enabled
    if (showTeleAcknowledgeDebug) {
      import("@/hooks/use-toast").then(({ toast }) => {
        toast({
          title: "Tele Notification",
          description: message,
          duration: 10000,
        });
      });
    }
  } catch (error) {
    console.error("[notifyTele] Error sending message:", error);
  }
}

/**
 * Creates a brief flash effect on the screen when tele interaction occurs
 * Provides instant visual feedback that something was clicked
 */
function createFlashEffect(): void {
  // Create flash overlay
  const flash = document.createElement('div');
  flash.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(155, 93, 229, 0.15) 0%, rgba(155, 93, 229, 0.05) 50%, transparent 70%);
    pointer-events: none;
    z-index: 9998;
    opacity: 1;
    transition: opacity 300ms ease-out;
  `;

  document.body.appendChild(flash);

  // Fade out and remove
  requestAnimationFrame(() => {
    flash.style.opacity = '0';
  });

  setTimeout(() => {
    flash.remove();
  }, 350);
}

interface AcknowledgmentConfig {
  key: string;
  message: string;
}

type AcknowledgmentId =
  // Navigation & UI actions (KEEP - generic)
  | "nav-back"
  | "nav-scroll-top"
  | "nav-menu-open"
  | "nav-menu-close"
  | "copy-deeplink"
  | "error-reset"
  | "error-reload"
  // Chat actions (KEEP - generic)
  | "chat-accept"
  | "chat-decline"
  // Carousel navigation (KEEP - used by WelcomeCarousel)
  | "carousel-nav"
  // Language switching (KEEP - documented feature)
  | "speak-language"
  // Welcome/learning (KEEP - relevant to university)
  | "starter-learn-more";

/**
 * Configuration mapping for acknowledgment messages
 * 
 * CLEANED UP: Removed legacy RFP/Accenture-specific configs (Jan 2026)
 * Kept: Generic navigation, error handling, chat, and university-relevant actions
 */
const ACKNOWLEDGMENT_CONFIG: Record<AcknowledgmentId, AcknowledgmentConfig> = {
  // Navigation & UI actions
  "nav-back": {
    key: "navBackAcknowledged",
    message: "Show me that we are navigating back to the welcome screen",
  },
  "nav-scroll-top": {
    key: "navScrollTopAcknowledged",
    message: "Show me that we are scrolling to the top of the page",
  },
  "nav-menu-open": {
    key: "navMenuOpenAcknowledged",
    message: "Show me that the navigation menu is opening",
  },
  "nav-menu-close": {
    key: "navMenuCloseAcknowledged",
    message: "Show me that the navigation menu is closing",
  },
  "copy-deeplink": {
    key: "copyDeeplinkAcknowledged",
    message: "Show me that the deep link has been copied to the clipboard",
  },
  "error-reset": {
    key: "errorResetAcknowledged",
    message: "Show me that the error boundary is being reset",
  },
  "error-reload": {
    key: "errorReloadAcknowledged",
    message: "Show me that the application is reloading",
  },

  // Chat actions
  "chat-accept": {
    key: "chatAcceptAcknowledged",
    message: "Show me that the chat invitation has been accepted",
  },
  "chat-decline": {
    key: "chatDeclineAcknowledged",
    message: "Show me that the chat invitation has been declined",
  },

  // Carousel navigation
  "carousel-nav": {
    key: "carouselNavAcknowledged",
    message: "Show me that we are navigating through carousel slides",
  },

  // Language switching
  "speak-language": {
    key: "speakAnyLanguageAcknowledged",
    message: "Show me that I can just start speaking a different language and you will automatically change to speak in that language",
  },

  // Learning actions
  "starter-learn-more": {
    key: "starterLearnMoreAcknowledged",
    message: "Show me more about tele capabilities",
  },
};


/**
 * Handle acknowledgment for a specific pill/card
 * This function checks if the acknowledgment has already been done and triggers it if needed
 *
 * @param pillId - The unique identifier for the pill/card
 * @returns true if acknowledgment was triggered, false if already acknowledged
 */
export function handleAcknowledgment(pillId: string): boolean {
  const config = ACKNOWLEDGMENT_CONFIG[pillId as AcknowledgmentId];

  console.log("[handleAcknowledgment] Called with pillId:", pillId, "Debug enabled:", showTeleAcknowledgeDebug);

  if (!config) {
    return false;
  }
  const hasAcknowledged = sessionStorage.getItem(config.key);

  console.log("[handleAcknowledgment] Has been acknowledged before:", !!hasAcknowledged);

  if (!hasAcknowledged) {
    notifyTele(config.message);
    sessionStorage.setItem(config.key, "true");
    return true;
  } else {
    console.log("[handleAcknowledgment] Already acknowledged in this session, skipping");
  }

  return false;
}

/**
 * Clear all acknowledgment flags from sessionStorage
 * This aggressively clears EVERYTHING to ensure TeleAcknowledge fires on first click after refresh
 */
export function clearAllAcknowledgments(): void {
  // Clear all known acknowledgment keys
  Object.values(ACKNOWLEDGMENT_CONFIG).forEach((config) => {
    sessionStorage.removeItem(config.key);
  });

  // Also clear any legacy or unknown acknowledgment keys
  // Pattern match for any "*Acknowledged" keys that might exist
  const keysToRemove: string[] = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key && key.toLowerCase().includes("acknowledged")) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => sessionStorage.removeItem(key));
}

