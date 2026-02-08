/**
 * Trio - RICH GENERIC
 * Exactly 3 premium cards with icons, images, badges, and action phrases
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, Sparkles } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface Card {
    icon?: string;
    badge?: string;
    imageUrl?: string;
    imagePrompt?: string;
    title: string;
    description: string;
    highlight?: boolean;
    stats?: { value: string; label: string }[];
    features?: string[];
    actionPhrase?: string;
    ctaLabel?: string;
}

interface TrioProps {
    icon?: string;
    badge?: string;
    headline?: string;
    subtitle?: string;
    cards?: Card[];
    items?: Card[];  // Alias for cards (simpler AI payloads)
    numbered?: boolean;
    variant?: 'default' | 'compact' | 'image';
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Trio: React.FC<TrioProps> = ({
    icon,
    badge,
    headline,
    subtitle,
    cards,
    items,
    numbered = true,
    variant = 'default',
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (actionPhrase: string) => { playClick(); notifyTele(actionPhrase); };

    const displayCards = (cards || items)?.slice(0, 3) || [];
    const HeaderIcon = getIcon(icon);

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {/* Header Section */}
            {(badge || icon || headline || subtitle) && (
                <div className="mb-8">
                    {(badge || icon) && (
                        <div className="flex items-center gap-3 mb-4">
                            {icon && (
                                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center">
                                    <HeaderIcon className="w-6 h-6 text-[var(--color-primary)]" />
                                </div>
                            )}
                            {badge && (
                                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                                    {badge}
                                </span>
                            )}
                        </div>
                    )}
                    {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                    {subtitle && <p className="text-mist/60 mt-2">{subtitle}</p>}
                </div>
            )}

            {displayCards.length > 0 && (
                <div className="grid md:grid-cols-3 gap-6 flex-grow">
                    {displayCards.map((card, index) => {
                        const IconComponent = getIcon(card.icon);
                        const hasImage = card.imageUrl || card.imagePrompt;

                        return (
                            <div
                                key={index}
                                onClick={() => card.actionPhrase && handleAction(card.actionPhrase)}
                                className={`group flex flex-col rounded-2xl glass-medium overflow-hidden
                                    ${card.actionPhrase ? 'cursor-pointer hover:border-[var(--color-secondary)]/30' : ''}
                                    ${card.highlight ? 'ring-2 ring-[var(--color-primary)]/50 shadow-lg shadow-[var(--color-primary)]/20' : ''}
                                    transition-all`}
                            >
                                {/* Card Image */}
                                {hasImage && (
                                    <div className="relative aspect-square overflow-hidden">
                                        <SmartImage
                                            assetId={card.imageUrl || card.imagePrompt || `card-${index}`}
                                            alt={card.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {card.badge && (
                                            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase bg-black/60 backdrop-blur-sm text-white border border-white/20">
                                                {card.badge}
                                            </span>
                                        )}
                                        {card.highlight && (
                                            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                                                <Sparkles className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Card Content */}
                                <div className="flex flex-col p-6 flex-grow">
                                    {/* Number & Icon Row (when no image) */}
                                    {!hasImage && (
                                        <div className="flex items-center gap-4 mb-5">
                                            {numbered && (
                                                <div className="w-9 h-9 rounded-full bg-[var(--color-primary)] text-white font-bold text-sm 
                                                    flex items-center justify-center flex-shrink-0 shadow-lg shadow-[var(--color-primary)]/30">
                                                    {index + 1}
                                                </div>
                                            )}
                                            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center
                                                ${card.highlight
                                                    ? 'bg-[var(--color-primary)]/20 border-[var(--color-primary)]/40'
                                                    : 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]/20'}
                                                group-hover:bg-[var(--color-primary)]/15 transition-colors`}>
                                                <IconComponent className="w-6 h-6 text-[var(--color-primary)]" />
                                            </div>
                                            {card.badge && !hasImage && (
                                                <span className="ml-auto px-3 py-1 rounded-full text-xs font-bold uppercase bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                                                    {card.badge}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* With image: show icon smaller */}
                                    {hasImage && card.icon && (
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center">
                                                <IconComponent className="w-5 h-5 text-[var(--color-primary)]" />
                                            </div>
                                            {numbered && (
                                                <span className="text-sm font-bold text-mist/40">#{index + 1}</span>
                                            )}
                                        </div>
                                    )}

                                    <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                                    <p className="text-mist/60 leading-relaxed flex-grow">{card.description}</p>

                                    {/* Stats Row */}
                                    {card.stats && card.stats.length > 0 && (
                                        <div className="flex gap-4 mt-4 pt-4 border-t border-white/[0.06] justify-end">
                                            {card.stats.slice(0, 2).map((stat, i) => (
                                                <div key={i}>
                                                    <div className="text-lg font-bold text-[var(--color-primary)]">{stat.value}</div>
                                                    <div className="text-xs text-mist/40">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Features List */}
                                    {card.features && card.features.length > 0 && (
                                        <ul className="mt-4 pt-4 border-t border-white/[0.06] space-y-2">
                                            {card.features.slice(0, 3).map((feature, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-mist/60">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Card CTA or Arrow */}
                                    {(card.ctaLabel || card.actionPhrase) && (
                                        <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                                            {card.ctaLabel ? (
                                                <span className="text-sm font-semibold text-[var(--color-primary)] group-hover:underline">
                                                    {card.ctaLabel}
                                                </span>
                                            ) : (
                                                <span />
                                            )}
                                            <ArrowRight className="w-5 h-5 text-mist/20 group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {ctaLabel && ctaActionPhrase && (
                <div className="pt-8 flex justify-end">
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

export default Trio;
