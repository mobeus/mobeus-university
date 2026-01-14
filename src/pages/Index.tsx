/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useRef, useMemo, FormEvent, ChangeEvent } from "react";
import Navigation from "@/components/Navigation";
import TeleglassSection from "@/components/TeleglassSection";
import { useSectionTransition } from "@/utils/useSectionTransition";
import { backgroundHero, backgroundEmpty } from "@/assets";
import { AvatarState } from "@/components/TeleglassIcons";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SectionLoadingFallback } from "@/components/SectionLoadingFallback";
import { SEO, sectionSEO } from "@/components/SEO";
import { showEmotion } from "@/utils/emotionEffect";
import { notifyTele, handleAcknowledgment, verifyAuthCode, toggleTeleAcknowledgeDebug } from "@/utils/acknowledgmentHelpers";
import { sendSectionContextToTele } from "@/utils/contextEnrichment";
import { EvidenceData } from "@/types/evidence";
import { SubsectionMetadata } from "@/types/subsection";
import { toast } from "@/hooks/use-toast";
import { playUISound } from "@/utils/soundGenerator";
import { BackgroundLayer } from "@/components/BackgroundLayer";
import { exposeNavigationAPI } from "@/utils/uiFrameworkRegistration";
import { DynamicSectionLoader } from "@/components/DynamicSectionLoader";
import { BackToTop } from "@/components/BackToTop";
import { OTPDialog } from "@/components/OTPDialog";
import NDAFirewallSection from "@/components/NDAFirewallSection";
import { CarColorProvider } from "@/contexts/CarColorContext";
import RippleEffect from "@/components/RippleEffect";
import { GitVersionIndicator } from "@/components/GitVersionIndicator";
// Onboarding Transition (kept for potential future use)
import { OnboardingTransition } from "@/components/OnboardingTransition";
import { Logo } from "@/components/Logo";


// Welcome section - Fiserv DMA Introduction
const WELCOME_VARIANTS = [
  {
    badge: "FISERV DIGITAL MERCHANT ACQUISITION",
    title: "The Future of Bank-Merchant Relationships",
    subtitle: "Embed contextual offers into your digital banking—grow revenue while strengthening merchant loyalty",
    generativeSubsections: [
      {
        id: "value-props",
        templateId: "FeatureGrid",
        props: {
          columns: 3,
          showStats: false,
          features: [
            {
              id: "v1",
              title: "Value to Banks",
              subtitle: "New Revenue Stream",
              description: "Monetize your digital channels with embedded merchant offers. One API integration, your branding, zero disruption.",
              icon: "trending",
              actionPhrase: "Show me more about value for banks"
            },
            {
              id: "v2",
              title: "Value to Merchants",
              subtitle: "Right Offer, Right Time",
              description: "Merchants get relevant products when they need them—POS systems, capital, credit lines—all within their trusted banking portal.",
              icon: "users",
              actionPhrase: "Show me more about value for merchants"
            },
            {
              id: "v3",
              title: "Why It Works",
              subtitle: "Trust + Timing = Conversion",
              description: "Merchants trust their bank. Contextual offers at the right moment convert better than cold outreach. You stay in the relationship.",
              icon: "check",
              actionPhrase: "Show me why this model works"
            }
          ]
        }
      },
      {
        id: "cta-section",
        templateId: "FeatureGrid",
        props: {
          columns: 2,
          showStats: false,
          features: [
            {
              id: "cta1",
              title: "See the Bank Experience",
              subtitle: "What merchants see",
              description: "Preview how offers appear seamlessly in your digital portal—non-intrusive, branded, contextual.",
              icon: "eye",
              highlight: true,
              actionPhrase: "Show me the bank portal with the offer"
            },
            {
              id: "cta2",
              title: "See the Onboarding Flow",
              subtitle: "10 frictionless steps",
              description: "Walk through the merchant journey from offer click to product activation—mobile-friendly, compliant, low abandonment.",
              icon: "layers",
              highlight: true,
              actionPhrase: "Show me the merchant onboarding flow"
            }
          ]
        }
      }
    ]
  },
];



const STORAGE_KEY = "fiserv-access";
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

  // Set up showEmotion globally as soon as component mounts
  useEffect(() => {
    (window as any).showEmotion = showEmotion;

    return () => {
      delete (window as any).showEmotion;
    };
  }, []);

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
      const [badge, title, subtitle, arg4] = args;
      const legacyPayload: Record<string, any> = {};
      if (typeof badge === "string") legacyPayload.badge = badge;
      if (typeof title === "string") legacyPayload.title = title;
      if (typeof subtitle === "string") legacyPayload.subtitle = subtitle;

      if (Array.isArray(arg4)) {
        // Intelligent detection: If the array items have 'templateId', it's generative content
        const isGenerative = arg4.length > 0 && arg4.some(item => item && typeof item === 'object' && 'templateId' in item);

        if (isGenerative) {
          legacyPayload.generativeSubsections = arg4;
        } else {
          legacyPayload.subsections = arg4;
        }
      }
      return legacyPayload;
    };

    // Teleglass Navigation System - simplified interface
    const teleNavigation = {
      navigateToSection: (...navigationData: any[]) => {
        const payload =
          navigationData.length > 1 ? buildLegacyPayload(navigationData) : navigationData[0];
        const parsed = parseNavigationPayload(payload);
        if (!parsed) {
          return false;
        }

        if (parsed === "welcome") {
          handleAcknowledgment("welcome");
          setDynamicSectionData(null);
          setActiveSubSection(null);
          handleSectionChange("welcome", null);
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

        return true;
      },
      getCurrentSection: () => activeSection,
      flashTele: () => {
        setShowFlash(true);
        playUISound('on', 'avatar');
        setTimeout(() => setShowFlash(false), 600);
      },
      // Car color functions - globally accessible like navigateToSection
      // Use wrapper functions to ensure they work even if CarColorContext hasn't initialized yet
      setCarColor: (color: string) => {
        const fn = (window as any).setCarColor;
        if (typeof fn === 'function') {
          return fn(color);
        }
        console.warn('[UIFramework] setCarColor not yet available');
        return false;
      },
      getCarColor: () => {
        const fn = (window as any).getCarColor;
        if (typeof fn === 'function') {
          return fn();
        }
        console.warn('[UIFramework] getCarColor not yet available');
        return null;
      },
    };

    // Expose navigation API to window
    exposeNavigationAPI(teleNavigation);

    // Left arrow key navigation - intelligent back behavior
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();

        // Priority 1: If in show-only mode, exit to full section
        if (activeSubSection) {
          setActiveSubSection(null);
          return;
        }

        // Priority 2: If not on welcome, go back to welcome
        if (activeSection !== "welcome") {
          teleNavigation.navigateToSection("welcome");
        }
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
    };
  }, [activeSection, activeSubSection, handleSectionChange, navigationBackData]);

  useEffect(() => {
    console.log("[Index] P2P initialization useEffect running");

    const initializeP2P = async () => {
      const ui = (window as any).UIFramework;
      console.log(
        "[Index] initializeP2P called, UIFramework exists:",
        !!ui,
        "has initializeP2PChat:",
        !!ui?.initializeP2PChat,
      );

      if (!ui?.initializeP2PChat) return;

      try {
        let visitorUuid = localStorage.getItem("visitor_uuid");
        if (!visitorUuid) {
          visitorUuid = crypto.randomUUID();
          localStorage.setItem("visitor_uuid", visitorUuid);
        }

        await ui.initializeP2PChat({
          visitorUuid,
          tenantUuid: "0c4f1897-97e9-46da-afb5-abf65982138a",
        });
      } catch (error) {
        // P2P initialization failed
      }
    };

    initializeP2P();
    const retryTimeout = setTimeout(initializeP2P, 1000);
    return () => clearTimeout(retryTimeout);
  }, []);

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

    const isVerified = verifyAuthCode(otp);
    if (isVerified) {
      notifyTele("Show me a success message that I have successfully authenticated and now have access behind the NDA firewall");
      window.showEmotion("happy");
      if (backData) {
        window.teleNavigation.navigateToSection(backData);
      }

    } else {
      notifyTele("Show me an error that the code entered is incorrect and ask to try again");
    }
  };

  const disconnect = async () => {
    setIsConnecting(true);
    playUISound("off", "avatar");
    try {
      if (isChatGlassOpen) {
        setIsChatGlassOpen(false);
        const setters = (window as any).setTeleglassState;
        if (setters) {
          setters.setIsChatActive(false);
          setters.setIsChatGlassOpen(false);
        }
      }
    } catch (_) { }
    try {
      await (window as any).UIFramework?.disconnectOpenAI?.();
      await (window as any).UIFramework?.disconnectHeyGen?.();
    } catch (e) {
      // Silent error handling for production
    } finally {
      setAvatarState("off");
      setIsConnecting(false);

      // Update TeleglassSection state
      const setters = (window as any).setTeleglassState;
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

      // Update TeleglassSection state
      const setters = (window as any).setTeleglassState;
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

      // Send greeting prompt once connection is stable
      // notifyTele("System prompt: Speak english. Improvise a greeting using english only that is less than 10 words - Teleglass connected successfully, ready to assist you");

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
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
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

    // Special handling for NDA Firewall section
    if (activeSection === "nda-firewall") {
      return (
        <NDAFirewallSection
          animationClass={animationClass}
          openOtp={() => setIsOTPDialogOpen(true)}
          avatarState={avatarState}
          onConnectAvatar={handleConnectAvatar}
        />
      );
    }

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
        key={`${activeSection}-${JSON.stringify(activeSubSection)}-${sectionMetadata.subsectionIds?.length || 0}`}
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
      <RippleEffect />
      <GitVersionIndicator />
      {/* Dynamic SEO based on active section - TeleGlass Platform */}
      <SEO {...(sectionSEO[activeSection as keyof typeof sectionSEO] || sectionSEO.welcome)} />

      {/* Fixed Background Layer - Portaled to body for absolute stability */}
      <BackgroundLayer image={imageBackground} />

      {/* Onboarding Transition Overlay */}
      <OnboardingTransition
        isActive={isTransitioning}
        onComplete={completeOnboarding}
      />

      <div className="min-h-screen squeeze-target overflow-auto">
        {/* Elegant pulse effect overlay */}
        {showFlash && (
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              zIndex: 5,
              background: "linear-gradient(135deg, hsl(190, 80%, 50%), hsl(145, 60%, 45%))",
              opacity: 0.15,
              animation: "fade-in 0.3s ease-in-out, fade-out 0.3s ease-in-out 0.3s forwards",
            }}
          />
        )}

        {/* ========================================
            DYNAMIC EXPERIENCE (always shown)
            ======================================== */}
        {isOnboardingComplete && (
          <div className="opacity-100">
            {/* Platform Header - Navigation and Teleglass Interface */}
            <div className={`no-lightboard flex justify-between align-center container mx-auto max-w-[1400px] px-16 md:px-24 lg:px-32`}>
              <Navigation
                activeSection={activeSection}
                isChatGlassOpen={isChatGlassOpen}
                onSectionChange={handleSectionChange}
              />
              {/* Teleglass Virtual Assistant Interface */}
              <TeleglassSection
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
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg bg-white p-8 shadow-xl space-y-4">
        <h1 className="text-2xl font-semibold text-center text-gray-900">Enter Access Password</h1>
        <p className="text-sm text-gray-600 text-center">Access to this experience requires an authorized password.</p>
        <input
          type="password"
          value={password}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Password"
          autoFocus
          disabled={isSubmitting}
        />
        {error ? <p className="text-sm text-red-600 text-center">{error}</p> : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-black py-2 text-white transition hover:bg-gray-900 disabled:bg-gray-500"
        >
          {isSubmitting ? "Verifying..." : "Unlock"}
        </button>
      </form>
    </div>
  );
};
