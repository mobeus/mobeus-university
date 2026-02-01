/**
 * Survey - GENERIC
 * Survey/feedback collection with multiple question types
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState } from 'react';
import { ArrowRight, LucideIcon, Zap, Star, Check, ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

type QuestionType = 'rating' | 'multiple' | 'text' | 'nps';

interface SurveyOption {
    id: string;
    text: string;
    imageUrl?: string;
    imagePrompt?: string;
}

interface SurveyQuestion {
    id: string;
    type: QuestionType;
    question: string;
    description?: string;
    imageUrl?: string;
    imagePrompt?: string;
    options?: SurveyOption[];
    required?: boolean;
    placeholder?: string;
    minLabel?: string;
    maxLabel?: string;
}

interface SurveyProps {
    title: string;
    subtitle?: string;
    imageUrl?: string;
    imagePrompt?: string;
    questions?: SurveyQuestion[];
    thankYouTitle?: string;
    thankYouMessage?: string;
    thankYouImageUrl?: string;
    thankYouImagePrompt?: string;
    submitLabel?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Survey: React.FC<SurveyProps> = ({
    title,
    subtitle,
    imageUrl,
    imagePrompt,
    questions,
    thankYouTitle,
    thankYouMessage,
    thankYouImageUrl,
    thankYouImagePrompt,
    submitLabel,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [responses, setResponses] = useState<Record<string, string | number>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const handleRespond = (questionId: string, value: string | number) => {
        playClick();
        setResponses(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = () => {
        playClick();
        setIsSubmitted(true);
        // Send responses via notifyTele if needed
        notifyTele(`Survey completed with ${Object.keys(responses).length} responses`);
    };

    const requiredQuestions = questions?.filter(q => q.required) || [];
    const allRequiredAnswered = requiredQuestions.every(q => responses[q.id] !== undefined);

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {/* Header */}
            <div className="pb-6 border-b border-white/[0.06]">
                <div className="flex items-start gap-4">
                    {(imageUrl || imagePrompt) && (
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                            <SmartImage
                                assetId={imageUrl || imagePrompt || 'survey-icon'}
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
            </div>

            {/* Content */}
            <div className="flex-grow py-8 overflow-y-auto">
                {!isSubmitted ? (
                    <div className="space-y-8">
                        {questions?.map((q, i) => (
                            <div key={q.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                                <div className="flex items-start gap-3 mb-4">
                                    <span className="w-8 h-8 rounded-lg bg-sapphire/10 border border-sapphire/20 
                                        flex items-center justify-center text-sm font-bold text-sapphire">
                                        {i + 1}
                                    </span>
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-white">
                                            {q.question}
                                            {q.required && <span className="text-flamingo ml-1">*</span>}
                                        </h3>
                                        {q.description && <p className="text-sm text-mist/50 mt-1">{q.description}</p>}
                                    </div>
                                </div>

                                {/* Image */}
                                {(q.imageUrl || q.imagePrompt) && (
                                    <div className="aspect-video max-w-md rounded-xl overflow-hidden mb-4">
                                        <SmartImage
                                            assetId={q.imageUrl || q.imagePrompt || q.id}
                                            alt={q.question}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Rating type */}
                                {q.type === 'rating' && (
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map(val => (
                                            <button
                                                key={val}
                                                onClick={() => handleRespond(q.id, val)}
                                                className={`p-3 rounded-lg transition-all ${responses[q.id] === val
                                                        ? 'bg-flamingo text-white'
                                                        : 'bg-white/[0.05] text-mist/50 hover:text-flamingo'}`}
                                            >
                                                <Star className={`w-6 h-6 ${responses[q.id] && (responses[q.id] as number) >= val ? 'fill-current' : ''}`} />
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* NPS type */}
                                {q.type === 'nps' && (
                                    <div>
                                        <div className="flex justify-between text-xs text-mist/40 mb-2">
                                            <span>{q.minLabel || 'Not likely'}</span>
                                            <span>{q.maxLabel || 'Very likely'}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
                                                <button
                                                    key={val}
                                                    onClick={() => handleRespond(q.id, val)}
                                                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${responses[q.id] === val
                                                            ? val <= 6 ? 'bg-flamingo text-white' : val <= 8 ? 'bg-amber-500 text-white' : 'bg-jade text-white'
                                                            : 'bg-white/[0.05] text-mist/50 hover:bg-white/[0.1]'}`}
                                                >
                                                    {val}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Multiple choice */}
                                {q.type === 'multiple' && q.options && (
                                    <div className="space-y-2">
                                        {q.options.map(opt => (
                                            <button
                                                key={opt.id}
                                                onClick={() => handleRespond(q.id, opt.id)}
                                                className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${responses[q.id] === opt.id
                                                        ? 'bg-sapphire/10 border-sapphire/50'
                                                        : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.15]'}`}
                                            >
                                                {(opt.imageUrl || opt.imagePrompt) && (
                                                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                        <SmartImage
                                                            assetId={opt.imageUrl || opt.imagePrompt || opt.id}
                                                            alt={opt.text}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <span className="flex-grow text-white">{opt.text}</span>
                                                {responses[q.id] === opt.id && (
                                                    <Check className="w-5 h-5 text-sapphire flex-shrink-0" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Text input */}
                                {q.type === 'text' && (
                                    <textarea
                                        placeholder={q.placeholder}
                                        value={(responses[q.id] as string) || ''}
                                        onChange={e => handleRespond(q.id, e.target.value)}
                                        className="w-full p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] 
                                            text-white placeholder:text-mist/30 resize-none focus:outline-none 
                                            focus:border-sapphire/50 transition-colors"
                                        rows={4}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Thank you screen */
                    <div className="text-center p-12 rounded-2xl bg-gradient-to-b from-jade/10 to-transparent border border-jade/30">
                        {(thankYouImageUrl || thankYouImagePrompt) && (
                            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden">
                                <SmartImage
                                    assetId={thankYouImageUrl || thankYouImagePrompt || 'thank-you'}
                                    alt="Thank you"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-jade/20 flex items-center justify-center">
                            <Check className="w-8 h-8 text-jade" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">{thankYouTitle || 'Thank You!'}</h2>
                        {thankYouMessage && <p className="text-mist/60">{thankYouMessage}</p>}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="pt-6 flex justify-end">
                {!isSubmitted && (
                    <button
                        onClick={handleSubmit}
                        disabled={!allRequiredAnswered}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-sapphire text-white font-semibold rounded-full 
                            hover:bg-sapphire/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitLabel || 'Submit'}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                )}

                {isSubmitted && ctaLabel && ctaActionPhrase && (
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

export default Survey;
