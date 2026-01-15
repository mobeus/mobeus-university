/**
 * ParagraphBlock
 * Long-form text content with optional heading
 * 
 * USE WHEN: Detailed explanations, narrative content, article-style
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: CTA is clickable → notifyTele
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ParagraphBlockProps {
    title?: string;
    paragraphs: string[];
    imageUrl?: string;
    imagePrompt?: string;
    imagePosition?: 'top' | 'left' | 'right';
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const ParagraphBlock: React.FC<ParagraphBlockProps> = ({
    title,
    paragraphs = [],
    imageUrl,
    imagePrompt,
    imagePosition = 'top',
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const hasImage = imageUrl || imagePrompt;
    const isInline = imagePosition === 'left' || imagePosition === 'right';

    const ImageComponent = hasImage ? (
        <div className={`${isInline ? 'w-full md:w-1/3 flex-shrink-0' : 'w-full mb-6'}`}>
            <div className={`${isInline ? 'aspect-square' : 'aspect-video'} glass-image-container rounded-lg overflow-hidden`}>
                <SmartImage
                    assetId={imageUrl || imagePrompt || ''}
                    alt={title || 'Content image'}
                    className="smart-image w-full h-full object-cover"
                />
            </div>
        </div>
    ) : null;

    return (
        <div className="glass-template-container">
            <div className="glass-card-standard">
                {imagePosition === 'top' && ImageComponent}

                <div className={`${isInline ? 'flex flex-col md:flex-row gap-6' : ''}`}>
                    {imagePosition === 'left' && ImageComponent}

                    <div className="flex-1">
                        {title && <h3 className="text-template-title text-xl mb-4">{title}</h3>}

                        <div className="space-y-4">
                            {paragraphs?.map((paragraph, index) => (
                                <p key={index} className="text-template-content leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {ctaLabel && ctaActionPhrase && (
                            <button
                                className="btn-cta mt-6 glass-card-clickable"
                                onClick={() => handleAction(ctaActionPhrase)}
                            >
                                {ctaLabel}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </button>
                        )}
                    </div>

                    {imagePosition === 'right' && ImageComponent}
                </div>
            </div>
        </div>
    );
};

export default ParagraphBlock;
