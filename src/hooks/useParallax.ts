import { useEffect, useRef, useState } from 'react';

interface ParallaxOptions {
  speed?: number; // Parallax speed multiplier (0.1 - 1.0)
  disabled?: boolean;
}

export const useParallax = ({ speed = 0.3, disabled = false }: ParallaxOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  // Disabled for performance optimization on mobile
  // Previously caused jank by updating transform on 60fps scroll loop
  return { ref: elementRef, style: {} };
};
