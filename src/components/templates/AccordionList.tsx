/**
 * AccordionList
 * Expandable sections for detailed content
 * 
 * USE WHEN: FAQs, detailed breakdowns, expandable sections
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each item header is clickable → notifyTele
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface AccordionItem {
    title: string;
    content: string;
    defaultOpen?: boolean;
    actionPhrase: string;
}

interface AccordionListProps {
    title?: string;
    items: AccordionItem[];
}

export const AccordionList: React.FC<AccordionListProps> = ({
    title,
    items = [],
}) => {
    const { playClick } = useSound();
    const [openItems, setOpenItems] = useState<Set<number>>(() => {
        const defaultOpen = new Set<number>();
        items.forEach((item, index) => {
            if (item.defaultOpen) defaultOpen.add(index);
        });
        return defaultOpen;
    });

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const toggleItem = (index: number, actionPhrase: string) => {
        playClick();
        setOpenItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
                // Trigger notifyTele when opening
                notifyTele(actionPhrase);
            }
            return newSet;
        });
    };

    return (
        <div className="glass-template-container">
            {title && <h3 className="text-template-title text-xl mb-4">{title}</h3>}

            <div className="space-y-2">
                {items?.map((item, index) => (
                    <div key={index} className="glass-card-minimal overflow-hidden">
                        <button
                            className="w-full flex items-center justify-between p-4 text-left glass-card-clickable"
                            onClick={() => toggleItem(index, item.actionPhrase)}
                        >
                            <span className="text-template-subtitle">{item.title}</span>
                            {openItems.has(index) ? (
                                <ChevronDown className="w-5 h-5 text-sapphire flex-shrink-0" />
                            ) : (
                                <ChevronRight className="w-5 h-5 text-mist/60 flex-shrink-0" />
                            )}
                        </button>
                        {openItems.has(index) && (
                            <div className="px-4 pb-4 pt-0">
                                <p className="text-template-content">{item.content}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccordionList;
