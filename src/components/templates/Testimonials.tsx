/**
 * Testimonials - GENERIC
 * Multiple testimonials display
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface Testimonial {
    quote: string;
    author: string;
    role?: string;
    company?: string;
    avatarUrl?: string;
    avatarPrompt?: string;
    rating?: number;
    actionPhrase?: string;
}

interface TestimonialsProps {
    headline?: string;
    subtitle?: string;
    testimonials?: Testimonial[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
    headline,
    subtitle,
    testimonials,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">


            {testimonials && testimonials.length > 0 && (
                <div className={`grid gap-6 flex-grow ${testimonials.length === 1 ? 'grid-cols-1 max-w-2xl' :
                    testimonials.length === 2 ? 'md:grid-cols-2' :
                        'md:grid-cols-2 lg:grid-cols-3'
                    }`}>
                    {testimonials.map((testimonial, i) => (
                        <div
                            key={i}
                            onClick={() => testimonial.actionPhrase && handleAction(testimonial.actionPhrase)}
                            className={`p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]
                                flex flex-col ${testimonial.actionPhrase ? 'cursor-pointer hover:border-sapphire/30' : ''} transition-all`}
                        >
                            <Quote className="w-8 h-8 text-sapphire/30 mb-4" />

                            {testimonial.rating !== undefined && (
                                <div className="flex gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-4 h-4 ${star <= testimonial.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-mist/20'}`}
                                        />
                                    ))}
                                </div>
                            )}

                            <p className="text-mist/70 leading-relaxed mb-6 flex-grow italic">"{testimonial.quote}"</p>

                            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                                {(testimonial.avatarUrl || testimonial.avatarPrompt) && (
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/[0.1]">
                                        <SmartImage
                                            assetId={testimonial.avatarUrl || testimonial.avatarPrompt || `avatar-${i}`}
                                            alt={testimonial.author}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <div className="font-semibold text-white">{testimonial.author}</div>
                                    {(testimonial.role || testimonial.company) && (
                                        <div className="text-sm text-mist/50">
                                            {testimonial.role}{testimonial.role && testimonial.company && ' · '}{testimonial.company}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {ctaLabel && ctaActionPhrase && (
                <div className="pt-8 flex justify-center">
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

export default Testimonials;
