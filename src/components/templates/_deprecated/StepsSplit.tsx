/**
 * StepsSplit - GENERIC
 * Split layout: Steps on left (with subtitles), Content panel on right
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, ArrowDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface StepItem {
    icon?: string;
    title: string;
    subtitle?: string;
    description?: string;
    complete?: boolean;
    actionPhrase?: string;
}

interface Badge {
    icon?: string;
    label: string;
    variant?: 'default' | 'accent' | 'success';
}

interface ContentPanel {
    title?: string;
    subtitle?: string;
    paragraph?: string;
    badges?: Badge[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

interface StepsSplitProps {
    headline?: string;
    subheadline?: string;
    steps?: StepItem[];
    content?: ContentPanel;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const StepsSplit: React.FC<StepsSplitProps> = ({
    headline,
    subheadline,
    steps,
    content,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {/* Header */}
            {(headline || subheadline) && (
                <div className="pb-8">
                    {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                    {subheadline && <p className="text-mist/60 mt-2">{subheadline}</p>}
                </div>
            )}

            {/* Split Layout: Steps Left, Content Right */}
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* LEFT: Steps Column */}
                <div className="flex flex-col justify-center">
                    {steps && steps.length > 0 && (
                        <div className="space-y-4">
                            {steps.map((step, i) => {
                                const IconComp = getIcon(step.icon);
                                const isLast = i === steps.length - 1;
                                const isComplete = step.complete;

                                return (
                                    <React.Fragment key={i}>
                                        <div
                                            onClick={() => step.actionPhrase && handleAction(step.actionPhrase)}
                                            className={`group flex items-start gap-4 p-5 rounded-xl
                                                bg-gradient-to-r from-white/[0.04] to-transparent
                                                border border-white/[0.06]
                                                ${step.actionPhrase ? 'cursor-pointer hover:border-sapphire/30 hover:from-sapphire/[0.06]' : ''}
                                                ${isComplete ? 'border-jade/30 from-jade/[0.05]' : ''}
                                                transition-all duration-300`}
                                        >
                                            {/* Icon */}
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                                                ${isComplete
                                                    ? 'bg-jade/20 border border-jade/30'
                                                    : 'bg-sapphire/10 border border-sapphire/20'}
                                                group-hover:scale-105 transition-transform`}>
                                                <IconComp className={`w-5 h-5 ${isComplete ? 'text-jade' : 'text-sapphire'}`} />
                                            </div>

                                            {/* Text */}
                                            <div className="flex-grow">
                                                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                                                {step.subtitle && (
                                                    <p className="text-sm text-mist/50 mt-0.5">{step.subtitle}</p>
                                                )}
                                                {step.description && (
                                                    <p className="text-sm text-mist/40 mt-2">{step.description}</p>
                                                )}
                                            </div>

                                            {/* Arrow */}
                                            {step.actionPhrase && (
                                                <ArrowRight className="w-5 h-5 text-mist/20 flex-shrink-0 
                                                    group-hover:text-sapphire group-hover:translate-x-1 transition-all self-center" />
                                            )}
                                        </div>

                                        {/* Connector Arrow */}
                                        {!isLast && (
                                            <div className="flex justify-center py-1">
                                                <ArrowDown className="w-5 h-5 text-sapphire/40" />
                                            </div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* RIGHT: Content Panel */}
                {content && (
                    <div className="flex flex-col justify-center p-8 rounded-2xl 
                        bg-gradient-to-br from-white/[0.04] to-transparent 
                        border border-white/[0.06]">

                        {/* Title & Subtitle */}
                        {content.title && (
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{content.title}</h3>
                        )}
                        {content.subtitle && (
                            <p className="text-lg text-sapphire font-medium mb-6">{content.subtitle}</p>
                        )}

                        {/* Paragraph */}
                        {content.paragraph && (
                            <p className="text-mist/70 leading-relaxed mb-8">{content.paragraph}</p>
                        )}

                        {/* Badges */}
                        {content.badges && content.badges.length > 0 && (
                            <div className="flex flex-wrap gap-3 mb-8">
                                {content.badges.map((badge, i) => {
                                    const BadgeIcon = getIcon(badge.icon);
                                    const variantClass = badge.variant === 'accent'
                                        ? 'bg-flamingo/10 text-flamingo border-flamingo/20'
                                        : badge.variant === 'success'
                                            ? 'bg-jade/10 text-jade border-jade/20'
                                            : 'bg-sapphire/10 text-sapphire border-sapphire/20';

                                    return (
                                        <div key={i} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full 
                                            border ${variantClass}`}>
                                            {badge.icon && <BadgeIcon className="w-4 h-4" />}
                                            <span className="text-sm font-medium">{badge.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Content CTA */}
                        {content.ctaLabel && content.ctaActionPhrase && (
                            <button
                                className="inline-flex items-center gap-3 px-6 py-3 bg-sapphire text-white font-semibold rounded-full 
                                    hover:bg-sapphire/90 hover:scale-[1.02] active:scale-[0.98]
                                    transition-all duration-200 self-start"
                                onClick={() => handleAction(content.ctaActionPhrase!)}
                            >
                                {content.ctaLabel}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Main CTA */}
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

export default StepsSplit;
