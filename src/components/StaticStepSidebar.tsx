/**
 * StaticStepSidebar
 * Left sidebar showing progress through onboarding steps
 */

import React from 'react';
import { Check, Shield } from 'lucide-react';
import { SIDEBAR_STEPS, getSidebarStepIndex, getCompletedSidebarSteps } from '@/data/onboardingFlow';

interface StaticStepSidebarProps {
    currentStepId: string;
}

export const StaticStepSidebar: React.FC<StaticStepSidebarProps> = ({ currentStepId }) => {
    const currentSidebarIndex = getSidebarStepIndex(currentStepId);
    const completedSteps = getCompletedSidebarSteps(currentStepId);
    const totalSteps = SIDEBAR_STEPS.length;

    return (
        <div className="hidden lg:flex flex-col w-72 min-w-72 h-full min-h-[600px] pt-6">
            {/* Header */}
            <div className="mb-6">
                <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">
                    Getting Started
                </h3>

                {/* Step Progress */}
                <div className="space-y-3">
                    {SIDEBAR_STEPS.map((step, index) => {
                        const isCompleted = index < currentSidebarIndex;
                        const isCurrent = index === currentSidebarIndex;
                        const isPending = index > currentSidebarIndex;

                        return (
                            <div key={step.key} className="flex items-start gap-3">
                                {/* Step indicator */}
                                <div className={`
                  flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium shrink-0
                  ${isCompleted ? 'bg-secondary text-black' : ''}
                  ${isCurrent ? 'bg-primary text-black' : ''}
                  ${isPending ? 'bg-white/10 text-white/40' : ''}
                `}>
                                    {isCompleted ? <Check size={14} /> : index + 1}
                                </div>

                                {/* Step info */}
                                <div>
                                    <p className={`text-sm font-medium ${isCurrent ? 'text-white' : isCompleted ? 'text-white/70' : 'text-white/40'}`}>
                                        {step.label}
                                    </p>
                                    <p className="text-xs text-white/40">
                                        {step.sublabel}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 my-6" />

            {/* Profile Completion */}
            <div className="mb-6">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
                    Profile Completion
                </p>

                {/* Progress bar */}
                <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                    <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                    />
                </div>

                <p className="text-sm text-white/60">
                    {completedSteps} of {totalSteps} steps completed
                </p>
            </div>

            {/* Push content to bottom */}
            <div className="flex-1" />

            {/* Data Protection Badge */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-amber-500/20 rounded-lg">
                        <Shield size={16} className="text-amber-500" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-amber-500">
                            Your Data is Protected
                        </p>
                        <p className="text-xs text-white/50 mt-0.5">
                            We use bank-level encryption to keep your information secure.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaticStepSidebar;
