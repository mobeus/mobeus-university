/**
 * Banner - RICH GENERIC
 * Full-width call-to-action banner with image, stats, and rich actions
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, Sparkles } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface BannerStat {
    value: string;
    label: string;
}

interface BannerProps {
    icon?: string;
    badge?: string;
    headline?: string;
    subheadline?: string;
    description?: string;
    imageUrl?: string;
    imagePrompt?: string;
    stats?: BannerStat[];
    features?: { icon?: string; text: string }[];
    highlight?: boolean;
    variant?: 'gradient' | 'solid' | 'outline' | 'accent';
    bannerActionPhrase?: string;  // Click anywhere on banner
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

export const Banner: React.FC<BannerProps> = ({
    icon,
    badge,
    headline,
    subheadline,
    description,
    imageUrl,
    imagePrompt,
    stats,
    features,
    highlight = false,
    variant = 'gradient',
    bannerActionPhrase,
    ctaLabel,
    ctaActionPhrase,
    secondaryCtaLabel,
    secondaryCtaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const IconComponent = icon ? getIcon(icon) : null;
    const hasImage = imageUrl || imagePrompt;

    const bgClass = {
        gradient: 'bg-gradient-to-r from-sapphire/10 via-white/[0.02] to-flamingo/10 border-white/[0.08]',
        solid: 'bg-sapphire/10 border-sapphire/20',
        outline: 'bg-transparent border-white/[0.08]',
        accent: 'bg-gradient-to-r from-flamingo/15 to-flamingo/5 border-flamingo/30',
    }[variant];

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col justify-center">
            <div
                onClick={() => bannerActionPhrase && handleAction(bannerActionPhrase)}
                className={`relative p-8 md:p-12 rounded-2xl border ${bgClass} flex-grow flex items-center overflow-hidden
                    ${bannerActionPhrase ? 'cursor-pointer hover:border-sapphire/40' : ''}
                    ${highlight ? 'ring-2 ring-sapphire/50 shadow-xl shadow-sapphire/20' : ''}
                    transition-all`}
            >
                {/* Highlight Sparkle */}
                {highlight && (
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-sapphire flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                )}

                <div className="w-full flex flex-col lg:flex-row items-center gap-8">
                    {/* Image Section */}
                    {hasImage && (
                        <div className="w-full lg:w-1/3 rounded-xl overflow-hidden border border-white/[0.06] flex-shrink-0">
                            <SmartImage
                                assetId={imageUrl || imagePrompt || 'banner-image'}
                                alt={headline || 'Banner'}
                                className="w-full aspect-square object-cover"
                            />
                        </div>
                    )}

                    {/* Content Section */}
                    <div className="flex-grow">
                        {/* Badge */}
                        {badge && (
                            <span className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs font-bold uppercase tracking-wider bg-sapphire/10 text-sapphire border border-sapphire/20">
                                {badge}
                            </span>
                        )}

                        {/* Icon & Headline Row */}
                        <div className="flex items-center gap-5 mb-4">
                            {IconComponent && (
                                <div className="w-16 h-16 rounded-2xl bg-sapphire/10 border border-sapphire/20 
                                    flex items-center justify-center flex-shrink-0">
                                    <IconComponent className="w-8 h-8 text-sapphire" />
                                </div>
                            )}
                            <div>
                                {headline && <h3 className="text-2xl md:text-3xl font-bold text-white">{headline}</h3>}
                                {subheadline && <p className="text-lg text-mist/60 mt-1">{subheadline}</p>}
                            </div>
                        </div>

                        {/* Description */}
                        {description && (
                            <p className="text-mist/60 leading-relaxed mb-6">{description}</p>
                        )}

                        {/* Features */}
                        {features && features.length > 0 && (
                            <div className="flex flex-wrap gap-3 mb-6">
                                {features.map((feature, i) => {
                                    const FeatureIcon = getIcon(feature.icon);
                                    return (
                                        <div key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08]">
                                            <FeatureIcon className="w-4 h-4 text-sapphire" />
                                            <span className="text-sm text-mist/70">{feature.text}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Stats */}
                        {stats && stats.length > 0 && (
                            <div className="flex gap-8 mb-6 pt-4 border-t border-white/[0.06]">
                                {stats.slice(0, 3).map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-2xl font-bold text-sapphire">{stat.value}</div>
                                        <div className="text-xs text-mist/40">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* CTAs */}
                        {(ctaLabel || secondaryCtaLabel) && (
                            <div className="flex flex-wrap gap-4">
                                {secondaryCtaLabel && secondaryCtaActionPhrase && (
                                    <button
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.05] border border-white/[0.1] text-white font-semibold rounded-full 
                                            hover:bg-white/[0.1] transition-all"
                                        onClick={(e) => { e.stopPropagation(); handleAction(secondaryCtaActionPhrase); }}
                                    >
                                        {secondaryCtaLabel}
                                    </button>
                                )}
                                {ctaLabel && ctaActionPhrase && (
                                    <button
                                        className="inline-flex items-center gap-3 px-8 py-4 
                                            bg-flamingo text-white font-semibold rounded-full 
                                            hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                                            transition-all text-lg whitespace-nowrap shadow-lg shadow-flamingo/20"
                                        onClick={(e) => { e.stopPropagation(); handleAction(ctaActionPhrase); }}
                                    >
                                        {ctaLabel}
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
