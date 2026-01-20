import React, { lazy } from "react";

/**
 * TEMPLATE REGISTRY - MOBEUS UNIVERSITY (HACKATHON PREP)
 * 
 * Templates specifically designed for preparing developers for the hackathon.
 * All templates are lazy-loaded for performance.
 * 
 * VOLUMETRIC NAVIGATION: Every clickable element calls notifyTele(actionPhrase)
 */
export const TEMPLATE_REGISTRY: Record<string, React.FC<any>> = {

    // ==========================================
    // CORE NAVIGATION
    // ==========================================

    /**
     * CardGrid
     * USE WHEN: Topic selection, navigation menus, option cards
     * PROPS: { cards[{ title, description?, badge?, actionPhrase }], columns?: 2|3|4 }
     */
    CardGrid: lazy(() => import("@/components/templates/CardGrid").then(m => ({ default: m.CardGrid }))),

    /**
     * WelcomeCarousel
     * USE WHEN: Main welcome screen, rotating questions/topics
     * PROPS: { cards[{ question, subtext?, imageUrl?, actionPhrase }], autoPlayInterval? }
     */
    WelcomeCarousel: lazy(() => import("@/components/templates/WelcomeCarousel").then(m => ({ default: m.WelcomeCarousel }))),

    // ==========================================
    // HACKATHON SPECIFIC
    // ==========================================

    /**
     * HackathonTimeline
     * USE WHEN: Showing all 6 hackathon phases overview
     * PROPS: { title?, subtitle?, totalDuration?, phases?[], currentPhase?, ctaLabel?, ctaActionPhrase? }
     */
    HackathonTimeline: lazy(() => import("@/components/templates/HackathonTimeline").then(m => ({ default: m.HackathonTimeline }))),

    /**
     * PhaseOverview
     * USE WHEN: Explaining a single hackathon phase in detail
     * PROPS: { phaseNumber?, title?, timing?, duration?, goal?, description?, activities?[], nextPhaseLabel?, nextPhaseActionPhrase? }
     */
    PhaseOverview: lazy(() => import("@/components/templates/PhaseOverview").then(m => ({ default: m.PhaseOverview }))),

    /**
     * ReadinessCheck
     * USE WHEN: "Are you ready?" checklist before hackathon
     * PROPS: { title?, subtitle?, items?[{ text, learnMorePhrase? }], allReadyLabel?, allReadyActionPhrase? }
     */
    ReadinessCheck: lazy(() => import("@/components/templates/ReadinessCheck").then(m => ({ default: m.ReadinessCheck }))),

    /**
     * ReadinessAssessment
     * USE WHEN: Interactive assessment with progress bars, user speaks about topics
     * PROPS: { title?, subtitle?, topics?[{ topic, description, progress?, actionPhrase? }], threshold?, celebrationActionPhrase? }
     */
    ReadinessAssessment: lazy(() => import("@/components/templates/ReadinessAssessment").then(m => ({ default: m.ReadinessAssessment }))),

    /**
     * ReadinessExperience
     * USE WHEN: Voice-based assessment with real-time progress bars and full-screen celebration
     * PROPS: { title?, subtitle?, concepts?[{ concept, description, progress?, actionPhrase? }], threshold?, celebrationActionPhrase? }
     */
    ReadinessExperience: lazy(() => import("@/components/templates/ReadinessExperience").then(m => ({ default: m.ReadinessExperience }))),

    // ==========================================
    // CONCEPT TEACHING
    // ==========================================

    /**
     * ConceptCard
     * USE WHEN: Defining a single concept/term
     * PROPS: { title, definition, details?, imageUrl?, ctaLabel?, ctaActionPhrase? }
     */
    ConceptCard: lazy(() => import("@/components/templates/ConceptCard").then(m => ({ default: m.ConceptCard }))),

    /**
     * ConceptExplainer
     * USE WHEN: Explaining a concept with What/Why/How structure
     * PROPS: { title?, badge?, what?, why?, how?, example?, imageUrl?, ctaLabel?, ctaActionPhrase? }
     */
    ConceptExplainer: lazy(() => import("@/components/templates/ConceptExplainer").then(m => ({ default: m.ConceptExplainer }))),

    /**
     * TalkingPoints
     * USE WHEN: Key points, bullet list with details
     * PROPS: { title?, points[{ point, detail?, actionPhrase }], ctaLabel?, ctaActionPhrase? }
     */
    TalkingPoints: lazy(() => import("@/components/templates/TalkingPoints").then(m => ({ default: m.TalkingPoints }))),

    // ==========================================
    // PROCESS & STEPS
    // ==========================================

    /**
     * ProcessSteps
     * USE WHEN: Numbered steps, workflows, how-to guides
     * PROPS: { title?, steps[{ title, description, actionPhrase }] }
     */
    ProcessSteps: lazy(() => import("@/components/templates/ProcessSteps").then(m => ({ default: m.ProcessSteps }))),

    // ==========================================
    // TOOLS & CODE
    // ==========================================

    /**
     * ToolCard
     * USE WHEN: Showing a tool, file, or command with examples
     * PROPS: { name?, type?: file|command|workflow, location?, description?, purpose?, codeExample?, ctaLabel?, ctaActionPhrase? }
     */
    ToolCard: lazy(() => import("@/components/templates/ToolCard").then(m => ({ default: m.ToolCard }))),

    /**
     * CodeBlock
     * USE WHEN: Showing code snippets, examples
     * PROPS: { code, language?, title?, showLineNumbers?, actionPhrase? }
     */
    CodeBlock: lazy(() => import("@/components/templates/CodeBlock").then(m => ({ default: m.CodeBlock }))),

    // ==========================================
    // LAYOUT & CONTENT
    // ==========================================

    /**
     * SplitContent
     * USE WHEN: Hero content with image, side-by-side layout
     * PROPS: { title, content, bulletPoints?[], imageUrl?, imagePosition?: left|right }
     */
    SplitContent: lazy(() => import("@/components/templates/SplitContent").then(m => ({ default: m.SplitContent }))),

    /**
     * CTABanner
     * USE WHEN: Call to action, "next phase", "I'm ready!"
     * PROPS: { headline, subheadline?, ctaLabel, ctaActionPhrase }
     */
    CTABanner: lazy(() => import("@/components/templates/CTABanner").then(m => ({ default: m.CTABanner }))),

    /**
     * AccordionList
     * USE WHEN: FAQs, expandable Q&A
     * PROPS: { title?, items[{ title, content, actionPhrase }] }
     */
    AccordionList: lazy(() => import("@/components/templates/AccordionList").then(m => ({ default: m.AccordionList }))),

    // ==========================================
    // LIVE FILE VIEWERS (System Transparency)
    // ==========================================

    /**
     * KnowledgeFileViewer
     * USE WHEN: User asks to see the knowledge file, what Catherine knows, domain knowledge
     * PROPS: {} (no props - fetches /tele-knowledge.md at runtime)
     */
    KnowledgeFileViewer: lazy(() => import("@/components/templates/KnowledgeFileViewer").then(m => ({ default: m.KnowledgeFileViewer }))),

    /**
     * PromptFileViewer
     * USE WHEN: User asks to see the prompt file, shot prompts, tool definitions, how Catherine responds
     * PROPS: {} (no props - fetches /glass-prompt.md at runtime)
     */
    PromptFileViewer: lazy(() => import("@/components/templates/PromptFileViewer").then(m => ({ default: m.PromptFileViewer }))),

    /**
     * FolderStructure
     * USE WHEN: User asks about project structure, file organization, what files exist
     * PROPS: { title?, subtitle?, structure?[{ name, type, description, children? }] }
     */
    FolderStructure: lazy(() => import("@/components/templates/FolderStructure").then(m => ({ default: m.FolderStructure }))),
};
