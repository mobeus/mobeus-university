/**
 * MediaShowcase - Image/video with caption
 * Reusable for any media display
 * 
 * HIERARCHY: Glance (visual) → Look (caption) → Read (description)
 */

import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface MediaShowcaseProps {
    headline?: string;
    imageUrl?: string;
    imagePrompt?: string;
    videoUrl?: string;
    caption?: string;
    description?: string;
    aspectRatio?: '16:9' | '4:3' | '1:1' | '9:16';
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const MediaShowcase: React.FC<MediaShowcaseProps> = ({
    headline,
    imageUrl,
    imagePrompt,
    videoUrl,
    caption,
    description,
    aspectRatio = '16:9',
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const aspectClasses = {
        '16:9': 'aspect-video',
        '4:3': 'aspect-[4/3]',
        '1:1': 'aspect-square',
        '9:16': 'aspect-[9/16] max-w-sm mx-auto',
    };

    return (
        <div className="glass-template-container">
            {headline && (
                <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">{headline}</h1>
                </div>
            )}

            {/* Media Container */}
            <div className={`relative rounded-2xl overflow-hidden bg-obsidian/50 border border-mist/10 mb-6 ${aspectClasses[aspectRatio]}`}>
                {videoUrl ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Video placeholder - would need video player integration */}
                        <div className="w-20 h-20 rounded-full bg-flamingo/20 flex items-center justify-center cursor-pointer hover:bg-flamingo/30 transition-all">
                            <Play className="w-10 h-10 text-flamingo ml-1" />
                        </div>
                    </div>
                ) : (imageUrl || imagePrompt) ? (
                    <SmartImage
                        assetId={imageUrl || imagePrompt || ''}
                        alt={caption || 'Media showcase'}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-mist/30">No media</span>
                    </div>
                )}
            </div>

            {/* Caption & Description */}
            {(caption || description) && (
                <div className="text-center mb-6">
                    {caption && (
                        <h3 className="text-xl font-semibold text-white mb-2">{caption}</h3>
                    )}
                    {description && (
                        <p className="text-mist/70 max-w-2xl mx-auto">{description}</p>
                    )}
                </div>
            )}

            {/* CTA */}
            {ctaLabel && ctaActionPhrase && (
                <div className="text-center">
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

export default MediaShowcase;
