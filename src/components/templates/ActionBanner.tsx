/**
 * ActionBanner - CTA banner
 * Reusable for any call to action
 * 
 * HIERARCHY: Glance (headline) → Look (subheadline) → Read (CTA)
 */

import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ActionBannerProps {
    headline: string;
    subheadline?: string;
    ctaLabel: string;
    ctaActionPhrase?: string;
    ctaExternalUrl?: string;
    secondaryCtaLabel?: string;
    secondaryCtaActionPhrase?: string;
    color?: 'flamingo' | 'sapphire' | 'jade' | 'turmeric';
    isCompact?: boolean;
}

const colorMap = {
    flamingo: { bg: 'bg-flamingo', hover: 'hover:bg-flamingo/90' },
    sapphire: { bg: 'bg-sapphire', hover: 'hover:bg-sapphire/90' },
    jade: { bg: 'bg-jade', hover: 'hover:bg-jade/90' },
    turmeric: { bg: 'bg-turmeric', hover: 'hover:bg-turmeric/90' },
};

export const ActionBanner: React.FC<ActionBannerProps> = ({
    headline,
    subheadline,
    ctaLabel,
    ctaActionPhrase,
    ctaExternalUrl,
    secondaryCtaLabel,
    secondaryCtaActionPhrase,
    color = 'flamingo',
    isCompact = false,
}) => {
    const { playClick } = useSound();
    const colors = colorMap[color];

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const handleExternalLink = () => {
        playClick();
        if (ctaExternalUrl) {
            window.open(ctaExternalUrl, '_blank');
        }
    };

    if (isCompact) {
        return (
            <div className={`p-4 rounded-xl ${colors.bg} flex items-center justify-between flex-wrap gap-4`}>
                <div>
                    <h3 className="text-lg font-semibold text-white">{headline}</h3>
                    {subheadline && <p className="text-sm text-white/70">{subheadline}</p>}
                </div>
                <button
                    className="px-6 py-2 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition-all flex items-center gap-2"
                    onClick={ctaExternalUrl ? handleExternalLink : () => ctaActionPhrase && handleAction(ctaActionPhrase)}
                >
                    {ctaLabel}
                    {ctaExternalUrl ? <ExternalLink className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
            </div>
        );
    }

    return (
        <div className={`glass-template-container p-8 rounded-2xl ${colors.bg}`}>
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{headline}</h1>
                {subheadline && (
                    <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">{subheadline}</p>
                )}

                <div className="flex justify-center gap-4 flex-wrap">
                    <button
                        className={`inline-flex items-center gap-2 px-8 py-4 bg-white text-obsidian font-semibold rounded-full hover:bg-white/90 transition-all text-lg`}
                        onClick={ctaExternalUrl ? handleExternalLink : () => ctaActionPhrase && handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        {ctaExternalUrl ? <ExternalLink className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                    </button>

                    {secondaryCtaLabel && secondaryCtaActionPhrase && (
                        <button
                            className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all text-lg"
                            onClick={() => handleAction(secondaryCtaActionPhrase)}
                        >
                            {secondaryCtaLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActionBanner;
