/**
 * StepsRoadmap - GENERIC
 * Roadmap-style visualization with phases
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, Flag, MapPin } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface RoadmapPhase {
    icon?: string;
    title: string;
    description?: string;
    status: 'completed' | 'current' | 'upcoming';
    items?: { text: string; completed?: boolean }[];
    imageUrl?: string;
    imagePrompt?: string;
    eta?: string;
    actionPhrase?: string;
}

interface StepItem {
    icon?: string;
    title: string;
    description?: string;
    complete?: boolean;
    actionPhrase?: string;
}

interface StepsRoadmapProps {
    headline?: string;
    subtitle?: string;
    startLabel?: string;
    endLabel?: string;
    phases?: RoadmapPhase[];
    steps?: StepItem[];  // Alias for simplified usage
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Flag;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Flag;
};

export const StepsRoadmap: React.FC<StepsRoadmapProps> = ({
    headline,
    subtitle,
    startLabel,
    endLabel,
    phases,
    steps,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    // Convert steps to phases format if phases not provided
    const displayPhases: RoadmapPhase[] = phases || (steps?.map((step, i) => ({
        icon: step.icon,
        title: step.title,
        description: step.description,
        status: step.complete ? 'completed' : (i === 0 && !steps.some(s => s.complete) ? 'current' : 'upcoming'),
        actionPhrase: step.actionPhrase,
    } as RoadmapPhase)) || []);

    const statusColors = {
        completed: 'bg-jade border-jade',
        current: 'bg-sapphire border-sapphire ring-4 ring-sapphire/30',
        upcoming: 'bg-white/[0.05] border-white/[0.1]',
    };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {(headline || subtitle) && (
                <div className="pb-8">
                    {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                    {subtitle && <p className="text-mist/60 mt-2">{subtitle}</p>}
                </div>
            )}

            {/* Roadmap visualization */}
            <div className="flex-grow relative">
                {/* Road path */}
                <div className="absolute top-6 left-0 right-0 h-1 bg-gradient-to-r from-jade via-sapphire to-mist/20 rounded-full" />

                {/* Start/End markers */}
                {startLabel && (
                    <div className="absolute top-3 left-0 flex flex-col items-center">
                        <MapPin className="w-6 h-6 text-jade" />
                        <span className="text-xs text-jade mt-1">{startLabel}</span>
                    </div>
                )}
                {endLabel && (
                    <div className="absolute top-3 right-0 flex flex-col items-center">
                        <Flag className="w-6 h-6 text-flamingo" />
                        <span className="text-xs text-flamingo mt-1">{endLabel}</span>
                    </div>
                )}

                {/* Phases */}
                {displayPhases && displayPhases.length > 0 && (
                    <div className="pt-16 grid gap-6" style={{ gridTemplateColumns: `repeat(${displayPhases.length}, 1fr)` }}>
                        {displayPhases.map((phase, i) => {
                            const IconComp = getIcon(phase.icon);

                            return (
                                <div
                                    key={i}
                                    onClick={() => phase.actionPhrase && handleAction(phase.actionPhrase)}
                                    className={`relative ${phase.actionPhrase ? 'cursor-pointer' : ''}`}
                                >
                                    {/* Phase marker */}
                                    <div className={`absolute -top-10 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2
                                        flex items-center justify-center ${statusColors[phase.status]}`}>
                                        <IconComp className={`w-4 h-4 ${phase.status === 'upcoming' ? 'text-mist/40' : 'text-white'}`} />
                                    </div>

                                    {/* Phase card */}
                                    <div className={`p-5 rounded-xl border transition-all
                                        ${phase.status === 'current'
                                            ? 'bg-sapphire/10 border-sapphire/30'
                                            : 'bg-gradient-to-b from-white/[0.04] to-transparent border-white/[0.06]'}
                                        ${phase.actionPhrase ? 'hover:border-white/[0.15]' : ''}`}>

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

                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className={`font-bold ${phase.status === 'completed' ? 'text-jade' :
                                                phase.status === 'current' ? 'text-white' : 'text-mist/50'
                                                }`}>{phase.title}</h3>
                                            {phase.eta && (
                                                <span className="text-xs text-mist/40">{phase.eta}</span>
                                            )}
                                        </div>

                                        {/* Items */}
                                        {phase.items && phase.items.length > 0 && (
                                            <ul className="space-y-2">
                                                {phase.items.map((item, j) => (
                                                    <li key={j} className="flex items-center gap-2 text-sm">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${item.completed ? 'bg-jade' :
                                                            phase.status === 'upcoming' ? 'bg-mist/20' : 'bg-sapphire'
                                                            }`} />
                                                        <span className={item.completed ? 'text-jade/70 line-through' : 'text-mist/60'}>
                                                            {item.text}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
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

export default StepsRoadmap;
