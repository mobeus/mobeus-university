/**
 * FlowDiagram
 * Process flow with numbered/connected steps
 * 
 * USE WHEN: Workflows, processes, "how does it work", step-by-step flows
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each step is clickable → notifyTele
 */

import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface FlowStep {
    id: string;
    title: string;
    description?: string;
    icon?: string;
    actionPhrase: string;
}

interface FlowDiagramProps {
    steps: FlowStep[];
    direction?: 'horizontal' | 'vertical';
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({
    steps = [],
    direction = 'horizontal',
}) => {
    const { playClick } = useSound();

    // Defensive: Don't render empty flow
    if (!steps || steps.length === 0) {
        return null;
    }

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const isHorizontal = direction === 'horizontal';

    return (
        <div className="glass-template-container">
            <div className={`flex ${isHorizontal ? 'flex-row flex-wrap' : 'flex-col'} gap-2 items-center justify-center`}>
                {steps?.map((step, index) => (
                    <React.Fragment key={step.id || index}>
                        <div
                            className="glass-card-standard glass-card-clickable min-w-[180px] max-w-[220px] text-center"
                            onClick={() => handleAction(step.actionPhrase)}
                        >
                            <div className="template-badge mb-2">{index + 1}</div>
                            <h4 className="text-template-subtitle mb-1">{step.title}</h4>
                            {step.description && (
                                <p className="text-template-content text-sm">{step.description}</p>
                            )}
                        </div>
                        {index < steps.length - 1 && (
                            <div className="text-mist/40 flex-shrink-0">
                                {isHorizontal ? (
                                    <ArrowRight className="w-6 h-6" />
                                ) : (
                                    <ArrowDown className="w-6 h-6" />
                                )}
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default FlowDiagram;
