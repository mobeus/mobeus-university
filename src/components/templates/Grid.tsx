/**
 * Grid - RICH GENERIC
 * Card grid with images, badges, stats, and action phrases
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, Layers } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface GridCard {
    icon?: string;
    badge?: string;
    imageUrl?: string;
    imagePrompt?: string;
    title: string;
    description: string;
    stats?: { value: string; label: string }[];
    highlight?: boolean;
    actionPhrase?: string;
    ctaLabel?: string;
}

interface GridSection {
    icon?: string;
    label?: string;
    description?: string;
    cards: GridCard[];
    variant?: 'default' | 'accent';
}

interface GridProps {
    icon?: string;
    badge?: string;
    headline?: string;
    subtitle?: string;
    sections?: GridSection[];
    items?: GridCard[];  // Direct items for simpler AI payloads
    columns?: 2 | 3 | 4;
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

export const Grid: React.FC<GridProps> = ({
    icon,
    badge,
    headline,
    subtitle,
    sections,
    items,
    columns = 3,
    ctaLabel,
    ctaActionPhrase,
    secondaryCtaLabel,
    secondaryCtaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    // Normalize: convert 'items' to 'sections' if provided
    const normalizedSections: GridSection[] = sections || (items ? [{ cards: items }] : []);
    const HeaderIcon = getIcon(icon);

    const colClasses = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4',
    };

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

            {normalizedSections && normalizedSections.length > 0 && (
                <div className="space-y-10 flex-grow">
                    {normalizedSections.map((section, sIdx) => {
                        const isAccent = section.variant === 'accent';
                        const iconBg = isAccent ? 'bg-flamingo/15 border-flamingo/25' : 'bg-sapphire/10 border-sapphire/20';
                        const iconColor = isAccent ? 'text-flamingo' : 'text-sapphire';
                        const labelColor = isAccent ? 'text-flamingo' : 'text-sapphire';
                        const SectionIcon = section.icon ? getIcon(section.icon) : Layers;

                        return (
                            <div key={sIdx}>
                                {(section.label || section.icon) && (
                                    <div className="flex items-center gap-3 mb-5">
                                        {section.icon && (
                                            <div className={`w-8 h-8 rounded-lg ${iconBg} border flex items-center justify-center`}>
                                                <SectionIcon className={`w-4 h-4 ${iconColor}`} />
                                            </div>
                                        )}
                                        <div>
                                            {section.label && (
                                                <span className={`text-sm font-semibold ${labelColor} uppercase tracking-wider`}>
                                                    {section.label}
                                                </span>
                                            )}
                                            {section.description && (
                                                <p className="text-xs text-mist/50 mt-0.5">{section.description}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div className={`grid gap-5 ${colClasses[columns]}`}>
                                    {section.cards.map((card, cIdx) => {
                                        const CardIcon = getIcon(card.icon);
                                        const hasImage = card.imageUrl || card.imagePrompt;

                                        return (
                                            <div
                                                key={cIdx}
                                                onClick={() => card.actionPhrase && handleAction(card.actionPhrase)}
                                                className={`group rounded-2xl overflow-hidden
                                                    bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]
                                                    ${card.actionPhrase ? 'cursor-pointer hover:border-sapphire/30 hover:from-sapphire/[0.06]' : ''}
                                                    ${card.highlight ? 'ring-2 ring-sapphire/50 shadow-lg shadow-sapphire/20' : ''}
                                                    transition-all flex flex-col`}
                                            >
                                                {/* Image */}
                                                {hasImage && (
                                                    <div className="relative aspect-square overflow-hidden">
                                                        <SmartImage
                                                            assetId={card.imageUrl || card.imagePrompt || `grid-${sIdx}-${cIdx}`}
                                                            alt={card.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                        {card.badge && (
                                                            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase bg-black/60 backdrop-blur-sm text-white border border-white/20">
                                                                {card.badge}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Content */}
                                                <div className="p-6 flex flex-col flex-grow">
                                                    {/* Icon & Badge (when no image) */}
                                                    {!hasImage && (
                                                        <div className="flex items-center gap-3 mb-5">
                                                            <div className={`w-12 h-12 rounded-xl ${iconBg} border flex items-center justify-center
                                                                group-hover:bg-sapphire/15 transition-colors`}>
                                                                <CardIcon className={`w-6 h-6 ${iconColor}`} />
                                                            </div>
                                                            {card.badge && (
                                                                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-sapphire/10 text-sapphire border border-sapphire/20">
                                                                    {card.badge}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* With image: show smaller icon */}
                                                    {hasImage && card.icon && (
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <div className={`w-8 h-8 rounded-lg ${iconBg} border flex items-center justify-center`}>
                                                                <CardIcon className={`w-4 h-4 ${iconColor}`} />
                                                            </div>
                                                        </div>
                                                    )}

                                                    <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                                                    <p className="text-sm text-mist/60 flex-grow leading-relaxed">{card.description}</p>

                                                    {/* Stats */}
                                                    {card.stats && card.stats.length > 0 && (
                                                        <div className="flex gap-4 mt-4 pt-4 border-t border-white/[0.06] justify-end">
                                                            {card.stats.slice(0, 2).map((stat, i) => (
                                                                <div key={i}>
                                                                    <div className="text-lg font-bold text-sapphire">{stat.value}</div>
                                                                    <div className="text-xs text-mist/40">{stat.label}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Card CTA or Arrow */}
                                                    {(card.ctaLabel || card.actionPhrase) && (
                                                        <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                                                            {card.ctaLabel ? (
                                                                <span className="text-sm font-semibold text-sapphire group-hover:underline">
                                                                    {card.ctaLabel}
                                                                </span>
                                                            ) : (
                                                                <span />
                                                            )}
                                                            <ArrowRight className="w-5 h-5 text-mist/20 group-hover:text-sapphire group-hover:translate-x-1 transition-all" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* CTAs */}
            {(ctaLabel || secondaryCtaLabel) && (
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

export default Grid;
