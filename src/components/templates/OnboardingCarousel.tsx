/**
 * OnboardingCarousel
 * Auto-scrolling carousel of onboarding steps with contextual information
 * Pauses on hover, clickable cards, Tele-navigable
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Check, Circle, ArrowRight } from "lucide-react";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";

interface OnboardingStepCard {
    id: string;
    stepNumber: number;
    title: string;
    subtitle?: string;
    description?: string;
    icon?: string;
    status?: "completed" | "current" | "upcoming";
    duration?: string;
    imageUrl?: string;
    actionPhrase?: string;
}

interface OnboardingCarouselProps {
    title?: string;
    subtitle?: string;
    steps: OnboardingStepCard[];
    currentStep?: number;
    autoPlayInterval?: number; // milliseconds, default 2000
    showProgress?: boolean;
    ctaLabel?: string;
    ctaActionPhrase?: string;
    animationClass?: string;
    isExiting?: boolean;
}

export const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({
    title = "Merchant Onboarding Journey",
    subtitle = "10 simple steps from offer click to device shipped",
    steps = [],
    currentStep = 1,
    autoPlayInterval = 2000,
    showProgress = true,
    ctaLabel = "Start Onboarding",
    ctaActionPhrase,
    animationClass = "",
    isExiting = false,
}) => {
    const { playClick } = useSound();
    const [activeIndex, setActiveIndex] = useState(currentStep - 1);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Auto-scroll logic
    useEffect(() => {
        if (isPlaying && !isHovered && steps.length > 0) {
            intervalRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % steps.length);
            }, autoPlayInterval);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying, isHovered, steps.length, autoPlayInterval]);

    // Scroll the active card into view
    useEffect(() => {
        if (carouselRef.current) {
            const cards = carouselRef.current.querySelectorAll('.carousel-card');
            const activeCard = cards[activeIndex];
            if (activeCard) {
                activeCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    }, [activeIndex]);

    const goToStep = useCallback((index: number) => {
        playClick();
        setActiveIndex(index);
    }, [playClick]);

    const goToPrevious = useCallback(() => {
        playClick();
        setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length);
    }, [playClick, steps.length]);

    const goToNext = useCallback(() => {
        playClick();
        setActiveIndex((prev) => (prev + 1) % steps.length);
    }, [playClick, steps.length]);

    const togglePlayPause = useCallback(() => {
        playClick();
        setIsPlaying((prev) => !prev);
    }, [playClick]);

    const handleCardClick = useCallback((step: OnboardingStepCard) => {
        playClick();
        setActiveIndex(step.stepNumber - 1);
        if (step.actionPhrase) {
            sendToTele(step.actionPhrase);
        } else {
            sendToTele(`Show me step ${step.stepNumber}: ${step.title}`);
        }
    }, [playClick]);

    const handleStartOnboarding = useCallback(() => {
        playClick();
        if (ctaActionPhrase) {
            sendToTele(ctaActionPhrase);
        }
    }, [playClick, ctaActionPhrase]);

    const getStatusColor = (status?: string) => {
        switch (status) {
            case "completed": return "bg-green-500";
            case "current": return "bg-[#ff6600]";
            default: return "bg-white/20";
        }
    };

    const getStepIcon = (step: OnboardingStepCard) => {
        if (step.status === "completed") {
            return <Check className="w-4 h-4 text-white" />;
        }
        return <span className="text-sm font-bold">{step.stepNumber}</span>;
    };

    // Early return if no steps - prevents crash and shows helpful message
    if (!steps || steps.length === 0) {
        console.warn('[OnboardingCarousel] No steps provided');
        return (
            <div className={`w-full ${animationClass} backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 text-center`}>
                <p className="text-white/60">Loading onboarding steps...</p>
            </div>
        );
    }

    const activeStep = steps[activeIndex];


    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            {/* Controls only - no duplicate header (parent already shows title/subtitle) */}
            <div className="flex items-end justify-end mb-4 gap-3">
                <div className="flex items-center gap-3">
                    <button
                        onClick={togglePlayPause}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                        title={isPlaying ? "Pause auto-scroll" : "Resume auto-scroll"}
                    >
                        {isPlaying ? (
                            <Pause className="w-5 h-5 text-white" />
                        ) : (
                            <Play className="w-5 h-5 text-white" />
                        )}
                    </button>
                    <button
                        onClick={goToPrevious}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>

            {/* Active Step Context - Above Carousel */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(activeStep?.status)}`}>
                        {getStepIcon(activeStep || { stepNumber: 1, id: '', title: '' })}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[#ff6600] text-sm font-bold">STEP {activeStep?.stepNumber}</span>
                            {activeStep?.duration && (
                                <span className="text-white/50 text-sm">• {activeStep.duration}</span>
                            )}
                        </div>
                        <h3 className="text-xl font-bold text-white">{activeStep?.title}</h3>
                        {activeStep?.subtitle && (
                            <p className="text-white/60 mt-1">{activeStep.subtitle}</p>
                        )}
                    </div>
                    <button
                        onClick={() => activeStep && handleCardClick(activeStep)}
                        className="px-5 py-2.5 bg-[#ff6600] hover:bg-[#ff6600]/90 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
                    >
                        View Step
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Carousel */}
            <div
                ref={carouselRef}
                className="relative overflow-x-auto pb-4 scrollbar-hide"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`carousel-card flex-shrink-0 w-[280px] cursor-pointer transition-all duration-300 ${index === activeIndex
                                ? 'scale-105 z-10'
                                : 'scale-100 opacity-70 hover:opacity-100'
                                }`}
                            onClick={() => handleCardClick(step)}
                        >
                            <div className={`bg-white/10 backdrop-blur-sm border rounded-xl overflow-hidden transition-all ${index === activeIndex
                                ? 'border-[#ff6600] shadow-lg shadow-[#ff6600]/20'
                                : 'border-white/20 hover:border-white/40'
                                }`}>
                                {/* Image or Icon Area */}
                                <div className={`h-32 flex items-center justify-center ${index === activeIndex
                                    ? 'bg-gradient-to-br from-[#ff6600]/20 to-[#ff6600]/5'
                                    : 'bg-white/5'
                                    }`}>
                                    {step.imageUrl ? (
                                        <img
                                            src={step.imageUrl}
                                            alt={step.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getStatusColor(step.status)}`}>
                                            {getStepIcon(step)}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-xs font-bold ${step.status === "completed" ? 'text-green-400' :
                                            step.status === "current" ? 'text-[#ff6600]' : 'text-white/50'
                                            }`}>
                                            Step {step.stepNumber}
                                        </span>
                                        {step.duration && (
                                            <span className="text-white/40 text-xs">• {step.duration}</span>
                                        )}
                                    </div>
                                    <h4 className="font-semibold text-white text-sm mb-1 line-clamp-1">
                                        {step.title}
                                    </h4>
                                    {step.description && (
                                        <p className="text-white/50 text-xs line-clamp-2">
                                            {step.description}
                                        </p>
                                    )}
                                </div>

                                {/* Progress Indicator */}
                                {step.status && (
                                    <div className="px-4 pb-3">
                                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all ${step.status === "completed" ? "bg-green-500 w-full" :
                                                    step.status === "current" ? "bg-[#ff6600] w-1/2 animate-pulse" :
                                                        "bg-transparent w-0"
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scroll Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-[#003d5c] to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-[#003d5c] to-transparent pointer-events-none" />
            </div>

            {/* Progress Dots */}
            {showProgress && (
                <div className="flex items-center justify-center gap-2 mt-6">
                    {steps.map((step, index) => (
                        <button
                            key={step.id}
                            onClick={() => goToStep(index)}
                            className={`transition-all ${index === activeIndex
                                ? 'w-8 h-2 bg-[#ff6600] rounded-full'
                                : 'w-2 h-2 bg-white/30 hover:bg-white/50 rounded-full'
                                }`}
                        />
                    ))}
                </div>
            )}

            {/* Description Below - Active Step Details */}
            {activeStep?.description && (
                <div className="mt-6 text-center">
                    <p className="text-white/60 max-w-2xl mx-auto">
                        {activeStep.description}
                    </p>
                </div>
            )}

            {/* CTA Button */}
            {ctaActionPhrase && (
                <div className="mt-8 text-center">
                    <button
                        onClick={handleStartOnboarding}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff6600] to-[#ff8533] hover:from-[#ff6600] hover:to-[#ff6600] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#ff6600]/30"
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* Fiserv Badge */}
            <div className="flex justify-center mt-6">
                <div className="flex items-center gap-2 text-xs text-white/50">
                    <div className="w-3 h-3 rounded-full bg-[#ff6600]" />
                    Powered by Fiserv
                </div>
            </div>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default OnboardingCarousel;
