/**
 * Flashcards - GENERIC
 * Flip cards for learning
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState } from 'react';
import { ArrowRight, RotateCcw, ChevronLeft, ChevronRight, LucideIcon, Zap, Shuffle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface Flashcard {
    frontIcon?: string;
    frontTitle: string;
    frontSubtitle?: string;
    frontImageUrl?: string;
    frontImagePrompt?: string;
    backTitle?: string;
    backContent: string;
    backImageUrl?: string;
    backImagePrompt?: string;
    mastered?: boolean;
}

interface FlashcardsProps {
    headline?: string;
    subtitle?: string;
    cards?: Flashcard[];
    shuffleLabel?: string;
    masteredLabel?: string;
    remainingLabel?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Flashcards: React.FC<FlashcardsProps> = ({
    headline,
    subtitle,
    cards: initialCards,
    shuffleLabel,
    masteredLabel,
    remainingLabel,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [cards, setCards] = useState(initialCards || []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const currentCard = cards[currentIndex];
    const masteredCount = cards.filter(c => c.mastered).length;
    const totalCount = cards.length;

    const flipCard = () => {
        playClick();
        setIsFlipped(!isFlipped);
    };

    const nextCard = () => {
        playClick();
        setIsFlipped(false);
        setCurrentIndex((currentIndex + 1) % totalCount);
    };

    const prevCard = () => {
        playClick();
        setIsFlipped(false);
        setCurrentIndex((currentIndex - 1 + totalCount) % totalCount);
    };

    const markMastered = () => {
        playClick();
        const updated = [...cards];
        updated[currentIndex] = { ...updated[currentIndex], mastered: true };
        setCards(updated);
        nextCard();
    };

    const shuffleCards = () => {
        playClick();
        const shuffled = [...cards].sort(() => Math.random() - 0.5);
        setCards(shuffled);
        setCurrentIndex(0);
        setIsFlipped(false);
    };

    const IconComp = getIcon(currentCard?.frontIcon);

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">


            {/* Progress bar */}
            <div className="flex items-center gap-4 mb-6">
                <div className="flex-grow h-2 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-jade rounded-full transition-all duration-500"
                        style={{ width: `${(masteredCount / totalCount) * 100}%` }}
                    />
                </div>
                <span className="text-sm text-mist/50">
                    {masteredCount}/{totalCount} {masteredLabel || 'mastered'}
                </span>
            </div>

            {/* Card */}
            <div className="flex-grow flex items-center justify-center py-8">
                {currentCard && (
                    <div
                        onClick={flipCard}
                        className="w-full max-w-lg cursor-pointer perspective-1000"
                        style={{ perspective: '1000px' }}
                    >
                        <div
                            className={`relative w-full min-h-[400px] transition-transform duration-500 preserve-3d
                                ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Front */}
                            <div
                                className="absolute inset-0 p-8 rounded-2xl bg-gradient-to-b from-sapphire/20 to-sapphire/5 
                                    border border-sapphire/30 backface-hidden flex flex-col items-center justify-center text-center"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                {(currentCard.frontImageUrl || currentCard.frontImagePrompt) ? (
                                    <div className="w-32 h-32 rounded-2xl overflow-hidden mb-6">
                                        <SmartImage
                                            assetId={currentCard.frontImageUrl || currentCard.frontImagePrompt || 'card-front'}
                                            alt={currentCard.frontTitle}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-20 h-20 rounded-2xl bg-sapphire/20 border border-sapphire/30 
                                        flex items-center justify-center mb-6">
                                        <IconComp className="w-10 h-10 text-sapphire" />
                                    </div>
                                )}

                                <h3 className="text-2xl font-bold text-white mb-2">{currentCard.frontTitle}</h3>
                                {currentCard.frontSubtitle && (
                                    <p className="text-mist/60">{currentCard.frontSubtitle}</p>
                                )}

                                <div className="absolute bottom-6 flex items-center gap-2 text-mist/40 text-sm">
                                    <RotateCcw className="w-4 h-4" />
                                    Tap to flip
                                </div>
                            </div>

                            {/* Back */}
                            <div
                                className="absolute inset-0 p-8 rounded-2xl bg-gradient-to-b from-jade/20 to-jade/5 
                                    border border-jade/30 backface-hidden flex flex-col items-center justify-center text-center
                                    [transform:rotateY(180deg)]"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                {(currentCard.backImageUrl || currentCard.backImagePrompt) && (
                                    <div className="w-24 h-24 rounded-xl overflow-hidden mb-6">
                                        <SmartImage
                                            assetId={currentCard.backImageUrl || currentCard.backImagePrompt || 'card-back'}
                                            alt={currentCard.backTitle || 'Answer'}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {currentCard.backTitle && (
                                    <h4 className="text-lg font-medium text-jade mb-4">{currentCard.backTitle}</h4>
                                )}
                                <p className="text-xl text-white leading-relaxed">{currentCard.backContent}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-4">
                {/* Navigation */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={prevCard}
                        className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/[0.1] 
                            flex items-center justify-center text-white hover:bg-white/[0.1] transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="px-4 text-mist/50">{currentIndex + 1} / {totalCount}</span>
                    <button
                        onClick={nextCard}
                        className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/[0.1] 
                            flex items-center justify-center text-white hover:bg-white/[0.1] transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={shuffleCards}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] text-mist/60 
                            rounded-lg hover:text-white hover:bg-white/[0.1] transition-colors"
                    >
                        <Shuffle className="w-4 h-4" />
                        {shuffleLabel || 'Shuffle'}
                    </button>

                    {!currentCard?.mastered && (
                        <button
                            onClick={markMastered}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-jade text-white rounded-xl font-medium
                                hover:bg-jade/90 transition-colors"
                        >
                            ✓ {masteredLabel || 'Got it!'}
                        </button>
                    )}
                </div>
            </div>

            {ctaLabel && ctaActionPhrase && masteredCount === totalCount && (
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

export default Flashcards;
