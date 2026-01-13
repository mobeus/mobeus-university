import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
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
        "section-enter": {
          "0%": {
            opacity: "0",
            transform: "translateY(15px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "section-exit": {
          "0%": {
            opacity: "1",
            transform: "translateY(0)"
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-10px)"
          }
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(5px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "stagger-enter": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
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
        "page-fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "page-fade-out": {
          "0%": {
            opacity: "1",
            transform: "translateY(0)"
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-20px)"
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
