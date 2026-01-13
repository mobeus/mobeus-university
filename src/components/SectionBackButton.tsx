import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SectionBackButton = () => {
  const handleBack = () => {
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

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className="text-white/70 hover:text-white glass-subtle-hover z-10 inline-flex [text-shadow:0_2px_4px_rgba(0,0,0,0.6)] hover:[text-shadow:0_2px_8px_rgba(0,0,0,0.8)]"
    >
      <ArrowLeft className="h-4 w-4 mr-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
      Back
    </Button>
  );
};

export default SectionBackButton;
