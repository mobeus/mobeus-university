/**
 * Timeline - GENERIC
 * Two-column timeline with deliverables and steps
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, Check, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Deliverable {
    icon?: string;
    text: string;
}

interface TimelineStep {
    time?: string;
    title: string;
    icon?: string;
}

interface TimelineProps {
    leftIcon?: string;
    leftHeadline?: string;
    leftSubheadline?: string;
    description?: string;
    highlights?: string[];
    deliverablesLabel?: string;
    deliverables?: Deliverable[];
    stepsLabel?: string;
    steps?: TimelineStep[];
    successNote?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Timeline: React.FC<TimelineProps> = ({
    leftIcon,
    leftHeadline,
    leftSubheadline,
    description,
    highlights,
    deliverablesLabel,
    deliverables,
    stepsLabel,
    steps,
    successNote,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };
    const LeftIconComp = getIcon(leftIcon);

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            <div className="grid md:grid-cols-2 gap-8 flex-grow">

                <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent 
                    border border-white/[0.06] flex flex-col">

                    {(leftHeadline || leftIcon) && (
                        <div className="flex items-start gap-5 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-sapphire/10 border border-sapphire/20 
                                flex items-center justify-center flex-shrink-0">
                                <LeftIconComp className="w-8 h-8 text-sapphire" />
                            </div>
                            <div className="pt-1">
                                {leftHeadline && <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{leftHeadline}</h3>}
                                {leftSubheadline && <p className="text-sapphire font-medium mt-1">{leftSubheadline}</p>}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    {description && (
                        <p className="text-mist/60 leading-relaxed text-sm md:text-base mb-6">{description}</p>
                    )}

                    {/* Highlight Chips */}
                    {highlights && highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {highlights.map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-sapphire/10 text-sapphire/80 border border-sapphire/15"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Divider */}
                    {(description || (highlights && highlights.length > 0)) && (deliverables && deliverables.length > 0) && (
                        <div className="w-full h-px bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent mb-6" />
                    )}

                    {deliverablesLabel && (
                        <p className="text-xs text-mist/40 uppercase tracking-widest font-medium mb-4">{deliverablesLabel}</p>
                    )}

                    {deliverables && deliverables.length > 0 && (
                        <div className="space-y-3 flex-grow">
                            {deliverables.map((item, i) => {
                                const IconComp = getIcon(item.icon);
                                return (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl 
                                        bg-white/[0.02] border border-white/[0.04]">
                                        <div className="w-10 h-10 rounded-xl bg-sapphire/10 border border-sapphire/20
                                            flex items-center justify-center flex-shrink-0">
                                            <IconComp className="w-5 h-5 text-sapphire" />
                                        </div>
                                        <span className="text-mist/80 font-medium">{item.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    {stepsLabel && (
                        <p className="text-xs text-mist/40 uppercase tracking-widest font-medium mb-6">{stepsLabel}</p>
                    )}

                    {steps && steps.length > 0 && (
                        <div className="relative space-y-0 flex-grow">
                            <div className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-flamingo/40 via-flamingo/20 to-transparent" />

                            {steps.map((step, i) => {
                                const StepIcon = getIcon(step.icon);
                                const isLast = i === steps.length - 1;

                                return (
                                    <div key={i} className="relative flex items-start gap-5 pb-6">
                                        <div className="relative z-10 w-10 h-10 rounded-xl bg-flamingo/15 border border-flamingo/25
                                            flex items-center justify-center flex-shrink-0">
                                            <StepIcon className="w-5 h-5 text-flamingo" />
                                        </div>

                                        <div className={`p-5 rounded-xl bg-gradient-to-r from-white/[0.02] to-transparent
                                            border border-white/[0.05] flex-grow
                                            ${isLast ? 'border-flamingo/20 from-flamingo/[0.05]' : ''}`}>
                                            {step.time && (
                                                <span className={`text-sm font-bold mb-1 block
                                                    ${isLast ? 'text-flamingo' : 'text-mist/50'}`}>
                                                    {step.time}
                                                </span>
                                            )}
                                            <span className={`font-medium ${isLast ? 'text-white' : 'text-mist/70'}`}>
                                                {step.title}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {successNote && (
                        <div className="p-5 rounded-xl bg-jade/10 border border-jade/20 mt-2">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-jade/15 flex items-center justify-center">
                                    <Check className="w-4 h-4 text-jade" />
                                </div>
                                <span className="text-jade font-medium">{successNote}</span>
                            </div>
                        </div>
                    )}

                    {ctaLabel && ctaActionPhrase && (
                        <button
                            className="mt-6 w-full inline-flex items-center justify-center gap-3 px-6 py-5 
                                bg-flamingo text-white font-semibold rounded-full 
                                hover:bg-flamingo/90 transition-all text-lg shadow-lg shadow-flamingo/20"
                            onClick={() => handleAction(ctaActionPhrase)}
                        >
                            {ctaLabel}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Timeline;
