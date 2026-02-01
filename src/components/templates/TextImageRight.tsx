/**
 * TextImageRight - GENERIC
 * Image on left, long-form text content on right (~250 words)
 * Ideal for visual-first storytelling with supporting narrative
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface TextImageRightProps {
    title?: string;
    subtitle?: string;
    paragraphTitle?: string;
    paragraph?: string;
    imageUrl?: string;
    imagePrompt?: string;
    imageAlt?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const TextImageRight: React.FC<TextImageRightProps> = ({
    title,
    subtitle,
    paragraphTitle,
    paragraph,
    imageUrl,
    imagePrompt,
    imageAlt,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full">
            <div className="grid md:grid-cols-2 gap-10 items-start">
                {/* Left: Image */}
                <div className="flex items-center justify-center order-2 md:order-1">
                    <div className="glass-medium rounded-2xl overflow-hidden w-full">
                        <SmartImage
                            assetId={imageUrl || imagePrompt || 'text-image-right'}
                            alt={imageAlt || title || 'Visual'}
                            className="w-full aspect-[4/3] object-cover"
                        />
                    </div>
                </div>

                {/* Right: Text Content */}
                <div className="flex flex-col justify-center order-1 md:order-2">
                    {subtitle && (
                        <div className="text-sm text-[var(--color-secondary)] font-semibold uppercase tracking-wider mb-3">
                            {subtitle}
                        </div>
                    )}
                    {title && (
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
                            {title}
                        </h2>
                    )}
                    {paragraphTitle && (
                        <h3 className="text-xl font-semibold text-white mb-4">
                            {paragraphTitle}
                        </h3>
                    )}
                    {paragraph && (
                        <p className="text-mist/70 leading-relaxed text-lg mb-6">
                            {paragraph}
                        </p>
                    )}
                    {ctaLabel && ctaActionPhrase && (
                        <div className="pt-4">
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
            </div>
        </div>
    );
};

export default TextImageRight;
