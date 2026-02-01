/**
 * StepsSwipeable - GENERIC
 * Carousel-style step swiper
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';
import useEmblaCarousel from 'embla-carousel-react';

interface SwipeStep {
    icon?: string;
    title: string;
    description?: string;
    imageUrl?: string;
    imagePrompt?: string;
    details?: string[];
    actionLabel?: string;
    actionPhrase?: string;
}

interface StepsSwipeableProps {
    headline?: string;
    subtitle?: string;
    steps?: SwipeStep[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const StepsSwipeable: React.FC<StepsSwipeableProps> = ({
    headline,
    subtitle,
    steps,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center' });
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const scrollPrev = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollPrev();
            setCurrentIndex(emblaApi.selectedScrollSnap());
            playClick();
        }
    }, [emblaApi, playClick]);

    const scrollNext = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollNext();
            setCurrentIndex(emblaApi.selectedScrollSnap());
            playClick();
        }
    }, [emblaApi, playClick]);

    React.useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setCurrentIndex(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);
        return () => { emblaApi.off('select', onSelect); };
    }, [emblaApi]);

    const totalSteps = steps?.length || 0;

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {(headline || subtitle) && (
                <div className="text-center pb-6">
                    {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                    {subtitle && <p className="text-mist/60 mt-2">{subtitle}</p>}
                </div>
            )}

            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-sm text-mist/50">Step {currentIndex + 1} of {totalSteps}</span>
                <div className="flex gap-1">
                    {steps?.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-sapphire' :
                                    i < currentIndex ? 'w-2 bg-jade' : 'w-2 bg-mist/20'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Carousel */}
            <div className="flex-grow relative">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {steps?.map((step, i) => {
                            const IconComp = getIcon(step.icon);

                            return (
                                <div key={i} className="flex-[0_0_100%] min-w-0 px-4">
                                    <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent 
                                        border border-white/[0.06] h-full">
                                        <div className="grid md:grid-cols-2 gap-8 h-full items-center">
                                            {/* Image */}
                                            {(step.imageUrl || step.imagePrompt) && (
                                                <div className="rounded-xl overflow-hidden aspect-[4/3]">
                                                    <SmartImage
                                                        assetId={step.imageUrl || step.imagePrompt || `step-${i}`}
                                                        alt={step.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}

                                            {/* Content */}
                                            <div>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-12 h-12 rounded-xl bg-sapphire text-white 
                                                        flex items-center justify-center text-xl font-bold">
                                                        {i + 1}
                                                    </div>
                                                    <IconComp className="w-6 h-6 text-sapphire" />
                                                </div>

                                                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                                                {step.description && (
                                                    <p className="text-mist/60 mb-6 leading-relaxed">{step.description}</p>
                                                )}

                                                {step.details && step.details.length > 0 && (
                                                    <ul className="space-y-2 mb-6">
                                                        {step.details.map((detail, j) => (
                                                            <li key={j} className="flex items-center gap-2 text-mist/70">
                                                                <ChevronRight className="w-4 h-4 text-jade flex-shrink-0" />
                                                                {detail}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}

                                                {step.actionLabel && step.actionPhrase && (
                                                    <button
                                                        onClick={() => handleAction(step.actionPhrase!)}
                                                        className="inline-flex items-center gap-2 px-6 py-3 bg-sapphire/20 
                                                            text-sapphire rounded-xl font-medium hover:bg-sapphire/30 transition-colors"
                                                    >
                                                        {step.actionLabel}
                                                        <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation arrows */}
                <button
                    onClick={scrollPrev}
                    disabled={currentIndex === 0}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full 
                        bg-white/[0.05] border border-white/[0.1] flex items-center justify-center
                        text-white hover:bg-white/[0.1] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={scrollNext}
                    disabled={currentIndex === totalSteps - 1}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full 
                        bg-white/[0.05] border border-white/[0.1] flex items-center justify-center
                        text-white hover:bg-white/[0.1] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {ctaLabel && ctaActionPhrase && currentIndex === totalSteps - 1 && (
                <div className="pt-6 flex justify-center">
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

export default StepsSwipeable;
