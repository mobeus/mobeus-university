/**
 * Scorecard - GENERIC
 * Performance scorecard with metrics and grades
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, TrendingUp, TrendingDown, Minus, Award } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ScorecardMetric {
    icon?: string;
    label: string;
    value: string | number;
    target?: string | number;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    grade?: 'A' | 'B' | 'C' | 'D' | 'F';
    status?: 'excellent' | 'good' | 'average' | 'poor';
}

interface ScorecardSection {
    title: string;
    imageUrl?: string;
    imagePrompt?: string;
    metrics: ScorecardMetric[];
    overallScore?: number;
    overallGrade?: string;
}

interface ScorecardProps {
    title: string;
    subtitle?: string;
    imageUrl?: string;
    imagePrompt?: string;
    periodLabel?: string;
    period?: string;
    overallScore?: number;
    overallGrade?: string;
    overallLabel?: string;
    sections?: ScorecardSection[];
    highlights?: { icon?: string; label: string; value: string }[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Award;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Award;
};

const gradeColors: Record<string, string> = {
    A: 'text-jade bg-jade/10 border-jade/30',
    B: 'text-sapphire bg-sapphire/10 border-sapphire/30',
    C: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    D: 'text-flamingo bg-flamingo/10 border-flamingo/30',
    F: 'text-red-400 bg-red-400/10 border-red-400/30',
};

const statusColors: Record<string, string> = {
    excellent: 'bg-jade',
    good: 'bg-sapphire',
    average: 'bg-amber-400',
    poor: 'bg-flamingo',
};

export const Scorecard: React.FC<ScorecardProps> = ({
    title,
    subtitle,
    imageUrl,
    imagePrompt,
    periodLabel,
    period,
    overallScore,
    overallGrade,
    overallLabel,
    sections,
    highlights,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {/* Header */}
            <div className="pb-6 border-b border-white/[0.06]">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                        {(imageUrl || imagePrompt) && (
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                <SmartImage
                                    assetId={imageUrl || imagePrompt || 'scorecard-icon'}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <div>
                            <h1 className="text-2xl font-bold text-white">{title}</h1>
                            {subtitle && <p className="text-mist/60 mt-1">{subtitle}</p>}
                            {period && (
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs text-mist/40">{periodLabel || 'Period:'}</span>
                                    <span className="px-2 py-0.5 text-xs rounded-full bg-white/[0.05] text-mist/60">{period}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Overall score */}
                    {(overallScore !== undefined || overallGrade) && (
                        <div className="text-center">
                            <div className="text-xs text-mist/40 mb-1">{overallLabel || 'Overall'}</div>
                            {overallGrade && (
                                <div className={`w-16 h-16 rounded-xl border flex items-center justify-center text-3xl font-bold
                                    ${gradeColors[overallGrade] || gradeColors.C}`}>
                                    {overallGrade}
                                </div>
                            )}
                            {overallScore !== undefined && !overallGrade && (
                                <div className="text-4xl font-bold text-white">{overallScore}</div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow py-6 overflow-y-auto">
                {/* Highlights */}
                {highlights && highlights.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {highlights.map((h, i) => {
                            const IconComp = getIcon(h.icon);
                            return (
                                <div key={i} className="p-4 rounded-xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
                                    <IconComp className="w-5 h-5 text-sapphire mb-2" />
                                    <div className="text-2xl font-bold text-white">{h.value}</div>
                                    <div className="text-xs text-mist/50">{h.label}</div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Sections */}
                {sections && sections.length > 0 && (
                    <div className="space-y-6">
                        {sections.map((section, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        {(section.imageUrl || section.imagePrompt) && (
                                            <div className="w-12 h-12 rounded-lg overflow-hidden">
                                                <SmartImage
                                                    assetId={section.imageUrl || section.imagePrompt || `section-${i}`}
                                                    alt={section.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <h3 className="text-lg font-bold text-white">{section.title}</h3>
                                    </div>
                                    {section.overallGrade && (
                                        <div className={`w-10 h-10 rounded-lg border flex items-center justify-center font-bold
                                            ${gradeColors[section.overallGrade] || gradeColors.C}`}>
                                            {section.overallGrade}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    {section.metrics.map((metric, j) => {
                                        const IconComp = getIcon(metric.icon);
                                        return (
                                            <div key={j} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02]">
                                                <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                                                    <IconComp className="w-5 h-5 text-mist/60" />
                                                </div>

                                                <div className="flex-grow">
                                                    <div className="text-sm text-mist/50">{metric.label}</div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xl font-bold text-white">{metric.value}</span>
                                                        {metric.target && (
                                                            <span className="text-sm text-mist/40">/ {metric.target}</span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Trend */}
                                                {metric.trend && (
                                                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm
                                                        ${metric.trend === 'up' ? 'bg-jade/10 text-jade' :
                                                            metric.trend === 'down' ? 'bg-flamingo/10 text-flamingo' :
                                                                'bg-white/[0.05] text-mist/50'}`}>
                                                        {metric.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                                                        {metric.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                                                        {metric.trend === 'neutral' && <Minus className="w-4 h-4" />}
                                                        {metric.trendValue}
                                                    </div>
                                                )}

                                                {/* Grade */}
                                                {metric.grade && (
                                                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center font-bold text-sm
                                                        ${gradeColors[metric.grade] || gradeColors.C}`}>
                                                        {metric.grade}
                                                    </div>
                                                )}

                                                {/* Status bar */}
                                                {metric.status && (
                                                    <div className="w-24">
                                                        <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                                                            <div className={`h-full rounded-full ${statusColors[metric.status]}`}
                                                                style={{
                                                                    width: metric.status === 'excellent' ? '100%' :
                                                                        metric.status === 'good' ? '75%' :
                                                                            metric.status === 'average' ? '50%' : '25%'
                                                                }} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Actions */}
            {ctaLabel && ctaActionPhrase && (
                <div className="pt-6 flex justify-end">
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

export default Scorecard;
