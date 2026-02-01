/**
 * List - GENERIC
 * Vertical list with elegant item cards
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ListItem {
    icon?: string;
    title: string;
    description?: string;
    actionPhrase?: string;
}

interface ListProps {
    headline?: string;
    subheadline?: string;
    items?: ListItem[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const List: React.FC<ListProps> = ({
    headline,
    subheadline,
    items,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">


            {items && items.length > 0 && (
                <div className="space-y-4 flex-grow">
                    {items.map((item, index) => {
                        const IconComp = getIcon(item.icon);
                        const isClickable = !!item.actionPhrase;

                        return (
                            <div
                                key={index}
                                onClick={() => item.actionPhrase && handleAction(item.actionPhrase)}
                                className={`group p-6 rounded-2xl glass-light
                                    flex items-start gap-5
                                    ${isClickable ? 'cursor-pointer hover:border-[var(--color-primary)]/30' : ''}
                                    transition-all duration-300`}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 
                                    flex items-center justify-center flex-shrink-0
                                    group-hover:bg-[var(--color-primary)]/15 group-hover:border-[var(--color-primary)]/30 transition-all">
                                    <IconComp className="w-7 h-7 text-[var(--color-primary)]" />
                                </div>

                                <div className="flex-grow pt-1">
                                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                    {item.description && <p className="text-mist/60 leading-relaxed">{item.description}</p>}
                                </div>

                                {isClickable && (
                                    <ArrowRight className="w-5 h-5 text-mist/20 mt-2
                                        group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all flex-shrink-0" />
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

export default List;
