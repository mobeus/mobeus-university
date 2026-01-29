/**
 * Grid - GENERIC
 * Card grid with optional section labels
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface GridCard {
    icon?: string;
    title: string;
    description: string;
    actionPhrase?: string;
}

interface GridSection {
    label?: string;
    cards: GridCard[];
    variant?: 'default' | 'accent';
}

interface GridProps {
    sections?: GridSection[];
    items?: GridCard[];  // Direct items for simpler AI payloads
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Grid: React.FC<GridProps> = ({
    sections,
    items,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    // Normalize: convert 'items' to 'sections' if provided
    const normalizedSections: GridSection[] = sections || (items ? [{ cards: items }] : []);

    return (
        <div className="glass-template-container h-full flex flex-col">
            {normalizedSections && normalizedSections.length > 0 && (
                <div className="space-y-10 flex-grow">
                    {normalizedSections.map((section, sIdx) => {
                        const isAccent = section.variant === 'accent';
                        const iconBg = isAccent ? 'bg-flamingo/15 border-flamingo/25' : 'bg-sapphire/10 border-sapphire/20';
                        const iconColor = isAccent ? 'text-flamingo' : 'text-sapphire';
                        const labelColor = isAccent ? 'text-flamingo' : 'text-sapphire';

                        return (
                            <div key={sIdx}>
                                {section.label && (
                                    <div className={`text-xs font-semibold ${labelColor} uppercase tracking-widest mb-5`}>
                                        {section.label}
                                    </div>
                                )}
                                <div className={`grid gap-5 ${section.cards.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                                    {section.cards.map((card, cIdx) => {
                                        const IconComp = getIcon(card.icon);
                                        return (
                                            <div
                                                key={cIdx}
                                                onClick={() => card.actionPhrase && handleAction(card.actionPhrase)}
                                                className={`group p-6 rounded-2xl 
                                                    bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]
                                                    ${card.actionPhrase ? 'cursor-pointer hover:border-sapphire/30 hover:from-sapphire/[0.06]' : ''}
                                                    transition-all flex flex-col`}
                                            >
                                                <div className={`w-12 h-12 rounded-xl ${iconBg} border flex items-center justify-center mb-5
                                                    group-hover:bg-sapphire/15 transition-colors`}>
                                                    <IconComp className={`w-6 h-6 ${iconColor}`} />
                                                </div>
                                                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                                                <p className="text-sm text-mist/60 flex-grow leading-relaxed">{card.description}</p>
                                                {card.actionPhrase && (
                                                    <ArrowRight className="w-5 h-5 text-mist/20 mt-4
                                                        group-hover:text-sapphire group-hover:translate-x-1 transition-all" />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
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

export default Grid;
