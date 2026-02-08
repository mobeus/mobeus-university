/**
 * Quote - RICH GENERIC
 * Large quote/testimonial with icon, badge, avatar, and action phrases
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, Quote as QuoteIcon, LucideIcon, Zap, Star } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface QuoteProps {
    icon?: string;
    badge?: string;
    quote: string;
    author?: string;
    role?: string;
    company?: string;
    avatarUrl?: string;
    avatarPrompt?: string;
    rating?: number;
    source?: string;
    sourceActionPhrase?: string;
    variant?: 'default' | 'accent' | 'subtle' | 'highlight';
    ctaLabel?: string;
    ctaActionPhrase?: string;
    secondaryCtaLabel?: string;
    secondaryCtaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return QuoteIcon;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || QuoteIcon;
};

export const Quote: React.FC<QuoteProps> = ({
    icon,
    badge,
    quote,
    author,
    role,
    company,
    avatarUrl,
    avatarPrompt,
    rating,
    source,
    sourceActionPhrase,
    variant = 'default',
    ctaLabel,
    ctaActionPhrase,
    secondaryCtaLabel,
    secondaryCtaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const IconComp = getIcon(icon);

    const colors = {
        default: { accent: 'text-sapphire', bg: 'from-sapphire/5 to-transparent', border: 'border-sapphire/15', iconBg: 'bg-sapphire/10' },
        accent: { accent: 'text-flamingo', bg: 'from-flamingo/5 to-transparent', border: 'border-flamingo/15', iconBg: 'bg-flamingo/10' },
        subtle: { accent: 'text-mist/40', bg: 'from-white/[0.02] to-transparent', border: 'border-white/[0.05]', iconBg: 'bg-white/[0.05]' },
        highlight: { accent: 'text-jade', bg: 'from-jade/10 to-transparent', border: 'border-jade/30', iconBg: 'bg-jade/10' },
    };
    const theme = colors[variant];

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {/* Badge & Icon Header */}
            {(badge || icon) && (
                <div className="flex items-center gap-3 mb-6">
                    {icon && (
                        <div className={`w-12 h-12 rounded-xl ${theme.iconBg} border ${theme.border} flex items-center justify-center`}>
                            <IconComp className={`w-6 h-6 ${theme.accent}`} />
                        </div>
                    )}
                    {badge && (
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${theme.iconBg} ${theme.accent} border ${theme.border}`}>
                            {badge}
                        </span>
                    )}
                </div>
            )}

            <div className="flex-grow flex flex-col items-start justify-center">
                <div className={`relative w-full px-8 md:px-12 py-10 rounded-3xl 
                    bg-gradient-to-b ${theme.bg} border ${theme.border}`}>

                    {/* Left-aligned opening quote - bright color */}
                    <div className="text-7xl md:text-8xl text-amethyst font-serif leading-none mb-4">"</div>

                    {/* Quote text - larger, full width */}
                    <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-white 
                        leading-snug tracking-tight pl-4 pr-8">
                        {quote}
                    </blockquote>

                    {/* Right-aligned closing quote - bright color */}
                    <div className="text-7xl md:text-8xl text-amethyst font-serif leading-none text-right mt-4">"</div>

                    {/* Author Section with Avatar */}
                    {(author || role || company || avatarUrl || avatarPrompt) && (
                        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/[0.06]">
                            {(avatarUrl || avatarPrompt) && (
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/[0.1] flex-shrink-0">
                                    <SmartImage
                                        assetId={avatarUrl || avatarPrompt || 'avatar'}
                                        alt={author || 'Author'}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div>
                                {author && <p className="text-lg font-semibold text-white">{author}</p>}
                                {(role || company) && (
                                    <p className={`text-sm ${theme.accent} mt-0.5 font-medium`}>
                                        {role}{role && company && ' · '}{company}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Source Link */}
                    {source && (
                        <button
                            onClick={() => sourceActionPhrase && handleAction(sourceActionPhrase)}
                            className={`mt-6 text-sm ${theme.accent} hover:underline ${sourceActionPhrase ? 'cursor-pointer' : ''}`}
                        >
                            — {source}
                        </button>
                    )}
                </div>
            </div>

            {/* CTAs */}
            {(ctaLabel || secondaryCtaLabel) && (
                <div className="mt-8 flex flex-wrap gap-4 justify-end">
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

export default Quote;
