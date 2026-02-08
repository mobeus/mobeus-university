/**
 * Template Registry v119.0
 * 
 * 30 Core Templates — Lean and focused
 * All templates documented in glass-prompt.md
 */

import { lazy } from 'react';

export const TEMPLATE_REGISTRY: Record<string, React.FC<any>> = {
    // ═══════════════════════════════════════════════════════════════════════
    // HERO & BANNER (2)
    // ═══════════════════════════════════════════════════════════════════════
    Hero: lazy(() => import("@/components/templates/Hero").then(m => ({ default: m.Hero }))),
    Banner: lazy(() => import("@/components/templates/Banner").then(m => ({ default: m.Banner }))),

    // ═══════════════════════════════════════════════════════════════════════
    // LAYOUT TEMPLATES (5)
    // ═══════════════════════════════════════════════════════════════════════
    Carousel: lazy(() => import("@/components/templates/Carousel").then(m => ({ default: m.Carousel }))),
    WelcomeCarousel: lazy(() => import("@/components/templates/WelcomeCarousel").then(m => ({ default: m.WelcomeCarousel }))),
    Split: lazy(() => import("@/components/templates/Split").then(m => ({ default: m.Split }))),
    Grid: lazy(() => import("@/components/templates/Grid").then(m => ({ default: m.Grid }))),
    Accordion: lazy(() => import("@/components/templates/Accordion").then(m => ({ default: m.Accordion }))),

    // ═══════════════════════════════════════════════════════════════════════
    // CONTENT TEMPLATES (5)
    // ═══════════════════════════════════════════════════════════════════════
    Showcase: lazy(() => import("@/components/templates/Showcase").then(m => ({ default: m.Showcase }))),
    Timeline: lazy(() => import("@/components/templates/Timeline").then(m => ({ default: m.Timeline }))),
    Form: lazy(() => import("@/components/templates/Form").then(m => ({ default: m.Form }))),
    PartyConfirmation: lazy(() => import("@/components/templates/PartyConfirmation").then(m => ({ default: m.PartyConfirmation }))),
    Trio: lazy(() => import("@/components/templates/Trio").then(m => ({ default: m.Trio }))),

    // ═══════════════════════════════════════════════════════════════════════
    // COMPARISON & DISPLAY (4)
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
    // DATA & TEXT TEMPLATES (5)
    // ═══════════════════════════════════════════════════════════════════════
    Table: lazy(() => import("@/components/templates/Table").then(m => ({ default: m.Table }))),
    Infographic: lazy(() => import("@/components/templates/Infographic").then(m => ({ default: m.Infographic }))),
    Article: lazy(() => import("@/components/templates/Article").then(m => ({ default: m.Article }))),
    Feature: lazy(() => import("@/components/templates/Feature").then(m => ({ default: m.Feature }))),
    Paragraph: lazy(() => import("@/components/templates/Paragraph").then(m => ({ default: m.Paragraph }))),

    // ═══════════════════════════════════════════════════════════════════════
    // TEACHING & SCORING (2)
    // ═══════════════════════════════════════════════════════════════════════
    Lesson: lazy(() => import("@/components/templates/Lesson").then(m => ({ default: m.Lesson }))),
    Scorecard: lazy(() => import("@/components/templates/Scorecard").then(m => ({ default: m.Scorecard }))),

    // ═══════════════════════════════════════════════════════════════════════
    // NARRATIVE & STORYTELLING (6)
    // ═══════════════════════════════════════════════════════════════════════
    BeforeAfter: lazy(() => import("@/components/templates/BeforeAfter").then(m => ({ default: m.BeforeAfter }))),
    PersonaCard: lazy(() => import("@/components/templates/PersonaCard").then(m => ({ default: m.PersonaCard }))),
    Diagram: lazy(() => import("@/components/templates/Diagram").then(m => ({ default: m.Diagram }))),
    Countdown: lazy(() => import("@/components/templates/Countdown").then(m => ({ default: m.Countdown }))),
    Testimonial: lazy(() => import("@/components/templates/Testimonial").then(m => ({ default: m.Testimonial }))),
    EraShift: lazy(() => import("@/components/templates/EraShift").then(m => ({ default: m.EraShift }))),
};

export const TEMPLATE_NAMES = Object.keys(TEMPLATE_REGISTRY);
