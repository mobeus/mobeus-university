/**
 * StepsTimeline - GENERIC
 * Timeline with dates and milestones
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, Calendar } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface TimelineEvent {
    icon?: string;
    date: string;
    title: string;
    description?: string;
    imageUrl?: string;
    imagePrompt?: string;
    tags?: string[];
    status?: 'past' | 'current' | 'future';
    actionPhrase?: string;
}

interface StepItem {
    icon?: string;
    title: string;
    description?: string;
    complete?: boolean;
    actionPhrase?: string;
}

interface StepsTimelineProps {
    headline?: string;
    subtitle?: string;
    events?: TimelineEvent[];
    steps?: StepItem[];  // Alias for simplified usage
    layout?: 'alternating' | 'left' | 'right';
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Calendar;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Calendar;
};

export const StepsTimeline: React.FC<StepsTimelineProps> = ({
    headline,
    subtitle,
    events,
    steps,
    layout = 'alternating',
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    // Convert steps to events format if events not provided
    const displayEvents: TimelineEvent[] = events || (steps?.map((step, i) => ({
        icon: step.icon,
        date: '',
        title: step.title,
        description: step.description,
        status: step.complete ? 'past' : (i === 0 ? 'current' : 'future'),
        actionPhrase: step.actionPhrase,
    } as TimelineEvent)) || []);

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {(headline || subtitle) && (
                <div className="text-center pb-8">
                    {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                    {subtitle && <p className="text-mist/60 mt-2">{subtitle}</p>}
                </div>
            )}

            {displayEvents && displayEvents.length > 0 && (
                <div className="flex-grow relative">
                    {/* Center line */}
                    {layout === 'alternating' && (
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sapphire via-jade to-transparent -translate-x-1/2" />
                    )}
                    {layout === 'left' && (
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sapphire via-jade to-transparent" />
                    )}
                    {layout === 'right' && (
                        <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sapphire via-jade to-transparent" />
                    )}

                    <div className="space-y-8">
                        {displayEvents.map((event, i) => {
                            const IconComp = getIcon(event.icon);
                            const isLeft = layout === 'left' || (layout === 'alternating' && i % 2 === 0);
                            const status = event.status || 'past';

                            return (
                                <div
                                    key={i}
                                    onClick={() => event.actionPhrase && handleAction(event.actionPhrase)}
                                    className={`relative flex items-center gap-6 ${event.actionPhrase ? 'cursor-pointer' : ''}
                                        ${layout === 'alternating'
                                            ? isLeft ? 'flex-row' : 'flex-row-reverse'
                                            : layout === 'left' ? 'flex-row' : 'flex-row-reverse'}`}
                                >
                                    {/* Content card */}
                                    <div className={`flex-1 ${layout === 'alternating' ? 'max-w-[calc(50%-2rem)]' : ''}`}>
                                        <div className={`p-5 rounded-xl border transition-all
                                            ${status === 'current'
                                                ? 'bg-sapphire/10 border-sapphire/30'
                                                : status === 'future'
                                                    ? 'bg-white/[0.02] border-white/[0.04] opacity-60'
                                                    : 'bg-gradient-to-b from-white/[0.04] to-transparent border-white/[0.06]'}
                                            ${event.actionPhrase ? 'hover:border-white/[0.15]' : ''}`}>

                                            {/* Date badge */}
                                            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs mb-3
                                                ${status === 'current' ? 'bg-sapphire/20 text-sapphire' : 'bg-white/[0.05] text-mist/50'}`}>
                                                <Calendar className="w-3 h-3" />
                                                {event.date}
                                            </div>

                                            {/* Image */}
                                            {(event.imageUrl || event.imagePrompt) && (
                                                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                                                    <SmartImage
                                                        assetId={event.imageUrl || event.imagePrompt || `event-${i}`}
                                                        alt={event.title}
                                                        className={`w-full h-full object-cover ${status === 'future' ? 'opacity-50' : ''}`}
                                                    />
                                                </div>
                                            )}

                                            <h3 className={`font-bold mb-2 ${status === 'current' ? 'text-white' : status === 'future' ? 'text-mist/50' : 'text-white'}`}>
                                                {event.title}
                                            </h3>
                                            {event.description && (
                                                <p className="text-sm text-mist/60 mb-3">{event.description}</p>
                                            )}

                                            {event.tags && event.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1">
                                                    {event.tags.map((tag, j) => (
                                                        <span key={j} className="px-2 py-0.5 text-xs rounded-full bg-white/[0.05] text-mist/50">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Timeline marker */}
                                    <div className={`absolute ${layout === 'alternating' ? 'left-1/2 -translate-x-1/2' : layout === 'left' ? 'left-6' : 'right-6'} 
                                        w-12 h-12 rounded-full flex items-center justify-center z-10
                                        ${status === 'current'
                                            ? 'bg-sapphire ring-4 ring-sapphire/30'
                                            : status === 'future'
                                                ? 'bg-obsidian border-2 border-white/[0.1]'
                                                : 'bg-jade'}`}>
                                        <IconComp className={`w-5 h-5 ${status === 'future' ? 'text-mist/40' : 'text-white'}`} />
                                    </div>

                                    {/* Spacer for alternating layout */}
                                    {layout === 'alternating' && <div className="flex-1" />}
                                </div>
                            );
                        })}
                    </div>
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

export default StepsTimeline;
