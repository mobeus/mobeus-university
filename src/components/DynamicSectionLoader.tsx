import React, { useEffect, useState, useRef, Suspense, memo } from "react";
import { UnifiedSectionHeader } from "@/components/layout/UnifiedSectionHeader";

import { TEMPLATE_REGISTRY } from "@/data/templateRegistry";

import SectionBackButton from "@/components/SectionBackButton";
import { SubsectionMetadata } from "@/types/subsection";
import { Lock } from "lucide-react";
import { buildAuthToken, getTodayToken, getCookieValue } from "@/utils/auth";
import { useScrollSpacing } from "@/hooks/useScrollSpacing";
import { useSound } from "@/hooks/useSound";
import { playUISound } from "@/utils/soundGenerator";
import { ErrorBoundary } from '@/components/ErrorBoundary';
// Helper to extract title for loading state
const getLoadingTitle = (id: string): string => {
  // Generative Era: We don't have static data to look up titles from anymore.
  // We return a generic loader or derive from ID if possible.
  return "Loading Content...";
};

const isUserAuthenticated = (): boolean => {
  const authCookie = getCookieValue("Authed");
  if (!authCookie) {
    return false;
  }
  const expectedValue = buildAuthToken(getTodayToken());
  return authCookie === expectedValue;
};

// New Interface for Generative Sections
// ONLY these keys are allowed at the subsection root: id, templateId, props
// ALL template-specific data MUST be nested inside props
export interface GenerativeSubsectionConfig {
  id: string; // Unique instance ID
  templateId: string; // Matches TEMPLATE_REGISTRY key
  props: any; // Raw props for the template - ALL template data goes here
}

interface DynamicSectionLoaderProps {
  isWelcome: boolean;
  badge: string;
  title: string;
  subtitle?: string;
  subsectionIds: string[]; // Legacy
  generativeSubsections?: GenerativeSubsectionConfig[]; // New Generative Payload
  forceShowHeader?: boolean;
  animationClass?: string;
  isExiting?: boolean;
  activeSubSection?: string[] | null;
  activeSubSectionMetadata?: SubsectionMetadata[] | null;
  onNavigateToNDAFirewall?: () => void;
}

export const DynamicSectionLoader: React.FC<DynamicSectionLoaderProps> = ({
  isWelcome,
  badge,
  title,
  subtitle,
  subsectionIds,
  generativeSubsections = [],
  forceShowHeader = false,
  animationClass = "",
  isExiting = false,
  activeSubSection = null,
  activeSubSectionMetadata = null,
  onNavigateToNDAFirewall,
}) => {

  // MODE DETECTION: Generative vs Legacy
  const isGenerativeMode = generativeSubsections && generativeSubsections.length > 0;

  // Debug logging
  console.log('[DynamicSectionLoader] Mode:', isGenerativeMode ? 'Generative' : 'Legacy', {
    badge,
    title,
    generativeCount: generativeSubsections.length,
  });

  // Consistent spacing for all subsections
  const spacing = 3; // 3rem = 48px

  // Sound hook
  const { playUniversalSound } = useSound();

  // Sound Trigger

  // Sound Trigger
  useEffect(() => {
    if (isWelcome || isExiting) return;
    if (isGenerativeMode) {
      const timer = setTimeout(() => {
        try {
          playUISound("on", "chat");
        } catch { }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isWelcome, isExiting, isGenerativeMode, title, badge]);

  return (
    <div className={`px-4 md:px-8 py-6 md:py-10 ${animationClass} ${!isExiting && !isWelcome ? "animate-page-fade-in" : ""}`}>
      <div className="max-w-6xl mx-auto space-y-4">

        {/* Back button */}
        {!isWelcome && (
          <div className="section-controls">
            <SectionBackButton />
          </div>
        )}

        {/* Header */}
        {badge && title && (forceShowHeader || !activeSubSection) && (
          <UnifiedSectionHeader badge={badge} title={title} subtitle={subtitle} animate={!isExiting} />
        )}



        {/* RENDER CONTENT LOOP */}
        {isGenerativeMode && (
          // GENERATIVE RENDERER
          generativeSubsections.map((section, index) => {
            const TemplateComponent = TEMPLATE_REGISTRY[section.templateId];

            if (!TemplateComponent) {
              console.warn(`[Generative] Template not found: ${section.templateId}`);
              return null;
            }

            const isLast = index === generativeSubsections.length - 1;

            return (
              <div
                key={section.id}
                className={`${!isExiting ? "animate-[subsection-appear_0.25s_ease-out_both]" : "animate-fade-out"}`}
                style={{
                  animationDelay: `${0.3 + index * 0.15}s`,
                  marginBottom: isLast ? '0' : `${spacing}rem`,
                }}
              >
                <Suspense fallback={
                  <div className="relative h-64 overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                    </div>
                  </div>
                }>
                  <ErrorBoundary
                    fallback={<div className="p-4 border border-red-500/50 bg-red-500/10 rounded text-red-400">Error loading template {section.templateId}</div>}
                    onError={(error, errorInfo) => {
                      console.error(`[Template Error] ${section.templateId}:`, error.message);
                      console.error('[Template Props]:', section.props);
                    }}
                  >
                    <TemplateComponent {...section.props} animationClass={animationClass} isExiting={isExiting} />
                  </ErrorBoundary>
                </Suspense>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
