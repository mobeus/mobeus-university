/**
 * Feature - GENERIC
 * Feature spotlight with 50/50 image and text
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, Check } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface FeaturePoint {
    icon?: string;
    text: string;
}

interface FeatureProps {
    imageUrl?: string;
    imagePrompt?: string;
    badge?: string;
    title?: string;
    description?: string;
    points?: FeaturePoint[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
    secondaryLabel?: string;
    secondaryPhrase?: string;
    reversed?: boolean;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Check;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Check;
};

export const Feature: React.FC<FeatureProps> = ({
    imageUrl,
    imagePrompt,
    badge,
    title,
    description,
    points,
    ctaLabel,
    ctaActionPhrase,
    secondaryLabel,
    secondaryPhrase,
    reversed = false,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const imageSection = (
        <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
            <div className="aspect-square">
                <SmartImage
                    assetId={imageUrl || imagePrompt || 'feature'}
                    alt={title || 'Feature'}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );

    const contentSection = (
        <div className="flex flex-col justify-center p-6 md:p-8">
            {badge && (
                <div className="inline-flex self-start mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sapphire/10 text-sapphire border border-sapphire/20 uppercase tracking-wider">
                        {badge}
                    </span>
                </div>
            )}

            {title && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">{title}</h2>}
            {description && <p className="text-lg text-mist/60 mb-6 leading-relaxed">{description}</p>}

            {points && points.length > 0 && (
                <div className="space-y-3 mb-8">
                    {points.map((point, i) => {
                        const IconComp = getIcon(point.icon);
                        return (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-jade/10 border border-jade/20 flex items-center justify-center flex-shrink-0">
                                    <IconComp className="w-3 h-3 text-jade" />
                                </div>
                                <span className="text-mist/70">{point.text}</span>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="flex flex-wrap gap-3">
                {ctaLabel && ctaActionPhrase && (
                    <button
                        className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                            hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                            transition-all duration-200 shadow-lg shadow-flamingo/20"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                )}
                {secondaryLabel && secondaryPhrase && (
                    <button
                        className="inline-flex items-center gap-3 px-8 py-4 
                            bg-white/[0.05] border border-white/[0.1] text-white font-semibold rounded-full 
                            hover:bg-white/[0.1] transition-all"
                        onClick={() => handleAction(secondaryPhrase)}
                    >
                        {secondaryLabel}
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full">
            <div className="grid md:grid-cols-2 gap-8 h-full items-center">
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

export default Feature;
