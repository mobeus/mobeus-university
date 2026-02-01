/**
 * ImageMajor - GENERIC
 * 2/3 large image with 1/3 text content
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ContentItem {
    icon?: string;
    text: string;
}

interface ImageMajorProps {
    imageUrl?: string;
    imagePrompt?: string;
    imageCaption?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    items?: ContentItem[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
    reversed?: boolean;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const ImageMajor: React.FC<ImageMajorProps> = ({
    imageUrl,
    imagePrompt,
    imageCaption,
    title,
    subtitle,
    description,
    items,
    ctaLabel,
    ctaActionPhrase,
    reversed = false,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const imageSection = (
        <div className="md:col-span-2 rounded-2xl overflow-hidden border border-white/[0.06]">
            <div className="aspect-[16/10] w-full">
                <SmartImage
                    assetId={imageUrl || imagePrompt || 'default-image'}
                    alt={title || imageCaption || 'Image'}
                    className="w-full h-full object-cover"
                />
            </div>
            {imageCaption && (
                <div className="p-4 bg-white/[0.02]">
                    <p className="text-sm text-mist/50 italic text-center">{imageCaption}</p>
                </div>
            )}
        </div>
    );

    const contentSection = (
        <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] flex flex-col">
            {(title || subtitle) && (
                <div className="mb-6">
                    {subtitle && <div className="text-sm text-sapphire font-semibold uppercase tracking-wider mb-2">{subtitle}</div>}
                    {title && <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>}
                </div>
            )}

            {description && <p className="text-mist/60 mb-6 leading-relaxed">{description}</p>}

            {items && items.length > 0 && (
                <div className="space-y-3 flex-grow">
                    {items.map((item, i) => {
                        const IconComp = getIcon(item.icon);
                        return (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                <IconComp className="w-4 h-4 text-sapphire flex-shrink-0" />
                                <span className="text-sm text-mist/70">{item.text}</span>
                            </div>
                        );
                    })}
                </div>
            )}

            {ctaLabel && ctaActionPhrase && (
                <button
                    className="mt-6 w-full inline-flex items-center justify-center gap-3 px-6 py-4 
                        bg-flamingo text-white font-semibold rounded-full 
                        hover:bg-flamingo/90 transition-all shadow-lg shadow-flamingo/20"
                    onClick={() => handleAction(ctaActionPhrase)}
                >
                    {ctaLabel}
                    <ArrowRight className="w-5 h-5" />
                </button>
            )}
        </div>
    );

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full">
            <div className="grid md:grid-cols-3 gap-6 h-full">
                {reversed ? (
                    <>
                        {contentSection}
                        {imageSection}
                    </>
                ) : (
                    <>
                        {imageSection}
                        {contentSection}
                    </>
                )}
            </div>
        </div>
    );
};

export default ImageMajor;
