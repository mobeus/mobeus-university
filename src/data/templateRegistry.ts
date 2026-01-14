import React, { lazy } from "react";

// Lazy load templates - Generic UI Components for Conversational Interfaces
export const TEMPLATE_REGISTRY: Record<string, React.FC<any>> = {
    // ==========================================
    // LAYOUT TEMPLATES
    // ==========================================

    // FeatureGrid: Feature cards with icons and descriptions
    // USE FOR: Feature lists, benefits, service offerings
    FeatureGrid: lazy(() => import("@/components/templates/FeatureGrid").then(m => ({ default: m.FeatureGrid }))),

    // FeatureCallouts: Large icon boxes with titles and descriptions
    // USE FOR: Key features, pillars, core capabilities
    FeatureCallouts: lazy(() => import("@/components/templates/FeatureCallouts").then(m => ({ default: m.FeatureCallouts }))),

    // SplitContent: Two-column layout with image/text
    // USE FOR: About sections, hero content, side-by-side comparisons
    SplitContent: lazy(() => import("@/components/templates/SplitContent").then(m => ({ default: m.SplitContent }))),

    // ==========================================
    // DATA DISPLAY TEMPLATES
    // ==========================================

    // ComparisonTable: Side-by-side comparison with feature matrix
    // USE FOR: Product comparison, pricing tiers, plan differences
    ComparisonTable: lazy(() => import("@/components/templates/ComparisonTable").then(m => ({ default: m.ComparisonTable }))),


    // MetricsGrid: KPI cards with numbers and trends
    // USE FOR: Analytics, dashboards, key metrics, stats
    MetricsGrid: lazy(() => import("@/components/templates/MetricsGrid").then(m => ({ default: m.MetricsGrid }))),

    // PricingTable: Pricing tiers with features
    // USE FOR: Pricing pages, subscription plans, cost breakdown
    PricingTable: lazy(() => import("@/components/templates/PricingTable").then(m => ({ default: m.PricingTable }))),

    // ProductCatalog: Product cards with details
    // USE FOR: Catalogs, inventory, product listings
    ProductCatalog: lazy(() => import("@/components/templates/ProductCatalog").then(m => ({ default: m.ProductCatalog }))),

    // ==========================================
    // LIST & CONTENT TEMPLATES
    // ==========================================

    // IconList: Vertical list with icons
    // USE FOR: Bullet points, process steps, feature lists
    IconList: lazy(() => import("@/components/templates/IconList").then(m => ({ default: m.IconList }))),

    // FAQAccordion: Expandable Q&A sections
    // USE FOR: FAQs, help content, expandable details
    FAQAccordion: lazy(() => import("@/components/templates/FAQAccordion").then(m => ({ default: m.FAQAccordion }))),

    // ChecklistCard: Checklist with completable items
    // USE FOR: Checklists, requirements, task lists
    ChecklistCard: lazy(() => import("@/components/templates/ChecklistCard").then(m => ({ default: m.ChecklistCard }))),

    // ==========================================
    // VISUAL DIAGRAMS
    // ==========================================

    // TimelineRoadmap: Timeline with milestones
    // USE FOR: Roadmaps, project timelines, history, phases
    TimelineRoadmap: lazy(() => import("@/components/templates/TimelineRoadmap").then(m => ({ default: m.TimelineRoadmap }))),

    // WorkflowDiagram: Process flow visualization
    // USE FOR: Workflows, processes, user journeys
    WorkflowDiagram: lazy(() => import("@/components/templates/WorkflowDiagram").then(m => ({ default: m.WorkflowDiagram }))),

    // ArchitectureDiagram: System architecture with nodes and connections
    // USE FOR: Technical diagrams, integrations, system flows
    ArchitectureDiagram: lazy(() => import("@/components/templates/ArchitectureDiagram").then(m => ({ default: m.ArchitectureDiagram }))),


    // ==========================================
    // PEOPLE & CONTACT TEMPLATES
    // ==========================================

    // TeamCards: Team member profiles
    // USE FOR: Team pages, about us, speaker bios
    TeamCards: lazy(() => import("@/components/templates/TeamCards").then(m => ({ default: m.TeamCards }))),

    // ContactCard: Contact information display
    // USE FOR: Contact pages, business cards, representative info
    ContactCard: lazy(() => import("@/components/templates/ContactCard").then(m => ({ default: m.ContactCard }))),

    // ==========================================
    // INTERACTIVE TEMPLATES
    // ==========================================

    // Scheduler: Calendar/meeting booking interface
    // USE FOR: Appointments, meetings, bookings, scheduling
    Scheduler: lazy(() => import("@/components/templates/Scheduler").then(m => ({ default: m.Scheduler }))),

    // Celebration: Success/confirmation screen with animation
    // USE FOR: Confirmations, celebrations, success states
    Celebration: lazy(() => import("@/components/templates/Celebration").then(m => ({ default: m.Celebration }))),



    // ==========================================
    // SPECIALIZED TEMPLATES (Domain-Specific)
    // ==========================================

    // BrandingPreview: Brand/UI preview mockup
    // USE FOR: Branding previews, customization demos
    BrandingPreview: lazy(() => import("@/components/templates/BrandingPreview").then(m => ({ default: m.BrandingPreview }))),


    // ==========================================
    // FISERV-SPECIFIC (Do Not Genericize)
    // ==========================================

    // Bank Portal Mockup - Fiserv specific demo
    BankPortalMockup: lazy(() => import("@/components/templates/BankPortalMockup").then(m => ({ default: m.BankPortalMockup }))),

    // Onboarding Templates - Fiserv merchant onboarding
    OnboardingStep: lazy(() => import("@/components/templates/OnboardingStep").then(m => ({ default: m.OnboardingStep }))),
};
