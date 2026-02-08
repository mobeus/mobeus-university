/**
 * Carousel - GENERIC
 * Auto-scrolling card carousel with images
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface CarouselCard {
    title: string;
    subtitle?: string;
    imageUrl?: string;
    imagePrompt?: string;
    actionPhrase: string;
}

interface CarouselProps {
    cards?: CarouselCard[];
    autoScrollSpeed?: number;
}

export const Carousel: React.FC<CarouselProps> = ({
    cards,
    autoScrollSpeed = 1,
}) => {
    const { playClick } = useSound();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            dragFree: true,
            containScroll: false,
            slidesToScroll: 1,
        },
        [
            AutoScroll({
                speed: autoScrollSpeed,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
                playOnInit: true,
            }),
        ]
    );

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollTo = useCallback(
        (index: number) => {
            if (!emblaApi) return;
            playClick();
            emblaApi.scrollTo(index);
        },
        [emblaApi, playClick]
    );

    if (!cards || cards.length === 0) return null;

    const handleCardClick = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="w-full h-full flex flex-col overflow-visible">
            <div className="overflow-hidden flex-grow -mx-4 px-4" ref={emblaRef}>
                <div className="flex h-full">
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 w-[340px] md:w-[380px] mr-6 rounded-2xl overflow-hidden cursor-pointer
                                bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]
                                transform transition-all duration-300 ease-out
                                hover:scale-[1.02] hover:border-sapphire/30 hover:from-sapphire/[0.06]
                                group flex flex-col"
                            onClick={() => handleCardClick(card.actionPhrase)}
                        >
                            <div className="aspect-video w-full overflow-hidden bg-obsidian/20">
                                <SmartImage
                                    assetId={card.imageUrl || card.imagePrompt || card.title}
                                    alt={card.title}
                                    className="w-full h-full object-cover opacity-60 grayscale transition-all duration-500 ease-out 
                                        group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-6 flex-grow">
                                <p className="text-lg md:text-xl font-bold text-white leading-tight mb-2">
                                    "{card.title}"
                                </p>
                                {card.subtitle && (
                                    <p className="text-sapphire text-sm font-semibold">{card.subtitle}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center gap-3 pt-6">
                {cards.map((_, index) => (
                    <button
                        key={index}
                        className={`h-3 rounded-full transition-all duration-300
                            ${index === selectedIndex
                                ? 'bg-sapphire w-8'
                                : 'bg-white/10 hover:bg-white/20 w-3'
                            }`}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
