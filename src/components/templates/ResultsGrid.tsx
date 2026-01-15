/**
 * ResultsGrid
 * Grid of outcome/result metrics
 * 
 * USE WHEN: Project results, impact showcase, outcome summary
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each result is clickable → notifyTele
 */

import React from 'react';
import { TrendingUp, Award, Target } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Result {
    category: string;
    metric: string;
    value: string;
    description?: string;
    icon?: 'trending' | 'award' | 'target';
    actionPhrase: string;
}

interface ResultsGridProps {
    title?: string;
    results: Result[];
}

const iconMap = {
    trending: TrendingUp,
    award: Award,
    target: Target,
};

export const ResultsGrid: React.FC<ResultsGridProps> = ({
    title,
    results = [],
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const getIcon = (iconName?: string) => {
        const IconComponent = iconMap[iconName as keyof typeof iconMap] || TrendingUp;
        return <IconComponent className="w-6 h-6" />;
    };

    return (
        <div className="glass-template-container">
            {title && <h3 className="text-template-title text-xl mb-6 text-center">{title}</h3>}

            <div className="template-grid-2">
                {results?.map((result, index) => (
                    <div
                        key={index}
                        className="glass-card-featured glass-card-clickable group"
                        onClick={() => handleAction(result.actionPhrase)}
                    >
                        <div className="flex items-start gap-4">
                            <div className="template-icon-container text-jade group-hover:scale-110 transition-transform">
                                {getIcon(result.icon)}
                            </div>
                            <div className="flex-1">
                                <span className="text-turmeric text-xs font-medium uppercase">{result.category}</span>
                                <div className="text-template-title text-2xl font-bold text-jade">{result.value}</div>
                                <div className="text-template-subtitle text-sm">{result.metric}</div>
                                {result.description && (
                                    <p className="text-template-content text-xs mt-2">{result.description}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultsGrid;
