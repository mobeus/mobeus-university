import React, { useState, useEffect } from "react";
import { ASSET_REGISTRY } from "@/data/assetRegistry";
import { ImageOff, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateMedia } from "@/utils/mobeusGenAI";
import { ImageGeneratingState } from "@/components/ui/ImageGeneratingState";

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    assetId: string;
    showPromptOnMissing?: boolean;
    onRegenerate?: () => void;
    fallbackAssetId?: string; // Fallback asset if generation fails
}

const GENERATED_IMAGE_CACHE: Record<string, string> = {};
const PLACEHOLDER_PATH = "/assets/lesson-placeholder.png";

export const SmartImage = React.forwardRef<HTMLImageElement, SmartImageProps>(({
    assetId,
    className = "",
    showPromptOnMissing = true,
    onRegenerate,
    fallbackAssetId,
    alt,
    ...props
}, ref) => {
    const [error, setError] = useState(false);
    const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState<string | null>(null);
    const [useFallback, setUseFallback] = useState(false);
    const [directPathError, setDirectPathError] = useState(false);

    // Check if assetId is a direct path (starts with / or http)
    const isDirectPath = assetId?.startsWith('/') || assetId?.startsWith('http');

    const asset = !isDirectPath ? ASSET_REGISTRY[assetId] : null;
    const fallbackAsset = fallbackAssetId ? ASSET_REGISTRY[fallbackAssetId] : null;

    useEffect(() => {
        // Reset state when assetId changes
        setError(false);
        setGeneratedUrl(null);
        setGenerationError(null);
        setIsGenerating(false);
        setUseFallback(false);
        setDirectPathError(false);

        // Skip generation if it's a direct path
        if (isDirectPath) {
            return;
        }

        // CACHE CHECK:
        if (GENERATED_IMAGE_CACHE[assetId]) {
            setGeneratedUrl(GENERATED_IMAGE_CACHE[assetId]);
        } else if (!asset && assetId) {
            // Not in registry, treat as prompt -> Auto-Generate
            generateImage(assetId);
        }
    }, [assetId, asset, isDirectPath]);

    const generateImage = async (prompt: string) => {
        // Double check cache before starting network request
        if (GENERATED_IMAGE_CACHE[prompt]) {
            setGeneratedUrl(GENERATED_IMAGE_CACHE[prompt]);
            return;
        }

        console.log("[SmartImage] Requesting generation for:", prompt);
        try {
            setIsGenerating(true);
            setGenerationError(null);

            const promptToUse = (asset && asset.generationPrompt) ? asset.generationPrompt : prompt;

            const url = await generateMedia({
                type: 'image',
                prompt: promptToUse,
                options: { size: '1792x1024' }
            });
            console.log("[SmartImage] Generation success. URL:", url);

            // Update cache and state
            GENERATED_IMAGE_CACHE[prompt] = url;
            setGeneratedUrl(url);
        } catch (err: any) {
            console.error("[SmartImage] Generation failed:", err);
            setGenerationError(err.message || "Generation failed");
            // Use fallback instead of showing error
            setUseFallback(true);
        } finally {
            setIsGenerating(false);
        }
    };

    // Case 0: Direct Path (starts with / or http) - use directly
    if (isDirectPath && !directPathError) {
        const src = assetId.startsWith('http')
            ? assetId
            : `${import.meta.env.BASE_URL}${assetId.startsWith('/') ? assetId.slice(1) : assetId}`;
        return (
            <img
                ref={ref}
                src={src}
                alt={alt || assetId}
                onError={() => {
                    console.warn(`[SmartImage] Direct path failed: ${assetId}. Falling back to generation...`);
                    setDirectPathError(true);
                    // Trigger generation using a descriptive prompt
                    generateImage(alt || assetId);
                }}
                className={`smart-image ${className}`}
                {...props}
            />
        );
    }

    // Case 1: Generating
    if (isGenerating) {
        return <ImageGeneratingState prompt={assetId} className={className} />;
    }

    // Case 2: Generated Image Available
    if (generatedUrl) {
        return (
            <img
                ref={ref}
                src={generatedUrl}
                alt={alt || assetId}
                onError={() => {
                    console.error("[SmartImage] Generated image load error");
                    setUseFallback(true);
                    setGeneratedUrl(null);
                }}
                className={`smart-image transition-opacity duration-500 opacity-100 ${className}`}
                {...props}
            />
        );
    }

    // Case 3: Registered Asset Available
    if (asset) {
        return (
            <img
                ref={ref}
                src={`${import.meta.env.BASE_URL}${asset.path.startsWith('/') ? asset.path.slice(1) : asset.path}`}
                alt={alt || asset.alt}
                onError={() => {
                    console.warn(`[SmartImage] Failed to load local asset: ${asset.path}. Attempting generation...`);
                    generateImage(assetId);
                }}
                className={`smart-image ${className}`}
                {...props}
            />
        );
    }

    // Case 4: Use Fallback (after generation failed)
    if (useFallback) {
        const fallbackPath = fallbackAsset ? fallbackAsset.path : PLACEHOLDER_PATH;
        return (
            <img
                ref={ref}
                src={`${import.meta.env.BASE_URL}${fallbackPath.startsWith('/') ? fallbackPath.slice(1) : fallbackPath}`}
                alt={alt || "Learning content"}
                className={`smart-image ${className}`}
                {...props}
            />
        );
    }

    // Case 5: Generation pending or failed - hide instead of showing error
    return null;
});
