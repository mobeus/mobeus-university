/**
 * ComparisonTable - Side by side comparison
 * Reusable for any before/after or option comparison
 * 
 * HIERARCHY: Glance (options) → Look (features) → Read (details)
 */

import React from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ComparisonOption {
    title: string;
    subtitle?: string;
    badge?: string;
    isHighlighted?: boolean;
    features: Array<{
        name: string;
        value: string | boolean;
        detail?: string;
    }>;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

interface ComparisonTableProps {
    headline?: string;
    subheadline?: string;
    options: ComparisonOption[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
    headline,
    subheadline,
    options,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            {headline && (
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{headline}</h1>
                    {subheadline && <p className="text-lg text-mist/70">{subheadline}</p>}
                </div>
            )}

            <div className={`grid md:grid-cols-${options.length} gap-4 mb-8`}>
                {options.map((option, optionIndex) => (
                    <div
                        key={optionIndex}
                        className={`rounded-2xl border p-6 ${option.isHighlighted
                                ? 'bg-flamingo/10 border-flamingo/30'
                                : 'bg-obsidian/30 border-mist/10'
                            }`}
                    >
                        {/* Header */}
                        <div className="text-center mb-6 pb-6 border-b border-mist/10">
                            {option.badge && (
                                <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-2 ${option.isHighlighted ? 'bg-flamingo text-white' : 'bg-mist/20 text-mist/70'
                                    }`}>
                                    {option.badge}
                                </span>
                            )}
                            <h3 className="text-2xl font-bold text-white">{option.title}</h3>
                            {option.subtitle && (
                                <p className="text-sm text-mist/60 mt-1">{option.subtitle}</p>
                            )}
                        </div>

                        {/* Features */}
                        <div className="space-y-4">
                            {option.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-start gap-3">
                                    {/* Check/X or Value */}
                                    {typeof feature.value === 'boolean' ? (
                                        feature.value ? (
                                            <div className="w-5 h-5 rounded-full bg-jade/20 flex items-center justify-center flex-shrink-0">
                                                <Check className="w-3 h-3 text-jade" />
                                            </div>
                                        ) : (
                                            <div className="w-5 h-5 rounded-full bg-coral/20 flex items-center justify-center flex-shrink-0">
                                                <X className="w-3 h-3 text-coral" />
                                            </div>
                                        )
                                    ) : (
                                        <span className={`text-sm font-medium flex-shrink-0 ${option.isHighlighted ? 'text-flamingo' : 'text-jade'
                                            }`}>
                                            {feature.value}
                                        </span>
                                    )}

                                    {/* Feature Name */}
                                    <div>
                                        <span className="text-sm text-white">{feature.name}</span>
                                        {feature.detail && (
                                            <p className="text-xs text-mist/50 mt-0.5">{feature.detail}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Option CTA */}
                        {option.ctaLabel && option.ctaActionPhrase && (
                            <button
                                className={`w-full mt-6 py-3 rounded-xl font-semibold transition-all ${option.isHighlighted
                                        ? 'bg-flamingo text-white hover:bg-flamingo/90'
                                        : 'border border-mist/30 text-white hover:bg-mist/10'
                                    }`}
                                onClick={() => handleAction(option.ctaActionPhrase!)}
                            >
                                {option.ctaLabel}
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {ctaLabel && ctaActionPhrase && (
                <div className="text-center">
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

export default ComparisonTable;
