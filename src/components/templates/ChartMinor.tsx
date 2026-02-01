/**
 * ChartMinor - GENERIC
 * 1/3 compact chart with 2/3 content area
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, TrendingUp, TrendingDown, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface DataPoint {
    label: string;
    value: number;
    color?: string;
}

interface ContentItem {
    icon?: string;
    title: string;
    description?: string;
    value?: string;
    trend?: 'up' | 'down';
}

interface ChartMinorProps {
    chartTitle?: string;
    chartType: 'bar' | 'pie' | 'donut' | 'line';
    data?: DataPoint[];
    contentTitle?: string;
    contentSubtitle?: string;
    contentItems?: ContentItem[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const CHART_COLORS = ['#3B82F6', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4'];

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

const CompactDonut: React.FC<{ data: DataPoint[] }> = ({ data }) => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let currentAngle = 0;

    return (
        <div className="relative w-36 h-36 mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {data.map((point, i) => {
                    const angle = (point.value / total) * 360;
                    const startAngle = currentAngle;
                    currentAngle += angle;
                    const x1 = 50 + 38 * Math.cos((startAngle * Math.PI) / 180);
                    const y1 = 50 + 38 * Math.sin((startAngle * Math.PI) / 180);
                    const x2 = 50 + 38 * Math.cos(((startAngle + angle) * Math.PI) / 180);
                    const y2 = 50 + 38 * Math.sin(((startAngle + angle) * Math.PI) / 180);
                    const largeArc = angle > 180 ? 1 : 0;

                    return (
                        <path
                            key={i}
                            d={`M ${x1} ${y1} A 38 38 0 ${largeArc} 1 ${x2} ${y2}`}
                            fill="none"
                            stroke={point.color || CHART_COLORS[i % CHART_COLORS.length]}
                            strokeWidth="8"
                        />
                    );
                })}
                <circle cx="50" cy="50" r="26" fill="#0a0f1a" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-2xl font-bold text-white">{total}</div>
            </div>
        </div>
    );
};

const CompactBar: React.FC<{ data: DataPoint[] }> = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    return (
        <div className="space-y-2 px-2">
            {data.slice(0, 4).map((point, i) => (
                <div key={i} className="flex items-center gap-2">
                    <div className="w-12 text-xs text-mist/50 truncate">{point.label}</div>
                    <div className="flex-grow h-4 bg-white/[0.03] rounded overflow-hidden">
                        <div
                            className="h-full rounded transition-all duration-500"
                            style={{
                                width: `${(point.value / maxValue) * 100}%`,
                                backgroundColor: point.color || CHART_COLORS[i % CHART_COLORS.length]
                            }}
                        />
                    </div>
                    <div className="w-8 text-xs text-white font-bold">{point.value}</div>
                </div>
            ))}
        </div>
    );
};

export const ChartMinor: React.FC<ChartMinorProps> = ({
    chartTitle,
    chartType,
    data,
    contentTitle,
    contentSubtitle,
    contentItems,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const renderChart = () => {
        if (!data || data.length === 0) return null;
        switch (chartType) {
            case 'bar':
            case 'line': return <CompactBar data={data} />;
            case 'pie':
            case 'donut': return <CompactDonut data={data} />;
            default: return <CompactDonut data={data} />;
        }
    };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            <div className="grid md:grid-cols-3 gap-6 flex-grow">
                {/* 1/3 Chart */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] flex flex-col">
                    {chartTitle && <h3 className="text-base font-bold text-white mb-4 text-center">{chartTitle}</h3>}
                    <div className="flex-grow flex items-center justify-center">{renderChart()}</div>
                    {data && data.length > 0 && chartType !== 'bar' && (
                        <div className="flex flex-wrap justify-center gap-2 mt-4 pt-4 border-t border-white/[0.06]">
                            {data.slice(0, 4).map((d, i) => (
                                <div key={i} className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color || CHART_COLORS[i % CHART_COLORS.length] }} />
                                    <span className="text-[10px] text-mist/50">{d.label}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 2/3 Content */}
                <div className="md:col-span-2 p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] flex flex-col">
                    {(contentTitle || contentSubtitle) && (
                        <div className="mb-6">
                            {contentTitle && <h3 className="text-xl font-bold text-white">{contentTitle}</h3>}
                            {contentSubtitle && <p className="text-mist/60 mt-1">{contentSubtitle}</p>}
                        </div>
                    )}

                    {contentItems && contentItems.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-4 flex-grow">
                            {contentItems.map((item, i) => {
                                const IconComp = getIcon(item.icon);
                                return (
                                    <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-sapphire/10 border border-sapphire/20 flex items-center justify-center">
                                                <IconComp className="w-5 h-5 text-sapphire" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                                                    {item.value && (
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-lg font-bold text-white">{item.value}</span>
                                                            {item.trend === 'up' && <TrendingUp className="w-3 h-3 text-jade" />}
                                                            {item.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-400" />}
                                                        </div>
                                                    )}
                                                </div>
                                                {item.description && <p className="text-xs text-mist/50 mt-1">{item.description}</p>}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

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

export default ChartMinor;
