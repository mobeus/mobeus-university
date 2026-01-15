/**
 * ChecklistCard
 * Checklist with completed/pending items
 * 
 * USE WHEN: Requirements, prerequisites, completion tracking
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each item is clickable → notifyTele
 */

import React from 'react';
import { Check, Circle } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ChecklistItem {
    text: string;
    completed?: boolean;
    actionPhrase: string;
}

interface ChecklistCardProps {
    title?: string;
    items: ChecklistItem[];
}

export const ChecklistCard: React.FC<ChecklistCardProps> = ({
    title,
    items = [],
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const completedCount = items.filter(item => item.completed).length;
    const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

    return (
        <div className="glass-template-container">
            <div className="glass-card-standard">
                {title && (
                    <div className="mb-4">
                        <h3 className="text-template-title mb-2">{title}</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-mist/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-jade rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className="text-template-content text-sm">
                                {completedCount}/{items.length}
                            </span>
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    {items?.map((item, index) => (
                        <div
                            key={index}
                            className="glass-card-minimal glass-card-clickable flex items-center gap-3 group"
                            onClick={() => handleAction(item.actionPhrase)}
                        >
                            {item.completed ? (
                                <div className="w-6 h-6 rounded-full bg-jade/20 flex items-center justify-center">
                                    <Check className="w-4 h-4 text-jade" />
                                </div>
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-mist/10 flex items-center justify-center">
                                    <Circle className="w-4 h-4 text-mist/40" />
                                </div>
                            )}
                            <span className={`text-template-content flex-1 group-hover:text-sapphire transition-colors ${item.completed ? 'line-through opacity-60' : ''
                                }`}>
                                {item.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChecklistCard;
