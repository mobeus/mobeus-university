/**
 * ExpandableSection
 * Collapsible content section
 * 
 * USE WHEN: Detailed info that can be hidden, progressive disclosure
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Header and CTA are clickable → notifyTele
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ExpandableSectionProps {
    title: string;
    preview?: string;
    content: string;
    defaultExpanded?: boolean;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({
    title,
    preview,
    content,
    defaultExpanded = false,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [expanded, setExpanded] = useState(defaultExpanded);

    const handleToggle = () => {
        playClick();
        setExpanded(!expanded);
    };

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            <div className="glass-card-standard">
                <button
                    className="w-full flex items-center justify-between text-left glass-card-clickable"
                    onClick={handleToggle}
                >
                    <div className="flex-1">
                        <h3 className="text-template-title text-lg">{title}</h3>
                        {!expanded && preview && (
                            <p className="text-template-content text-sm mt-1 line-clamp-2">{preview}</p>
                        )}
                    </div>
                    {expanded ? (
                        <ChevronDown className="w-6 h-6 text-sapphire flex-shrink-0 ml-4" />
                    ) : (
                        <ChevronRight className="w-6 h-6 text-mist/60 flex-shrink-0 ml-4" />
                    )}
                </button>

                {expanded && (
                    <div className="mt-4 pt-4 border-t border-mist/10">
                        <p className="text-template-content leading-relaxed">{content}</p>

                        {ctaLabel && ctaActionPhrase && (
                            <button
                                className="btn-cta mt-4 glass-card-clickable"
                                onClick={() => handleAction(ctaActionPhrase)}
                            >
                                {ctaLabel}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpandableSection;
