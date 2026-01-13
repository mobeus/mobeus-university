import React from "react";
import { Badge } from "@/components/ui/badge";

interface UnifiedSectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
  animate?: boolean;
  variant?: "primary" | "secondary";
}

/**
 * UnifiedSectionHeader: Single source of truth for badge, title, subtitle rendering
 * Ensures consistent typography, spacing, and positioning across all sections/subsections
 */
export const UnifiedSectionHeader = ({
  badge,
  title,
  subtitle,
  animate = true,
  variant = "primary"
}: UnifiedSectionHeaderProps) => {
  const isPrimary = variant === "primary";

  return (
    <div className={`section-header ${isPrimary ? 'mb-8' : 'mb-6'} text-left`}>
      {isPrimary && (
        <Badge
          variant="vision"
          className={`text-xs font-bold tracking-wider
            ${animate ? 'animate-regenerate' : ''}`}
        >
          {badge}
        </Badge>
      )}
      <h2 className={`font-bold text-white tracking-tight drop-shadow-lg
        ${isPrimary ? 'text-5xl md:text-6xl' : 'text-3xl md:text-4xl'}
        text-left ${animate ? 'animate-regenerate' : ''}
        ${animate ? 'animation-delay-100' : ''}`}
        style={{ animationDelay: animate ? '0.1s' : undefined }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-white/90 leading-relaxed font-light drop-shadow-md
          ${isPrimary ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}
          text-left ${animate ? 'animate-regenerate' : ''}
          ${animate ? 'animation-delay-200' : ''}`}
          style={{ animationDelay: animate ? '0.2s' : undefined }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
