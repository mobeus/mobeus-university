/**
 * StepsNumbered - GENERIC
 * Big numbered steps with visual emphasis
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface NumberedStep {
    icon?: string;
    title: string;
    description?: string;
    imageUrl?: string;
    imagePrompt?: string;
    highlight?: boolean;
    actionPhrase?: string;
}

interface StepsNumberedProps {
    headline?: string;
    subtitle?: string;
    steps?: NumberedStep[];
    columns?: 1 | 2 | 3;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const StepsNumbered: React.FC<StepsNumberedProps> = ({
    headline,
    subtitle,
    steps,
    columns = 3,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const colClass = {
        1: 'grid-cols-1 max-w-2xl',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
    }[columns];

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {(headline || subtitle) && (
                <div className="text-center pb-10">
                    {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                    {subtitle && <p className="text-mist/60 mt-2">{subtitle}</p>}
                </div>
            )}

            {steps && steps.length > 0 && (
                <div className={`grid ${colClass} gap-6 flex-grow`}>
                    {steps.map((step, i) => {
                        const IconComp = getIcon(step.icon);

                        return (
                            <div
                                key={i}
                                onClick={() => step.actionPhrase && handleAction(step.actionPhrase)}
                                className={`group relative glass-medium rounded-2xl p-8 text-center
                                    hover:scale-[1.02] transition-all duration-300
                                    ${step.actionPhrase ? 'cursor-pointer' : ''}`}
                            >
                                {/* Premium Gradient Number Circle */}
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6
                                    text-3xl font-bold transition-all duration-300 group-hover:scale-110
                                    ${step.highlight
                                        ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--gradient-end)] text-white shadow-xl shadow-[var(--color-primary)]/30'
                                        : 'glass-heavy text-white'}`}>
                                    {i + 1}
                                </div>

                                {/* Image */}
                                {(step.imageUrl || step.imagePrompt) && (
                                    <div className="w-full aspect-video rounded-xl overflow-hidden mb-5 glass-light">
                                        <SmartImage
                                            assetId={step.imageUrl || step.imagePrompt || `step-${i}`}
                                            alt={step.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Icon (if no image) */}
                                {!(step.imageUrl || step.imagePrompt) && step.icon && (
                                    <div className="w-14 h-14 mx-auto mb-5 rounded-xl glass-medium
                                        flex items-center justify-center border border-[var(--color-primary)]/20">
                                        <IconComp className="w-7 h-7 text-[var(--color-primary)]" />
                                    </div>
                                )}

                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                {step.description && (
                                    <p className="text-mist/70 leading-relaxed">{step.description}</p>
                                )}

                                {/* Connector line (for single column) */}
                                {columns === 1 && i < steps.length - 1 && (
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0.5 h-6 
                                        bg-gradient-to-b from-[var(--color-primary)]/50 to-transparent" />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {ctaLabel && ctaActionPhrase && (
                <div className="pt-10 flex justify-center">
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
};

export default StepsNumbered;
