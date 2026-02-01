import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const SectionBackButton = () => {
  const [canGoForward, setCanGoForward] = useState(false);
  const [historyCount, setHistoryCount] = useState(0);

  // Check if forward navigation is available and update history count
  useEffect(() => {
    const checkForwardAvailability = () => {
      const historyNav = (window as any).navigationHistory;
      if (historyNav?.canGoForward) {
        setCanGoForward(historyNav.canGoForward());
      }
      // Get current history count
      if (historyNav?.getCurrentIndex) {
        const currentIndex = historyNav.getCurrentIndex();
        setHistoryCount(currentIndex);
      }
    };

    // Check initially
    checkForwardAvailability();

    // Listen for history changes
    const handleHistoryChange = () => {
      checkForwardAvailability();
    };

    window.addEventListener('historychange', handleHistoryChange);

    // Also check periodically as a fallback
    const interval = setInterval(checkForwardAvailability, 500);

    return () => {
      window.removeEventListener('historychange', handleHistoryChange);
      clearInterval(interval);
    };
  }, []);

  const handleBack = () => {
    // Use history-based navigation for instant restoration
    const historyNav = (window as any).navigationHistory;
    if (historyNav?.back) {
      const navigated = historyNav.back();
      if (navigated) {
        // Successfully navigated back through history
        return;
      }
    }

    // Fallback: If no history available, navigate to welcome
    const nav = (window as any).teleNavigation;
    if (nav?.navigateToSection) {
      nav.navigateToSection('welcome');
    } else {
      // Enhanced smooth scroll to top with animation
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
    }
  };

  const handleForward = () => {
    const historyNav = (window as any).navigationHistory;
    if (historyNav?.forward) {
      historyNav.forward();
    }
  };

  return (
    <div className="inline-flex items-center gap-1 z-10">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleBack}
        className="text-white/70 hover:text-white glass-light-hover"
      >
        <ArrowLeft className="h-4 w-4 mr-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
        Back
        {historyCount > 0 && (
          <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90">
            {historyCount}
          </span>
        )}
      </Button>

      {canGoForward && (
        <button
          onClick={handleForward}
          className="text-white/70 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
          aria-label="Go forward"
        >
          <ArrowRight className="h-4 w-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
        </button>
      )}
    </div>
  );
};

export default SectionBackButton;
