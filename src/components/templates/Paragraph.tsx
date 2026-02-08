/**
 * Paragraph - RICH GENERIC
 * Content block with icon, badge, callout, bullets, and action phrases
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, Quote } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ParagraphProps {
    icon?: string;
    badge?: string;
    title?: string;
    subtitle?: string;
    content?: string;
    text?: string; // Alias for content - AI may send either
    highlights?: string[];  // Bullet points or key highlights
    quote?: { text: string; author?: string };
    imageUrl?: string;
    imagePrompt?: string;
    variant?: 'default' | 'callout' | 'featured';
    alignment?: 'left' | 'center' | 'right';
    contentActionPhrase?: string;  // Click action for the content
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

export const Paragraph: React.FC<ParagraphProps> = ({
    icon,
    badge,
    title,
    subtitle,
    content,
    text, // Alias for content
    highlights,
    quote,
    imageUrl,
    imagePrompt,
    variant = 'default',
    alignment = 'left',
    contentActionPhrase,
    ctaLabel,
    ctaActionPhrase,
    secondaryCtaLabel,
    secondaryCtaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const IconComp = getIcon(icon);
    const displayText = content || text;
    const hasImage = imageUrl || imagePrompt;

    const alignClass = {
        left: 'text-left items-start',
        center: 'text-center items-center',
        right: 'text-right items-end',
    }[alignment];

    const variantStyles = {
        default: '',
        callout: 'p-8 rounded-2xl bg-gradient-to-b from-sapphire/10 to-transparent border border-sapphire/20',
        featured: 'p-8 rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent border border-white/[0.08]',
    };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col justify-center">
            <div className={`w-full ${alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto' : ''}`}>
                <div className={`flex flex-col ${alignClass} ${variantStyles[variant]}`}>

                    {/* Badge & Icon Header */}
                    {(badge || icon) && (
                        <div className={`flex items-center gap-3 mb-6 ${alignment === 'center' ? 'justify-center' : ''}`}>
                            {icon && (
                                <div className="w-14 h-14 rounded-2xl bg-sapphire/10 border border-sapphire/20 flex items-center justify-center">
                                    <IconComp className="w-7 h-7 text-sapphire" />
                                </div>
                            )}
                            {badge && (
                                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sapphire/10 text-sapphire border border-sapphire/20">
                                    {badge}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Image (Square) */}
                    {hasImage && (
                        <div
                            onClick={() => contentActionPhrase && handleAction(contentActionPhrase)}
                            className={`w-full max-w-xl aspect-square rounded-2xl overflow-hidden border border-white/[0.06] mb-8 ${contentActionPhrase ? 'cursor-pointer hover:border-sapphire/30' : ''} transition-colors`}
                        >
                            <SmartImage
                                assetId={imageUrl || imagePrompt || 'paragraph-image'}
                                alt={title || 'Image'}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {subtitle && (
                        <div className="text-sm text-sapphire font-semibold uppercase tracking-wider mb-3">
                            {subtitle}
                        </div>
                    )}

                    {title && (
                        <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-6">
                            {title}
                        </h2>
                    )}

                    {displayText && (() => {
                        const paragraphs = displayText.split(/\n\n+/).filter(Boolean);
                        return paragraphs.length > 1 ? (
                            <div className="space-y-4 mb-6">
                                {paragraphs.map((para, i) => (
                                    <p
                                        key={i}
                                        onClick={() => contentActionPhrase && handleAction(contentActionPhrase)}
                                        className={`text-lg text-mist/60 leading-relaxed ${contentActionPhrase ? 'cursor-pointer hover:text-white transition-colors' : ''}`}
                                    >
                                        {para}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <p
                                onClick={() => contentActionPhrase && handleAction(contentActionPhrase)}
                                className={`text-lg text-mist/60 leading-relaxed mb-6 ${contentActionPhrase ? 'cursor-pointer hover:text-white transition-colors' : ''}`}
                            >
                                {displayText}
                            </p>
                        );
                    })()}

                    {/* Highlights / Bullet Points */}
                    {highlights && highlights.length > 0 && (
                        <ul className={`space-y-3 mb-8 ${alignment === 'center' ? 'text-left max-w-md' : 'w-full'}`}>
                            {highlights.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                    <span className="w-6 h-6 rounded-full bg-sapphire/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="w-2 h-2 rounded-full bg-sapphire" />
                                    </span>
                                    <span className="text-mist/70">{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Quote Block */}
                    {quote && (
                        <div className="w-full p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-8">
                            <div className="flex items-start gap-4">
                                <Quote className="w-8 h-8 text-sapphire/30 flex-shrink-0" />
                                <div>
                                    <p className="text-lg text-white italic leading-relaxed">"{quote.text}"</p>
                                    {quote.author && (
                                        <p className="text-sm text-sapphire mt-3">— {quote.author}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CTAs */}
                    {(ctaLabel || secondaryCtaLabel) && (
                        <div className="flex flex-wrap gap-4 justify-end w-full">
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

                    {/* Bottom accent — only when no CTA, quote, or highlights */}
                    {!ctaLabel && !quote && (!highlights || highlights.length === 0) && (
                        <div className="w-full pt-4 mt-2">
                            <div className="h-[2px] w-full bg-gradient-to-r from-sapphire/30 via-flamingo/20 to-transparent rounded-full" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Paragraph;
