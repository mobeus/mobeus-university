/**
 * JourneyBuildModes - Step 2: How to Build
 * Shows Voice Coding + Vibe Coding with rich comparison
 * 
 * RICH LAYOUT: Visual comparison, code examples, detailed steps
 */

import React from 'react';
import { Mic, Keyboard, ArrowRight, Check, Zap, Code } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface BuildMode {
    icon?: 'mic' | 'keyboard';
    title: string;
    tagline: string;
    description: string;
    steps?: string[];
    benefits?: string[];
    exampleCommand?: string;
    actionPhrase?: string;
}

interface JourneyBuildModesProps {
    modes?: BuildMode[];
    comparisonNote?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const iconMap = {
    mic: Mic,
    keyboard: Keyboard,
};

export const JourneyBuildModes: React.FC<JourneyBuildModesProps> = ({
    modes = [
        {
            icon: 'mic',
            title: 'Voice Coding',
            tagline: 'Speak It Into Existence',
            description: 'Enter admin mode and speak naturally. Teach your tele facts, rules, and behaviors in real-time.',
            steps: [
                'Say "I am the admin"',
                'Speak facts: "Our enterprise plan costs $99/month"',
                'Define rules: "When asked about pricing, show the pricing table"',
                'Exit: "Exit admin mode"'
            ],
            benefits: ['No typing required', 'Natural language', 'Instant learning'],
            exampleCommand: '"I am the admin... Our company was founded in 2021..."',
            actionPhrase: 'Tell me about voice coding',
        },
        {
            icon: 'keyboard',
            title: 'Vibe Coding',
            tagline: 'Describe It, Claude Builds It',
            description: 'Use wire commands in your IDE. Describe what you want, Claude generates the code.',
            steps: [
                'Type a wire command like /add-glass',
                'Describe: "A pricing table with 3 tiers"',
                'Claude generates the React component',
                'Refine with follow-up requests'
            ],
            benefits: ['Full control', 'Version controlled', 'Complex features'],
            exampleCommand: '/add-glass a comparison table showing build modes',
            actionPhrase: 'Tell me about vibe coding',
        },
    ],
    comparisonNote = "Use both together. Voice coding for quick knowledge. Vibe coding for complex templates.",
    ctaLabel = "Learn Core Concepts",
    ctaActionPhrase = "Show me the core concepts",
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container space-y-6">
            {/* Two Modes Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {modes?.map((mode, index) => {
                    const IconComponent = iconMap[mode.icon || 'mic'];

                    return (
                        <div
                            key={index}
                            className="rounded-xl bg-obsidian/40 border border-mist/10 overflow-hidden hover:border-sapphire/30 transition-all"
                        >
                            {/* Header */}
                            <div
                                className="p-6 cursor-pointer hover:bg-obsidian/60 transition-colors"
                                onClick={() => mode.actionPhrase && handleAction(mode.actionPhrase)}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                                        <IconComponent className="w-7 h-7 text-sapphire" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-sapphire uppercase tracking-wide">{mode.tagline}</p>
                                        <h3 className="text-xl font-bold text-white">{mode.title}</h3>
                                    </div>
                                </div>

                                <p className="text-sm text-mist/70 leading-relaxed mb-6">
                                    {mode.description}
                                </p>

                                {/* Steps */}
                                {mode.steps && (
                                    <div className="space-y-3 mb-6">
                                        {mode.steps.map((step, stepIndex) => (
                                            <div key={stepIndex} className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full bg-sapphire/20 border border-sapphire/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <span className="text-xs font-bold text-sapphire">{stepIndex + 1}</span>
                                                </div>
                                                <span className="text-sm text-mist/80">{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Example Command */}
                                {mode.exampleCommand && (
                                    <div className="p-3 rounded-lg bg-obsidian/60 border border-mist/10 mb-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Code className="w-3 h-3 text-mist/50" />
                                            <span className="text-xs text-mist/50">Example</span>
                                        </div>
                                        <code className="text-sm text-sapphire font-mono">{mode.exampleCommand}</code>
                                    </div>
                                )}

                                {/* Benefits */}
                                {mode.benefits && (
                                    <div className="flex flex-wrap gap-2">
                                        {mode.benefits.map((benefit, i) => (
                                            <span
                                                key={i}
                                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sapphire/10 border border-sapphire/20 text-xs text-sapphire"
                                            >
                                                <Check className="w-3 h-3" />
                                                {benefit}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Comparison Note */}
            {comparisonNote && (
                <div className="p-4 rounded-xl bg-sapphire/10 border border-sapphire/20 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <Zap className="w-4 h-4 text-sapphire" />
                        <span className="text-sm font-semibold text-sapphire">Pro Tip</span>
                    </div>
                    <p className="text-sm text-mist/80">{comparisonNote}</p>
                </div>
            )}

            {/* CTA */}
            {ctaLabel && ctaActionPhrase && (
                <div className="text-center pt-2">
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

export default JourneyBuildModes;
