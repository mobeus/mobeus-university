import React, { lazy } from "react";

/**
 * TEMPLATE REGISTRY - MERCEDES-BENZ CONFIGURATION
 * 
 * Templates for the Varya configuration experience.
 * All templates are lazy-loaded for performance.
 * 
 * VOLUMETRIC NAVIGATION: Every clickable element calls notifyTele(actionPhrase)
 */
export const TEMPLATE_REGISTRY: Record<string, React.FC<any>> = {

    /**
     * CardGrid
     * USE WHEN: Model selection, navigation menus, option cards, comparisons
     * PROPS: { cards[{ title, description?, badge?, actionPhrase }], columns?: 2|3|4 }
     */
    CardGrid: lazy(() => import("@/components/templates/CardGrid").then(m => ({ default: m.CardGrid }))),

    /**
     * VehicleShowcase
     * USE WHEN: Displaying a single vehicle with AI-generated image, specs, and configuration options
     * PROPS: { model, tagline?, price?, imagePrompt?, specs?[], highlights?[], ctaLabel?, ctaActionPhrase?, secondaryActions?[] }
     */
    VehicleShowcase: lazy(() => import("@/components/templates/VehicleShowcase").then(m => ({ default: m.VehicleShowcase }))),

    /**
     * PackageSelector
     * USE WHEN: Showing available packages with live selection, running total
     * PROPS: { title?, subtitle?, vehicleModel?, packages?[], basePrice?, confirmActionPhrase?, nextStepActionPhrase?, nextStepLabel? }
     */
    PackageSelector: lazy(() => import("@/components/templates/PackageSelector").then(m => ({ default: m.PackageSelector }))),

};
