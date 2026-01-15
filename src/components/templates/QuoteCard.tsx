/**
 * QuoteCard
 * Testimonial or quote display
 * 
 * USE WHEN: Customer testimonials, quotes, endorsements
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Card is clickable → notifyTele
 */

import React from 'react';
import { Quote, ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface QuoteCardProps {
    quote: string;
    author: string;
    role?: string;
    company?: string;
    imageUrl?: string;
    imagePrompt?: string;
    actionPhrase: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
    quote,
    author,
    role,
    company,
    imageUrl,
    imagePrompt,
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
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-sapphire/40 mb-4" />

                {/* Quote Text */}
                <blockquote className="text-template-title text-xl md:text-2xl mb-6 italic">
                    "{quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                    {hasImage && (
                        <div className="w-14 h-14 rounded-full overflow-hidden glass-image-container">
                            <SmartImage
                                assetId={imageUrl || imagePrompt || ''}
                                alt={author}
                                className="smart-image w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <div>
                        <div className="text-template-subtitle font-medium">{author}</div>
                        {(role || company) && (
                            <div className="text-template-content text-sm">
                                {role}{role && company && ', '}{company}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center text-sapphire font-medium mt-4 text-sm">
                    <span>Read full story</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                </div>
            </div>
        </div>
    );
};

export default QuoteCard;
