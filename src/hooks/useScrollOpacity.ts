import { useState, useEffect } from 'react';

interface UseScrollOpacityOptions {
  fadeDistance?: number;
  passive?: boolean;
}

export const useScrollOpacity = ({ 
  fadeDistance = 500, 
  passive = true 
}: UseScrollOpacityOptions = {}) => {
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const newOpacity = Math.max(0, 1 - scrolled / fadeDistance);
        setScrollOpacity(newOpacity);
        rafId = null;
      });
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive });
    
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fadeDistance, passive]);

  return scrollOpacity;
};
