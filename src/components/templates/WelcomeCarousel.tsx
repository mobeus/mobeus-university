/**
 * WelcomeCarousel
 * Continuously scrolling carousel of stakeholder question cards
 * 
 * USE WHEN: Welcome page to showcase key questions Tele can answer
 * FEATURES: Infinite smooth scroll, pauses on hover, dots for manual navigation
 */

import React, { useState, useRef, useEffect } from 'react';
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
    autoPlayInterval = 30000, // Full cycle duration in ms
}) => {
    const { playClick } = useSound();
    const [isPaused, setIsPaused] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Defensive: Don't render if no cards
    if (!cards || cards.length === 0) {
        return null;
    }

    const handleCardClick = (actionPhrase: string, index: number) => {
        playClick();
        setActiveIndex(index % cards.length);
        notifyTele(actionPhrase);
    };

    const goToSlide = (index: number) => {
        playClick();
        setActiveIndex(index);
        // Scroll to the card
        if (scrollRef.current) {
            const cardWidth = scrollRef.current.scrollWidth / (cards.length * 2);
            scrollRef.current.scrollTo({
                left: cardWidth * index,
                behavior: 'smooth'
            });
        }
    };

    // Duplicate cards for infinite scroll effect
    const duplicatedCards = [...cards, ...cards];

    return (
        <div
            className="w-full overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Scrolling Container */}
            <div
                ref={scrollRef}
                className="relative overflow-hidden mb-8"
            >
                {/* Gradient Fade Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                {/* Scrolling Track */}
                <div
                    className={`flex gap-6 ${isPaused ? '' : 'animate-carousel-scroll'}`}
                    style={{
                        width: 'fit-content',
                        animationDuration: `${autoPlayInterval}ms`,
                        animationPlayState: isPaused ? 'paused' : 'running',
                    }}
                >
                    {duplicatedCards.map((card, idx) => (
                        <div
                            key={`card-${idx}`}
                            className="flex-shrink-0 w-[340px] md:w-[380px] glass-card-standard overflow-hidden cursor-pointer
                                transform transition-all duration-300 ease-out
                                hover:scale-[1.03] hover:shadow-glow"
                            onClick={() => handleCardClick(card.actionPhrase, idx)}
                        >
                            {/* Image - Flush to top */}
                            <div className="aspect-[16/9] w-full overflow-hidden">
                                <img
                                    src={card.imageUrl}
                                    alt=""
                                    className="w-full h-full object-cover"
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
            <div className="flex justify-center gap-3">
                {cards.map((_, index) => (
                    <button
                        key={index}
                        className={`
                            w-3 h-3 rounded-full transition-all duration-300
                            ${index === activeIndex
                                ? 'bg-sapphire w-8'
                                : 'bg-mist/30 hover:bg-mist/50'
                            }
                        `}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to card ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default WelcomeCarousel;
