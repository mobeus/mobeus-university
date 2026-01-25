/**
 * UseCaseDetail - Show detailed use case information
 * For exploring specific industry/function use cases
 * 
 * HIERARCHY: Glance (use case name) → Look (benefits) → Read (examples)
 */

import React from 'react';
import {
    ArrowRight, Check, Users, Target, TrendingUp,
    DollarSign, GraduationCap, Headphones, ShoppingBag,
    Building, HeartPulse, Landmark, BookOpen
} from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface UseCaseDetailProps {
    emoji?: string;
    icon?: 'sales' | 'training' | 'service' | 'retail' | 'finance' | 'health' | 'gov' | 'edu';
    title: string;
    tagline: string;
    description: string;
    imageUrl?: string;
    imagePrompt?: string;
    benefits?: Array<{
        title: string;
        description: string;
    }>;
    exampleScenarios?: Array<{
        title: string;
        description: string;
    }>;
    metrics?: Array<{
        value: string;
        label: string;
    }>;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const iconMap = {
    sales: DollarSign,
    training: GraduationCap,
    service: Headphones,
    retail: ShoppingBag,
    finance: Building,
    health: HeartPulse,
    gov: Landmark,
    edu: BookOpen,
};

const colorMap = {
    sales: { bg: 'bg-jade/15', border: 'border-jade/30', text: 'text-jade' },
    training: { bg: 'bg-sapphire/15', border: 'border-sapphire/30', text: 'text-sapphire' },
    service: { bg: 'bg-turmeric/15', border: 'border-turmeric/30', text: 'text-turmeric' },
    retail: { bg: 'bg-flamingo/15', border: 'border-flamingo/30', text: 'text-flamingo' },
    finance: { bg: 'bg-sapphire/15', border: 'border-sapphire/30', text: 'text-sapphire' },
    health: { bg: 'bg-coral/15', border: 'border-coral/30', text: 'text-coral' },
    gov: { bg: 'bg-jade/15', border: 'border-jade/30', text: 'text-jade' },
    edu: { bg: 'bg-turmeric/15', border: 'border-turmeric/30', text: 'text-turmeric' },
};

export const UseCaseDetail: React.FC<UseCaseDetailProps> = ({
    emoji,
    icon = 'sales',
    title,
    tagline,
    description,
    imageUrl,
    imagePrompt,
    benefits = [],
    exampleScenarios = [],
    metrics = [],
    ctaLabel = "How do I start?",
    ctaActionPhrase = "How do I start",
}) => {
    const { playClick } = useSound();
    const IconComponent = iconMap[icon];
    const colors = colorMap[icon];
    const hasImage = imageUrl || imagePrompt;

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            {/* GLANCE LEVEL: Header */}
            <div className="text-center mb-8">
                {emoji ? (
                    <span className="text-6xl block mb-4">{emoji}</span>
                ) : (
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${colors.bg} border ${colors.border} mb-4`}>
                        <IconComponent className={`w-10 h-10 ${colors.text}`} />
                    </div>
                )}
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{title}</h1>
                <p className={`text-xl ${colors.text} font-medium mb-4`}>{tagline}</p>
                <p className="text-lg text-mist/70 max-w-2xl mx-auto">{description}</p>
            </div>

            {/* Image if provided */}
            {hasImage && (
                <div className="rounded-2xl overflow-hidden mb-8 border border-mist/10">
                    <SmartImage
                        assetId={imageUrl || imagePrompt || ''}
                        alt={title}
                        className="w-full h-64 object-cover"
                    />
                </div>
            )}

            {/* Metrics */}
            {metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {metrics.map((metric, index) => (
                        <div key={index} className="text-center p-4 rounded-xl bg-obsidian/30 border border-mist/10">
                            <div className={`text-3xl font-bold ${colors.text} mb-1`}>{metric.value}</div>
                            <div className="text-sm text-mist/50">{metric.label}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* LOOK LEVEL: Benefits */}
            {benefits.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <TrendingUp className={`w-5 h-5 ${colors.text}`} />
                        Why It Works
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {benefits.map((benefit, index) => (
                            <div key={index} className={`p-4 rounded-xl ${colors.bg} border ${colors.border}`}>
                                <div className="flex items-start gap-3">
                                    <div className={`w-6 h-6 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                        <Check className={`w-3 h-3 ${colors.text}`} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">{benefit.title}</h3>
                                        <p className="text-sm text-mist/60">{benefit.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* READ LEVEL: Example Scenarios */}
            {exampleScenarios.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Target className={`w-5 h-5 ${colors.text}`} />
                        Example Scenarios
                    </h2>
                    <div className="space-y-3">
                        {exampleScenarios.map((scenario, index) => (
                            <div key={index} className="p-4 rounded-xl bg-obsidian/30 border border-mist/10">
                                <h3 className="text-white font-medium mb-1">{scenario.title}</h3>
                                <p className="text-sm text-mist/60">{scenario.description}</p>
                            </div>
                        ))}
                    </div>
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

export default UseCaseDetail;
