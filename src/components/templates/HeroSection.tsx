/**
 * HeroSection - Big headline with image and CTA
 * Rich layout with stats, features, and visual impact
 * 
 * HIERARCHY: Glance (headline) → Look (image + stats) → Read (description + CTA)
 */

import React from 'react';
import { ArrowRight, Check, Star, Zap, Award } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface HeroStat {
    value: string;
    label: string;
}

interface HeroFeature {
    text: string;
}

interface HeroSectionProps {
    badge?: string;
    headline: string;
    subheadline?: string;
    description?: string;
    imageUrl?: string;
    imagePrompt?: string;
    imagePosition?: 'left' | 'right' | 'top' | 'bottom';
    stats?: HeroStat[];
    features?: HeroFeature[];
    testimonial?: string;
    testimonialAuthor?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
    secondaryCtaLabel?: string;
    secondaryCtaActionPhrase?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
    badge,
    headline,
    subheadline,
    description,
    imageUrl,
    imagePrompt,
    imagePosition = 'right',
    stats,
    features,
    testimonial,
    testimonialAuthor,
    ctaLabel,
    ctaActionPhrase,
    secondaryCtaLabel,
    secondaryCtaActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const isHorizontal = imagePosition === 'left' || imagePosition === 'right';
    const hasImage = imageUrl || imagePrompt;

    const renderContent = () => (
        <div className={`${isHorizontal && hasImage ? 'flex-1' : 'text-center max-w-3xl mx-auto'}`}>
            {/* Badge */}
            {badge && (
                <span className="inline-block px-4 py-1 bg-sapphire/20 text-sapphire text-sm font-medium rounded-full mb-4">
                    {badge}
                </span>
            )}

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {headline}
            </h1>

            {/* Subheadline */}
            {subheadline && (
                <p className="text-xl md:text-2xl text-mist/70 mb-4">{subheadline}</p>
            )}

            {/* Description */}
            {description && (
                <p className="text-lg text-mist/60 mb-6 leading-relaxed">{description}</p>
            )}

            {/* Features List */}
            {features && features.length > 0 && (
                <div className={`flex flex-wrap gap-4 mb-6 ${isHorizontal && hasImage ? '' : 'justify-center'}`}>
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-sapphire" />
                            <span className="text-sm text-mist/80">{feature.text}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Stats */}
            {stats && stats.length > 0 && (
                <div className={`flex gap-8 mb-6 ${isHorizontal && hasImage ? '' : 'justify-center'}`}>
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl font-bold text-sapphire">{stat.value}</div>
                            <div className="text-xs text-mist/60 uppercase tracking-wide">{stat.label}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* CTAs */}
            <div className={`flex gap-4 ${isHorizontal && hasImage ? '' : 'justify-center'} flex-wrap mb-6`}>
                {ctaLabel && ctaActionPhrase && (
                    <button
                        className="inline-flex items-center gap-2 px-8 py-4 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all text-lg"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                )}
                {secondaryCtaLabel && secondaryCtaActionPhrase && (
                    <button
                        className="inline-flex items-center gap-2 px-8 py-4 border border-mist/30 text-white font-semibold rounded-full hover:bg-mist/10 transition-all text-lg"
                        onClick={() => handleAction(secondaryCtaActionPhrase)}
                    >
                        {secondaryCtaLabel}
                    </button>
                )}
            </div>

            {/* Testimonial */}
            {testimonial && (
                <div className={`p-4 rounded-xl bg-obsidian/40 border border-mist/10 ${isHorizontal && hasImage ? '' : 'max-w-xl mx-auto'}`}>
                    <div className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-turmeric flex-shrink-0 mt-1" />
                        <div>
                            <p className="text-sm text-mist/80 italic">"{testimonial}"</p>
                            {testimonialAuthor && (
                                <p className="text-xs text-mist/50 mt-2">— {testimonialAuthor}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderImage = () => {
        if (!hasImage) return null;
        return (
            <div className={`${isHorizontal ? 'flex-1' : 'w-full max-w-3xl mx-auto'} rounded-2xl overflow-hidden bg-obsidian/40 border border-mist/10`}>
                <SmartImage
                    assetId={imageUrl || imagePrompt || ''}
                    alt={headline}
                    className="w-full h-full object-cover aspect-video"
                />
            </div>
        );
    };

    if (!hasImage) {
        return <div className="glass-template-container">{renderContent()}</div>;
    }

    if (imagePosition === 'top') {
        return (
            <div className="glass-template-container space-y-8">
                {renderImage()}
                {renderContent()}
            </div>
        );
    }

    if (imagePosition === 'bottom') {
        return (
            <div className="glass-template-container space-y-8">
                {renderContent()}
                {renderImage()}
            </div>
        );
    }

    return (
        <div className={`glass-template-container flex flex-col md:flex-row gap-8 items-center ${imagePosition === 'left' ? 'md:flex-row-reverse' : ''}`}>
            {renderContent()}
            {renderImage()}
        </div>
    );
};

export default HeroSection;
