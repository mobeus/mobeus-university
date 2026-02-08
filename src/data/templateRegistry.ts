/**
 * Template Registry v100.3
 * 
 * 30 Core Templates + 3 Legacy Aliases (33 total for LLM compatibility)
 * All templates documented in glass-prompt.md
 */

import { lazy } from 'react';

export const TEMPLATE_REGISTRY: Record<string, React.FC<any>> = {
    // ═══════════════════════════════════════════════════════════════════════
    // CORE TEMPLATES (5)
    // ═══════════════════════════════════════════════════════════════════════
    Hero: lazy(() => import("@/components/templates/Hero").then(m => ({ default: m.Hero }))),
    Stats: lazy(() => import("@/components/templates/Stats").then(m => ({ default: m.Stats }))),
    Trio: lazy(() => import("@/components/templates/Trio").then(m => ({ default: m.Trio }))),
    Banner: lazy(() => import("@/components/templates/Banner").then(m => ({ default: m.Banner }))),
    Story: lazy(() => import("@/components/templates/Story").then(m => ({ default: m.Story }))),

    // ═══════════════════════════════════════════════════════════════════════
    // LAYOUT TEMPLATES (6)
    // ═══════════════════════════════════════════════════════════════════════
    Carousel: lazy(() => import("@/components/templates/Carousel").then(m => ({ default: m.Carousel }))),
    WelcomeCarousel: lazy(() => import("@/components/templates/WelcomeCarousel").then(m => ({ default: m.WelcomeCarousel }))),
    Split: lazy(() => import("@/components/templates/Split").then(m => ({ default: m.Split }))),
    Grid: lazy(() => import("@/components/templates/Grid").then(m => ({ default: m.Grid }))),
    Accordion: lazy(() => import("@/components/templates/Accordion").then(m => ({ default: m.Accordion }))),
    ConsultationScheduler: lazy(() => import("@/components/templates/ConsultationScheduler").then(m => ({ default: m.ConsultationScheduler }))),

    // ═══════════════════════════════════════════════════════════════════════
    // CONTENT TEMPLATES (6)
    // ═══════════════════════════════════════════════════════════════════════
    Showcase: lazy(() => import("@/components/templates/Showcase").then(m => ({ default: m.Showcase }))),
    Guide: lazy(() => import("@/components/templates/Guide").then(m => ({ default: m.Guide }))),
    List: lazy(() => import("@/components/templates/List").then(m => ({ default: m.List }))),
    Timeline: lazy(() => import("@/components/templates/Timeline").then(m => ({ default: m.Timeline }))),
    Form: lazy(() => import("@/components/templates/Form").then(m => ({ default: m.Form }))),
    PartyConfirmation: lazy(() => import("@/components/templates/PartyConfirmation").then(m => ({ default: m.PartyConfirmation }))),

    // ═══════════════════════════════════════════════════════════════════════
    // COMPARISON & DISPLAY TEMPLATES (4)
    // ═══════════════════════════════════════════════════════════════════════
    Compare: lazy(() => import("@/components/templates/Compare").then(m => ({ default: m.Compare }))),
    Quote: lazy(() => import("@/components/templates/Quote").then(m => ({ default: m.Quote }))),
    Metric: lazy(() => import("@/components/templates/Metric").then(m => ({ default: m.Metric }))),
    Steps: lazy(() => import("@/components/templates/Steps").then(m => ({ default: m.Steps }))),

    // ═══════════════════════════════════════════════════════════════════════
    // IMAGE TEMPLATES (1)
    // ═══════════════════════════════════════════════════════════════════════
    ImageSingle: lazy(() => import("@/components/templates/ImageSingle").then(m => ({ default: m.ImageSingle }))),

    // ═══════════════════════════════════════════════════════════════════════
    // DATA & UTILITY TEMPLATES (5)
    // ═══════════════════════════════════════════════════════════════════════
    Table: lazy(() => import("@/components/templates/Table").then(m => ({ default: m.Table }))),
    Infographic: lazy(() => import("@/components/templates/Infographic").then(m => ({ default: m.Infographic }))),
    Article: lazy(() => import("@/components/templates/Article").then(m => ({ default: m.Article }))),
    Feature: lazy(() => import("@/components/templates/Feature").then(m => ({ default: m.Feature }))),
    Paragraph: lazy(() => import("@/components/templates/Paragraph").then(m => ({ default: m.Paragraph }))),

    // ═══════════════════════════════════════════════════════════════════════
    // TEACHING TEMPLATES (1)
    // ═══════════════════════════════════════════════════════════════════════
    Lesson: lazy(() => import("@/components/templates/Lesson").then(m => ({ default: m.Lesson }))),

    // ═══════════════════════════════════════════════════════════════════════
    // RATING & TESTING TEMPLATES (1)
    // ═══════════════════════════════════════════════════════════════════════
    Scorecard: lazy(() => import("@/components/templates/Scorecard").then(m => ({ default: m.Scorecard }))),

    // ═══════════════════════════════════════════════════════════════════════
    // TEXT-HEAVY TEMPLATES (1 - Consolidated)
    // ═══════════════════════════════════════════════════════════════════════
    MediaText: lazy(() => import("@/components/templates/MediaText").then(m => ({ default: m.MediaText }))),

    // Backward compatibility - map old templates to MediaText
    TextImageLeft: lazy(() => import("@/components/templates/MediaText").then(m => ({ default: m.MediaText }))),
    TextImageRight: lazy(() => import("@/components/templates/MediaText").then(m => ({ default: m.MediaText }))),
    TwoColumns: lazy(() => import("@/components/templates/MediaText").then(m => ({ default: m.MediaText }))),
};

export const TEMPLATE_NAMES = Object.keys(TEMPLATE_REGISTRY);
