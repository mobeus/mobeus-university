/**
 * ValuePropCard
 * Value proposition with benefits
 * 
 * USE WHEN: Why choose us, value props, benefits summary
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Card CTA is clickable → notifyTele
 */

import React from 'react';
import { Star, ArrowRight, Check } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ValuePropCardProps {
    title: string;
    tagline: string;
    benefits: string[];
    imageUrl?: string;
    imagePrompt?: string;
    ctaLabel?: string;
    actionPhrase: string;
}

export const ValuePropCard: React.FC<ValuePropCardProps> = ({
    title,
    tagline,
    benefits = [],
    imageUrl,
    imagePrompt,
    ctaLabel = 'Learn more',
    actionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = () => {
        playClick();
        notifyTele(actionPhrase);
    };

    const hasImage = imageUrl || imagePrompt;

    return (
        <div className="glass-template-container">
            <div className="glass-card-featured glass-card-clickable" onClick={handleAction}>
                <div className={`flex ${hasImage ? 'flex-col md:flex-row' : 'flex-col'} gap-6`}>
                    {/* Image */}
                    {hasImage && (
                        <div className="flex-shrink-0 w-full md:w-2/5">
                            <div className="aspect-[4/3] glass-image-container rounded-lg overflow-hidden">
                                <SmartImage
                                    assetId={imageUrl || imagePrompt || ''}
                                    alt={title}
                                    className="smart-image w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                            <Star className="w-5 h-5 text-turmeric" />
                            <span className="text-turmeric text-sm font-medium">Value Proposition</span>
                        </div>

                        <h3 className="text-template-title text-2xl mb-2">{title}</h3>
                        <p className="text-template-subtitle text-lg mb-4">{tagline}</p>

                        {/* Benefits */}
                        <div className="space-y-2 mb-6">
                            {benefits?.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-jade flex-shrink-0 mt-0.5" />
                                    <span className="text-template-content">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center text-sapphire font-medium">
                            <span>{ctaLabel}</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ValuePropCard;
