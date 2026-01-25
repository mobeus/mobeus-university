/**
 * StatGrid - Metrics/statistics display
 * Reusable for any numbers showcase
 * 
 * HIERARCHY: Glance (big numbers) → Look (labels) → Read (context)
 */

import React from 'react';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Stat {
    value: string;
    label: string;
    sublabel?: string;
    trend?: 'up' | 'down';
    trendValue?: string;
    actionPhrase?: string;
}

interface StatGridProps {
    headline?: string;
    subheadline?: string;
    stats: Stat[];
    columns?: 2 | 3 | 4;
    color?: 'flamingo' | 'sapphire' | 'jade' | 'turmeric';
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const colorMap = {
    flamingo: 'text-flamingo',
    sapphire: 'text-sapphire',
    jade: 'text-jade',
    turmeric: 'text-turmeric',
};

export const StatGrid: React.FC<StatGridProps> = ({
    headline,
    subheadline,
    stats,
    columns = 3,
    color = 'flamingo',
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const textColor = colorMap[color];

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const gridCols = {
        2: 'grid-cols-2',
        3: 'grid-cols-2 md:grid-cols-3',
        4: 'grid-cols-2 md:grid-cols-4',
    };

    return (
        <div className="glass-template-container">
            {headline && (
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{headline}</h1>
                    {subheadline && <p className="text-lg text-mist/70">{subheadline}</p>}
                </div>
            )}

            <div className={`grid ${gridCols[columns]} gap-6 mb-8`}>
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="text-center p-6 rounded-xl bg-obsidian/30 border border-mist/10 cursor-pointer hover:border-mist/30 transition-all"
                        onClick={() => stat.actionPhrase && handleAction(stat.actionPhrase)}
                    >
                        {/* Big Number */}
                        <div className={`text-4xl md:text-5xl font-bold ${textColor} mb-2`}>
                            {stat.value}
                        </div>

                        {/* Trend */}
                        {stat.trend && stat.trendValue && (
                            <div className={`flex items-center justify-center gap-1 mb-2 ${stat.trend === 'up' ? 'text-jade' : 'text-coral'
                                }`}>
                                {stat.trend === 'up' ? (
                                    <TrendingUp className="w-4 h-4" />
                                ) : (
                                    <TrendingDown className="w-4 h-4" />
                                )}
                                <span className="text-sm font-medium">{stat.trendValue}</span>
                            </div>
                        )}

                        {/* Label */}
                        <div className="text-lg font-medium text-white">{stat.label}</div>

                        {/* Sublabel */}
                        {stat.sublabel && (
                            <div className="text-sm text-mist/50 mt-1">{stat.sublabel}</div>
                        )}
                    </div>
                ))}
            </div>

            {ctaLabel && ctaActionPhrase && (
                <div className="text-center">
                    <button
                        className="inline-flex items-center gap-2 px-8 py-4 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all text-lg"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default StatGrid;
