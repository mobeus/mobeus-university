/**
 * WelcomeCarousel - Apple-style solid color cards for Mobeus
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
    CalendarCheck, SearchCheck, ShieldCheck, Music
} from 'lucide-react';

interface QuestionCard {
    question: string;
    subtext?: string;
    icon?: string;
    imageUrl?: string;  // For image-based cards
    actionPhrase: string;
    isAccent?: boolean;
    accentColor?: 'purple' | 'teal';  // Support for different accent colors
}

interface WelcomeCarouselProps {
    cards?: QuestionCard[];
}

export const WelcomeCarousel: React.FC<WelcomeCarouselProps> = ({
    cards: cardsProp,
}) => {
    const { playClick } = useSound();
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Default cards: "The screen finally cares" brand - 5-step journey
    const defaultCards: QuestionCard[] = [
        {
            question: "Why do you exist?",
            subtext: "To do things you have to do but don't want to do",
            icon: "zap",
            actionPhrase: "show me the problem you solve"
        },
        {
            question: "How does it work?",
            subtext: "You talk. We do everything. That's it.",
            icon: "globe",
            actionPhrase: "how does this work"
        },
        {
            question: "Can I trust this?",
            subtext: "Privacy first. You're in control the whole time.",
            icon: "shieldCheck",
            actionPhrase: "is this safe"
        },
        {
            question: "What is a tele?",
            subtext: "Workers, not chatbots. Labor that shows up ready to help.",
            icon: "users",
            actionPhrase: "what is a tele"
        },
        {
            question: "Can I create teles?",
            subtext: "Soon, anyone can. Your expertise, amplified.",
            icon: "sparkles",
            actionPhrase: "can i make my own tele"
        },
        {
            question: "When does this launch?",
            subtext: "March/April 2026 — The screen finally cares",
            icon: "calendar",
            actionPhrase: "sign up for the launch event",
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
            case 'music': return <Music className={iconClass} />;
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

                            const accentBgColor = card.accentColor === 'teal' ? 'bg-aqua' : 'bg-amethyst';
                            return (
                                <div
                                    key={idx}
                                    className={`flex-shrink-0 w-[calc(33.333%-16px)] min-h-[350px] mx-2 rounded-2xl overflow-hidden cursor-pointer
                                        relative flex flex-col
                                        ${isImageCard
                                            ? ''
                                            : card.isAccent
                                                ? `${accentBgColor} text-white pt-14 px-8 pb-8`
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
                                            {/* Pure image - no text overlay */}
                                            <div
                                                className="absolute inset-0 bg-cover bg-center"
                                                style={{ backgroundImage: `url(${card.imageUrl})` }}
                                            />
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
                {cards.map((card, index) => {
                    const dotColor = card.isAccent ? (card.accentColor === 'teal' ? 'bg-aqua' : 'bg-amethyst') : 'bg-mist';
                    return (
                        <button
                            key={index}
                            className={`rounded-full transition-all duration-300
                            ${index === selectedIndex
                                    ? `w-6 h-2 ${dotColor}`
                                    : 'w-2 h-2 bg-mist/20 hover:bg-mist/40'
                                }`}
                            onClick={() => scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default WelcomeCarousel;

