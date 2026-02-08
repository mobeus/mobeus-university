/**
 * EraShift - RICH GENERIC
 * Dramatic paradigm shift — asymmetric visual weight between past and future eras
 * The future side feels like a sunrise
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, Sunrise, X, Sparkles } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface EraDetail {
    icon?: string;
    text: string;
}

interface EraSide {
    icon?: string;
    badge?: string;
    title: string;
    subtitle?: string;
    description?: string;
    details: EraDetail[];
    stat?: { value: string; label: string };
}

interface EraShiftProps {
    icon?: string;
    badge?: string;
    headline?: string;
    subtitle?: string;
    past: EraSide;
    future: EraSide;
    dividerLabel?: string;
    declaration?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const EraShift: React.FC<EraShiftProps> = ({
    icon,
    badge,
    headline,
    subtitle,
    past,
    future,
    dividerLabel,
    declaration,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const HeaderIcon = getIcon(icon);
    const PastIcon = getIcon(past.icon || 'X');
    const FutureIcon = getIcon(future.icon || 'Sunrise');

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col relative overflow-hidden">
            {/* Ambient sunrise glow on right side */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-jade/[0.04] via-transparent to-transparent" />
                <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-jade/[0.06] rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-red-500/[0.02] via-transparent to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col flex-grow">
                {/* Header */}
                {(badge || headline) && (
                    <div className="mb-8 text-center">
                        {(badge || icon) && (
                            <div className="flex items-center justify-center gap-3 mb-4">
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

                {/* Two-era layout with divider */}
                <div className="grid md:grid-cols-[1fr_auto_1.2fr] gap-4 md:gap-0 flex-grow items-stretch">
                    {/* PAST ERA — muted, exhausted */}
                    <div className="rounded-2xl p-5 md:p-6 bg-white/[0.02] border border-white/[0.05] flex flex-col">
                        {/* Era Header */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                                <PastIcon className="w-5 h-5 text-mist/35" />
                            </div>
                            <div>
                                {past.badge && (
                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/[0.04] text-mist/40 border border-white/[0.06]">
                                        {past.badge}
                                    </span>
                                )}
                                <div className="text-xl font-bold text-mist/40 mt-1">{past.title}</div>
                                {past.subtitle && <div className="text-xs text-mist/25 mt-0.5">{past.subtitle}</div>}
                            </div>
                        </div>

                        {past.description && (
                            <p className="text-mist/35 text-sm leading-relaxed mb-5">{past.description}</p>
                        )}

                        {/* Details */}
                        <div className="space-y-2.5 flex-grow">
                            {past.details.map((detail, i) => {
                                const DetailIcon = getIcon(detail.icon);
                                return (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02]">
                                        <div className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center flex-shrink-0">
                                            <DetailIcon className="w-3.5 h-3.5 text-mist/25" />
                                        </div>
                                        <span className="text-sm text-mist/35">{detail.text}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Stat */}
                        {past.stat && (
                            <div className="mt-5 pt-4 border-t border-white/[0.04] text-center">
                                <div className="text-2xl font-bold text-mist/25">{past.stat.value}</div>
                                <div className="text-xs text-mist/20 mt-0.5">{past.stat.label}</div>
                            </div>
                        )}
                    </div>

                    {/* DIVIDER — the breaking point */}
                    <div className="hidden md:flex flex-col items-center justify-center px-4 md:px-6">
                        <div className="w-[2px] flex-grow bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                        {dividerLabel ? (
                            <div className="my-4 px-4 py-3 rounded-full bg-gradient-to-r from-flamingo/20 to-jade/20 border border-white/10 backdrop-blur-sm">
                                <span className="text-xs font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-flamingo to-jade">
                                    {dividerLabel}
                                </span>
                            </div>
                        ) : (
                            <div className="my-4 w-10 h-10 rounded-full bg-gradient-to-r from-flamingo to-jade flex items-center justify-center shadow-lg">
                                <ArrowRight className="w-4 h-4 text-white" />
                            </div>
                        )}
                        <div className="w-[2px] flex-grow bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                    </div>

                    {/* Mobile divider */}
                    <div className="md:hidden flex items-center justify-center py-2">
                        <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <div className="mx-4 w-10 h-10 rounded-full bg-gradient-to-r from-flamingo to-jade flex items-center justify-center shadow-lg">
                            <ArrowRight className="w-4 h-4 text-white rotate-90" />
                        </div>
                        <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>

                    {/* FUTURE ERA — vibrant, alive, sunrise energy */}
                    <div className="rounded-2xl p-5 md:p-6 bg-gradient-to-br from-jade/10 via-jade/[0.04] to-sapphire/[0.04] border border-jade/20 ring-1 ring-jade/10 flex flex-col relative overflow-hidden">
                        {/* Inner sunrise glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-jade/[0.08] rounded-full blur-2xl pointer-events-none" />

                        <div className="relative z-10 flex flex-col flex-grow">
                            {/* Era Header */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-11 h-11 rounded-xl bg-jade/15 border border-jade/25 flex items-center justify-center">
                                    <FutureIcon className="w-5 h-5 text-jade" />
                                </div>
                                <div>
                                    {future.badge && (
                                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-jade/10 text-jade border border-jade/20">
                                            {future.badge}
                                        </span>
                                    )}
                                    <div className="text-xl font-bold text-white mt-1">{future.title}</div>
                                    {future.subtitle && <div className="text-xs text-mist/50 mt-0.5">{future.subtitle}</div>}
                                </div>
                            </div>

                            {future.description && (
                                <p className="text-mist/65 text-sm leading-relaxed mb-5">{future.description}</p>
                            )}

                            {/* Details */}
                            <div className="space-y-2.5 flex-grow">
                                {future.details.map((detail, i) => {
                                    const DetailIcon = getIcon(detail.icon);
                                    return (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-jade/[0.06]">
                                            <div className="w-7 h-7 rounded-lg bg-jade/15 border border-jade/20 flex items-center justify-center flex-shrink-0">
                                                <DetailIcon className="w-3.5 h-3.5 text-jade" />
                                            </div>
                                            <span className="text-sm text-mist/70">{detail.text}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Stat */}
                            {future.stat && (
                                <div className="mt-5 pt-4 border-t border-jade/15 text-center">
                                    <div className="text-2xl font-bold text-jade">{future.stat.value}</div>
                                    <div className="text-xs text-mist/50 mt-0.5">{future.stat.label}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Declaration */}
                {declaration && (
                    <div className="mt-8 text-center">
                        <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-flamingo via-white to-jade">
                            {declaration}
                        </p>
                    </div>
                )}

                {/* CTA */}
                {ctaLabel && ctaActionPhrase && (
                    <div className="mt-6 flex justify-end">
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
        </div>
    );
};

export default EraShift;
