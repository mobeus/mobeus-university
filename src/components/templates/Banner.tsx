/**
 * Banner - GENERIC
 * Full-width call-to-action banner
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface BannerProps {
    icon?: string;
    headline?: string;
    subheadline?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
    variant?: 'gradient' | 'solid' | 'outline';
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Banner: React.FC<BannerProps> = ({
    icon,
    headline,
    subheadline,
    ctaLabel,
    ctaActionPhrase,
    variant = 'gradient',
}) => {
    const { playClick } = useSound();
    const handleAction = () => { if (ctaActionPhrase) { playClick(); notifyTele(ctaActionPhrase); } };

    const IconComponent = icon ? getIcon(icon) : null;

    const bgClass = variant === 'gradient'
        ? 'bg-gradient-to-r from-sapphire/10 via-white/[0.02] to-flamingo/10 border-white/[0.08]'
        : variant === 'solid'
            ? 'bg-sapphire/10 border-sapphire/20'
            : 'bg-transparent border-white/[0.08]';

    return (
        <div className="glass-template-container h-full flex flex-col justify-center">
            <div className={`p-10 md:p-14 rounded-2xl border ${bgClass} flex-grow flex items-center`}>
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6 flex-grow">
                        {IconComponent && (
                            <div className="w-18 h-18 rounded-2xl bg-sapphire/10 border border-sapphire/20 
                                flex items-center justify-center flex-shrink-0 p-4">
                                <IconComponent className="w-10 h-10 text-sapphire" />
                            </div>
                        )}
                        <div className="flex flex-col">
                            {headline && <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{headline}</h3>}
                            {subheadline && <p className="text-lg text-mist/60">{subheadline}</p>}
                        </div>
                    </div>

                    {ctaLabel && ctaActionPhrase && (
                        <button
                            className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 
                                bg-flamingo text-white font-semibold rounded-full 
                                hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                                transition-all text-lg whitespace-nowrap shadow-lg shadow-flamingo/20"
                            onClick={handleAction}
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

export default Banner;
