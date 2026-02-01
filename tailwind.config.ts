import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  // Safelist brand colors for dynamic usage
  safelist: [
    // Text colors
    'text-flamingo', 'text-turmeric', 'text-jade', 'text-sapphire', 'text-amethyst', 'text-mist', 'text-wave',
    // Background colors
    'bg-flamingo', 'bg-turmeric', 'bg-jade', 'bg-sapphire', 'bg-amethyst', 'bg-mist', 'bg-wave',
    // Background with opacity
    'bg-flamingo/10', 'bg-flamingo/20', 'bg-turmeric/10', 'bg-turmeric/20', 'bg-jade/10', 'bg-jade/20',
    'bg-sapphire/10', 'bg-sapphire/20', 'bg-amethyst/10', 'bg-amethyst/20',
    // Border colors
    'border-flamingo', 'border-turmeric', 'border-jade', 'border-sapphire', 'border-amethyst',
    'border-flamingo/30', 'border-turmeric/30', 'border-jade/30', 'border-sapphire/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "10%",
        sm: "10%",
        md: "10%",
        lg: "10%",
        xl: "10%",
        "2xl": "10%",
      },
    },
    extend: {
      colors: {
        /* ============================================
         * 8-COLOR BRAND PALETTE - MOBEUS.COM STYLE
         * ============================================
         * Mist Gray:      #F5F5F5 - Light backgrounds, text, icons
         * Onyx Black:     #0D0D0D - Dark backgrounds (deeper black)
         * Violet Purple:  #9B5DE5 - Primary accent, CTAs, headlines
         * Wave Blue:      #003D4F - Secondary accent, headers
         * Turmeric Yellow:#CC850A - Buttons, warnings
         * Jade Green:     #5EEAD4 - Success states, teal accents
         * Sapphire Blue:  #47A1AD - Buttons, links
         * Amethyst Purple:#7C3AED - Deep purple accents
         * ============================================ */

        // The 8 Brand Colors - MOBEUS STYLE
        mist: '#F5F5F5',
        onyx: '#0D0D0D',
        flamingo: '#9B5DE5',  // NOW PURPLE - Primary accent
        wave: '#003D4F',
        turmeric: '#CC850A',
        jade: '#5EEAD4',      // Teal accent like mobeus.com
        sapphire: '#47A1AD',
        amethyst: '#7C3AED',  // Deeper purple

        // Semantic mappings
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
        elegant: "var(--shadow-elegant)",
        glow: "var(--shadow-glow)",
      },
      transitionTimingFunction: {
        smooth: "var(--transition-smooth)",
        bounce: "var(--transition-bounce)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        // CHROME-SAFE: All parent-level animations use opacity only (no transforms)
        // Transforms break backdrop-filter for ALL descendants in Chromium
        "section-enter": {
          "0%": {
            opacity: "0"
            // REMOVED: transform - breaks backdrop-filter in Chrome
          },
          "100%": {
            opacity: "1"
          }
        },
        "section-exit": {
          "0%": {
            opacity: "1"
          },
          "100%": {
            opacity: "0"
          }
        },
        "fade-in": {
          "0%": {
            opacity: "0"
            // REMOVED: transform - breaks backdrop-filter in Chrome
          },
          "100%": {
            opacity: "1"
          }
        },
        "stagger-enter": {
          "0%": {
            opacity: "0"
            // REMOVED: transform - breaks backdrop-filter in Chrome
          },
          "100%": {
            opacity: "1"
          }
        },
        "chat-bubble-enter": {
          "0%": {
            opacity: "0",
            transform: "translateY(40px) scale(0.8)"
          },
          "60%": {
            opacity: "0.8",
            transform: "translateY(-8px) scale(1.05)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)"
          }
        },
        "chat-bubble-slide-up": {
          "0%": {
            transform: "translateY(0)"
          },
          "100%": {
            transform: "translateY(-10px)"
          }
        },
        "typing-indicator-pulse": {
          "0%, 100%": {
            opacity: "0.3",
            transform: "scale(0.8)"
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.2)"
          }
        },
        "slide-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-100px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)"
          }
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "scroll-hint": {
          "0%, 100%": {
            transform: "translateY(0)",
            opacity: "1"
          },
          "25%": {
            transform: "translateY(12px)",
            opacity: "0.9"
          },
          "50%": {
            transform: "translateY(0)",
            opacity: "1"
          },
          "75%": {
            transform: "translateY(8px)",
            opacity: "0.95"
          }
        },
        // CHROME-SAFE: Page animations use opacity only
        "page-fade-in": {
          "0%": {
            opacity: "0"
            // REMOVED: transform - breaks backdrop-filter in Chrome
          },
          "100%": {
            opacity: "1"
          }
        },
        "page-fade-out": {
          "0%": {
            opacity: "1"
          },
          "100%": {
            opacity: "0"
            // REMOVED: transform - breaks backdrop-filter in Chrome
          }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "ripple": {
          "0%": {
            width: "0",
            height: "0",
            opacity: "0.6",
            transform: "translate(-50%, -50%)"
          },
          "100%": {
            width: "300px",
            height: "300px",
            opacity: "0",
            transform: "translate(-50%, -50%)"
          },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "press-bounce": {
          "0%": { transform: "scale(1)" },
          "30%": { transform: "scale(0.92)" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.98)" },
          "100%": { transform: "scale(1)" }
        },
        "loading-wave": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" }
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(65, 150, 217, 0.5), 0 0 40px rgba(65, 150, 217, 0.3)",
            filter: "brightness(1)"
          },
          "50%": {
            boxShadow: "0 0 30px rgba(65, 150, 217, 0.8), 0 0 60px rgba(65, 150, 217, 0.5)",
            filter: "brightness(1.2)"
          }
        },
        "button-click": {
          "0%": {
            transform: "scale(1) rotate(0deg)",
            filter: "brightness(1)"
          },
          "20%": {
            transform: "scale(0.95) rotate(-1deg)",
            filter: "brightness(1.3)"
          },
          "40%": {
            transform: "scale(1.08) rotate(1deg)",
            filter: "brightness(1.5)"
          },
          "60%": {
            transform: "scale(0.98) rotate(-0.5deg)",
            filter: "brightness(1.2)"
          },
          "100%": {
            transform: "scale(1) rotate(0deg)",
            filter: "brightness(1)"
          }
        },
      },
      animation: {
        "section-enter": "section-enter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "section-exit": "section-exit 1s cubic-bezier(0.4, 0, 0.6, 1) forwards",
        "page-fade-in": "page-fade-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "page-fade-out": "page-fade-out 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "stagger-enter": "stagger-enter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "chat-bubble-enter": "chat-bubble-enter 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        "chat-slide-up": "chat-bubble-slide-up 0.3s ease-out forwards",
        "typing-pulse": "typing-indicator-pulse 1.4s ease-in-out infinite",
        "slide-in-left": "slide-in-left 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scroll-hint": "scroll-hint 2.5s ease-in-out 0.6s 1",
        "float": "float 3s ease-in-out infinite",
        "ripple": "ripple 0.8s cubic-bezier(0, 0, 0.2, 1)",
        "shimmer": "shimmer 2s linear infinite",
        "press-bounce": "press-bounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "loading-wave": "loading-wave 1.5s ease-in-out infinite",
        "glow-pulse": "glow-pulse 1.5s ease-in-out infinite",
        "button-click": "button-click 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
