/**
 * Infographic - GENERIC
 * 2/3 infographic with 1/3 supporting content
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface InfoPoint {
    icon?: string;
    label: string;
    value: string;
    description?: string;
}

interface InfographicProps {
    imageUrl?: string;
    imagePrompt?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    points?: InfoPoint[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Infographic: React.FC<InfographicProps> = ({
    imageUrl,
    imagePrompt,
    title,
    subtitle,
    description,
    points,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full">
            <div className="grid md:grid-cols-3 gap-6 h-full">
                {/* 2/3 Infographic Image */}
                <div className="md:col-span-2 rounded-2xl overflow-hidden border border-white/[0.06]">
                    <SmartImage
                        assetId={imageUrl || imagePrompt || 'infographic'}
                        alt={title || 'Infographic'}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* 1/3 Content */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] flex flex-col">
                    {(title || subtitle) && (
                        <div className="mb-6">
                            {subtitle && <div className="text-sm text-sapphire font-semibold uppercase tracking-wider mb-2">{subtitle}</div>}
                            {title && <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>}
                        </div>
                    )}

                    {description && <p className="text-mist/60 mb-6 leading-relaxed">{description}</p>}

                    {points && points.length > 0 && (
                        <div className="space-y-4 flex-grow">
                            {points.map((point, i) => {
                                const IconComp = getIcon(point.icon);
                                return (
                                    <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-lg bg-sapphire/10 border border-sapphire/20 flex items-center justify-center">
                                                <IconComp className="w-4 h-4 text-sapphire" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-mist/40">{point.label}</div>
                                                <div className="text-lg font-bold text-white">{point.value}</div>
                                            </div>
                                        </div>
                                        {point.description && (
                                            <p className="text-xs text-mist/50 ml-11">{point.description}</p>
                                        )}
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
            </div>
        </div>
    );
};

export default Infographic;
