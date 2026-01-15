/**
 * ThreeColumnLayout
 * Three equal columns for balanced content
 * 
 * USE WHEN: 3 environments, 3 pillars, tri-fold content
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each column is clickable → notifyTele
 */

import React from 'react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Column {
    title: string;
    subtitle?: string;
    description: string;
    badge?: string;
    actionPhrase: string;
}

interface ThreeColumnLayoutProps {
    columns: Column[];
}

export const ThreeColumnLayout: React.FC<ThreeColumnLayoutProps> = ({
    columns = [],
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    // Ensure we have exactly 3 columns, pad if needed
    const displayColumns = columns.slice(0, 3);

    return (
        <div className="glass-template-container">
            <div className="template-grid-3">
                {displayColumns?.map((column, index) => (
                    <div
                        key={index}
                        className="glass-card-standard glass-card-clickable text-center group"
                        onClick={() => handleAction(column.actionPhrase)}
                    >
                        {column.badge && (
                            <div className="template-badge-sapphire mb-4 inline-block">{column.badge}</div>
                        )}
                        <div className="text-3xl font-bold text-sapphire mb-2">{index + 1}</div>
                        <h3 className="text-template-subtitle text-lg mb-2 group-hover:text-sapphire transition-colors">
                            {column.title}
                        </h3>
                        {column.subtitle && (
                            <p className="text-turmeric text-sm font-medium mb-3">{column.subtitle}</p>
                        )}
                        <p className="text-template-content text-sm">{column.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThreeColumnLayout;
