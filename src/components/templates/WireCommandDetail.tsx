/**
 * WireCommandDetail - Unified template for ALL wire commands
 * Shows any wire command with consistent layout
 * 
 * HIERARCHY: Glance (command name) → Look (what it does) → Read (example)
 */

import React from 'react';
import {
    Palette, Brain, MessageSquare, Plug, Upload,
    ArrowRight, CheckCircle, Code, Terminal
} from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface WireCommandDetailProps {
    command: '/add-glass' | '/add-knowledge' | '/tele-should' | '/create-site-function' | '/publish';
    headline?: string;
    tagline?: string;
    description?: string;
    whatItCreates?: Array<{
        title: string;
        description: string;
    }>;
    exampleCommand?: string;
    exampleResult?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const commandConfig = {
    '/add-glass': {
        icon: Palette,
        color: 'flamingo',
        defaultTagline: 'Create Visual Templates',
        defaultDescription: 'Type the command and describe what you want. Claude creates the complete React component and registers it automatically.',
        defaultWhatItCreates: [
            { title: 'React Component', description: 'Full .tsx file with props interface' },
            { title: 'CSS Classes', description: 'Styling using centralized classes' },
            { title: 'Registry Entry', description: 'Auto-registered in templateRegistry.ts' },
        ],
        defaultExample: '/add-glass a pricing comparison table',
        defaultResult: 'Creates PricingTable.tsx with all props and volumetric navigation',
    },
    '/add-knowledge': {
        icon: Brain,
        color: 'sapphire',
        defaultTagline: 'Teach Facts to Your Tele',
        defaultDescription: 'Add domain knowledge that your tele can reference. Facts, terminology, how to speak about topics.',
        defaultWhatItCreates: [
            { title: 'Domain Facts', description: 'Information about your product or topic' },
            { title: 'Terminology', description: 'How to define and explain key terms' },
            { title: 'Response Patterns', description: 'How to speak about topics naturally' },
        ],
        defaultExample: '/add-knowledge our product has 3 pricing tiers',
        defaultResult: 'Adds pricing structure to tele-knowledge.md',
    },
    '/tele-should': {
        icon: MessageSquare,
        color: 'turmeric',
        defaultTagline: 'Define Response Patterns',
        defaultDescription: 'Create shot prompts that map user intents to visual responses. When user says X, tele shows Y.',
        defaultWhatItCreates: [
            { title: 'USER Triggers', description: 'What the user might say' },
            { title: 'navigateToSection', description: 'JSON that renders templates' },
            { title: 'TELE SAYS', description: 'Natural language response' },
        ],
        defaultExample: '/tele-should greet new users warmly',
        defaultResult: 'Creates shot prompt with template and natural greeting',
    },
    '/create-site-function': {
        icon: Plug,
        color: 'jade',
        defaultTagline: 'Extend Tele Capabilities',
        defaultDescription: 'Create new functions the Runtime Agent can call. API integrations, custom actions, external services.',
        defaultWhatItCreates: [
            { title: 'Bridge in index.html', description: 'registerUIFrameworkSiteFunctions()' },
            { title: 'Implementation', description: 'Function in teleNavigation object' },
            { title: 'Auto-Discovery', description: 'Backend discovers on connect' },
        ],
        defaultExample: '/create-site-function to fetch live pricing',
        defaultResult: 'Creates bridge + implementation + auto-discovery',
    },
    '/publish': {
        icon: Upload,
        color: 'coral',
        defaultTagline: 'Deploy Instantly',
        defaultDescription: 'Sync your changes to production. Knowledge and prompts go live immediately.',
        defaultWhatItCreates: [
            { title: 'Compare', description: 'Hash-based detection of changes' },
            { title: 'Upload', description: 'Posts to Mobeus backend' },
            { title: 'Live', description: 'Changes active immediately' },
        ],
        defaultExample: '/publish',
        defaultResult: 'tele-knowledge.md and glass-prompt.md synced to production',
    },
};

const colorClasses = {
    flamingo: { bg: 'bg-flamingo/15', border: 'border-flamingo/30', text: 'text-flamingo', iconBg: 'bg-flamingo/30' },
    sapphire: { bg: 'bg-sapphire/15', border: 'border-sapphire/30', text: 'text-sapphire', iconBg: 'bg-sapphire/30' },
    turmeric: { bg: 'bg-turmeric/15', border: 'border-turmeric/30', text: 'text-turmeric', iconBg: 'bg-turmeric/30' },
    jade: { bg: 'bg-jade/15', border: 'border-jade/30', text: 'text-jade', iconBg: 'bg-jade/30' },
    coral: { bg: 'bg-coral/15', border: 'border-coral/30', text: 'text-coral', iconBg: 'bg-coral/30' },
};

export const WireCommandDetail: React.FC<WireCommandDetailProps> = ({
    command,
    headline,
    tagline,
    description,
    whatItCreates,
    exampleCommand,
    exampleResult,
    ctaLabel = "Where would you like to go?",
    ctaActionPhrase = "Go home",
}) => {
    const { playClick } = useSound();
    const config = commandConfig[command];
    const colors = colorClasses[config.color as keyof typeof colorClasses];
    const IconComponent = config.icon;

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const items = whatItCreates || config.defaultWhatItCreates;
    const example = exampleCommand || config.defaultExample;
    const result = exampleResult || config.defaultResult;

    return (
        <div className="glass-template-container">
            {/* What It Creates/Does */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
                {items.map((item, index) => (
                    <div key={index} className={`p-5 rounded-xl ${colors.bg} border ${colors.border}`}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center text-white font-bold text-sm`}>
                                {index + 1}
                            </div>
                            <h3 className="text-lg font-bold text-white">{item.title}</h3>
                        </div>
                        <p className="text-sm text-mist/60">{item.description}</p>
                    </div>
                ))}
            </div>

            {/* READ LEVEL: Example */}
            <div className="p-6 rounded-xl bg-obsidian/50 border border-mist/10 mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Terminal className="w-5 h-5 text-jade" />
                    <span className="text-sm text-jade font-medium uppercase tracking-wide">Example</span>
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-xs text-mist/40 uppercase mb-1">You type:</p>
                        <code className={`text-lg font-mono ${colors.text}`}>{example}</code>
                    </div>
                    <div className="border-t border-mist/10 pt-4">
                        <p className="text-xs text-mist/40 uppercase mb-1">Result:</p>
                        <p className="text-mist/70">{result}</p>
                    </div>
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

export default WireCommandDetail;
