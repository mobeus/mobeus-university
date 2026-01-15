/**
 * ConceptCard
 * Single-focus concept explanation with optional image
 * 
 * USE WHEN: Explaining a single concept, definition, "what is X"
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Card is clickable → notifyTele (via CTA)
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ConceptCardProps {
    title: string;
    definition: string;
    details?: string;
    imageUrl?: string;
    imagePrompt?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({
    title,
    definition,
    details,
    imageUrl,
    imagePrompt,
    ctaLabel = 'Learn more',
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const hasImage = imageUrl || imagePrompt;

    return (
        <div className="glass-template-container">
            <div className={`flex ${hasImage ? 'flex-col md:flex-row' : 'flex-col'} gap-6`}>
                {hasImage && (
                    <div className="flex-shrink-0 w-full md:w-1/3">
                        <div className="aspect-square glass-image-container">
                            <SmartImage
                                assetId={imageUrl || imagePrompt || ''}
                                alt={title}
                                className="smart-image w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}
                <div className="flex-1">
                    <h3 className="text-template-title text-2xl mb-3">{title}</h3>
                    <p className="text-template-subtitle text-lg mb-4">{definition}</p>
                    {details && (
                        <p className="text-template-content mb-4">{details}</p>
                    )}
                    {ctaActionPhrase && (
                        <button
                            className="btn-cta glass-card-clickable"
                            onClick={() => handleAction(ctaActionPhrase)}
                        >
                            {ctaLabel}
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConceptCard;
