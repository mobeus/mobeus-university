/**
 * JourneyUseCases - Step 6: Use Cases
 * Shows industry applications with rich details
 * 
 * RICH LAYOUT: Large cards with stats, examples, and industry focus
 */

import React, { useState } from 'react';
import {
    DollarSign, GraduationCap, Headphones, ShoppingBag,
    Building, HeartPulse, Landmark, BookOpen, ArrowRight, ChevronRight
} from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface UseCase {
    icon?: 'sales' | 'training' | 'service' | 'retail' | 'finance' | 'health' | 'gov' | 'edu';
    title: string;
    description?: string;
    examples?: string[];
    stat?: string;
    statLabel?: string;
    actionPhrase?: string;
}

interface JourneyUseCasesProps {
    headline?: string;
    subheadline?: string;
    useCases?: UseCase[];
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

export const JourneyUseCases: React.FC<JourneyUseCasesProps> = ({
    headline = "Teles Work Everywhere",
    subheadline = "Same framework, any industry. Pick yours to see how.",
    useCases = [
        {
            icon: 'sales',
            title: 'Sales Enablement',
            description: 'Close more deals with interactive product demos and pricing guides.',
            examples: ['Product demos', 'Pricing calculators', 'Lead qualification', 'Proposal builders'],
            stat: '87%',
            statLabel: 'faster deal cycles',
            actionPhrase: 'Tell me about sales use cases'
        },
        {
            icon: 'training',
            title: 'Training & Onboarding',
            description: 'Get employees up to speed faster with conversational learning.',
            examples: ['New hire onboarding', 'Skills development', 'Compliance training', 'Certifications'],
            stat: '3x',
            statLabel: 'faster time-to-productivity',
            actionPhrase: 'Tell me about training use cases'
        },
        {
            icon: 'service',
            title: 'Customer Service',
            description: 'Resolve issues faster with visual troubleshooting guides.',
            examples: ['Support tickets', 'FAQ navigation', 'Troubleshooting', 'Account help'],
            stat: '60%',
            statLabel: 'ticket deflection',
            actionPhrase: 'Tell me about service use cases'
        },
        {
            icon: 'health',
            title: 'Healthcare',
            description: 'Patient engagement with visual health information.',
            examples: ['Patient intake', 'Appointment scheduling', 'Health education', 'Care navigation'],
            stat: '92%',
            statLabel: 'patient satisfaction',
            actionPhrase: 'Tell me about healthcare use cases'
        },
    ],
    ctaLabel = "Get Started",
    ctaActionPhrase = "How do I start",
}) => {
    const { playClick } = useSound();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container space-y-6">
            {/* Header */}
            {headline && (
                <div className="text-center mb-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{headline}</h2>
                    {subheadline && <p className="text-mist/70">{subheadline}</p>}
                </div>
            )}

            {/* Use Case Grid */}
            <div className="grid md:grid-cols-2 gap-4">
                {useCases?.map((useCase, index) => {
                    const IconComponent = iconMap[useCase.icon || 'sales'];
                    const isHovered = hoveredIndex === index;

                    return (
                        <div
                            key={index}
                            className="rounded-xl bg-obsidian/40 border border-mist/10 overflow-hidden cursor-pointer hover:border-sapphire/30 transition-all"
                            onClick={() => useCase.actionPhrase && handleAction(useCase.actionPhrase)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="p-5">
                                {/* Header Row */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-sapphire/20 border border-sapphire/30 flex items-center justify-center flex-shrink-0">
                                        <IconComponent className="w-6 h-6 text-sapphire" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-white">{useCase.title}</h3>
                                        {useCase.description && (
                                            <p className="text-sm text-mist/70 mt-1">{useCase.description}</p>
                                        )}
                                    </div>
                                    {/* Stat Badge */}
                                    {useCase.stat && (
                                        <div className="text-right flex-shrink-0">
                                            <div className="text-2xl font-bold text-sapphire">{useCase.stat}</div>
                                            {useCase.statLabel && (
                                                <div className="text-xs text-mist/50">{useCase.statLabel}</div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Examples */}
                                {useCase.examples && (
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {useCase.examples.map((example, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 rounded bg-obsidian/50 border border-mist/10 text-xs text-mist/70"
                                            >
                                                {example}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Learn More */}
                                <div className={`flex items-center gap-1 text-sm text-sapphire transition-all ${isHovered ? 'translate-x-1' : ''}`}>
                                    <span>Learn more</span>
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CTA */}
            {ctaLabel && ctaActionPhrase && (
                <div className="text-center pt-4">
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

export default JourneyUseCases;
