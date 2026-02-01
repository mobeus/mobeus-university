/**
 * Guide - GENERIC
 * Mode cards with examples and command reference
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, Terminal } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Mode {
    icon?: string;
    title: string;
    description: string;
    variant?: 'default' | 'accent';
    examples?: string[];
}

interface Command {
    cmd: string;
    desc: string;
}

interface GuideProps {
    modes?: Mode[];
    commandsLabel?: string;
    commands?: Command[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Guide: React.FC<GuideProps> = ({
    modes,
    commandsLabel,
    commands,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">

            {modes && modes.length > 0 && (
                <div className={`grid gap-6 mb-8 ${modes.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                    {modes.map((mode, index) => {
                        const IconComp = getIcon(mode.icon);
                        const isAccent = mode.variant === 'accent';

                        return (
                            <div
                                key={index}
                                className={`p-8 rounded-2xl flex flex-col
                                    ${isAccent
                                        ? 'bg-gradient-to-b from-flamingo/10 to-flamingo/5 border border-flamingo/20'
                                        : 'bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06]'
                                    }`}
                            >
                                <div className="flex items-center gap-4 mb-5">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center
                                        ${isAccent
                                            ? 'bg-flamingo/15 border border-flamingo/25'
                                            : 'bg-sapphire/10 border border-sapphire/20'
                                        }`}>
                                        <IconComp className={`w-7 h-7 ${isAccent ? 'text-flamingo' : 'text-sapphire'}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{mode.title}</h3>
                                </div>

                                <p className="text-mist/60 leading-relaxed mb-5">{mode.description}</p>

                                {mode.examples && mode.examples.length > 0 && (
                                    <div className="space-y-2 mt-auto pt-5 border-t border-white/[0.05]">
                                        <p className="text-xs text-mist/40 uppercase tracking-wider font-medium mb-3">Examples</p>
                                        {mode.examples.map((ex, i) => (
                                            <div key={i} className={`px-4 py-2 rounded-lg text-sm
                                                ${isAccent ? 'bg-flamingo/10 text-flamingo/80' : 'bg-sapphire/10 text-sapphire/80'}`}>
                                                "{ex}"
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {commands && commands.length > 0 && (
                <div className="flex-grow">
                    {commandsLabel && (
                        <div className="flex items-center gap-3 mb-5">
                            <Terminal className="w-5 h-5 text-sapphire" />
                            <p className="text-sm text-mist/50 uppercase tracking-wider font-medium">{commandsLabel}</p>
                        </div>
                    )}

                    <div className={`grid gap-3 ${commands.length > 4 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}>
                        {commands.map((cmd, index) => (
                            <div key={index} className="p-5 rounded-xl bg-gradient-to-r from-white/[0.02] to-transparent
                                border border-white/[0.05] hover:border-sapphire/20 transition-colors">
                                <code className="text-base font-mono font-bold text-sapphire block mb-2">{cmd.cmd}</code>
                                <p className="text-sm text-mist/50 leading-relaxed">{cmd.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {ctaLabel && ctaActionPhrase && (
                <div className="pt-8 flex justify-end">
                    <button
                        className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                            hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                            transition-all duration-200 text-lg shadow-lg shadow-flamingo/20"
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

export default Guide;
