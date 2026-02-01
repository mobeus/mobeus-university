/**
 * Hero - GENERIC
 * Premium hero with stat, features, insight, quote, and CTA
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, AlertTriangle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface FeatureItem {
    icon?: string;
    label: string;
    muted?: boolean;
}

interface InsightBlock {
    icon?: string;
    title: string;
    description: string;
}

interface HeroProps {
    stat?: string;
    statLabel?: string;
    headline?: string;
    description?: string;
    features?: FeatureItem[];
    insight?: InsightBlock;
    quote?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
    variant?: 'default' | 'alert' | 'success';
}

export const Hero: React.FC<HeroProps> = ({
    stat,
    statLabel,
    headline,
    description,
    features,
    insight,
    quote,
    ctaLabel,
    ctaActionPhrase,
    variant = 'default',
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const getIcon = (iconName?: string): LucideIcon => {
        if (!iconName) return LucideIcons.Zap;
        const icon = (LucideIcons as any)[iconName];
        return icon || LucideIcons.Zap;
    };

    const colors = {
        default: { accent: 'text-sapphire', bg: 'bg-sapphire/10', border: 'border-sapphire/20' },
        alert: { accent: 'text-flamingo', bg: 'bg-flamingo/10', border: 'border-flamingo/20' },
        success: { accent: 'text-jade', bg: 'bg-jade/10', border: 'border-jade/20' },
    };
    const theme = colors[variant];

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col justify-between">

            {stat && (
                <div className="text-center pt-4 pb-8">
                    <div
                        className={`text-[5rem] md:text-[7rem] leading-none font-bold tracking-tight ${theme.accent}`}
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                        {stat}
                    </div>
                    {statLabel && (
                        <p className="text-lg md:text-xl text-mist/60 mt-2 tracking-wide">
                            {statLabel}
                        </p>
                    )}
                </div>
            )}

            {features && features.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3 pb-8">
                    {features.map((feature, index) => {
                        const IconComponent = getIcon(feature.icon);
                        return (
                            <div
                                key={index}
                                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                                    ${feature.muted
                                        ? 'bg-white/[0.03] border border-white/[0.06] text-mist/40'
                                        : `${theme.bg} ${theme.border} border ${theme.accent}`
                                    } transition-all`}
                            >
                                {feature.muted ? (
                                    <span className="w-4 h-4 flex items-center justify-center text-mist/30">×</span>
                                ) : (
                                    <IconComponent className="w-4 h-4" />
                                )}
                                <span className={`text-sm font-medium ${feature.muted ? 'line-through' : ''}`}>
                                    {feature.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}

            {insight && (
                <div className={`mx-auto max-w-2xl px-6 py-5 rounded-2xl ${theme.bg} ${theme.border} border mb-8`}>
                    <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl ${theme.bg} flex items-center justify-center flex-shrink-0`}>
                            {insight.icon ? (
                                React.createElement(getIcon(insight.icon), { className: `w-5 h-5 ${theme.accent}` })
                            ) : (
                                <AlertTriangle className={`w-5 h-5 ${theme.accent}`} />
                            )}
                        </div>
                        <div>
                            <h4 className={`text-base font-bold ${theme.accent} mb-1`}>{insight.title}</h4>
                            <p className="text-mist/70 text-sm leading-relaxed">{insight.description}</p>
                        </div>
                    </div>
                </div>
            )}

            {quote && (
                <div className="text-center pb-8">
                    <blockquote className="text-xl md:text-2xl text-mist/50 italic max-w-xl mx-auto">
                        <span className={`${theme.accent} opacity-40`}>"</span>
                        {quote}
                        <span className={`${theme.accent} opacity-40`}>"</span>
                    </blockquote>
                </div>
            )}

            {headline && !stat && (
                <div className="text-center py-8">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">{headline}</h2>
                    {description && (
                        <p className="text-lg text-mist/60 max-w-2xl mx-auto leading-relaxed">{description}</p>
                    )}
                </div>
            )}

            <div className="flex-grow" />

            {ctaLabel && ctaActionPhrase && (
                <div className="pt-6 pb-2 flex justify-center">
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

export default Hero;
