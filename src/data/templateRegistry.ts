import React, { lazy } from "react";

/**
 * TEMPLATE REGISTRY - MOBEUS UNIVERSITY v82.0
 * 
 * 30 Templates organized by journey step:
 * - 1 Welcome (entry point)
 * - 7 Purpose-Specific (one per step)  
 * - 7 Reusable (one per step)
 * - 14 Thing Templates (2 per step × 7 steps)
 * - 1 Use Case (imagined stories)
 * 
 * CONSTRAINT: Max 30 templates
 */
export const TEMPLATE_REGISTRY: Record<string, React.FC<any>> = {

    // ==========================================
    // WELCOME (1)
    // ==========================================
    WelcomeCarousel: lazy(() => import("@/components/templates/WelcomeCarousel").then(m => ({ default: m.WelcomeCarousel }))),

    // ==========================================
    // STEP 1: THE PROBLEM (3)
    // ==========================================
    ProblemStatement: lazy(() => import("@/components/templates/ProblemStatement").then(m => ({ default: m.ProblemStatement }))),
    StatHighlight: lazy(() => import("@/components/templates/StatHighlight").then(m => ({ default: m.StatHighlight }))),
    AdoptionIsProblem: lazy(() => import("@/components/templates/AdoptionIsProblem").then(m => ({ default: m.AdoptionIsProblem }))),

    // ==========================================
    // STEP 2: THE SOLUTION (4)
    // ==========================================
    SolutionHero: lazy(() => import("@/components/templates/SolutionHero").then(m => ({ default: m.SolutionHero }))),
    MeetsGlobally: lazy(() => import("@/components/templates/MeetsGlobally").then(m => ({ default: m.MeetsGlobally }))),
    AnyDevice: lazy(() => import("@/components/templates/AnyDevice").then(m => ({ default: m.AnyDevice }))),
    AnyChannel: lazy(() => import("@/components/templates/AnyChannel").then(m => ({ default: m.AnyChannel }))),

    // ==========================================
    // STEP 3: PLATFORM (3)
    // ==========================================
    PlatformOverview: lazy(() => import("@/components/templates/PlatformOverview").then(m => ({ default: m.PlatformOverview }))),
    ThreeThings: lazy(() => import("@/components/templates/ThreeThings").then(m => ({ default: m.ThreeThings }))),
    UtilizationPricing: lazy(() => import("@/components/templates/UtilizationPricing").then(m => ({ default: m.UtilizationPricing }))),

    // ==========================================
    // STEP 4: INNOVATIONS (4)
    // ==========================================
    InnovationStack: lazy(() => import("@/components/templates/InnovationStack").then(m => ({ default: m.InnovationStack }))),
    DualAgentDetail: lazy(() => import("@/components/templates/DualAgentDetail").then(m => ({ default: m.DualAgentDetail }))),
    DOMBridgeDetail: lazy(() => import("@/components/templates/DOMBridgeDetail").then(m => ({ default: m.DOMBridgeDetail }))),
    GenerativeWebDetail: lazy(() => import("@/components/templates/GenerativeWebDetail").then(m => ({ default: m.GenerativeWebDetail }))),

    // ==========================================
    // STEP 5: WIRING (4)
    // ==========================================
    WiringGuide: lazy(() => import("@/components/templates/WiringGuide").then(m => ({ default: m.WiringGuide }))),
    CommandList: lazy(() => import("@/components/templates/CommandList").then(m => ({ default: m.CommandList }))),
    VoiceWiringDetail: lazy(() => import("@/components/templates/VoiceWiringDetail").then(m => ({ default: m.VoiceWiringDetail }))),
    VibeWiringDetail: lazy(() => import("@/components/templates/VibeWiringDetail").then(m => ({ default: m.VibeWiringDetail }))),
    WireCommandsDetail: lazy(() => import("@/components/templates/WireCommandsDetail").then(m => ({ default: m.WireCommandsDetail }))),

    // ==========================================
    // STEP 6: ANALYTICS (4)
    // ==========================================
    AnalyticsView: lazy(() => import("@/components/templates/AnalyticsView").then(m => ({ default: m.AnalyticsView }))),
    AgentObservability: lazy(() => import("@/components/templates/AgentObservability").then(m => ({ default: m.AgentObservability }))),
    ProbabilisticCRM: lazy(() => import("@/components/templates/ProbabilisticCRM").then(m => ({ default: m.ProbabilisticCRM }))),
    ConversationalTelemetry: lazy(() => import("@/components/templates/ConversationalTelemetry").then(m => ({ default: m.ConversationalTelemetry }))),

    // ==========================================
    // STEP 7: HACKATHON (4)
    // ==========================================
    HackathonForm: lazy(() => import("@/components/templates/HackathonForm").then(m => ({ default: m.HackathonForm }))),
    ActionBanner: lazy(() => import("@/components/templates/ActionBanner").then(m => ({ default: m.ActionBanner }))),
    HandsOnWiring: lazy(() => import("@/components/templates/HandsOnWiring").then(m => ({ default: m.HandsOnWiring }))),
    FastTurnaround: lazy(() => import("@/components/templates/FastTurnaround").then(m => ({ default: m.FastTurnaround }))),
    FullSupport: lazy(() => import("@/components/templates/FullSupport").then(m => ({ default: m.FullSupport }))),

    // ==========================================
    // USE CASES (1)
    // ==========================================
    UseCaseStory: lazy(() => import("@/components/templates/UseCaseStory").then(m => ({ default: m.UseCaseStory }))),

};
