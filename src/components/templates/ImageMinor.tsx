/**
 * ImageMinor - GENERIC
 * 1/3 image with 2/3 text content
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
    title: string;
    description?: string;
}

interface ImageMinorProps {
    imageUrl?: string;
    imagePrompt?: string;
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

export const ImageMinor: React.FC<ImageMinorProps> = ({
    imageUrl,
    imagePrompt,
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
        <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
            <div className="aspect-[3/4] w-full">
                <SmartImage
                    assetId={imageUrl || imagePrompt || 'default-image'}
                    alt={title || 'Image'}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );

    const contentSection = (
        <div className="md:col-span-2 p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] flex flex-col">
            {(title || subtitle) && (
                <div className="mb-6">
                    {subtitle && <div className="text-sm text-sapphire font-semibold uppercase tracking-wider mb-2">{subtitle}</div>}
                    {title && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h2>}
                </div>
            )}

            {description && <p className="text-lg text-mist/60 mb-6 leading-relaxed">{description}</p>}

            {items && items.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4 flex-grow">
                    {items.map((item, i) => {
                        const IconComp = getIcon(item.icon);
                        return (
                            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-sapphire/10 border border-sapphire/20 flex items-center justify-center">
                                        <IconComp className="w-4 h-4 text-sapphire" />
                                    </div>
                                    <h4 className="font-bold text-white">{item.title}</h4>
                                </div>
                                {item.description && <p className="text-sm text-mist/50 ml-11">{item.description}</p>}
                            </div>
                        );
                    })}
                </div>
            )}

            {ctaLabel && ctaActionPhrase && (
                <div className="pt-6 flex justify-end">
                    <button
                        className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                            hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                            transition-all duration-200 text-lg shadow-lg shadow-flamingo/20"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
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

export default ImageMinor;
