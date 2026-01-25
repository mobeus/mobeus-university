/**
 * JourneyConcepts - Step 3: Core Concepts
 * Shows the 4 key concepts that power every tele
 * 
 * RICH LAYOUT: Large cards with visual diagrams, expanded details
 */

import React, { useState } from 'react';
import { Users, Link, Layout, MousePointer, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Concept {
    icon?: 'users' | 'link' | 'layout' | 'pointer';
    number: number;
    title: string;
    subtitle: string;
    description: string;
    details?: string[];
    actionPhrase?: string;
}

interface JourneyConceptsProps {
    concepts?: Concept[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const iconMap = {
    users: Users,
    link: Link,
    layout: Layout,
    pointer: MousePointer,
};

export const JourneyConcepts: React.FC<JourneyConceptsProps> = ({
    concepts = [
        {
            number: 1,
            icon: 'users',
            title: 'Dual Agent Architecture',
            subtitle: 'Two AIs Working Together',
            description: 'The Build Agent (Claude) creates your tele. The Runtime Agent (Catherine) runs it for users. Separation of concerns = better results.',
            details: ['Claude handles code generation', 'Catherine handles conversations', 'They never run at the same time'],
            actionPhrase: 'Explain dual agent architecture'
        },
        {
            number: 2,
            icon: 'link',
            title: 'DOM-to-LLM Bridge',
            subtitle: 'navigateToSection()',
            description: 'One function connects your visual templates to the AI brain. Catherine calls it, your UI updates instantly.',
            details: ['Receives structured JSON', 'Renders any template', 'Handles all navigation'],
            actionPhrase: 'Explain the DOM bridge'
        },
        {
            number: 3,
            icon: 'layout',
            title: 'Template System',
            subtitle: 'Visual Components',
            description: 'React components that Catherine can display. Pre-built or custom. Created with the /add-glass wire command.',
            details: ['25+ pre-built templates', 'Create custom with /add-glass', 'Fully typed TypeScript'],
            actionPhrase: 'Explain templates'
        },
        {
            number: 4,
            icon: 'pointer',
            title: 'Volumetric Navigation',
            subtitle: 'Clicks Are Conversations',
            description: 'Every UI click sends a message to the tele. No dead ends. Users flow through content naturally.',
            details: ['No orphan pages', 'Analytics on everything', 'Guided user journeys'],
            actionPhrase: 'Explain volumetric navigation'
        },
    ],
    ctaLabel = "Learn Wire Commands",
    ctaActionPhrase = "What are wire commands",
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
        <div className="glass-template-container space-y-6">
            {/* Concept Cards - Vertical stack for richer layout */}
            <div className="space-y-4">
                {concepts?.map((concept, index) => {
                    const IconComponent = iconMap[concept.icon || 'users'];
                    const isExpanded = expandedIndex === index;

                    return (
                        <div
                            key={index}
                            className="rounded-xl bg-obsidian/40 border border-mist/10 overflow-hidden hover:border-sapphire/30 transition-all"
                        >
                            {/* Card Header */}
                            <div
                                className="flex items-center gap-4 p-5 cursor-pointer hover:bg-obsidian/60 transition-colors"
                                onClick={() => concept.actionPhrase && handleAction(concept.actionPhrase)}
                            >
                                {/* Number + Icon */}
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                                        <IconComponent className="w-7 h-7 text-sapphire" />
                                    </div>
                                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-sapphire rounded-full flex items-center justify-center text-white text-xs font-bold">
                                        {concept.number}
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-white">{concept.title}</h3>
                                    <p className="text-sm text-sapphire">{concept.subtitle}</p>
                                </div>

                                {/* Description - Visible inline on desktop */}
                                <div className="hidden md:block flex-1 max-w-sm">
                                    <p className="text-sm text-mist/70">{concept.description}</p>
                                </div>

                                {/* Expand toggle */}
                                <button
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
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
                                </button>
                            </div>

                            {/* Expanded Details */}
                            {isExpanded && (
                                <div className="px-5 pb-5 pt-0 border-t border-mist/10">
                                    <div className="pt-4 pl-18">
                                        {/* Description on mobile */}
                                        <p className="text-sm text-mist/70 mb-4 md:hidden">{concept.description}</p>

                                        {/* Details list */}
                                        {concept.details && (
                                            <div className="grid md:grid-cols-3 gap-3 mb-4">
                                                {concept.details.map((detail, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-sapphire flex-shrink-0" />
                                                        <span className="text-sm text-mist/80">{detail}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Deep dive link */}
                                        {concept.actionPhrase && (
                                            <button
                                                className="text-sm text-sapphire hover:underline flex items-center gap-1"
                                                onClick={() => handleAction(concept.actionPhrase!)}
                                            >
                                                Learn more about {concept.title}
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

            {/* CTA */}
            {ctaLabel && ctaActionPhrase && (
                <div className="text-center pt-4">
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

export default JourneyConcepts;
