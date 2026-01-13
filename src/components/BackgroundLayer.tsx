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
    <>
      {/* Tele Background Layer */}
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
          backgroundAttachment: "fixed",
          minWidth: "100vw",
          minHeight: "100vh",
          filter: "brightness(0.7) contrast(1.1)",
        }}
      >
        {/* Volumetric depth overlay - creates atmospheric space */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(65, 150, 217, 0.08) 0%, transparent 50%)',
        }} />
      </div>
    </>
  );
};
