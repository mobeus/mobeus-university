/**
 * ProcessSteps
 * Numbered step-by-step process with descriptions
 * 
 * USE WHEN: How-to guides, onboarding steps, implementation steps
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each step is clickable → notifyTele
 */

import React from 'react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Step {
    title: string;
    description: string;
    actionPhrase: string;
}

interface ProcessStepsProps {
    title?: string;
    steps: Step[];
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({
    title,
    steps = [],
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            {title && <h3 className="text-template-title text-xl mb-6">{title}</h3>}

            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-mist/20" />

                <div className="space-y-4">
                    {steps?.map((step, index) => (
                        <div
                            key={index}
                            className="glass-card-minimal glass-card-clickable flex items-start gap-4 relative"
                            onClick={() => handleAction(step.actionPhrase)}
                        >
                            {/* Step number */}
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sapphire/20 border-2 border-sapphire flex items-center justify-center z-10">
                                <span className="text-sapphire font-bold">{index + 1}</span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 pt-2">
                                <h4 className="text-template-subtitle mb-1">{step.title}</h4>
                                <p className="text-template-content">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProcessSteps;
