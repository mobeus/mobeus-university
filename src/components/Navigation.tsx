import { useState, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { default as fiservLogo } from "@/assets/fiserv-logo.png";
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
  // FISERV DMA BUYER JOURNEY NAVIGATION
  // Guides enterprise bank buyers through platform discovery
  // ============================================
  const navItems: Array<{
    id: string;
    label: string;
    teleQuery: string;
  }> = [
      {
        id: 'home',
        label: 'HOME',
        teleQuery: '(M) Show platform overview'
      },
      {
        id: 'value',
        label: 'VALUE',
        teleQuery: '(M) What problems does this solve?'
      },
      {
        id: 'platform',
        label: 'PLATFORM',
        teleQuery: '(M) Show me the full onboarding journey'
      },
      {
        id: 'benefits',
        label: 'BENEFITS',
        teleQuery: '(M) What are the main benefits?'
      },
      {
        id: 'pricing',
        label: 'PRICING',
        teleQuery: '(M) Show me the fee structure'
      },
      {
        id: 'next',
        label: 'NEXT STEPS',
        teleQuery: '(M) What\'s next? How do we proceed?'
      }
    ];

  // Emerald styling for Fiserv DMA
  const buttonBaseStyles = "bg-emerald-500 border-emerald-500 text-black hover:bg-emerald-400 hover:border-emerald-400";
  const glowColor = "from-emerald-500/20 via-emerald-500/10";
  const edgeGlowColor = "via-emerald-500/30";

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
                  src={fiservLogo}
                  alt="Fiserv DMA"
                  className="no-lightboard h-[27px] w-auto object-contain max-w-none"
                  style={{ aspectRatio: 'auto' }}
                />
              </div>

              {/* Desktop Navigation */}
              <div className="hidden xl:flex items-end space-x-3">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => {
                      handleAcknowledgment(item.id);
                      playUniversalSound();

                      if (item.id === 'home') {
                        onSectionChange('welcome', null);
                      } else {
                        sendToTele(item.teleQuery);
                      }
                    }}
                    variant="ghost"
                    size="sm"
                    className={`relative h-7 px-3 text-[11px] font-medium
                    backdrop-blur-md
                    border rounded-full
                    transition-all duration-500
                    hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow-cyan)]
                    active:translate-y-0 active:scale-95
                    ${buttonBaseStyles}`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className={`absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${glowColor} to-transparent blur-xl`} />
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
                    setIsMenuOpen(!isMenuOpen);
                  }}
                  className="xl:hidden p-2 rounded-full text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 mr-3"
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 xl:hidden transition-opacity duration-300"
          onClick={() => {
            handleAcknowledgment('nav-menu-close');
            setIsMenuOpen(false);
          }}
        />
      )}

      {/* Mobile Slide-in Menu */}
      <div
        style={{
          zIndex: 50,
          boxShadow: 'var(--shadow-float-far), var(--shadow-glow-cyan)'
        }}
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw]
          bg-black/20 backdrop-blur-2xl border-l border-white/10
          xl:hidden transform transition-all duration-500 ease-out ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
      >
        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-emerald-500/50 via-emerald-500/30 to-transparent`} />
        <div className="relative flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">Navigate</h2>
          <button
            onClick={() => {
              handleAcknowledgment('nav-menu-close');
              playUniversalSound();
              setIsMenuOpen(false);
            }}
            className="p-2 rounded-full text-white bg-white/5 border border-white/10
              hover:bg-white/10 hover:border-white/20 hover:rotate-90
              backdrop-blur-md transition-all duration-500"
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

                if (item.id === 'home') {
                  onSectionChange('welcome', null);
                } else {
                  sendToTele(item.teleQuery);
                }
                setIsMenuOpen(false);
              }}
              variant="ghost"
              size="lg"
              className={`relative w-full justify-start px-6 py-5 text-xl font-bold
                backdrop-blur-md
                border rounded-2xl
                transition-all duration-500
                hover:-translate-x-2 hover:shadow-[var(--shadow-float-near)]
                active:translate-x-0 active:scale-95
                animate-stagger-enter opacity-0
                ${buttonBaseStyles}`}
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
            >
              <span className="relative z-10">{item.label}</span>
              <div className={`absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${glowColor} to-transparent blur-xl`} />
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;