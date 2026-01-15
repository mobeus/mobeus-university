/**
 * MetricsGrid
 * Display 3-6 key metrics with large numbers, labels, and optional trends
 * 
 * USE WHEN: ROI stats, KPIs, performance metrics, "show me the numbers"
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Every metric is clickable → notifyTele
 */

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Metric {
    value: string;
    label: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    actionPhrase: string;
}

interface MetricsGridProps {
    metrics: Metric[];
    columns?: 2 | 3 | 4 | 6;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({
    metrics = [],
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
            case 6: return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4';
            default: return 'template-grid-3';
        }
    };

    const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
        switch (trend) {
            case 'up': return <TrendingUp className="w-4 h-4 text-jade" />;
            case 'down': return <TrendingDown className="w-4 h-4 text-flamingo" />;
            default: return <Minus className="w-4 h-4 text-mist/50" />;
        }
    };

    const getTrendColor = (trend?: 'up' | 'down' | 'neutral') => {
        switch (trend) {
            case 'up': return 'text-jade';
            case 'down': return 'text-flamingo';
            default: return 'text-mist/60';
        }
    };

    return (
        <div className="glass-template-container">
            <div className={getGridClass()}>
                {metrics?.map((metric, index) => (
                    <div
                        key={index}
                        className="glass-card-standard glass-card-clickable text-center"
                        onClick={() => handleAction(metric.actionPhrase)}
                    >
                        <div className="template-metric">
                            <div className="template-metric-value">{metric?.value || '—'}</div>
                            <div className="template-metric-label">{metric?.label || 'Metric'}</div>
                            {metric?.change && (
                                <div className={`flex items-center justify-center gap-1 mt-2 text-sm ${getTrendColor(metric.trend)}`}>
                                    {getTrendIcon(metric.trend)}
                                    <span>{metric.change}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MetricsGrid;
