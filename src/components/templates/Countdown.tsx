/**
 * Countdown - RICH GENERIC
 * Time-sensitive urgency unit for events — days remaining, tagline, CTA
 * Designed for the March/April 2026 Launch Event
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, LucideIcon, Zap, Calendar, Clock } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface CountdownDetail {
    icon?: string;
    text: string;
}

interface CountdownProps {
    icon?: string;
    badge?: string;
    headline?: string;
    subtitle?: string;
    targetDate: string;
    eventName?: string;
    tagline?: string;
    details?: CountdownDetail[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
    secondaryCtaLabel?: string;
    secondaryCtaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Countdown: React.FC<CountdownProps> = ({
    icon,
    badge,
    headline,
    subtitle,
    targetDate,
    eventName,
    tagline,
    details,
    ctaLabel,
    ctaActionPhrase,
    secondaryCtaLabel,
    secondaryCtaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const HeaderIcon = getIcon(icon);

    // Calculate time remaining
    const target = useMemo(() => new Date(targetDate).getTime(), [targetDate]);

    const [timeLeft, setTimeLeft] = useState(() => {
        const diff = target - Date.now();
        return diff > 0 ? diff : 0;
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const diff = target - Date.now();
            setTimeLeft(diff > 0 ? diff : 0);
        }, 1000);
        return () => clearInterval(timer);
    }, [target]);

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const isPast = timeLeft <= 0;

    const timeUnits = [
        { value: days, label: 'Days' },
        { value: hours, label: 'Hours' },
        { value: minutes, label: 'Minutes' },
        { value: seconds, label: 'Seconds' },
    ];

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-flamingo/[0.04] rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-sapphire/[0.04] rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col flex-grow">
                {/* Header */}
                {(badge || headline) && (
                    <div className="mb-6 text-center">
                        {(badge || icon) && (
                            <div className="flex items-center justify-center gap-3 mb-4">
                                {icon && (
                                    <div className="w-12 h-12 rounded-xl bg-flamingo/10 border border-flamingo/20 flex items-center justify-center">
                                        <HeaderIcon className="w-6 h-6 text-flamingo" />
                                    </div>
                                )}
                                {badge && (
                                    <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-flamingo/10 text-flamingo border border-flamingo/20 animate-pulse">
                                        {badge}
                                    </span>
                                )}
                            </div>
                        )}
                        {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                        {subtitle && <p className="text-mist/60 mt-2">{subtitle}</p>}
                    </div>
                )}

                {/* Countdown Digits */}
                <div className="flex-grow flex items-center justify-center py-6">
                    {isPast ? (
                        <div className="text-center">
                            <div className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-flamingo to-jade">
                                {eventName || 'Now Live'}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-3 md:gap-5">
                            {timeUnits.map((unit, i) => (
                                <React.Fragment key={unit.label}>
                                    <div className="flex flex-col items-center">
                                        <div className="relative">
                                            <div className="w-16 h-16 md:w-22 md:h-22 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shadow-lg backdrop-blur-sm">
                                                <span className="text-2xl md:text-4xl font-bold text-white tabular-nums">
                                                    {String(unit.value).padStart(2, '0')}
                                                </span>
                                            </div>
                                            {/* Tiny glow under active digits */}
                                            {unit.value > 0 && (
                                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-flamingo/30 rounded-full blur-sm" />
                                            )}
                                        </div>
                                        <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-mist/40 mt-2.5">
                                            {unit.label}
                                        </span>
                                    </div>
                                    {/* Separator colon */}
                                    {i < timeUnits.length - 1 && (
                                        <div className="flex flex-col gap-1.5 mb-5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-mist/25" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-mist/25" />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>

                {/* Tagline */}
                {tagline && (
                    <div className="text-center mb-6">
                        <p className="text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-flamingo via-white to-jade">
                            {tagline}
                        </p>
                    </div>
                )}

                {/* Details Row */}
                {details && details.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        {details.map((detail, i) => {
                            const DetailIcon = getIcon(detail.icon);
                            return (
                                <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                    <DetailIcon className="w-4 h-4 text-mist/50" />
                                    <span className="text-sm text-mist/60">{detail.text}</span>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* CTAs */}
                {(ctaLabel || secondaryCtaLabel) && (
                    <div className="flex flex-wrap items-center justify-end gap-4 pt-4">
                        {ctaLabel && ctaActionPhrase && (
                            <button
                                className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                                    hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                                    transition-all text-lg shadow-lg shadow-flamingo/20"
                                onClick={() => handleAction(ctaActionPhrase)}
                            >
                                {ctaLabel}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        )}
                        {secondaryCtaLabel && secondaryCtaActionPhrase && (
                            <button
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.05] border border-white/[0.1] text-white font-semibold rounded-full 
                                    hover:bg-white/[0.1] transition-all"
                                onClick={() => handleAction(secondaryCtaActionPhrase)}
                            >
                                {secondaryCtaLabel}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Countdown;
