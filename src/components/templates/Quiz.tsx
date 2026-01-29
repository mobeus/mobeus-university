/**
 * Quiz - GENERIC
 * Multiple choice quiz with scoring
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState } from 'react';
import { ArrowRight, LucideIcon, Zap, Check, X, Trophy } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface QuizOption {
    id: string;
    text: string;
    imageUrl?: string;
    imagePrompt?: string;
}

interface QuizQuestion {
    icon?: string;
    question: string;
    imageUrl?: string;
    imagePrompt?: string;
    options: QuizOption[];
    correctId: string;
    explanation?: string;
}

interface QuizProps {
    title?: string;
    subtitle?: string;
    imageUrl?: string;
    imagePrompt?: string;
    questions?: QuizQuestion[];
    // Simple single-question format for AI:
    question?: string;
    options?: string[];
    passingScore?: number;
    passMessage?: string;
    failMessage?: string;
    scoreLabel?: string;
    retryLabel?: string;
    retryPhrase?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Quiz: React.FC<QuizProps> = ({
    title,
    subtitle,
    imageUrl,
    imagePrompt,
    questions,
    question,  // Simple single question text
    options,   // Simple string array of options
    passingScore = 70,
    passMessage,
    failMessage,
    scoreLabel,
    retryLabel,
    retryPhrase,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    // Normalize: convert simple question/options to questions array
    const normalizedQuestions: QuizQuestion[] = questions || (question && options ? [{
        question,
        options: options.map((opt, i) => ({ id: `opt-${i}`, text: opt })),
        correctId: 'opt-0'  // First option is default correct for simple mode
    }] : []);

    const totalQuestions = normalizedQuestions.length;
    const currentQ = normalizedQuestions[currentQuestion];
    const isCorrect = selectedId === currentQ?.correctId;
    const scorePercent = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    const passed = scorePercent >= passingScore;

    const handleSelect = (optionId: string) => {
        if (showFeedback) return;
        playClick();
        setSelectedId(optionId);
    };

    const handleSubmit = () => {
        playClick();
        if (!selectedId) return;

        if (selectedId === currentQ?.correctId) {
            setScore(s => s + 1);
        }
        setShowFeedback(true);
    };

    const handleNext = () => {
        playClick();
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedId(null);
            setShowFeedback(false);
        } else {
            setIsComplete(true);
        }
    };

    const handleRetry = () => {
        playClick();
        setCurrentQuestion(0);
        setSelectedId(null);
        setShowFeedback(false);
        setScore(0);
        setIsComplete(false);
        if (retryPhrase) notifyTele(retryPhrase);
    };

    return (
        <div className="glass-template-container h-full flex flex-col">
            {/* Header */}
            <div className="pb-6 border-b border-white/[0.06]">
                <div className="flex items-start gap-4">
                    {(imageUrl || imagePrompt) && (
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                            <SmartImage
                                assetId={imageUrl || imagePrompt || 'quiz-icon'}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <div className="flex-grow">
                        <h1 className="text-2xl font-bold text-white">{title}</h1>
                        {subtitle && <p className="text-mist/60 mt-1">{subtitle}</p>}
                    </div>
                </div>

                {/* Progress */}
                {!isComplete && (
                    <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-mist/50">Question {currentQuestion + 1} of {totalQuestions}</span>
                            <span className="text-mist/50">{score} correct</span>
                        </div>
                        <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-sapphire rounded-full transition-all duration-300"
                                style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-grow py-8">
                {!isComplete && currentQ ? (
                    <div>
                        {/* Question */}
                        <div className="mb-8">
                            {(question.imageUrl || question.imagePrompt) && (
                                <div className="aspect-video max-w-lg rounded-xl overflow-hidden mb-6">
                                    <SmartImage
                                        assetId={question.imageUrl || question.imagePrompt || `q-${currentQuestion}`}
                                        alt="Question image"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <h2 className="text-xl font-bold text-white">{currentQ.question}</h2>
                        </div>

                        {/* Options */}
                        <div className="grid gap-3">
                            {currentQ.options.map((option) => {
                                const isSelected = selectedId === option.id;
                                const isCorrectOption = option.id === question.correctId;

                                let optionStyle = 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.15]';
                                if (showFeedback) {
                                    if (isCorrectOption) {
                                        optionStyle = 'bg-jade/10 border-jade/50';
                                    } else if (isSelected && !isCorrectOption) {
                                        optionStyle = 'bg-flamingo/10 border-flamingo/50';
                                    }
                                } else if (isSelected) {
                                    optionStyle = 'bg-sapphire/10 border-sapphire/50';
                                }

                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => handleSelect(option.id)}
                                        disabled={showFeedback}
                                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left
                                            ${optionStyle} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                                    >
                                        {(option.imageUrl || option.imagePrompt) && (
                                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                <SmartImage
                                                    assetId={option.imageUrl || option.imagePrompt || option.id}
                                                    alt={option.text}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <span className="flex-grow text-white">{option.text}</span>
                                        {showFeedback && isCorrectOption && (
                                            <Check className="w-5 h-5 text-jade flex-shrink-0" />
                                        )}
                                        {showFeedback && isSelected && !isCorrectOption && (
                                            <X className="w-5 h-5 text-flamingo flex-shrink-0" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Feedback */}
                        {showFeedback && currentQ?.explanation && (
                            <div className={`mt-6 p-4 rounded-xl ${isCorrect ? 'bg-jade/10 border border-jade/30' : 'bg-flamingo/10 border border-flamingo/30'}`}>
                                <p className={`text-sm ${isCorrect ? 'text-jade/80' : 'text-flamingo/80'}`}>
                                    {currentQ?.explanation}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Results */
                    <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
                        <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center
                            ${passed ? 'bg-jade/20' : 'bg-flamingo/20'}`}>
                            <Trophy className={`w-12 h-12 ${passed ? 'text-jade' : 'text-flamingo'}`} />
                        </div>

                        <div className="text-5xl font-bold text-white mb-2">{scorePercent}%</div>
                        <div className="text-mist/50 mb-6">
                            {score} / {totalQuestions} {scoreLabel || 'correct'}
                        </div>

                        <p className={`text-lg ${passed ? 'text-jade' : 'text-flamingo'}`}>
                            {passed ? passMessage || 'Great job!' : failMessage || 'Keep practicing!'}
                        </p>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="pt-6 flex justify-end gap-4">
                {!isComplete && !showFeedback && (
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedId}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-sapphire text-white font-semibold rounded-full 
                            hover:bg-sapphire/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit Answer
                    </button>
                )}

                {!isComplete && showFeedback && (
                    <button
                        onClick={handleNext}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-sapphire text-white font-semibold rounded-full 
                            hover:bg-sapphire/90 transition-all"
                    >
                        {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'See Results'}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                )}

                {isComplete && (
                    <div className="flex gap-4">
                        {retryLabel && (
                            <button
                                onClick={handleRetry}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.05] text-white rounded-xl
                                    hover:bg-white/[0.1] transition-colors"
                            >
                                {retryLabel}
                            </button>
                        )}
                        {ctaLabel && ctaActionPhrase && (
                            <button
                                className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                                    hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                                    transition-all duration-200 text-lg shadow-lg shadow-flamingo/20"
                                onClick={() => handleAction(ctaActionPhrase)}
                            >
                                {ctaLabel}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
