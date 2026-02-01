/**
 * ImageSingle - RICH GENERIC
 * Image carousel with badge, captions, thumbnails, and action phrases
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, LucideIcon, Zap, Maximize2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ImageItem {
    url?: string;
    prompt?: string;
    caption?: string;
    actionPhrase?: string;
}

interface ImageSingleProps {
    icon?: string;
    badge?: string;
    title?: string;
    subtitle?: string;
    imageUrl?: string;
    imagePrompt?: string;
    images?: ImageItem[];  // For carousel mode
    caption?: string;
    aspectRatio?: '16:9' | '4:3' | '1:1' | '21:9';
    showThumbnails?: boolean;
    imageActionPhrase?: string;  // Click action for main image
    ctaLabel?: string;
    ctaActionPhrase?: string;
    secondaryCtaLabel?: string;
    secondaryCtaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const ImageSingle: React.FC<ImageSingleProps> = ({
    icon,
    badge,
    title,
    subtitle,
    imageUrl,
    imagePrompt,
    images,
    caption,
    aspectRatio = '1:1',  // Default to square
    showThumbnails = false,
    imageActionPhrase,
    ctaLabel,
    ctaActionPhrase,
    secondaryCtaLabel,
    secondaryCtaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    // Build image array - support single image or multiple
    const allImages: ImageItem[] = images || (imageUrl || imagePrompt ? [{ url: imageUrl, prompt: imagePrompt, caption }] : []);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => setCurrentIndex((i) => (i + 1) % allImages.length);
    const prevImage = () => setCurrentIndex((i) => (i - 1 + allImages.length) % allImages.length);

    const currentImage = allImages[currentIndex];
    const currentCaption = currentImage?.caption || caption;
    const currentActionPhrase = currentImage?.actionPhrase || imageActionPhrase;

    const IconComp = getIcon(icon);

    const aspectClass = {
        '16:9': 'aspect-video',
        '4:3': 'aspect-[4/3]',
        '1:1': 'aspect-square',
        '21:9': 'aspect-[21/9]',
    }[aspectRatio];

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {/* Header */}
            {(badge || icon || title || subtitle) && (
                <div className="mb-6">
                    {(badge || icon) && (
                        <div className="flex items-center gap-3 mb-4">
                            {icon && (
                                <div className="w-12 h-12 rounded-xl bg-sapphire/10 border border-sapphire/20 flex items-center justify-center">
                                    <IconComp className="w-6 h-6 text-sapphire" />
                                </div>
                            )}
                            {badge && (
                                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sapphire/10 text-sapphire border border-sapphire/20">
                                    {badge}
                                </span>
                            )}
                        </div>
                    )}
                    {title && <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{title}</h2>}
                    {subtitle && <p className="text-mist/60">{subtitle}</p>}
                </div>
            )}

            {/* Main Image */}
            {allImages.length > 0 && (
                <div className="flex-grow flex flex-col">
                    <div
                        onClick={() => currentActionPhrase && handleAction(currentActionPhrase)}
                        className={`relative rounded-2xl overflow-hidden border border-white/[0.06] group ${currentActionPhrase ? 'cursor-pointer' : ''}`}
                    >
                        <div className={`${aspectClass} w-full`}>
                            <SmartImage
                                assetId={currentImage?.url || currentImage?.prompt || 'default-image'}
                                alt={title || currentCaption || 'Image'}
                                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>

                        {/* Carousel Controls */}
                        {allImages.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                                >
                                    <ChevronLeft className="w-6 h-6 text-white" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                                >
                                    <ChevronRight className="w-6 h-6 text-white" />
                                </button>

                                {/* Dots Indicator */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm">
                                    {allImages.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                                            className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'}`}
                                        />
                                    ))}
                                </div>

                                {/* Image Counter */}
                                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium">
                                    {currentIndex + 1} / {allImages.length}
                                </div>
                            </>
                        )}

                        {/* Expand Icon on Hover */}
                        {currentActionPhrase && (
                            <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Maximize2 className="w-5 h-5 text-white" />
                            </div>
                        )}
                    </div>

                    {/* Thumbnails (optional) */}
                    {showThumbnails && allImages.length > 1 && (
                        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                            {allImages.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all
                                        ${i === currentIndex ? 'border-sapphire ring-2 ring-sapphire/30' : 'border-white/[0.1] hover:border-white/30'}`}
                                >
                                    <SmartImage
                                        assetId={img.url || img.prompt || `thumb-${i}`}
                                        alt={`Thumbnail ${i + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Caption */}
            {currentCaption && (
                <div className="pt-4">
                    <p className="text-sm text-mist/50 italic">{currentCaption}</p>
                </div>
            )}

            {/* CTAs */}
            {(ctaLabel || secondaryCtaLabel) && (
                <div className="pt-6 flex flex-wrap gap-4">
                    {secondaryCtaLabel && secondaryCtaActionPhrase && (
                        <button
                            className="inline-flex items-center gap-3 px-6 py-3 bg-white/[0.05] border border-white/[0.1] text-white font-semibold rounded-full 
                                hover:bg-white/[0.1] transition-all"
                            onClick={() => handleAction(secondaryCtaActionPhrase)}
                        >
                            {secondaryCtaLabel}
                        </button>
                    )}
                    {ctaLabel && ctaActionPhrase && (
                        <button
                            className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                                hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                                transition-all duration-200 text-lg shadow-lg shadow-flamingo/20"
                            onClick={() => handleAction(ctaActionPhrase)}
                        >
                            {ctaLabel}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageSingle;
