/**
 * Accordion - GENERIC
 * Expandable sections with icons and details
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface AccordionItem {
    icon?: string;
    number?: number;
    title: string;
    subtitle?: string;
    description?: string;
    details?: string[];
    actionPhrase?: string;
    actionLabel?: string;
}

interface AccordionProps {
    items?: AccordionItem[];
    allowMultiple?: boolean;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Accordion: React.FC<AccordionProps> = ({
    items,
    allowMultiple = false,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());

    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const toggleExpand = (index: number) => {
        playClick();
        setExpandedIndices(prev => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                if (!allowMultiple) next.clear();
                next.add(index);
            }
            return next;
        });
    };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {items && items.length > 0 && (
                <div className="space-y-4 flex-grow">
                    {items.map((item, index) => {
                        const isExpanded = expandedIndices.has(index);
                        const IconComp = getIcon(item.icon);

                        return (
                            <div
                                key={index}
                                className="rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent 
                                    border border-white/[0.06] overflow-hidden
                                    hover:border-sapphire/30 transition-all"
                            >
                                <div
                                    className="flex items-center gap-5 p-6 cursor-pointer hover:bg-white/[0.02] transition-colors"
                                    onClick={() => toggleExpand(index)}
                                >
                                    <div className="relative flex-shrink-0">
                                        <div className="w-14 h-14 rounded-xl bg-sapphire/10 border border-sapphire/20 flex items-center justify-center">
                                            <IconComp className="w-7 h-7 text-sapphire" />
                                        </div>
                                        {item.number !== undefined && (
                                            <div className="absolute -top-2 -left-2 w-7 h-7 bg-sapphire rounded-full 
                                                flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-sapphire/30">
                                                {item.number}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-white truncate">{item.title}</h3>
                                        {item.subtitle && <p className="text-sm text-sapphire truncate">{item.subtitle}</p>}
                                    </div>

                                    <div className="p-2 hover:bg-white/[0.05] rounded-xl transition-colors">
                                        {isExpanded
                                            ? <ChevronUp className="w-5 h-5 text-mist/40" />
                                            : <ChevronDown className="w-5 h-5 text-mist/40" />
                                        }
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="px-6 pb-6 pt-0 border-t border-white/[0.04]">
                                        <div className="pt-5 ml-[76px]">
                                            {item.description && (
                                                <p className="text-sm text-mist/60 mb-5 leading-relaxed">{item.description}</p>
                                            )}
                                            {item.details && item.details.length > 0 && (
                                                <div className="grid md:grid-cols-2 gap-3">
                                                    {item.details.map((detail, i) => (
                                                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02]">
                                                            <div className="w-2 h-2 rounded-full bg-sapphire flex-shrink-0" />
                                                            <span className="text-sm text-mist/70">{detail}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {item.actionPhrase && (
                                                <button
                                                    className="mt-5 text-sapphire text-sm font-medium flex items-center gap-2 
                                                        hover:text-sapphire/80 transition-colors"
                                                    onClick={(e) => { e.stopPropagation(); handleAction(item.actionPhrase!); }}
                                                >
                                                    {item.actionLabel || 'Explore'}
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
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

export default Accordion;
