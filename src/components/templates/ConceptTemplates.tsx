/**
 * ConceptTemplates - Explains what Templates are
 * Visual components the tele can display
 * 
 * HIERARCHY: Glance (what they are) → Look (examples) → Read (how to create)
 */

import React from 'react';
import { Layout, Palette, ArrowRight, Code, Eye } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface TemplateExample {
    name: string;
    category: string;
    description: string;
    actionPhrase?: string;
}

interface ConceptTemplatesProps {
    definition?: string;
    examples?: TemplateExample[];
    howToCreate?: string[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const categoryColors: Record<string, string> = {
    journey: 'bg-flamingo/15 border-flamingo/30 text-flamingo',
    concept: 'bg-sapphire/15 border-sapphire/30 text-sapphire',
    wire: 'bg-turmeric/15 border-turmeric/30 text-turmeric',
    utility: 'bg-jade/15 border-jade/30 text-jade',
};

export const ConceptTemplates: React.FC<ConceptTemplatesProps> = ({
    definition = "Templates are React components that the Runtime Agent renders when it calls navigateToSection. Each template has props for customization and actionPhrase handlers for volumetric navigation.",
    examples = [
        { name: 'JourneyPromise', category: 'journey', description: 'Shows the main promise with pillars', actionPhrase: 'What can I build' },
        { name: 'ConceptDualAgent', category: 'concept', description: 'Explains two-agent architecture', actionPhrase: 'Explain dual agent architecture' },
        { name: 'WireCommandDetail', category: 'wire', description: 'Deep dive on any wire command', actionPhrase: 'Tell me about add-glass' },
        { name: 'FeatureGrid', category: 'utility', description: 'Reusable feature grid', actionPhrase: 'Show me features' },
    ],
    howToCreate = [
        'Type /add-glass in your IDE',
        'Describe the template you want',
        'Claude creates the React component',
        'Template is registered automatically',
    ],
    ctaLabel = "Learn Volumetric Navigation",
    ctaActionPhrase = "Explain volumetric navigation",
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            {/* Definition */}
            <div className="p-6 rounded-xl bg-flamingo/10 border border-flamingo/20 mb-8">
                <p className="text-lg text-mist/80 leading-relaxed">
                    {definition}
                </p>
            </div>

            {/* LOOK LEVEL: Template Examples */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Eye className="w-4 h-4 text-flamingo" />
                    <span className="text-sm text-flamingo font-medium uppercase tracking-wide">Example Templates</span>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                    {examples?.map((example, index) => {
                        const colorClass = categoryColors[example.category] || categoryColors.utility;
                        return (
                            <div
                                key={index}
                                className={`p-4 rounded-xl border cursor-pointer hover:scale-[1.02] transition-all ${colorClass}`}
                                onClick={() => example.actionPhrase && handleAction(example.actionPhrase)}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <code className="text-sm font-mono font-bold text-white">{example.name}</code>
                                    <span className="text-xs uppercase tracking-wide opacity-60">{example.category}</span>
                                </div>
                                <p className="text-sm text-mist/60">{example.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* How to Create */}
            <div className="p-6 rounded-xl bg-obsidian/30 border border-mist/10 mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Palette className="w-4 h-4 text-turmeric" />
                    <span className="text-sm text-turmeric font-medium uppercase tracking-wide">How to Create Templates</span>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                    {howToCreate?.map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-turmeric/30 flex items-center justify-center flex-shrink-0 text-xs font-bold text-turmeric">
                                {index + 1}
                            </div>
                            <p className="text-sm text-mist/70">{step}</p>
                        </div>
                    ))}
                </div>
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

export default ConceptTemplates;
