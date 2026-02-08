/**
 * BeforeAfter - RICH GENERIC
 * Story-driven transformation — "Today" pain vs "Tomorrow with a tele" hope
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, X, Check, Sparkles, MoveRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface BeforeAfterSide {
    icon?: string;
    badge?: string;
    title: string;
    narrative: string;
    points?: string[];
    stats?: { value: string; label: string }[];
}

interface BeforeAfterProps {
    icon?: string;
    badge?: string;
    headline?: string;
    subtitle?: string;
    before: BeforeAfterSide;
    after: BeforeAfterSide;
    tagline?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const BeforeAfter: React.FC<BeforeAfterProps> = ({
    icon,
    badge,
    headline,
    subtitle,
    before,
    after,
    tagline,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const HeaderIcon = getIcon(icon);
    const BeforeIcon = getIcon(before.icon || 'X');
    const AfterIcon = getIcon(after.icon || 'Check');

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {/* Header */}
            {(badge || headline) && (
                <div className="mb-8">
                    {(badge || icon) && (
                        <div className="flex items-center gap-3 mb-4">
                            {icon && (
                                <div className="w-12 h-12 rounded-xl bg-flamingo/10 border border-flamingo/20 flex items-center justify-center">
                                    <HeaderIcon className="w-6 h-6 text-flamingo" />
                                </div>
                            )}
                            {badge && (
                                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-flamingo/10 text-flamingo border border-flamingo/20">
                                    {badge}
                                </span>
                            )}
                        </div>
                    )}
                    {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                    {subtitle && <p className="text-mist/60 mt-2">{subtitle}</p>}
                </div>
            )}

            {/* Two-panel layout */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 flex-grow relative">
                {/* BEFORE Panel */}
                <div className="relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06] flex flex-col">
                    {/* Subtle red/exhaustion gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.03] to-transparent pointer-events-none" />

                    <div className="relative p-6 flex flex-col flex-grow">
                        {/* Before Header */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 rounded-xl bg-red-400/10 border border-red-400/20 flex items-center justify-center">
                                <BeforeIcon className="w-5 h-5 text-red-400/70" />
                            </div>
                            <div>
                                {before.badge && (
                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-400/80 border border-red-500/15">
                                        {before.badge}
                                    </span>
                                )}
                                <div className="text-lg font-bold text-mist/50 mt-1">{before.title}</div>
                            </div>
                        </div>

                        {/* Narrative */}
                        <p className="text-mist/45 leading-relaxed text-sm mb-5">{before.narrative}</p>

                        {/* Pain Points */}
                        {before.points && before.points.length > 0 && (
                            <div className="space-y-2.5 flex-grow">
                                {before.points.map((point, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
                                        <div className="w-5 h-5 rounded-full bg-red-400/10 border border-red-400/15 flex items-center justify-center mt-0.5 flex-shrink-0">
                                            <X className="w-3 h-3 text-red-400/60" />
                                        </div>
                                        <span className="text-sm text-mist/40 leading-relaxed">{point}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Before Stats */}
                        {before.stats && before.stats.length > 0 && (
                            <div className="flex gap-6 mt-5 pt-4 border-t border-white/[0.05]">
                                {before.stats.map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-xl font-bold text-red-400/60">{stat.value}</div>
                                        <div className="text-xs text-mist/30">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Center Arrow (desktop) */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-flamingo to-jade flex items-center justify-center shadow-lg shadow-flamingo/20 border-2 border-white/10">
                        <MoveRight className="w-5 h-5 text-white" />
                    </div>
                </div>

                {/* AFTER Panel */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-jade/10 to-jade/[0.03] border border-jade/25 flex flex-col ring-1 ring-jade/10">
                    {/* Vibrant hope gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-jade/[0.05] via-transparent to-sapphire/[0.03] pointer-events-none" />

                    <div className="relative p-6 flex flex-col flex-grow">
                        {/* After Header */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 rounded-xl bg-jade/15 border border-jade/25 flex items-center justify-center">
                                <AfterIcon className="w-5 h-5 text-jade" />
                            </div>
                            <div>
                                {after.badge && (
                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-jade/10 text-jade border border-jade/20">
                                        {after.badge}
                                    </span>
                                )}
                                <div className="text-lg font-bold text-white mt-1">{after.title}</div>
                            </div>
                        </div>

                        {/* Narrative */}
                        <p className="text-mist/70 leading-relaxed text-sm mb-5">{after.narrative}</p>

                        {/* Benefits */}
                        {after.points && after.points.length > 0 && (
                            <div className="space-y-2.5 flex-grow">
                                {after.points.map((point, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-jade/[0.06]">
                                        <div className="w-5 h-5 rounded-full bg-jade/15 border border-jade/25 flex items-center justify-center mt-0.5 flex-shrink-0">
                                            <Check className="w-3 h-3 text-jade" />
                                        </div>
                                        <span className="text-sm text-mist/75 leading-relaxed">{point}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* After Stats */}
                        {after.stats && after.stats.length > 0 && (
                            <div className="flex gap-6 mt-5 pt-4 border-t border-jade/15">
                                {after.stats.map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-xl font-bold text-jade">{stat.value}</div>
                                        <div className="text-xs text-mist/50">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Tagline */}
            {tagline && (
                <div className="mt-8 text-center">
                    <p className="text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-flamingo via-white to-jade italic">
                        {tagline}
                    </p>
                </div>
            )}

            {/* CTA */}
            {ctaLabel && ctaActionPhrase && (
                <div className="mt-6 flex justify-center">
                    <button
                        className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                            hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                            transition-all text-lg shadow-lg shadow-flamingo/20"
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

export default BeforeAfter;
