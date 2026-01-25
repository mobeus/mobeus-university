/**
 * FeatureGrid - Grid of features with icons
 * Rich layout with consistent styling, hover effects, and action support
 * 
 * HIERARCHY: Glance (grid) → Look (icons + titles) → Read (descriptions)
 */

import React from 'react';
import {
    Star, Zap, Shield, Heart, Target, Award, Sparkles,
    Rocket, Crown, Diamond, Check, ArrowRight, ChevronRight
} from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Feature {
    icon?: 'star' | 'zap' | 'shield' | 'heart' | 'target' | 'award' | 'sparkles' | 'rocket' | 'crown' | 'diamond' | 'check';
    emoji?: string;
    title: string;
    description?: string;
    stat?: string;
    actionPhrase?: string;
}

interface FeatureGridProps {
    headline?: string;
    subheadline?: string;
    features?: Feature[];
    columns?: 2 | 3 | 4;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const iconMap = {
    star: Star, zap: Zap, shield: Shield, heart: Heart, target: Target,
    award: Award, sparkles: Sparkles, rocket: Rocket, crown: Crown, diamond: Diamond, check: Check,
};

export const FeatureGrid: React.FC<FeatureGridProps> = ({
    headline,
    subheadline,
    features = [],
    columns = 3,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const gridCols = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-3',
        4: 'grid-cols-2 md:grid-cols-4',
    };

    // DEFENSIVE: Ensure features is an array
    const safeFeatures = Array.isArray(features) ? features : [];

    // Filter out invalid features (must have at least a title)
    const validFeatures = safeFeatures.filter((f): f is Feature =>
        f && typeof f === 'object' && typeof f.title === 'string'
    );

    // If no valid features and no headline, return null to avoid empty render
    if (validFeatures.length === 0 && !headline && !ctaLabel) {
        return null;
    }

    return (
        <div className="glass-template-container space-y-6">
            {/* Headline */}
            {headline && (
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{headline}</h2>
                    {subheadline && <p className="text-mist/70">{subheadline}</p>}
                </div>
            )}

            {/* Feature Grid */}
            <div className={`grid ${gridCols[columns]} gap-4`}>
                {validFeatures.map((feature, index) => {
                    const IconComponent = iconMap[feature.icon || 'check'];
                    const hasAction = !!feature.actionPhrase;

                    return (
                        <div
                            key={index}
                            className={`p-5 rounded-xl bg-obsidian/40 border border-mist/10 transition-all ${hasAction ? 'cursor-pointer hover:border-sapphire/30 hover:bg-obsidian/60' : ''
                                }`}
                            onClick={() => feature.actionPhrase && handleAction(feature.actionPhrase)}
                        >
                            {/* Header Row */}
                            <div className="flex items-start justify-between mb-3">
                                {/* Icon or Emoji */}
                                {feature.emoji ? (
                                    <span className="text-3xl">{feature.emoji}</span>
                                ) : (
                                    <div className="w-12 h-12 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                                        <IconComponent className="w-6 h-6 text-sapphire" />
                                    </div>
                                )}

                                {/* Stat Badge */}
                                {feature.stat && (
                                    <span className="text-lg font-bold text-sapphire">{feature.stat}</span>
                                )}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>

                            {/* Description */}
                            {feature.description && (
                                <p className="text-sm text-mist/70 leading-relaxed">{feature.description}</p>
                            )}

                            {/* Action indicator */}
                            {hasAction && (
                                <div className="flex items-center gap-1 mt-3 text-xs text-sapphire">
                                    <span>Learn more</span>
                                    <ChevronRight className="w-3 h-3" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* CTA */}
            {ctaLabel && ctaActionPhrase && (
                <div className="text-center pt-4">
                    <button
                        className="inline-flex items-center gap-2 px-8 py-4 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all text-lg"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default FeatureGrid;
