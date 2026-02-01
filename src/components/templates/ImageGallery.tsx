/**
 * ImageGallery - GENERIC
 * Carousel gallery of images with auto-scroll
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface GalleryImage {
    imageUrl?: string;
    imagePrompt?: string;
    title?: string;
    caption?: string;
    actionPhrase?: string;
}

interface ImageGalleryProps {
    headline?: string;
    images?: GalleryImage[];
    autoPlay?: boolean;
    autoScrollSpeed?: number;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
    headline,
    images,
    autoPlay = true,  // Default to auto-scroll ON
    autoScrollSpeed = 1,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Auto-scroll plugins - only if autoPlay is enabled
    const plugins = autoPlay ? [
        AutoScroll({
            speed: autoScrollSpeed,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
            playOnInit: true,
        })
    ] : [];

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, plugins);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        return () => { emblaApi.off('select', onSelect); };
    }, [emblaApi, onSelect]);

    const scrollPrev = () => { playClick(); emblaApi?.scrollPrev(); };
    const scrollNext = () => { playClick(); emblaApi?.scrollNext(); };
    const scrollTo = (index: number) => { playClick(); emblaApi?.scrollTo(index); };
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    if (!images || images.length === 0) return null;

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            <div className="flex items-center justify-end pb-6">
                <div className="flex gap-2">
                    <button
                        onClick={scrollPrev}
                        className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center
                            hover:bg-white/[0.1] transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-mist/60" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center
                            hover:bg-white/[0.1] transition-colors"
                    >
                        <ChevronRight className="w-5 h-5 text-mist/60" />
                    </button>
                </div>
            </div>


            <div className="overflow-hidden flex-grow" ref={emblaRef}>
                <div className="flex h-full">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            onClick={() => img.actionPhrase && handleAction(img.actionPhrase)}
                            className={`flex-shrink-0 w-[300px] md:w-[360px] mr-5 rounded-2xl overflow-hidden 
                                border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent
                                ${img.actionPhrase ? 'cursor-pointer hover:border-sapphire/30' : ''} 
                                transition-all group flex flex-col`}
                        >
                            <div className="aspect-[4/3] w-full overflow-hidden">
                                <SmartImage
                                    assetId={img.imageUrl || img.imagePrompt || `gallery-${idx}`}
                                    alt={img.title || `Image ${idx + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            {(img.title || img.caption) && (
                                <div className="p-5 flex-grow">
                                    {img.title && <h3 className="text-lg font-bold text-white mb-1">{img.title}</h3>}
                                    {img.caption && <p className="text-sm text-mist/60">{img.caption}</p>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center gap-2 pt-6">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300
                            ${index === selectedIndex ? 'bg-sapphire w-6' : 'bg-white/10 hover:bg-white/20 w-2'}`}
                        onClick={() => scrollTo(index)}
                    />
                ))}
            </div>

            {ctaLabel && ctaActionPhrase && (
                <div className="pt-6 flex justify-end">
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

export default ImageGallery;
