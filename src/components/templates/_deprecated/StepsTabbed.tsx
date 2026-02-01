/**
 * StepsTabbed - GENERIC
 * Tab-based step navigation
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState } from 'react';
import { ArrowRight, LucideIcon, Zap, Check } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface TabStep {
    icon?: string;
    title: string;
    content?: {
        headline?: string;
        description?: string;
        imageUrl?: string;
        imagePrompt?: string;
        bullets?: string[];
    };
    completed?: boolean;
    actionPhrase?: string;
}

interface StepsTabbedProps {
    headline?: string;
    subtitle?: string;
    tabs?: TabStep[];
    defaultTab?: number;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const StepsTabbed: React.FC<StepsTabbedProps> = ({
    headline,
    subtitle,
    tabs,
    defaultTab = 0,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [activeTab, setActiveTab] = useState(defaultTab);

    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const handleTabClick = (index: number, actionPhrase?: string) => {
        playClick();
        setActiveTab(index);
        if (actionPhrase) {
            notifyTele(actionPhrase);
        }
    };

    const activeContent = tabs?.[activeTab]?.content;

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">


            {/* Tab navigation */}
            {tabs && tabs.length > 0 && (
                <div className="flex gap-1 p-1 bg-white/[0.02] rounded-xl border border-white/[0.06] mb-6 overflow-x-auto">
                    {tabs.map((tab, i) => {
                        const IconComp = getIcon(tab.icon);
                        const isActive = i === activeTab;

                        return (
                            <button
                                key={i}
                                onClick={() => handleTabClick(i, tab.actionPhrase)}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium 
                                    transition-all min-w-[100px]
                                    ${isActive
                                        ? 'bg-sapphire text-white shadow-lg'
                                        : tab.completed
                                            ? 'text-jade hover:bg-white/[0.05]'
                                            : 'text-mist/60 hover:text-white hover:bg-white/[0.05]'}`}
                            >
                                {tab.completed && !isActive ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <IconComp className="w-4 h-4" />
                                )}
                                <span className="hidden sm:inline">{tab.title}</span>
                                <span className="sm:hidden">{i + 1}</span>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Tab content */}
            {activeContent && (
                <div className="flex-grow p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
                    <div className="grid md:grid-cols-2 gap-8 h-full">
                        {/* Image */}
                        {(activeContent.imageUrl || activeContent.imagePrompt) && (
                            <div className="rounded-xl overflow-hidden">
                                <SmartImage
                                    assetId={activeContent.imageUrl || activeContent.imagePrompt || 'tab-content'}
                                    alt={activeContent.headline || 'Step content'}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Text content */}
                        <div className="flex flex-col justify-center">
                            {activeContent.headline && (
                                <h3 className="text-2xl font-bold text-white mb-4">{activeContent.headline}</h3>
                            )}
                            {activeContent.description && (
                                <p className="text-mist/60 mb-6 leading-relaxed">{activeContent.description}</p>
                            )}
                            {activeContent.bullets && activeContent.bullets.length > 0 && (
                                <ul className="space-y-3">
                                    {activeContent.bullets.map((bullet, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-sapphire/10 border border-sapphire/20 
                                                flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-xs text-sapphire font-bold">{i + 1}</span>
                                            </div>
                                            <span className="text-mist/70">{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <div className="pt-6 flex justify-between">
                {activeTab > 0 && tabs ? (
                    <button
                        onClick={() => handleTabClick(activeTab - 1)}
                        className="inline-flex items-center gap-2 px-6 py-3 text-mist/60 hover:text-white transition-colors"
                    >
                        ← {tabs[activeTab - 1]?.title}
                    </button>
                ) : <div />}

                {tabs && activeTab < tabs.length - 1 ? (
                    <button
                        onClick={() => handleTabClick(activeTab + 1)}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-sapphire text-white font-semibold rounded-full 
                            hover:bg-sapphire/90 transition-all"
                    >
                        {tabs[activeTab + 1]?.title} →
                    </button>
                ) : ctaLabel && ctaActionPhrase ? (
                    <button
                        className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                            hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                            transition-all duration-200 text-lg shadow-lg shadow-flamingo/20"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default StepsTabbed;
