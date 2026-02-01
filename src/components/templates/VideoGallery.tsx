/**
 * VideoGallery - GENERIC
 * Carousel of video thumbnails with auto-scroll
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface VideoItem {
    title?: string;
    subtitle?: string;
    duration?: string;
    posterUrl?: string;
    posterPrompt?: string;
    actionPhrase?: string;
}

interface VideoGalleryProps {
    headline?: string;
    videos?: VideoItem[];
    autoPlay?: boolean;
    autoScrollSpeed?: number;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({
    headline,
    videos,
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

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        slidesToScroll: 1,
    }, plugins);

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
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    if (!videos || videos.length === 0) return null;

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
                    {videos.map((video, idx) => (
                        <div
                            key={idx}
                            onClick={() => video.actionPhrase && handleAction(video.actionPhrase)}
                            className={`flex-shrink-0 w-[calc(33.333%-12px)] mr-4 rounded-2xl overflow-hidden 
                                border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent
                                ${video.actionPhrase ? 'cursor-pointer hover:border-sapphire/30' : ''} 
                                transition-all group flex flex-col`}
                        >
                            <div className="aspect-video w-full overflow-hidden relative">
                                <SmartImage
                                    assetId={video.posterUrl || video.posterPrompt || `video-${idx}`}
                                    alt={video.title || `Video ${idx + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Play button overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center
                                        group-hover:bg-flamingo group-hover:scale-110 transition-all">
                                        <Play className="w-6 h-6 text-white ml-0.5" />
                                    </div>
                                </div>
                                {/* Duration badge */}
                                {video.duration && (
                                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 rounded text-xs text-white font-medium">
                                        {video.duration}
                                    </div>
                                )}
                            </div>
                            {(video.title || video.subtitle) && (
                                <div className="p-4 flex-grow">
                                    {video.title && <h3 className="text-base font-bold text-white mb-1 line-clamp-2">{video.title}</h3>}
                                    {video.subtitle && <p className="text-xs text-mist/60">{video.subtitle}</p>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center gap-2 pt-6">
                {videos.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300
                            ${index === selectedIndex ? 'bg-sapphire w-6' : 'bg-white/10 hover:bg-white/20 w-2'}`}
                        onClick={() => { playClick(); emblaApi?.scrollTo(index); }}
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

export default VideoGallery;
