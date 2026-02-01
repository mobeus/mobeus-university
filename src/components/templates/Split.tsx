/**
 * Split - GENERIC
 * Two-column layout with content on left, items on right
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, AlertTriangle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ListItem {
    icon?: string;
    text: string;
}

interface RightItem {
    icon?: string;
    value: string;
    label: string;
    actionPhrase?: string;
}

interface SplitProps {
    leftIcon?: string;
    leftHeadline?: string;
    leftSubheadline?: string;
    leftItems?: ListItem[];
    leftConclusion?: string;
    leftVariant?: 'default' | 'alert' | 'success';
    rightItems?: RightItem[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return AlertTriangle;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || AlertTriangle;
};

export const Split: React.FC<SplitProps> = ({
    leftIcon,
    leftHeadline,
    leftSubheadline,
    leftItems,
    leftConclusion,
    leftVariant = 'default',
    rightItems,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const LeftIconComp = getIcon(leftIcon);

    const variantColors = {
        default: { bg: 'from-sapphire/10 to-sapphire/5', border: 'border-sapphire/20', icon: 'bg-sapphire/15', iconColor: 'text-sapphire' },
        alert: { bg: 'from-flamingo/10 to-flamingo/5', border: 'border-flamingo/20', icon: 'bg-flamingo/15', iconColor: 'text-flamingo' },
        success: { bg: 'from-jade/10 to-jade/5', border: 'border-jade/20', icon: 'bg-jade/15', iconColor: 'text-jade' },
    };
    const colors = variantColors[leftVariant];

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            <div className="grid md:grid-cols-2 gap-8 flex-grow">

                <div className={`p-8 rounded-2xl bg-gradient-to-b ${colors.bg} border ${colors.border} flex flex-col`}>
                    {(leftIcon || leftHeadline) && (
                        <div className="flex items-center gap-5 mb-8">
                            <div className={`w-16 h-16 rounded-2xl ${colors.icon} border ${colors.border} flex items-center justify-center`}>
                                <LeftIconComp className={`w-8 h-8 ${colors.iconColor}`} />
                            </div>
                            <div>
                                {leftHeadline && <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{leftHeadline}</h3>}
                                {leftSubheadline && <p className={`${colors.iconColor} font-medium mt-1`}>{leftSubheadline}</p>}
                            </div>
                        </div>
                    )}

                    {leftItems && leftItems.length > 0 && (
                        <div className="space-y-4 mb-8 flex-grow">
                            {leftItems.map((item, i) => {
                                const IconComp = getIcon(item.icon);
                                return (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                        <IconComp className={`w-5 h-5 ${colors.iconColor} flex-shrink-0`} />
                                        <span className="text-mist/70">{item.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {leftConclusion && (
                        <p className="text-white font-semibold text-lg">{leftConclusion}</p>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    {rightItems && rightItems.map((item, i) => {
                        const IconComp = getIcon(item.icon);
                        return (
                            <div
                                key={i}
                                onClick={() => item.actionPhrase && handleAction(item.actionPhrase)}
                                className={`group p-6 rounded-2xl bg-gradient-to-r from-white/[0.03] to-transparent 
                                    border border-white/[0.06] flex items-center gap-5 flex-grow
                                    ${item.actionPhrase ? 'cursor-pointer hover:border-sapphire/30 hover:from-sapphire/[0.05]' : ''}
                                    transition-all`}
                            >
                                <div className={`w-14 h-14 rounded-xl ${colors.icon} border ${colors.border} flex items-center justify-center`}>
                                    <IconComp className={`w-7 h-7 ${colors.iconColor}`} />
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white tracking-tight">{item.value}</p>
                                    <p className="text-mist/50">{item.label}</p>
                                </div>
                                {item.actionPhrase && (
                                    <ArrowRight className="w-5 h-5 text-mist/20 ml-auto
                                        group-hover:text-sapphire group-hover:translate-x-1 transition-all" />
                                )}
                            </div>
                        );
                    })}

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

export default Split;
