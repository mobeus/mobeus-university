/**
 * Compare - RICH GENERIC
 * Side-by-side comparison with images, badges, stats, and action phrases
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, X, Check, LucideIcon, Zap, Sparkles, AlertTriangle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface CompareColumn {
    icon?: string;
    badge?: string;
    imageUrl?: string;
    imagePrompt?: string;
    title: string;
    subtitle?: string;
    value?: string;
    items: string[];
    variant: 'bad' | 'good';
    highlight?: boolean;
    stats?: { value: string; label: string }[];
    actionPhrase?: string;
    ctaLabel?: string;
}

interface CompareSummary {
    icon?: string;
    title: string;
    description?: string;
    actionPhrase?: string;
}

interface CompareProps {
    icon?: string;
    badge?: string;
    headline?: string;
    subtitle?: string;
    columns?: CompareColumn[];
    summary?: CompareSummary;
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

export const Compare: React.FC<CompareProps> = ({
    icon,
    badge,
    headline,
    subtitle,
    columns,
    summary,
    ctaLabel,
    ctaActionPhrase,
    secondaryCtaLabel,
    secondaryCtaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const HeaderIcon = getIcon(icon);

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {/* Header Section */}
            {(badge || icon || headline || subtitle) && (
                <div className="mb-8">
                    {(badge || icon) && (
                        <div className="flex items-center gap-3 mb-4">
                            {icon && (
                                <div className="w-12 h-12 rounded-xl bg-sapphire/10 border border-sapphire/20 flex items-center justify-center">
                                    <HeaderIcon className="w-6 h-6 text-sapphire" />
                                </div>
                            )}
                            {badge && (
                                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sapphire/10 text-sapphire border border-sapphire/20">
                                    {badge}
                                </span>
                            )}
                        </div>
                    )}
                    {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                    {subtitle && <p className="text-mist/60 mt-2">{subtitle}</p>}
                </div>
            )}

            {columns && columns.length > 0 && (
                <div className={`grid gap-6 flex-grow ${columns.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                    {columns.map((col, index) => {
                        const ColIcon = getIcon(col.icon);
                        const isBad = col.variant === 'bad';
                        const hasImage = col.imageUrl || col.imagePrompt;

                        return (
                            <div
                                key={index}
                                onClick={() => col.actionPhrase && handleAction(col.actionPhrase)}
                                className={`relative rounded-2xl overflow-hidden flex flex-col
                                    ${col.actionPhrase ? 'cursor-pointer' : ''}
                                    ${isBad
                                        ? 'bg-white/[0.02] border border-white/[0.05]'
                                        : 'bg-gradient-to-b from-jade/10 to-jade/5 border border-jade/20'
                                    }
                                    ${col.highlight && !isBad ? 'ring-2 ring-jade/50 shadow-lg shadow-jade/20' : ''}
                                    transition-all`}
                            >
                                {/* Image */}
                                {hasImage && (
                                    <div className="relative aspect-square overflow-hidden">
                                        <SmartImage
                                            assetId={col.imageUrl || col.imagePrompt || `compare-${index}`}
                                            alt={col.title}
                                            className={`w-full h-full object-cover ${isBad ? 'opacity-60 grayscale' : ''}`}
                                        />
                                        {col.badge && (
                                            <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm border
                                                ${isBad
                                                    ? 'bg-red-500/60 text-white border-red-500/30'
                                                    : 'bg-jade/60 text-white border-jade/30'}`}>
                                                {col.badge}
                                            </span>
                                        )}
                                        {col.highlight && !isBad && (
                                            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-jade flex items-center justify-center">
                                                <Sparkles className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    {/* Header Row */}
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                                            ${isBad
                                                ? 'bg-white/[0.04] border border-white/[0.08]'
                                                : 'bg-jade/15 border border-jade/25'
                                            }`}>
                                            <ColIcon className={`w-6 h-6 ${isBad ? 'text-mist/40' : 'text-jade'}`} />
                                        </div>
                                        <div className="flex-grow">
                                            <span className={`text-sm font-medium uppercase tracking-wider
                                                ${isBad ? 'text-mist/40' : 'text-jade/80'}`}>
                                                {col.title}
                                            </span>
                                            {col.subtitle && (
                                                <p className={`text-xs mt-0.5 ${isBad ? 'text-mist/30' : 'text-mist/50'}`}>{col.subtitle}</p>
                                            )}
                                            {col.value && (
                                                <div className={`text-3xl md:text-4xl font-bold tracking-tight
                                                    ${isBad ? 'text-red-400/80' : 'text-jade'}`}>
                                                    {col.value}
                                                </div>
                                            )}
                                        </div>
                                        {!hasImage && col.badge && (
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                                                ${isBad
                                                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                                    : 'bg-jade/10 text-jade border border-jade/20'}`}>
                                                {col.badge}
                                            </span>
                                        )}
                                    </div>

                                    {/* Items List */}
                                    <div className="space-y-3 flex-grow">
                                        {col.items.map((item, i) => (
                                            <div key={i} className={`flex items-start gap-3 p-3 rounded-xl
                                                ${isBad ? 'bg-white/[0.02]' : 'bg-jade/5'}`}>
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0
                                                    ${isBad
                                                        ? 'bg-red-400/10 border border-red-400/20'
                                                        : 'bg-jade/15 border border-jade/25'
                                                    }`}>
                                                    {isBad
                                                        ? <X className="w-3 h-3 text-red-400/70" />
                                                        : <Check className="w-3 h-3 text-jade" />
                                                    }
                                                </div>
                                                <span className={`text-sm leading-relaxed ${isBad ? 'text-mist/50' : 'text-mist/80'}`}>
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Stats */}
                                    {col.stats && col.stats.length > 0 && (
                                        <div className="flex gap-4 mt-4 pt-4 border-t border-white/[0.06]">
                                            {col.stats.slice(0, 2).map((stat, i) => (
                                                <div key={i}>
                                                    <div className={`text-lg font-bold ${isBad ? 'text-mist/40' : 'text-jade'}`}>{stat.value}</div>
                                                    <div className="text-xs text-mist/40">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Column CTA */}
                                    {col.ctaLabel && col.actionPhrase && (
                                        <div className="mt-4 pt-4 border-t border-white/[0.06]">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleAction(col.actionPhrase!); }}
                                                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all
                                                    ${isBad
                                                        ? 'bg-white/[0.05] text-mist/60 hover:bg-white/[0.1]'
                                                        : 'bg-jade/20 text-jade hover:bg-jade/30'}`}
                                            >
                                                {col.ctaLabel}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Summary Banner */}
            {summary && (
                <div
                    onClick={() => summary.actionPhrase && handleAction(summary.actionPhrase)}
                    className={`mt-8 p-6 rounded-2xl bg-gradient-to-r from-jade/10 to-jade/5 border border-jade/20
                        flex items-center justify-between gap-6 ${summary.actionPhrase ? 'cursor-pointer hover:border-jade/40' : ''} transition-all`}
                >
                    <div className="flex items-center gap-4">
                        {summary.icon && (
                            <div className="w-12 h-12 rounded-xl bg-jade/15 border border-jade/25 flex items-center justify-center">
                                {React.createElement(getIcon(summary.icon), { className: 'w-6 h-6 text-jade' })}
                            </div>
                        )}
                        <div>
                            <p className="text-white font-semibold text-lg">{summary.title}</p>
                            {summary.description && <p className="text-mist/50 text-sm mt-1">{summary.description}</p>}
                        </div>
                    </div>
                    {ctaLabel && ctaActionPhrase && (
                        <button
                            className="inline-flex items-center gap-2 px-6 py-3 bg-flamingo text-white font-semibold rounded-full 
                                hover:bg-flamingo/90 transition-all flex-shrink-0 shadow-lg shadow-flamingo/20"
                            onClick={(e) => { e.stopPropagation(); handleAction(ctaActionPhrase); }}
                        >
                            {ctaLabel}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            )}

            {/* CTAs (when no summary) */}
            {!summary && (ctaLabel || secondaryCtaLabel) && (
                <div className="pt-8 flex flex-wrap gap-4 justify-end">
                    {secondaryCtaLabel && secondaryCtaActionPhrase && (
                        <button
                            className="inline-flex items-center gap-3 px-6 py-3 bg-white/[0.05] border border-white/[0.1] text-white font-semibold rounded-full 
                                hover:bg-white/[0.1] transition-all"
                            onClick={() => handleAction(secondaryCtaActionPhrase)}
                        >
                            {secondaryCtaLabel}
                        </button>
                    )}
                    {ctaLabel && ctaActionPhrase && (
                        <button
                            className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                                hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                                transition-all duration-200 text-lg shadow-lg shadow-flamingo/20"
                            onClick={() => handleAction(ctaActionPhrase)}
                        >
                            {ctaLabel}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Compare;
