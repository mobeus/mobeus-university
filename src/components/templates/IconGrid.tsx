/**
 * IconGrid
 * Grid of icon-labeled items
 * 
 * USE WHEN: Tech stack, capabilities, features at a glance
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each item is clickable → notifyTele
 */

import React from 'react';
import * as Icons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface IconItem {
    icon: string;
    label: string;
    sublabel?: string;
    actionPhrase: string;
}

interface IconGridProps {
    items: IconItem[];
    columns?: 3 | 4 | 6;
}

export const IconGrid: React.FC<IconGridProps> = ({
    items = [],
    columns = 4,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const getGridClass = () => {
        switch (columns) {
            case 3: return 'template-grid-3';
            case 6: return 'grid grid-cols-3 md:grid-cols-6 gap-4';
            default: return 'template-grid-4';
        }
    };

    const getIcon = (iconName: string) => {
        const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[iconName] || Icons.Circle;
        return <IconComponent className="w-8 h-8 text-sapphire" />;
    };

    return (
        <div className="glass-template-container">
            <div className={getGridClass()}>
                {items?.map((item, index) => (
                    <div
                        key={index}
                        className="glass-card-minimal glass-card-clickable flex flex-col items-center text-center p-4 group"
                        onClick={() => handleAction(item.actionPhrase)}
                    >
                        <div className="template-icon-container mb-3 group-hover:scale-110 transition-transform">
                            {getIcon(item.icon)}
                        </div>
                        <span className="text-template-subtitle text-sm group-hover:text-sapphire transition-colors">
                            {item.label}
                        </span>
                        {item.sublabel && (
                            <span className="text-template-content text-xs mt-1">{item.sublabel}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IconGrid;
