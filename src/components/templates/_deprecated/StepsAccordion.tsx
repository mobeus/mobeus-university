/**
 * StepsAccordion - GENERIC
 * Expandable step details
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState } from 'react';
import { ArrowRight, ChevronDown, LucideIcon, Zap, Check } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface AccordionStep {
    icon?: string;
    number?: number;
    title: string;
    summary?: string;
    details?: string;
    imageUrl?: string;
    imagePrompt?: string;
    items?: string[];
    completed?: boolean;
    actionPhrase?: string;
    actionLabel?: string;
}

interface StepsAccordionProps {
    headline?: string;
    subtitle?: string;
    steps?: AccordionStep[];
    allowMultiple?: boolean;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const StepsAccordion: React.FC<StepsAccordionProps> = ({
    headline,
    subtitle,
    steps,
    allowMultiple = false,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));

    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const toggleStep = (index: number) => {
        playClick();
        setOpenIndices(prev => {
            const next = new Set(allowMultiple ? prev : []);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });
    };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {(headline || subtitle) && (
                <div className="pb-6">
                    {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                    {subtitle && <p className="text-mist/60 mt-2">{subtitle}</p>}
                </div>
            )}

            {steps && steps.length > 0 && (
                <div className="flex-grow space-y-3">
                    {steps.map((step, i) => {
                        const IconComp = getIcon(step.icon);
                        const isOpen = openIndices.has(i);

                        return (
                            <div
                                key={i}
                                className={`rounded-xl border overflow-hidden transition-all
                                    ${step.completed
                                        ? 'bg-jade/5 border-jade/30'
                                        : isOpen
                                            ? 'bg-sapphire/5 border-sapphire/30'
                                            : 'bg-white/[0.02] border-white/[0.06]'}`}
                            >
                                {/* Header */}
                                <button
                                    onClick={() => toggleStep(i)}
                                    className="w-full flex items-center gap-4 p-5 text-left"
                                >
                                    {/* Step indicator */}
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                                        ${step.completed ? 'bg-jade text-white' : 'bg-white/[0.05] border border-white/[0.1]'}`}>
                                        {step.completed ? (
                                            <Check className="w-5 h-5" />
                                        ) : step.number !== undefined ? (
                                            <span className="font-bold text-white">{step.number}</span>
                                        ) : (
                                            <IconComp className="w-5 h-5 text-sapphire" />
                                        )}
                                    </div>

                                    {/* Title & Summary */}
                                    <div className="flex-grow">
                                        <h3 className={`font-bold ${step.completed ? 'text-jade' : 'text-white'}`}>{step.title}</h3>
                                        {step.summary && !isOpen && (
                                            <p className="text-sm text-mist/50 mt-1 line-clamp-1">{step.summary}</p>
                                        )}
                                    </div>

                                    {/* Expand icon */}
                                    <ChevronDown className={`w-5 h-5 text-mist/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Expanded content */}
                                {isOpen && (
                                    <div className="px-5 pb-5 pt-0">
                                        <div className="pl-14">
                                            {/* Image */}
                                            {(step.imageUrl || step.imagePrompt) && (
                                                <div className="aspect-video rounded-lg overflow-hidden mb-4 max-w-md">
                                                    <SmartImage
                                                        assetId={step.imageUrl || step.imagePrompt || `step-${i}`}
                                                        alt={step.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}

                                            {step.details && (
                                                <p className="text-mist/70 mb-4 leading-relaxed">{step.details}</p>
                                            )}

                                            {step.items && step.items.length > 0 && (
                                                <ul className="space-y-2 mb-4">
                                                    {step.items.map((item, j) => (
                                                        <li key={j} className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-sapphire mt-2 flex-shrink-0" />
                                                            <span className="text-sm text-mist/60">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {step.actionLabel && step.actionPhrase && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleAction(step.actionPhrase!); }}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-sapphire/20 text-sapphire 
                                                        rounded-lg font-medium hover:bg-sapphire/30 transition-colors"
                                                >
                                                    {step.actionLabel}
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {ctaLabel && ctaActionPhrase && (
                <div className="pt-6 flex justify-end">
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

export default StepsAccordion;
