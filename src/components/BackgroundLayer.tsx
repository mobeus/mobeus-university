import { useEffect, useState } from "react";

interface BackgroundLayerProps {
  image: string;
}

/**
 * BackgroundLayer: Portal-based fixed background that stays completely static
 * Renders directly to document.body to avoid transform-related movement issues
 */
export const BackgroundLayer = ({ image }: BackgroundLayerProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
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
  );
};
