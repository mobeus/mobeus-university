/**
 * WelcomeCarousel
 * Continuous auto-scrolling carousel using Embla Carousel
 * 
 * USE WHEN: Welcome page to showcase key questions Tele can answer
 * FEATURES: Continuous smooth scroll, pauses on hover, functional dots
 */

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface QuestionCard {
    question: string;
    subtext?: string;
    imageUrl: string;
    actionPhrase: string;
}

interface WelcomeCarouselProps {
    cards: QuestionCard[];
    autoPlayInterval?: number;
}

export const WelcomeCarousel: React.FC<WelcomeCarouselProps> = ({
    cards = [],
    autoPlayInterval = 30000, // Not used directly, speed controls scroll
}) => {
    const { playClick } = useSound();
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Initialize Embla with auto-scroll plugin (continuous scrolling)
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            dragFree: true,
        },
        [
            AutoScroll({
                speed: 1, // Pixels per frame - slow and smooth
                stopOnInteraction: false,
                stopOnMouseEnter: true,
                playOnInit: true,
            }),
        ]
    );

    // Defensive: Don't render if no cards
    if (!cards || cards.length === 0) {
        return null;
    }

    // Track selected index (closest to start)
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

    const handleCardClick = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="w-full py-4">
            {/* Embla Viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
                {/* Embla Container */}
                <div className="flex gap-6">
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 w-[340px] md:w-[380px] glass-card-standard overflow-hidden cursor-pointer
                                transform transition-all duration-300 ease-out
                                hover:scale-[1.02] hover:shadow-glow"
                            onClick={() => handleCardClick(card.actionPhrase)}
                        >
                            {/* Image - 1024:661 aspect ratio to match screenshots */}
                            <div className="aspect-[1024/661] w-full overflow-hidden">
                                <img
                                    src={card.imageUrl}
                                    alt=""
                                    className="w-full h-full object-cover opacity-50 hover:opacity-70 transition-all duration-500 ease-out hover:scale-105"
                                />
                            </div>

                            {/* Question Content */}
                            <div className="p-5">
                                <p className="text-lg md:text-xl font-bold text-mist leading-tight mb-2">
                                    "{card.question}"
                                </p>
                                {card.subtext && (
                                    <p className="text-sapphire text-sm font-semibold">
                                        {card.subtext}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-3 mt-8">
                {cards.map((_, index) => (
                    <button
                        key={index}
                        className={`
                            h-3 rounded-full transition-all duration-300
                            ${index === selectedIndex
                                ? 'bg-sapphire w-8'
                                : 'bg-mist/30 hover:bg-mist/50 w-3'
                            }
                        `}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default WelcomeCarousel;
