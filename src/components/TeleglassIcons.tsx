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
  isLoading?: boolean; // Shows pulsing ring when navigation is loading
}

/**
 * 8-COLOR BRAND PALETTE STYLE
 * - Flamingo (#9B5DE5): Primary CTAs (PURPLE)
 * - All icons: mist gray (white for visibility on dark green background)
 * - Very light blur glassmorphism (backdrop-blur-sm)
 * - Avatar visible behind glass
 */
const getAvatarClasses = (state: AvatarState) => {
  const base = "w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer transition-all border-2";
  switch (state) {
    case 'off':
      return `${base} border-mist/30 bg-mist/5 backdrop-blur-sm`;
    case 'connecting':
      return `${base} border-flamingo/60 bg-flamingo/10 backdrop-blur-sm animate-pulse`;
    case 'connected':
      return `${base} border-flamingo/80 bg-mist/10 backdrop-blur-sm`;
    default:
      return base;
  }
};

const getIconClasses = (isActive: boolean, isWarning = false) => {
  const base = "w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out backdrop-blur-sm border text-mist";

  if (isWarning) {
    return `${base} bg-flamingo/60 border-flamingo/40 hover:bg-flamingo/80 hover:scale-[1.05]`;
  }
  if (isActive) {
    return `${base} bg-mist/15 border-mist/30 hover:bg-mist/25 hover:scale-[1.05]`;
  }
  return `${base} bg-mist/5 border-mist/20 hover:bg-mist/10 hover:border-mist/30 hover:scale-[1.05]`;
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
  isLoading = false,
}) => {
  const isConnected = avatarState === 'connected';
  const shouldShowSpeaker = !isSoundOn || isMouseActive;
  const containerZIndex = isChatGlassOpen ? 'max-xl:z-[100] xl:z-[100]' : 'z-50';
  const containerRef = useRef<HTMLDivElement>(null);
  const [useStaticPosition, setUseStaticPosition] = useState(!isChatGlassOpen);
  const [showConnectButton, setShowConnectButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConnectButton(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
      {/* Speaker Icon - Hidden on mobile */}
      {isConnected && (
        <div
          onClick={onSoundToggle}
          className={`hidden sm:flex ${getIconClasses(isSoundOn, !isSoundOn)} transition-opacity duration-300 ${shouldShowSpeaker ? 'opacity-100' : 'opacity-0'}`}
          style={{ pointerEvents: 'auto' }}
        >
          {isSoundOn ? <Volume2 className="w-5 h-5 text-mist" /> : <VolumeX className="w-5 h-5 text-mist" />}
        </div>
      )}

      {/* Chat Icon */}
      {isConnected && (
        <div onClick={onChatToggle} className={`${getIconClasses(isChatActive)}`} style={{ pointerEvents: 'auto' }}>
          <MessageCircle className="w-5 h-5 text-mist" />
        </div>
      )}

      {/* Mic Icon */}
      {isConnected && (
        <div onClick={onMicToggle} className={`${getIconClasses(!isMicMuted, isMicMuted)}`} style={{ pointerEvents: 'auto' }}>
          {isMicMuted ? <MicOff className="w-5 h-5 text-mist" /> : <Mic className="w-5 h-5 text-mist" />}
        </div>
      )}

      {/* Smiley Icon */}
      {isConnected && (
        <div onClick={onSmileyToggle} className={`${getIconClasses(isSmileyOn)}`} style={{ pointerEvents: 'auto' }}>
          {isSmileyOn ? <Smile className="w-4 h-4 sm:w-5 sm:h-5 text-mist" /> : <Frown className="w-4 h-4 sm:w-5 sm:h-5 text-mist" />}
        </div>
      )}

      {/* Connect Button - FLAMINGO CTA */}
      {avatarState === 'off' && showConnectButton && (
        <Button
          onClick={onAvatarClick}
          className="rounded-full bg-flamingo/90 border border-flamingo/70 hover:bg-flamingo text-mist transition-all duration-300 font-bold uppercase text-sm tracking-wide flex items-center gap-2 px-6 py-2"
          size="default"
        >
          START
          <ArrowRight className="w-4 h-4 text-mist" />
        </Button>
      )}

      {/* Avatar Icon with Loading Ring - EXACT animation from ImageGeneratingState */}
      <div className="relative">
        {isLoading && (
          <>
            {/* Outer glow ring */}
            <div className="absolute inset-0 -m-3 bg-gradient-to-r from-flamingo/30 via-wave/30 to-flamingo/30 blur-xl rounded-full animate-pulse" />

            {/* Middle glow ring */}
            <div className="absolute inset-0 -m-2 bg-flamingo/20 blur-lg rounded-full animate-pulse" style={{ animationDuration: '2s' }} />

            {/* Animated expanding rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-10 h-10 sm:w-12 sm:h-12 border-2 border-flamingo/40 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute w-12 h-12 sm:w-14 sm:h-14 border-2 border-wave/50 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
              <div className="absolute w-14 h-14 sm:w-16 sm:h-16 border-2 border-mist/20 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
            </div>
          </>
        )}

        {/* Avatar container */}
        <div className="relative w-8 h-8 sm:w-10 sm:h-10">
          {isLoading ? (
            <>
              {/* Spinning gradient border when loading */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-flamingo via-wave to-flamingo animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-[2px] rounded-full bg-onyx/90" />

              {/* Avatar image - no border when loading (border is the spinning gradient) */}
              <div
                onClick={onAvatarClick}
                className="absolute inset-[2px] rounded-full cursor-pointer overflow-hidden"
                style={{ pointerEvents: 'auto' }}
                role="button"
                aria-label="Catherine avatar — thinking"
                title="Catherine is thinking..."
              >
                <img
                  src={avatarSrc}
                  alt="Catherine Avatar"
                  className="w-full h-full object-cover rounded-full"
                  width={40}
                  height={40}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
              </div>
            </>
          ) : (
            /* Normal avatar with standard border */
            <div
              onClick={onAvatarClick}
              className={`${getAvatarClasses(avatarState)} ${avatarState === 'off' ? 'hover:scale-[1.02]' : ''}`}
              style={{ pointerEvents: 'auto' }}
              role="button"
              aria-label={`Catherine avatar — ${avatarState}`}
              title={avatarState === 'off' ? 'Connect' : avatarState === 'connecting' ? 'Connecting...' : 'Connected'}
            >
              <img
                src={avatarSrc}
                alt="Catherine Avatar"
                className={`w-full h-full object-cover rounded-full transition-all duration-300 ${avatarState === 'off' ? 'filter grayscale brightness-75 hover:grayscale-0 hover:brightness-100' :
                  avatarState === 'connecting' ? '' :
                    'filter-none brightness-125'
                  }`}
                width={40}
                height={40}
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TeleglassIcons);
