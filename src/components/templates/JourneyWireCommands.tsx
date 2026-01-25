/**
 * JourneyWireCommands - Step 4: Wire Commands
 * Shows the 5 wire commands with visual explanation
 * 
 * HIERARCHY: Glance (command icons) → Look (what each does) → Read (examples)
 */

import React from 'react';
import { Palette, Brain, MessageSquare, Plug, Upload, ArrowRight, Terminal, Target, Route, Search, FileText } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface WireCommand {
    icon?: 'palette' | 'brain' | 'message' | 'plug' | 'upload' | 'target' | 'route' | 'search' | 'file';
    command: string;
    name: string;
    description: string;
    example?: string;
    actionPhrase?: string;
}

interface JourneyWireCommandsProps {
    commands?: WireCommand[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const iconMap = {
    palette: Palette,
    brain: Brain,
    message: MessageSquare,
    plug: Plug,
    upload: Upload,
    target: Target,
    route: Route,
    search: Search,
    file: FileText,
};

export const JourneyWireCommands: React.FC<JourneyWireCommandsProps> = ({
    commands = [
        { icon: 'target', command: '/set-goal', name: 'Define Goal', description: 'Set the singular outcome', example: '/set-goal book a demo', actionPhrase: 'Tell me about set-goal' },
        { icon: 'route', command: '/set-journey', name: 'Define Journey', description: 'Order the 7 steps', example: '/set-journey learn then buy', actionPhrase: 'Tell me about set-journey' },
        { icon: 'palette', command: '/add-glass', name: 'Create Templates', description: 'Build visual components', example: '/add-glass a pricing table', actionPhrase: 'Tell me about add-glass' },
        { icon: 'brain', command: '/add-knowledge', name: 'Teach Facts', description: 'Add domain knowledge', example: '/add-knowledge our pricing tiers', actionPhrase: 'Tell me about add-knowledge' },
        { icon: 'message', command: '/tele-should', name: 'Define Responses', description: 'Create shot prompts', example: '/tele-should greet new users', actionPhrase: 'Tell me about tele-should' },
        { icon: 'plug', command: '/create-site-function', name: 'Add Capabilities', description: 'Extend the runtime', example: '/create-site-function API call', actionPhrase: 'Tell me about create-site-function' },
        { icon: 'search', command: '/audit-tele', name: 'Quality Check', description: 'Check alignment and issues', example: '/audit-tele', actionPhrase: 'Tell me about audit-tele' },
        { icon: 'file', command: '/document-tele', name: 'Generate Docs', description: 'Create documentation', example: '/document-tele', actionPhrase: 'Tell me about document-tele' },
        { icon: 'upload', command: '/publish', name: 'Deploy', description: 'Go live instantly', example: '/publish', actionPhrase: 'Tell me about publish' },
    ],
    ctaLabel = "See Anatomy of a Tele",
    ctaActionPhrase = "Show me the anatomy of a tele",
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            {/* Command Cards - Clean, consistent styling */}
            <div className="space-y-2 mb-8">
                {commands?.map((cmd, index) => {
                    const IconComponent = iconMap[cmd.icon || 'palette'];

                    return (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-4 rounded-xl bg-obsidian/40 border border-mist/10 cursor-pointer hover:bg-obsidian/60 hover:border-sapphire/30 transition-all"
                            onClick={() => cmd.actionPhrase && handleAction(cmd.actionPhrase)}
                        >
                            {/* Icon */}
                            <div className="w-10 h-10 rounded-lg bg-sapphire/20 border border-sapphire/30 flex items-center justify-center flex-shrink-0">
                                <IconComponent className="w-5 h-5 text-sapphire" />
                            </div>

                            {/* Command Name */}
                            <div className="flex-shrink-0 w-44">
                                <code className="text-base font-mono font-bold text-white">{cmd.command}</code>
                                <p className="text-xs text-mist/50">{cmd.name}</p>
                            </div>

                            {/* Description */}
                            <div className="flex-1 hidden md:block">
                                <p className="text-sm text-mist/70">{cmd.description}</p>
                            </div>

                            {/* Example */}
                            {cmd.example && (
                                <div className="hidden lg:block flex-shrink-0">
                                    <code className="text-xs text-mist/40 bg-obsidian/50 px-3 py-1 rounded font-mono">
                                        {cmd.example}
                                    </code>
                                </div>
                            )}

                            {/* Arrow */}
                            <ArrowRight className="w-4 h-4 text-sapphire flex-shrink-0" />
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

export default JourneyWireCommands;
