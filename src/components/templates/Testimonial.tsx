/**
 * Testimonial - RICH GENERIC
 * Emotional first-person reaction quote — larger text, avatar, warm glow
 * Designed for user story payoff moments
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, Quote } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface TestimonialProps {
    icon?: string;
    badge?: string;
    quote: string;
    attribution: string;
    role?: string;
    location?: string;
    imageUrl?: string;
    imagePrompt?: string;
    context?: string;
    tagline?: string;
    variant?: 'warm' | 'inspire' | 'impact';
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

const variantConfig = {
    warm: {
        gradientFrom: 'from-flamingo/[0.08]',
        gradientTo: 'to-flamingo/[0.02]',
        border: 'border-flamingo/20',
        quoteColor: 'text-flamingo/20',
        accentColor: 'text-flamingo',
        glowColor: 'bg-flamingo/[0.04]',
        taglineGradient: 'from-flamingo via-white to-flamingo/60',
    },
    inspire: {
        gradientFrom: 'from-jade/[0.08]',
        gradientTo: 'to-jade/[0.02]',
        border: 'border-jade/20',
        quoteColor: 'text-jade/20',
        accentColor: 'text-jade',
        glowColor: 'bg-jade/[0.04]',
        taglineGradient: 'from-jade via-white to-jade/60',
    },
    impact: {
        gradientFrom: 'from-sapphire/[0.08]',
        gradientTo: 'to-sapphire/[0.02]',
        border: 'border-sapphire/20',
        quoteColor: 'text-sapphire/20',
        accentColor: 'text-sapphire',
        glowColor: 'bg-sapphire/[0.04]',
        taglineGradient: 'from-sapphire via-white to-sapphire/60',
    },
};

export const Testimonial: React.FC<TestimonialProps> = ({
    icon,
    badge,
    quote,
    attribution,
    role,
    location,
    imageUrl,
    imagePrompt,
    context,
    tagline,
    variant = 'warm',
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const config = variantConfig[variant];
    const hasImage = imageUrl || imagePrompt;
    const initials = attribution.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col relative overflow-hidden">
            {/* Ambient glow */}
            <div className={`absolute top-0 right-0 w-80 h-80 ${config.glowColor} rounded-full blur-3xl pointer-events-none`} />
            <div className={`absolute bottom-0 left-0 w-60 h-60 ${config.glowColor} rounded-full blur-3xl pointer-events-none`} />

            <div className="relative z-10 flex flex-col flex-grow">
                {/* Badge */}
                {badge && (
                    <div className="flex items-center gap-3 mb-6">
                        {icon && (
                            <div className={`w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center`}>
                                {React.createElement(getIcon(icon), { className: `w-5 h-5 ${config.accentColor}` })}
                            </div>
                        )}
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/[0.05] ${config.accentColor} border border-white/[0.1]`}>
                            {badge}
                        </span>
                    </div>
                )}

                {/* Context */}
                {context && (
                    <p className="text-mist/50 text-sm mb-6 leading-relaxed">{context}</p>
                )}

                {/* Quote Block */}
                <div className={`relative flex-grow flex flex-col justify-center p-6 md:p-8 rounded-2xl bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo} border ${config.border}`}>
                    {/* Large quotation mark */}
                    <Quote className={`absolute top-4 left-4 w-12 h-12 md:w-16 md:h-16 ${config.quoteColor} rotate-180`} />
                    <Quote className={`absolute bottom-4 right-4 w-8 h-8 ${config.quoteColor}`} />

                    {/* The quote itself */}
                    <blockquote className="relative z-10 text-xl md:text-2xl lg:text-3xl font-medium text-white/90 leading-relaxed md:leading-relaxed pl-4 md:pl-8 italic">
                        "{quote}"
                    </blockquote>

                    {/* Attribution */}
                    <div className="flex items-center gap-4 mt-6 md:mt-8 pl-4 md:pl-8">
                        {/* Avatar */}
                        {hasImage ? (
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 flex-shrink-0">
                                <SmartImage
                                    assetId={imageUrl || imagePrompt || `testimonial-${attribution}`}
                                    alt={attribution}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${config.gradientFrom} border-2 border-white/10 flex items-center justify-center flex-shrink-0`}>
                                <span className="text-sm font-bold text-white/70">{initials}</span>
                            </div>
                        )}

                        <div>
                            <div className="text-white font-semibold">{attribution}</div>
                            <div className="flex flex-wrap items-center gap-2 text-mist/45 text-sm">
                                {role && <span>{role}</span>}
                                {role && location && <span>·</span>}
                                {location && <span>{location}</span>}
                            </div>
                        </div>

                        {/* Accent line */}
                        <div className={`hidden md:block ml-auto w-16 h-[2px] rounded-full bg-gradient-to-r ${config.gradientFrom.replace('from-', 'from-').replace('/[0.08]', '/40')} to-transparent`} />
                    </div>
                </div>

                {/* Tagline */}
                {tagline && (
                    <div className="text-center mt-6">
                        <p className={`text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r ${config.taglineGradient} italic`}>
                            {tagline}
                        </p>
                    </div>
                )}

                {/* CTA */}
                {ctaLabel && ctaActionPhrase && (
                    <div className="pt-6 flex justify-end">
                        <button
                            className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                                hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                                transition-all text-lg shadow-lg shadow-flamingo/20"
                            onClick={() => handleAction(ctaActionPhrase)}
                        >
                            {ctaLabel}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Testimonial;
