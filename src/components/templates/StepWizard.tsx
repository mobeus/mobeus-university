/**
 * StepWizard
 * Multi-step wizard/form progress
 * 
 * USE WHEN: Multi-step processes, onboarding wizards, guided flows
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each step is clickable → notifyTele
 */

import React from 'react';
import { Check, Circle } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface WizardStep {
    id: string;
    title: string;
    description?: string;
    status: 'complete' | 'current' | 'upcoming';
    imageUrl?: string;
    imagePrompt?: string;
    actionPhrase: string;
}

interface StepWizardProps {
    title?: string;
    steps: WizardStep[];
    currentStep?: number;
}

export const StepWizard: React.FC<StepWizardProps> = ({
    title,
    steps = [],
    currentStep,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const getStepStatus = (step: WizardStep, index: number) => {
        if (currentStep !== undefined) {
            if (index < currentStep) return 'complete';
            if (index === currentStep) return 'current';
            return 'upcoming';
        }
        return step.status;
    };

    return (
        <div className="glass-template-container">
            {title && <h3 className="text-template-title text-xl mb-6 text-center">{title}</h3>}

            <div className="space-y-4">
                {steps?.map((step, index) => {
                    const status = getStepStatus(step, index);
                    const hasImage = step.imageUrl || step.imagePrompt;

                    return (
                        <div
                            key={step.id}
                            className={`glass-card-clickable flex items-start gap-4 p-4 rounded-xl border transition-all ${status === 'current'
                                    ? 'bg-sapphire/10 border-sapphire/40'
                                    : status === 'complete'
                                        ? 'bg-jade/5 border-jade/20'
                                        : 'bg-mist/5 border-mist/10'
                                }`}
                            onClick={() => handleAction(step.actionPhrase)}
                        >
                            {/* Step Indicator */}
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${status === 'complete'
                                    ? 'bg-jade/20'
                                    : status === 'current'
                                        ? 'bg-sapphire/20'
                                        : 'bg-mist/10'
                                }`}>
                                {status === 'complete' ? (
                                    <Check className="w-5 h-5 text-jade" />
                                ) : (
                                    <span className={`font-bold ${status === 'current' ? 'text-sapphire' : 'text-mist/40'
                                        }`}>
                                        {index + 1}
                                    </span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h4 className={`text-template-subtitle ${status === 'current' ? 'text-sapphire' : ''
                                    }`}>
                                    {step.title}
                                </h4>
                                {step.description && (
                                    <p className="text-template-content text-sm mt-1">{step.description}</p>
                                )}
                            </div>

                            {/* Optional Image */}
                            {hasImage && (
                                <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden glass-image-container">
                                    <SmartImage
                                        assetId={step.imageUrl || step.imagePrompt || ''}
                                        alt={step.title}
                                        className="smart-image w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StepWizard;
