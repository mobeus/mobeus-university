/**
 * StepsChecklist - GENERIC
 * Checkable step list with visual feedback
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, Check, Circle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ChecklistItem {
    icon?: string;
    title: string;
    description?: string;
    imageUrl?: string;
    imagePrompt?: string;
    checked?: boolean;
    required?: boolean;
    actionPhrase?: string;
}

interface StepItem {
    icon?: string;
    title: string;
    description?: string;
    complete?: boolean;
    actionPhrase?: string;
}

interface StepsChecklistProps {
    headline?: string;
    subtitle?: string;
    items?: ChecklistItem[];
    steps?: StepItem[];  // Alias for simplified usage
    progressLabel?: string;
    completedLabel?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const StepsChecklist: React.FC<StepsChecklistProps> = ({
    headline,
    subtitle,
    items,
    steps,
    progressLabel,
    completedLabel,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    // Convert steps to items format if items not provided
    const displayItems: ChecklistItem[] = items || (steps?.map(step => ({
        icon: step.icon,
        title: step.title,
        description: step.description,
        checked: step.complete,
        actionPhrase: step.actionPhrase,
    })) || []);

    const checkedCount = displayItems?.filter(i => i.checked).length || 0;
    const totalCount = displayItems?.length || 0;
    const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {(headline || subtitle) && (
                <div className="pb-6">
                    {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                    {subtitle && <p className="text-mist/60 mt-2">{subtitle}</p>}
                </div>
            )}

            {/* Progress summary */}
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-sapphire/10 to-jade/10 border border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-mist/60">{progressLabel || 'Progress'}</span>
                    <span className="text-sm font-medium text-white">
                        {checkedCount}/{totalCount} {completedLabel || 'completed'}
                    </span>
                </div>
                <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-sapphire to-jade rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Checklist items */}
            {displayItems && displayItems.length > 0 && (
                <div className="flex-grow space-y-3">
                    {displayItems.map((item, i) => {
                        const IconComp = getIcon(item.icon);

                        return (
                            <div
                                key={i}
                                onClick={() => item.actionPhrase && handleAction(item.actionPhrase)}
                                className={`flex gap-4 p-4 rounded-xl border transition-all
                                    ${item.checked
                                        ? 'bg-jade/10 border-jade/30'
                                        : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1]'}
                                    ${item.actionPhrase ? 'cursor-pointer' : ''}`}
                            >
                                {/* Checkbox */}
                                <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center
                                    ${item.checked
                                        ? 'bg-jade border-jade'
                                        : 'border-mist/30 hover:border-sapphire'}`}>
                                    {item.checked && <Check className="w-3 h-3 text-white" />}
                                </div>

                                {/* Image */}
                                {(item.imageUrl || item.imagePrompt) && (
                                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                        <SmartImage
                                            assetId={item.imageUrl || item.imagePrompt || `check-${i}`}
                                            alt={item.title}
                                            className={`w-full h-full object-cover ${item.checked ? '' : 'opacity-60'}`}
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="flex-grow">
                                    <div className="flex items-center gap-2">
                                        <h3 className={`font-medium ${item.checked ? 'text-jade line-through' : 'text-white'}`}>
                                            {item.title}
                                        </h3>
                                        {item.required && !item.checked && (
                                            <span className="px-2 py-0.5 text-xs rounded-full bg-flamingo/10 text-flamingo border border-flamingo/20">
                                                Required
                                            </span>
                                        )}
                                    </div>
                                    {item.description && (
                                        <p className={`text-sm mt-1 ${item.checked ? 'text-jade/60' : 'text-mist/50'}`}>
                                            {item.description}
                                        </p>
                                    )}
                                </div>

                                <IconComp className={`w-5 h-5 flex-shrink-0 ${item.checked ? 'text-jade/40' : 'text-mist/30'}`} />
                            </div>
                        );
                    })}
                </div>
            )}

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

export default StepsChecklist;
