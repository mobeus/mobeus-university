import React, { lazy } from "react";

/**
 * TEMPLATE REGISTRY - MOBEUS UNIVERSITY
 * 
 * Templates for teaching developers how to build teles.
 * All templates are lazy-loaded for performance.
 * 
 * VOLUMETRIC NAVIGATION: Every clickable element calls notifyTele(actionPhrase)
 */
export const TEMPLATE_REGISTRY: Record<string, React.FC<any>> = {

    // ==========================================
    // LAYOUT TEMPLATES
    // ==========================================

    /**
     * SplitContent
     * USE WHEN: Hero content, feature explanations, side-by-side layouts
     * PROPS: { title, subtitle?, content, bulletPoints?[], imageUrl?, imagePrompt?, imagePosition? }
     */
    SplitContent: lazy(() => import("@/components/templates/SplitContent").then(m => ({ default: m.SplitContent }))),

    /**
     * ThreeColumnLayout
     * USE WHEN: 3 pillars, tri-fold balanced content
     * PROPS: { columns[{ title, subtitle?, description, badge?, actionPhrase }] }
     */
    ThreeColumnLayout: lazy(() => import("@/components/templates/ThreeColumnLayout").then(m => ({ default: m.ThreeColumnLayout }))),

    // ==========================================
    // CONTENT TEMPLATES
    // ==========================================

    /**
     * CardGrid
     * USE WHEN: Navigation options, topic selection, browse menus
     * PROPS: { cards[{ title, description?, imageUrl?, imagePrompt?, badge?, actionPhrase }], columns?: 2|3|4 }
     */
    CardGrid: lazy(() => import("@/components/templates/CardGrid").then(m => ({ default: m.CardGrid }))),

    /**
     * ProcessSteps
     * USE WHEN: How-to guides, numbered tutorials, workflows
     * PROPS: { title?, steps[{ title, description, actionPhrase }] }
     */
    ProcessSteps: lazy(() => import("@/components/templates/ProcessSteps").then(m => ({ default: m.ProcessSteps }))),

    /**
     * TalkingPoints
     * USE WHEN: Key messages, explanations with details
     * PROPS: { title?, subtitle?, points[{ point, detail?, actionPhrase }], ctaLabel?, ctaActionPhrase? }
     */
    TalkingPoints: lazy(() => import("@/components/templates/TalkingPoints").then(m => ({ default: m.TalkingPoints }))),

    /**
     * AccordionList
     * USE WHEN: FAQs, expandable sections, detailed breakdowns
     * PROPS: { title?, items[{ title, content, defaultOpen?, actionPhrase }] }
     */
    AccordionList: lazy(() => import("@/components/templates/AccordionList").then(m => ({ default: m.AccordionList }))),

    /**
     * ConceptCard
     * USE WHEN: Defining terminology, explaining single concepts
     * PROPS: { title, definition, details?, imageUrl?, imagePrompt?, ctaLabel?, ctaActionPhrase? }
     */
    ConceptCard: lazy(() => import("@/components/templates/ConceptCard").then(m => ({ default: m.ConceptCard }))),

    // ==========================================
    // CODE & DOCUMENTATION TEMPLATES
    // ==========================================

    /**
     * CodeBlock
     * USE WHEN: Syntax-highlighted code snippets, examples, signatures
     * PROPS: { code, language?, title?, showLineNumbers?, actionPhrase? }
     */
    CodeBlock: lazy(() => import("@/components/templates/CodeBlock").then(m => ({ default: m.CodeBlock }))),

    // ==========================================
    // DATA & VISUALIZATION TEMPLATES
    // ==========================================

    /**
     * MetricsGrid
     * USE WHEN: Key numbers, statistics, KPIs
     * PROPS: { metrics[{ value, label, change?, trend?, actionPhrase }], columns?: 2|3|4|6 }
     */
    MetricsGrid: lazy(() => import("@/components/templates/MetricsGrid").then(m => ({ default: m.MetricsGrid }))),

    /**
     * FlowDiagram
     * USE WHEN: Workflows, processes, step-by-step flows
     * PROPS: { steps[{ id, title, description?, actionPhrase }], direction?: horizontal|vertical }
     */
    FlowDiagram: lazy(() => import("@/components/templates/FlowDiagram").then(m => ({ default: m.FlowDiagram }))),

    /**
     * TimelineHorizontal
     * USE WHEN: Phases, milestones, project timelines
     * PROPS: { milestones[{ label, duration?, description?, status?, actionPhrase }] }
     */
    TimelineHorizontal: lazy(() => import("@/components/templates/TimelineHorizontal").then(m => ({ default: m.TimelineHorizontal }))),

    /**
     * TimelineVertical
     * USE WHEN: Event history, chronological sequence
     * PROPS: { title?, events[{ date?, title, description?, status?, actionPhrase }] }
     */
    TimelineVertical: lazy(() => import("@/components/templates/TimelineVertical").then(m => ({ default: m.TimelineVertical }))),

    // ==========================================
    // ACTION TEMPLATES
    // ==========================================

    /**
     * CTABanner
     * USE WHEN: Call to action, "get started", next steps
     * PROPS: { headline, subheadline?, ctaLabel, ctaActionPhrase, variant?: primary|secondary|gradient }
     */
    CTABanner: lazy(() => import("@/components/templates/CTABanner").then(m => ({ default: m.CTABanner }))),

    /**
     * NextStepsCard
     * USE WHEN: Recommended actions, "what now"
     * PROPS: { title?, subtitle?, steps[{ title, description, priority?, actionPhrase }] }
     */
    NextStepsCard: lazy(() => import("@/components/templates/NextStepsCard").then(m => ({ default: m.NextStepsCard }))),

    // ==========================================
    // LISTS & TABLES
    // ==========================================

    /**
     * NumberedList
     * USE WHEN: Priority lists, ranked items
     * PROPS: { title?, items[{ text, detail?, actionPhrase }], startNumber? }
     */
    NumberedList: lazy(() => import("@/components/templates/NumberedList").then(m => ({ default: m.NumberedList }))),

    /**
     * ChecklistCard
     * USE WHEN: Requirements, prerequisites, completion tracking
     * PROPS: { title?, items[{ text, completed?, actionPhrase }] }
     */
    ChecklistCard: lazy(() => import("@/components/templates/ChecklistCard").then(m => ({ default: m.ChecklistCard }))),

    /**
     * FeatureList
     * USE WHEN: Listing capabilities, features with icons
     * PROPS: { title?, features[{ icon?, text, detail?, actionPhrase }], columns?: 1|2 }
     */
    FeatureList: lazy(() => import("@/components/templates/FeatureList").then(m => ({ default: m.FeatureList }))),

    /**
     * IconGrid
     * USE WHEN: Tech stack, capabilities at a glance
     * PROPS: { items[{ icon, label, sublabel?, actionPhrase }], columns?: 3|4|6 }
     */
    IconGrid: lazy(() => import("@/components/templates/IconGrid").then(m => ({ default: m.IconGrid }))),

    // ==========================================
    // NAVIGATION & RESOURCES
    // ==========================================

    /**
     * NavigationGrid
     * USE WHEN: Main menu, section navigation
     * PROPS: { title?, items[{ icon, title, description?, badge?, actionPhrase }], columns? }
     */
    NavigationGrid: lazy(() => import("@/components/templates/NavigationGrid").then(m => ({ default: m.NavigationGrid }))),

    /**
     * ResourceLinks
     * USE WHEN: Documentation, resources, related links
     * PROPS: { title?, resources[{ title, description?, type?, actionPhrase }] }
     */
    ResourceLinks: lazy(() => import("@/components/templates/ResourceLinks").then(m => ({ default: m.ResourceLinks }))),

    // ==========================================
    // WELCOME & ONBOARDING
    // ==========================================

    /**
     * WelcomeCarousel
     * USE WHEN: Welcome page, getting started cards
     * PROPS: { cards[{ question, subtext?, imageUrl, actionPhrase }], autoPlayInterval? }
     */
    WelcomeCarousel: lazy(() => import("@/components/templates/WelcomeCarousel").then(m => ({ default: m.WelcomeCarousel }))),

    // ==========================================
    // ARCHITECTURE & DIAGRAMS
    // ==========================================

    /**
     * ArchitectureDiagram
     * USE WHEN: System architecture, technical components
     * PROPS: { title?, components[{ id, name, description?, icon?, layer?, actionPhrase }] }
     */
    ArchitectureDiagram: lazy(() => import("@/components/templates/ArchitectureDiagram").then(m => ({ default: m.ArchitectureDiagram }))),

    /**
     * LayerDiagram
     * USE WHEN: Technology stack, layered architecture
     * PROPS: { title?, layers[{ id, name, description?, color?, actionPhrase }] }
     */
    LayerDiagram: lazy(() => import("@/components/templates/LayerDiagram").then(m => ({ default: m.LayerDiagram }))),

    /**
     * ComponentDiagram
     * USE WHEN: System components, module breakdown
     * PROPS: { title?, components[{ id, name, description?, type?, subComponents?[], actionPhrase }] }
     */
    ComponentDiagram: lazy(() => import("@/components/templates/ComponentDiagram").then(m => ({ default: m.ComponentDiagram }))),

    /**
     * DataFlowDiagram
     * USE WHEN: Integration flows, data pipelines
     * PROPS: { title?, nodes[{ id, name, type?, icon?, actionPhrase }] }
     */
    DataFlowDiagram: lazy(() => import("@/components/templates/DataFlowDiagram").then(m => ({ default: m.DataFlowDiagram }))),

    // ==========================================
    // CONTENT LAYOUTS
    // ==========================================

    /**
     * TwoColumnContent
     * USE WHEN: Side-by-side content, dual points
     * PROPS: { leftColumn: { title, content, badge?, actionPhrase }, rightColumn: { ... } }
     */
    TwoColumnContent: lazy(() => import("@/components/templates/TwoColumnContent").then(m => ({ default: m.TwoColumnContent }))),

    /**
     * ParagraphBlock
     * USE WHEN: Long-form text, detailed explanations
     * PROPS: { title?, paragraphs[], imageUrl?, imagePrompt?, imagePosition?, ctaLabel?, ctaActionPhrase? }
     */
    ParagraphBlock: lazy(() => import("@/components/templates/ParagraphBlock").then(m => ({ default: m.ParagraphBlock }))),

    /**
     * ExpandableSection
     * USE WHEN: Progressive disclosure, detailed info that can be hidden
     * PROPS: { title, preview?, content, defaultExpanded?, ctaLabel?, ctaActionPhrase? }
     */
    ExpandableSection: lazy(() => import("@/components/templates/ExpandableSection").then(m => ({ default: m.ExpandableSection }))),

    /**
     * TabContent
     * USE WHEN: Multiple related sections, category tabs
     * PROPS: { tabs[{ id, label, content, ctaLabel?, ctaActionPhrase? }], defaultTabId? }
     */
    TabContent: lazy(() => import("@/components/templates/TabContent").then(m => ({ default: m.TabContent }))),

    // ==========================================
    // INTERACTIVE & WIZARDS
    // ==========================================

    /**
     * StepWizard
     * USE WHEN: Multi-step processes, onboarding wizards
     * PROPS: { title?, steps[{ id, title, description?, status, imageUrl?, imagePrompt?, actionPhrase }], currentStep? }
     */
    StepWizard: lazy(() => import("@/components/templates/StepWizard").then(m => ({ default: m.StepWizard }))),

    /**
     * ImageCarousel
     * USE WHEN: Image gallery, screenshot showcase
     * PROPS: { title?, images[{ imageUrl?, imagePrompt?, caption?, actionPhrase }], autoPlay?, interval? }
     */
    ImageCarousel: lazy(() => import("@/components/templates/ImageCarousel").then(m => ({ default: m.ImageCarousel }))),
};
