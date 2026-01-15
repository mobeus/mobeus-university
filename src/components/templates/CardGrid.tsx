/**
 * CardGrid
 * Grid of clickable content cards
 * 
 * USE WHEN: Multiple topics, categories, navigation options
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each card is clickable → notifyTele
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface Card {
    title: string;
    description?: string;
    imageUrl?: string;
    imagePrompt?: string;
    badge?: string;
    actionPhrase: string;
}

interface CardGridProps {
    cards: Card[];
    columns?: 2 | 3 | 4;
}

export const CardGrid: React.FC<CardGridProps> = ({
    cards = [],
    columns = 3,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const getGridClass = () => {
        switch (columns) {
            case 2: return 'template-grid-2';
            case 4: return 'template-grid-4';
            default: return 'template-grid-3';
        }
    };

    return (
        <div className="glass-template-container">
            <div className={getGridClass()}>
                {cards?.map((card, index) => (
                    <div
                        key={index}
                        className="glass-card-standard glass-card-clickable group"
                        onClick={() => handleAction(card.actionPhrase)}
                    >
                        {(card.imageUrl || card.imagePrompt) && (
                            <div className="aspect-video glass-image-container mb-4 overflow-hidden rounded-lg">
                                <SmartImage
                                    assetId={card.imageUrl || card.imagePrompt || ''}
                                    alt={card.title}
                                    className="smart-image w-full h-full object-cover"
                                />
                            </div>
                        )}
                        {card.badge && (
                            <span className="template-badge mb-2 inline-block">{card.badge}</span>
                        )}
                        <h3 className="text-template-subtitle mb-2 group-hover:text-sapphire transition-colors">
                            {card.title}
                        </h3>
                        {card.description && (
                            <p className="text-template-content text-sm mb-3">{card.description}</p>
                        )}
                        <div className="flex items-center text-sapphire text-sm font-medium">
                            <span>Explore</span>
                            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardGrid;
