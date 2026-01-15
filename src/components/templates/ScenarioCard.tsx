/**
 * ScenarioCard
 * Scenario with recommended approach
 * 
 * USE WHEN: "What if", situation responses, objection handling
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Card is clickable → notifyTele
 */

import React from 'react';
import { Lightbulb, ArrowRight, MessageSquare } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ScenarioCardProps {
    scenario: string;
    response: string;
    keyPoints?: string[];
    ctaLabel?: string;
    actionPhrase: string;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({
    scenario,
    response,
    keyPoints = [],
    ctaLabel = 'See more scenarios',
    actionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = () => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            <div className="glass-card-featured glass-card-clickable" onClick={handleAction}>
                {/* Scenario */}
                <div className="glass-card-minimal bg-turmeric/10 border-turmeric/30 mb-4">
                    <div className="flex items-start gap-3">
                        <MessageSquare className="w-6 h-6 text-turmeric flex-shrink-0 mt-0.5" />
                        <div>
                            <span className="text-turmeric text-xs font-medium uppercase">Scenario</span>
                            <p className="text-template-subtitle mt-1">"{scenario}"</p>
                        </div>
                    </div>
                </div>

                {/* Response */}
                <div className="glass-card-minimal bg-jade/10 border-jade/30 mb-4">
                    <div className="flex items-start gap-3">
                        <Lightbulb className="w-6 h-6 text-jade flex-shrink-0 mt-0.5" />
                        <div>
                            <span className="text-jade text-xs font-medium uppercase">Your Response</span>
                            <p className="text-template-content mt-1">{response}</p>
                        </div>
                    </div>
                </div>

                {/* Key Points */}
                {keyPoints?.length > 0 && (
                    <div className="mb-4">
                        <span className="text-mist/60 text-xs font-medium uppercase mb-2 block">Key Points</span>
                        <ul className="space-y-1">
                            {keyPoints.map((point, index) => (
                                <li key={index} className="text-template-content text-sm flex items-start gap-2">
                                    <span className="text-sapphire">•</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="flex items-center text-sapphire font-medium text-sm">
                    <span>{ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                </div>
            </div>
        </div>
    );
};

export default ScenarioCard;
