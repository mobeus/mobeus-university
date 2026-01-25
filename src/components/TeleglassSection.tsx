import React, { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "@/utils/debounce";
import { Send, X, User, Bot, Loader2, CheckCircle2 } from "lucide-react";
import { teleAvatar } from "@/assets";
import { useSound } from "@/hooks/useSound";
import { Button } from "@/components/ui/button";
import TeleglassIcons from "@/components/TeleglassIcons";
import { useUIFrameworkChat } from "@/hooks/useUIFrameworkChat";

import { ToolCallIndicator } from "@/components/chat/ToolCallIndicator";
import { RAGSearchIndicator } from "@/components/chat/RAGSearchIndicator";
import { MessageFeedback } from "@/components/chat/MessageFeedback";
import { SmartModeToggle } from "@/components/chat/SmartModeToggle";
import {
  extractURLsFromText,
  fetchOpenGraphData,
} from "@/utils/openGraphFetcher";
import { URLPreview } from "@/components/chat/URLPreview";
import { URLPreviewLoading } from "@/components/chat/URLPreviewLoading";
import type { OpenGraphData } from "@/types/openGraph";
import { ChatInvitationDialog } from "@/components/ChatInvitationDialog";
import {
  playUISound,
  playThinkingSound,
  stopThinkingSound,
} from "@/utils/soundGenerator";
import { ThinkingIndicator } from "@/components/ThinkingIndicator";
import { notifyTele } from "@/utils/acknowledgmentHelpers";
import { useLightboard } from "@/contexts/LightboardContext";

type AvatarState = "off" | "connecting" | "connected";

interface TeleglassSectionProps {
  onChatGlassChange?: (isOpen: boolean) => void;
  avatarState: AvatarState;
  setAvatarState: (state: AvatarState) => void;
  showWelcomeVideo: boolean;
  onAvatarClick: () => void;
  isConnecting: boolean;
}

const TeleglassSection = ({
  onChatGlassChange,
  avatarState,
  setAvatarState,
  showWelcomeVideo,
  onAvatarClick,
  isConnecting,
}: TeleglassSectionProps) => {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isSmileyOn, setIsSmileyOn] = useState(true);
  // COMMENTED OUT: Mic now starts unmuted on initial connection
  // const [isMicMuted, setIsMicMuted] = useState(true); // Start muted
  const [isMicMuted, setIsMicMuted] = useState(false); // Start unmuted
  const [isChatGlassOpen, setIsChatGlassOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [isVoiceConnected, setIsVoiceConnected] = useState(false);
  const [isSmartMode, setIsSmartMode] = useState(false); // Default off - toggle to see tool calls
  const [messageFeedback, setMessageFeedback] = useState<
    Record<string, "up" | "down">
  >({});
  const [urlPreviewCache, setUrlPreviewCache] = useState<
    Record<string, OpenGraphData>
  >({});
  const [showTeleAutocomplete, setShowTeleAutocomplete] = useState(false);
  const [showChatInvitation, setShowChatInvitation] = useState(false);
  const [isP2PActive, setIsP2PActive] = useState(false);
  const adminSocketIdRef = useRef<string | null>(null);
  const [showAudioInvitation, setShowAudioInvitation] = useState(false);
  const [showVideoInvitation, setShowVideoInvitation] = useState(false);
  const { isLightboardMode, toggleLightboard } = useLightboard();
  const [isOTPDialogOpen, setIsOTPDialogOpen] = useState(false);
  const [navigationIsLoading, setNavigationIsLoading] = useState(false);

  // Track expanded state for function call input/result panels
  const [expandedFunctionPanels, setExpandedFunctionPanels] = useState<
    Record<string, { input?: boolean; result?: boolean }>
  >({});

  const toggleFunctionPanel = useCallback(
    (callId: string, panel: "input" | "result") => {
      setExpandedFunctionPanels((prev) => ({
        ...prev,
        [callId]: {
          ...prev[callId],
          [panel]: !prev[callId]?.[panel],
        },
      }));
    },
    [],
  );

  // Control thinking sound based on navigation loading state or connecting
  useEffect(() => {
    if (navigationIsLoading || isConnecting) {
      playThinkingSound();
    } else {
      stopThinkingSound();
    }
    return () => {
      stopThinkingSound();
    };
  }, [navigationIsLoading, isConnecting]);

  const [isMouseActive, setIsMouseActive] = useState(true);
  const { playTeleglassSound, playChatSound } = useSound();
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const chatInputRef = useRef<HTMLInputElement | null>(null);
  const mouseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Use UIFramework chat hook
  const {
    messages: chatMessages,
    isTyping,
    sendMessage,
    handleConnectionChange,
    addExternalMessage,
    isThinking,
    functionCallMessages,
    addFunctionCall,
    completeFunctionCall,
  } = useUIFrameworkChat(isChatGlassOpen);

  // Play sound when thinking starts
  useEffect(() => {
    console.log("[TeleglassSection] isThinking changed:", isThinking);
    if (isThinking) {
      console.log("[TeleglassSection] Playing thinking sound");
      playUISound("on", "mic", 0.4);
    }
  }, [isThinking]);

  // Use mock messages if no real messages, otherwise use real messages
  const displayMessages = chatMessages;

  // Combine chat messages and function call messages into a single sorted list
  type DisplayItem =
    | { type: "message"; data: (typeof chatMessages)[0] }
    | { type: "functionCall"; data: (typeof functionCallMessages)[0] };

  const displayItems: DisplayItem[] = React.useMemo(() => {
    const items: DisplayItem[] = [
      ...chatMessages.map((msg) => ({ type: "message" as const, data: msg })),
      ...functionCallMessages.map((fc) => ({
        type: "functionCall" as const,
        data: fc,
      })),
    ];
    return items.sort(
      (a, b) => a.data.timestamp.getTime() - b.data.timestamp.getTime(),
    );
  }, [chatMessages, functionCallMessages]);

  // Toggle body class to squeeze layout when chat opens
  useEffect(() => {
    document.body.classList.toggle("chat-squeezed", isChatGlassOpen);
    return () => {
      document.body.classList.remove("chat-squeezed");
    };
  }, [isChatGlassOpen]);

  // Keep Teleglass vertical alignment with nav/logo/menu (stable positioning)
  useEffect(() => {
    const computeVerticalPosition = () => {
      const nav = document.getElementById("site-nav");
      const rect = nav?.getBoundingClientRect();
      if (rect) {
        const topPx = Math.max(8, rect.top + rect.height / 2 - 20);
        document.documentElement.style.setProperty(
          "--teleglass-top",
          `${topPx}px`,
        );
      }
    };

    const debouncedCompute = debounce(computeVerticalPosition, 16);
    computeVerticalPosition();

    if (!isChatGlassOpen) {
      window.addEventListener("resize", debouncedCompute);
      window.addEventListener("scroll", debouncedCompute, { passive: true });
      return () => {
        window.removeEventListener("resize", debouncedCompute);
        window.removeEventListener("scroll", debouncedCompute);
      };
    }

    return () => { };
  }, [isChatGlassOpen]);

  // Handle horizontal positioning based on chat state
  useEffect(() => {
    const computeHorizontalPosition = () => {
      if (isChatGlassOpen) {
        // When chat open: align to chat bar right edge (minus some padding)
        document.documentElement.style.setProperty("--teleglass-right", "3rem");
      } else {
        // When chat closed: align to content right edge
        const container = document.querySelector(".container");
        const containerRect = container?.getBoundingClientRect();
        if (containerRect) {
          const rightPx = Math.max(
            16,
            window.innerWidth - containerRect.right + 16,
          );
          document.documentElement.style.setProperty(
            "--teleglass-right",
            `${rightPx}px`,
          );
        }
      }
    };

    computeHorizontalPosition();
  }, [isChatGlassOpen]); // Only recalculate when chat state changes

  // Auto-scroll chat to latest message
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [displayMessages, isTyping, isChatGlassOpen]);

  // Process all messages for URLs and fetch OG data
  useEffect(() => {
    const processURLs = async () => {
      // Process URLs from both user and assistant messages
      for (const msg of displayMessages) {
        const urls = extractURLsFromText(msg.text);

        for (const url of urls) {
          // Skip if already cached
          if (urlPreviewCache[url]) continue;

          try {
            const ogData = await fetchOpenGraphData(url);
            setUrlPreviewCache((prev) => ({ ...prev, [url]: ogData }));
          } catch (error) {
            // Skip failed fetches silently
          }
        }
      }
    };

    if (isChatGlassOpen) {
      processURLs();
    }
  }, [displayMessages, isChatGlassOpen, urlPreviewCache]);

  const syncMicFromModel = useCallback(() => {
    try {
      const model: any = (window as any).UIFramework?.getVoiceComponents?.()
        ?.model;
      if (model && typeof model.isMuted !== "undefined") {
        const unmuted = !model.isMuted;
        setIsMicMuted(!unmuted);
      }
    } catch (error) {
      // Silent error handling for production
    }
  }, []);

  // Expose syncMicFromModel for parent to use after connection
  useEffect(() => {
    (window as any).syncMicFromModel = syncMicFromModel;
    return () => {
      delete (window as any).syncMicFromModel;
    };
  }, [syncMicFromModel]);

  // Expose setters for parent to update state after connection/disconnection
  useEffect(() => {
    (window as any).setTeleglassState = {
      setIsMicMuted,
      setIsSmileyOn,
      setIsVoiceConnected,
      setIsChatGlassOpen,
      setIsChatActive,
    };
    return () => {
      delete (window as any).setTeleglassState;
    };
  }, []);

  const handleSoundToggle = useCallback(() => {
    if (!isVoiceConnected) return;
    playUISound("on", "mic");
    const newSoundState = !isSoundOn;
    setIsSoundOn(newSoundState);

    // Control avatar video mute/unmute (only when connected)
    if (avatarState === "connected") {
      try {
        const ui: any = (window as any).UIFramework;
        if (ui?.setAvatarVideoMuted) {
          ui.setAvatarVideoMuted(!newSoundState);
        }
      } catch (error) {
        // Silent error handling for production
      }
    }
  }, [isVoiceConnected, isSoundOn, avatarState]);

  const handleChatToggle = useCallback(() => {
    if (!isVoiceConnected) return;
    playUISound("on", "chat");
    setIsChatActive(!isChatActive);
    const newChatGlassState = !isChatGlassOpen;
    setIsChatGlassOpen(newChatGlassState);
    onChatGlassChange?.(newChatGlassState);

    // Dispatch chat state change event for GitVersionIndicator
    window.dispatchEvent(
      new CustomEvent("chatStateChange", {
        detail: { isOpen: newChatGlassState },
      }),
    );
  }, [isVoiceConnected, isChatActive, isChatGlassOpen, onChatGlassChange]);

  const handleMicToggle = useCallback(() => {
    if (!isVoiceConnected) return; // disabled until connected
    try {
      (window as any).UIFramework?.toggleMute?.();
      playUISound("on", "mic");
      syncMicFromModel();
    } catch (e) {
      // Silent error handling for production
    }
  }, [isVoiceConnected, syncMicFromModel]);

  const handleSmileyToggle = useCallback(() => {
    const newValue = !isSmileyOn;
    playUISound("on", "mic");
    setIsSmileyOn(newValue);
    if (newValue) {
      try {
        (window as any).UIFramework?.showBgLayer?.({});
      } catch (_) { }
    } else {
      try {
        (window as any).UIFramework?.hideBgLayer?.({});
      } catch (_) { }
    }
  }, [isSmileyOn]);

  const handleLightboardToggle = useCallback(() => {
    playUISound("on", "chat");
    toggleLightboard();
  }, [toggleLightboard]);

  const respondToMediaInvitation = useCallback(
    (mediaType: "audio" | "video", action: "accept" | "decline") => {
      const ui = (window as any).UIFramework;
      if (!ui) {
        return;
      }

      try {
        if (action === "accept") {
          if (mediaType === "audio") {
            ui.acceptAudio?.();
          } else {
            ui.acceptVideo?.();
          }
          playUISound("on", "chat");
        } else {
          if (mediaType === "audio") {
            ui.declineAudio?.();
          } else {
            ui.declineVideo?.();
          }
          playUISound("off", "chat");
        }
      } catch (error) {
        // Media invitation response failed
      }
    },
    [],
  );

  const handleAcceptChat = useCallback(() => {
    const ui = (window as any).UIFramework;
    if (!ui) return;

    ui.acceptChat?.(adminSocketIdRef.current ?? undefined);
    playUISound("on", "chat");
  }, []);

  const handleDeclineChat = useCallback(() => {
    const ui = (window as any).UIFramework;
    if (!ui) return;

    const socketId = adminSocketIdRef.current ?? undefined;
    ui.declineChat?.(socketId);
    if (socketId) {
      adminSocketIdRef.current = null;
    }
    playUISound("off", "chat");
  }, []);

  const handleAcceptAudio = useCallback(() => {
    respondToMediaInvitation("audio", "accept");
    setShowAudioInvitation(false);
  }, [respondToMediaInvitation]);

  const handleDeclineAudio = useCallback(() => {
    respondToMediaInvitation("audio", "decline");
    setShowAudioInvitation(false);
  }, [respondToMediaInvitation]);

  const handleAcceptVideo = useCallback(async () => {
    respondToMediaInvitation("video", "accept");
    setShowVideoInvitation(false);

    // Start webcam and show in bg-layer
    const ui = (window as any).UIFramework;
    if (ui && ui.startWebcam) {
      try {
        await ui.startWebcam({ video: true, audio: true });
      } catch (error) {
        // Webcam failed to start
      }
    }
  }, [respondToMediaInvitation]);

  const handleDeclineVideo = useCallback(() => {
    respondToMediaInvitation("video", "decline");
    setShowVideoInvitation(false);

    // Make sure webcam is stopped if it was somehow started
    const ui = (window as any).UIFramework;
    if (ui && ui.isWebcamActive && ui.isWebcamActive()) {
      ui.stopWebcam();
    }
  }, [respondToMediaInvitation]);

  const handleSendMessage = async () => {
    const trimmed = chatMessage.trim();
    if (!trimmed) return;

    const ui = (window as any).UIFramework;
    const isToTele =
      trimmed.includes("@tele") ||
      trimmed.toLowerCase().includes("hey tele") ||
      trimmed.toLowerCase().includes("hi tele");

    try {
      if (isP2PActive && !isToTele) {
        ui?.sendP2PMessage?.(trimmed);
        addExternalMessage({
          role: "user",
          text: trimmed,
          timestamp: new Date(),
        });
      } else {
        await sendMessage(trimmed);
      }
    } catch (error) {
      // Message sending failed
    } finally {
      setChatMessage("");
      setShowTeleAutocomplete(false);
      playChatSound();
    }
  };

  const handleSmartModeToggle = (enabled: boolean) => {
    setIsSmartMode(enabled);
    playUISound(enabled ? "on" : "off", "chat");
  };

  const handleFeedback = (messageId: string, type: "up" | "down") => {
    setMessageFeedback((prev) => ({
      ...prev,
      [messageId]: type,
    }));
    playUISound("on", "chat");
  };

  // Subscribe to UIFramework mute state changes when available
  useEffect(() => {
    let cancelled = false;
    let detach: any = null;
    const attach = () => {
      const ui: any = (window as any).UIFramework;
      const model: any = ui?.getVoiceComponents?.()?.model;
      if (!model || !model.addEventListener) return false;
      // COMMENTED OUT: No longer enforcing muted state after connect
      // const ensureMutedAfterConnect = () => {
      //   try {
      //     setTimeout(() => {
      //       try {
      //         syncMicFromModel();
      //       } catch (_) {}
      //     }, 80);
      //   } catch (_) {}
      // };

      // Track if we've already attempted unmute to prevent multiple toggles
      let hasAttemptedUnmute = false;

      const ensureUnmutedAfterConnect = () => {
        // Guard: Only attempt unmute once per connection
        if (hasAttemptedUnmute) return;
        hasAttemptedUnmute = true;

        // MODIFIED: Now unmutes the mic after connection
        try {
          setTimeout(() => {
            try {
              const ui: any = (window as any).UIFramework;
              const model: any = ui?.getVoiceComponents?.()?.model;
              if (model && model.isMuted) {
                // If model is muted, toggle to unmute
                ui?.toggleMute?.();
              }
              syncMicFromModel();
            } catch (_) { }
          }, 100);
        } catch (_) { }
      };
      const onMuteChange = ({ isMuted }: any) => {
        if (!cancelled) {
          setIsMicMuted(!!isMuted);
        }
      };
      const onConnChange = ({ state }: any) => {
        if (!cancelled) {
          const connected = state === "connected" || !!model.isConnected;
          setIsVoiceConnected(connected);
          if (connected) ensureUnmutedAfterConnect();
        }
      };
      const onStatus = ({ status }: any) => {
        if (!cancelled) {
          if (status === "connected") setIsVoiceConnected(true);
          if (status === "disconnected" || status === "error")
            setIsVoiceConnected(false);
          if (status === "connected") ensureUnmutedAfterConnect();
        }
      };
      const onOutputItemAdded = (event: any) => {
        if (event.item.type === "function_call") {
          const callId = event.item.call_id;
          const name = event.item.name || "unknown";
          console.log("addFunctionCall=====", callId, name, event);

          // Parse input arguments from the event
          let input: Record<string, any> | undefined;
          try {
            if (event.item.arguments) {
              input =
                typeof event.item.arguments === "string"
                  ? JSON.parse(event.item.arguments)
                  : event.item.arguments;
            }
          } catch (e) {
            console.warn("Failed to parse function call arguments", e);
          }

          addFunctionCall(callId, name, input);

          // Handle navigation loading state for navigateToSection
          if (name === "navigateToSection") {
            setNavigationIsLoading(true);
            window.dispatchEvent(
              new CustomEvent("navigationLoadingChange", {
                detail: { isLoading: true },
              }),
            );
          }
        }
      };
      const onFunctionCallCompleted = (event: any) => {
        const callId = event.callId;
        const name = event.name;

        if (callId) {
          console.log("onFunctionCallCompleted====", callId, event);

          // Parse result from event.arguments (which contains the output)
          let result: any;
          try {
            if (event.arguments) {
              result =
                typeof event.arguments === "string"
                  ? JSON.parse(event.arguments)
                  : event.arguments;
            }
          } catch (e) {
            console.warn("Failed to parse function call result", e);
            result = event.arguments; // Use raw value if parsing fails
          }

          completeFunctionCall(callId, result);
        }

        if (name === "navigateToSection") {
          setNavigationIsLoading(false);
          window.dispatchEvent(
            new CustomEvent("navigationLoadingChange", {
              detail: { isLoading: false },
            }),
          );
        }
      };
      model.addEventListener("outputItemAdded", onOutputItemAdded);
      model.addEventListener("functionCallCompleted", onFunctionCallCompleted);
      model.addEventListener("muteStateChanged", onMuteChange);
      model.addEventListener("connectionStateChange", onConnChange);
      model.addEventListener("statusChange", onStatus);
      // Also enforce after session creation
      const onSessionCreated = () => ensureUnmutedAfterConnect();
      model.addEventListener("sessionCreated", onSessionCreated as any);
      // COMMENTED OUT: Don't sync initial muted state, we want unmuted
      // try {
      //   setIsMicMuted(!!model.isMuted);
      // } catch (_) { }
      try {
        setIsVoiceConnected(!!model.isConnected);
      } catch (_) { }
      detach = () => {
        try {
          model.removeEventListener?.("muteStateChanged", onMuteChange);
        } catch (_) { }
        try {
          model.removeEventListener?.("connectionStateChange", onConnChange);
        } catch (_) { }
        try {
          model.removeEventListener?.("statusChange", onStatus);
        } catch (_) { }
        try {
          model.removeEventListener?.(
            "sessionCreated",
            onSessionCreated as any,
          );
        } catch (_) { }
      };
      return true;
    };
    if (!attach()) {
      const t = setInterval(() => {
        if (attach()) clearInterval(t);
      }, 300);
      detach = () => {
        clearInterval(t);
      };
    }
    return () => {
      cancelled = true;
      try {
        if (detach) detach();
      } catch (_) { }
    };
  }, [syncMicFromModel]);

  // COMMENTED OUT: Speaker now stays on when avatar connects
  // useEffect(() => {
  //   if (avatarState === "connected") {
  //     setIsSoundOn(false);
  //     try {
  //       const ui: any = (window as any).UIFramework;
  //       if (ui?.setAvatarVideoMuted) {
  //         ui.setAvatarVideoMuted(true);
  //       }
  //     } catch (error) {
  //       // Silent error handling for production
  //     }
  //   }
  // }, [avatarState]);

  // Connect chat to avatar connection state
  useEffect(() => {
    handleConnectionChange(avatarState === "connected");
  }, [avatarState, handleConnectionChange]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.shiftKey) return;

      const activeElement = document.activeElement as HTMLElement | null;
      const isTypingInChat = !!(
        activeElement &&
        (activeElement === chatInputRef.current ||
          activeElement.closest?.("#teleglass#chat-panel")) &&
        (activeElement instanceof HTMLInputElement ||
          activeElement instanceof HTMLTextAreaElement ||
          activeElement.getAttribute("contenteditable") === "true")
      );

      if (isTypingInChat) return;

      const key = event.key.toLowerCase();
      if (key === "m") {
        event.preventDefault();
        handleMicToggle();
      } else if (key === "v") {
        event.preventDefault();
        handleSoundToggle();
      } else if (key === "c") {
        event.preventDefault();
        if (isVoiceConnected) {
          handleChatToggle();
        }
      } else if (key === "a") {
        event.preventDefault();
        handleSmileyToggle();
      } else if (key === "l") {
        event.preventDefault();
        handleLightboardToggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    handleMicToggle,
    handleSoundToggle,
    handleChatToggle,
    handleSmileyToggle,
    handleLightboardToggle,
    isVoiceConnected,
    isChatGlassOpen,
  ]);

  // Track mouse movement for speaker button visibility
  useEffect(() => {
    const handleMouseMove = () => {
      setIsMouseActive(true);

      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }

      mouseTimeoutRef.current = setTimeout(() => {
        setIsMouseActive(false);
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let listenersAttached = false;
    let attachedUI: any = null;
    let retryTimer: ReturnType<typeof setInterval> | null = null;
    let disposed = false;

    const unwrapDetail = (payload: any) =>
      (payload && typeof payload.detail !== "undefined"
        ? payload.detail
        : payload) || {};

    const handleInvitation = (event: any) => {
      const detail = unwrapDetail(event);
      const adminId = detail?.adminSocketId ?? null;
      if (adminId) {
        adminSocketIdRef.current = adminId;
      }
      setShowChatInvitation(true);
      playUISound("on", "chat");
    };

    const handleAccepted = (event: any) => {
      const detail = unwrapDetail(event);
      const adminId = detail?.adminSocketId ?? null;
      if (adminId) {
        adminSocketIdRef.current = adminId;
      }
      setIsP2PActive(true);
      setShowChatInvitation(false);

      if (!isChatGlassOpen) {
        setIsChatActive(true);
        setIsChatGlassOpen(true);
        onChatGlassChange?.(true);
      }
    };

    const handleDeclined = (event: any) => {
      const detail = unwrapDetail(event);
      setShowChatInvitation(false);
      adminSocketIdRef.current = null;
    };

    const handleEnded = (event: any) => {
      const detail = unwrapDetail(event);
      setIsP2PActive(false);
      adminSocketIdRef.current = null;

      // Stop webcam if active
      const ui = (window as any).UIFramework;
      if (ui && ui.isWebcamActive && ui.isWebcamActive()) {
        ui.stopWebcam();
      }
    };

    const handleP2PMessage = (event: any) => {
      const detail = unwrapDetail(event);
      const { message, from } = detail || {};

      if (typeof message === "string" && message.trim().length > 0) {
        addExternalMessage({
          role: from === "visitor" ? "user" : "assistant",
          text: message,
        });
      }

      if (!isChatGlassOpen) {
        setIsChatActive(true);
        setIsChatGlassOpen(true);
        onChatGlassChange?.(true);
      }
    };

    const handleAudioInvitation = (event: any) => {
      const detail = unwrapDetail(event);
      setShowAudioInvitation(true);
      playUISound("on", "chat");
    };

    const handleVideoInvitation = (event: any) => {
      const detail = unwrapDetail(event);
      setShowVideoInvitation(true);
      playUISound("on", "chat");
    };

    const handleAudioAccepted = (event: any) => {
      const detail = unwrapDetail(event);
      setShowAudioInvitation(false);
    };

    const handleAudioDeclined = (event: any) => {
      const detail = unwrapDetail(event);
      setShowAudioInvitation(false);
    };

    const handleVideoAccepted = (event: any) => {
      const detail = unwrapDetail(event);
      setShowVideoInvitation(false);
    };

    const handleVideoDeclined = (event: any) => {
      const detail = unwrapDetail(event);
      setShowVideoInvitation(false);

      // Stop webcam if active (in case it was started)
      const ui = (window as any).UIFramework;
      if (ui && ui.isWebcamActive && ui.isWebcamActive()) {
        ui.stopWebcam();
      }
    };

    const attachListeners = (ui: any) => {
      if (
        !ui ||
        typeof ui.onP2PEvent !== "function" ||
        typeof ui.offP2PEvent !== "function"
      ) {
        return false;
      }

      if (listenersAttached) {
        return true;
      }

      ui.onP2PEvent("chatInvitation", handleInvitation);
      ui.onP2PEvent("chatAccepted", handleAccepted);
      ui.onP2PEvent("chatDeclined", handleDeclined);
      ui.onP2PEvent("chatEnded", handleEnded);
      ui.onP2PEvent("p2pMessage", handleP2PMessage);
      ui.onP2PEvent("audioInvitation", handleAudioInvitation);
      ui.onP2PEvent("audioAccepted", handleAudioAccepted);
      ui.onP2PEvent("audioDeclined", handleAudioDeclined);
      ui.onP2PEvent("videoInvitation", handleVideoInvitation);
      ui.onP2PEvent("videoAccepted", handleVideoAccepted);
      ui.onP2PEvent("videoDeclined", handleVideoDeclined);

      listenersAttached = true;
      attachedUI = ui;
      return true;
    };

    const initialUI = (window as any).UIFramework;
    if (!attachListeners(initialUI)) {
      retryTimer = setInterval(() => {
        if (disposed || listenersAttached) {
          return;
        }
        const candidate = (window as any).UIFramework;
        if (attachListeners(candidate)) {
          if (retryTimer) {
            clearInterval(retryTimer);
            retryTimer = null;
          }
        }
      }, 250);
    }

    return () => {
      disposed = true;
      if (retryTimer) {
        clearInterval(retryTimer);
        retryTimer = null;
      }

      if (listenersAttached && attachedUI?.offP2PEvent) {
        attachedUI.offP2PEvent("chatInvitation", handleInvitation);
        attachedUI.offP2PEvent("chatAccepted", handleAccepted);
        attachedUI.offP2PEvent("chatDeclined", handleDeclined);
        attachedUI.offP2PEvent("chatEnded", handleEnded);
        attachedUI.offP2PEvent("p2pMessage", handleP2PMessage);
        attachedUI.offP2PEvent("audioInvitation", handleAudioInvitation);
        attachedUI.offP2PEvent("audioAccepted", handleAudioAccepted);
        attachedUI.offP2PEvent("audioDeclined", handleAudioDeclined);
        attachedUI.offP2PEvent("videoInvitation", handleVideoInvitation);
        attachedUI.offP2PEvent("videoAccepted", handleVideoAccepted);
        attachedUI.offP2PEvent("videoDeclined", handleVideoDeclined);
      }
    };
  }, [addExternalMessage, isChatGlassOpen, onChatGlassChange]);

  return (
    <>
      {/* ThinkingIndicator removed - animation now shows around avatar */}
      {/* Normal positioning when chat glass is closed */}
      <TeleglassIcons
        isChatGlassOpen={isChatGlassOpen}
        isSoundOn={isSoundOn}
        isChatActive={isChatActive}
        isMicMuted={isMicMuted}
        avatarState={avatarState}
        isMouseActive={isMouseActive}
        onSoundToggle={handleSoundToggle}
        onChatToggle={handleChatToggle}
        onMicToggle={handleMicToggle}
        onAvatarClick={onAvatarClick}
        avatarSrc={teleAvatar}
        isVoiceConnected={isVoiceConnected}
        onSmileyToggle={handleSmileyToggle}
        isSmileyOn={isSmileyOn}
        isLoading={navigationIsLoading || isConnecting}
      />

      {/* Chat Glass Panel - FULLY TRANSPARENT - Avatar fully visible */}
      <div
        className={`fixed teleglass-panel top-0 h-dvh z-50
          transform transition-all duration-500 ease-out ${isChatGlassOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
          }
          ${isLightboardMode
            ? "border-l border-white/[0.05]"
            : "border-l border-white/[0.08]"
          }
        flex flex-col
        xl:right-0
        max-xl:left-0 max-xl:right-0 max-xl:w-full`}
        style={{
          width: "var(--chat-glass-width)",
          maxWidth: "100vw",
        }}
      >
        {/* Simple top border line */}
        <div
          className={`absolute top-0 left-0 right-0 h-px ${isLightboardMode ? "bg-white/[0.15]" : "bg-white/[0.12]"}`}
        />

        {/* Teleglass Icons at top of chat bar */}
        <div
          className="sm:h-10"
          style={{ paddingTop: "var(--teleglass-top)" }}
        ></div>

        {isP2PActive && (
          <div
            className={`mx-3 sm:mx-4 mt-3 px-3 py-2 rounded-full text-sm flex items-center gap-2 backdrop-blur-sm ${isLightboardMode
              ? "bg-white/[0.08] border border-white/[0.15] text-mist"
              : "bg-white/[0.10] border border-white/[0.18] text-mist"
              }`}
          >
            <div
              className={`w-2 h-2 rounded-full animate-pulse bg-flamingo/80`}
            ></div>
            <span className="font-medium text-mist">Connected to admin</span>
            <span className="text-xs ml-auto text-mist/70">
              (Type @tele to include AI assistant)
            </span>
          </div>
        )}

        {/* Chat Messages Area - positioned below icons */}
        <div
          className="flex-1 min-h-0 chat-messages-container px-3 sm:px-4 pt-2 pb-2 space-y-3 sm:space-y-4"
          ref={messagesContainerRef}
          style={{ marginTop: `var(--teleglass-top)` }}
        >
          {displayItems.map((item, index) => {
            // Calculate stagger delay class based on message index
            const staggerClass = `chat-delay-${Math.min((index % 5) + 1, 5)}`;

            if (item.type === "functionCall") {
              // Only show function calls when Smart Mode is enabled
              if (!isSmartMode) return null;
              const fc = item.data;
              return (
                <div
                  key={fc.id}
                  className={`flex justify-start items-start space-x-2 animate-chat-bubble-enter opacity-0 ${staggerClass}`}
                >
                  <div
                    className={`chat-avatar w-7 h-7 sm:w-9 sm:h-9 rounded-full
                    backdrop-blur-sm flex items-center justify-center flex-shrink-0
                    ${isLightboardMode
                        ? "bg-white/[0.08] border border-white/[0.15]"
                        : "bg-white/[0.10] border border-white/[0.18]"
                      }`}
                  >
                    <Bot className="chat-icon w-4 h-4 sm:w-5 sm:h-5 text-mist" />
                  </div>
                  <div
                    className={`backdrop-blur-md p-3 sm:p-4 rounded-2xl border text-mist`}
                    style={{
                      background: "rgba(20, 25, 35, 0.75)",
                      borderColor: "rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    <div className="flex items-center gap-2 text-sm">
                      {fc.status === "calling" ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      )}
                      <span className="text-mist/80">
                        {fc.status === "calling" ? "Calling" : "Called"}{" "}
                        <span className="font-medium text-primary">
                          {fc.name}
                        </span>
                        {fc.status === "calling" && "..."}
                      </span>
                    </div>

                    {/* Input/Result Buttons */}
                    <div className="flex gap-2 mt-2">
                      {fc.input && (
                        <button
                          onClick={() =>
                            toggleFunctionPanel(fc.callId, "input")
                          }
                          className={`text-xs px-2 py-1 rounded-md transition-all ${expandedFunctionPanels[fc.callId]?.input
                            ? isLightboardMode
                              ? "bg-white/30 text-mist"
                              : "bg-primary/30 text-primary"
                            : isLightboardMode
                              ? "bg-white/10 text-mist/70 hover:bg-white/20"
                              : "bg-white/5 text-mist/60 hover:bg-white/10"
                            }`}
                        >
                          Input{" "}
                          {expandedFunctionPanels[fc.callId]?.input ? "▲" : "▼"}
                        </button>
                      )}
                      {fc.status === "called" && fc.result !== undefined && (
                        <button
                          onClick={() =>
                            toggleFunctionPanel(fc.callId, "result")
                          }
                          className={`text-xs px-2 py-1 rounded-md transition-all ${expandedFunctionPanels[fc.callId]?.result
                            ? isLightboardMode
                              ? "bg-white/30 text-mist"
                              : "bg-green-500/30 text-green-400"
                            : isLightboardMode
                              ? "bg-white/10 text-mist/70 hover:bg-white/20"
                              : "bg-white/5 text-mist/60 hover:bg-white/10"
                            }`}
                        >
                          Result{" "}
                          {expandedFunctionPanels[fc.callId]?.result
                            ? "▲"
                            : "▼"}
                        </button>
                      )}
                    </div>

                    {/* Expanded Input Panel */}
                    {expandedFunctionPanels[fc.callId]?.input && fc.input && (
                      <div
                        className={`mt-2 p-2 rounded-lg text-xs font-mono overflow-x-auto max-h-40 overflow-y-auto ${isLightboardMode
                          ? "bg-black/20 text-mist/90"
                          : "bg-black/40 text-mist/80"
                          }`}
                      >
                        <pre className="whitespace-pre-wrap break-words">
                          {JSON.stringify(fc.input, null, 2)}
                        </pre>
                      </div>
                    )}

                    {/* Expanded Result Panel */}
                    {expandedFunctionPanels[fc.callId]?.result &&
                      fc.result !== undefined && (
                        <div
                          className={`mt-2 p-2 rounded-lg text-xs font-mono overflow-x-auto max-h-40 overflow-y-auto ${isLightboardMode
                            ? "bg-black/20 text-mist/90"
                            : "bg-black/40 text-mist/80"
                            }`}
                        >
                          <pre className="whitespace-pre-wrap break-words">
                            {typeof fc.result === "string"
                              ? fc.result
                              : JSON.stringify(fc.result, null, 2)}
                          </pre>
                        </div>
                      )}

                    <p
                      className={`text-xs mt-1 ${isLightboardMode ? "text-mist/90" : "text-mist/60"
                        }`}
                    >
                      {fc.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            }

            // Regular message
            const msg = item.data;
            // Extract URLs from all messages (both user and assistant)
            const urls = extractURLsFromText(msg.text);

            return (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-start space-x-2 animate-chat-bubble-enter opacity-0 ${staggerClass}`}
              >
                {msg.role === "assistant" && (
                  <div
                    className={`chat-avatar w-7 h-7 sm:w-9 sm:h-9 rounded-full 
                    backdrop-blur-sm flex items-center justify-center flex-shrink-0
                    ${isLightboardMode
                        ? "bg-white/[0.08] border border-white/[0.15]"
                        : "bg-white/[0.10] border border-white/[0.18]"
                      }`}
                  >
                    <Bot className="chat-icon w-4 h-4 sm:w-5 sm:h-5 text-mist" />
                  </div>
                )}
                <div
                  className={`chat-message-bubble max-w-[75%] sm:max-w-[70%] p-3 sm:p-4 rounded-2xl
                  transform transition-all duration-500
                  hover:scale-[1.01]
                  border backdrop-blur-md text-sm sm:text-base text-mist`}
                  style={{
                    background:
                      msg.role === "user"
                        ? "rgba(30, 40, 55, 0.85)"
                        : "rgba(20, 25, 35, 0.75)",
                    borderColor:
                      msg.role === "user"
                        ? "rgba(255, 255, 255, 0.20)"
                        : "rgba(255, 255, 255, 0.12)",
                  }}
                >
                  {/* Tool Call and RAG Search Indicators (only shown in Smart Mode) */}
                  {isSmartMode &&
                    msg.role === "assistant" &&
                    (msg as any).metadata && (
                      <>
                        {(msg as any).metadata.toolCalls?.map((tool: any) => (
                          <ToolCallIndicator
                            key={tool.id}
                            toolName={tool.toolName}
                            parameters={tool.parameters}
                            timestamp={tool.timestamp}
                          />
                        ))}
                        {(msg as any).metadata.ragSearches?.map(
                          (search: any) => (
                            <RAGSearchIndicator
                              key={search.id}
                              searchQuery={search.searchQuery}
                              resultsCount={search.resultsCount}
                              timestamp={search.timestamp}
                            />
                          ),
                        )}
                      </>
                    )}

                  <p className="leading-relaxed">
                    {/* Remove URLs from text display since they're shown as preview cards */}
                    {urls.length > 0
                      ? msg.text.replace(/(https?:\/\/[^\s]+)/g, "").trim()
                      : msg.text}
                  </p>

                  {/* URL Previews - Show for all messages with URLs */}
                  {urls.length > 0 && (
                    <div className="space-y-2">
                      {urls.map((url) => {
                        const ogData = urlPreviewCache[url];

                        if (!ogData) {
                          return <URLPreviewLoading key={url} />;
                        }

                        return (
                          <URLPreview
                            key={url}
                            openGraphData={ogData}
                            onClick={() =>
                              window.open(url, "_blank", "noopener,noreferrer")
                            }
                          />
                        );
                      })}
                    </div>
                  )}

                  <p
                    className={`text-xs mt-1 ${isLightboardMode ? "text-mist/90" : "text-mist/60"}`}
                  >
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  {/* Feedback buttons (for assistant messages only) */}
                  {msg.role === "assistant" && (
                    <MessageFeedback
                      messageId={msg.id}
                      currentFeedback={messageFeedback[msg.id]}
                      onFeedback={handleFeedback}
                    />
                  )}
                </div>
                {msg.role === "user" && (
                  <div
                    className={`chat-avatar w-7 h-7 sm:w-9 sm:h-9 rounded-full
                    backdrop-blur-sm flex items-center justify-center flex-shrink-0
                    ${isLightboardMode
                        ? "bg-white/[0.08] border border-white/[0.15]"
                        : "bg-white/[0.10] border border-white/[0.18]"
                      }`}
                  >
                    <User className="chat-icon w-4 h-4 sm:w-5 sm:h-5 text-mist" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex justify-start items-start space-x-2 animate-chat-bubble-enter opacity-0 chat-delay-1">
              <div
                className={`chat-avatar w-7 h-7 sm:w-9 sm:h-9 rounded-full
                backdrop-blur-sm flex items-center justify-center flex-shrink-0
                ${isLightboardMode
                    ? "bg-white/[0.08] border border-white/[0.15]"
                    : "bg-white/[0.10] border border-white/[0.18]"
                  }`}
              >
                <Bot className="chat-icon w-4 h-4 sm:w-5 sm:h-5 text-mist" />
              </div>
              <div
                className="backdrop-blur-md p-3 sm:p-4 rounded-2xl border"
                style={{
                  background: "rgba(20, 25, 35, 0.75)",
                  borderColor: "rgba(255, 255, 255, 0.12)",
                }}
              >
                <div className="flex space-x-1.5">
                  <div className="w-2 h-2 bg-mist/60 rounded-full animate-typing-pulse"></div>
                  <div
                    className="w-2 h-2 bg-mist/60 rounded-full animate-typing-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-mist/60 rounded-full animate-typing-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input Area - CLEAN MINIMAL */}
        <div className="border-t border-white/[0.15] bg-white/[0.08] backdrop-blur-sm">
          {/* Smart Mode Toggle - Shows tool calls when enabled */}
          <div className="flex justify-end px-3 sm:px-4 pt-2">
            <SmartModeToggle
              isSmartMode={isSmartMode}
              onToggle={handleSmartModeToggle}
            />
          </div>
          <div className="flex space-x-2 px-3 sm:px-4 pb-3 sm:pb-4 pt-1">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className={`flex-1 px-5 sm:px-6 py-2.5 sm:py-3
                backdrop-blur-sm rounded-full
                text-mist placeholder:text-mist/40 text-sm sm:text-base
                transition-all duration-300
                ${isLightboardMode
                  ? "bg-white/[0.06] border border-white/[0.12] focus:border-white/[0.20] focus:bg-white/[0.10]"
                  : "bg-white/[0.08] border border-white/[0.15] focus:border-white/[0.25] focus:bg-white/[0.12]"
                }
                focus:outline-none`}
              ref={chatInputRef}
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className={`rounded-full w-11 h-11 sm:w-12 sm:h-12 p-0
                backdrop-blur-sm text-mist transition-all duration-300
                active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isLightboardMode
                  ? "bg-white/[0.08] border border-white/[0.15] hover:bg-white/[0.12]"
                  : "bg-sapphire/70 border border-sapphire/50 hover:bg-sapphire/90"
                }`}
              disabled={!chatMessage.trim()}
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5 text-mist" />
            </Button>
          </div>
        </div>
      </div>
      <ChatInvitationDialog
        type="chat"
        open={showChatInvitation}
        onAccept={handleAcceptChat}
        onDecline={handleDeclineChat}
      />
      <ChatInvitationDialog
        type="audio"
        open={showAudioInvitation}
        onAccept={handleAcceptAudio}
        onDecline={handleDeclineAudio}
      />
      <ChatInvitationDialog
        type="video"
        open={showVideoInvitation}
        onAccept={handleAcceptVideo}
        onDecline={handleDeclineVideo}
      />
    </>
  );
};

export default TeleglassSection;
