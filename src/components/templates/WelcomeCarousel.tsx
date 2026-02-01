/**
 * WelcomeCarousel - Apple-style solid color cards for Teleus
 * Clean cards with icons, large text, no images
 * Adapted from thoughtworks-external pattern
 */

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import {
    Heart, Users, Globe, Calendar, Sparkles, Zap,
    Phone, ClipboardList, Search, Building,
    PhoneOff, FileX, SearchX, UserX, Landmark,
    CalendarCheck, SearchCheck, ShieldCheck
} from 'lucide-react';

interface QuestionCard {
    question: string;
    subtext?: string;
    icon?: string;
    imageUrl?: string;  // For image-based cards
    actionPhrase: string;
    isAccent?: boolean;
}

interface WelcomeCarouselProps {
    cards?: QuestionCard[];
}

export const WelcomeCarousel: React.FC<WelcomeCarouselProps> = ({
    cards: cardsProp,
}) => {
    const { playClick } = useSound();
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Default cards: "Handled." brand
    const defaultCards: QuestionCard[] = [
        {
            question: "Calls? Handled.",
            subtext: "Hold music is someone else's problem now.",
            icon: "phoneOff",
            actionPhrase: "How do you handle calls?"
        },
        {
            question: "Forms? Handled.",
            subtext: "We fill them out. You don't.",
            icon: "fileX",
            actionPhrase: "How do you handle forms?"
        },
        {
            question: "Scheduling? Handled.",
            subtext: "Appointments, reservations, reminders. Done.",
            icon: "calendarCheck",
            actionPhrase: "How do you handle scheduling?"
        },
        {
            question: "Research? Handled.",
            subtext: "We find the answers. You get the results.",
            icon: "searchCheck",
            actionPhrase: "How do you handle research?"
        },
        {
            question: "Bureaucracy? Handled.",
            subtext: "Insurance. Government. Billing. All of it.",
            icon: "shieldCheck",
            actionPhrase: "How do you handle bureaucracy?"
        },
        {
            question: "Everything else? Yours.",
            subtext: "That's the point.",
            icon: "sparkles",
            actionPhrase: "Tell me about Teleus",
            isAccent: true
        },
    ];

    const cards = (cardsProp && cardsProp.length > 0) ? cardsProp : defaultCards;

    // Use Autoplay for slide-by-slide transitions
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'center',
            slidesToScroll: 1,
        },
        [
            Autoplay({
                delay: 4000,           // 4 seconds pause between slides
                stopOnInteraction: false,  // Resume after mouse leaves
                stopOnMouseEnter: true,    // Pause on hover
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

    const getIcon = (iconName: string, isAccent: boolean) => {
        const iconClass = `w-10 h-10 ${isAccent ? 'text-white' : 'text-amethyst'}`;
        switch (iconName) {
            case 'sparkles': return <Sparkles className={iconClass} />;
            case 'users': return <Users className={iconClass} />;
            case 'heart': return <Heart className={iconClass} />;
            case 'globe': return <Globe className={iconClass} />;
            case 'zap': return <Zap className={iconClass} />;
            case 'calendar': return <Calendar className={iconClass} />;
            case 'phone': return <Phone className={iconClass} />;
            case 'clipboard': return <ClipboardList className={iconClass} />;
            case 'search': return <Search className={iconClass} />;
            case 'building': return <Building className={iconClass} />;
            case 'phoneOff': return <PhoneOff className={iconClass} />;
            case 'fileX': return <FileX className={iconClass} />;
            case 'searchX': return <SearchX className={iconClass} />;
            case 'userX': return <UserX className={iconClass} />;
            case 'landmark': return <Landmark className={iconClass} />;
            case 'calendarCheck': return <CalendarCheck className={iconClass} />;
            case 'searchCheck': return <SearchCheck className={iconClass} />;
            case 'shieldCheck': return <ShieldCheck className={iconClass} />;
            default: return <Sparkles className={iconClass} />;
        }
    };

    if (!cards || cards.length === 0) {
        return null;
    }

    const handleCardClick = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="w-full py-6">
            {/* Carousel */}
            <div className="relative">
                {/* Embla Viewport */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {cards.map((card, idx) => {
                            const isImageCard = !!card.imageUrl;

                            return (
                                <div
                                    key={idx}
                                    className={`flex-shrink-0 w-[280px] min-h-[350px] mx-3 rounded-2xl overflow-hidden cursor-pointer
                                        relative flex flex-col
                                        ${isImageCard
                                            ? ''
                                            : card.isAccent
                                                ? 'bg-amethyst text-white pt-14 px-8 pb-8'
                                                : 'bg-mist/90 text-onyx pt-14 px-8 pb-8'
                                        }
                                        ${idx === selectedIndex
                                            ? 'opacity-100'
                                            : 'opacity-60'
                                        }
                                        hover:opacity-100 transition-opacity duration-300`}
                                    onClick={() => handleCardClick(card.actionPhrase)}
                                >
                                    {isImageCard ? (
                                        <>
                                            {/* Background image - full brightness */}
                                            <div
                                                className="absolute inset-0 bg-cover bg-center"
                                                style={{ backgroundImage: `url(${card.imageUrl})` }}
                                            />
                                            {/* Subtle bottom gradient for text legibility only */}
                                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
                                            {/* Content at bottom */}
                                            <div className="mt-auto relative z-10 p-6">
                                                <h3 className="text-xl font-bold leading-tight mb-2 text-white drop-shadow-lg">
                                                    {card.question}
                                                </h3>
                                                {card.subtext && (
                                                    <p className="text-sm text-white/90 drop-shadow-md">
                                                        {card.subtext}
                                                    </p>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Icon */}
                                            {card.icon && (
                                                <div className="mb-5">
                                                    {getIcon(card.icon, card.isAccent || false)}
                                                </div>
                                            )}

                                            {/* Question - Large text */}
                                            <h3 className={`text-xl font-bold leading-tight mb-3 ${card.isAccent ? 'text-white' : 'text-onyx'}`}>
                                                {card.question}
                                            </h3>

                                            {/* Subtext */}
                                            {card.subtext && (
                                                <p className={`text-sm ${card.isAccent ? 'text-white/80' : 'text-onyx/70'}`}>
                                                    {card.subtext}
                                                </p>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center items-center gap-2 mt-6">
                {cards.map((card, index) => (
                    <button
                        key={index}
                        className={`rounded-full transition-all duration-300
                            ${index === selectedIndex
                                ? `w-6 h-2 ${card.isAccent ? 'bg-amethyst' : 'bg-mist'}`
                                : 'w-2 h-2 bg-mist/20 hover:bg-mist/40'
                            }`}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default WelcomeCarousel;

