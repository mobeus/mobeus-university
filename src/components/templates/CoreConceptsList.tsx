/**
 * CoreConceptsList
 * Displays all core concepts in a visually rich list format
 * Each concept is clickable to dive deeper into detail
 * 
 * USE WHEN: Showing overview of all core concepts
 * PROPS: { title?, subtitle?, concepts[{ name, summary, icon?, badge?, actionPhrase }] }
 */

import React from 'react';
import {
    ChevronRight,
    Layers,
    Cpu,
    MessageSquare,
    Zap,
    Code,
    Palette,
    BookOpen,
    Sparkles,
    Target,
    Brain,
    Workflow
} from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

const ICON_MAP: Record<string, React.ElementType> = {
    layers: Layers,
    cpu: Cpu,
    message: MessageSquare,
    zap: Zap,
    code: Code,
    palette: Palette,
    book: BookOpen,
    sparkles: Sparkles,
    target: Target,
    brain: Brain,
    workflow: Workflow,
};

interface CoreConcept {
    name: string;
    summary: string;
    icon?: string;
    badge?: string;
    actionPhrase: string;
}

interface CoreConceptsListProps {
    title?: string;
    subtitle?: string;
    concepts?: CoreConcept[];
}

export const CoreConceptsList: React.FC<CoreConceptsListProps> = ({
    title = 'Core Concepts',
    subtitle = 'Master these fundamentals before the hackathon',
    concepts = [],
}) => {
    const { playClick } = useSound();

    const handleConceptClick = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    if (!concepts || concepts.length === 0) {
        return null;
    }

    return (
        <div className="glass-template-container">
            {/* Header */}
            <div className="mb-8 text-center">
                <h2 className="text-template-title text-3xl mb-3">{title}</h2>
                {subtitle && (
                    <p className="text-template-content text-lg opacity-80">{subtitle}</p>
                )}
            </div>

            {/* Concepts List */}
            <div className="space-y-4">
                {concepts.map((concept, index) => {
                    const IconComponent = concept.icon
                        ? ICON_MAP[concept.icon.toLowerCase()] || Sparkles
                        : Sparkles;

                    // Alternate accent colors for visual variety
                    const accentColors = [
                        { bg: 'bg-sapphire/20', text: 'text-sapphire', border: 'border-sapphire/30' },
                        { bg: 'bg-flamingo/20', text: 'text-flamingo', border: 'border-flamingo/30' },
                        { bg: 'bg-jade/20', text: 'text-jade', border: 'border-jade/30' },
                        { bg: 'bg-turmeric/20', text: 'text-turmeric', border: 'border-turmeric/30' },
                        { bg: 'bg-wave/20', text: 'text-wave', border: 'border-wave/30' },
                    ];
                    const accent = accentColors[index % accentColors.length];

                    return (
                        <div
                            key={index}
                            className="glass-card-standard glass-card-clickable group p-5 flex items-center gap-5"
                            onClick={() => handleConceptClick(concept.actionPhrase)}
                        >
                            {/* Number + Icon */}
                            <div className="flex items-center gap-4 flex-shrink-0">
                                <div className={`w-10 h-10 rounded-full ${accent.bg} border ${accent.border} flex items-center justify-center`}>
                                    <span className={`${accent.text} font-bold text-lg`}>{index + 1}</span>
                                </div>
                                <div className={`w-14 h-14 rounded-xl ${accent.bg} flex items-center justify-center`}>
                                    <IconComponent className={`w-7 h-7 ${accent.text}`} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className={`text-mist font-bold text-xl group-hover:${accent.text} transition-colors`}>
                                        {concept.name}
                                    </h3>
                                    {concept.badge && (
                                        <span className={`px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded ${accent.bg} ${accent.text} border ${accent.border}`}>
                                            {concept.badge}
                                        </span>
                                    )}
                                </div>
                                <p className="text-mist/70 text-base line-clamp-2">{concept.summary}</p>
                            </div>

                            {/* Arrow */}
                            <div className={`flex-shrink-0 ${accent.text} opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all`}>
                                <ChevronRight className="w-6 h-6" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CoreConceptsList;
