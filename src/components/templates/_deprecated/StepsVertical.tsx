/**
 * StepsVertical - GENERIC
 * Classic vertical timeline with connectors and images
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, Check } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface Step {
    icon?: string;
    number?: number;
    title: string;
    description?: string;
    imageUrl?: string;
    imagePrompt?: string;
    completed?: boolean;
    current?: boolean;
    actionPhrase?: string;
}

interface StepsVerticalProps {
    headline?: string;
    subtitle?: string;
    steps?: Step[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const StepsVertical: React.FC<StepsVerticalProps> = ({
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
                <div className="pb-8">
                    {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                    {subtitle && <p className="text-mist/60 mt-2">{subtitle}</p>}
                </div>
            )}

            {steps && steps.length > 0 && (
                <div className="flex-grow relative">
                    {/* Connector line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sapphire/50 via-sapphire/30 to-transparent" />

                    <div className="space-y-8">
                        {steps.map((step, i) => {
                            const IconComp = getIcon(step.icon);
                            const isCompleted = step.completed;
                            const isCurrent = step.current;

                            return (
                                <div
                                    key={i}
                                    onClick={() => step.actionPhrase && handleAction(step.actionPhrase)}
                                    className={`relative flex gap-6 ${step.actionPhrase ? 'cursor-pointer' : ''}`}
                                >
                                    {/* Step marker */}
                                    <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                                        ${isCompleted ? 'bg-jade text-white' :
                                            isCurrent ? 'bg-sapphire text-white ring-4 ring-sapphire/30' :
                                                'bg-white/[0.05] border border-white/[0.1] text-mist/50'}`}>
                                        {isCompleted ? <Check className="w-5 h-5" /> :
                                            step.number !== undefined ? <span className="font-bold">{step.number}</span> :
                                                <IconComp className="w-5 h-5" />}
                                    </div>

                                    {/* Content */}
                                    <div className={`flex-grow p-5 rounded-2xl border transition-all
                                        ${isCurrent ? 'bg-sapphire/10 border-sapphire/30' :
                                            'bg-gradient-to-b from-white/[0.04] to-transparent border-white/[0.06] hover:border-white/[0.1]'}`}>
                                        <div className="flex gap-5">
                                            {(step.imageUrl || step.imagePrompt) && (
                                                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                                    <SmartImage
                                                        assetId={step.imageUrl || step.imagePrompt || `step-${i}`}
                                                        alt={step.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <h3 className={`text-lg font-bold mb-1 ${isCurrent ? 'text-white' : isCompleted ? 'text-jade' : 'text-white'}`}>
                                                    {step.title}
                                                </h3>
                                                {step.description && <p className="text-sm text-mist/60">{step.description}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {ctaLabel && ctaActionPhrase && (
                <div className="pt-8 flex justify-end">
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

export default StepsVertical;
