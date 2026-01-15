/**
 * BeforeAfter
 * Before/after comparison
 * 
 * USE WHEN: Transformation, results comparison, impact visualization
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each side is clickable → notifyTele
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface BeforeAfterProps {
    beforeTitle: string;
    beforeContent: string;
    beforeImageUrl?: string;
    beforeImagePrompt?: string;
    beforeActionPhrase: string;
    afterTitle: string;
    afterContent: string;
    afterImageUrl?: string;
    afterImagePrompt?: string;
    afterActionPhrase: string;
}

export const BeforeAfter: React.FC<BeforeAfterProps> = ({
    beforeTitle,
    beforeContent,
    beforeImageUrl,
    beforeImagePrompt,
    beforeActionPhrase,
    afterTitle,
    afterContent,
    afterImageUrl,
    afterImagePrompt,
    afterActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const hasBeforeImage = beforeImageUrl || beforeImagePrompt;
    const hasAfterImage = afterImageUrl || afterImagePrompt;

    return (
        <div className="glass-template-container">
            <div className="flex flex-col md:flex-row items-stretch gap-4">
                {/* Before */}
                <div
                    className="flex-1 glass-card-standard glass-card-clickable border-l-4 border-flamingo/50"
                    onClick={() => handleAction(beforeActionPhrase)}
                >
                    <span className="template-badge mb-3 inline-block bg-flamingo/20 text-flamingo">BEFORE</span>
                    {hasBeforeImage && (
                        <div className="aspect-video glass-image-container rounded-lg overflow-hidden mb-4">
                            <SmartImage
                                assetId={beforeImageUrl || beforeImagePrompt || ''}
                                alt={beforeTitle}
                                className="smart-image w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <h4 className="text-template-subtitle mb-2">{beforeTitle}</h4>
                    <p className="text-template-content">{beforeContent}</p>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center p-2">
                    <div className="w-12 h-12 rounded-full bg-jade/20 flex items-center justify-center">
                        <ArrowRight className="w-6 h-6 text-jade" />
                    </div>
                </div>

                {/* After */}
                <div
                    className="flex-1 glass-card-standard glass-card-clickable border-l-4 border-jade/50"
                    onClick={() => handleAction(afterActionPhrase)}
                >
                    <span className="template-badge mb-3 inline-block bg-jade/20 text-jade">AFTER</span>
                    {hasAfterImage && (
                        <div className="aspect-video glass-image-container rounded-lg overflow-hidden mb-4">
                            <SmartImage
                                assetId={afterImageUrl || afterImagePrompt || ''}
                                alt={afterTitle}
                                className="smart-image w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <h4 className="text-template-subtitle mb-2">{afterTitle}</h4>
                    <p className="text-template-content">{afterContent}</p>
                </div>
            </div>
        </div>
    );
};

export default BeforeAfter;
