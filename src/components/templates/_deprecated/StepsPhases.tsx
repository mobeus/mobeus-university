/**
 * StepsPhases - GENERIC
 * Phase-based grouping of steps
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface PhaseStep {
    title: string;
    completed?: boolean;
    actionPhrase?: string;
}

interface Phase {
    icon?: string;
    title: string;
    description?: string;
    imageUrl?: string;
    imagePrompt?: string;
    status: 'completed' | 'current' | 'upcoming';
    steps?: PhaseStep[];
    duration?: string;
}

interface StepsPhasesProps {
    headline?: string;
    subtitle?: string;
    phases?: Phase[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const StepsPhases: React.FC<StepsPhasesProps> = ({
    headline,
    subtitle,
    phases,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const statusColors = {
        completed: 'border-jade/30 bg-jade/5',
        current: 'border-sapphire/30 bg-sapphire/5 ring-2 ring-sapphire/20',
        upcoming: 'border-white/[0.06] bg-white/[0.02] opacity-60',
    };

    const statusBadgeColors = {
        completed: 'bg-jade text-white',
        current: 'bg-sapphire text-white',
        upcoming: 'bg-white/[0.1] text-mist/50',
    };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {(headline || subtitle) && (
                <div className="pb-8">
                    {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                    {subtitle && <p className="text-mist/60 mt-2">{subtitle}</p>}
                </div>
            )}

            {phases && phases.length > 0 && (
                <div className="flex-grow grid md:grid-cols-3 gap-6">
                    {phases.map((phase, i) => {
                        const IconComp = getIcon(phase.icon);
                        const completedSteps = phase.steps?.filter(s => s.completed).length || 0;
                        const totalSteps = phase.steps?.length || 0;

                        return (
                            <div
                                key={i}
                                className={`rounded-2xl border p-6 transition-all flex flex-col
                                    ${statusColors[phase.status]}`}
                            >
                                {/* Phase header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadgeColors[phase.status]}`}>
                                        Phase {i + 1}
                                    </div>
                                    {phase.duration && (
                                        <span className="text-xs text-mist/40">{phase.duration}</span>
                                    )}
                                </div>

                                {/* Image */}
                                {(phase.imageUrl || phase.imagePrompt) && (
                                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                                        <SmartImage
                                            assetId={phase.imageUrl || phase.imagePrompt || `phase-${i}`}
                                            alt={phase.title}
                                            className={`w-full h-full object-cover ${phase.status === 'upcoming' ? 'opacity-50' : ''}`}
                                        />
                                    </div>
                                )}

                                {/* Title & Description */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                                        ${phase.status === 'completed' ? 'bg-jade/20' :
                                            phase.status === 'current' ? 'bg-sapphire/20' : 'bg-white/[0.05]'}`}>
                                        <IconComp className={`w-5 h-5 ${phase.status === 'completed' ? 'text-jade' :
                                                phase.status === 'current' ? 'text-sapphire' : 'text-mist/40'
                                            }`} />
                                    </div>
                                    <h3 className={`font-bold ${phase.status === 'upcoming' ? 'text-mist/50' : 'text-white'}`}>
                                        {phase.title}
                                    </h3>
                                </div>

                                {phase.description && (
                                    <p className="text-sm text-mist/50 mb-4">{phase.description}</p>
                                )}

                                {/* Steps list */}
                                {phase.steps && phase.steps.length > 0 && (
                                    <div className="flex-grow">
                                        <div className="text-xs text-mist/40 mb-2">
                                            {completedSteps}/{totalSteps} complete
                                        </div>
                                        <ul className="space-y-2">
                                            {phase.steps.map((step, j) => (
                                                <li
                                                    key={j}
                                                    onClick={() => step.actionPhrase && handleAction(step.actionPhrase)}
                                                    className={`flex items-center gap-2 text-sm p-2 rounded-lg transition-colors
                                                        ${step.actionPhrase ? 'cursor-pointer hover:bg-white/[0.05]' : ''}
                                                        ${step.completed ? 'text-jade/70 line-through' : 'text-mist/60'}`}
                                                >
                                                    <div className={`w-2 h-2 rounded-full ${step.completed ? 'bg-jade' : 'bg-mist/20'}`} />
                                                    {step.title}
                                                    {step.actionPhrase && (
                                                        <ChevronRight className="w-3 h-3 ml-auto text-mist/30" />
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Progress bar */}
                                {totalSteps > 0 && (
                                    <div className="mt-4 h-1 bg-white/[0.05] rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500
                                                ${phase.status === 'completed' ? 'bg-jade' : 'bg-sapphire'}`}
                                            style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                                        />
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

export default StepsPhases;
