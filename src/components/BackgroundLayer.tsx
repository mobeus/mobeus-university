import { useEffect, useState } from "react";

interface BackgroundLayerProps {
  image: string;
  heroImage?: string;
  isConnecting?: boolean;
  isThinking?: boolean;
}

/**
 * BackgroundLayer: Portal-based fixed background that stays completely static
 * Renders directly to document.body to avoid transform-related movement issues
 * 
 * During connecting OR thinking state: shows backgroundEmpty as base with backgroundHero
 * pulsing at 50% opacity on top — creating a visible avatar pulse effect.
 */
export const BackgroundLayer = ({ image, heroImage, isConnecting, isThinking }: BackgroundLayerProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const showPulse = (isConnecting || isThinking) && heroImage;

  return (
    <>
      {/* Base background layer */}
      <div
        className="hero-background"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          backgroundImage: `url(${image})`,
          backgroundPosition: "right top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minWidth: "100vw",
          minHeight: "100vh",
        }}
      />

      {/* Pulsing hero overlay — visible while connecting OR thinking */}
      {showPulse && (
        <div
          className="hero-background hero-pulse-overlay"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            pointerEvents: "none",
            backgroundImage: `url(${heroImage})`,
            backgroundPosition: "right top",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            minWidth: "100vw",
            minHeight: "100vh",
          }}
        />
      )}
    </>
  );
};

