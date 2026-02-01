/**
 * Pricing - GENERIC
 * Pricing table with tiers and features
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, CheckCircle, LucideIcon, Calculator } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Feature {
    icon?: string;
    text: string;
}

interface PriceTier {
    icon?: string;
    name: string;
    price: string;
    unit?: string;
    actionPhrase?: string;
}

interface PricingProps {
    headline?: string;
    subheadline?: string;
    description?: string;
    features?: Feature[];
    tiersLabel?: string;
    tiers?: PriceTier[];
    note?: string;
    bonus?: { label: string; value: string };
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Calculator;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Calculator;
};

export const Pricing: React.FC<PricingProps> = ({
    headline,
    subheadline,
    description,
    features,
    tiersLabel,
    tiers,
    note,
    bonus,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            <div className="grid md:grid-cols-2 gap-8 flex-grow">

                <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] flex flex-col">
                    <div className="flex items-center gap-5 mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-flamingo/10 border border-flamingo/20 flex items-center justify-center">
                            <Calculator className="w-8 h-8 text-flamingo" />
                        </div>
                    </div>

                    {description && <p className="text-lg text-mist/70 mb-8 leading-relaxed">{description}</p>}

                    {features && features.length > 0 && (
                        <div className="space-y-4 flex-grow">
                            {features.map((item, i) => {
                                const IconComp = getIcon(item.icon);
                                return (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                        <IconComp className="w-5 h-5 text-flamingo flex-shrink-0" />
                                        <span className="text-mist/70">{item.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    {tiersLabel && (
                        <p className="text-xs text-mist/40 uppercase tracking-widest font-medium">{tiersLabel}</p>
                    )}

                    {tiers && tiers.map((tier, i) => {
                        const IconComp = getIcon(tier.icon);
                        return (
                            <div
                                key={i}
                                onClick={() => tier.actionPhrase && handleAction(tier.actionPhrase)}
                                className={`group p-6 rounded-2xl bg-gradient-to-r from-white/[0.03] to-transparent 
                                    border border-white/[0.06] flex items-center justify-between
                                    ${tier.actionPhrase ? 'cursor-pointer hover:border-flamingo/30 hover:from-flamingo/[0.05]' : ''}
                                    transition-all`}
                            >
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-xl bg-flamingo/10 border border-flamingo/20 flex items-center justify-center
                                        group-hover:bg-flamingo/15 transition-colors">
                                        <IconComp className="w-7 h-7 text-flamingo" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-lg">{tier.name}</p>
                                        {tier.unit && <p className="text-xs text-mist/50">{tier.unit}</p>}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-flamingo tracking-tight">{tier.price}</p>
                                </div>
                            </div>
                        );
                    })}

                    {note && (
                        <div className="p-5 rounded-xl bg-jade/10 border border-jade/20">
                            <div className="flex items-center gap-3 text-sm text-jade font-medium">
                                <CheckCircle className="w-4 h-4" />
                                <span>{note}</span>
                            </div>
                        </div>
                    )}

                    {bonus && (
                        <div className="p-5 rounded-xl bg-gradient-to-r from-white/[0.02] to-transparent border border-white/[0.05]">
                            <div className="flex items-center justify-between">
                                <span className="text-mist/60">{bonus.label}</span>
                                <span className="text-jade font-bold text-lg">{bonus.value}</span>
                            </div>
                        </div>
                    )}

                    {ctaLabel && ctaActionPhrase && (
                        <button
                            className="w-full inline-flex items-center justify-center gap-3 px-6 py-5 
                                bg-flamingo text-white font-semibold rounded-2xl 
                                hover:bg-flamingo/90 transition-all text-lg shadow-lg shadow-flamingo/20"
                            onClick={() => handleAction(ctaActionPhrase)}
                        >
                            {ctaLabel}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pricing;
