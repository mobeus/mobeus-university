/**
 * Metric - GENERIC
 * Single large statistic with context
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface MetricProps {
    value: string;
    label: string;
    context?: string;
    icon?: string;
    trend?: 'up' | 'down' | 'neutral';
    variant?: 'default' | 'success' | 'alert';
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return TrendingUp;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || TrendingUp;
};

export const Metric: React.FC<MetricProps> = ({
    value,
    label,
    context,
    icon,
    trend = 'neutral',
    variant = 'default',
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };
    const IconComp = getIcon(icon);

    const colors = {
        default: { accent: 'text-sapphire', bg: 'from-sapphire/10 to-sapphire/5', border: 'border-sapphire/20', glow: 'shadow-sapphire/10' },
        success: { accent: 'text-jade', bg: 'from-jade/10 to-jade/5', border: 'border-jade/20', glow: 'shadow-jade/10' },
        alert: { accent: 'text-flamingo', bg: 'from-flamingo/10 to-flamingo/5', border: 'border-flamingo/20', glow: 'shadow-flamingo/10' },
    };
    const theme = colors[variant];

    const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null;

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col items-center justify-center">

            <div className={`relative px-16 py-14 rounded-3xl bg-gradient-to-b ${theme.bg} border ${theme.border}
                shadow-2xl ${theme.glow} max-w-lg w-full text-center`}>

                {icon && (
                    <div className="flex justify-center mb-6">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-b ${theme.bg} ${theme.border} border
                            flex items-center justify-center`}>
                            <IconComp className={`w-8 h-8 ${theme.accent}`} />
                        </div>
                    </div>
                )}

                <div className={`text-[5rem] md:text-[7rem] leading-none font-bold ${theme.accent} tracking-tight`}
                    style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {value}
                </div>

                {TrendIcon && (
                    <div className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full 
                        ${trend === 'up' ? 'bg-jade/10 text-jade' : 'bg-red-400/10 text-red-400'}`}>
                        <TrendIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">
                            {trend === 'up' ? 'Trending Up' : 'Trending Down'}
                        </span>
                    </div>
                )}

                <p className="text-xl md:text-2xl text-white font-medium mt-6">{label}</p>

                {context && <p className="text-mist/50 text-lg mt-2 max-w-sm mx-auto">{context}</p>}
            </div>

            {ctaLabel && ctaActionPhrase && (
                <div className="mt-10">
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

export default Metric;
