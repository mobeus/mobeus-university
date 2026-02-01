/**
 * StepsProgress - GENERIC
 * Progress bar with milestone markers
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, Check, Trophy } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface Milestone {
    icon?: string;
    title: string;
    position: number; // 0-100 percentage
    reached?: boolean;
    current?: boolean;
    reward?: string;
    imageUrl?: string;
    imagePrompt?: string;
}

interface StepItem {
    icon?: string;
    title: string;
    description?: string;
    complete?: boolean;
    actionPhrase?: string;
}

interface StepsProgressProps {
    headline?: string;
    subtitle?: string;
    progress: number; // 0-100
    milestones?: Milestone[];
    steps?: StepItem[];  // Alias for simplified usage
    currentLabel?: string;
    currentValue?: string;
    goalLabel?: string;
    goalValue?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Trophy;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Trophy;
};

export const StepsProgress: React.FC<StepsProgressProps> = ({
    headline,
    subtitle,
    progress,
    milestones,
    steps,
    currentLabel,
    currentValue,
    goalLabel,
    goalValue,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    // Convert steps to milestones format if milestones not provided
    const displayMilestones: Milestone[] = milestones || (steps?.map((step, i, arr) => ({
        icon: step.icon,
        title: step.title,
        position: ((i + 1) / arr.length) * 100,
        reached: step.complete,
        current: !step.complete && (i === 0 || arr.slice(0, i).every(s => s.complete)),
    } as Milestone)) || []);

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {(headline || subtitle) && (
                <div className="pb-8">
                    {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                    {subtitle && <p className="text-mist/60 mt-2">{subtitle}</p>}
                </div>
            )}

            {/* Progress visualization */}
            <div className="flex-grow">
                {/* Current/Goal display */}
                <div className="flex justify-between items-end mb-6">
                    {currentLabel && currentValue && (
                        <div>
                            <div className="text-sm text-mist/40">{currentLabel}</div>
                            <div className="text-3xl font-bold text-white">{currentValue}</div>
                        </div>
                    )}
                    {goalLabel && goalValue && (
                        <div className="text-right">
                            <div className="text-sm text-mist/40">{goalLabel}</div>
                            <div className="text-2xl font-bold text-sapphire">{goalValue}</div>
                        </div>
                    )}
                </div>

                {/* Progress bar with milestones */}
                <div className="relative py-12">
                    {/* Track */}
                    <div className="h-3 bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-sapphire via-jade to-flamingo rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div>

                    {/* Milestones */}
                    {displayMilestones && displayMilestones.map((milestone, i) => {
                        const IconComp = getIcon(milestone.icon);
                        const isReached = milestone.reached || progress >= milestone.position;
                        const isCurrent = milestone.current;

                        return (
                            <div
                                key={i}
                                className="absolute top-0"
                                style={{ left: `${milestone.position}%`, transform: 'translateX(-50%)' }}
                            >
                                <div className={`relative flex flex-col items-center ${i % 2 === 0 ? '' : 'flex-col-reverse'}`}>
                                    {/* Marker */}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg
                                        ${isReached ? 'bg-jade text-white' :
                                            isCurrent ? 'bg-sapphire text-white ring-4 ring-sapphire/30' :
                                                'bg-obsidian border-2 border-white/[0.1] text-mist/40'}`}>
                                        {isReached ? <Check className="w-5 h-5" /> : <IconComp className="w-5 h-5" />}
                                    </div>

                                    {/* Info card */}
                                    <div className={`absolute ${i % 2 === 0 ? 'top-14' : 'bottom-14'} 
                                        w-32 text-center`}>
                                        {(milestone.imageUrl || milestone.imagePrompt) && (
                                            <div className="w-12 h-12 mx-auto mb-2 rounded-lg overflow-hidden border border-white/[0.1]">
                                                <SmartImage
                                                    assetId={milestone.imageUrl || milestone.imagePrompt || `milestone-${i}`}
                                                    alt={milestone.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className={`text-sm font-medium ${isReached ? 'text-jade' : isCurrent ? 'text-white' : 'text-mist/50'}`}>
                                            {milestone.title}
                                        </div>
                                        {milestone.reward && (
                                            <div className="text-xs text-mist/40 mt-1">{milestone.reward}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Progress percentage */}
                <div className="text-center mt-8">
                    <span className="text-5xl font-bold text-white">{Math.round(progress)}%</span>
                </div>
            </div>

            {ctaLabel && ctaActionPhrase && (
                <div className="pt-8 flex justify-center">
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

export default StepsProgress;
