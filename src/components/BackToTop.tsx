import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Listen for chat glass open/close via the body class toggle
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsChatOpen(document.body.classList.contains("chat-squeezed"));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 z-50
        bg-mist/5 backdrop-blur-sm border border-mist/20
        rounded-2xl p-3.5
        shadow-[var(--shadow-float-mid)]
        transition-all duration-500
        hover:bg-mist/10 hover:border-mist/30
        hover:-translate-y-1 hover:shadow-[var(--shadow-glow-cyan)]
        active:translate-y-0 active:scale-95
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}
      `}
      style={{
        right: isChatOpen ? "calc(var(--chat-glass-width) + 2rem)" : "2rem",
      }}
      aria-label="Back to top"
    >
      <ChevronUp className="w-6 h-6 text-white" />
    </button>
  );
};
