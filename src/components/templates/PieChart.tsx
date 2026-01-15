/**
 * PieChart
 * Simple pie/donut chart visualization
 * 
 * USE WHEN: Distribution, percentage breakdown, composition
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each segment is clickable → notifyTele
 */

import React from 'react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface PieSegment {
    label: string;
    value: number;
    color?: 'sapphire' | 'jade' | 'flamingo' | 'turmeric' | 'amethyst' | 'wave';
    actionPhrase: string;
}

interface PieChartProps {
    title?: string;
    segments: PieSegment[];
    showLegend?: boolean;
    donut?: boolean;
}

const colorMap: Record<string, string> = {
    sapphire: '#3B82F6',
    jade: '#10B981',
    flamingo: '#F43F5E',
    turmeric: '#F59E0B',
    amethyst: '#8B5CF6',
    wave: '#06B6D4',
};

export const PieChart: React.FC<PieChartProps> = ({
    title,
    segments = [],
    showLegend = true,
    donut = false,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const total = segments.reduce((sum, seg) => sum + seg.value, 0);
    const defaultColors = ['sapphire', 'jade', 'flamingo', 'turmeric', 'amethyst', 'wave'];

    // Calculate segments for SVG
    let currentAngle = 0;
    const pieSegments = segments.map((seg, index) => {
        const percentage = (seg.value / total) * 100;
        const angle = (seg.value / total) * 360;
        const startAngle = currentAngle;
        currentAngle += angle;
        return {
            ...seg,
            percentage,
            startAngle,
            endAngle: currentAngle,
            color: seg.color || defaultColors[index % defaultColors.length],
        };
    });

    const getCoordinates = (angle: number, radius: number) => {
        const radians = (angle - 90) * (Math.PI / 180);
        return {
            x: 50 + radius * Math.cos(radians),
            y: 50 + radius * Math.sin(radians),
        };
    };

    const createArcPath = (startAngle: number, endAngle: number, outerRadius: number, innerRadius: number) => {
        const start = getCoordinates(startAngle, outerRadius);
        const end = getCoordinates(endAngle, outerRadius);
        const innerStart = getCoordinates(endAngle, innerRadius);
        const innerEnd = getCoordinates(startAngle, innerRadius);
        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

        if (donut) {
            return `M ${start.x} ${start.y} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} L ${innerStart.x} ${innerStart.y} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerEnd.x} ${innerEnd.y} Z`;
        }
        return `M 50 50 L ${start.x} ${start.y} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
    };

    return (
        <div className="glass-template-container">
            {title && <h3 className="text-template-title text-xl mb-4 text-center">{title}</h3>}

            <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Chart */}
                <div className="w-48 h-48 flex-shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {pieSegments.map((seg, index) => (
                            <path
                                key={index}
                                d={createArcPath(seg.startAngle, seg.endAngle, 45, donut ? 25 : 0)}
                                fill={colorMap[seg.color] || colorMap.sapphire}
                                className="cursor-pointer transition-opacity hover:opacity-80"
                                onClick={() => handleAction(seg.actionPhrase)}
                            />
                        ))}
                    </svg>
                </div>

                {/* Legend */}
                {showLegend && (
                    <div className="flex-1 space-y-2">
                        {pieSegments.map((seg, index) => (
                            <div
                                key={index}
                                className="glass-card-minimal glass-card-clickable flex items-center gap-3 group py-2"
                                onClick={() => handleAction(seg.actionPhrase)}
                            >
                                <div
                                    className="w-4 h-4 rounded-sm flex-shrink-0"
                                    style={{ backgroundColor: colorMap[seg.color] }}
                                />
                                <span className="flex-1 text-template-content text-sm group-hover:text-sapphire transition-colors">
                                    {seg.label}
                                </span>
                                <span className="text-template-subtitle text-sm font-medium">
                                    {seg.percentage.toFixed(0)}%
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PieChart;
