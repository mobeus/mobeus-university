/**
 * ConceptDualAgent - Explains the Two-Agent Architecture
 * Build Agent (Claude) + Runtime Agent (Catherine)
 * 
 * HIERARCHY: Glance (two agents) → Look (diagram) → Read (how they work)
 */

import React from 'react';
import { Hammer, Zap, ArrowRight, ArrowLeftRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface Agent {
    icon?: 'hammer' | 'zap';
    name: string;
    role: string;
    description: string;
    capabilities?: string[];
    color: 'sapphire' | 'flamingo';
}

interface ConceptDualAgentProps {
    imageUrl?: string;
    imagePrompt?: string;
    buildAgent?: Agent;
    runtimeAgent?: Agent;
    bridgeDescription?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const ConceptDualAgent: React.FC<ConceptDualAgentProps> = ({
    imageUrl = "/assets/two-agent-architecture.png",
    imagePrompt,
    buildAgent = {
        icon: 'hammer',
        name: 'Claude',
        role: 'Build Agent',
        description: 'Creates your tele during development. Writes code, templates, knowledge.',
        capabilities: ['Writes React components', 'Creates shot prompts', 'Generates knowledge'],
        color: 'sapphire',
    },
    runtimeAgent = {
        icon: 'zap',
        name: 'Catherine',
        role: 'Runtime Agent',
        description: 'Runs your tele in production. Talks to users, shows templates.',
        capabilities: ['Responds to users', 'Calls navigateToSection', 'Displays templates'],
        color: 'flamingo',
    },
    bridgeDescription = "They share files: tele-knowledge.md and glass-prompt.md",
    ctaLabel = "Learn About the DOM Bridge",
    ctaActionPhrase = "Explain the DOM bridge",
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const renderAgent = (agent: Agent, isLeft: boolean) => {
        const colorClasses = agent.color === 'sapphire'
            ? 'bg-sapphire/15 border-sapphire/30 text-sapphire'
            : 'bg-flamingo/15 border-flamingo/30 text-flamingo';
        const iconBg = agent.color === 'sapphire' ? 'bg-sapphire/30' : 'bg-flamingo/30';
        const IconComponent = agent.icon === 'hammer' ? Hammer : Zap;

        return (
            <div className={`rounded-2xl border p-6 ${colorClasses}`}>
                <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center`}>
                        <IconComponent className={`w-7 h-7 ${agent.color === 'sapphire' ? 'text-sapphire' : 'text-flamingo'}`} />
                    </div>
                    <div>
                        <p className={`text-sm font-medium uppercase tracking-wide ${agent.color === 'sapphire' ? 'text-sapphire' : 'text-flamingo'}`}>
                            {agent.role}
                        </p>
                        <h3 className="text-2xl font-bold text-white">{agent.name}</h3>
                    </div>
                </div>

                <p className="text-mist/70 mb-4 leading-relaxed">
                    {agent.description}
                </p>

                {agent.capabilities && (
                    <ul className="space-y-2">
                        {agent.capabilities.map((cap, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-mist/60">
                                <div className={`w-1.5 h-1.5 rounded-full ${agent.color === 'sapphire' ? 'bg-sapphire' : 'bg-flamingo'}`} />
                                {cap}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };

    return (
        <div className="glass-template-container">
            {/* Two Agents */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                {renderAgent(buildAgent, true)}
                {renderAgent(runtimeAgent, false)}
            </div>

            {/* Bridge */}
            <div className="flex items-center justify-center gap-4 p-4 rounded-xl bg-obsidian/30 border border-mist/10 mb-6">
                <ArrowLeftRight className="w-5 h-5 text-jade" />
                <span className="text-mist/70">{bridgeDescription}</span>
            </div>

            {/* Image */}
            {(imageUrl || imagePrompt) && (
                <div className="rounded-2xl overflow-hidden mb-8 border border-mist/10">
                    <SmartImage
                        assetId={imageUrl || imagePrompt || ''}
                        alt="Two Agent Architecture"
                        className="w-full h-auto"
                    />
                </div>
            )}

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

export default ConceptDualAgent;
