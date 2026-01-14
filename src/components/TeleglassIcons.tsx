import React, { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX, MessageCircle, Mic, MicOff, Smile, Frown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export type AvatarState = 'off' | 'connecting' | 'connected';

interface TeleglassIconsProps {
  isChatGlassOpen: boolean;
  isSoundOn: boolean;
  isChatActive: boolean;
  isMicMuted: boolean;
  avatarState: AvatarState;
  isMouseActive?: boolean;
  onSoundToggle: () => void;
  onChatToggle: () => void;
  onMicToggle: () => void;
  onAvatarClick: () => void;
  inChatGlass?: boolean;
  avatarSrc: string;
  isVoiceConnected?: boolean;
  onSmileyToggle: () => void;
  isSmileyOn: boolean;
}

const getAvatarClasses = (state: AvatarState) => {
  const base = "w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer transition-all border-2";
  switch (state) {
    case 'off':
      return `${base} avatar-inactive-glow border-white/30`;
    case 'connecting':
      return `${base} avatar-connecting-pulse border-primary`;
    case 'connected':
      return `${base} avatar-connected-glow`;
    default:
      return base;
  }
};

const getIconClasses = (isActive: boolean, isWarning = false) => {
  const base = "w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out";
  if (isWarning) return `${base} bg-destructive/80 backdrop-blur-md text-white hover:shadow-glow hover:scale-[1.02]`;
  if (isActive) return `${base} glass-medium text-white hover:scale-[1.02]`;
  return `${base} glass-subtle text-white/70 hover:scale-[1.02]`;
};

export const TeleglassIcons: React.FC<TeleglassIconsProps> = ({
  isChatGlassOpen,
  isSoundOn,
  isChatActive,
  isMicMuted,
  avatarState,
  isMouseActive = true,
  onSoundToggle,
  onChatToggle,
  onMicToggle,
  onAvatarClick,
  inChatGlass = false,
  avatarSrc,
  isVoiceConnected = false,
  onSmileyToggle,
  isSmileyOn,
}) => {
  const isConnected = avatarState === 'connected';
  const shouldShowSpeaker = !isSoundOn || isMouseActive;
  const containerZIndex = isChatGlassOpen ? 'max-xl:z-[100] xl:z-[100]' : 'z-50';
  const containerRef = useRef<HTMLDivElement>(null);
  const [useStaticPosition, setUseStaticPosition] = useState(!isChatGlassOpen);
  const [showConnectButton, setShowConnectButton] = useState(false);

  // Show connect button 2 seconds after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConnectButton(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Delay switching to static position until after animation completes
  useEffect(() => {
    if (isChatGlassOpen) {
      setUseStaticPosition(false);
    } else {
      let delay = 100;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = 150;

      if (scrollTop < viewportHeight) {
        delay = 350;
      }
      // Stay fixed during animation, then switch to static
      const timer = setTimeout(() => {
        setUseStaticPosition(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isChatGlassOpen]);

  return (
    <div
      ref={containerRef}
      className={`inline-flex items-center gap-2 sm:gap-4 transition-all duration-300 ease-in-out relative ${containerZIndex}`}
      style={!inChatGlass ? {
        position: useStaticPosition ? 'static' : 'fixed',
        right: 'calc(var(--teleglass-right) - 0.6rem)',
        top: 'var(--teleglass-top)',
      } : undefined}
    >
      {/* Speaker Icon - only show when connected */}
      {isConnected && (
        <div
          onClick={onSoundToggle}
          className={`${getIconClasses(isSoundOn, !isSoundOn)} transition-opacity duration-300 ${shouldShowSpeaker ? 'opacity-100' : 'opacity-0'}`}
          style={{ pointerEvents: 'auto' }}
        >
          {isSoundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </div>
      )}

      {/* Chat Icon - only show when connected */}
      {isConnected && (
        <div onClick={onChatToggle} className={`${getIconClasses(isChatActive)}`} style={{ pointerEvents: 'auto' }}>
          <MessageCircle className="w-5 h-5" />
        </div>
      )}

      {/* Mic Icon - only show when connected */}
      {isConnected && (
        <div onClick={onMicToggle} className={`${getIconClasses(!isMicMuted, isMicMuted)}`} style={{ pointerEvents: 'auto' }}>
          {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </div>
      )}

      {isConnected && (
        <div onClick={onSmileyToggle} className={`${getIconClasses(isSmileyOn)}`} style={{ pointerEvents: 'auto' }}>
          {isSmileyOn ? <Smile className="w-4 h-4 sm:w-5 sm:h-5" /> : <Frown className="w-4 h-4 sm:w-5 sm:h-5" />}
        </div>
      )}

      {/* Connect Button - REMOVED (Moved to Welcome Screen) */}
      {avatarState === 'off' && showConnectButton && (
        <Button
          onClick={onAvatarClick}
          className="bg-[#ff6600] text-white hover:bg-[#ff6600]/90 shadow-soft hover:shadow-card transition-all duration-300 font-bold uppercase text-base tracking-wide flex items-center gap-2"
          size="default"
        >
          Talk to Tele
          <ArrowRight className="w-5 h-5" />
        </Button>
      )}

      {/* Avatar Icon - always show */}
      <div
        onClick={onAvatarClick}
        className={`${getAvatarClasses(avatarState)} shadow-soft ${avatarState === 'off' ? 'hover:shadow-glow hover:scale-[1.02]' : ''}`}
        style={{ pointerEvents: 'auto' }}
        role="button"
        aria-label={`Tele avatar — ${avatarState}`}
        title={avatarState === 'off' ? 'Connect' : avatarState === 'connecting' ? 'Connecting...' : 'Connected'}
      >
        <img
          src={avatarSrc}
          alt="Tele Avatar headshot"
          className={`w-full h-full object-cover rounded-full transition-all duration-300 ${avatarState === 'off' ? 'filter grayscale brightness-75 hover:grayscale-0 hover:brightness-100' :
            avatarState === 'connecting' ? '' :
              'filter-none brightness-110'
            }`}
          width={40}
          height={40}
          loading="eager"
          decoding="async"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default React.memo(TeleglassIcons);
