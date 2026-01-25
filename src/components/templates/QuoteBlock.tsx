/**
 * QuoteBlock - Testimonial or highlight quote
 * Reusable for any testimonial or callout
 * 
 * HIERARCHY: Glance (quote marks) → Look (quote text) → Read (attribution)
 */

import React from 'react';
import { Quote, ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface QuoteBlockProps {
    quote: string;
    author?: string;
    role?: string;
    company?: string;
    imageUrl?: string;
    imagePrompt?: string;
    color?: 'flamingo' | 'sapphire' | 'jade' | 'turmeric';
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const colorMap = {
    flamingo: { bg: 'bg-flamingo/10', border: 'border-flamingo/30', text: 'text-flamingo', quote: 'text-flamingo/30' },
    sapphire: { bg: 'bg-sapphire/10', border: 'border-sapphire/30', text: 'text-sapphire', quote: 'text-sapphire/30' },
    jade: { bg: 'bg-jade/10', border: 'border-jade/30', text: 'text-jade', quote: 'text-jade/30' },
    turmeric: { bg: 'bg-turmeric/10', border: 'border-turmeric/30', text: 'text-turmeric', quote: 'text-turmeric/30' },
};

export const QuoteBlock: React.FC<QuoteBlockProps> = ({
    quote,
    author,
    role,
    company,
    imageUrl,
    imagePrompt,
    color = 'flamingo',
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const colors = colorMap[color];
    const hasImage = imageUrl || imagePrompt;

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            <div className={`rounded-2xl border p-8 ${colors.bg} ${colors.border}`}>
                {/* Quote Mark */}
                <Quote className={`w-12 h-12 ${colors.quote} mb-4`} />

                {/* Quote Text */}
                <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-6">
                    "{quote}"
                </blockquote>

                {/* Attribution */}
                {(author || role || company) && (
                    <div className="flex items-center gap-4">
                        {hasImage && (
                            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                                <SmartImage
                                    assetId={imageUrl || imagePrompt || ''}
                                    alt={author || 'Quote author'}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <div>
                            {author && <div className="text-lg font-semibold text-white">{author}</div>}
                            {(role || company) && (
                                <div className={`text-sm ${colors.text}`}>
                                    {role}{role && company ? ' · ' : ''}{company}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* CTA */}
            {ctaLabel && ctaActionPhrase && (
                <div className="text-center mt-6">
                    <button
                        className="inline-flex items-center gap-2 px-8 py-4 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all text-lg"
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

export default QuoteBlock;
