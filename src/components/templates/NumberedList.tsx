/**
 * NumberedList
 * Ordered list with numbered items
 * 
 * USE WHEN: Priority lists, ranked items, top N things
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each item is clickable → notifyTele
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface NumberedItem {
    text: string;
    detail?: string;
    actionPhrase: string;
}

interface NumberedListProps {
    title?: string;
    items: NumberedItem[];
    startNumber?: number;
}

export const NumberedList: React.FC<NumberedListProps> = ({
    title,
    items = [],
    startNumber = 1,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            {title && <h3 className="text-template-title text-xl mb-4">{title}</h3>}

            <div className="space-y-3">
                {items?.map((item, index) => (
                    <div
                        key={index}
                        className="glass-card-minimal glass-card-clickable flex items-start gap-4 group"
                        onClick={() => handleAction(item.actionPhrase)}
                    >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sapphire/20 flex items-center justify-center">
                            <span className="text-sapphire font-bold text-sm">{startNumber + index}</span>
                        </div>
                        <div className="flex-1 pt-1">
                            <p className="text-template-subtitle group-hover:text-sapphire transition-colors">
                                {item.text}
                            </p>
                            {item.detail && (
                                <p className="text-template-content text-sm mt-1">{item.detail}</p>
                            )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-mist/40 group-hover:text-sapphire transition-colors flex-shrink-0 mt-1" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NumberedList;
