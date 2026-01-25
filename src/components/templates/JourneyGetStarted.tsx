/**
 * JourneyGetStarted - Step 7: GOAL - Get the Repo
 * The final step with prominent CTA, checklist, and channel overview
 * 
 * RICH LAYOUT: Big CTA, benefits checklist, channel visualization, time estimate
 */

import React from 'react';
import {
    Github, Gift, Smartphone, Phone, MessageCircle, Mic, User,
    ArrowRight, ExternalLink, Check, Clock, Zap, Code
} from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Checklist {
    text: string;
    completed?: boolean;
}

interface Channel {
    icon?: 'sms' | 'phone' | 'chat' | 'voice' | 'avatar';
    name: string;
    description?: string;
}

interface JourneyGetStartedProps {
    repoUrl?: string;
    repoLabel?: string;
    headline?: string;
    subheadline?: string;
    timeEstimate?: string;
    checklist?: Checklist[];
    channels?: Channel[];
    nextSteps?: string[];
}

const channelIcons = {
    sms: Smartphone,
    phone: Phone,
    chat: MessageCircle,
    voice: Mic,
    avatar: User,
};

export const JourneyGetStarted: React.FC<JourneyGetStartedProps> = ({
    repoUrl = "https://github.com/nicholasetwaru/mobtemp",
    repoLabel = "Get the Repo",
    headline = "You're Ready to Build",
    subheadline = "Everything you need is in one repo. Clone it, customize it, deploy it.",
    timeEstimate = "3 hours to your first tele",
    checklist = [
        { text: 'Clone the repository', completed: false },
        { text: 'Run npm install && npm run dev', completed: false },
        { text: 'Open http://localhost:3131', completed: false },
        { text: 'Start customizing with wire commands', completed: false },
        { text: 'Publish and go live', completed: false },
    ],
    channels = [
        { icon: 'chat', name: 'Web Chat', description: 'Embed anywhere' },
        { icon: 'sms', name: 'SMS', description: 'Text messaging' },
        { icon: 'phone', name: 'Phone', description: 'Voice calls' },
        { icon: 'voice', name: 'Voice AI', description: 'Hands-free' },
        { icon: 'avatar', name: 'Avatar', description: 'Visual agent' },
    ],
    nextSteps = [
        'Define your goal with /set-goal',
        'Add knowledge with /add-knowledge',
        'Create templates with /add-glass',
        'Deploy with /publish'
    ],
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const handleExternalLink = () => {
        playClick();
        window.open(repoUrl, '_blank');
    };

    return (
        <div className="glass-template-container space-y-8">
            {/* Header */}
            <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-sapphire/20 border border-sapphire/30 rounded-full mb-4">
                    <Clock className="w-4 h-4 text-sapphire" />
                    <span className="text-sm text-sapphire font-medium">{timeEstimate}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{headline}</h2>
                <p className="text-lg text-mist/70 max-w-2xl mx-auto">{subheadline}</p>
            </div>

            {/* PRIMARY CTA */}
            <button
                onClick={handleExternalLink}
                className="w-full p-6 bg-flamingo hover:bg-flamingo/90 rounded-2xl flex items-center justify-center gap-4 transition-all hover:scale-[1.01] shadow-lg shadow-flamingo/20"
            >
                <Github className="w-8 h-8 text-white" />
                <span className="text-2xl font-bold text-white">{repoLabel}</span>
                <ExternalLink className="w-6 h-6 text-white/70" />
            </button>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Quick Start Checklist */}
                <div className="rounded-xl bg-obsidian/40 border border-mist/10 p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Code className="w-5 h-5 text-sapphire" />
                        <h3 className="text-lg font-bold text-white">Quick Start</h3>
                    </div>
                    <div className="space-y-3">
                        {checklist.map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${item.completed
                                        ? 'bg-sapphire text-white'
                                        : 'bg-obsidian/60 border border-mist/20 text-mist/50'
                                    }`}>
                                    {item.completed ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        <span className="text-xs font-bold">{index + 1}</span>
                                    )}
                                </div>
                                <span className={`text-sm ${item.completed ? 'text-mist/50 line-through' : 'text-mist/80'}`}>
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Next Steps */}
                <div className="rounded-xl bg-obsidian/40 border border-mist/10 p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-5 h-5 text-sapphire" />
                        <h3 className="text-lg font-bold text-white">After Cloning</h3>
                    </div>
                    <div className="space-y-3">
                        {nextSteps.map((step, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-obsidian/60 cursor-pointer transition-colors"
                                onClick={() => handleAction(step)}
                            >
                                <ArrowRight className="w-4 h-4 text-sapphire flex-shrink-0" />
                                <span className="text-sm text-mist/80">{step}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Deploy Channels */}
            <div className="rounded-xl bg-obsidian/40 border border-mist/10 p-5">
                <h3 className="text-center text-sm font-semibold text-mist/50 uppercase tracking-wider mb-4">
                    Deploy to Any Channel — One Codebase
                </h3>
                <div className="grid grid-cols-5 gap-4">
                    {channels?.map((channel, index) => {
                        const IconComponent = channelIcons[channel.icon || 'chat'];
                        return (
                            <div key={index} className="text-center">
                                <div className="w-12 h-12 mx-auto rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center mb-2">
                                    <IconComponent className="w-6 h-6 text-sapphire" />
                                </div>
                                <div className="text-sm font-semibold text-white">{channel.name}</div>
                                {channel.description && (
                                    <div className="text-xs text-mist/50">{channel.description}</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default JourneyGetStarted;
