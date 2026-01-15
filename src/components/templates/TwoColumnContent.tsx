/**
 * TwoColumnContent
 * Two equal columns for balanced content
 * 
 * USE WHEN: Side-by-side content, dual points, left/right comparison
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each column is clickable → notifyTele
 */

import React from 'react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Column {
    title: string;
    content: string;
    badge?: string;
    actionPhrase: string;
}

interface TwoColumnContentProps {
    leftColumn: Column;
    rightColumn: Column;
}

export const TwoColumnContent: React.FC<TwoColumnContentProps> = ({
    leftColumn,
    rightColumn,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const renderColumn = (column: Column) => (
        <div
            className="glass-card-standard glass-card-clickable flex-1 group"
            onClick={() => handleAction(column.actionPhrase)}
        >
            {column.badge && (
                <span className="template-badge mb-3 inline-block">{column.badge}</span>
            )}
            <h3 className="text-template-title text-lg mb-3 group-hover:text-sapphire transition-colors">
                {column.title}
            </h3>
            <p className="text-template-content">{column.content}</p>
        </div>
    );

    return (
        <div className="glass-template-container">
            <div className="template-grid-2">
                {renderColumn(leftColumn)}
                {renderColumn(rightColumn)}
            </div>
        </div>
    );
};

export default TwoColumnContent;
