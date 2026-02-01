/**
 * ImageDuo - GENERIC
 * Two images side by side
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ImageItem {
    imageUrl?: string;
    imagePrompt?: string;
    title?: string;
    caption?: string;
    actionPhrase?: string;
}

interface ImageDuoProps {
    headline?: string;
    images?: [ImageItem, ImageItem];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const ImageDuo: React.FC<ImageDuoProps> = ({
    headline,
    images,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">


            {images && (
                <div className="grid md:grid-cols-2 gap-6 flex-grow">
                    {images.map((img, i) => (
                        <div
                            key={i}
                            onClick={() => img.actionPhrase && handleAction(img.actionPhrase)}
                            className={`group rounded-2xl overflow-hidden border border-white/[0.06] flex flex-col
                                bg-gradient-to-b from-white/[0.04] to-transparent
                                ${img.actionPhrase ? 'cursor-pointer hover:border-sapphire/30' : ''} transition-all`}
                        >
                            <div className="aspect-[4/3] w-full overflow-hidden">
                                <SmartImage
                                    assetId={img.imageUrl || img.imagePrompt || `image-${i}`}
                                    alt={img.title || img.caption || `Image ${i + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            {(img.title || img.caption) && (
                                <div className="p-5">
                                    {img.title && <h3 className="text-lg font-bold text-white mb-1">{img.title}</h3>}
                                    {img.caption && <p className="text-sm text-mist/60">{img.caption}</p>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {ctaLabel && ctaActionPhrase && (
                <div className="pt-8 flex justify-end">
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
    );
};

export default ImageDuo;
