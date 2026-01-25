/**
 * JourneyPromise - Step 1: The Promise
 * Shows what users can build in 3 hours
 * 
 * HIERARCHY: Glance (big promise) → Look (3 pillars) → Read (details)
 */

import React from 'react';
import { Rocket, Clock, Sparkles, Users } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface JourneyPromiseProps {
    imageUrl?: string;
    imagePrompt?: string;
    // Infographic content (shown when no image)
    statNumber?: string;
    statLabel?: string;
    description?: string;
    quote?: string;
    quoteAuthor?: string;
    pillars?: Array<{
        icon?: 'rocket' | 'clock' | 'sparkles' | 'users';
        title: string;
        description: string;
        actionPhrase?: string;
    }>;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const iconMap = {
    rocket: Rocket,
    clock: Clock,
    sparkles: Sparkles,
    users: Users,
};

export const JourneyPromise: React.FC<JourneyPromiseProps> = ({
    imageUrl,
    imagePrompt,
    statNumber = "3",
    statLabel = "Hours",
    description = "Build a conversational product that talks to your users, shows them content, and guides them to a goal. No deep coding required.",
    quote = "The best interface for AI is conversation plus visuals.",
    quoteAuthor = "Mobeus Team",
    pillars = [
        { icon: 'clock', title: '3 Hours', description: 'From zero to deployed', actionPhrase: 'How do I build it' },
        { icon: 'sparkles', title: 'No Deep Coding', description: 'Speak it or type it', actionPhrase: 'How do I build it' },
        { icon: 'rocket', title: 'Real Product', description: 'Not a demo — deploy it', actionPhrase: 'How do I start' },
    ],
    ctaLabel = "Show Me How",
    ctaActionPhrase = "How do I build it",
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            {/* LOOK LEVEL: Visual + Pillars */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Left Side - Infographic or Image */}
                <div className="relative rounded-2xl overflow-hidden bg-obsidian/50 aspect-video flex flex-col justify-center p-8">
                    {(imageUrl || imagePrompt) ? (
                        <SmartImage
                            assetId={imageUrl || imagePrompt || ''}
                            alt="Build a tele"
                            className="w-full h-full object-cover absolute inset-0"
                        />
                    ) : (
                        <div className="relative z-10 space-y-6">
                            {/* Big Stat */}
                            <div>
                                <span className="text-6xl md:text-7xl font-bold text-flamingo">{statNumber}</span>
                                <span className="text-3xl md:text-4xl font-bold text-white ml-2">{statLabel}</span>
                            </div>

                            {/* Description */}
                            <p className="text-lg text-mist/80 leading-relaxed max-w-md">
                                {description}
                            </p>

                            {/* Quote */}
                            <blockquote className="border-l-4 border-flamingo/50 pl-4">
                                <p className="text-mist/70 italic">
                                    "{quote}"
                                </p>
                                <cite className="text-sm text-mist/50 mt-2 block">— {quoteAuthor}</cite>
                            </blockquote>
                        </div>
                    )}
                </div>

                {/* Pillars */}
                <div className="flex flex-col justify-center gap-4">
                    {pillars?.map((pillar, index) => {
                        const IconComponent = iconMap[pillar.icon || 'sparkles'];
                        return (
                            <div
                                key={index}
                                className="flex items-start gap-4 p-4 rounded-xl bg-obsidian/30 border border-mist/10 cursor-pointer hover:border-flamingo/30 hover:bg-obsidian/50 transition-all"
                                onClick={() => pillar.actionPhrase && handleAction(pillar.actionPhrase)}
                            >
                                <div className="w-12 h-12 rounded-xl bg-flamingo/20 flex items-center justify-center flex-shrink-0">
                                    <IconComponent className="w-6 h-6 text-flamingo" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">{pillar.title}</h3>
                                    <p className="text-sm text-mist/60">{pillar.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* READ LEVEL: CTA */}
            {ctaLabel && ctaActionPhrase && (
                <div className="text-center">
                    <button
                        className="px-8 py-4 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all text-lg"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                    </button>
                </div>
            )}
        </div>
    );
};

export default JourneyPromise;
