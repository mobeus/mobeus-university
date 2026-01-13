import { useEffect, useState } from 'react';

export const useSectionTransition = (activeSection: string) => {
  const [isEntering, setIsEntering] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [previousSection, setPreviousSection] = useState<string | null>(null);

  useEffect(() => {
    if (previousSection && previousSection !== activeSection) {
      // Trigger entrance animation with depth effects
      setIsEntering(true);
      setShowScrollHint(false);
      
      // Show scroll hint after entrance animation completes
      const scrollHintTimer = setTimeout(() => {
        setShowScrollHint(true);
      }, 600);
      
      // Reset animation state after animation completes
      const timer = setTimeout(() => {
        setIsEntering(false);
      }, 600);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(scrollHintTimer);
      };
    }
    
    setPreviousSection(activeSection);
  }, [activeSection, previousSection]);

  return {
    isEntering,
    shouldAnimate: isEntering,
    showScrollHint,
    scrollHintClass: showScrollHint ? 'animate-scroll-hint' : ''
  };
};