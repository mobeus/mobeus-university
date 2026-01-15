/**
 * PricingCards
 * Pricing tier comparison
 * 
 * USE WHEN: Pricing options, packages, tier comparison
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each card/CTA is clickable → notifyTele
 */

import React from 'react';
import { Check, Star } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface PricingTier {
    name: string;
    price: string;
    period?: string;
    description?: string;
    features: string[];
    highlighted?: boolean;
    ctaLabel?: string;
    actionPhrase: string;
}

interface PricingCardsProps {
    tiers: PricingTier[];
}

export const PricingCards: React.FC<PricingCardsProps> = ({
    tiers = [],
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            <div className="template-grid-3">
                {tiers?.map((tier, index) => (
                    <div
                        key={index}
                        className={`glass-card-clickable relative ${tier.highlighted
                                ? 'glass-card-featured border-sapphire/40'
                                : 'glass-card-standard'
                            }`}
                        onClick={() => handleAction(tier.actionPhrase)}
                    >
                        {tier.highlighted && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                <span className="bg-sapphire text-onyx text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                    <Star className="w-3 h-3" />
                                    Popular
                                </span>
                            </div>
                        )}

                        <div className="text-center mb-4">
                            <h3 className="text-template-subtitle text-lg mb-1">{tier.name}</h3>
                            <div className="text-template-title text-3xl font-bold">
                                {tier.price}
                                {tier.period && (
                                    <span className="text-template-content text-sm font-normal">/{tier.period}</span>
                                )}
                            </div>
                            {tier.description && (
                                <p className="text-template-content text-sm mt-2">{tier.description}</p>
                            )}
                        </div>

                        <div className="template-divider mb-4" />

                        <div className="space-y-2 mb-6">
                            {tier.features?.map((feature, fIndex) => (
                                <div key={fIndex} className="flex items-start gap-2">
                                    <Check className={`w-5 h-5 flex-shrink-0 ${tier.highlighted ? 'text-sapphire' : 'text-jade'
                                        }`} />
                                    <span className="text-template-content text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button className={`w-full py-2 rounded-lg font-medium transition-colors ${tier.highlighted
                                ? 'bg-sapphire text-onyx hover:bg-sapphire/80'
                                : 'bg-mist/10 text-mist hover:bg-mist/20'
                            }`}>
                            {tier.ctaLabel || 'Get Started'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingCards;
