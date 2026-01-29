/**
 * Trio - GENERIC
 * Exactly 3 cards in a row
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Card {
    icon?: string;
    title: string;
    description: string;
    actionPhrase?: string;
}

interface TrioProps {
    cards?: Card[];
    items?: Card[];  // Alias for cards (simpler AI payloads)
    numbered?: boolean;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Trio: React.FC<TrioProps> = ({
    cards,
    items,
    numbered = true,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (actionPhrase: string) => { playClick(); notifyTele(actionPhrase); };

    const displayCards = (cards || items)?.slice(0, 3) || [];

    return (
        <div className="glass-template-container h-full flex flex-col">
            {displayCards.length > 0 && (
                <div className="grid md:grid-cols-3 gap-6 flex-grow">
                    {displayCards.map((card, index) => {
                        const IconComponent = getIcon(card.icon);
                        return (
                            <div
                                key={index}
                                onClick={() => card.actionPhrase && handleAction(card.actionPhrase)}
                                className={`group flex flex-col p-8 rounded-2xl 
                                    bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]
                                    ${card.actionPhrase ? 'cursor-pointer hover:border-sapphire/30 hover:from-sapphire/[0.06]' : ''}
                                    transition-all min-h-[220px]`}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    {numbered && (
                                        <div className="w-9 h-9 rounded-full bg-sapphire text-white font-bold text-sm 
                                            flex items-center justify-center flex-shrink-0 shadow-lg shadow-sapphire/30">
                                            {index + 1}
                                        </div>
                                    )}
                                    <div className="w-12 h-12 rounded-xl bg-sapphire/10 border border-sapphire/20 
                                        flex items-center justify-center
                                        group-hover:bg-sapphire/15 transition-colors">
                                        <IconComponent className="w-6 h-6 text-sapphire" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                                <p className="text-mist/60 leading-relaxed flex-grow">{card.description}</p>

                                {card.actionPhrase && (
                                    <ArrowRight className="w-5 h-5 text-mist/20 mt-4
                                        group-hover:text-sapphire group-hover:translate-x-1 transition-all" />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {ctaLabel && ctaActionPhrase && (
                <div className="pt-8 flex justify-end">
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

export default Trio;
