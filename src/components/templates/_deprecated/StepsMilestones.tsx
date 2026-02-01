/**
 * StepsMilestones - GENERIC
 * Milestone markers with achievements
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, Trophy, Star, Lock } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface Milestone {
    icon?: string;
    title: string;
    description?: string;
    imageUrl?: string;
    imagePrompt?: string;
    reward?: string;
    points?: number;
    status: 'unlocked' | 'current' | 'locked';
    actionPhrase?: string;
}

interface StepItem {
    icon?: string;
    title: string;
    description?: string;
    complete?: boolean;
    actionPhrase?: string;
}

interface StepsMilestonesProps {
    headline?: string;
    subtitle?: string;
    currentPoints?: number;
    milestones?: Milestone[];
    steps?: StepItem[];  // Alias for simplified usage
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Trophy;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Trophy;
};

export const StepsMilestones: React.FC<StepsMilestonesProps> = ({
    headline,
    subtitle,
    currentPoints,
    milestones,
    steps,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    // Convert steps to milestones format if milestones not provided
    const displayMilestones: Milestone[] = milestones || (steps?.map((step, i) => ({
        icon: step.icon,
        title: step.title,
        description: step.description,
        status: step.complete ? 'unlocked' : (i === 0 && !steps.some(s => s.complete) ? 'current' : 'locked'),
        actionPhrase: step.actionPhrase,
    } as Milestone)) || []);

    const maxPoints = Math.max(...(displayMilestones?.map(m => m.points || 0) || [100]));
    const progressPercent = currentPoints ? Math.min((currentPoints / maxPoints) * 100, 100) : 0;

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {(headline || subtitle) && (
                <div className="pb-6">
                    {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                    {subtitle && <p className="text-mist/60 mt-2">{subtitle}</p>}
                </div>
            )}

            {/* Points display */}
            {currentPoints !== undefined && (
                <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-flamingo/10 to-sapphire/10 border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                            <div>
                                <div className="text-3xl font-bold text-white">{currentPoints}</div>
                                <div className="text-sm text-mist/50">points earned</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-medium text-mist/60">{maxPoints}</div>
                            <div className="text-xs text-mist/40">next milestone</div>
                        </div>
                    </div>
                    <div className="h-3 bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-flamingo to-sapphire rounded-full transition-all duration-1000"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Milestones */}
            {displayMilestones && displayMilestones.length > 0 && (
                <div className="flex-grow grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayMilestones.map((milestone, i) => {
                        const IconComp = getIcon(milestone.icon);
                        const isUnlocked = milestone.status === 'unlocked';
                        const isCurrent = milestone.status === 'current';
                        const isLocked = milestone.status === 'locked';

                        return (
                            <div
                                key={i}
                                onClick={() => milestone.actionPhrase && !isLocked && handleAction(milestone.actionPhrase)}
                                className={`relative rounded-2xl border p-6 transition-all
                                    ${isUnlocked
                                        ? 'bg-gradient-to-b from-jade/10 to-transparent border-jade/30'
                                        : isCurrent
                                            ? 'bg-gradient-to-b from-sapphire/10 to-transparent border-sapphire/30 ring-2 ring-sapphire/20'
                                            : 'bg-white/[0.02] border-white/[0.04] opacity-60'}
                                    ${milestone.actionPhrase && !isLocked ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
                            >
                                {/* Lock icon for locked milestones */}
                                {isLocked && (
                                    <div className="absolute top-4 right-4">
                                        <Lock className="w-5 h-5 text-mist/30" />
                                    </div>
                                )}

                                {/* Icon/Image */}
                                {(milestone.imageUrl || milestone.imagePrompt) ? (
                                    <div className="w-20 h-20 rounded-xl overflow-hidden mb-4 mx-auto">
                                        <SmartImage
                                            assetId={milestone.imageUrl || milestone.imagePrompt || `milestone-${i}`}
                                            alt={milestone.title}
                                            className={`w-full h-full object-cover ${isLocked ? 'grayscale' : ''}`}
                                        />
                                    </div>
                                ) : (
                                    <div className={`w-20 h-20 rounded-xl mb-4 mx-auto flex items-center justify-center
                                        ${isUnlocked
                                            ? 'bg-jade/20 border border-jade/30'
                                            : isCurrent
                                                ? 'bg-sapphire/20 border border-sapphire/30'
                                                : 'bg-white/[0.05] border border-white/[0.1]'}`}>
                                        <IconComp className={`w-10 h-10 ${isUnlocked ? 'text-jade' : isCurrent ? 'text-sapphire' : 'text-mist/30'
                                            }`} />
                                    </div>
                                )}

                                {/* Points badge */}
                                {milestone.points && (
                                    <div className="flex justify-center mb-3">
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium
                                            ${isUnlocked ? 'bg-jade/20 text-jade' : 'bg-white/[0.05] text-mist/50'}`}>
                                            {milestone.points} pts
                                        </div>
                                    </div>
                                )}

                                <h3 className={`text-lg font-bold text-center mb-2 ${isLocked ? 'text-mist/50' : 'text-white'}`}>
                                    {milestone.title}
                                </h3>
                                {milestone.description && (
                                    <p className="text-sm text-mist/50 text-center mb-3">{milestone.description}</p>
                                )}

                                {/* Reward */}
                                {milestone.reward && (
                                    <div className={`text-center p-3 rounded-lg
                                        ${isUnlocked ? 'bg-jade/10 text-jade' : 'bg-white/[0.03] text-mist/40'}`}>
                                        <Trophy className="w-4 h-4 inline mr-2" />
                                        {milestone.reward}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

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

export default StepsMilestones;
