/**
 * Stats - GENERIC
 * Display grid of statistics
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Stat {
    value: string;
    label: string;
    context?: string;
    actionPhrase?: string;
}

interface StatsProps {
    stats?: Stat[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const Stats: React.FC<StatsProps> = ({
    stats,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (actionPhrase: string) => { playClick(); notifyTele(actionPhrase); };

    const gridCols = !stats ? 'grid-cols-1'
        : stats.length === 1 ? 'grid-cols-1'
            : stats.length === 2 ? 'grid-cols-2'
                : stats.length === 3 ? 'grid-cols-3'
                    : 'grid-cols-2 md:grid-cols-4';

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {stats && stats.length > 0 && (
                <div className={`grid ${gridCols} gap-6 flex-grow`}>
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            onClick={() => stat.actionPhrase && handleAction(stat.actionPhrase)}
                            className={`flex flex-col items-center justify-center p-8 rounded-2xl 
                                bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]
                                ${stat.actionPhrase ? 'cursor-pointer hover:border-sapphire/30 hover:from-sapphire/[0.06]' : ''}
                                transition-all min-h-[180px]`}
                        >
                            <div className="text-5xl md:text-6xl font-bold text-sapphire mb-3 tracking-tight"
                                style={{ fontVariantNumeric: 'tabular-nums' }}>
                                {stat.value}
                            </div>
                            <div className="text-lg font-semibold text-white text-center mb-1">{stat.label}</div>
                            {stat.context && <div className="text-sm text-mist/50 text-center">{stat.context}</div>}
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

export default Stats;
