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

    const asset = ASSET_REGISTRY[assetId];
    const fallbackAsset = fallbackAssetId ? ASSET_REGISTRY[fallbackAssetId] : null;

    useEffect(() => {
        // Reset state when assetId changes
        setError(false);
        setGeneratedUrl(null);
        setGenerationError(null);
        setIsGenerating(false);
        setUseFallback(false);

        // CACHE CHECK:
        if (GENERATED_IMAGE_CACHE[assetId]) {
            setGeneratedUrl(GENERATED_IMAGE_CACHE[assetId]);
        } else if (!asset && assetId) {
            // Not in registry, treat as prompt -> Auto-Generate
            generateImage(assetId);
        }
    }, [assetId, asset]);

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
                className={`transition-opacity duration-500 opacity-100 ${className}`}
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
                className={className}
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
                className={className}
                {...props}
            />
        );
    }

    // Case 5: Error State (no fallback, show retry)
    return (
        <div ref={ref as React.LegacyRef<HTMLDivElement>} className={`relative group flex flex-col items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center overflow-hidden min-h-[200px] ${className}`}>
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5" />

            {/* Icon with glow */}
            <div className="relative mb-4">
                <div className="absolute inset-0 bg-red-500/10 blur-xl rounded-full" />
                <ImageOff className="w-12 h-12 text-red-400/80 relative z-10" />
            </div>

            {/* Error message */}
            <h3 className="text-sm font-semibold text-white/90 mb-2">Image Unavailable</h3>
            <p className="text-xs text-white/50 mb-4 max-w-[240px] leading-relaxed">
                {generationError ? `Generation error: ${generationError}` : (error ? "Failed to load image" : "Unknown Asset ID")}
            </p>

            {/* Prompt display */}
            {showPromptOnMissing && (
                <div className="w-full max-w-[280px] bg-black/30 backdrop-blur-sm border border-white/5 rounded-lg p-3 text-left mb-4">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Source</p>
                    <p className="text-xs text-white/60 italic leading-relaxed line-clamp-3">"{assetId}"</p>
                </div>
            )}

            {/* Retry button */}
            <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-white/80 hover:text-white transition-all duration-300"
                onClick={() => generateImage(assetId)}
            >
                <RefreshCw className="w-3 h-3" />
                Try Again
            </Button>
        </div>
    );
});
