/**
 * Showcase - RICH GENERIC
 * Premium showcase with image, badges, stats, benefits, and multiple action points
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, Sparkles, Star } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface BenefitItem {
    icon?: string;
    badge?: string;
    title?: string;
    text: string;
    description?: string;
    stat?: { value: string; label: string };
    highlight?: boolean;
    actionPhrase?: string;
}

interface ShowcaseProps {
    icon?: string;
    badge?: string;
    headline?: string;
    subheadline?: string;
    heroImageUrl?: string;
    heroImagePrompt?: string;
    rating?: number;
    ratingLabel?: string;
    benefits?: BenefitItem[];
    tagline?: string;
    taglineIcon?: string;
    taglineActionPhrase?: string;
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

export const Showcase: React.FC<ShowcaseProps> = ({
    icon,
    badge,
    headline,
    subheadline,
    heroImageUrl,
    heroImagePrompt,
    rating,
    ratingLabel,
    benefits,
    tagline,
    taglineIcon,
    taglineActionPhrase,
    ctaLabel,
    ctaActionPhrase,
    secondaryCtaLabel,
    secondaryCtaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const HeaderIcon = getIcon(icon);
    const TaglineIcon = getIcon(taglineIcon || 'Sparkles');
    const hasHeroImage = heroImageUrl || heroImagePrompt;

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {/* Header Section */}
            {(badge || icon || headline || subheadline) && (
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
                    {subheadline && <p className="text-mist/60 mt-2">{subheadline}</p>}
                </div>
            )}

            {/* Hero Image with Rating */}
            {hasHeroImage && (
                <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] mb-8">
                    <SmartImage
                        assetId={heroImageUrl || heroImagePrompt || 'showcase-hero'}
                        alt={headline || 'Showcase'}
                        className="w-full aspect-square object-cover"
                    />
                    {rating !== undefined && (
                        <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm flex items-center gap-2">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-4 h-4 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-mist/30'}`}
                                    />
                                ))}
                            </div>
                            {ratingLabel && <span className="text-white text-sm font-medium">{ratingLabel}</span>}
                        </div>
                    )}
                </div>
            )}

            {/* Benefits Grid */}
            {benefits && benefits.length > 0 && (
                <div className={`grid gap-5 flex-grow ${benefits.length === 2 ? 'md:grid-cols-2 max-w-3xl' :
                    benefits.length === 3 ? 'md:grid-cols-3' :
                        'md:grid-cols-2 lg:grid-cols-4'
                    }`}>
                    {benefits.map((benefit, index) => {
                        const IconComp = getIcon(benefit.icon);
                        return (
                            <div
                                key={index}
                                onClick={() => benefit.actionPhrase && handleAction(benefit.actionPhrase)}
                                className={`group relative p-6 rounded-2xl overflow-hidden
                                    bg-gradient-to-b from-white/[0.04] to-transparent border
                                    ${benefit.highlight
                                        ? 'border-sapphire/40 ring-2 ring-sapphire/30 shadow-lg shadow-sapphire/20'
                                        : 'border-white/[0.06]'}
                                    ${benefit.actionPhrase ? 'cursor-pointer hover:border-sapphire/30 hover:from-sapphire/[0.06]' : ''}
                                    transition-all duration-300`}
                            >
                                {/* Highlight Badge */}
                                {benefit.highlight && (
                                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-sapphire flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                )}

                                {/* Badge */}
                                {benefit.badge && (
                                    <span className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-bold uppercase bg-sapphire/10 text-sapphire border border-sapphire/20">
                                        {benefit.badge}
                                    </span>
                                )}

                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl bg-sapphire/10 border border-sapphire/20 
                                    flex items-center justify-center mb-5
                                    group-hover:bg-sapphire/15 group-hover:border-sapphire/30 transition-all">
                                    <IconComp className="w-7 h-7 text-sapphire" />
                                </div>

                                {/* Title & Text */}
                                {benefit.title && (
                                    <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                                )}
                                <span className="text-white font-medium leading-snug block">{benefit.text}</span>
                                {benefit.description && (
                                    <p className="text-sm text-mist/50 mt-2">{benefit.description}</p>
                                )}

                                {/* Stat */}
                                {benefit.stat && (
                                    <div className="mt-4 pt-4 border-t border-white/[0.06]">
                                        <div className="text-2xl font-bold text-sapphire">{benefit.stat.value}</div>
                                        <div className="text-xs text-mist/40">{benefit.stat.label}</div>
                                    </div>
                                )}

                                {/* Arrow */}
                                {benefit.actionPhrase && (
                                    <ArrowRight className="absolute bottom-6 right-6 w-5 h-5 text-mist/20 
                                        group-hover:text-sapphire group-hover:translate-x-1 transition-all" />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Tagline */}
            {tagline && (
                <div className="py-8">
                    <button
                        onClick={() => taglineActionPhrase && handleAction(taglineActionPhrase)}
                        className={`inline-flex items-center gap-3 px-8 py-4 rounded-full 
                            bg-gradient-to-r from-sapphire/10 to-sapphire/5 border border-sapphire/20
                            ${taglineActionPhrase ? 'cursor-pointer hover:border-sapphire/40' : ''} transition-all`}
                    >
                        <TaglineIcon className="w-5 h-5 text-sapphire animate-pulse" />
                        <span className="text-lg text-sapphire font-medium">"{tagline}"</span>
                    </button>
                </div>
            )}

            <div className="flex-grow" />

            {/* CTAs */}
            {(ctaLabel || secondaryCtaLabel) && (
                <div className="pt-6 pb-2 flex flex-wrap gap-4 justify-end">
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

export default Showcase;
