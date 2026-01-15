/**
 * BarChart
 * Simple horizontal/vertical bar chart
 * 
 * USE WHEN: Comparisons, rankings, quantity comparison
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each bar is clickable → notifyTele
 */

import React from 'react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface BarData {
    label: string;
    value: number;
    maxValue?: number;
    color?: 'sapphire' | 'jade' | 'flamingo' | 'turmeric' | 'amethyst';
    actionPhrase: string;
}

interface BarChartProps {
    title?: string;
    bars: BarData[];
    orientation?: 'horizontal' | 'vertical';
    showValues?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
    title,
    bars = [],
    orientation = 'horizontal',
    showValues = true,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const maxValue = Math.max(...bars.map(b => b.maxValue || b.value), 1);

    const getBarColor = (color?: string) => {
        switch (color) {
            case 'jade': return 'bg-jade';
            case 'flamingo': return 'bg-flamingo';
            case 'turmeric': return 'bg-turmeric';
            case 'amethyst': return 'bg-amethyst';
            default: return 'bg-sapphire';
        }
    };

    if (orientation === 'vertical') {
        return (
            <div className="glass-template-container">
                {title && <h3 className="text-template-title text-xl mb-6 text-center">{title}</h3>}
                <div className="flex items-end justify-center gap-4 h-64">
                    {bars?.map((bar, index) => {
                        const height = (bar.value / maxValue) * 100;
                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center glass-card-clickable group"
                                onClick={() => handleAction(bar.actionPhrase)}
                            >
                                <div className="relative flex-1 flex flex-col justify-end w-16">
                                    {showValues && (
                                        <span className="text-template-content text-sm mb-1 text-center">{bar.value}</span>
                                    )}
                                    <div
                                        className={`w-full ${getBarColor(bar.color)} rounded-t-lg transition-all duration-300 group-hover:opacity-80`}
                                        style={{ height: `${height}%`, minHeight: '20px' }}
                                    />
                                </div>
                                <span className="text-template-content text-xs mt-2 text-center max-w-[80px]">
                                    {bar.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="glass-template-container">
            {title && <h3 className="text-template-title text-xl mb-4">{title}</h3>}
            <div className="space-y-3">
                {bars?.map((bar, index) => {
                    const width = (bar.value / maxValue) * 100;
                    return (
                        <div
                            key={index}
                            className="glass-card-clickable group"
                            onClick={() => handleAction(bar.actionPhrase)}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-template-subtitle text-sm group-hover:text-sapphire transition-colors">
                                    {bar.label}
                                </span>
                                {showValues && (
                                    <span className="text-template-content text-sm">{bar.value}</span>
                                )}
                            </div>
                            <div className="h-6 bg-mist/10 rounded-lg overflow-hidden">
                                <div
                                    className={`h-full ${getBarColor(bar.color)} rounded-lg transition-all duration-300`}
                                    style={{ width: `${width}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BarChart;
