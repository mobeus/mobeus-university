/**
 * Template Registry v105.0
 * 
 * 21 Core Templates (Mortgage-Focused) + 3 Legacy Aliases (24 total for LLM compatibility)
 * All templates documented in glass-prompt.md
 */


import { lazy } from 'react';

export const TEMPLATE_REGISTRY: Record<string, React.FC<any>> = {
    // ═══════════════════════════════════════════════════════════════════════
    // CORE TEMPLATES (4)
    // ═══════════════════════════════════════════════════════════════════════
    Hero: lazy(() => import("@/components/templates/Hero").then(m => ({ default: m.Hero }))),
    Stats: lazy(() => import("@/components/templates/Stats").then(m => ({ default: m.Stats }))),
    Trio: lazy(() => import("@/components/templates/Trio").then(m => ({ default: m.Trio }))),
    Banner: lazy(() => import("@/components/templates/Banner").then(m => ({ default: m.Banner }))),

    // ═══════════════════════════════════════════════════════════════════════
    // LAYOUT TEMPLATES (2)
    // ═══════════════════════════════════════════════════════════════════════
    WelcomeCarousel: lazy(() => import("@/components/templates/WelcomeCarousel").then(m => ({ default: m.WelcomeCarousel }))),
    Split: lazy(() => import("@/components/templates/Split").then(m => ({ default: m.Split }))),

    // ═══════════════════════════════════════════════════════════════════════
    // INTERACTIVE TEMPLATES (6) - MORTGAGE-SPECIFIC
    // ═══════════════════════════════════════════════════════════════════════
    MortgageReview: lazy(() => import("@/components/templates/MortgageReview").then(m => ({ default: m.MortgageReview }))),
    ComplianceConsent: lazy(() => import("@/components/templates/ComplianceConsent").then(m => ({ default: m.ComplianceConsent }))),
    RentalPropertyReview: lazy(() => import("@/components/templates/RentalPropertyReview").then(m => ({ default: m.RentalPropertyReview }))),
    FlipPropertyReview: lazy(() => import("@/components/templates/FlipPropertyReview").then(m => ({ default: m.FlipPropertyReview }))),
    RentalDataCapture: lazy(() => import("@/components/templates/RentalDataCapture").then(m => ({ default: m.RentalDataCapture }))),
    FlipDataCapture: lazy(() => import("@/components/templates/FlipDataCapture").then(m => ({ default: m.FlipDataCapture }))),

    // ═══════════════════════════════════════════════════════════════════════
    // CONTENT TEMPLATES (3)
    // ═══════════════════════════════════════════════════════════════════════
    List: lazy(() => import("@/components/templates/List").then(m => ({ default: m.List }))),
    Article: lazy(() => import("@/components/templates/Article").then(m => ({ default: m.Article }))),
    Paragraph: lazy(() => import("@/components/templates/Paragraph").then(m => ({ default: m.Paragraph }))),

    // ═══════════════════════════════════════════════════════════════════════
    // COMPARISON & DISPLAY TEMPLATES (4)
    // ═══════════════════════════════════════════════════════════════════════
    Compare: lazy(() => import("@/components/templates/Compare").then(m => ({ default: m.Compare }))),
    Quote: lazy(() => import("@/components/templates/Quote").then(m => ({ default: m.Quote }))),
    Metric: lazy(() => import("@/components/templates/Metric").then(m => ({ default: m.Metric }))),
    Steps: lazy(() => import("@/components/templates/Steps").then(m => ({ default: m.Steps }))),

    // ═══════════════════════════════════════════════════════════════════════
    // DATA & UTILITY TEMPLATES (2)
    // ═══════════════════════════════════════════════════════════════════════
    Table: lazy(() => import("@/components/templates/Table").then(m => ({ default: m.Table }))),
    MediaText: lazy(() => import("@/components/templates/MediaText").then(m => ({ default: m.MediaText }))),

    // ═══════════════════════════════════════════════════════════════════════
    // LEGACY ALIASES (Backward Compatibility)
    // ═══════════════════════════════════════════════════════════════════════
    TextImageLeft: lazy(() => import("@/components/templates/MediaText").then(m => ({ default: m.MediaText }))),
    TextImageRight: lazy(() => import("@/components/templates/MediaText").then(m => ({ default: m.MediaText }))),
    TwoColumns: lazy(() => import("@/components/templates/MediaText").then(m => ({ default: m.MediaText }))),
};

export const TEMPLATE_NAMES = Object.keys(TEMPLATE_REGISTRY);
