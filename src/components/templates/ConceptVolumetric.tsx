/**
 * ConceptVolumetric - Explains Volumetric Navigation
 * Every click is a conversation
 * 
 * HIERARCHY: Glance (the concept) → Look (before/after) → Read (code pattern)
 */

import React from 'react';
import { MousePointer, ArrowRight, X, Check, MessageCircle } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Comparison {
    type: 'bad' | 'good';
    title: string;
    description: string;
    example?: string;
}

interface ConceptVolumetricProps {
    definition?: string;
    comparisons?: Comparison[];
    codePattern?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const ConceptVolumetric: React.FC<ConceptVolumetricProps> = ({
    definition = "In a tele, clicks aren't just navigation — they're speech. When a user clicks an element with an actionPhrase, it's like they said those words to the tele.",
    comparisons = [
        { type: 'bad', title: 'Traditional Web', description: 'Click goes to a URL. Dead end. User has to figure out what to do next.', example: '<a href="/pricing">See Pricing</a>' },
        { type: 'good', title: 'Volumetric', description: 'Click sends message to tele. Tele responds with content + guidance.', example: 'onClick={() => notifyTele("Show me pricing")}' },
    ],
    codePattern = `const handleAction = (actionPhrase: string) => {
  playClick();           // Sound feedback
  notifyTele(actionPhrase); // Tell tele what user "said"
};

<div onClick={() => handleAction("Show pricing")}>
  See Pricing
</div>`,
    ctaLabel = "Start Building",
    ctaActionPhrase = "How do I start",
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            {/* Definition */}
            <div className="p-6 rounded-xl bg-turmeric/10 border border-turmeric/20 mb-8">
                <p className="text-lg text-mist/80 leading-relaxed">
                    {definition}
                </p>
            </div>

            {/* LOOK LEVEL: Comparison */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {comparisons?.map((comp, index) => {
                    const isBad = comp.type === 'bad';
                    const colorClasses = isBad
                        ? 'bg-coral/10 border-coral/30'
                        : 'bg-jade/10 border-jade/30';
                    const iconColor = isBad ? 'text-coral' : 'text-jade';
                    const Icon = isBad ? X : Check;

                    return (
                        <div key={index} className={`p-6 rounded-xl border ${colorClasses}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isBad ? 'bg-coral/20' : 'bg-jade/20'}`}>
                                    <Icon className={`w-5 h-5 ${iconColor}`} />
                                </div>
                                <h3 className="text-xl font-bold text-white">{comp.title}</h3>
                            </div>
                            <p className="text-mist/70 mb-4">{comp.description}</p>
                            {comp.example && (
                                <code className="text-xs font-mono text-mist/50 bg-obsidian/50 px-3 py-2 rounded block overflow-x-auto">
                                    {comp.example}
                                </code>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Code Pattern */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="w-4 h-4 text-jade" />
                    <span className="text-sm text-jade font-medium uppercase tracking-wide">The Pattern</span>
                </div>
                <div className="rounded-xl bg-obsidian border border-mist/10 overflow-hidden">
                    <div className="p-4 border-b border-mist/10 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-coral/50" />
                        <div className="w-3 h-3 rounded-full bg-turmeric/50" />
                        <div className="w-3 h-3 rounded-full bg-jade/50" />
                        <span className="ml-2 text-xs text-mist/40 font-mono">volumetric-pattern.tsx</span>
                    </div>
                    <pre className="p-4 overflow-x-auto">
                        <code className="text-sm font-mono text-mist/70 leading-relaxed whitespace-pre">
                            {codePattern}
                        </code>
                    </pre>
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

export default ConceptVolumetric;
