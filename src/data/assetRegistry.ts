/**
 * Fiserv DMA Asset Registry
 * Pre-generated assets for Enterprise Merchant Acquisition Platform
 * 
 * Usage: Pass assetId to SmartImage component
 * - If assetId exists here → loads local file instantly
 * - If assetId NOT here → SmartImage treats it as a prompt and generates via AI
 * 
 * ONLY assets that ACTUALLY EXIST in /public/assets are listed here.
 */

export interface AssetDefinition {
    id: string;
    path: string;
    alt: string;
    description: string;
    generationPrompt: string;
    category: "avatar" | "platform" | "badge" | "dashboard" | "hero" | "ui" | "icon";
}

export const ASSET_REGISTRY: Record<string, AssetDefinition> = {
    // ========================================
    // UI ELEMENTS
    // ========================================
    "lesson-placeholder": {
        id: "lesson-placeholder",
        path: "/assets/lesson-placeholder.png",
        alt: "Placeholder",
        description: "Default content thumbnail",
        generationPrompt: "Minimal placeholder thumbnail, abstract gradient, clean business design",
        category: "ui"
    },

    // ========================================
    // PLATFORM VISUALS
    // ========================================
    "merchant-onboarding": {
        id: "merchant-onboarding",
        path: "/assets/platform/merchant-onboarding.png",
        alt: "Merchant Onboarding",
        description: "Digital merchant application flow",
        generationPrompt: "Modern digital onboarding interface, merchant application form, progress indicators, clean business UI, emerald accent colors",
        category: "platform"
    },
    "transaction-dashboard": {
        id: "transaction-dashboard",
        path: "/assets/platform/transaction-dashboard.png",
        alt: "Transaction Dashboard",
        description: "Real-time transaction visibility",
        generationPrompt: "Transaction monitoring dashboard, real-time data visualization, card type breakdown charts, modern fintech UI",
        category: "dashboard"
    },
    "settlement-view": {
        id: "settlement-view",
        path: "/assets/platform/settlement-view.png",
        alt: "Settlement View",
        description: "Fee transparency and reconciliation",
        generationPrompt: "Financial settlement interface, itemized fee breakdown, gross-to-net visualization, clean accounting UI",
        category: "dashboard"
    },
    "risk-signals": {
        id: "risk-signals",
        path: "/assets/platform/risk-signals.png",
        alt: "Risk Signals",
        description: "Fraud detection and early warning",
        generationPrompt: "Risk monitoring dashboard, fraud alert indicators, compliance status, security-focused fintech UI",
        category: "dashboard"
    },
};

// Helper: Get all assets by category
export const getAssetsByCategory = (category: AssetDefinition["category"]): AssetDefinition[] => {
    return Object.values(ASSET_REGISTRY).filter(asset => asset.category === category);
};

// Helper: Check if asset exists
export const assetExists = (assetId: string): boolean => {
    return assetId in ASSET_REGISTRY;
};

// All available asset IDs for documentation
export const ALL_ASSET_IDS = Object.keys(ASSET_REGISTRY);
