/**
 * Story - GENERIC
 * Narrative flow with sections
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, User, Zap, Sparkles } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface StorySection {
    icon?: string;
    label: string;
    content: string;
    highlight?: boolean;
}

interface RelatedStory {
    title: string;
    subtitle?: string;
    actionPhrase: string;
}

interface StoryProps {
    header?: string;
    headerLabel?: string;
    sections?: StorySection[];
    relatedStories?: RelatedStory[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
    secondaryCtaLabel?: string;
    secondaryCtaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Story: React.FC<StoryProps> = ({
    header,
    headerLabel,
    sections,
    relatedStories,
    ctaLabel,
    ctaActionPhrase,
    secondaryCtaLabel,
    secondaryCtaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (actionPhrase: string) => { playClick(); notifyTele(actionPhrase); };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {(header || headerLabel) && (
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-flamingo/10 border border-flamingo/20 flex items-center justify-center">
                        <Sparkles className="w-7 h-7 text-flamingo" />
                    </div>
                    <div>
                        {headerLabel && <div className="text-sm text-flamingo font-semibold uppercase tracking-wider">{headerLabel}</div>}
                        {header && <div className="text-2xl font-bold text-white tracking-tight">{header}</div>}
                    </div>
                </div>
            )}

            {sections && sections.length > 0 && (
                <div className="space-y-5 flex-grow">
                    {sections.map((section, index) => {
                        const IconComponent = getIcon(section.icon);
                        const bgClass = section.highlight
                            ? 'bg-gradient-to-r from-flamingo/10 to-flamingo/5 border-flamingo/20'
                            : 'bg-gradient-to-r from-white/[0.03] to-transparent border-white/[0.06]';
                        const iconBgClass = section.highlight
                            ? 'bg-flamingo/15 border-flamingo/25'
                            : 'bg-sapphire/10 border-sapphire/20';
                        const iconColor = section.highlight ? 'text-flamingo' : 'text-sapphire';

                        return (
                            <div key={index} className={`p-6 rounded-2xl border ${bgClass}`}>
                                <div className="flex items-start gap-5">
                                    <div className={`w-12 h-12 rounded-xl ${iconBgClass} border flex items-center justify-center flex-shrink-0`}>
                                        <IconComponent className={`w-6 h-6 ${iconColor}`} />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="text-lg font-bold text-white mb-2">{section.label}</div>
                                        <div className={section.highlight ? 'text-flamingo font-medium' : 'text-mist/60 leading-relaxed'}>
                                            {section.content}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {(ctaLabel || secondaryCtaLabel) && (
                <div className="flex items-center justify-between pt-8 gap-4">
                    {secondaryCtaLabel && secondaryCtaActionPhrase && (
                        <button
                            className="inline-flex items-center gap-2 px-6 py-3 bg-sapphire/10 border border-sapphire/20 
                                text-sapphire font-semibold rounded-full hover:bg-sapphire/20 transition-all"
                            onClick={() => handleAction(secondaryCtaActionPhrase)}
                        >
                            <Sparkles className="w-4 h-4" />
                            {secondaryCtaLabel}
                        </button>
                    )}
                    {ctaLabel && ctaActionPhrase && (
                        <button
                            className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                                hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                                transition-all text-lg ml-auto shadow-lg shadow-flamingo/20"
                            onClick={() => handleAction(ctaActionPhrase)}
                        >
                            {ctaLabel}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            )}

            {relatedStories && relatedStories.length > 0 && (
                <div className="pt-8 mt-6 border-t border-white/[0.06]">
                    <div className="text-xs text-mist/40 uppercase tracking-widest font-medium mb-4">Related</div>
                    <div className="space-y-3">
                        {relatedStories.map((story, index) => (
                            <div
                                key={index}
                                className="group flex items-center justify-between p-5 rounded-xl 
                                    bg-gradient-to-r from-white/[0.02] to-transparent border border-white/[0.05] 
                                    cursor-pointer hover:border-sapphire/30 hover:from-sapphire/[0.05] transition-all"
                                onClick={() => handleAction(story.actionPhrase)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                                        <User className="w-5 h-5 text-mist/50" />
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">{story.title}</div>
                                        {story.subtitle && <div className="text-sm text-mist/50">{story.subtitle}</div>}
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-mist/20 group-hover:text-sapphire group-hover:translate-x-1 transition-all" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Story;
