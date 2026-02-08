import { useState, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { default as moebeusLogo } from "@/assets/mobeus-logo.png";
import { handleAcknowledgment } from "@/utils/acknowledgmentHelpers";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";
import { SubsectionMetadata } from "@/types/subsection";
import { useShadowEffects } from "@/contexts/ShadowEffectsContext";


type NavigationProps = {
  activeSection: string;
  isChatGlassOpen: boolean;
  onSectionChange: (section: string, subSection?: string | string[] | SubsectionMetadata[] | null) => void;
};

const Navigation = ({ activeSection, isChatGlassOpen, onSectionChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { playUniversalSound } = useSound();
  const { isScrolled } = useShadowEffects();

  // Dynamically measure nav height and update CSS variable
  useLayoutEffect(() => {
    const updateNavHeight = () => {
      const nav = document.getElementById('site-nav');
      if (nav) {
        document.documentElement.style.setProperty('--nav-h', `${nav.offsetHeight}px`);
      }
    };

    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);
    return () => window.removeEventListener('resize', updateNavHeight);
  }, []);

  // ============================================
  // MOBEUS — Help is here
  // ============================================
  const navItems: Array<{
    id: string;
    label: string;
    teleQuery?: string;
    externalUrl?: string;
    isHighlighted?: boolean;
  }> = [
      {
        id: 'how-it-works',
        label: 'HOW IT WORKS',
        teleQuery: 'show me how it works'
      },
      {
        id: 'what-we-do',
        label: 'WHAT WE DO',
        teleQuery: 'show me what you do'
      },
      {
        id: 'about',
        label: 'ABOUT',
        teleQuery: 'show me what mobeus is'
      },
      {
        id: 'get-started',
        label: 'LAUNCH EVENT',
        teleQuery: 'show me launch event registration',
        isHighlighted: true
      }
    ];

  // Mist styling for clean look
  const buttonBaseStyles = "bg-mist border-mist text-onyx hover:bg-mist/90 hover:border-mist/90";
  const glowColor = "from-mist/20 via-mist/10";
  const edgeGlowColor = "via-mist/30";

  return (
    <nav
      id="site-nav"
      className="relative top-0 left-0 right-0 z-60 flex-1 transition-all duration-500"
      style={{
        zIndex: isMenuOpen ? 70 : 60,
        background: 'transparent',
      }}
    >
      <div className="relative px-4 md:px-8">
        {/* Top edge glow */}
        {isScrolled && (
          <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${edgeGlowColor} to-transparent`} />
        )}

        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between h-20 sm:h-24 lg:h-28">
            <div className="flex items-center gap-6">
              {/* Logo */}
              <div className="no-lightboard flex items-center">
                <img
                  src={moebeusLogo}
                  alt="Mobeus"
                  className="no-lightboard h-[27px] w-auto object-contain max-w-none"
                  style={{ aspectRatio: 'auto' }}
                />
              </div>

              {/* Desktop Navigation - VISIBLE ON DARK BACKGROUND */}
              <div className="hidden xl:flex items-end self-end mt-1 space-x-1.5">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => {
                      handleAcknowledgment(item.id);
                      playUniversalSound();
                      if (item.externalUrl) {
                        window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
                      } else if (item.teleQuery) {
                        sendToTele(item.teleQuery);
                      }
                    }}
                    variant="ghost"
                    size="sm"
                    className={`relative px-4 text-[13px] font-semibold tracking-wide
                    transition-all duration-300
                    ${item.isHighlighted
                        ? 'text-mist bg-flamingo/20 border-flamingo shadow-[0_0_16px_rgba(155,93,229,0.5)]'
                        : 'text-mist/90 hover:text-mist hover:bg-mist/10 border-transparent hover:border-flamingo/40'
                      }
                    border rounded-full backdrop-blur-sm
                    h-auto py-2`}
                  >
                    <span className="relative z-10">{item.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            {!isChatGlassOpen && (
              <div className="flex items-center">
                <button
                  onClick={() => {
                    handleAcknowledgment('nav-menu-open');
                    playUniversalSound();
                    setIsMenuOpen(!isMenuOpen);
                  }}
                  className="xl:hidden p-2 rounded-full text-mist hover:bg-mist/10 backdrop-blur-sm transition-all duration-300 mr-3"
                >
                  {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-onyx/50 backdrop-blur-sm z-50 xl:hidden transition-opacity duration-300"
          onClick={() => {
            handleAcknowledgment('nav-menu-close');
            playUniversalSound();
            setIsMenuOpen(false);
          }}
        />
      )}

      {/* Mobile Slide-in Menu - LIGHT FROST GLASS */}
      <div
        style={{
          zIndex: 50
        }}
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw]
          bg-onyx/70 backdrop-blur-sm border-l border-mist/10
          xl:hidden transform transition-all duration-500 ease-out ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-mist/10" />
        <div className="relative flex items-center justify-between p-6 border-b border-mist/10">
          <h2 className="text-lg font-bold text-mist">Navigate</h2>
          <button
            onClick={() => {
              handleAcknowledgment('nav-menu-close');
              playUniversalSound();
              setIsMenuOpen(false);
            }}
            className="p-2 rounded-full text-mist bg-mist/5 border border-mist/10
              hover:bg-mist/10 hover:border-mist/20 hover:rotate-90
              backdrop-blur-sm transition-all duration-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col p-6 space-y-3">
          {navItems.map((item, index) => (
            <Button
              key={item.id}
              onClick={() => {
                handleAcknowledgment(item.id);
                playUniversalSound();
                if (item.externalUrl) {
                  window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
                } else if (item.teleQuery) {
                  sendToTele(item.teleQuery);
                }
                setIsMenuOpen(false);
              }}
              variant="outline"
              size="lg"
              className={`relative w-full justify-start px-6 py-5 text-xl font-bold
                backdrop-blur-sm
                ${item.isHighlighted
                  ? 'border-flamingo bg-flamingo/20 shadow-[0_0_20px_rgba(155,93,229,0.5)]'
                  : 'border-mist/20 hover:border-flamingo/50 bg-mist/10 hover:bg-mist/15'
                }
                text-mist
                rounded-full
                transition-all duration-300
                hover:-translate-x-2
                active:translate-x-0 active:scale-95
                animate-stagger-enter opacity-0`}
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
            >
              <span className="relative z-10">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;