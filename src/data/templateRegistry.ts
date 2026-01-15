import React, { lazy } from "react";

/**
 * TEMPLATE REGISTRY
 * All templates are lazy-loaded for performance.
 * Each template includes:
 * - USE WHEN: Triggers for Tele to select this template
 * - PROPS: TypeScript interface summary
 * - VOLUMETRIC: Every clickable element calls notifyTele(actionPhrase)
 */
export const TEMPLATE_REGISTRY: Record<string, React.FC<any>> = {
    // ==========================================
    // LAYOUT TEMPLATES
    // ==========================================

    /**
     * SplitContent
     * USE WHEN: Hero content, feature explanations, about sections, side-by-side layouts
     * PROPS: { title, subtitle?, content, bulletPoints?[], imageUrl?, imagePrompt?, imagePosition? }
     */
    SplitContent: lazy(() => import("@/components/templates/SplitContent").then(m => ({ default: m.SplitContent }))),

    /**
     * ThreeColumnLayout
     * USE WHEN: 3 environments, 3 pillars, tri-fold balanced content, "the 3 things"
     * PROPS: { columns[{ title, subtitle?, description, badge?, actionPhrase }] }
     */
    ThreeColumnLayout: lazy(() => import("@/components/templates/ThreeColumnLayout").then(m => ({ default: m.ThreeColumnLayout }))),

    // ==========================================
    // METRICS & DATA VISUALIZATION
    // ==========================================

    /**
     * MetricsGrid
     * USE WHEN: ROI stats, KPIs, "show me the numbers", performance metrics
     * PROPS: { metrics[{ value, label, change?, trend?, actionPhrase }], columns?: 2|3|4|6 }
     */
    MetricsGrid: lazy(() => import("@/components/templates/MetricsGrid").then(m => ({ default: m.MetricsGrid }))),

    /**
     * StatHighlight
     * USE WHEN: Hero stat, key metric spotlight, impact number, "the big number"
     * PROPS: { value, label, description?, trend?, trendValue?, ctaLabel?, actionPhrase }
     */
    StatHighlight: lazy(() => import("@/components/templates/StatHighlight").then(m => ({ default: m.StatHighlight }))),

    // ==========================================
    // COMPARISON & TABLES
    // ==========================================

    /**
     * ComparisonTable
     * USE WHEN: "How do we compare", vs competitor, feature matrix, side-by-side
     * PROPS: { headers[], rows[{ feature, values[], highlight?, actionPhrase }], highlightColumn? }
     */
    ComparisonTable: lazy(() => import("@/components/templates/ComparisonTable").then(m => ({ default: m.ComparisonTable }))),

    // ==========================================
    // PROCESS & FLOW
    // ==========================================

    /**
     * FlowDiagram
     * USE WHEN: Workflows, processes, "how does it work", step-by-step flows
     * PROPS: { steps[{ id, title, description?, actionPhrase }], direction?: horizontal|vertical }
     */
    FlowDiagram: lazy(() => import("@/components/templates/FlowDiagram").then(m => ({ default: m.FlowDiagram }))),

    /**
     * ProcessSteps
     * USE WHEN: How-to guides, implementation steps, numbered process
     * PROPS: { title?, steps[{ title, description, actionPhrase }] }
     */
    ProcessSteps: lazy(() => import("@/components/templates/ProcessSteps").then(m => ({ default: m.ProcessSteps }))),

    /**
     * TimelineHorizontal
     * USE WHEN: 3-3-3 delivery model, project phases, roadmaps, milestones
     * PROPS: { milestones[{ label, duration?, description?, status?, actionPhrase }] }
     */
    TimelineHorizontal: lazy(() => import("@/components/templates/TimelineHorizontal").then(m => ({ default: m.TimelineHorizontal }))),

    // ==========================================
    // CONTENT CARDS & LISTS
    // ==========================================

    /**
     * CardGrid
     * USE WHEN: Multiple topics, categories, navigation options, browse options
     * PROPS: { cards[{ title, description?, imageUrl?, imagePrompt?, badge?, actionPhrase }], columns?: 2|3|4 }
     */
    CardGrid: lazy(() => import("@/components/templates/CardGrid").then(m => ({ default: m.CardGrid }))),

    /**
     * FeatureList
     * USE WHEN: Listing capabilities, security features, platform features
     * PROPS: { title?, features[{ icon?, text, detail?, actionPhrase }], columns?: 1|2 }
     */
    FeatureList: lazy(() => import("@/components/templates/FeatureList").then(m => ({ default: m.FeatureList }))),

    /**
     * IconGrid
     * USE WHEN: Tech stack, capabilities at a glance, supported technologies
     * PROPS: { items[{ icon, label, sublabel?, actionPhrase }], columns?: 3|4|6 }
     */
    IconGrid: lazy(() => import("@/components/templates/IconGrid").then(m => ({ default: m.IconGrid }))),

    /**
     * AccordionList
     * USE WHEN: FAQs, detailed breakdowns, expandable sections
     * PROPS: { title?, items[{ title, content, defaultOpen?, actionPhrase }] }
     */
    AccordionList: lazy(() => import("@/components/templates/AccordionList").then(m => ({ default: m.AccordionList }))),

    // ==========================================
    // DETAIL & EXPLANATION
    // ==========================================

    /**
     * ConceptCard
     * USE WHEN: Explaining a single concept, definition, "what is X"
     * PROPS: { title, definition, details?, imageUrl?, imagePrompt?, ctaLabel?, ctaActionPhrase? }
     */
    ConceptCard: lazy(() => import("@/components/templates/ConceptCard").then(m => ({ default: m.ConceptCard }))),

    /**
     * TalkingPoints
     * USE WHEN: Sales talking points, pitch prep, "what should I say"
     * PROPS: { title?, subtitle?, points[{ point, detail?, actionPhrase }], ctaLabel?, ctaActionPhrase? }
     */
    TalkingPoints: lazy(() => import("@/components/templates/TalkingPoints").then(m => ({ default: m.TalkingPoints }))),

    // ==========================================
    // CASE STUDIES & PROOF
    // ==========================================

    /**
     * CaseStudyCard
     * USE WHEN: Proof points, customer success, "show me examples"
     * PROPS: { clientName, industry, challenge, solution, results[{ metric, value }], imageUrl?, imagePrompt?, actionPhrase }
     */
    CaseStudyCard: lazy(() => import("@/components/templates/CaseStudyCard").then(m => ({ default: m.CaseStudyCard }))),

    // ==========================================
    // CALLS TO ACTION
    // ==========================================

    /**
     * CTABanner
     * USE WHEN: Primary action, "get started", "next steps", conversion
     * PROPS: { headline, subheadline?, ctaLabel, ctaActionPhrase, variant?: primary|secondary|gradient }
     */
    CTABanner: lazy(() => import("@/components/templates/CTABanner").then(m => ({ default: m.CTABanner }))),

    // ==========================================
    // WAVE 2: TIMELINE & HISTORY
    // ==========================================

    /**
     * TimelineVertical
     * USE WHEN: Event history, vertical roadmap, chronological sequence
     * PROPS: { title?, events[{ date?, title, description?, status?, actionPhrase }] }
     */
    TimelineVertical: lazy(() => import("@/components/templates/TimelineVertical").then(m => ({ default: m.TimelineVertical }))),

    // ==========================================
    // WAVE 2: COMPETITIVE & SALES
    // ==========================================

    /**
     * BattleCard
     * USE WHEN: Competitor analysis, "how do we beat X", competitive positioning
     * PROPS: { competitor, theirClaim, ourCounter, differentiators?[], winningMove?, actionPhrase }
     */
    BattleCard: lazy(() => import("@/components/templates/BattleCard").then(m => ({ default: m.BattleCard }))),

    /**
     * ValuePropCard
     * USE WHEN: Why choose us, value propositions, benefits summary
     * PROPS: { title, tagline, benefits[], imageUrl?, imagePrompt?, ctaLabel?, actionPhrase }
     */
    ValuePropCard: lazy(() => import("@/components/templates/ValuePropCard").then(m => ({ default: m.ValuePropCard }))),

    /**
     * QuoteCard
     * USE WHEN: Testimonials, customer quotes, endorsements
     * PROPS: { quote, author, role?, company?, imageUrl?, imagePrompt?, actionPhrase }
     */
    QuoteCard: lazy(() => import("@/components/templates/QuoteCard").then(m => ({ default: m.QuoteCard }))),

    /**
     * ScenarioCard
     * USE WHEN: "What if", situation responses, objection handling, scenario planning
     * PROPS: { scenario, response, keyPoints?[], ctaLabel?, actionPhrase }
     */
    ScenarioCard: lazy(() => import("@/components/templates/ScenarioCard").then(m => ({ default: m.ScenarioCard }))),

    // ==========================================
    // WAVE 2: LISTS & DATA
    // ==========================================

    /**
     * ChecklistCard
     * USE WHEN: Requirements, prerequisites, completion tracking, to-do
     * PROPS: { title?, items[{ text, completed?, actionPhrase }] }
     */
    ChecklistCard: lazy(() => import("@/components/templates/ChecklistCard").then(m => ({ default: m.ChecklistCard }))),

    /**
     * NumberedList
     * USE WHEN: Priority lists, ranked items, top N things
     * PROPS: { title?, items[{ text, detail?, actionPhrase }], startNumber? }
     */
    NumberedList: lazy(() => import("@/components/templates/NumberedList").then(m => ({ default: m.NumberedList }))),

    /**
     * PricingCards
     * USE WHEN: Pricing options, packages, tier comparison
     * PROPS: { tiers[{ name, price, period?, description?, features[], highlighted?, ctaLabel?, actionPhrase }] }
     */
    PricingCards: lazy(() => import("@/components/templates/PricingCards").then(m => ({ default: m.PricingCards }))),

    /**
     * DataTable
     * USE WHEN: Structured data, tabular information, listings
     * PROPS: { headers[], rows[{ cells[], actionPhrase }], striped? }
     */
    DataTable: lazy(() => import("@/components/templates/DataTable").then(m => ({ default: m.DataTable }))),

    // ==========================================
    // WAVE 2: COMPARISON & TRANSFORMATION
    // ==========================================

    /**
     * BeforeAfter
     * USE WHEN: Transformation, results comparison, impact visualization, "before/after"
     * PROPS: { beforeTitle, beforeContent, beforeImageUrl?, beforeImagePrompt?, beforeActionPhrase, afterTitle, afterContent, afterImageUrl?, afterImagePrompt?, afterActionPhrase }
     */
    BeforeAfter: lazy(() => import("@/components/templates/BeforeAfter").then(m => ({ default: m.BeforeAfter }))),

    // ==========================================
    // WAVE 2: ARCHITECTURE & TECHNICAL
    // ==========================================

    /**
     * ArchitectureDiagram
     * USE WHEN: System architecture, technical components, "show me the architecture"
     * PROPS: { title?, components[{ id, name, description?, icon?, layer?, actionPhrase }] }
     */
    ArchitectureDiagram: lazy(() => import("@/components/templates/ArchitectureDiagram").then(m => ({ default: m.ArchitectureDiagram }))),

    // ==========================================
    // WAVE 2: NAVIGATION & RESOURCES
    // ==========================================

    /**
     * ResourceLinks
     * USE WHEN: Documentation, resources, "where can I learn more", related links
     * PROPS: { title?, resources[{ title, description?, type?, actionPhrase }] }
     */
    ResourceLinks: lazy(() => import("@/components/templates/ResourceLinks").then(m => ({ default: m.ResourceLinks }))),

    /**
     * NavigationGrid
     * USE WHEN: Main menu, section navigation, "where do you want to go"
     * PROPS: { title?, items[{ icon, title, description?, badge?, actionPhrase }], columns? }
     */
    NavigationGrid: lazy(() => import("@/components/templates/NavigationGrid").then(m => ({ default: m.NavigationGrid }))),

    /**
     * NextStepsCard
     * USE WHEN: Action items, "what now", post-demo, recommended actions
     * PROPS: { title?, subtitle?, steps[{ title, description, priority?, actionPhrase }] }
     */
    NextStepsCard: lazy(() => import("@/components/templates/NextStepsCard").then(m => ({ default: m.NextStepsCard }))),

    // ==========================================
    // WAVE 2: INDUSTRY & VERTICAL
    // ==========================================

    /**
     * IndustryCard
     * USE WHEN: Vertical focus, industry capabilities, "do you work in X industry"
     * PROPS: { industry, headline, description, capabilities?[], clients?[], imageUrl?, imagePrompt?, actionPhrase }
     */
    IndustryCard: lazy(() => import("@/components/templates/IndustryCard").then(m => ({ default: m.IndustryCard }))),

    // ==========================================
    // WAVE 3: DATA VISUALIZATION
    // ==========================================

    /**
     * BarChart
     * USE WHEN: Comparisons, rankings, quantity comparison
     * PROPS: { title?, bars[{ label, value, maxValue?, color?, actionPhrase }], orientation?, showValues? }
     */
    BarChart: lazy(() => import("@/components/templates/BarChart").then(m => ({ default: m.BarChart }))),

    /**
     * PieChart
     * USE WHEN: Distribution, percentage breakdown, composition
     * PROPS: { title?, segments[{ label, value, color?, actionPhrase }], showLegend?, donut? }
     */
    PieChart: lazy(() => import("@/components/templates/PieChart").then(m => ({ default: m.PieChart }))),

    /**
     * LineChart
     * USE WHEN: Trends over time, growth visualization, progress tracking
     * PROPS: { title?, data[{ label, value }], color?, showTrend?, actionPhrase }
     */
    LineChart: lazy(() => import("@/components/templates/LineChart").then(m => ({ default: m.LineChart }))),

    /**
     * ScoreCard
     * USE WHEN: Assessments, capability scores, maturity models
     * PROPS: { title?, subtitle?, criteria[{ label, score, maxScore, description?, actionPhrase }], showOverall? }
     */
    ScoreCard: lazy(() => import("@/components/templates/ScoreCard").then(m => ({ default: m.ScoreCard }))),

    // ==========================================
    // WAVE 3: CONTENT LAYOUTS
    // ==========================================

    /**
     * TwoColumnContent
     * USE WHEN: Side-by-side content, dual points, left/right comparison
     * PROPS: { leftColumn: { title, content, badge?, actionPhrase }, rightColumn: { ... } }
     */
    TwoColumnContent: lazy(() => import("@/components/templates/TwoColumnContent").then(m => ({ default: m.TwoColumnContent }))),

    /**
     * ParagraphBlock
     * USE WHEN: Long-form text, detailed explanations, narrative content
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
     * USE WHEN: Multiple related sections, category tabs, organized content
     * PROPS: { tabs[{ id, label, content, ctaLabel?, ctaActionPhrase? }], defaultTabId? }
     */
    TabContent: lazy(() => import("@/components/templates/TabContent").then(m => ({ default: m.TabContent }))),

    // ==========================================
    // WAVE 3: INTERACTIVE & WIZARDS
    // ==========================================

    /**
     * StepWizard
     * USE WHEN: Multi-step processes, onboarding wizards, guided flows
     * PROPS: { title?, steps[{ id, title, description?, status, imageUrl?, imagePrompt?, actionPhrase }], currentStep? }
     */
    StepWizard: lazy(() => import("@/components/templates/StepWizard").then(m => ({ default: m.StepWizard }))),

    /**
     * ImageCarousel
     * USE WHEN: Image gallery, screenshot showcase, multiple visuals
     * PROPS: { title?, images[{ imageUrl?, imagePrompt?, caption?, actionPhrase }], autoPlay?, interval? }
     */
    ImageCarousel: lazy(() => import("@/components/templates/ImageCarousel").then(m => ({ default: m.ImageCarousel }))),

    // ==========================================
    // WAVE 3: RESULTS & PROOF
    // ==========================================

    /**
     * ResultsGrid
     * USE WHEN: Project results, impact showcase, outcome summary
     * PROPS: { title?, results[{ category, metric, value, description?, icon?, actionPhrase }] }
     */
    ResultsGrid: lazy(() => import("@/components/templates/ResultsGrid").then(m => ({ default: m.ResultsGrid }))),

    /**
     * ClientLogoGrid
     * USE WHEN: Social proof, client showcase, "who uses this"
     * PROPS: { title?, subtitle?, logos[{ name, imageUrl?, imagePrompt?, actionPhrase }], columns? }
     */
    ClientLogoGrid: lazy(() => import("@/components/templates/ClientLogoGrid").then(m => ({ default: m.ClientLogoGrid }))),

    /**
     * ProofPointCard
     * USE WHEN: Validation points, evidence, credibility builders
     * PROPS: { type, title, description, source?, date?, actionPhrase }
     */
    ProofPointCard: lazy(() => import("@/components/templates/ProofPointCard").then(m => ({ default: m.ProofPointCard }))),

    // ==========================================
    // WAVE 3: CONTACT & CONNECT
    // ==========================================

    /**
     * ContactCard
     * USE WHEN: Contact info, "how to reach us", sales contact
     * PROPS: { name, role?, email?, phone?, location?, linkedIn?, imageUrl?, imagePrompt?, bookMeetingActionPhrase?, contactActionPhrase }
     */
    ContactCard: lazy(() => import("@/components/templates/ContactCard").then(m => ({ default: m.ContactCard }))),

    // ==========================================
    // WAVE 3: TECHNICAL DIAGRAMS
    // ==========================================

    /**
     * LayerDiagram
     * USE WHEN: Technology stack, layered architecture, abstraction levels
     * PROPS: { title?, layers[{ id, name, description?, color?, actionPhrase }] }
     */
    LayerDiagram: lazy(() => import("@/components/templates/LayerDiagram").then(m => ({ default: m.LayerDiagram }))),

    /**
     * DataFlowDiagram
     * USE WHEN: Integration flows, data pipelines, system connections
     * PROPS: { title?, nodes[{ id, name, type?, icon?, actionPhrase }] }
     */
    DataFlowDiagram: lazy(() => import("@/components/templates/DataFlowDiagram").then(m => ({ default: m.DataFlowDiagram }))),

    /**
     * ComponentDiagram
     * USE WHEN: System components, module breakdown, component relationships
     * PROPS: { title?, components[{ id, name, description?, type?, subComponents?[], actionPhrase }] }
     */
    ComponentDiagram: lazy(() => import("@/components/templates/ComponentDiagram").then(m => ({ default: m.ComponentDiagram }))),

    // ==========================================
    // WAVE 3: PROJECT MANAGEMENT
    // ==========================================

    /**
     * GanttChart
     * USE WHEN: Project timelines, task scheduling, resource planning
     * PROPS: { title?, tasks[{ id, name, start, duration, status?, actionPhrase }], periods?[] }
     */
    GanttChart: lazy(() => import("@/components/templates/GanttChart").then(m => ({ default: m.GanttChart }))),

    /**
     * RoadmapView
     * USE WHEN: Future plans, roadmap, "what's coming", release timeline
     * PROPS: { title?, lanes[{ id, label, items[{ id, title, description?, status?, highlight?, actionPhrase }] }] }
     */
    RoadmapView: lazy(() => import("@/components/templates/RoadmapView").then(m => ({ default: m.RoadmapView }))),

    // ==========================================
    // WELCOME & ONBOARDING
    // ==========================================

    /**
     * WelcomeCarousel
     * USE WHEN: Welcome page, stakeholder questions, "ask Catherine" cards
     * PROPS: { cards[{ question, subtext?, imageUrl, actionPhrase }], autoPlayInterval? }
     */
    WelcomeCarousel: lazy(() => import("@/components/templates/WelcomeCarousel").then(m => ({ default: m.WelcomeCarousel }))),
};
