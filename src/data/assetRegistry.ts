/**
 * AIworks Asset Registry
 * 
 * Usage: Pass assetId to SmartImage component
 * - If assetId exists here → loads local file instantly
 * - If assetId NOT here → SmartImage treats it as a prompt and generates via AI
 * 
 * Categories:
 * - adp: AI/Works Development Platform assets
 * - avatar: Profile images
 * - platform: General platform images
 * - badge: Status and category badges
 * - dashboard: Dashboard UI elements
 * - hero: Hero/banner images
 * - ui: Generic UI elements
 * - icon: Icon assets
 */

export interface AssetDefinition {
    id: string;
    path: string;
    alt: string;
    description: string;
    generationPrompt: string;
    category: "adp" | "avatar" | "platform" | "badge" | "dashboard" | "hero" | "ui" | "icon";
}

// Asset Registry - Pre-generated images for instant loading
export const ASSET_REGISTRY: Record<string, AssetDefinition> = {
    // ==========================================
    // ADP (AI/Works Development Platform) ASSETS
    // ==========================================

    "adp-architecture": {
        id: "adp-architecture",
        path: "/assets/adp/aiworks-architecture.png",
        alt: "AI/Works Platform Enterprise Architecture",
        description: "Enterprise architecture diagram showing AI/Works platform components including AI agents, microservices, cloud infrastructure, data lake, API gateway, and user interface",
        generationPrompt: "Modern enterprise software architecture diagram showing AI/Works platform components, dark teal and white color scheme, clean professional tech illustration",
        category: "adp"
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
