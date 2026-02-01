/**
 * StepsIllustrated - GENERIC
 * Steps with large illustrations
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, ChevronRight, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface IllustratedStep {
    number?: number;
    icon?: string;
    title: string;
    description?: string;
    imageUrl?: string;
    imagePrompt?: string;
    tips?: string[];
    actionPhrase?: string;
}

interface StepsIllustratedProps {
    headline?: string;
    subtitle?: string;
    steps?: IllustratedStep[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const StepsIllustrated: React.FC<StepsIllustratedProps> = ({
    headline,
    subtitle,
    steps,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {(headline || subtitle) && (
                <div className="text-center pb-10">
                    {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                    {subtitle && <p className="text-mist/60 mt-2">{subtitle}</p>}
                </div>
            )}

            {steps && steps.length > 0 && (
                <div className="flex-grow space-y-12">
                    {steps.map((step, i) => {
                        const IconComp = getIcon(step.icon);
                        const isEven = i % 2 === 1;

                        return (
                            <div
                                key={i}
                                onClick={() => step.actionPhrase && handleAction(step.actionPhrase)}
                                className={`grid md:grid-cols-2 gap-8 items-center ${step.actionPhrase ? 'cursor-pointer' : ''}`}
                            >
                                {/* Image - alternates sides */}
                                <div className={`${isEven ? 'md:order-2' : ''}`}>
                                    <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] aspect-[4/3]">
                                        {(step.imageUrl || step.imagePrompt) ? (
                                            <SmartImage
                                                assetId={step.imageUrl || step.imagePrompt || `step-${i}`}
                                                alt={step.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-sapphire/20 to-flamingo/10 flex items-center justify-center">
                                                <IconComp className="w-20 h-20 text-mist/20" />
                                            </div>
                                        )}

                                        {/* Step number overlay */}
                                        {step.number !== undefined && (
                                            <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-sapphire text-white 
                                                flex items-center justify-center text-xl font-bold shadow-lg shadow-sapphire/30">
                                                {step.number}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`${isEven ? 'md:order-1 md:text-right' : ''}`}>
                                    {!step.number && (
                                        <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:justify-end' : ''}`}>
                                            <div className="w-10 h-10 rounded-lg bg-sapphire/10 border border-sapphire/20 
                                                flex items-center justify-center">
                                                <IconComp className="w-5 h-5 text-sapphire" />
                                            </div>
                                            <span className="text-sm text-sapphire font-semibold uppercase tracking-wider">
                                                Step {i + 1}
                                            </span>
                                        </div>
                                    )}

                                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                                    {step.description && (
                                        <p className="text-mist/60 mb-6 leading-relaxed">{step.description}</p>
                                    )}

                                    {step.tips && step.tips.length > 0 && (
                                        <div className={`space-y-2 ${isEven ? 'md:items-end' : ''}`}>
                                            {step.tips.map((tip, j) => (
                                                <div
                                                    key={j}
                                                    className={`flex items-center gap-2 ${isEven ? 'md:flex-row-reverse' : ''}`}
                                                >
                                                    <ChevronRight className="w-4 h-4 text-jade flex-shrink-0" />
                                                    <span className="text-sm text-mist/70">{tip}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
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

export default StepsIllustrated;
