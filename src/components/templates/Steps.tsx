/**
 * Steps - GENERIC
 * Numbered step-by-step process
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Step {
    icon?: string;
    title: string;
    description?: string;
    actionPhrase?: string;
}

interface StepsProps {
    headline?: string;
    subheadline?: string;
    steps?: Step[];
    layout?: 'vertical' | 'horizontal';
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Steps: React.FC<StepsProps> = ({
    headline,
    subheadline,
    steps,
    layout = 'vertical',
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const isHorizontal = layout === 'horizontal';

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">


            {steps && steps.length > 0 && (
                <div className={`flex-grow ${isHorizontal ? 'flex items-stretch gap-4' : 'space-y-5'}`}>
                    {steps.map((step, index) => {
                        const IconComp = getIcon(step.icon);
                        const isLast = index === steps.length - 1;

                        return (
                            <div
                                key={index}
                                onClick={() => step.actionPhrase && handleAction(step.actionPhrase)}
                                className={`group relative 
                                    ${isHorizontal ? 'flex-1 flex flex-col' : 'flex items-start gap-6'}
                                    ${step.actionPhrase ? 'cursor-pointer' : ''}`}
                            >
                                <div className={`flex-shrink-0 ${isHorizontal ? 'mb-5' : ''}`}>
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-2xl bg-sapphire/10 border border-sapphire/20 
                                            flex items-center justify-center
                                            group-hover:bg-sapphire/20 group-hover:border-sapphire/40 transition-all">
                                            <IconComp className="w-6 h-6 text-sapphire" />
                                        </div>
                                        <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full 
                                            bg-sapphire text-white text-sm font-bold
                                            flex items-center justify-center shadow-lg shadow-sapphire/30">
                                            {index + 1}
                                        </div>
                                    </div>

                                    {!isHorizontal && !isLast && (
                                        <div className="absolute left-7 top-16 bottom-0 w-px bg-gradient-to-b from-sapphire/30 to-transparent"
                                            style={{ height: 'calc(100% - 4rem)' }} />
                                    )}
                                </div>

                                <div className={`p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent
                                    border border-white/[0.06] flex-grow
                                    ${step.actionPhrase ? 'group-hover:border-sapphire/30 group-hover:from-sapphire/[0.05]' : ''}
                                    transition-all duration-300`}>
                                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                    {step.description && <p className="text-mist/60 leading-relaxed">{step.description}</p>}
                                    {step.actionPhrase && (
                                        <ArrowRight className="w-5 h-5 text-mist/20 mt-4
                                            group-hover:text-sapphire group-hover:translate-x-1 transition-all" />
                                    )}
                                </div>

                                {isHorizontal && !isLast && (
                                    <div className="absolute -right-2 top-7 z-10">
                                        <ArrowRight className="w-4 h-4 text-sapphire/40" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
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

export default Steps;
