/**
 * Dashboard - GENERIC
 * Multi-widget dashboard with charts and KPIs
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, TrendingUp, TrendingDown, Minus, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface KPI {
    icon?: string;
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
}

interface DataPoint {
    label: string;
    value: number;
    color?: string;
}

interface ChartWidget {
    title?: string;
    chartType: 'bar' | 'line' | 'donut';
    data?: DataPoint[];
}

interface DashboardProps {
    headline?: string;
    kpis?: KPI[];
    charts?: ChartWidget[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const CHART_COLORS = ['#3B82F6', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4'];

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

const MiniBar: React.FC<{ data: DataPoint[] }> = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    return (
        <div className="flex items-end gap-1 h-20">
            {data.slice(0, 6).map((point, i) => (
                <div key={i} className="flex-1">
                    <div
                        className="w-full rounded-t transition-all duration-500"
                        style={{
                            height: `${(point.value / maxValue) * 100}%`,
                            backgroundColor: point.color || CHART_COLORS[i % CHART_COLORS.length],
                            minHeight: '4px'
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

const MiniLine: React.FC<{ data: DataPoint[] }> = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const points = data.map((d, i) => ({
        x: (i / (data.length - 1)) * 100,
        y: 100 - (d.value / maxValue) * 100
    }));
    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return (
        <div className="h-20">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <path d={pathD} fill="none" stroke="#3B82F6" strokeWidth="2" />
            </svg>
        </div>
    );
};

const MiniDonut: React.FC<{ data: DataPoint[] }> = ({ data }) => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let currentAngle = 0;

    return (
        <div className="relative w-20 h-20 mx-auto">
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
                            d={`M ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2}`}
                            fill="none"
                            stroke={point.color || CHART_COLORS[i % CHART_COLORS.length]}
                            strokeWidth="6"
                        />
                    );
                })}
                <circle cx="50" cy="50" r="30" fill="#0a0f1a" />
            </svg>
        </div>
    );
};

export const Dashboard: React.FC<DashboardProps> = ({
    headline,
    kpis,
    charts,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const renderChart = (widget: ChartWidget) => {
        if (!widget.data || widget.data.length === 0) return null;
        switch (widget.chartType) {
            case 'bar': return <MiniBar data={widget.data} />;
            case 'line': return <MiniLine data={widget.data} />;
            case 'donut': return <MiniDonut data={widget.data} />;
            default: return <MiniBar data={widget.data} />;
        }
    };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">


            {/* KPIs Row */}
            {kpis && kpis.length > 0 && (
                <div className={`grid gap-4 mb-6 ${kpis.length === 2 ? 'grid-cols-2' :
                    kpis.length === 3 ? 'grid-cols-3' :
                        'grid-cols-2 md:grid-cols-4'
                    }`}>
                    {kpis.map((kpi, i) => {
                        const IconComp = getIcon(kpi.icon);
                        return (
                            <div key={i} className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-sapphire/10 border border-sapphire/20 flex items-center justify-center">
                                        <IconComp className="w-5 h-5 text-sapphire" />
                                    </div>
                                    <span className="text-sm text-mist/60">{kpi.label}</span>
                                </div>
                                <div className="flex items-end justify-between">
                                    <span className="text-3xl font-bold text-white">{kpi.value}</span>
                                    {kpi.trend && (
                                        <div className={`flex items-center gap-1 text-sm ${kpi.trend === 'up' ? 'text-jade' :
                                            kpi.trend === 'down' ? 'text-red-400' : 'text-mist/50'
                                            }`}>
                                            {kpi.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                                            {kpi.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                                            {kpi.trend === 'neutral' && <Minus className="w-4 h-4" />}
                                            {kpi.trendValue && <span>{kpi.trendValue}</span>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Charts Row */}
            {charts && charts.length > 0 && (
                <div className={`grid gap-4 flex-grow ${charts.length === 1 ? 'grid-cols-1' :
                    charts.length === 2 ? 'md:grid-cols-2' :
                        'md:grid-cols-3'
                    }`}>
                    {charts.map((widget, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
                            {widget.title && <h3 className="text-sm font-bold text-white mb-4">{widget.title}</h3>}
                            {renderChart(widget)}
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

export default Dashboard;
