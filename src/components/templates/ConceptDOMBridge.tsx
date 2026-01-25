/**
 * ConceptDOMBridge - Explains navigateToSection
 * The function that connects UI to AI
 * 
 * HIERARCHY: Glance (the bridge) → Look (code example) → Read (signature)
 */

import React from 'react';
import { Link, ArrowRight, Code, Cpu, Monitor } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ConceptDOMBridgeProps {
    definition?: string;
    codeExample?: string;
    keyPoints?: Array<{
        icon?: 'code' | 'cpu' | 'monitor';
        title: string;
        description: string;
    }>;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const iconMap = {
    code: Code,
    cpu: Cpu,
    monitor: Monitor,
};

export const ConceptDOMBridge: React.FC<ConceptDOMBridgeProps> = ({
    definition = "When the Runtime Agent wants to display content, it calls navigateToSection(). This function takes JSON data and renders the corresponding React templates.",
    codeExample = `navigateToSection({
  badge: "TUTORIAL",
  title: "Getting Started",
  generativeSubsections: [{
    id: "intro",
    templateId: "JourneyPromise",
    props: { pillars: [...] }
  }]
})`,
    keyPoints = [
        { icon: 'cpu', title: 'AI Calls It', description: 'Runtime Agent invokes navigateToSection with JSON' },
        { icon: 'code', title: 'JSON to Props', description: 'Badge, title, and generativeSubsections define content' },
        { icon: 'monitor', title: 'Templates Render', description: 'React components display the visual content' },
    ],
    ctaLabel = "Learn About Templates",
    ctaActionPhrase = "Explain templates",
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            {/* Definition */}
            <div className="p-6 rounded-xl bg-jade/10 border border-jade/20 mb-8">
                <p className="text-lg text-mist/80 leading-relaxed">
                    {definition}
                </p>
            </div>
            <div className="p-6 rounded-xl bg-jade/10 border border-jade/20 mb-8">
                <p className="text-lg text-mist/80 leading-relaxed">
                    {definition}
                </p>
            </div>

            {/* LOOK LEVEL: Code Example */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                    <Code className="w-4 h-4 text-jade" />
                    <span className="text-sm text-jade font-medium uppercase tracking-wide">Example Call</span>
                </div>
                <div className="rounded-xl bg-obsidian border border-mist/10 overflow-hidden">
                    <div className="p-4 border-b border-mist/10 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-coral/50" />
                        <div className="w-3 h-3 rounded-full bg-turmeric/50" />
                        <div className="w-3 h-3 rounded-full bg-jade/50" />
                        <span className="ml-2 text-xs text-mist/40 font-mono">navigateToSection.ts</span>
                    </div>
                    <pre className="p-4 overflow-x-auto">
                        <code className="text-sm font-mono text-mist/70 leading-relaxed">
                            {codeExample}
                        </code>
                    </pre>
                </div>
            </div>

            {/* Key Points */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
                {keyPoints?.map((point, index) => {
                    const IconComponent = iconMap[point.icon || 'code'];
                    return (
                        <div key={index} className="p-5 rounded-xl bg-obsidian/30 border border-mist/10">
                            <IconComponent className="w-8 h-8 text-jade mb-3" />
                            <h3 className="text-lg font-bold text-white mb-2">{point.title}</h3>
                            <p className="text-sm text-mist/60">{point.description}</p>
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

export default ConceptDOMBridge;
