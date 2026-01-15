/**
 * TabContent
 * Tabbed content navigation
 * 
 * USE WHEN: Multiple related sections, category tabs, organized content
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each tab and CTA is clickable → notifyTele
 */

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Tab {
    id: string;
    label: string;
    content: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

interface TabContentProps {
    tabs: Tab[];
    defaultTabId?: string;
}

export const TabContent: React.FC<TabContentProps> = ({
    tabs = [],
    defaultTabId,
}) => {
    const { playClick } = useSound();
    const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id);

    const handleTabChange = (tabId: string) => {
        playClick();
        setActiveTab(tabId);
    };

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const activeContent = tabs.find(t => t.id === activeTab);

    return (
        <div className="glass-template-container">
            {/* Tab Headers */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {tabs?.map((tab) => (
                    <button
                        key={tab.id}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                ? 'bg-sapphire text-onyx'
                                : 'glass-card-minimal text-mist/80 hover:text-mist hover:bg-mist/10'
                            }`}
                        onClick={() => handleTabChange(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeContent && (
                <div className="glass-card-standard">
                    <p className="text-template-content leading-relaxed">{activeContent.content}</p>

                    {activeContent.ctaLabel && activeContent.ctaActionPhrase && (
                        <button
                            className="btn-cta mt-4 glass-card-clickable"
                            onClick={() => handleAction(activeContent.ctaActionPhrase!)}
                        >
                            {activeContent.ctaLabel}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TabContent;
