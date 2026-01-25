import React, { lazy } from "react";

/**
 * TEMPLATE REGISTRY - MOBEUS UNIVERSITY
 * 
 * 28 Templates organized by category:
 * - Journey (7): One for each journey node (no step counts shown)
 * - Concept (4): Deep dives on core concepts
 * - System (3): Wire command, file viewer, use cases
 * - Utility (14): Reusable components
 * 
 * DESIGN PRINCIPLES:
 * - 3-Level Hierarchy: Glance → Look → Read
 * - Volumetric Navigation: All clicks call notifyTele(actionPhrase)
 * - No journey step counts visible to user
 */
export const TEMPLATE_REGISTRY: Record<string, React.FC<any>> = {

    // ==========================================
    // JOURNEY TEMPLATES (7) - One per journey node
    // User does NOT see step numbers
    // ==========================================

    JourneyPromise: lazy(() => import("@/components/templates/JourneyPromise").then(m => ({ default: m.JourneyPromise }))),
    JourneyBuildModes: lazy(() => import("@/components/templates/JourneyBuildModes").then(m => ({ default: m.JourneyBuildModes }))),
    JourneyConcepts: lazy(() => import("@/components/templates/JourneyConcepts").then(m => ({ default: m.JourneyConcepts }))),
    JourneyWireCommands: lazy(() => import("@/components/templates/JourneyWireCommands").then(m => ({ default: m.JourneyWireCommands }))),
    JourneyAnatomy: lazy(() => import("@/components/templates/JourneyAnatomy").then(m => ({ default: m.JourneyAnatomy }))),
    JourneyUseCases: lazy(() => import("@/components/templates/JourneyUseCases").then(m => ({ default: m.JourneyUseCases }))),
    JourneyGetStarted: lazy(() => import("@/components/templates/JourneyGetStarted").then(m => ({ default: m.JourneyGetStarted }))),

    // ==========================================
    // CONCEPT TEMPLATES (4) - Core concept deep dives
    // ==========================================

    ConceptDualAgent: lazy(() => import("@/components/templates/ConceptDualAgent").then(m => ({ default: m.ConceptDualAgent }))),
    ConceptDOMBridge: lazy(() => import("@/components/templates/ConceptDOMBridge").then(m => ({ default: m.ConceptDOMBridge }))),
    ConceptTemplates: lazy(() => import("@/components/templates/ConceptTemplates").then(m => ({ default: m.ConceptTemplates }))),
    ConceptVolumetric: lazy(() => import("@/components/templates/ConceptVolumetric").then(m => ({ default: m.ConceptVolumetric }))),

    // ==========================================
    // SYSTEM TEMPLATES (3) - Wire commands, files, use cases
    // ==========================================

    /**
     * WireCommandDetail - Shows ANY wire command
     * PROPS: { command: '/add-glass'|'/add-knowledge'|..., headline?, tagline?, whatItCreates?[], exampleCommand?, exampleResult? }
     */
    WireCommandDetail: lazy(() => import("@/components/templates/WireCommandDetail").then(m => ({ default: m.WireCommandDetail }))),

    /**
     * SystemFileViewer - Shows knowledge or prompt file
     * PROPS: { fileType: 'knowledge'|'prompt' }
     */
    SystemFileViewer: lazy(() => import("@/components/templates/SystemFileViewer").then(m => ({ default: m.SystemFileViewer }))),

    /**
     * UseCaseDetail - Shows detailed use case
     * PROPS: { icon, title, tagline, description, benefits?[], exampleScenarios?[], metrics?[] }
     */
    UseCaseDetail: lazy(() => import("@/components/templates/UseCaseDetail").then(m => ({ default: m.UseCaseDetail }))),

    // ==========================================
    // UTILITY TEMPLATES (14) - Reusable components
    // ==========================================

    WelcomeCarousel: lazy(() => import("@/components/templates/WelcomeCarousel").then(m => ({ default: m.WelcomeCarousel }))),
    FeatureGrid: lazy(() => import("@/components/templates/FeatureGrid").then(m => ({ default: m.FeatureGrid }))),
    HeroSection: lazy(() => import("@/components/templates/HeroSection").then(m => ({ default: m.HeroSection }))),
    StepByStep: lazy(() => import("@/components/templates/StepByStep").then(m => ({ default: m.StepByStep }))),
    ComparisonTable: lazy(() => import("@/components/templates/ComparisonTable").then(m => ({ default: m.ComparisonTable }))),
    StatGrid: lazy(() => import("@/components/templates/StatGrid").then(m => ({ default: m.StatGrid }))),
    AccordionSection: lazy(() => import("@/components/templates/AccordionSection").then(m => ({ default: m.AccordionSection }))),
    MediaShowcase: lazy(() => import("@/components/templates/MediaShowcase").then(m => ({ default: m.MediaShowcase }))),
    ActionBanner: lazy(() => import("@/components/templates/ActionBanner").then(m => ({ default: m.ActionBanner }))),
    IconList: lazy(() => import("@/components/templates/IconList").then(m => ({ default: m.IconList }))),
    CodeExample: lazy(() => import("@/components/templates/CodeExample").then(m => ({ default: m.CodeExample }))),
    LiveFileViewer: lazy(() => import("@/components/templates/LiveFileViewer").then(m => ({ default: m.LiveFileViewer }))),
    NavigationCards: lazy(() => import("@/components/templates/NavigationCards").then(m => ({ default: m.NavigationCards }))),
    QuoteBlock: lazy(() => import("@/components/templates/QuoteBlock").then(m => ({ default: m.QuoteBlock }))),
    AboutCompany: lazy(() => import("@/components/templates/AboutCompany").then(m => ({ default: m.AboutCompany }))),

};
