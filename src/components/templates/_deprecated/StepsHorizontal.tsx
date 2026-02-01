/**
 * StepsHorizontal - GENERIC
 * Horizontal stepper with progress bar
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
    title: string;
    subtitle?: string;
    imageUrl?: string;
    imagePrompt?: string;
    completed?: boolean;
    current?: boolean;
}

interface StepsHorizontalProps {
    headline?: string;
    steps?: Step[];
    currentStepContent?: {
        title?: string;
        description?: string;
        imageUrl?: string;
        imagePrompt?: string;
        items?: { icon?: string; text: string }[];
    };
    ctaLabel?: string;
    ctaActionPhrase?: string;
    backLabel?: string;
    backPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const StepsHorizontal: React.FC<StepsHorizontalProps> = ({
    headline,
    steps,
    currentStepContent,
    ctaLabel,
    ctaActionPhrase,
    backLabel,
    backPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const currentIndex = steps?.findIndex(s => s.current) ?? 0;
    const progress = steps ? ((currentIndex + 1) / steps.length) * 100 : 0;

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">


            {/* Stepper */}
            {steps && steps.length > 0 && (
                <div className="mb-8">
                    {/* Progress bar */}
                    <div className="h-1 bg-white/[0.05] rounded-full mb-6 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-sapphire to-jade rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Step indicators */}
                    <div className="flex justify-between">
                        {steps.map((step, i) => {
                            const IconComp = getIcon(step.icon);
                            const isCompleted = step.completed;
                            const isCurrent = step.current;

                            return (
                                <div key={i} className="flex flex-col items-center flex-1">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2
                                        ${isCompleted ? 'bg-jade text-white' :
                                            isCurrent ? 'bg-sapphire text-white ring-4 ring-sapphire/30' :
                                                'bg-white/[0.05] border border-white/[0.1] text-mist/40'}`}>
                                        {isCompleted ? <Check className="w-4 h-4" /> : <span className="text-sm font-bold">{i + 1}</span>}
                                    </div>
                                    <span className={`text-xs text-center ${isCurrent ? 'text-white font-medium' : 'text-mist/40'}`}>
                                        {step.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Current step content */}
            {currentStepContent && (
                <div className="flex-grow p-8 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
                    <div className="grid md:grid-cols-2 gap-8 h-full">
                        {(currentStepContent.imageUrl || currentStepContent.imagePrompt) && (
                            <div className="rounded-xl overflow-hidden">
                                <SmartImage
                                    assetId={currentStepContent.imageUrl || currentStepContent.imagePrompt || 'step-content'}
                                    alt={currentStepContent.title || 'Step'}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <div className="flex flex-col justify-center">
                            {currentStepContent.title && (
                                <h3 className="text-2xl font-bold text-white mb-4">{currentStepContent.title}</h3>
                            )}
                            {currentStepContent.description && (
                                <p className="text-mist/60 mb-6 leading-relaxed">{currentStepContent.description}</p>
                            )}
                            {currentStepContent.items && currentStepContent.items.length > 0 && (
                                <div className="space-y-3">
                                    {currentStepContent.items.map((item, i) => {
                                        const IconComp = getIcon(item.icon);
                                        return (
                                            <div key={i} className="flex items-center gap-3">
                                                <IconComp className="w-4 h-4 text-sapphire flex-shrink-0" />
                                                <span className="text-mist/70">{item.text}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <div className="pt-8 flex justify-between">
                {backLabel && backPhrase ? (
                    <button
                        className="inline-flex items-center gap-2 px-6 py-3 text-mist/60 hover:text-white transition-colors"
                        onClick={() => handleAction(backPhrase)}
                    >
                        {backLabel}
                    </button>
                ) : <div />}

                {ctaLabel && ctaActionPhrase && (
                    <button
                        className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                            hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                            transition-all duration-200 text-lg shadow-lg shadow-flamingo/20"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default StepsHorizontal;
