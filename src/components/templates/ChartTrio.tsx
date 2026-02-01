/**
 * ChartTrio - GENERIC
 * Three charts in a row
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface DataPoint {
    label: string;
    value: number;
    color?: string;
}

interface Highlight {
    text: string;
    trend?: 'up' | 'down' | 'neutral';
}

interface ChartConfig {
    title?: string;
    chartType: 'bar' | 'line' | 'pie' | 'donut';
    data?: DataPoint[];
    highlight?: { label?: string; value?: string };
    highlights?: Highlight[];
}

interface ChartTrioProps {
    headline?: string;
    charts?: [ChartConfig, ChartConfig, ChartConfig];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const CHART_COLORS = ['#3B82F6', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4'];

const CompactBarChart: React.FC<{ data: DataPoint[] }> = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    return (
        <div className="flex items-end gap-1 h-32">
            {data.slice(0, 5).map((point, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                        className="w-full rounded-t transition-all duration-500"
                        style={{
                            height: `${(point.value / maxValue) * 100}%`,
                            backgroundColor: point.color || CHART_COLORS[i % CHART_COLORS.length],
                            minHeight: '8px'
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

const CompactDonut: React.FC<{ data: DataPoint[]; highlight?: { label?: string; value?: string } }> = ({ data, highlight }) => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let currentAngle = 0;

    return (
        <div className="relative w-32 h-32 mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {data.map((point, i) => {
                    const angle = (point.value / total) * 360;
                    const startAngle = currentAngle;
                    currentAngle += angle;
                    const x1 = 50 + 35 * Math.cos((startAngle * Math.PI) / 180);
                    const y1 = 50 + 35 * Math.sin((startAngle * Math.PI) / 180);
                    const x2 = 50 + 35 * Math.cos(((startAngle + angle) * Math.PI) / 180);
                    const y2 = 50 + 35 * Math.sin(((startAngle + angle) * Math.PI) / 180);
                    const largeArc = angle > 180 ? 1 : 0;

                    return (
                        <path
                            key={i}
                            d={`M ${x1} ${y1} A 35 35 0 ${largeArc} 1 ${x2} ${y2}`}
                            fill="none"
                            stroke={point.color || CHART_COLORS[i % CHART_COLORS.length]}
                            strokeWidth="8"
                        />
                    );
                })}
                <circle cx="50" cy="50" r="24" fill="#0a0f1a" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-xl font-bold text-white">{highlight?.value || total}</div>
                {highlight?.label && <div className="text-[10px] text-mist/60 mt-0.5">{highlight.label}</div>}
            </div>
        </div>
    );
};

const CompactLine: React.FC<{ data: DataPoint[] }> = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const points = data.map((d, i) => ({
        x: (i / (data.length - 1)) * 100,
        y: 100 - (d.value / maxValue) * 100
    }));
    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return (
        <div className="h-32">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d={pathD} fill="none" stroke="#3B82F6" strokeWidth="2" />
            </svg>
        </div>
    );
};

const ChartCard: React.FC<{ config: ChartConfig }> = ({ config }) => {
    const renderChart = () => {
        if (!config.data || config.data.length === 0) return null;
        switch (config.chartType) {
            case 'bar': return <CompactBarChart data={config.data} />;
            case 'pie':
            case 'donut': return <CompactDonut data={config.data} highlight={config.highlight} />;
            case 'line': return <CompactLine data={config.data} />;
            default: return <CompactBarChart data={config.data} />;
        }
    };

    return (
        <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] flex flex-col h-full">
            {config.title && <h3 className="text-base font-bold text-white mb-3 text-center">{config.title}</h3>}
            <div className="flex-grow flex items-center justify-center">{renderChart()}</div>
            {config.highlights && config.highlights.length > 0 && (
                <div className="space-y-1 mt-3 pt-3 border-t border-white/[0.06]">
                    {config.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                            {h.trend === 'up' && <TrendingUp className="w-3 h-3 text-jade" />}
                            {h.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-400" />}
                            {h.trend === 'neutral' && <Minus className="w-3 h-3 text-mist/40" />}
                            <span className="text-[11px] text-mist/60 truncate">{h.text}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export const ChartTrio: React.FC<ChartTrioProps> = ({
    headline,
    charts,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">


            {charts && (
                <div className="grid md:grid-cols-3 gap-5 flex-grow">
                    <ChartCard config={charts[0]} />
                    <ChartCard config={charts[1]} />
                    <ChartCard config={charts[2]} />
                </div>
            )}

            {ctaLabel && ctaActionPhrase && (
                <div className="pt-8 flex justify-end">
                    <button
                        className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                            hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                            transition-all duration-200 text-lg shadow-lg shadow-flamingo/20"
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

export default ChartTrio;
