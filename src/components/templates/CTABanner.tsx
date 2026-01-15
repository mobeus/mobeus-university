/**
 * CTABanner
 * Full-width call-to-action banner with gradient
 * 
 * USE WHEN: Primary action, "get started", "next steps", conversion
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: CTA button is clickable → notifyTele
 */

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface CTABannerProps {
    headline: string;
    subheadline?: string;
    ctaLabel: string;
    ctaActionPhrase: string;
    variant?: 'primary' | 'secondary' | 'gradient';
}

export const CTABanner: React.FC<CTABannerProps> = ({
    headline,
    subheadline,
    ctaLabel,
    ctaActionPhrase,
    variant = 'gradient',
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return 'bg-sapphire/20 border-sapphire/30';
            case 'secondary':
                return 'bg-jade/20 border-jade/30';
            default:
                return 'bg-gradient-to-r from-sapphire/20 via-amethyst/20 to-flamingo/20 border-mist/20';
        }
    };

    return (
        <div className="glass-template-container">
            <div className={`rounded-2xl p-8 md:p-12 border ${getVariantStyles()} text-center`}>
                <div className="flex justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-turmeric" />
                </div>
                <h2 className="text-template-title text-2xl md:text-3xl mb-3">{headline}</h2>
                {subheadline && (
                    <p className="text-template-content text-lg mb-6 max-w-2xl mx-auto">
                        {subheadline}
                    </p>
                )}
                <button
                    className="btn-cta text-lg px-8 py-3 glass-card-clickable"
                    onClick={() => handleAction(ctaActionPhrase)}
                >
                    {ctaLabel}
                    <ArrowRight className="w-5 h-5 ml-2" />
                </button>
            </div>
        </div>
    );
};

export default CTABanner;
