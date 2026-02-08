
import { useState, useEffect, useCallback, useRef, useMemo, FormEvent, ChangeEvent } from "react";
import Navigation from "@/components/Navigation";
import TelelaborSection from "@/components/TelelaborSection";
import { useSectionTransition } from "@/utils/useSectionTransition";
import { backgroundHero, backgroundEmpty } from "@/assets";
import { AvatarState } from "@/components/TelelaborIcons";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SectionLoadingFallback } from "@/components/SectionLoadingFallback";
import { SEO, sectionSEO } from "@/components/SEO";

import { notifyTele, handleAcknowledgment, toggleTeleAcknowledgeDebug } from "@/utils/acknowledgmentHelpers";
import { sendSectionContextToTele } from "@/utils/contextEnrichment";
import { EvidenceData } from "@/types/evidence";
import { SubsectionMetadata } from "@/types/subsection";
import { NavigationHistoryEntry } from "@/types/navigation";
import { toast } from "@/hooks/use-toast";
import { playUISound } from "@/utils/soundGenerator";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { exposeNavigationAPI } from "@/utils/uiFrameworkRegistration";
import { DynamicSectionLoader } from "@/components/DynamicSectionLoader";
import { BackToTop } from "@/components/BackToTop";
import { OTPDialog } from "@/components/OTPDialog";

import { CarColorProvider } from "@/contexts/CarColorContext";

import { GitVersionIndicator } from "@/components/GitVersionIndicator";
import { OnboardingTransition } from "@/components/OnboardingTransition";
import { Logo } from "@/components/Logo";


// Welcome section — MOBEUS UNIVERSITY: The Screen Finally Cares
const WELCOME_VARIANTS = [
  {
    badge: "MOBEUS UNIVERSITY",
    title: "The Screen Finally Cares",
    subtitle: "Learn how conversational labor changes everything.",
    generativeSubsections: [
      // 0. WelcomeCarousel - Journey cards
      {
        id: "journey-carousel",
        templateId: "WelcomeCarousel",
        props: {
          cards: [
            { question: "What is Mobeus?", subtext: "Transforming software into conversational labor.", icon: "Sparkles", actionPhrase: "what is mobeus" },
            { question: "What's a tele?", subtext: "Conversational workers. Not chatbots.", icon: "Users", actionPhrase: "what is a tele" },
            { question: "What's Teleglass?", subtext: "The platform for conversational labor.", icon: "Globe", actionPhrase: "tell me about teleglass" },
            { question: "How is this different?", subtext: "50 years: humans→machines. We inverted that.", icon: "Zap", actionPhrase: "how is this different from software" },
            { question: "Who built this?", subtext: "Richie Etwaru and Mike Sutcliff. 5 years ago.", icon: "Users", actionPhrase: "who founded mobeus" },
            { question: "When is launch?", subtext: "March/April 2026 — Be there when help arrives.", icon: "Calendar", actionPhrase: "sign up for the launch event", isAccent: true, accentColor: "purple" }
          ]
        }
      },
      // 1. Hero - The Promise
      {
        id: "promise-hero",
        templateId: "Hero",
        props: {
          headline: "The Screen Finally Cares",
          description: "Conversational labor is coming.",
          ctaLabel: "See How",
          ctaActionPhrase: "what is mobeus"
        }
      },
      // 2. Trio - Three Innovations
      {
        id: "three-innovations",
        templateId: "Trio",
        props: {
          cards: [
            {
              icon: "Cpu",
              title: "Dual-Agent",
              description: "Build Agent constructs. Runtime Agent delivers.",
              actionPhrase: "explain dual-agent"
            },
            {
              icon: "Globe",
              title: "DOM-LLM Bridge",
              description: "Language becomes live experiences.",
              actionPhrase: "explain dom-llm bridge"
            },
            {
              icon: "Sparkles",
              title: "Generative Web",
              description: "Pages adapt to you.",
              actionPhrase: "explain generative web"
            }
          ],
          numbered: false,
          ctaLabel: "Learn More",
          ctaActionPhrase: "show me how teleglass works"
        }
      },
      // 3. Quote - The Promise
      {
        id: "the-promise",
        templateId: "Quote",
        props: {
          quote: "Help is here.",
          author: "The Tele Population",
          role: "Conversational Labor"
        }
      },
      // 4. Banner - Get Started
      {
        id: "get-started",
        templateId: "Banner",
        props: {
          headline: "The Teleglass Launch Event",
          subheadline: "March/April 2026",
          ctaLabel: "Reserve Your Spot",
          ctaActionPhrase: "sign up for the launch event",
          variant: "gradient"
        }
      }
    ]
  },
];






const STORAGE_KEY = "aiworks-access";
const API_BASE_URL = (import.meta.env.VITE_PROMPT_TOOL_API_URL || "https://prompt.mobeus.ai").replace(/\/$/, "");

// SUBSECTION-ONLY ARCHITECTURE: "Welcome" is now a generative template too.
// All content is dynamic and subsection-based

// All sections now dynamically loaded via DynamicSectionLoader

const showWelcomeVideo = true;

const Index = () => {
  // ========================================
  // ONBOARDING STATE (simplified - always complete)
  // ========================================
  // Static onboarding removed - always show dynamic experience directly
  const isOnboardingComplete = true;
  const isTransitioning = false;
  const contentRevealed = true;

  // No-op functions (preserved for API compatibility if OnboardingTransition needs them)
  const completeOnboarding = () => { };

  // ========================================
  // DYNAMIC EXPERIENCE STATE
  // ========================================

  // Use the generative welcome variant - static and pre-generated
  const WELCOME_DATA = useMemo(() => {
    return {
      badge: WELCOME_VARIANTS[0].badge,
      title: WELCOME_VARIANTS[0].title,
      subtitle: WELCOME_VARIANTS[0].subtitle,
      subsectionIds: [], // Legacy IDs removed
      generativeSubsections: WELCOME_VARIANTS[0].generativeSubsections
    };
  }, []);

  const [activeSection, setActiveSection] = useState<string>("welcome");
  const [activeSubSection, setActiveSubSection] = useState<string[] | null>(null);
  const [activeSubSectionMetadata, setActiveSubSectionMetadata] = useState<SubsectionMetadata[] | null>(null);
  const [displayData, setDisplayData] = useState<EvidenceData | null>(null);
  const [dynamicSectionData, setDynamicSectionData] = useState<{
    badge: string;
    title: string;
    subtitle?: string;
    subsectionIds: string[];
    generativeSubsections?: any[]; // New Generative Structure
  } | null>(null);
  const [isChatGlassOpen, setIsChatGlassOpen] = useState(false);
  const [avatarState, setAvatarState] = useState<AvatarState>("off");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { shouldAnimate, scrollHintClass } = useSectionTransition(activeSection);
  const pendingSubSectionRef = useRef<string | string[] | null>(null);
  const [navigationBackData, setNavigationBackData] = useState<any>(null);
  const [backData, setBackData] = useState<any>(null);
  const [isOTPDialogOpen, setIsOTPDialogOpen] = useState(false);

  // Navigation History - Store complete state snapshots for instant back navigation
  const [navigationHistory, setNavigationHistory] = useState<NavigationHistoryEntry[]>([
    {
      timestamp: Date.now(),
      section: 'welcome',
      type: 'welcome',
      snapshot: {
        activeSection: 'welcome',
        activeSubSection: null,
        activeSubSectionMetadata: null,
        dynamicSectionData: null,
        displayData: null,
        originalPayload: 'welcome'
      }
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Track previous template structure for smart scrolling
  // Only scroll to top when template IDs or their order changes
  const previousTemplateStructureRef = useRef<string>("");

  // Helper to get template structure signature (templateIds in order)
  const getTemplateStructureSignature = useCallback((generativeSubsections?: any[]): string => {
    if (!generativeSubsections || generativeSubsections.length === 0) return "";
    return generativeSubsections.map(s => s.templateId || s.id).join("|");
  }, []);

  const cleanupSessionStorage = useCallback(() => {
    if (typeof window === "undefined" || typeof window.sessionStorage === "undefined") {
      return;
    }

    try {
      sessionStorage.clear();
    } catch (error) {
      console.warn("[SessionStorage] Failed to clear session data", error);
    }
  }, []);

  const smoothScrollToTop = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    const duration = 600;
    const start = window.scrollY;
    if (start === 0) {
      return;
    }

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, start * (1 - easedProgress));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, []);

  // Add entry to navigation history
  const addToHistory = useCallback((entry: NavigationHistoryEntry) => {
    setNavigationHistory(prev => {
      // Remove any "future" history if user went back then navigated forward
      const trimmed = prev.slice(0, historyIndex + 1);
      return [...trimmed, entry];
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  // Navigate backward through history (instant restoration from cache)
  const navigateBack = useCallback(() => {
    if (historyIndex <= 0) {
      return false;
    }

    const previousEntry = navigationHistory[historyIndex - 1];
    console.log('[History] Navigating back to:', previousEntry.section, 'from index', historyIndex, 'to', historyIndex - 1);

    // Instant state restoration from snapshot
    setActiveSection(previousEntry.snapshot.activeSection);
    setActiveSubSection(previousEntry.snapshot.activeSubSection);
    setActiveSubSectionMetadata(previousEntry.snapshot.activeSubSectionMetadata);
    setDynamicSectionData(previousEntry.snapshot.dynamicSectionData);
    setDisplayData(previousEntry.snapshot.displayData);

    // Update history index
    setHistoryIndex(historyIndex - 1);

    // Smooth scroll to top
    smoothScrollToTop();

    return true;
  }, [historyIndex, navigationHistory, smoothScrollToTop]);

  // Navigate forward through history
  const navigateForward = useCallback(() => {
    if (historyIndex >= navigationHistory.length - 1) {
      return false;
    }

    const nextEntry = navigationHistory[historyIndex + 1];
    console.log('[History] Navigating forward to:', nextEntry.section, 'from index', historyIndex, 'to', historyIndex + 1);

    // Instant state restoration from snapshot
    setActiveSection(nextEntry.snapshot.activeSection);
    setActiveSubSection(nextEntry.snapshot.activeSubSection);
    setActiveSubSectionMetadata(nextEntry.snapshot.activeSubSectionMetadata);
    setDynamicSectionData(nextEntry.snapshot.dynamicSectionData);
    setDisplayData(nextEntry.snapshot.displayData);

    // Update history index
    setHistoryIndex(historyIndex + 1);

    // Smooth scroll to top
    smoothScrollToTop();

    return true;
  }, [historyIndex, navigationHistory, smoothScrollToTop]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    cleanupSessionStorage();

    const handlePageShow = () => {
      cleanupSessionStorage();
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [cleanupSessionStorage]);

  // Toggle body class for background pulsing effect while connecting
  useEffect(() => {
    if (isConnecting) {
      document.body.classList.add('avatar-connecting');
    } else {
      document.body.classList.remove('avatar-connecting');
    }
    return () => {
      document.body.classList.remove('avatar-connecting');
    };
  }, [isConnecting]);

  const attachUIFrameworkDisconnectCleanup = useCallback(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const framework: any = (window as any).UIFramework;
    if (!framework) {
      return false;
    }

    const methodNames = ["disconnectAvatar", "disconnectHeyGen", "disconnectOpenAI", "disconnectAll"] as const;

    methodNames.forEach((methodName) => {
      const original = framework[methodName];
      if (typeof original !== "function" || (original as any).__sessionCleanupWrapped) {
        return;
      }

      const wrapped = async (...args: any[]) => {
        try {
          return await original.apply(framework, args);
        } finally {
          cleanupSessionStorage();
        }
      };

      (wrapped as any).__sessionCleanupWrapped = true;
      framework[methodName] = wrapped;
    });

    return methodNames.every((methodName) => {
      const fn = framework[methodName];
      return typeof fn !== "function" || (fn as any).__sessionCleanupWrapped;
    });
  }, [cleanupSessionStorage]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (attachUIFrameworkDisconnectCleanup()) {
      return;
    }

    const interval = window.setInterval(() => {
      if (attachUIFrameworkDisconnectCleanup()) {
        window.clearInterval(interval);
      }
    }, 500);

    return () => {
      window.clearInterval(interval);
    };
  }, [attachUIFrameworkDisconnectCleanup]);

  const handleSectionChange = useCallback(
    (section: string, subSection?: string | string[] | SubsectionMetadata[] | null, generativeContent?: any[], shouldScrollToTop: boolean = true) => {
      // SUBSECTION-ONLY: Only validate "welcome" as a special case
      const isWelcome = section.toLowerCase() === "welcome";
      const target = isWelcome ? "welcome" : section;

      // Extract IDs and metadata from subsection parameter
      let subsectionIds: string[] | null = null;
      let metadata: SubsectionMetadata[] | null = null;

      if (subSection) {
        if (Array.isArray(subSection) && subSection.length > 0) {
          if (typeof subSection[0] === "object" && "id" in subSection[0]) {
            // Array of SubsectionMetadata objects - use as-is
            metadata = subSection as SubsectionMetadata[];
            subsectionIds = metadata.map((m) => m.id);
          } else {
            // Array of strings - generate metadata
            subsectionIds = subSection as string[];
            metadata = [];
          }
        } else if (typeof subSection === "string") {
          // Single string - generate metadata
          subsectionIds = [subSection];
          metadata = [];
        }
      }

      // Handle Generative Content - Only if present
      if (generativeContent && generativeContent.length > 0) {
        // If we have generative content, we prioritize it.
        // We don't necessarily need 'subsectionIds' other than to trigger the view switch.
        // However, we'll ensure we have *some* target to switch to.
      } else if (subsectionIds && subsectionIds.length > 1) {
        const seen = new Set<string>();
        const uniqueIds: string[] = [];
        for (const id of subsectionIds) {
          if (!seen.has(id)) {
            seen.add(id);
            uniqueIds.push(id);
          }
        }
        subsectionIds = uniqueIds;
        if (metadata && metadata.length > 0) {
          const metadataMap = new Map(metadata.map((item) => [item.id, item]));
          metadata = uniqueIds.map((id) => metadataMap.get(id)).filter(Boolean) as SubsectionMetadata[];
        }
      }

      pendingSubSectionRef.current = subsectionIds;

      if (target === activeSection) {
        setActiveSubSection(pendingSubSectionRef.current as string[] | null);
        setActiveSubSectionMetadata(metadata);
        // Only scroll if structure changed
        if (shouldScrollToTop) {
          smoothScrollToTop();
        }
        pendingSubSectionRef.current = null;
        return true;
      }

      if (activeSection === "dynamic-evidence") {
        setDisplayData(null);
      }

      if (!subSection && !generativeContent) {
        setActiveSubSection(null);
        setActiveSubSectionMetadata(null);
      }

      setIsExiting(true);
      setTimeout(() => {
        setActiveSection(target);
        setIsExiting(false);
        setActiveSubSection(pendingSubSectionRef.current as string[] | null);
        setActiveSubSectionMetadata(metadata);

        // Send enriched context to Tele for better intention capture
        sendSectionContextToTele(target);

        // Only scroll to top if structure changed (templates/order different)
        if (shouldScrollToTop) {
          // Wait for content to render and layout to stabilize before scrolling
          requestAnimationFrame(() => {
            setTimeout(() => {
              // Enhanced smooth scroll to top
              const duration = 600;
              const start = window.scrollY;
              const startTime = performance.now();

              const animateScroll = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic for smooth deceleration
                const easedProgress = 1 - Math.pow(1 - progress, 3);

                window.scrollTo(0, start * (1 - easedProgress));

                if (progress < 1) {
                  requestAnimationFrame(animateScroll);
                }
              };

              requestAnimationFrame(animateScroll);
            }, 100); // Wait 100ms for DOM to fully render and stabilize
          });
        }

        pendingSubSectionRef.current = null;
      }, 1000);

      return true;
    },
    [activeSection, smoothScrollToTop],
  );

  const handlePasswordVerification = useCallback(async (password: string) => {
    const trimmedPassword = password.trim();
    if (!trimmedPassword) {
      setAuthError("Password is required");
      return;
    }

    setIsSubmittingPassword(true);
    setAuthError(null);

    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/auth/password` : "/auth/password";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: trimmedPassword }),
      });

      if (!response.ok) {
        setAuthError(response.status === 401 ? "Incorrect password" : "Unable to verify password. Please try again.");
        return;
      }

      const data = (await response.json()) as {
        level: "temporary" | "permanent";
        expiresAt?: number | null;
        expiresInMs?: number | null;
      };
      const expiresAt =
        typeof data.expiresAt === "number"
          ? data.expiresAt
          : typeof data.expiresInMs === "number"
            ? Date.now() + data.expiresInMs
            : null;

      const payload = {
        level: data.level,
        expiresAt,
      };

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setIsAuthorized(true);
    } catch (error) {
      console.error("Password verification error", error);
      setAuthError("Unable to verify password. Please try again.");
    } finally {
      setIsSubmittingPassword(false);
      setIsCheckingAuth(false);
    }
  }, []);

  const handlePasswordInput = useCallback(() => {
    if (authError) {
      setAuthError(null);
    }
  }, [authError]);



  useEffect(() => {
    if (typeof window === "undefined") {
      setIsCheckingAuth(false);
      return;
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setIsCheckingAuth(false);
        return;
      }

      const parsed = JSON.parse(stored) as { level: "temporary" | "permanent"; expiresAt: number | null } | null;
      if (!parsed) {
        window.localStorage.removeItem(STORAGE_KEY);
        setIsCheckingAuth(false);
        return;
      }

      if (parsed.expiresAt && parsed.expiresAt <= Date.now()) {
        window.localStorage.removeItem(STORAGE_KEY);
        setIsCheckingAuth(false);
        return;
      }

      setIsAuthorized(true);
    } catch (error) {
      console.error("Failed to parse stored access token", error);
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsCheckingAuth(false);
    }
  }, []);

  // Helper function to get a random video from an array
  const getRandomVideo = useCallback((videos: string[]): string => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex];
  }, []);

  // Helper function to show error video
  const showErrorVideo = useCallback(async () => {
    const ui: any = (window as any).UIFramework;
    if (showWelcomeVideo) {
      const micErrorVideos = ["/Mic error 1.mp4", "/Mic error 2.mp4", "/Mic error 3.mp4"];
      const selectedVideo = getRandomVideo(micErrorVideos);
      try {
        ui?.setBackground?.({ video: { src: selectedVideo, muted: false, loop: false, volume: 0.5 } });
      } catch (_) {
        //
      }
    }
  }, [getRandomVideo, showWelcomeVideo]);

  // Set up microphone permission listener
  useEffect(() => {
    let permissionStatus: PermissionStatus | null = null;

    const setupPermissionListener = async () => {
      try {
        permissionStatus = await navigator.permissions.query({ name: "microphone" as PermissionName });
        permissionStatus.onchange = async () => {
          if ((avatarState === "connected" || avatarState === "connecting") && permissionStatus.state === "denied") {
            if (avatarState === "connected") {
              await disconnect();
            }
            showErrorVideo();
          }
        };
      } catch (err) {
        // Browser might not support Permissions API
      }
    };

    setupPermissionListener();

    return () => {
      if (permissionStatus) {
        permissionStatus.onchange = null;
      }
    };
  }, [avatarState]);

  useEffect(() => {
    const loader = (rawJson: string) => {
      try {
        const parsed = JSON.parse(rawJson) as EvidenceData;
        setDisplayData(parsed);
        toast({
          title: "Data generated in real time.",
          description: "RAG of RFP response document used.",
        });
      } catch (error) {
        toast({
          title: "Invalid data",
          description: "Could not parse the provided JSON string.",
          variant: "destructive",
        });
      }
    };

    // Expose loader globally so other scripts can update the section content.
    (window as any).dynamicDataLoader = loader;

    return () => {
      if ((window as any).dynamicDataLoader === loader) {
        delete (window as any).dynamicDataLoader;
      }
    };
  }, []);

  useEffect(() => {
    const parseNavigationPayload = (payload: unknown): "welcome" | Record<string, any> | null => {
      if (payload == null) {
        return null;
      }
      if (typeof payload === "string") {
        const trimmed = payload.trim();
        if (!trimmed) return null;
        if (trimmed.toLowerCase() === "welcome") return "welcome";
        try {
          return JSON.parse(trimmed);
        } catch (_) {
          try {
            // Accept JS-style objects (single quotes, trailing commas, etc.)
            const fn = new Function(`return (${trimmed});`);
            return fn();
          } catch (err) {
            console.warn("[Navigation] Unable to parse navigation string:", err);
            return null;
          }
        }
      }
      if (typeof payload === "object") {
        return payload as Record<string, any>;
      }
      return null;
    };

    const ensureArray = (value: any): string[] | null => {
      if (Array.isArray(value)) {
        return value.filter(Boolean).map(String);
      }
      if (typeof value === "string" && value.trim()) {
        return [value.trim()];
      }
      return null;
    };

    const buildMetadataFromHeaders = (ids: string[], headers: unknown): SubsectionMetadata[] => {
      if (!Array.isArray(headers) || ids.length === 0) {
        return [];
      }

      const entries = ids.map((id, index) => {
        const rawTitle = headers[index];
        if (typeof rawTitle !== "string" || !rawTitle.trim()) {
          return null;
        }
        return {
          id,
          badge: "",
          title: rawTitle.trim(),
          subtitle: "",
        } as SubsectionMetadata;
      });
      return entries.filter(Boolean) as SubsectionMetadata[];
    };

    const mergeMetadata = (
      base: SubsectionMetadata[],
      override: SubsectionMetadata[]
    ): SubsectionMetadata[] => {
      if (!override.length) {
        return base;
      }
      const map = new Map<string, SubsectionMetadata>();
      base.forEach((item) => map.set(item.id, item));
      override.forEach((item) => {
        const existing = map.get(item.id);
        map.set(item.id, {
          ...existing,
          ...item,
        });
      });
      return Array.from(map.values());
    };

    const parseSubsectionsInput = (
      value: unknown
    ): { ids: string[]; metadata: SubsectionMetadata[] } => {
      if (!Array.isArray(value)) {
        return { ids: [], metadata: [] };
      }

      const ids: string[] = [];
      const metadataMap = new Map<string, SubsectionMetadata>();

      value.forEach((entry) => {
        if (!entry || typeof entry !== "object") {
          return;
        }
        const record = entry as Record<string, any>;
        const id = typeof record.subsectionId === "string" ? record.subsectionId : null;
        if (!id) return;

        if (!ids.includes(id)) {
          ids.push(id);
        }

        const title = record["h2-title"] || record["h2Title"] || record["title"] || "";
        const badge = typeof record.badge === "string" ? record.badge : "";
        const subtitle = typeof record.subtitle === "string" ? record.subtitle : "";

        metadataMap.set(id, {
          id,
          badge,
          title: title || "",
          subtitle,
        });
      });

      return { ids, metadata: Array.from(metadataMap.values()) };
    };

    const buildLegacyPayload = (args: any[]): Record<string, any> => {
      const legacyPayload: Record<string, any> = {};

      // Check each argument and assign appropriately
      for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        // If it's an array, check if it contains generative content (has templateId)
        if (Array.isArray(arg)) {
          const isGenerative = arg.length > 0 && arg.some(item => item && typeof item === 'object' && 'templateId' in item);

          if (isGenerative) {
            legacyPayload.generativeSubsections = arg;
            console.log('[buildLegacyPayload] Found generativeSubsections at position', i, 'with', arg.length, 'templates');
          } else if (arg.length > 0) {
            // Non-generative array (legacy subsections)
            legacyPayload.subsections = arg;
          }
          // Skip empty arrays
        } else if (typeof arg === 'string' && arg.trim()) {
          // String arguments go to badge, title, subtitle in order
          if (!legacyPayload.badge) {
            legacyPayload.badge = arg;
          } else if (!legacyPayload.title) {
            legacyPayload.title = arg;
          } else if (!legacyPayload.subtitle) {
            legacyPayload.subtitle = arg;
          }
        } else if (typeof arg === 'object' && arg !== null && !Array.isArray(arg)) {
          // If it's an object, it might be the full payload - merge it
          if ('generativeSubsections' in arg) {
            legacyPayload.generativeSubsections = arg.generativeSubsections;
            console.log('[buildLegacyPayload] Found generativeSubsections in object arg at position', i);
          }
          if ('badge' in arg && typeof arg.badge === 'string') legacyPayload.badge = arg.badge;
          if ('title' in arg && typeof arg.title === 'string') legacyPayload.title = arg.title;
          if ('subtitle' in arg && typeof arg.subtitle === 'string') legacyPayload.subtitle = arg.subtitle;
          if ('subsections' in arg) legacyPayload.subsections = arg.subsections;
        }
      }

      console.log('[buildLegacyPayload] Final payload:', {
        badge: legacyPayload.badge,
        title: legacyPayload.title,
        hasGenerative: !!legacyPayload.generativeSubsections,
        generativeCount: legacyPayload.generativeSubsections?.length || 0
      });

      return legacyPayload;
    };

    // Telelabor Navigation System - simplified interface
    const teleNavigation = {
      navigateToSection: (...navigationData: any[]) => {
        // DEBUG: Log raw input from runtime agent
        console.log('[Navigation] RAW INPUT:', JSON.stringify(navigationData, null, 2));

        const payload =
          navigationData.length > 1 ? buildLegacyPayload(navigationData) : navigationData[0];

        // DEBUG: Log payload after buildLegacyPayload
        console.log('[Navigation] PAYLOAD:', JSON.stringify(payload, null, 2));

        const parsed = parseNavigationPayload(payload);

        // DEBUG: Log parsed result
        console.log('[Navigation] PARSED:', JSON.stringify(parsed, null, 2));
        console.log('[Navigation] Has generativeSubsections?', !!(parsed as any)?.generativeSubsections);
        console.log('[Navigation] generativeSubsections count:', (parsed as any)?.generativeSubsections?.length || 0);

        if (!parsed) {
          console.error('[Navigation] FAILED TO PARSE - returning false');
          return false;
        }

        if (parsed === "welcome" || parsed?.action === "goHome") {
          handleAcknowledgment("welcome");
          setDynamicSectionData(null);
          setActiveSubSection(null);
          handleSectionChange("welcome", null);

          // Add welcome to history so back/forward works through home navigation
          setTimeout(() => {
            const historyEntry: NavigationHistoryEntry = {
              timestamp: Date.now(),
              section: 'welcome',
              type: 'welcome',
              snapshot: {
                activeSection: 'welcome',
                activeSubSection: null,
                activeSubSectionMetadata: null,
                dynamicSectionData: null,
                displayData: null,
                originalPayload: 'welcome'
              }
            };
            addToHistory(historyEntry);
            console.log('[History] Added welcome entry, Total history:', navigationHistory.length + 1);
          }, 1100);

          return true;
        }

        setNavigationBackData(navigationData);

        const badge = parsed.badge ?? "";
        const title = parsed.title ?? "";
        const subtitle = parsed.subtitle;

        // ----------------------------------------------------
        // GENERATIVE UI HANDLING
        // ----------------------------------------------------
        // The Tele payload should now contain 'generativeSubsections'
        // Format: Array<{ templateId: string, props: any, title?: string }>
        const generativeContent: any[] = parsed.generativeSubsections || [];
        const hasGenerativeContent = generativeContent.length > 0;

        // Legacy Fallback
        const subsectionIdsFromHeaders = ensureArray(parsed.subsectionsIds) ?? ensureArray(parsed.subsectionIds);
        const { ids: structuredIds, metadata: structuredMetadata } = parseSubsectionsInput(parsed.subsections);
        const finalSubsectionIds =
          structuredIds.length > 0
            ? structuredIds
            : subsectionIdsFromHeaders
              ? subsectionIdsFromHeaders
              : ensureArray(parsed.subsectionId) ?? [];

        // If we have generative content, we fake IDs if needed or use GUIDs in the loader
        // But for 'title' and 'badge' we use what's passed
        const headerMetadata = buildMetadataFromHeaders(finalSubsectionIds, parsed.headers);
        const subsectionMetadata = mergeMetadata(structuredMetadata, headerMetadata);

        // Parse explicit section if provided (e.g., "all" from All menu)
        const explicitSection =
          typeof parsed.section === "string" ? parsed.section
            : typeof parsed.sectionId === "string" ? parsed.sectionId
              : null;

        // Use explicit section if provided, otherwise infer from first subsection ID or default to 'dynamic'
        const nextSection = explicitSection
          || (finalSubsectionIds && finalSubsectionIds.length
            ? finalSubsectionIds[0]?.split("-")[0] || "dynamic"
            : "dynamic"); // Default to dynamic node

        console.log('[Navigation] Setting dynamic section data:', {
          mode: hasGenerativeContent ? "GENERATIVE" : "LEGACY",
          badge: badge || "INSIGHT",
          title: title || "Curated Overview",
          subtitle,
          genCount: generativeContent.length,
          legacyIds: finalSubsectionIds
        });

        // Store EVERYTHING in dynamicSectionData state
        if (badge || title || hasGenerativeContent || finalSubsectionIds.length > 0) {
          setDynamicSectionData({
            badge: badge || "INSIGHT",
            title: title || "Curated Overview",
            subtitle,
            subsectionIds: finalSubsectionIds, // Legacy, kept for fallback
            generativeSubsections: generativeContent // New payload
          });
        } else {
          setDynamicSectionData(null);
        }

        handleAcknowledgment(nextSection);

        // SMART SCROLL: Compare template structure to decide if we should scroll
        // If only data changed (same templates in same order), don't scroll
        const newStructure = getTemplateStructureSignature(generativeContent);
        const previousStructure = previousTemplateStructureRef.current;
        const structureChanged = newStructure !== previousStructure;

        // Update the ref with new structure
        previousTemplateStructureRef.current = newStructure;

        console.log('[Navigation] Smart scroll check:', {
          previousStructure: previousStructure || "(empty)",
          newStructure: newStructure || "(empty)",
          structureChanged
        });

        // Notify Main Index of change, passing whether structure changed
        handleSectionChange(nextSection, subsectionMetadata, generativeContent, structureChanged);

        // Capture complete state snapshot for history AFTER navigation completes
        const newDynamicSectionData = (badge || title || hasGenerativeContent || finalSubsectionIds.length > 0) ? {
          badge: badge || "INSIGHT",
          title: title || "Curated Overview",
          subtitle,
          subsectionIds: finalSubsectionIds,
          generativeSubsections: generativeContent
        } : null;

        setTimeout(() => {
          const historyEntry: NavigationHistoryEntry = {
            timestamp: Date.now(),
            section: nextSection,
            type: 'dynamic',
            snapshot: {
              activeSection: nextSection,
              activeSubSection: finalSubsectionIds.length > 0 ? finalSubsectionIds : null,
              activeSubSectionMetadata: subsectionMetadata.length > 0 ? subsectionMetadata : null,
              dynamicSectionData: newDynamicSectionData,
              displayData: null,
              originalPayload: navigationData
            }
          };

          addToHistory(historyEntry);
          console.log('[History] Added entry:', historyEntry.section, 'Total history:', navigationHistory.length + 1);
        }, 1100); // After transition completes (handleSectionChange uses 1000ms)

        return true;
      },
      getCurrentSection: () => activeSection,
      flashTele: () => {
        setShowFlash(true);
        playUISound('on', 'avatar');
        setTimeout(() => setShowFlash(false), 600);
      },
      // Subtle flash for click feedback - no sound, shorter duration, lower opacity
      flashTeleSubtle: () => {
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 250);
      },
      // Scroll page up or down with configurable amount
      scrollPage: (direction: string, amount?: string | number) => {
        const normalizedDirection = direction?.trim().toLowerCase();
        if (!['up', 'down'].includes(normalizedDirection)) {
          console.warn('[scrollPage] Invalid direction:', direction);
          return 'Invalid direction';
        }

        // Parse amount - default to 'medium' if not specified
        let scrollAmount = 400; // medium default (pixels)
        if (typeof amount === 'number') {
          scrollAmount = Math.abs(amount);
        } else if (typeof amount === 'string') {
          const normalizedAmount = amount.trim().toLowerCase();
          switch (normalizedAmount) {
            case 'little':
            case 'small':
            case 'slight':
              scrollAmount = 150;
              break;
            case 'medium':
            case 'normal':
              scrollAmount = 400;
              break;
            case 'lot':
            case 'large':
            case 'much':
            case 'more':
              scrollAmount = 800;
              break;
            case 'max':
            case 'maximum':
            case 'all':
            case 'bottom':
            case 'top':
              scrollAmount = normalizedDirection === 'down'
                ? document.body.scrollHeight
                : window.scrollY;
              break;
            default: {
              // Try to parse as number
              const parsed = parseInt(normalizedAmount, 10);
              if (!isNaN(parsed)) scrollAmount = Math.abs(parsed);
            }
          }
        }

        // Calculate scroll position
        const scrollY = normalizedDirection === 'down'
          ? scrollAmount
          : -scrollAmount;

        // Smooth scroll
        window.scrollBy({
          top: scrollY,
          behavior: 'smooth'
        });

        console.log(`[scrollPage] Scrolled ${normalizedDirection} by ${scrollAmount}px`);
        return `Scrolled ${normalizedDirection} by ${scrollAmount}px`;
      },
      setPageContrast: (mode: string) => {
        const normalizedMode = mode?.trim().toLowerCase();
        if (!['high', 'normal', 'low'].includes(normalizedMode)) {
          console.warn('[setPageContrast] Invalid mode:', mode);
          return 'Invalid mode';
        }

        const rootHtml = document.documentElement;

        switch (normalizedMode) {
          case 'high':
            rootHtml.style.filter = 'contrast(150%)';
            break;
          case 'low':
            rootHtml.style.filter = 'contrast(80%)';
            break;
          case 'normal':
          default:
            rootHtml.style.filter = 'none';
            break;
        }

        console.log(`[setPageContrast] Set contrast to ${normalizedMode}`);
        return true;
      },
      getPageContrast: () => {
        const rootHtml = document.documentElement;
        if (rootHtml.style.filter.includes('150%')) return 'high';
        if (rootHtml.style.filter.includes('80%')) return 'low';
        return 'normal';
      },
    };

    // Expose navigation API to window
    exposeNavigationAPI(teleNavigation);

    // Expose history navigation to window for debugging and external access
    (window as any).navigationHistory = {
      back: navigateBack,
      forward: navigateForward,
      getHistory: () => navigationHistory,
      getCurrentIndex: () => historyIndex,
      canGoForward: () => historyIndex < navigationHistory.length - 1
    };

    // Keyboard navigation - Back/Forward button support
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip navigation if user is typing in an input field (chat, search, etc.)
      const activeElement = document.activeElement as HTMLElement | null;
      const isTypingInInput = activeElement && (
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement.getAttribute("contenteditable") === "true" ||
        activeElement.closest("[data-chat-input]") ||
        activeElement.closest("#chat-panel")
      );

      // For arrow keys, skip if typing (allow cursor movement)
      if ((e.key === "ArrowLeft" || e.key === "ArrowRight") && isTypingInInput) {
        return; // Let the input handle arrow keys normally
      }

      if (e.key === "ArrowLeft" || e.key === "Backspace") {
        // For Backspace, also skip if typing
        if (e.key === "Backspace" && isTypingInInput) {
          return;
        }
        e.preventDefault();

        // Priority 1: If in show-only mode, exit to full section
        if (activeSubSection) {
          setActiveSubSection(null);
          return;
        }

        // Priority 2: Use history-based back navigation (instant restoration)
        navigateBack();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();

        // Forward navigation through history
        navigateForward();
      }
    };

    // Listen for close current section event (from FullscreenImage ESC/close)
    const handleCloseCurrentSection = () => {
      if (navigationBackData) {
        teleNavigation.navigateToSection(navigationBackData);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("closeCurrentSection", handleCloseCurrentSection);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("closeCurrentSection", handleCloseCurrentSection);
      delete (window as any).teleNavigation;
      delete (window as any).navigateToSection;
      delete (window as any).setPageContrast;
      delete (window as any).getPageContrast;
      delete (window as any).navigationHistory;
    };
  }, [activeSection, activeSubSection, handleSectionChange, navigateBack, navigateForward, addToHistory, navigationHistory, historyIndex, navigationBackData]);

  // P2P chat initialization removed - this project does not use UUIDs

  // Shift+K hotkey to toggle TeleAcknowledge debug notifications
  useEffect(() => {
    const handleDebugKeyDown = async (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "K") {
        e.preventDefault();

        const isEnabled = toggleTeleAcknowledgeDebug();

        toast({
          title: isEnabled ? "Debug Mode ON" : "Debug Mode OFF",
          description: isEnabled
            ? "TeleAcknowledge notifications will now appear"
            : "TeleAcknowledge notifications are disabled",
          duration: 2000,
        });
      }
    };

    window.addEventListener("keydown", handleDebugKeyDown);
    return () => window.removeEventListener("keydown", handleDebugKeyDown);
  }, []);

  const handleOTPSubmit = async (otp: string) => {
    console.log("OTP submitted:", otp);
    setIsOTPDialogOpen(false);
    // OTP verification removed - dead code cleanup
    notifyTele("Authentication submitted");
  };

  const disconnect = async () => {
    setIsConnecting(true);
    playUISound("off", "avatar");
    // NOTE: Chat stays open if it was open - no longer force-closing on disconnect
    try {
      await (window as any).UIFramework?.disconnectOpenAI?.();
      await (window as any).UIFramework?.disconnectHeyGen?.();
    } catch (e) {
      // Silent error handling for production
    } finally {
      setAvatarState("off");
      setIsConnecting(false);

      // Update TelelaborSection state
      const setters = (window as any).setTelelaborState;
      if (setters) {
        setters.setIsMicMuted(true);
        setters.setIsSmileyOn(true);
        setters.setIsVoiceConnected(false);
      }

      try {
        (window as any).UIFramework?.showBgLayer?.({});
      } catch (_) { }
      try {
        (window as any).UIFramework?.setBackground?.({});
      } catch (_) { }
    }

    cleanupSessionStorage();
  };

  const handleAvatarClick = useCallback(async () => {
    if (isConnecting) return;

    // If connected, perform disconnect (and close chat first)
    if (avatarState === "connected") {
      await disconnect();
      return;
    }

    // Connect flow
    // Set state immediately to give feedback
    console.log("Starting avatar connection flow...");
    setIsConnecting(true);
    setAvatarState("connecting");
    playUISound("on", "avatar");

    try {
      // Check permissions safely first
      try {
        const micPermissionState = await navigator.permissions.query({ name: "microphone" as PermissionName });
        if (micPermissionState.state === "denied") {
          console.warn("Microphone permission explicitly denied");
          showErrorVideo();
          setAvatarState("off");
          return;
        }
      } catch (err) {
        console.log("Permission query not supported or failed:", err);
      }

      // Wait for UIFramework to be available (up to 5 seconds)
      let frameworkLoaded = false;
      for (let i = 0; i < 50; i++) {
        if ((window as any).UIFramework) {
          frameworkLoaded = true;
          break;
        }
        await new Promise(r => setTimeout(r, 100));
      }

      if (!frameworkLoaded) {
        console.error("UIFramework failed to load within 5 seconds");
        setAvatarState("off");
        return;
      }

      // Show microphone access video in bg-layer
      const showLoadingVideo = async () => {
        let attempts = 0;
        while (attempts++ < 30) {
          const ui: any = (window as any).UIFramework;
          // Check if ui exists AND has layers ready
          if (ui?.getLayers?.()?.bg?.setBackground) {
            if (showWelcomeVideo) {
              const micAccessVideos = ["/Mic access 1.mp4", "/Mic access 2.mp4", "/Mic access 3.mp4"];
              const selectedVideo = getRandomVideo(micAccessVideos);
              ui.setBackground({ video: { src: selectedVideo, muted: false, loop: false, volume: 0.5 } });
            }
            return;
          }
          await new Promise((r) => setTimeout(r, 100));
        }
      };

      try {
        await showLoadingVideo();
      } catch (e) { console.error("Error showing loading video:", e); }

      await (window as any).UIFramework?.setAutoConnectOptions?.({
        avatar: false,
        voice: false,
        waitForAvatarBeforeVoice: true,
      });
      await (window as any).UIFramework?.connectAll?.();

      await new Promise((r) => setTimeout(r, 1000));

      setAvatarState("connected");

      // Flash the tele to indicate successful connection
      setShowFlash(true);
      playUISound('on', 'avatar');
      setTimeout(() => setShowFlash(false), 600);

      // Create new session ID for this avatar connection
      const sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      sessionStorage.setItem("avatar-session-id", sessionId);

      // Clean up old session-scoped storage keys
      for (const key of Object.keys(sessionStorage)) {
        if (key.startsWith("carousel-button-greetings:") || key.startsWith("carousel-navigation-data:")) {
          if (!key.endsWith(`:${sessionId}`)) {
            sessionStorage.removeItem(key);
          }
        }
      }

      // Update TelelaborSection state
      const setters = (window as any).setTelelaborState;
      if (setters) {
        setters.setIsVoiceConnected(true);
      }

      // Clear loading video once connected
      try {
        (window as any).UIFramework?.setBackground?.({});
      } catch (_) { }

      // Sync mic state with framework after connect
      try {
        const syncMic = (window as any).syncMicFromModel;
        if (syncMic) syncMic();
      } catch (e) {
        // Silent error handling for production
      }

      // Stabilization delay for OpenAI session readiness
      // await new Promise(r => setTimeout(r, 1000));

      // Send greeting prompt 500ms after connection is stable
      setTimeout(() => {
        notifyTele("hello");
      }, 500);

      // Trigger gentle dark pulse effect
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 600);

      // Play avatar activation sound
      playUISound("on", "avatar");
    } catch (e) {
      console.error("Avatar connection failed:", e);
      setAvatarState("off");
      // Clear loading video on error
      try {
        (window as any).UIFramework?.setBackground?.({});
      } catch (_) { }
    } finally {
      setIsConnecting(false);
    }
  }, [avatarState, isConnecting, isChatGlassOpen]);

  const handleConnectAvatar = useCallback(async (): Promise<boolean> => {
    // If already connected, return success immediately
    if (avatarState === "connected") {
      return true;
    }

    // If currently connecting, wait a bit
    if (avatarState === "connecting") {
      await new Promise((r) => setTimeout(r, 3000));
      return true;
    }

    // Trigger connection via handleAvatarClick
    await handleAvatarClick();

    // Wait a bit for state to update and check success
    await new Promise((r) => setTimeout(r, 500));
    return true; // Assume success since handleAvatarClick handles errors internally
  }, [avatarState, handleAvatarClick]);

  // Expose connect function globally for ActionRow template
  useEffect(() => {
    (window as any).teleConnect = handleAvatarClick;
    return () => {
      delete (window as any).teleConnect;
    };
  }, [handleAvatarClick]);

  // Expose avatar connection functions to window for carousel buttons
  useEffect(() => {
    (window as any).handleConnectAvatar = handleConnectAvatar;
    (window as any).isAvatarConnected = () => avatarState === "connected";

    return () => {
      delete (window as any).handleConnectAvatar;
      delete (window as any).isAvatarConnected;
    };
  }, [handleConnectAvatar, avatarState]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-onyx text-mist">
        <span className="text-lg font-medium">Loading...</span>
      </div>
    );
  }

  // if (!isAuthorized) {
  //   return (
  //     <PasswordGate
  //       onSubmit={handlePasswordVerification}
  //       onInputChange={handlePasswordInput}
  //       isSubmitting={isSubmittingPassword}
  //       error={authError}
  //     />
  //   );
  // }

  const renderSection = () => {
    const animationClass = isExiting
      ? "animate-section-exit"
      : shouldAnimate
        ? `animate-section-enter ${scrollHintClass}`
        : scrollHintClass;



    // Determine which static data to use based on section
    const isWelcomeSection = activeSection === "welcome";

    // Use welcome data for welcome, otherwise dynamic
    const sectionMetadata =
      isWelcomeSection
        ? WELCOME_DATA
        : dynamicSectionData || { badge: "", title: "", subtitle: "", subsectionIds: [] };

    // Determine generative subsections
    const generativeContent = isWelcomeSection
      ? WELCOME_DATA.generativeSubsections
      : dynamicSectionData?.generativeSubsections;

    return (
      <DynamicSectionLoader
        key={`${activeSection}-${JSON.stringify(activeSubSection)}-${sectionMetadata.subsectionIds?.length || 0}-${generativeContent?.length || 0}`}
        isWelcome={isWelcomeSection}
        badge={sectionMetadata.badge}
        title={sectionMetadata.title}
        subtitle={sectionMetadata.subtitle}
        forceShowHeader={Boolean(dynamicSectionData)}
        subsectionIds={sectionMetadata.subsectionIds || []}
        generativeSubsections={generativeContent}
        activeSubSectionMetadata={activeSubSectionMetadata}
        animationClass={animationClass}
        isExiting={isExiting}
        activeSubSection={activeSubSection}
        onNavigateToNDAFirewall={() => {
          setBackData(navigationBackData);
          handleSectionChange("nda-firewall");
          notifyTele("Show me the NDA authentication screen to enter my email or phone to get the code");
        }}
      />
    );
  };

  let imageBackground = backgroundHero;

  // Static onboarding always uses empty background
  if (!isOnboardingComplete) {
    imageBackground = backgroundEmpty;
  } else if (showWelcomeVideo) {
    if (avatarState !== "off") {
      imageBackground = backgroundEmpty;
    }
  } else {
    if (avatarState === "connected") {
      imageBackground = backgroundEmpty;
    }
  }

  return (
    <CarColorProvider>
      <GitVersionIndicator />
      {/* Dynamic SEO based on active section - TeleLabor Platform */}
      <SEO {...(sectionSEO[activeSection as keyof typeof sectionSEO] || sectionSEO.welcome)} />

      {/* Fixed Background Layer - Portaled to body for absolute stability */}
      <BackgroundLayer image={imageBackground} />

      {/* Onboarding Transition Overlay */}
      <OnboardingTransition
        isActive={isTransitioning}
        onComplete={completeOnboarding}
      />

      <div className="min-h-screen squeeze-target overflow-auto">
        {/* Elegant pulse effect overlay - very subtle */}
        {showFlash && (
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              zIndex: 5,
              background: "radial-gradient(circle at center, rgba(155, 93, 229, 0.15), transparent 70%)",
              opacity: 0.5,
              animation: "fade-in 0.1s ease-out, fade-out 0.15s ease-out 0.1s forwards",
            }}
          />
        )}

        {/* ========================================
            DYNAMIC EXPERIENCE (always shown)
            ======================================== */}
        {isOnboardingComplete && (
          <div className="opacity-100">
            {/* Platform Header - Navigation and Telelabor Interface */}
            <div className={`no-lightboard flex justify-between align-center container mx-auto max-w-[1400px] px-16 md:px-24 lg:px-32`}>
              <Navigation
                activeSection={activeSection}
                isChatGlassOpen={isChatGlassOpen}
                onSectionChange={handleSectionChange}
              />
              {/* Telelabor Virtual Assistant Interface */}
              <TelelaborSection
                onChatGlassChange={setIsChatGlassOpen}
                avatarState={avatarState}
                setAvatarState={setAvatarState}
                showWelcomeVideo={showWelcomeVideo}
                onAvatarClick={handleAvatarClick}
                isConnecting={isConnecting}
              />
            </div>

            {/* Platform Content Sections */}
            <div
              className={`min-h-screen squeeze-target ${isChatGlassOpen ? "max-xl:hidden" : ""}`}
              style={{ position: "relative", zIndex: 10, perspective: "2000px", perspectiveOrigin: "center center" }}
            >
              <ErrorBoundary>{renderSection()}</ErrorBoundary>
            </div>

            {/* Back to Top Button */}
            <BackToTop />
          </div>
        )}

        <OTPDialog
          open={isOTPDialogOpen}
          onOpenChange={setIsOTPDialogOpen}
          onSubmit={handleOTPSubmit}
        />
      </div>
    </CarColorProvider>
  );
};

export default Index;

type PasswordGateProps = {
  onSubmit: (password: string) => Promise<void> | void;
  onInputChange: () => void;
  isSubmitting: boolean;
  error: string | null;
};

const PasswordGate = ({ onSubmit, onInputChange, isSubmitting, error }: PasswordGateProps) => {
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(password);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    onInputChange();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-onyx">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg bg-mist p-8 shadow-xl space-y-4">
        <h1 className="text-2xl font-semibold text-center text-onyx">Enter Access Password</h1>
        <p className="text-sm text-onyx/70 text-center">Access to this experience requires an authorized password.</p>
        <input
          type="password"
          value={password}
          onChange={handleChange}
          className="w-full rounded-md border border-onyx/30 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-flamingo"
          placeholder="Password"
          autoFocus
          disabled={isSubmitting}
        />
        {error ? <p className="text-sm text-flamingo text-center">{error}</p> : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-onyx py-2 text-mist transition hover:bg-wave disabled:bg-wave/50"
        >
          {isSubmitting ? "Verifying..." : "Unlock"}
        </button>
      </form>
    </div>
  );
};
