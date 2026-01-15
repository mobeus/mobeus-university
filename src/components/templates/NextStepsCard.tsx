/**
 * NextStepsCard
 * Recommended next actions
 * 
 * USE WHEN: Action items, next steps, "what now", post-demo
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each step is clickable → notifyTele
 */

import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface NextStep {
    title: string;
    description: string;
    priority?: 'high' | 'medium' | 'low';
    actionPhrase: string;
}

interface NextStepsCardProps {
    title?: string;
    subtitle?: string;
    steps: NextStep[];
}

export const NextStepsCard: React.FC<NextStepsCardProps> = ({
    title = 'Next Steps',
    subtitle,
    steps = [],
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const getPriorityColor = (priority?: 'high' | 'medium' | 'low') => {
        switch (priority) {
            case 'high': return 'border-l-flamingo';
            case 'medium': return 'border-l-turmeric';
            default: return 'border-l-jade';
        }
    };

    return (
        <div className="glass-template-container">
            <div className="glass-card-featured">
                <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-jade" />
                    <div>
                        <h3 className="text-template-title text-xl">{title}</h3>
                        {subtitle && <p className="text-template-content text-sm">{subtitle}</p>}
                    </div>
                </div>

                <div className="space-y-3">
                    {steps?.map((step, index) => (
                        <div
                            key={index}
                            className={`glass-card-minimal glass-card-clickable border-l-4 ${getPriorityColor(step.priority)} group`}
                            onClick={() => handleAction(step.actionPhrase)}
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sapphire/20 flex items-center justify-center mt-0.5">
                                    <span className="text-sapphire font-bold text-sm">{index + 1}</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-template-subtitle group-hover:text-sapphire transition-colors">
                                        {step.title}
                                    </h4>
                                    <p className="text-template-content text-sm">{step.description}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-mist/40 group-hover:text-sapphire transition-colors flex-shrink-0" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NextStepsCard;
