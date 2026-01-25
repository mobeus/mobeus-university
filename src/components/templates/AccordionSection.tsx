/**
 * AccordionSection - Expandable Q&A
 * Reusable for FAQs or detailed content
 * 
 * HIERARCHY: Glance (questions) → Look (expanded) → Read (details)
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface AccordionItem {
    title: string;
    content: string;
    icon?: string;
    actionPhrase?: string;
}

interface AccordionSectionProps {
    headline?: string;
    subheadline?: string;
    items: AccordionItem[];
    allowMultiple?: boolean;
    defaultOpen?: number[];
    color?: 'flamingo' | 'sapphire' | 'jade' | 'turmeric';
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const colorMap = {
    flamingo: { border: 'border-flamingo/30', text: 'text-flamingo', bg: 'bg-flamingo/10' },
    sapphire: { border: 'border-sapphire/30', text: 'text-sapphire', bg: 'bg-sapphire/10' },
    jade: { border: 'border-jade/30', text: 'text-jade', bg: 'bg-jade/10' },
    turmeric: { border: 'border-turmeric/30', text: 'text-turmeric', bg: 'bg-turmeric/10' },
};

export const AccordionSection: React.FC<AccordionSectionProps> = ({
    headline,
    subheadline,
    items,
    allowMultiple = false,
    defaultOpen = [],
    color = 'flamingo',
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [openItems, setOpenItems] = useState<number[]>(defaultOpen);
    const colors = colorMap[color];

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const toggleItem = (index: number) => {
        playClick();
        if (allowMultiple) {
            setOpenItems(prev =>
                prev.includes(index)
                    ? prev.filter(i => i !== index)
                    : [...prev, index]
            );
        } else {
            setOpenItems(prev =>
                prev.includes(index) ? [] : [index]
            );
        }
    };

    return (
        <div className="glass-template-container">
            {headline && (
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{headline}</h1>
                    {subheadline && <p className="text-lg text-mist/70">{subheadline}</p>}
                </div>
            )}

            <div className="space-y-3 mb-8">
                {items.map((item, index) => {
                    const isOpen = openItems.includes(index);

                    return (
                        <div
                            key={index}
                            className={`rounded-xl border overflow-hidden transition-all ${isOpen ? `${colors.bg} ${colors.border}` : 'bg-obsidian/30 border-mist/10'
                                }`}
                        >
                            {/* Header */}
                            <button
                                className="w-full flex items-center justify-between p-4 text-left"
                                onClick={() => toggleItem(index)}
                            >
                                <div className="flex items-center gap-3">
                                    {item.icon && <span className="text-xl">{item.icon}</span>}
                                    <h3 className={`text-lg font-semibold ${isOpen ? colors.text : 'text-white'}`}>
                                        {item.title}
                                    </h3>
                                </div>
                                {isOpen ? (
                                    <ChevronUp className={`w-5 h-5 ${colors.text}`} />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-mist/50" />
                                )}
                            </button>

                            {/* Content */}
                            {isOpen && (
                                <div className="px-4 pb-4">
                                    <p className="text-mist/70 leading-relaxed">{item.content}</p>
                                    {item.actionPhrase && (
                                        <button
                                            className={`mt-3 text-sm ${colors.text} hover:underline flex items-center gap-1`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAction(item.actionPhrase!);
                                            }}
                                        >
                                            Learn more <ArrowRight className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {ctaLabel && ctaActionPhrase && (
                <div className="text-center">
                    <button
                        className="inline-flex items-center gap-2 px-8 py-4 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all text-lg"
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

export default AccordionSection;
