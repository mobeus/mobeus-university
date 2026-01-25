/**
 * NavigationCards - Clickable navigation cards
 * Reusable for any topic selection
 * 
 * HIERARCHY: Glance (icons) → Look (titles) → Read (descriptions)
 */

import React from 'react';
import {
    ArrowRight, ChevronRight, Star, Zap, Shield, Heart, Target,
    Award, Sparkles, Rocket, Crown, Diamond, BookOpen, Code
} from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface NavigationCard {
    icon?: 'star' | 'zap' | 'shield' | 'heart' | 'target' | 'award' | 'sparkles' | 'rocket' | 'crown' | 'diamond' | 'book' | 'code';
    emoji?: string;
    imageUrl?: string;
    imagePrompt?: string;
    badge?: string;
    title: string;
    description?: string;
    actionPhrase: string;
}

interface NavigationCardsProps {
    headline?: string;
    subheadline?: string;
    cards: NavigationCard[];
    columns?: 2 | 3 | 4;
    style?: 'minimal' | 'featured' | 'compact';
}

const iconMap = {
    star: Star, zap: Zap, shield: Shield, heart: Heart, target: Target,
    award: Award, sparkles: Sparkles, rocket: Rocket, crown: Crown, diamond: Diamond,
    book: BookOpen, code: Code,
};

const colorCycle = [
    { bg: 'bg-flamingo/15', border: 'border-flamingo/30', text: 'text-flamingo' },
    { bg: 'bg-sapphire/15', border: 'border-sapphire/30', text: 'text-sapphire' },
    { bg: 'bg-turmeric/15', border: 'border-turmeric/30', text: 'text-turmeric' },
    { bg: 'bg-jade/15', border: 'border-jade/30', text: 'text-jade' },
];

export const NavigationCards: React.FC<NavigationCardsProps> = ({
    headline,
    subheadline,
    cards,
    columns = 3,
    style = 'featured',
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const gridCols = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-3',
        4: 'grid-cols-2 md:grid-cols-4',
    };

    const renderCard = (card: NavigationCard, index: number) => {
        const colors = colorCycle[index % colorCycle.length];
        const IconComponent = card.icon ? iconMap[card.icon] : null;
        const hasImage = card.imageUrl || card.imagePrompt;

        if (style === 'compact') {
            return (
                <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-obsidian/30 border border-mist/10 cursor-pointer hover:border-mist/30 transition-all"
                    onClick={() => handleAction(card.actionPhrase)}
                >
                    {card.emoji ? (
                        <span className="text-xl">{card.emoji}</span>
                    ) : IconComponent ? (
                        <IconComponent className={`w-5 h-5 ${colors.text}`} />
                    ) : null}
                    <span className="text-white font-medium flex-1">{card.title}</span>
                    <ChevronRight className="w-4 h-4 text-mist/30" />
                </div>
            );
        }

        if (style === 'minimal') {
            return (
                <div
                    key={index}
                    className={`p-5 rounded-xl border cursor-pointer hover:scale-[1.02] transition-all ${colors.bg} ${colors.border}`}
                    onClick={() => handleAction(card.actionPhrase)}
                >
                    {card.badge && (
                        <span className={`text-xs font-medium uppercase tracking-wide ${colors.text}`}>
                            {card.badge}
                        </span>
                    )}
                    <h3 className="text-lg font-bold text-white mt-1">{card.title}</h3>
                    {card.description && (
                        <p className="text-sm text-mist/60 mt-2">{card.description}</p>
                    )}
                </div>
            );
        }

        // Featured style
        return (
            <div
                key={index}
                className={`rounded-xl border overflow-hidden cursor-pointer hover:scale-[1.02] transition-all ${colors.bg} ${colors.border}`}
                onClick={() => handleAction(card.actionPhrase)}
            >
                {/* Image */}
                {hasImage && (
                    <div className="h-32 overflow-hidden">
                        <SmartImage
                            assetId={card.imageUrl || card.imagePrompt || ''}
                            alt={card.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="p-5">
                    {/* Badge */}
                    {card.badge && (
                        <span className={`inline-block text-xs font-medium uppercase tracking-wide ${colors.text} mb-2`}>
                            {card.badge}
                        </span>
                    )}

                    {/* Icon/Emoji + Title Row */}
                    <div className="flex items-start gap-3">
                        {!hasImage && (
                            card.emoji ? (
                                <span className="text-2xl">{card.emoji}</span>
                            ) : IconComponent ? (
                                <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>
                                    <IconComponent className={`w-5 h-5 ${colors.text}`} />
                                </div>
                            ) : null
                        )}
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-white">{card.title}</h3>
                            {card.description && (
                                <p className="text-sm text-mist/60 mt-1">{card.description}</p>
                            )}
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-end mt-3">
                        <ArrowRight className={`w-5 h-5 ${colors.text}`} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="glass-template-container">
            {headline && (
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{headline}</h1>
                    {subheadline && <p className="text-lg text-mist/70">{subheadline}</p>}
                </div>
            )}

            <div className={`grid ${gridCols[columns]} gap-4`}>
                {cards.map((card, index) => renderCard(card, index))}
            </div>
        </div>
    );
};

export default NavigationCards;
