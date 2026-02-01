/**
 * DataGrid - GENERIC
 * Grid of data cards with metrics
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, TrendingUp, TrendingDown, Minus, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface DataCard {
    icon?: string;
    title: string;
    value: string;
    subtitle?: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    variant?: 'default' | 'accent' | 'success' | 'warning';
    actionPhrase?: string;
}

interface DataGridProps {
    headline?: string;
    subtitle?: string;
    cards?: DataCard[];
    columns?: 2 | 3 | 4;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const DataGrid: React.FC<DataGridProps> = ({
    headline,
    subtitle,
    cards,
    columns = 3,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const colClass = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
    }[columns];

    const variantStyles = {
        default: 'border-white/[0.06]',
        accent: 'border-sapphire/30 bg-sapphire/5',
        success: 'border-jade/30 bg-jade/5',
        warning: 'border-yellow-500/30 bg-yellow-500/5',
    };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">


            {cards && cards.length > 0 && (
                <div className={`grid ${colClass} gap-5 flex-grow`}>
                    {cards.map((card, i) => {
                        const IconComp = getIcon(card.icon);
                        const variant = card.variant || 'default';

                        return (
                            <div
                                key={i}
                                onClick={() => card.actionPhrase && handleAction(card.actionPhrase)}
                                className={`p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border
                                    ${variantStyles[variant]}
                                    ${card.actionPhrase ? 'cursor-pointer hover:scale-[1.02]' : ''}
                                    transition-all`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center">
                                        <IconComp className="w-6 h-6 text-sapphire" />
                                    </div>
                                    {card.trend && (
                                        <div className={`flex items-center gap-1 text-sm font-medium
                                            ${card.trend === 'up' ? 'text-jade' : card.trend === 'down' ? 'text-red-400' : 'text-mist/50'}`}>
                                            {card.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                                            {card.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                                            {card.trend === 'neutral' && <Minus className="w-4 h-4" />}
                                            {card.trendValue && <span>{card.trendValue}</span>}
                                        </div>
                                    )}
                                </div>

                                <div className="text-sm text-mist/50 mb-1">{card.title}</div>
                                <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
                                {card.subtitle && <div className="text-xs text-mist/40">{card.subtitle}</div>}
                            </div>
                        );
                    })}
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

export default DataGrid;
