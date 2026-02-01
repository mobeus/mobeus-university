/**
 * Article - RICH GENERIC
 * Long-form content with image carousel, icons, badges, callouts, and action phrases
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState } from 'react';
import { ArrowRight, Calendar, User, Clock, Tag, ChevronLeft, ChevronRight, LucideIcon, Zap, BookOpen } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ArticleMeta {
    author?: string;
    date?: string;
    readTime?: string;
    category?: string;
}

interface ContentBlock {
    type: 'paragraph' | 'heading' | 'image' | 'quote' | 'list' | 'callout' | 'gallery';
    content?: string;
    items?: string[];
    imageUrl?: string;
    imagePrompt?: string;
    images?: { url?: string; prompt?: string; caption?: string }[];  // For gallery
    caption?: string;
    icon?: string;
    variant?: 'info' | 'success' | 'warning' | 'tip';
    actionPhrase?: string;
}

interface ArticleProps {
    icon?: string;
    badge?: string;
    heroImages?: { url?: string; prompt?: string }[];  // Carousel of hero images
    heroImageUrl?: string;
    heroImagePrompt?: string;
    title?: string;
    subtitle?: string;
    meta?: ArticleMeta;
    blocks?: ContentBlock[];
    tags?: string[];
    relatedLinks?: { label: string; actionPhrase: string }[];
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

export const Article: React.FC<ArticleProps> = ({
    icon,
    badge,
    heroImages,
    heroImageUrl,
    heroImagePrompt,
    title,
    subtitle,
    meta,
    blocks,
    tags,
    relatedLinks,
    ctaLabel,
    ctaActionPhrase,
    secondaryCtaLabel,
    secondaryCtaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    // Hero image carousel state
    const allHeroImages = heroImages || (heroImageUrl || heroImagePrompt ? [{ url: heroImageUrl, prompt: heroImagePrompt }] : []);
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

    const nextHero = () => setCurrentHeroIndex((i) => (i + 1) % allHeroImages.length);
    const prevHero = () => setCurrentHeroIndex((i) => (i - 1 + allHeroImages.length) % allHeroImages.length);

    const IconComp = getIcon(icon);

    const calloutStyles = {
        info: { bg: 'bg-sapphire/10', border: 'border-sapphire/30', text: 'text-sapphire', icon: 'Info' },
        success: { bg: 'bg-jade/10', border: 'border-jade/30', text: 'text-jade', icon: 'CheckCircle' },
        warning: { bg: 'bg-flamingo/10', border: 'border-flamingo/30', text: 'text-flamingo', icon: 'AlertTriangle' },
        tip: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', icon: 'Lightbulb' },
    };

    const renderBlock = (block: ContentBlock, index: number) => {
        switch (block.type) {
            case 'heading':
                return <h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4">{block.content}</h2>;
            case 'paragraph':
                return (
                    <p
                        key={index}
                        onClick={() => block.actionPhrase && handleAction(block.actionPhrase)}
                        className={`text-mist/70 leading-relaxed mb-6 ${block.actionPhrase ? 'cursor-pointer hover:text-white transition-colors' : ''}`}
                    >
                        {block.content}
                    </p>
                );
            case 'image':
                return (
                    <figure key={index} className="my-8">
                        <div
                            onClick={() => block.actionPhrase && handleAction(block.actionPhrase)}
                            className={`rounded-xl overflow-hidden border border-white/[0.06] ${block.actionPhrase ? 'cursor-pointer hover:border-sapphire/30 transition-colors' : ''}`}
                        >
                            <SmartImage
                                assetId={block.imageUrl || block.imagePrompt || `article-${index}`}
                                alt={block.caption || 'Article image'}
                                className="w-full aspect-square object-cover"
                            />
                        </div>
                        {block.caption && (
                            <figcaption className="text-center text-sm text-mist/50 mt-3 italic">{block.caption}</figcaption>
                        )}
                    </figure>
                );
            case 'gallery':
                return (
                    <div key={index} className="my-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {block.images?.map((img, i) => (
                            <div
                                key={i}
                                onClick={() => block.actionPhrase && handleAction(block.actionPhrase)}
                                className={`rounded-xl overflow-hidden border border-white/[0.06] ${block.actionPhrase ? 'cursor-pointer hover:border-sapphire/30 hover:scale-[1.02] transition-all' : ''}`}
                            >
                                <SmartImage
                                    assetId={img.url || img.prompt || `gallery-${index}-${i}`}
                                    alt={img.caption || `Gallery image ${i + 1}`}
                                    className="w-full aspect-square object-cover"
                                />
                            </div>
                        ))}
                    </div>
                );
            case 'quote':
                return (
                    <blockquote key={index} className="my-8 pl-6 border-l-4 border-sapphire/50">
                        <p className="text-xl text-white italic">{block.content}</p>
                    </blockquote>
                );
            case 'callout':
                const style = calloutStyles[block.variant || 'info'];
                const CalloutIcon = getIcon(block.icon || style.icon);
                return (
                    <div
                        key={index}
                        onClick={() => block.actionPhrase && handleAction(block.actionPhrase)}
                        className={`my-8 p-6 rounded-2xl ${style.bg} border ${style.border} ${block.actionPhrase ? 'cursor-pointer hover:scale-[1.01] transition-transform' : ''}`}
                    >
                        <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center flex-shrink-0`}>
                                <CalloutIcon className={`w-5 h-5 ${style.text}`} />
                            </div>
                            <p className="text-mist/80 leading-relaxed">{block.content}</p>
                        </div>
                    </div>
                );
            case 'list':
                return (
                    <ul key={index} className="my-6 space-y-3">
                        {block.items?.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors">
                                <span className="w-6 h-6 rounded-full bg-sapphire/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="w-2 h-2 rounded-full bg-sapphire" />
                                </span>
                                <span className="text-mist/70">{item}</span>
                            </li>
                        ))}
                    </ul>
                );
            default:
                return null;
        }
    };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full">
            <article className="max-w-3xl">
                {/* Badge & Icon Header */}
                {(badge || icon) && (
                    <div className="flex items-center gap-3 mb-6">
                        {icon && (
                            <div className="w-12 h-12 rounded-xl bg-sapphire/10 border border-sapphire/20 flex items-center justify-center">
                                <IconComp className="w-6 h-6 text-sapphire" />
                            </div>
                        )}
                        {badge && (
                            <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sapphire/10 text-sapphire border border-sapphire/20">
                                {badge}
                            </span>
                        )}
                    </div>
                )}

                {/* Hero Image Carousel */}
                {allHeroImages.length > 0 && (
                    <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] mb-8">
                        <SmartImage
                            assetId={allHeroImages[currentHeroIndex].url || allHeroImages[currentHeroIndex].prompt || 'hero'}
                            alt={title || 'Article'}
                            className="w-full aspect-square object-cover"
                        />
                        {allHeroImages.length > 1 && (
                            <>
                                <button
                                    onClick={prevHero}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5 text-white" />
                                </button>
                                <button
                                    onClick={nextHero}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5 text-white" />
                                </button>
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                    {allHeroImages.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentHeroIndex(i)}
                                            className={`w-2 h-2 rounded-full transition-all ${i === currentHeroIndex ? 'bg-white w-6' : 'bg-white/40'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Header */}
                <header className="mb-8">
                    {subtitle && <div className="text-sm text-sapphire font-semibold uppercase tracking-wider mb-3">{subtitle}</div>}
                    {title && <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">{title}</h1>}

                    {meta && (
                        <div className="flex flex-wrap items-center gap-4 text-sm text-mist/50">
                            {meta.author && (
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{meta.author}</span>
                                </div>
                            )}
                            {meta.date && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{meta.date}</span>
                                </div>
                            )}
                            {meta.readTime && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{meta.readTime}</span>
                                </div>
                            )}
                            {meta.category && (
                                <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4" />
                                    <span>{meta.category}</span>
                                </div>
                            )}
                        </div>
                    )}
                </header>

                {/* Content */}
                <div className="prose prose-invert max-w-none">
                    {blocks?.map((block, i) => renderBlock(block, i))}
                </div>

                {/* Related Links */}
                {relatedLinks && relatedLinks.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-white/[0.06]">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen className="w-5 h-5 text-sapphire" />
                            <span className="text-sm font-semibold text-white">Related Topics</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {relatedLinks.map((link, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAction(link.actionPhrase)}
                                    className="px-4 py-2 rounded-full text-sm bg-white/[0.05] text-mist/70 border border-white/[0.06] hover:bg-sapphire/10 hover:text-sapphire hover:border-sapphire/30 transition-all"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-white/[0.06]">
                        {tags.map((tag, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 rounded-full text-sm bg-white/[0.05] text-mist/60 border border-white/[0.06]"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* CTAs */}
                {(ctaLabel || secondaryCtaLabel) && (
                    <div className="mt-8 flex flex-wrap gap-4">
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
            </article>
        </div>
    );
};

export default Article;
