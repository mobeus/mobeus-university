/**
 * Tutorial - GENERIC
 * Step-by-step tutorial with code/examples
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, LucideIcon, Zap, Copy, Check, Play, BookOpen } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface TutorialStep {
    icon?: string;
    title: string;
    instruction: string;
    imageUrl?: string;
    imagePrompt?: string;
    code?: string;
    codeLanguage?: string;
    tip?: string;
    warning?: string;
}

interface TutorialProps {
    title: string;
    subtitle?: string;
    imageUrl?: string;
    imagePrompt?: string;
    duration?: string;
    prerequisites?: string[];
    steps?: TutorialStep[];
    completionTitle?: string;
    completionMessage?: string;
    tryItLabel?: string;
    tryItPhrase?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return BookOpen;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || BookOpen;
};

export const Tutorial: React.FC<TutorialProps> = ({
    title,
    subtitle,
    imageUrl,
    imagePrompt,
    duration,
    prerequisites,
    steps,
    completionTitle,
    completionMessage,
    tryItLabel,
    tryItPhrase,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [currentStep, setCurrentStep] = useState(0);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const totalSteps = steps?.length || 0;
    const isComplete = currentStep >= totalSteps;
    const activeStep = steps?.[currentStep];

    const handleCopy = async (code: string, index: number) => {
        await navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        playClick();
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {/* Header */}
            <div className="pb-6 border-b border-white/[0.06]">
                <div className="flex items-start gap-6">
                    {(imageUrl || imagePrompt) && (
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <SmartImage
                                assetId={imageUrl || imagePrompt || 'tutorial-icon'}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-2xl font-bold text-white">{title}</h1>
                            {duration && (
                                <span className="px-3 py-1 text-xs rounded-full bg-sapphire/10 text-sapphire border border-sapphire/20">
                                    {duration}
                                </span>
                            )}
                        </div>
                        {subtitle && <p className="text-mist/60">{subtitle}</p>}

                        {/* Prerequisites */}
                        {prerequisites && prerequisites.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {prerequisites.map((prereq, i) => (
                                    <span key={i} className="px-2 py-1 text-xs rounded-full bg-white/[0.05] text-mist/50 border border-white/[0.06]">
                                        {prereq}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Progress */}
                <div className="mt-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-mist/50">Step {Math.min(currentStep + 1, totalSteps)} of {totalSteps}</span>
                        <span className="text-mist/50">{Math.round(((currentStep) / totalSteps) * 100)}% complete</span>
                    </div>
                    <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-sapphire to-jade rounded-full transition-all duration-500"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow py-8">
                {!isComplete && activeStep ? (
                    <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
                        {/* Step header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-sapphire text-white flex items-center justify-center text-xl font-bold">
                                {currentStep + 1}
                            </div>
                            <h2 className="text-xl font-bold text-white">{activeStep.title}</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Image */}
                            {(activeStep.imageUrl || activeStep.imagePrompt) && (
                                <div className="rounded-xl overflow-hidden">
                                    <SmartImage
                                        assetId={activeStep.imageUrl || activeStep.imagePrompt || `step-${currentStep}`}
                                        alt={activeStep.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <div>
                                <p className="text-mist/70 leading-relaxed mb-6">{activeStep.instruction}</p>

                                {/* Code block */}
                                {activeStep.code && (
                                    <div className="relative rounded-xl bg-obsidian border border-white/[0.1] overflow-hidden mb-4">
                                        <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/[0.06]">
                                            <span className="text-xs text-mist/40">{activeStep.codeLanguage || 'code'}</span>
                                            <button
                                                onClick={() => handleCopy(activeStep.code!, currentStep)}
                                                className="flex items-center gap-1 text-xs text-mist/50 hover:text-white transition-colors"
                                            >
                                                {copiedIndex === currentStep ? (
                                                    <><Check className="w-3 h-3" /> Copied</>
                                                ) : (
                                                    <><Copy className="w-3 h-3" /> Copy</>
                                                )}
                                            </button>
                                        </div>
                                        <pre className="p-4 overflow-x-auto">
                                            <code className="text-sm text-sapphire font-mono">{activeStep.code}</code>
                                        </pre>
                                    </div>
                                )}

                                {/* Tip */}
                                {activeStep.tip && (
                                    <div className="p-4 rounded-xl bg-jade/5 border border-jade/20 mb-4">
                                        <div className="flex items-start gap-2">
                                            <Play className="w-4 h-4 text-jade mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-jade/80">{activeStep.tip}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Warning */}
                                {activeStep.warning && (
                                    <div className="p-4 rounded-xl bg-flamingo/5 border border-flamingo/20">
                                        <div className="flex items-start gap-2">
                                            <Zap className="w-4 h-4 text-flamingo mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-flamingo/80">{activeStep.warning}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Completion screen */
                    <div className="text-center p-12 rounded-2xl bg-gradient-to-b from-jade/10 to-transparent border border-jade/30">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-jade/20 flex items-center justify-center">
                            <Check className="w-10 h-10 text-jade" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">{completionTitle || 'Tutorial Complete!'}</h2>
                        {completionMessage && <p className="text-mist/60 mb-8">{completionMessage}</p>}

                        {tryItLabel && tryItPhrase && (
                            <button
                                onClick={() => handleAction(tryItPhrase)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-jade text-white rounded-xl font-medium
                                    hover:bg-jade/90 transition-colors"
                            >
                                <Play className="w-4 h-4" />
                                {tryItLabel}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Navigation */}
            <div className="pt-6 flex justify-between">
                <button
                    onClick={() => { playClick(); setCurrentStep(Math.max(0, currentStep - 1)); }}
                    disabled={currentStep === 0}
                    className="inline-flex items-center gap-2 px-6 py-3 text-mist/60 hover:text-white 
                        transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                </button>

                {!isComplete ? (
                    <button
                        onClick={() => { playClick(); setCurrentStep(currentStep + 1); }}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-sapphire text-white font-semibold rounded-full 
                            hover:bg-sapphire/90 transition-all"
                    >
                        {currentStep === totalSteps - 1 ? 'Complete' : 'Next Step'}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                ) : ctaLabel && ctaActionPhrase ? (
                    <button
                        className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                            hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                            transition-all duration-200 text-lg shadow-lg shadow-flamingo/20"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default Tutorial;
