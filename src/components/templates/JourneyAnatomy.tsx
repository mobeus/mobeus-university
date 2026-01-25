/**
 * JourneyAnatomy - Step 5: Anatomy of a Tele
 * Shows the 5 parts of every tele with expandable sections
 * 
 * HIERARCHY: Glance (5 parts) → Look (icons + titles) → Read (expanded details)
 */

import React, { useState } from 'react';
import { BookOpen, Palette, FileText, Plug, BarChart3, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface AnatomyPart {
    icon?: 'book' | 'palette' | 'file' | 'plug' | 'chart';
    emoji?: string;
    title: string;
    subtitle: string;
    description: string;
    wireCommand?: string;
    actionPhrase?: string;
}

interface JourneyAnatomyProps {
    parts?: AnatomyPart[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const iconMap = {
    book: BookOpen,
    palette: Palette,
    file: FileText,
    plug: Plug,
    chart: BarChart3,
};

export const JourneyAnatomy: React.FC<JourneyAnatomyProps> = ({
    parts = [
        { icon: 'book', title: 'Knowledge', subtitle: 'What it knows', description: 'Domain facts, terminology, how to speak about topics. Stored in tele-knowledge.md.', wireCommand: '/add-knowledge', actionPhrase: 'Tell me about add-knowledge' },
        { icon: 'palette', title: 'Skills', subtitle: 'What it shows', description: 'Visual templates the tele can display. React components created with /add-glass.', wireCommand: '/add-glass', actionPhrase: 'Tell me about add-glass' },
        { icon: 'file', title: 'Rules', subtitle: 'How it responds', description: 'Shot prompts that map user intents to template responses. Defined with /tele-should.', wireCommand: '/tele-should', actionPhrase: 'Tell me about tele-should' },
        { icon: 'plug', title: 'Connections', subtitle: 'What it can do', description: 'API integrations, external services, site functions. Extended capabilities.', wireCommand: '/create-site-function', actionPhrase: 'Tell me about create-site-function' },
        { icon: 'chart', title: 'Analytics', subtitle: 'What it learns', description: 'Conversational + web analytics combined. Understand what users ask and how they navigate.', actionPhrase: 'Tell me about analytics' },
    ],
    ctaLabel = "See Use Cases",
    ctaActionPhrase = "Show me use cases",
}) => {
    const { playClick } = useSound();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const toggleExpand = (index: number) => {
        playClick();
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="glass-template-container">
            {/* Anatomy Parts - Clean, consistent styling */}
            <div className="space-y-2 mb-8">
                {parts?.map((part, index) => {
                    const IconComponent = iconMap[part.icon || 'book'];
                    const isExpanded = expandedIndex === index;

                    return (
                        <div
                            key={index}
                            className="rounded-xl bg-obsidian/40 border border-mist/10 overflow-hidden transition-all hover:border-sapphire/30"
                        >
                            {/* Header - Clickable for navigation */}
                            <div
                                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-obsidian/60 transition-colors"
                                onClick={() => {
                                    if (part.actionPhrase) {
                                        handleAction(part.actionPhrase);
                                    } else {
                                        toggleExpand(index);
                                    }
                                }}
                            >
                                {/* Icon */}
                                <div className="w-10 h-10 rounded-lg bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                                    <IconComponent className="w-5 h-5 text-sapphire" />
                                </div>

                                {/* Title & Subtitle */}
                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-white">{part.title}</h3>
                                    <p className="text-xs text-mist/60">{part.subtitle}</p>
                                </div>

                                {/* Wire Command Badge */}
                                {part.wireCommand && (
                                    <code
                                        className="hidden md:block text-xs text-sapphire bg-obsidian/50 px-2 py-1 rounded font-mono cursor-pointer hover:bg-obsidian/70 transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (part.actionPhrase) {
                                                handleAction(part.actionPhrase);
                                            }
                                        }}
                                    >
                                        {part.wireCommand}
                                    </code>
                                )}

                                {/* Expand Icon */}
                                <div
                                    className="p-1 hover:bg-white/10 rounded transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleExpand(index);
                                    }}
                                >
                                    {isExpanded ? (
                                        <ChevronUp className="w-5 h-5 text-mist/50" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-mist/50" />
                                    )}
                                </div>
                            </div>

                            {/* Expanded Content */}
                            {isExpanded && (
                                <div className="px-4 pb-4 pt-0">
                                    <div className="pl-14">
                                        <p className="text-sm text-mist/70 mb-4 leading-relaxed">
                                            {part.description}
                                        </p>
                                        {part.actionPhrase && (
                                            <button
                                                className="text-sm text-sapphire hover:underline flex items-center gap-1"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAction(part.actionPhrase!);
                                                }}
                                            >
                                                Learn more <ArrowRight className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* CTA */}
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

export default JourneyAnatomy;
