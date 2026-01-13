import { ReactNode, CSSProperties, useState, useRef, useEffect, useMemo } from "react";
import { useShadowEffects } from "@/contexts/ShadowEffectsContext";

interface OptimizedShadowCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  minShadowDepth?: number;
  maxShadowDepth?: number;
  enableDirectional?: boolean;
  directionalIntensity?: number;
}

/**
 * OptimizedShadowCard: Combined scroll depth + directional shadows in one component
 * Uses Intersection Observer to only calculate effects for visible cards
 * Memoizes expensive calculations for better performance
 */
export const OptimizedShadowCard = ({
  children,
  className = "",
  style = {},
  minShadowDepth = 1,
  maxShadowDepth = 4,
  enableDirectional = true,
  directionalIntensity = 0.35,
}: OptimizedShadowCardProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const { 
    shadowIntensity: scrollDepth, 
    mouseX, 
    mouseY,
  } = useShadowEffects();

  // Intersection Observer to track visibility
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Memoized shadow calculations - only recalculate when needed
  const shadowStyle = useMemo(() => {
    if (!isVisible) return {};

    // Calculate scroll-based shadow depth
    const shadowLevel = Math.floor(minShadowDepth + (scrollDepth * (maxShadowDepth - minShadowDepth)));
    const clampedLevel = Math.min(shadowLevel, 5);
    
    // Only calculate directional shadows on hover
    if (!enableDirectional || !isHovered || !elementRef.current) {
      return {
        className: `shadow-depth-${clampedLevel}`,
        style: {},
      };
    }

    // Directional shadow calculation
    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    
    const shadowX = -Math.sign(deltaX) * Math.min(Math.abs(deltaX) / 10, 20);
    const shadowY = -Math.sign(deltaY) * Math.min(Math.abs(deltaY) / 10, 20);
    
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const maxDistance = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
    const proximityFactor = 1 - Math.min(distance / maxDistance, 1);
    
    const adjustedIntensity = directionalIntensity * (0.7 + scrollDepth * 0.6);
    const shadowIntensity = adjustedIntensity * (0.5 + proximityFactor * 0.5);
    
    const tiltX = (deltaY / window.innerHeight) * 2;
    const tiltY = -(deltaX / window.innerWidth) * 2;
    
    return {
      className: `shadow-depth-${clampedLevel}`,
      style: {
        boxShadow: [
          `${shadowX}px ${shadowY}px 40px rgba(0, 0, 0, ${shadowIntensity * 0.4})`,
          `${shadowX * 0.5}px ${shadowY * 0.5}px 24px rgba(0, 0, 0, ${shadowIntensity * 0.3})`,
          `${shadowX * 0.2}px ${shadowY * 0.2}px 12px rgba(0, 0, 0, ${shadowIntensity * 0.2})`,
        ].join(', '),
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`,
      },
    };
  }, [isVisible, isHovered, scrollDepth, mouseX, mouseY, minShadowDepth, maxShadowDepth, enableDirectional, directionalIntensity]);

  return (
    <div
      ref={elementRef}
      className={`shadow-scroll-depth ${shadowStyle.className} transition-all duration-300 ${className}`}
      style={{
        ...style,
        ...shadowStyle.style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};
