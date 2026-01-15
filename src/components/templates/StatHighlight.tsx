/**
 * StatHighlight
 * Single large statistic with context
 * 
 * USE WHEN: Hero stat, key metric spotlight, impact number
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Card is clickable → notifyTele
 */

import React from 'react';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface StatHighlightProps {
    value: string;
    label: string;
    description?: string;
    trend?: 'up' | 'down';
    trendValue?: string;
    ctaLabel?: string;
    actionPhrase: string;
}

export const StatHighlight: React.FC<StatHighlightProps> = ({
    value,
    label,
    description,
    trend,
    trendValue,
    ctaLabel = 'Learn more',
    actionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = () => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            <div
                className="glass-card-featured glass-card-clickable text-center py-12 px-8"
                onClick={handleAction}
            >
                {/* Main Value */}
                <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-sapphire to-jade bg-clip-text text-transparent mb-4">
                    {value}
                </div>

                {/* Label */}
                <div className="text-template-title text-xl mb-3">{label}</div>

                {/* Trend indicator */}
                {trend && trendValue && (
                    <div className={`flex items-center justify-center gap-2 mb-4 ${trend === 'up' ? 'text-jade' : 'text-flamingo'
                        }`}>
                        {trend === 'up' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                        <span className="font-medium">{trendValue}</span>
                    </div>
                )}

                {/* Description */}
                {description && (
                    <p className="text-template-content max-w-lg mx-auto mb-6">{description}</p>
                )}

                {/* CTA */}
                <div className="flex items-center justify-center text-sapphire font-medium">
                    <span>{ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                </div>
            </div>
        </div>
    );
};

export default StatHighlight;
