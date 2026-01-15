/**
 * LineChart
 * Simple line/trend chart
 * 
 * USE WHEN: Trends over time, growth visualization, progress tracking
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Chart area is clickable → notifyTele
 */

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface DataPoint {
    label: string;
    value: number;
}

interface LineChartProps {
    title?: string;
    data: DataPoint[];
    color?: 'sapphire' | 'jade' | 'flamingo';
    showTrend?: boolean;
    actionPhrase: string;
}

const colorMap: Record<string, { line: string; fill: string }> = {
    sapphire: { line: '#3B82F6', fill: 'rgba(59, 130, 246, 0.1)' },
    jade: { line: '#10B981', fill: 'rgba(16, 185, 129, 0.1)' },
    flamingo: { line: '#F43F5E', fill: 'rgba(244, 63, 94, 0.1)' },
};

export const LineChart: React.FC<LineChartProps> = ({
    title,
    data = [],
    color = 'sapphire',
    showTrend = true,
    actionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = () => {
        playClick();
        notifyTele(actionPhrase);
    };

    if (data.length === 0) return null;

    const values = data.map(d => d.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = maxVal - minVal || 1;

    // Calculate trend
    const firstVal = values[0];
    const lastVal = values[values.length - 1];
    const trendUp = lastVal > firstVal;
    const trendPercent = ((lastVal - firstVal) / (firstVal || 1) * 100).toFixed(1);

    // Generate SVG path
    const width = 300;
    const height = 120;
    const padding = 10;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    const points = data.map((d, i) => ({
        x: padding + (i / (data.length - 1)) * chartWidth,
        y: padding + chartHeight - ((d.value - minVal) / range) * chartHeight,
    }));

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`;

    const colors = colorMap[color] || colorMap.sapphire;

    return (
        <div className="glass-template-container">
            <div
                className="glass-card-standard glass-card-clickable"
                onClick={handleAction}
            >
                <div className="flex items-center justify-between mb-4">
                    {title && <h3 className="text-template-title text-lg">{title}</h3>}
                    {showTrend && (
                        <div className={`flex items-center gap-1 ${trendUp ? 'text-jade' : 'text-flamingo'}`}>
                            {trendUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            <span className="text-sm font-medium">{trendUp ? '+' : ''}{trendPercent}%</span>
                        </div>
                    )}
                </div>

                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-32">
                    {/* Area fill */}
                    <path d={areaPath} fill={colors.fill} />
                    {/* Line */}
                    <path d={linePath} fill="none" stroke={colors.line} strokeWidth="2" strokeLinecap="round" />
                    {/* Points */}
                    {points.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r="4" fill={colors.line} />
                    ))}
                </svg>

                {/* Labels */}
                <div className="flex justify-between mt-2">
                    {data.map((d, i) => (
                        <span key={i} className="text-template-content text-xs">{d.label}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LineChart;
