/**
 * StepsCards - GENERIC
 * Card-based steps with images
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface StepCard {
    number?: number;
    icon?: string;
    title: string;
    description?: string;
    imageUrl?: string;
    imagePrompt?: string;
    duration?: string;
    actionPhrase?: string;
}

interface StepsCardsProps {
    headline?: string;
    subtitle?: string;
    cards?: StepCard[];
    columns?: 2 | 3 | 4;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const StepsCards: React.FC<StepsCardsProps> = ({
    headline,
    subtitle,
    cards,
    columns = 3,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const colClass = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
    }[columns];

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {(headline || subtitle) && (
                <div className="text-center pb-8">
                    {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                    {subtitle && <p className="text-mist/60 mt-2">{subtitle}</p>}
                </div>
            )}

            {cards && cards.length > 0 && (
                <div className={`grid ${colClass} gap-6 flex-grow`}>
                    {cards.map((card, i) => {
                        const IconComp = getIcon(card.icon);

                        return (
                            <div
                                key={i}
                                onClick={() => card.actionPhrase && handleAction(card.actionPhrase)}
                                className={`group relative glass-medium rounded-2xl overflow-hidden
                                    hover:scale-[1.02] transition-all duration-300
                                    ${card.actionPhrase ? 'cursor-pointer' : ''} 
                                    flex flex-col`}
                            >
                                {/* Step number badge - Premium Glass */}
                                {card.number !== undefined && (
                                    <div className="absolute top-4 left-4 z-10 w-10 h-10 rounded-xl glass-heavy text-white 
                                        flex items-center justify-center text-sm font-bold 
                                        border border-[var(--color-primary)]/30 shadow-lg shadow-[var(--color-primary)]/20">
                                        {card.number}
                                    </div>
                                )}

                                {/* Image */}
                                {(card.imageUrl || card.imagePrompt) && (
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <SmartImage
                                            assetId={card.imageUrl || card.imagePrompt || `step-${i}`}
                                            alt={card.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex items-start gap-3 mb-3">
                                        {!card.number && (
                                            <div className="w-10 h-10 rounded-xl glass-light
                                                flex items-center justify-center flex-shrink-0 border border-[var(--color-primary)]/20">
                                                <IconComp className="w-5 h-5 text-[var(--color-primary)]" />
                                            </div>
                                        )}
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-bold text-white">{card.title}</h3>
                                            {card.duration && (
                                                <span className="text-xs text-mist/50">{card.duration}</span>
                                            )}
                                        </div>
                                    </div>
                                    {card.description && (
                                        <p className="text-sm text-mist/70 flex-grow">{card.description}</p>
                                    )}

                                    {card.actionPhrase && (
                                        <div className="mt-4 flex items-center text-[var(--color-primary)] text-sm font-medium group-hover:gap-2 transition-all">
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>

                                {/* Connector arrow (except last) */}
                                {i < cards.length - 1 && columns >= 2 && (
                                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                                        <ChevronRight className="w-6 h-6 text-[var(--color-primary)]/40" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
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

export default StepsCards;
