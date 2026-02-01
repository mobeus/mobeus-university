/**
 * AIworks Asset Registry
 * 
 * Usage: Pass assetId to SmartImage component
 * - If assetId exists here → loads local file instantly
 * - If assetId NOT here → SmartImage treats it as a prompt and generates via AI
 * 
 * Categories:
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
    category: "avatar" | "platform" | "badge" | "dashboard" | "hero" | "ui" | "icon";
}

// Asset Registry - Empty: All images will be live-generated
// SmartImage will treat any assetId as a prompt and generate via AI
export const ASSET_REGISTRY: Record<string, AssetDefinition> = {
    // No pre-registered assets — all images are live-generated using cinematic prompts
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
