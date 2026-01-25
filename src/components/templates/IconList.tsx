/**
 * IconList - List with icons
 * Reusable for any bulleted content
 * 
 * HIERARCHY: Glance (icons) → Look (titles) → Read (descriptions)
 */

import React from 'react';
import {
    Check, Star, Zap, Shield, Heart, Target, Award,
    Sparkles, ArrowRight, CheckCircle, Circle
} from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ListItem {
    icon?: 'check' | 'star' | 'zap' | 'shield' | 'heart' | 'target' | 'award' | 'sparkles' | 'checkCircle' | 'circle';
    emoji?: string;
    title: string;
    description?: string;
    actionPhrase?: string;
}

interface IconListProps {
    headline?: string;
    subheadline?: string;
    items: ListItem[];
    color?: 'flamingo' | 'sapphire' | 'jade' | 'turmeric';
    numbered?: boolean;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const iconMap = {
    check: Check, star: Star, zap: Zap, shield: Shield, heart: Heart,
    target: Target, award: Award, sparkles: Sparkles, checkCircle: CheckCircle, circle: Circle,
};

const colorMap = {
    flamingo: { icon: 'text-flamingo', bg: 'bg-flamingo/20' },
    sapphire: { icon: 'text-sapphire', bg: 'bg-sapphire/20' },
    jade: { icon: 'text-jade', bg: 'bg-jade/20' },
    turmeric: { icon: 'text-turmeric', bg: 'bg-turmeric/20' },
};

export const IconList: React.FC<IconListProps> = ({
    headline,
    subheadline,
    items,
    color = 'jade',
    numbered = false,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const colors = colorMap[color];

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            {headline && (
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{headline}</h1>
                    {subheadline && <p className="text-lg text-mist/70">{subheadline}</p>}
                </div>
            )}

            <div className="space-y-4 mb-8">
                {items.map((item, index) => {
                    const IconComponent = iconMap[item.icon || 'check'];

                    return (
                        <div
                            key={index}
                            className={`flex items-start gap-4 p-4 rounded-xl bg-obsidian/30 border border-mist/10 ${item.actionPhrase ? 'cursor-pointer hover:border-mist/30 transition-all' : ''
                                }`}
                            onClick={() => item.actionPhrase && handleAction(item.actionPhrase)}
                        >
                            {/* Icon or Number */}
                            {numbered ? (
                                <div className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0 ${colors.icon} font-bold text-sm`}>
                                    {index + 1}
                                </div>
                            ) : item.emoji ? (
                                <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                            ) : (
                                <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                                    <IconComponent className={`w-4 h-4 ${colors.icon}`} />
                                </div>
                            )}

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                                {item.description && (
                                    <p className="text-sm text-mist/60 mt-1">{item.description}</p>
                                )}
                            </div>

                            {/* Arrow if clickable */}
                            {item.actionPhrase && (
                                <ArrowRight className="w-5 h-5 text-mist/30 flex-shrink-0" />
                            )}
                        </div>
                    );
                })}
            </div>

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

export default IconList;
