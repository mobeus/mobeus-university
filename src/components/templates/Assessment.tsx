/**
 * Assessment - GENERIC
 * Scored assessment with detailed feedback
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState } from 'react';
import { ArrowRight, LucideIcon, Zap, Star, ChevronRight, BarChart2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface AssessmentItem {
    icon?: string;
    category: string;
    question: string;
    description?: string;
    imageUrl?: string;
    imagePrompt?: string;
    scale?: { min: number; max: number; minLabel?: string; maxLabel?: string };
}

interface ScoreRange {
    min: number;
    max: number;
    label: string;
    description: string;
    color: 'jade' | 'sapphire' | 'flamingo' | 'mist';
}

interface AssessmentProps {
    title: string;
    subtitle?: string;
    imageUrl?: string;
    imagePrompt?: string;
    items?: AssessmentItem[];
    scoreRanges?: ScoreRange[];
    resultsTitle?: string;
    categoryScoresLabel?: string;
    recommendations?: { icon?: string; title: string; description: string }[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Assessment: React.FC<AssessmentProps> = ({
    title,
    subtitle,
    imageUrl,
    imagePrompt,
    items,
    scoreRanges,
    resultsTitle,
    categoryScoresLabel,
    recommendations,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [currentItem, setCurrentItem] = useState(0);
    const [responses, setResponses] = useState<Record<number, number>>({});
    const [isComplete, setIsComplete] = useState(false);
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const totalItems = items?.length || 0;
    const item = items?.[currentItem];
    const scale = item?.scale || { min: 1, max: 5 };

    const handleRate = (value: number) => {
        playClick();
        setResponses(prev => ({ ...prev, [currentItem]: value }));
    };

    const handleNext = () => {
        playClick();
        if (currentItem < totalItems - 1) {
            setCurrentItem(currentItem + 1);
        } else {
            setIsComplete(true);
        }
    };

    // Calculate scores
    const totalScore = Object.values(responses).reduce((a, b) => a + b, 0);
    const maxPossible = totalItems * scale.max;
    const scorePercent = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;

    // Calculate category scores
    const categoryScores: Record<string, { total: number; count: number }> = {};
    items?.forEach((item, i) => {
        if (responses[i] !== undefined) {
            if (!categoryScores[item.category]) {
                categoryScores[item.category] = { total: 0, count: 0 };
            }
            categoryScores[item.category].total += responses[i];
            categoryScores[item.category].count += 1;
        }
    });

    // Find matching score range
    const matchingRange = scoreRanges?.find(r => scorePercent >= r.min && scorePercent <= r.max);
    const rangeColor = matchingRange?.color || 'sapphire';

    const colorClasses = {
        jade: 'text-jade bg-jade/10 border-jade/30',
        sapphire: 'text-sapphire bg-sapphire/10 border-sapphire/30',
        flamingo: 'text-flamingo bg-flamingo/10 border-flamingo/30',
        mist: 'text-mist/60 bg-white/[0.05] border-white/[0.1]',
    };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {/* Header */}
            <div className="pb-6 border-b border-white/[0.06]">
                <div className="flex items-start gap-4">
                    {(imageUrl || imagePrompt) && (
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                            <SmartImage
                                assetId={imageUrl || imagePrompt || 'assessment-icon'}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-white">{title}</h1>
                        {subtitle && <p className="text-mist/60 mt-1">{subtitle}</p>}
                    </div>
                </div>

                {/* Progress */}
                {!isComplete && (
                    <div className="mt-4 flex items-center gap-4">
                        <div className="flex-grow h-2 bg-white/[0.05] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-sapphire rounded-full transition-all duration-300"
                                style={{ width: `${((currentItem + 1) / totalItems) * 100}%` }}
                            />
                        </div>
                        <span className="text-sm text-mist/50">{currentItem + 1}/{totalItems}</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-grow py-8">
                {!isComplete && item ? (
                    <div className="max-w-2xl">
                        {/* Category badge */}
                        <div className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full 
                            bg-sapphire/10 text-sapphire border border-sapphire/20">
                            {item.category}
                        </div>

                        {/* Image */}
                        {(item.imageUrl || item.imagePrompt) && (
                            <div className="aspect-video rounded-xl overflow-hidden mb-6">
                                <SmartImage
                                    assetId={item.imageUrl || item.imagePrompt || `item-${currentItem}`}
                                    alt={item.question}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <h2 className="text-xl font-bold text-white mb-2">{item.question}</h2>
                        {item.description && <p className="text-mist/60 mb-8">{item.description}</p>}

                        {/* Rating scale */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                            <div className="flex justify-between text-sm text-mist/50 mb-4">
                                <span>{scale.minLabel || scale.min}</span>
                                <span>{scale.maxLabel || scale.max}</span>
                            </div>
                            <div className="flex gap-2">
                                {Array.from({ length: scale.max - scale.min + 1 }, (_, i) => {
                                    const value = scale.min + i;
                                    const isSelected = responses[currentItem] === value;
                                    return (
                                        <button
                                            key={value}
                                            onClick={() => handleRate(value)}
                                            className={`flex-1 py-4 rounded-xl font-bold transition-all
                                                ${isSelected
                                                    ? 'bg-sapphire text-white scale-105'
                                                    : 'bg-white/[0.05] text-mist/50 hover:bg-white/[0.1] hover:text-white'}`}
                                        >
                                            {value}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Results */
                    <div>
                        <div className="text-center mb-8 p-8 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
                            <h2 className="text-xl font-bold text-white mb-6">{resultsTitle || 'Your Results'}</h2>

                            <div className={`inline-flex flex-col items-center p-6 rounded-2xl border ${colorClasses[rangeColor]}`}>
                                <div className="text-5xl font-bold">{scorePercent}%</div>
                                {matchingRange && (
                                    <>
                                        <div className="text-lg font-medium mt-2">{matchingRange.label}</div>
                                        <div className="text-sm opacity-70 mt-1">{matchingRange.description}</div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Category breakdown */}
                        {Object.keys(categoryScores).length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <BarChart2 className="w-5 h-5 text-sapphire" />
                                    {categoryScoresLabel || 'Score by Category'}
                                </h3>
                                <div className="space-y-3">
                                    {Object.entries(categoryScores).map(([category, data]) => {
                                        const avg = data.total / data.count;
                                        const percent = (avg / scale.max) * 100;
                                        return (
                                            <div key={category} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-white">{category}</span>
                                                    <span className="text-sm text-mist/50">{avg.toFixed(1)}/{scale.max}</span>
                                                </div>
                                                <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-sapphire to-jade rounded-full"
                                                        style={{ width: `${percent}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Recommendations */}
                        {recommendations && recommendations.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold text-white mb-4">Recommendations</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {recommendations.map((rec, i) => {
                                        const IconComp = getIcon(rec.icon);
                                        return (
                                            <div key={i} className="p-4 rounded-xl bg-jade/5 border border-jade/20">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <IconComp className="w-5 h-5 text-jade" />
                                                    <span className="font-medium text-white">{rec.title}</span>
                                                </div>
                                                <p className="text-sm text-mist/60">{rec.description}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="pt-6 flex justify-end">
                {!isComplete && (
                    <button
                        onClick={handleNext}
                        disabled={responses[currentItem] === undefined}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-sapphire text-white font-semibold rounded-full 
                            hover:bg-sapphire/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {currentItem < totalItems - 1 ? 'Next' : 'See Results'}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                )}

                {isComplete && ctaLabel && ctaActionPhrase && (
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
        </div>
    );
};

export default Assessment;
