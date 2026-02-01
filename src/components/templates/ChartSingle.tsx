/**
 * ChartSingle - GENERIC
 * Single full-width chart with title and highlights
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

interface ChartSingleProps {
    title?: string;
    subtitle?: string;
    chartType: 'bar' | 'line' | 'pie' | 'donut' | 'scatter' | 'area';
    data?: DataPoint[];
    highlights?: Highlight[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const CHART_COLORS = ['#3B82F6', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4'];

const BarChart: React.FC<{ data: DataPoint[] }> = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    return (
        <div className="flex items-end gap-4 h-64 px-4">
            {data.map((point, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-sm font-bold text-white">{point.value}</div>
                    <div
                        className="w-full rounded-t-lg transition-all duration-500"
                        style={{
                            height: `${(point.value / maxValue) * 100}%`,
                            backgroundColor: point.color || CHART_COLORS[i % CHART_COLORS.length],
                            minHeight: '20px'
                        }}
                    />
                    <div className="text-xs text-mist/60 text-center">{point.label}</div>
                </div>
            ))}
        </div>
    );
};

const PieChart: React.FC<{ data: DataPoint[], donut?: boolean }> = ({ data, donut }) => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let currentAngle = 0;

    return (
        <div className="relative w-64 h-64 mx-auto">
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
                            strokeWidth={donut ? 12 : 0}
                        />
                    );
                })}
                {donut && <circle cx="50" cy="50" r="28" fill="#0a0f1a" />}
            </svg>
            {donut && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white">{total}</div>
                        <div className="text-xs text-mist/50">Total</div>
                    </div>
                </div>
            )}
        </div>
    );
};

const LineChart: React.FC<{ data: DataPoint[], area?: boolean }> = ({ data, area }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const points = data.map((d, i) => ({
        x: (i / (data.length - 1)) * 100,
        y: 100 - (d.value / maxValue) * 100
    }));
    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaD = `${pathD} L 100 100 L 0 100 Z`;

    return (
        <div className="h-64 px-4">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                {area && <path d={areaD} fill="url(#areaGradient)" />}
                <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path d={pathD} fill="none" stroke="#3B82F6" strokeWidth="2" />
                {points.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="3" fill="#3B82F6" />
                ))}
            </svg>
            <div className="flex justify-between mt-2">
                {data.map((d, i) => (
                    <div key={i} className="text-xs text-mist/60">{d.label}</div>
                ))}
            </div>
        </div>
    );
};

const ScatterChart: React.FC<{ data: DataPoint[] }> = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    return (
        <div className="h-64 px-4 relative">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                {data.map((d, i) => (
                    <circle
                        key={i}
                        cx={(i / (data.length - 1)) * 100}
                        cy={100 - (d.value / maxValue) * 100}
                        r="4"
                        fill={d.color || CHART_COLORS[i % CHART_COLORS.length]}
                        className="transition-all duration-300 hover:r-6"
                    />
                ))}
            </svg>
        </div>
    );
};

export const ChartSingle: React.FC<ChartSingleProps> = ({
    title,
    subtitle,
    chartType,
    data,
    highlights,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const renderChart = () => {
        if (!data || data.length === 0) return null;
        switch (chartType) {
            case 'bar': return <BarChart data={data} />;
            case 'pie': return <PieChart data={data} />;
            case 'donut': return <PieChart data={data} donut />;
            case 'line': return <LineChart data={data} />;
            case 'area': return <LineChart data={data} area />;
            case 'scatter': return <ScatterChart data={data} />;
            default: return <BarChart data={data} />;
        }
    };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {(title || subtitle) && (
                <div className="text-center pb-8">
                    {title && <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{title}</h2>}
                    {subtitle && <p className="text-mist/60">{subtitle}</p>}
                </div>
            )}

            <div className="flex-grow p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
                {renderChart()}

                {data && data.length > 0 && (
                    <div className="flex justify-center gap-6 mt-6 pt-6 border-t border-white/[0.06]">
                        {data.map((d, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color || CHART_COLORS[i % CHART_COLORS.length] }} />
                                <span className="text-sm text-mist/60">{d.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {highlights && highlights.length > 0 && (
                <div className="grid md:grid-cols-3 gap-4 pt-6">
                    {highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                            {h.trend === 'up' && <TrendingUp className="w-4 h-4 text-jade flex-shrink-0" />}
                            {h.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400 flex-shrink-0" />}
                            {h.trend === 'neutral' && <Minus className="w-4 h-4 text-mist/40 flex-shrink-0" />}
                            <span className="text-sm text-mist/70">{h.text}</span>
                        </div>
                    ))}
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

export default ChartSingle;
