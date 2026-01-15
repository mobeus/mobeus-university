/**
 * NavigationGrid
 * Grid of navigation options
 * 
 * USE WHEN: Main menu, section navigation, "where do you want to go"
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each nav item is clickable → notifyTele
 */

import React from 'react';
import * as Icons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface NavItem {
    icon: string;
    title: string;
    description?: string;
    badge?: string;
    actionPhrase: string;
}

interface NavigationGridProps {
    title?: string;
    items: NavItem[];
    columns?: 2 | 3 | 4;
}

export const NavigationGrid: React.FC<NavigationGridProps> = ({
    title,
    items = [],
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

    const getIcon = (iconName: string) => {
        const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[iconName] || Icons.Circle;
        return <IconComponent className="w-8 h-8" />;
    };

    return (
        <div className="glass-template-container">
            {title && <h3 className="text-template-title text-xl mb-6 text-center">{title}</h3>}

            <div className={getGridClass()}>
                {items?.map((item, index) => (
                    <div
                        key={index}
                        className="glass-card-standard glass-card-clickable text-center group relative"
                        onClick={() => handleAction(item.actionPhrase)}
                    >
                        {item.badge && (
                            <span className="absolute -top-2 -right-2 template-badge text-xs">
                                {item.badge}
                            </span>
                        )}
                        <div className="template-icon-container-lg mx-auto mb-4 group-hover:scale-110 transition-transform text-sapphire">
                            {getIcon(item.icon)}
                        </div>
                        <h4 className="text-template-subtitle mb-2 group-hover:text-sapphire transition-colors">
                            {item.title}
                        </h4>
                        {item.description && (
                            <p className="text-template-content text-sm">{item.description}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NavigationGrid;
