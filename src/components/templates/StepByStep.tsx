/**
 * StepByStep - Numbered steps/process
 * Rich layout with progress tracking, time estimates, and detailed descriptions
 * 
 * HIERARCHY: Glance (progress) → Look (step details) → Read (descriptions)
 */

import React from 'react';
import { ArrowRight, Check, Clock, ExternalLink } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Step {
    title: string;
    description?: string;
    timeEstimate?: string;
    tip?: string;
    status?: 'pending' | 'active' | 'complete';
    actionPhrase?: string;
}

interface StepByStepProps {
    headline?: string;
    subheadline?: string;
    totalTime?: string;
    steps: Step[];
    orientation?: 'horizontal' | 'vertical';
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const StepByStep: React.FC<StepByStepProps> = ({
    headline,
    subheadline,
    totalTime,
    steps = [],
    orientation = 'vertical',
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();

    // Ensure steps is always an array
    const safeSteps = Array.isArray(steps) ? steps : [];

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const completedCount = safeSteps.filter(s => s.status === 'complete').length;
    const progress = safeSteps.length > 0 ? (completedCount / safeSteps.length) * 100 : 0;

    if (orientation === 'horizontal') {
        return (
            <div className="glass-template-container space-y-6">
                {/* Header */}
                {headline && (
                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{headline}</h2>
                        {subheadline && <p className="text-mist/70">{subheadline}</p>}
                    </div>
                )}

                {/* Progress Bar */}
                {safeSteps.length > 0 && (
                    <div className="relative">
                        <div className="h-1 bg-mist/20 rounded-full">
                            <div
                                className="h-full bg-sapphire rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-1">
                            <span className="text-xs text-mist/50">{completedCount} of {safeSteps.length} complete</span>
                            {totalTime && (
                                <span className="text-xs text-sapphire flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {totalTime}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Horizontal Steps */}
                <div className="flex items-start justify-between gap-4 overflow-x-auto pb-4">
                    {safeSteps.map((step, index) => {
                        const isComplete = step.status === 'complete';
                        const isActive = step.status === 'active';

                        return (
                            <React.Fragment key={index}>
                                <div
                                    className="flex flex-col items-center min-w-[140px] cursor-pointer"
                                    onClick={() => step.actionPhrase && handleAction(step.actionPhrase)}
                                >
                                    {/* Step Circle */}
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 border-2 transition-all ${isComplete ? 'bg-sapphire border-sapphire text-white' :
                                            isActive ? 'bg-sapphire/20 border-sapphire text-sapphire' :
                                                'bg-obsidian/40 border-mist/20 text-mist/50'
                                        }`}>
                                        {isComplete ? <Check className="w-6 h-6" /> : <span className="text-lg font-bold">{index + 1}</span>}
                                    </div>

                                    {/* Title */}
                                    <h3 className={`text-sm font-semibold text-center mb-1 ${isActive ? 'text-sapphire' : 'text-white'}`}>
                                        {step.title}
                                    </h3>

                                    {/* Time Estimate */}
                                    {step.timeEstimate && (
                                        <span className="text-xs text-mist/50">{step.timeEstimate}</span>
                                    )}
                                </div>

                                {/* Connector */}
                                {index < safeSteps.length - 1 && (
                                    <div className={`flex-1 h-0.5 ${isComplete ? 'bg-sapphire' : 'bg-mist/20'} mt-7 min-w-[20px]`} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* CTA */}
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
    }

    // Vertical Layout - Richer with cards
    return (
        <div className="glass-template-container space-y-6">
            {/* Header */}
            {headline && (
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">{headline}</h2>
                        {subheadline && <p className="text-mist/70 mt-1">{subheadline}</p>}
                    </div>
                    {totalTime && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-sapphire/20 border border-sapphire/30 rounded-full">
                            <Clock className="w-4 h-4 text-sapphire" />
                            <span className="text-sm font-medium text-sapphire">{totalTime}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Vertical Steps */}
            <div className="space-y-3">
                {safeSteps.map((step, index) => {
                    const isComplete = step.status === 'complete';
                    const isActive = step.status === 'active';

                    return (
                        <div
                            key={index}
                            className={`flex gap-4 p-4 rounded-xl cursor-pointer transition-all ${isActive ? 'bg-sapphire/10 border border-sapphire/30' :
                                    'bg-obsidian/40 border border-mist/10 hover:border-sapphire/30'
                                }`}
                            onClick={() => step.actionPhrase && handleAction(step.actionPhrase)}
                        >
                            {/* Step Number */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${isComplete ? 'bg-sapphire border-sapphire text-white' :
                                    isActive ? 'bg-sapphire/20 border-sapphire text-sapphire' :
                                        'bg-obsidian/60 border-mist/20 text-mist/50'
                                }`}>
                                {isComplete ? <Check className="w-5 h-5" /> : <span className="font-bold">{index + 1}</span>}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h3 className={`text-lg font-semibold ${isActive ? 'text-sapphire' : 'text-white'}`}>
                                        {step.title}
                                    </h3>
                                    {step.timeEstimate && (
                                        <span className="text-xs text-mist/50 px-2 py-0.5 bg-obsidian/50 rounded">
                                            {step.timeEstimate}
                                        </span>
                                    )}
                                </div>
                                {step.description && (
                                    <p className="text-sm text-mist/70 mt-1">{step.description}</p>
                                )}
                                {step.tip && (
                                    <div className="mt-2 p-2 rounded bg-sapphire/10 border border-sapphire/20">
                                        <p className="text-xs text-sapphire">💡 {step.tip}</p>
                                    </div>
                                )}
                            </div>

                            {/* Action Arrow */}
                            {step.actionPhrase && (
                                <ArrowRight className="w-5 h-5 text-mist/30 flex-shrink-0" />
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

export default StepByStep;
