/**
 * ChartDuo - GENERIC
 * Two charts side by side
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
    highlights?: Highlight[];
}

interface ChartDuoProps {
    headline?: string;
    charts?: [ChartConfig, ChartConfig];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const CHART_COLORS = ['#3B82F6', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4'];

const MiniBarChart: React.FC<{ data: DataPoint[] }> = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    return (
        <div className="flex items-end gap-2 h-40">
            {data.map((point, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-xs font-bold text-white">{point.value}</div>
                    <div
                        className="w-full rounded-t-lg transition-all duration-500"
                        style={{
                            height: `${(point.value / maxValue) * 100}%`,
                            backgroundColor: point.color || CHART_COLORS[i % CHART_COLORS.length],
                            minHeight: '12px'
                        }}
                    />
                    <div className="text-[10px] text-mist/50 text-center truncate w-full">{point.label}</div>
                </div>
            ))}
        </div>
    );
};

const MiniPieChart: React.FC<{ data: DataPoint[], donut?: boolean }> = ({ data, donut }) => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let currentAngle = 0;

    return (
        <div className="relative w-40 h-40 mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {data.map((point, i) => {
                    const angle = (point.value / total) * 360;
                    const startAngle = currentAngle;
                    currentAngle += angle;
                    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                    const x2 = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180);
                    const y2 = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180);
                    const largeArc = angle > 180 ? 1 : 0;

                    return (
                        <path
                            key={i}
                            d={donut
                                ? `M ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2}`
                                : `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`
                            }
                            fill={donut ? 'none' : (point.color || CHART_COLORS[i % CHART_COLORS.length])}
                            stroke={point.color || CHART_COLORS[i % CHART_COLORS.length]}
                            strokeWidth={donut ? 10 : 0}
                        />
                    );
                })}
                {donut && <circle cx="50" cy="50" r="28" fill="#0a0f1a" />}
            </svg>
        </div>
    );
};

const MiniLineChart: React.FC<{ data: DataPoint[] }> = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const points = data.map((d, i) => ({
        x: (i / (data.length - 1)) * 100,
        y: 100 - (d.value / maxValue) * 100
    }));
    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return (
        <div className="h-40">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d={pathD} fill="none" stroke="#3B82F6" strokeWidth="2" />
                {points.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="3" fill="#3B82F6" />
                ))}
            </svg>
        </div>
    );
};

const ChartCard: React.FC<{ config: ChartConfig }> = ({ config }) => {
    const renderChart = () => {
        if (!config.data || config.data.length === 0) return null;
        switch (config.chartType) {
            case 'bar': return <MiniBarChart data={config.data} />;
            case 'pie': return <MiniPieChart data={config.data} />;
            case 'donut': return <MiniPieChart data={config.data} donut />;
            case 'line': return <MiniLineChart data={config.data} />;
            default: return <MiniBarChart data={config.data} />;
        }
    };

    return (
        <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] flex flex-col h-full">
            {config.title && <h3 className="text-lg font-bold text-white mb-4">{config.title}</h3>}
            <div className="flex-grow flex items-center justify-center">{renderChart()}</div>
            {config.highlights && config.highlights.length > 0 && (
                <div className="space-y-2 mt-4 pt-4 border-t border-white/[0.06]">
                    {config.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2">
                            {h.trend === 'up' && <TrendingUp className="w-3 h-3 text-jade" />}
                            {h.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-400" />}
                            {h.trend === 'neutral' && <Minus className="w-3 h-3 text-mist/40" />}
                            <span className="text-xs text-mist/60">{h.text}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export const ChartDuo: React.FC<ChartDuoProps> = ({
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
                <div className="grid md:grid-cols-2 gap-6 flex-grow">
                    <ChartCard config={charts[0]} />
                    <ChartCard config={charts[1]} />
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

export default ChartDuo;
