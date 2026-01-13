import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ShadowEffectsState {
  scrollY: number;
  scrollPercentage: number;
  shadowIntensity: number;
  isScrolled: boolean;
  mouseX: number;
  mouseY: number;
  normalizedMouseX: number;
  normalizedMouseY: number;
}

const ShadowEffectsContext = createContext<ShadowEffectsState>({
  scrollY: 0,
  scrollPercentage: 0,
  shadowIntensity: 0,
  isScrolled: false,
  mouseX: 0,
  mouseY: 0,
  normalizedMouseX: 0,
  normalizedMouseY: 0,
});

export const useShadowEffects = () => useContext(ShadowEffectsContext);

interface ShadowEffectsProviderProps {
  children: ReactNode;
}

/**
 * ShadowEffectsProvider: Single centralized provider for all shadow effects
 * Optimizes performance by using one scroll and one mouse listener for entire app
 */
export const ShadowEffectsProvider = ({ children }: ShadowEffectsProviderProps) => {
  const [state, setState] = useState<ShadowEffectsState>({
    scrollY: 0,
    scrollPercentage: 0,
    shadowIntensity: 0,
    isScrolled: false,
    mouseX: 0,
    mouseY: 0,
    normalizedMouseX: 0,
    normalizedMouseY: 0,
  });

  // Listeners disabled for performance optimization.
  // The global context listeners were causing extensive re-renders on scroll/mousemove.
  useEffect(() => {
    // No-op
  }, []);

  return (
    <ShadowEffectsContext.Provider value={state}>
      {children}
    </ShadowEffectsContext.Provider>
  );
};
