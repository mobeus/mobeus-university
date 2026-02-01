/**
 * Template Registry v94.0
 * 
 * 75 Generic Templates — Content-agnostic, JSON-driven
 * No English defaults. All content comes from the LLM.
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
    Pricing: lazy(() => import("@/components/templates/Pricing").then(m => ({ default: m.Pricing }))),
    Accordion: lazy(() => import("@/components/templates/Accordion").then(m => ({ default: m.Accordion }))),

    // ═══════════════════════════════════════════════════════════════════════
    // CONTENT TEMPLATES (5)
    // ═══════════════════════════════════════════════════════════════════════
    Showcase: lazy(() => import("@/components/templates/Showcase").then(m => ({ default: m.Showcase }))),
    Guide: lazy(() => import("@/components/templates/Guide").then(m => ({ default: m.Guide }))),
    List: lazy(() => import("@/components/templates/List").then(m => ({ default: m.List }))),
    Timeline: lazy(() => import("@/components/templates/Timeline").then(m => ({ default: m.Timeline }))),
    Form: lazy(() => import("@/components/templates/Form").then(m => ({ default: m.Form }))),

    // ═══════════════════════════════════════════════════════════════════════
    // COMPARISON & DISPLAY TEMPLATES (5)
    // ═══════════════════════════════════════════════════════════════════════
    Compare: lazy(() => import("@/components/templates/Compare").then(m => ({ default: m.Compare }))),
    Team: lazy(() => import("@/components/templates/Team").then(m => ({ default: m.Team }))),
    Quote: lazy(() => import("@/components/templates/Quote").then(m => ({ default: m.Quote }))),
    Metric: lazy(() => import("@/components/templates/Metric").then(m => ({ default: m.Metric }))),
    Steps: lazy(() => import("@/components/templates/Steps").then(m => ({ default: m.Steps }))),

    // ═══════════════════════════════════════════════════════════════════════
    // CHART TEMPLATES (6)
    // ═══════════════════════════════════════════════════════════════════════
    ChartSingle: lazy(() => import("@/components/templates/ChartSingle").then(m => ({ default: m.ChartSingle }))),
    ChartDuo: lazy(() => import("@/components/templates/ChartDuo").then(m => ({ default: m.ChartDuo }))),
    ChartTrio: lazy(() => import("@/components/templates/ChartTrio").then(m => ({ default: m.ChartTrio }))),
    ChartMajor: lazy(() => import("@/components/templates/ChartMajor").then(m => ({ default: m.ChartMajor }))),
    ChartMinor: lazy(() => import("@/components/templates/ChartMinor").then(m => ({ default: m.ChartMinor }))),
    Dashboard: lazy(() => import("@/components/templates/Dashboard").then(m => ({ default: m.Dashboard }))),

    // ═══════════════════════════════════════════════════════════════════════
    // IMAGE TEMPLATES (6)
    // ═══════════════════════════════════════════════════════════════════════
    ImageSingle: lazy(() => import("@/components/templates/ImageSingle").then(m => ({ default: m.ImageSingle }))),
    ImageDuo: lazy(() => import("@/components/templates/ImageDuo").then(m => ({ default: m.ImageDuo }))),
    ImageTrio: lazy(() => import("@/components/templates/ImageTrio").then(m => ({ default: m.ImageTrio }))),
    ImageGallery: lazy(() => import("@/components/templates/ImageGallery").then(m => ({ default: m.ImageGallery }))),
    ImageMajor: lazy(() => import("@/components/templates/ImageMajor").then(m => ({ default: m.ImageMajor }))),
    ImageMinor: lazy(() => import("@/components/templates/ImageMinor").then(m => ({ default: m.ImageMinor }))),

    // ═══════════════════════════════════════════════════════════════════════
    // VIDEO TEMPLATES (4)
    // ═══════════════════════════════════════════════════════════════════════
    VideoSingle: lazy(() => import("@/components/templates/VideoSingle").then(m => ({ default: m.VideoSingle }))),
    VideoGallery: lazy(() => import("@/components/templates/VideoGallery").then(m => ({ default: m.VideoGallery }))),
    VideoMajor: lazy(() => import("@/components/templates/VideoMajor").then(m => ({ default: m.VideoMajor }))),
    VideoMinor: lazy(() => import("@/components/templates/VideoMinor").then(m => ({ default: m.VideoMinor }))),

    // ═══════════════════════════════════════════════════════════════════════
    // E-COMMERCE TEMPLATES (4)
    // ═══════════════════════════════════════════════════════════════════════
    Product: lazy(() => import("@/components/templates/Product").then(m => ({ default: m.Product }))),
    Cart: lazy(() => import("@/components/templates/Cart").then(m => ({ default: m.Cart }))),
    Wallet: lazy(() => import("@/components/templates/Wallet").then(m => ({ default: m.Wallet }))),
    Checkout: lazy(() => import("@/components/templates/Checkout").then(m => ({ default: m.Checkout }))),

    // ═══════════════════════════════════════════════════════════════════════
    // MAPS & LOCATION TEMPLATES (2)
    // ═══════════════════════════════════════════════════════════════════════
    MapSingle: lazy(() => import("@/components/templates/MapSingle").then(m => ({ default: m.MapSingle }))),
    MapDuo: lazy(() => import("@/components/templates/MapDuo").then(m => ({ default: m.MapDuo }))),

    // ═══════════════════════════════════════════════════════════════════════
    // DATA & UTILITY TEMPLATES (9)
    // ═══════════════════════════════════════════════════════════════════════
    Table: lazy(() => import("@/components/templates/Table").then(m => ({ default: m.Table }))),
    Infographic: lazy(() => import("@/components/templates/Infographic").then(m => ({ default: m.Infographic }))),
    Profile: lazy(() => import("@/components/templates/Profile").then(m => ({ default: m.Profile }))),
    Article: lazy(() => import("@/components/templates/Article").then(m => ({ default: m.Article }))),
    Feature: lazy(() => import("@/components/templates/Feature").then(m => ({ default: m.Feature }))),
    Testimonials: lazy(() => import("@/components/templates/Testimonials").then(m => ({ default: m.Testimonials }))),
    DataGrid: lazy(() => import("@/components/templates/DataGrid").then(m => ({ default: m.DataGrid }))),
    Paragraph: lazy(() => import("@/components/templates/Paragraph").then(m => ({ default: m.Paragraph }))),
    Notification: lazy(() => import("@/components/templates/Notification").then(m => ({ default: m.Notification }))),

    // ═══════════════════════════════════════════════════════════════════════
    // STEPS TEMPLATES (3) — Streamlined from 16
    // ═══════════════════════════════════════════════════════════════════════
    // Deprecated: StepsVertical, StepsHorizontal, StepsCards, StepsChecklist,
    // StepsRoadmap, StepsTimeline, StepsIllustrated, StepsAccordion, StepsTabbed,
    // StepsNumbered, StepsPhases, StepsMilestones, StepsSwipeable, StepsSplit
    StepsProgress: lazy(() => import("@/components/templates/StepsProgress").then(m => ({ default: m.StepsProgress }))),
    StepsFlow: lazy(() => import("@/components/templates/StepsFlow").then(m => ({ default: m.StepsFlow }))),


    // ═══════════════════════════════════════════════════════════════════════
    // TEACHING TEMPLATES (3) — v94.0 NEW
    // ═══════════════════════════════════════════════════════════════════════
    Lesson: lazy(() => import("@/components/templates/Lesson").then(m => ({ default: m.Lesson }))),
    Tutorial: lazy(() => import("@/components/templates/Tutorial").then(m => ({ default: m.Tutorial }))),
    Flashcards: lazy(() => import("@/components/templates/Flashcards").then(m => ({ default: m.Flashcards }))),

    // ═══════════════════════════════════════════════════════════════════════
    // RATING & TESTING TEMPLATES (4) — v94.0 NEW
    // ═══════════════════════════════════════════════════════════════════════
    Quiz: lazy(() => import("@/components/templates/Quiz").then(m => ({ default: m.Quiz }))),
    Assessment: lazy(() => import("@/components/templates/Assessment").then(m => ({ default: m.Assessment }))),
    Survey: lazy(() => import("@/components/templates/Survey").then(m => ({ default: m.Survey }))),
    Scorecard: lazy(() => import("@/components/templates/Scorecard").then(m => ({ default: m.Scorecard }))),

    // ═══════════════════════════════════════════════════════════════════════
    // TEXT-HEAVY TEMPLATES (3) — Long-form content layouts
    // ═══════════════════════════════════════════════════════════════════════
    TextImageLeft: lazy(() => import("@/components/templates/TextImageLeft").then(m => ({ default: m.TextImageLeft }))),
    TextImageRight: lazy(() => import("@/components/templates/TextImageRight").then(m => ({ default: m.TextImageRight }))),
    TwoColumns: lazy(() => import("@/components/templates/TwoColumns").then(m => ({ default: m.TwoColumns }))),
};

export const TEMPLATE_NAMES = Object.keys(TEMPLATE_REGISTRY);
