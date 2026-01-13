import { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "@/utils/debounce";
import { Send, X, User, Bot } from "lucide-react";
import { teleAvatar } from "@/assets";
import { useSound } from "@/hooks/useSound";
import { Button } from "@/components/ui/button";
import TeleglassIcons from "@/components/TeleglassIcons";
import { useUIFrameworkChat } from "@/hooks/useUIFrameworkChat";

import { ToolCallIndicator } from "@/components/chat/ToolCallIndicator";
import { RAGSearchIndicator } from "@/components/chat/RAGSearchIndicator";
import { MessageFeedback } from "@/components/chat/MessageFeedback";
import { extractURLsFromText, fetchOpenGraphData } from "@/utils/openGraphFetcher";
import { URLPreview } from "@/components/chat/URLPreview";
import { URLPreviewLoading } from "@/components/chat/URLPreviewLoading";
import type { OpenGraphData } from "@/types/openGraph";
import { ChatInvitationDialog } from "@/components/ChatInvitationDialog";
import { playUISound } from "@/utils/soundGenerator";
import { notifyTele } from "@/utils/acknowledgmentHelpers";
import { useLightboard } from "@/contexts/LightboardContext";

type AvatarState = 'off' | 'connecting' | 'connected';

interface TeleglassSectionProps {
  onChatGlassChange?: (isOpen: boolean) => void;
  avatarState: AvatarState;
  setAvatarState: (state: AvatarState) => void;
  showWelcomeVideo: boolean;
  onAvatarClick: () => void;
  isConnecting: boolean;
}

const TeleglassSection = ({ onChatGlassChange, avatarState, setAvatarState, showWelcomeVideo, onAvatarClick, isConnecting }: TeleglassSectionProps) => {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isSmileyOn, setIsSmileyOn] = useState(true);
  const [isMicMuted, setIsMicMuted] = useState(true); // Start muted
  const [isChatGlassOpen, setIsChatGlassOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isVoiceConnected, setIsVoiceConnected] = useState(false);
  const [isSmartMode, setIsSmartMode] = useState(true);
  const [messageFeedback, setMessageFeedback] = useState<Record<string, "up" | "down">>({});
  const [urlPreviewCache, setUrlPreviewCache] = useState<Record<string, OpenGraphData>>({});
  const [showTeleAutocomplete, setShowTeleAutocomplete] = useState(false);
  const [showChatInvitation, setShowChatInvitation] = useState(false);
  const [isP2PActive, setIsP2PActive] = useState(false);
  const adminSocketIdRef = useRef<string | null>(null);
  const [showAudioInvitation, setShowAudioInvitation] = useState(false);
  const [showVideoInvitation, setShowVideoInvitation] = useState(false);
  const { isLightboardMode, toggleLightboard } = useLightboard();
  const [isOTPDialogOpen, setIsOTPDialogOpen] = useState(false);


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
  } = useUIFrameworkChat(isChatGlassOpen);

  // Play sound when thinking starts
  useEffect(() => {
    console.log("[TeleglassSection] isThinking changed:", isThinking);
    if (isThinking) {
      console.log("[TeleglassSection] Playing thinking sound");
      playUISound('on', 'mic', 0.4);
    }
  }, [isThinking]);


  // Use mock messages if no real messages, otherwise use real messages
  const displayMessages = chatMessages;

  // Toggle body class to squeeze layout when chat opens
  useEffect(() => {
    document.body.classList.toggle('chat-squeezed', isChatGlassOpen);
    return () => {
      document.body.classList.remove('chat-squeezed');
    };
  }, [isChatGlassOpen]);

  // Keep Teleglass vertical alignment with nav/logo/menu (stable positioning)
  useEffect(() => {
    const computeVerticalPosition = () => {
      const nav = document.getElementById('site-nav');
      const rect = nav?.getBoundingClientRect();
      if (rect) {
        const topPx = Math.max(8, rect.top + rect.height / 2 - 20);
        document.documentElement.style.setProperty('--teleglass-top', `${topPx}px`);
      }
    };

    const debouncedCompute = debounce(computeVerticalPosition, 16);
    computeVerticalPosition();

    if (!isChatGlassOpen) {
      window.addEventListener('resize', debouncedCompute);
      window.addEventListener('scroll', debouncedCompute, { passive: true });
      return () => {
        window.removeEventListener('resize', debouncedCompute);
        window.removeEventListener('scroll', debouncedCompute);
      };
    }

    return () => { };
  }, [isChatGlassOpen]);

  // Handle horizontal positioning based on chat state
  useEffect(() => {
    const computeHorizontalPosition = () => {
      if (isChatGlassOpen) {
        // When chat open: align to chat bar right edge (minus some padding)
        document.documentElement.style.setProperty('--teleglass-right', '3rem');
      } else {
        // When chat closed: align to content right edge
        const container = document.querySelector('.container');
        const containerRect = container?.getBoundingClientRect();
        if (containerRect) {
          const rightPx = Math.max(16, window.innerWidth - containerRect.right + 16);
          document.documentElement.style.setProperty('--teleglass-right', `${rightPx}px`);
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
            setUrlPreviewCache(prev => ({ ...prev, [url]: ogData }));
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
      const model: any = (window as any).UIFramework?.getVoiceComponents?.()?.model;
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
    playUISound('on', 'mic');
    const newSoundState = !isSoundOn;
    setIsSoundOn(newSoundState);

    // Control avatar video mute/unmute (only when connected)
    if (avatarState === 'connected') {
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
    playUISound('on', 'chat');
    setIsChatActive(!isChatActive);
    const newChatGlassState = !isChatGlassOpen;
    setIsChatGlassOpen(newChatGlassState);
    onChatGlassChange?.(newChatGlassState);

    // Dispatch chat state change event for GitVersionIndicator
    window.dispatchEvent(new CustomEvent('chatStateChange', {
      detail: { isOpen: newChatGlassState }
    }));
  }, [isVoiceConnected, isChatActive, isChatGlassOpen, onChatGlassChange]);

  const handleMicToggle = useCallback(() => {
    if (!isVoiceConnected) return; // disabled until connected
    try {
      (window as any).UIFramework?.toggleMute?.();
      playUISound('on', 'mic');
      syncMicFromModel();
    } catch (e) {
      // Silent error handling for production
    }
  }, [isVoiceConnected, syncMicFromModel]);

  const handleSmileyToggle = useCallback(() => {
    const newValue = !isSmileyOn;
    playUISound('on', 'mic');
    setIsSmileyOn(newValue);
    if (newValue) {
      try { (window as any).UIFramework?.showBgLayer?.({}); } catch (_) { }
    } else {
      try { (window as any).UIFramework?.hideBgLayer?.({}); } catch (_) { }
    }
  }, [isSmileyOn]);

  const handleLightboardToggle = useCallback(() => {
    playUISound('on', 'chat');
    toggleLightboard();
  }, [toggleLightboard]);

  const respondToMediaInvitation = useCallback(
    (mediaType: 'audio' | 'video', action: 'accept' | 'decline') => {
      const ui = (window as any).UIFramework;
      if (!ui) {
        return;
      }

      try {
        if (action === 'accept') {
          if (mediaType === 'audio') {
            ui.acceptAudio?.();
          } else {
            ui.acceptVideo?.();
          }
          playUISound('on', 'chat');
        } else {
          if (mediaType === 'audio') {
            ui.declineAudio?.();
          } else {
            ui.declineVideo?.();
          }
          playUISound('off', 'chat');
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
    playUISound('on', 'chat');
  }, []);

  const handleDeclineChat = useCallback(() => {
    const ui = (window as any).UIFramework;
    if (!ui) return;

    const socketId = adminSocketIdRef.current ?? undefined;
    ui.declineChat?.(socketId);
    if (socketId) {
      adminSocketIdRef.current = null;
    }
    playUISound('off', 'chat');
  }, []);

  const handleAcceptAudio = useCallback(() => {
    respondToMediaInvitation('audio', 'accept');
    setShowAudioInvitation(false);
  }, [respondToMediaInvitation]);

  const handleDeclineAudio = useCallback(() => {
    respondToMediaInvitation('audio', 'decline');
    setShowAudioInvitation(false);
  }, [respondToMediaInvitation]);

  const handleAcceptVideo = useCallback(async () => {
    respondToMediaInvitation('video', 'accept');
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
    respondToMediaInvitation('video', 'decline');
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
    const isToTele = trimmed.includes('@tele') ||
      trimmed.toLowerCase().includes('hey tele') ||
      trimmed.toLowerCase().includes('hi tele');

    try {
      if (isP2PActive && !isToTele) {
        ui?.sendP2PMessage?.(trimmed);
        addExternalMessage({
          role: 'user',
          text: trimmed,
          timestamp: new Date(),
        });
      } else {
        await sendMessage(trimmed);
      }
    } catch (error) {
      // Message sending failed
    } finally {
      setChatMessage('');
      setShowTeleAutocomplete(false);
      playChatSound();
    }
  };

  const handleSmartModeToggle = (enabled: boolean) => {
    setIsSmartMode(enabled);
    playUISound(enabled ? 'on' : 'off', 'chat');
  };

  const handleFeedback = (messageId: string, type: "up" | "down") => {
    setMessageFeedback(prev => ({
      ...prev,
      [messageId]: type
    }));
    playUISound('on', 'chat');
  };

  // Subscribe to UIFramework mute state changes when available
  useEffect(() => {
    let cancelled = false;
    let detach: any = null;
    const attach = () => {
      const ui: any = (window as any).UIFramework;
      const model: any = ui?.getVoiceComponents?.()?.model;
      if (!model || !model.addEventListener) return false;
      const ensureMutedAfterConnect = () => {
        try {
          setTimeout(() => {
            try {
              syncMicFromModel();
            } catch (_) { }
          }, 80);
        } catch (_) { }
      };
      const onMuteChange = ({ isMuted }: any) => {
        if (!cancelled) {
          setIsMicMuted(!!isMuted);
        }
      };
      const onConnChange = ({ state }: any) => {
        if (!cancelled) {
          const connected = state === 'connected' || !!model.isConnected;
          setIsVoiceConnected(connected);
          if (connected) ensureMutedAfterConnect();
        }
      };
      const onStatus = ({ status }: any) => {
        if (!cancelled) {
          if (status === 'connected') setIsVoiceConnected(true);
          if (status === 'disconnected' || status === 'error') setIsVoiceConnected(false);
          if (status === 'connected') ensureMutedAfterConnect();
        }
      };
      model.addEventListener("muteStateChanged", onMuteChange);
      model.addEventListener("connectionStateChange", onConnChange);
      model.addEventListener("statusChange", onStatus);
      // Also enforce after session creation
      const onSessionCreated = () => ensureMutedAfterConnect();
      model.addEventListener('sessionCreated', onSessionCreated as any);
      try { setIsMicMuted(!!model.isMuted); } catch (_) { }
      try { setIsVoiceConnected(!!model.isConnected); } catch (_) { }
      detach = () => {
        try { model.removeEventListener?.("muteStateChanged", onMuteChange); } catch (_) { }
        try { model.removeEventListener?.("connectionStateChange", onConnChange); } catch (_) { }
        try { model.removeEventListener?.("statusChange", onStatus); } catch (_) { }
        try { model.removeEventListener?.('sessionCreated', onSessionCreated as any); } catch (_) { }
      };
      return true;
    };
    if (!attach()) {
      const t = setInterval(() => { if (attach()) clearInterval(t); }, 300);
      detach = () => { clearInterval(t); };
    }
    return () => { cancelled = true; try { if (detach) detach(); } catch (_) { } };
  }, [syncMicFromModel]);

  // Connect chat to avatar connection state
  useEffect(() => {
    handleConnectionChange(avatarState === 'connected');
  }, [avatarState, handleConnectionChange]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.shiftKey) return;

      const activeElement = document.activeElement as HTMLElement | null;
      const isTypingInChat = !!(
        activeElement &&
        (
          activeElement === chatInputRef.current ||
          activeElement.closest?.('#teleglass#chat-panel')
        ) &&
        (
          activeElement instanceof HTMLInputElement ||
          activeElement instanceof HTMLTextAreaElement ||
          activeElement.getAttribute('contenteditable') === 'true'
        )
      );

      if (isTypingInChat) return;

      const key = event.key.toLowerCase();
      if (key === 'm') {
        event.preventDefault();
        handleMicToggle();
      } else if (key === 'v') {
        event.preventDefault();
        handleSoundToggle();
      } else if (key === 'c') {
        event.preventDefault();
        if (isVoiceConnected) {
          handleChatToggle();
        }
      } else if (key === 'a') {
        event.preventDefault();
        handleSmileyToggle();
      } else if (key === 'l') {
        event.preventDefault();
        handleLightboardToggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMicToggle, handleSoundToggle, handleChatToggle, handleSmileyToggle, handleLightboardToggle, isVoiceConnected, isChatGlassOpen]);

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

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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

    const unwrapDetail = (payload: any) => (payload && typeof payload.detail !== 'undefined' ? payload.detail : payload) || {};

    const handleInvitation = (event: any) => {
      const detail = unwrapDetail(event);
      const adminId = detail?.adminSocketId ?? null;
      if (adminId) {
        adminSocketIdRef.current = adminId;
      }
      setShowChatInvitation(true);
      playUISound('on', 'chat');
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

      if (typeof message === 'string' && message.trim().length > 0) {
        addExternalMessage({
          role: from === 'visitor' ? 'user' : 'assistant',
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
      playUISound('on', 'chat');
    };

    const handleVideoInvitation = (event: any) => {
      const detail = unwrapDetail(event);
      setShowVideoInvitation(true);
      playUISound('on', 'chat');
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
      if (!ui || typeof ui.onP2PEvent !== 'function' || typeof ui.offP2PEvent !== 'function') {
        return false;
      }

      if (listenersAttached) {
        return true;
      }

      ui.onP2PEvent('chatInvitation', handleInvitation);
      ui.onP2PEvent('chatAccepted', handleAccepted);
      ui.onP2PEvent('chatDeclined', handleDeclined);
      ui.onP2PEvent('chatEnded', handleEnded);
      ui.onP2PEvent('p2pMessage', handleP2PMessage);
      ui.onP2PEvent('audioInvitation', handleAudioInvitation);
      ui.onP2PEvent('audioAccepted', handleAudioAccepted);
      ui.onP2PEvent('audioDeclined', handleAudioDeclined);
      ui.onP2PEvent('videoInvitation', handleVideoInvitation);
      ui.onP2PEvent('videoAccepted', handleVideoAccepted);
      ui.onP2PEvent('videoDeclined', handleVideoDeclined);

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
        attachedUI.offP2PEvent('chatInvitation', handleInvitation);
        attachedUI.offP2PEvent('chatAccepted', handleAccepted);
        attachedUI.offP2PEvent('chatDeclined', handleDeclined);
        attachedUI.offP2PEvent('chatEnded', handleEnded);
        attachedUI.offP2PEvent('p2pMessage', handleP2PMessage);
        attachedUI.offP2PEvent('audioInvitation', handleAudioInvitation);
        attachedUI.offP2PEvent('audioAccepted', handleAudioAccepted);
        attachedUI.offP2PEvent('audioDeclined', handleAudioDeclined);
        attachedUI.offP2PEvent('videoInvitation', handleVideoInvitation);
        attachedUI.offP2PEvent('videoAccepted', handleVideoAccepted);
        attachedUI.offP2PEvent('videoDeclined', handleVideoDeclined);
      }
    };
  }, [addExternalMessage, isChatGlassOpen, onChatGlassChange]);


  return (
    <>
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
      />

      {/* Chat Glass Panel - Volumetric Floating Interface */}
      <div
        className={`fixed teleglass-panel top-0 h-dvh z-50
          transform transition-all duration-500 ease-out ${isChatGlassOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }
          ${isLightboardMode
            ? 'bg-white/20 border-l border-white/40'
            : 'bg-black/10 border-l border-white/10'
          }
        flex flex-col
        xl:right-0
        max-xl:left-0 max-xl:right-0 max-xl:w-full`}
        style={{
          width: 'var(--chat-glass-width)',
          maxWidth: '100vw',
          boxShadow: 'var(--shadow-float-far), var(--shadow-glow-cyan)'
        }}
      >
        {/* Top edge glow */}
        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${isLightboardMode
          ? 'from-white/90 via-white/70 to-transparent'
          : 'from-primary/50 via-primary/30 to-transparent'
          }`} />

        {/* Side accent glow */}
        <div className={`absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b ${isLightboardMode
          ? 'from-white/70 via-transparent to-white/70'
          : 'from-primary/30 via-transparent to-primary/30'
          }`} />
        {/* Teleglass Icons at top of chat bar */}
        <div className="sm:h-10" style={{ paddingTop: 'var(--teleglass-top)' }}>
        </div>

        {isP2PActive && (
          <div className={`mx-3 sm:mx-4 mt-3 px-3 py-2 rounded-lg text-sm flex items-center gap-2 backdrop-blur-sm ${isLightboardMode
            ? 'bg-white/20 border-2 border-white/50 text-white shadow-[0_0_25px_rgba(255,255,255,0.3)]'
            : 'bg-secondary/10 border border-secondary/30 text-white'
            }`}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${isLightboardMode ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-secondary'
              }`}></div>
            <span className="font-medium">Connected to admin</span>
            <span className={`text-xs ml-auto ${isLightboardMode ? 'text-white/90' : 'text-white/70'}`}>(Type @tele to include AI assistant)</span>
          </div>
        )}

        {/* Chat Messages Area - positioned below icons */}
        <div className="flex-1 min-h-0 chat-messages-container px-3 sm:px-4 pt-2 pb-2 space-y-3 sm:space-y-4" ref={messagesContainerRef} style={{ marginTop: `var(--teleglass-top)` }}>
          {displayMessages.map((msg, index) => {
            // Calculate stagger delay class based on message index
            const staggerClass = `chat-delay-${Math.min(index % 5 + 1, 5)}`;
            // Extract URLs from all messages (both user and assistant)
            const urls = extractURLsFromText(msg.text);

            return (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-start space-x-2 animate-chat-bubble-enter opacity-0 ${staggerClass}`}
              >
                {msg.role === 'assistant' && (
                  <div className={`chat-avatar w-7 h-7 sm:w-9 sm:h-9 rounded-full 
                    backdrop-blur-sm flex items-center justify-center flex-shrink-0
                    ${isLightboardMode
                      ? 'bg-white/30 border-2 border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.6)]'
                      : 'bg-white/5 border border-white/20 shadow-[var(--shadow-float-near)]'
                    }`}>
                    <Bot className={`chat-icon w-4 h-4 sm:w-5 sm:h-5 ${isLightboardMode ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-primary'
                      }`} />
                  </div>
                )}
                <div className={`chat-message-bubble max-w-[75%] sm:max-w-[70%] p-3 sm:p-4 rounded-2xl
                  transform transition-all duration-500
                  hover:scale-[1.02] hover:-translate-y-0.5
                  border backdrop-blur-md text-sm sm:text-base ${isLightboardMode
                    ? msg.role === 'user'
                      ? 'bg-white/30 border-white/60 text-white shadow-[0_0_30px_rgba(255,255,255,0.4)]'
                      : 'bg-white/20 border-white/50 text-white shadow-[0_0_25px_rgba(255,255,255,0.3)]'
                    : msg.role === 'user'
                      ? 'bg-white/25 border-white/20 text-white shadow-[var(--shadow-float-near)]'
                      : 'bg-black/25 border-white/10 text-white/90 shadow-[var(--shadow-float-mid)]'
                  }`}>
                  {/* Tool Call and RAG Search Indicators (only shown in Smart Mode) */}
                  {isSmartMode && msg.role === 'assistant' && (msg as any).metadata && (
                    <>
                      {(msg as any).metadata.toolCalls?.map((tool: any) => (
                        <ToolCallIndicator
                          key={tool.id}
                          toolName={tool.toolName}
                          parameters={tool.parameters}
                          timestamp={tool.timestamp}
                        />
                      ))}
                      {(msg as any).metadata.ragSearches?.map((search: any) => (
                        <RAGSearchIndicator
                          key={search.id}
                          searchQuery={search.searchQuery}
                          resultsCount={search.resultsCount}
                          timestamp={search.timestamp}
                        />
                      ))}
                    </>
                  )}

                  <p className="leading-relaxed">
                    {/* Remove URLs from text display since they're shown as preview cards */}
                    {urls.length > 0
                      ? msg.text.replace(/(https?:\/\/[^\s]+)/g, '').trim()
                      : msg.text
                    }
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
                            onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
                          />
                        );
                      })}
                    </div>
                  )}

                  <p className={`text-xs mt-1 ${isLightboardMode ? 'text-white/90' : 'text-white/60'}`}>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>

                  {/* Feedback buttons (for assistant messages only) */}
                  {msg.role === 'assistant' && (
                    <MessageFeedback
                      messageId={msg.id}
                      currentFeedback={messageFeedback[msg.id]}
                      onFeedback={handleFeedback}
                    />
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className={`chat-avatar w-7 h-7 sm:w-9 sm:h-9 rounded-full
                    backdrop-blur-sm flex items-center justify-center flex-shrink-0
                    ${isLightboardMode
                      ? 'bg-white/30 border-2 border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.6)]'
                      : 'bg-white/5 border border-white/20 shadow-[var(--shadow-float-near)]'
                    }`}>
                    <User className={`chat-icon w-4 h-4 sm:w-5 sm:h-5 ${isLightboardMode ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white/90'
                      }`} />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex justify-start items-start space-x-2 animate-chat-bubble-enter opacity-0 chat-delay-1">
              <div className={`chat-avatar w-7 h-7 sm:w-9 sm:h-9 rounded-full
                backdrop-blur-sm flex items-center justify-center flex-shrink-0
                ${isLightboardMode
                  ? 'bg-white/30 border-2 border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.6)]'
                  : 'bg-white/5 border border-white/20 shadow-[var(--shadow-float-near)]'
                }`}>
                <Bot className={`chat-icon w-4 h-4 sm:w-5 sm:h-5 ${isLightboardMode ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-primary'
                  }`} />
              </div>
              <div className={`backdrop-blur-md p-3 sm:p-4 rounded-2xl ${isLightboardMode
                ? 'bg-white/20 border-2 border-white/50 text-white shadow-[0_0_25px_rgba(255,255,255,0.3)]'
                : 'bg-black/25 border border-white/10 text-white/90 shadow-[var(--shadow-float-near)]'
                }`}>
                <div className="flex space-x-1.5">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-typing-pulse"></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-typing-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-typing-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input Area */}
        <div className="border-t border-white/10 glass-strong">
          <div className="flex space-x-2 px-3 sm:px-4 pb-3 sm:pb-4 pt-3">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className={`flex-1 px-4 sm:px-5 py-2.5 sm:py-3
                backdrop-blur-sm rounded-2xl
                text-white placeholder:text-white/40 text-sm sm:text-base
                transition-all duration-500
                ${isLightboardMode
                  ? 'bg-white/20 border-2 border-white/50 focus:border-white/80 focus:bg-white/30 focus:shadow-[0_0_30px_rgba(255,255,255,0.5)]'
                  : 'bg-white/5 border border-white/20 focus:border-primary/50 focus:bg-white/10 focus:shadow-[var(--shadow-glow-cyan)]'
                }
                focus:outline-none
                [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]`}
              ref={chatInputRef}
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className={`rounded-2xl w-11 h-11 sm:w-12 sm:h-12 p-0
                backdrop-blur-sm text-white transition-all duration-500
                hover:-translate-y-0.5
                active:translate-y-0 active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
                ${isLightboardMode
                  ? 'bg-white/30 border-2 border-white/60 hover:bg-white/40 hover:border-white/80 hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]'
                  : 'bg-primary/20 border border-primary/30 hover:bg-primary/30 hover:border-primary/40 hover:shadow-[var(--shadow-glow-cyan)]'
                }`}
              disabled={!chatMessage.trim()}
            >
              <Send className={`w-4 h-4 sm:w-5 sm:h-5 ${isLightboardMode ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : ''
                }`} />
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
