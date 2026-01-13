/**
 * StaticSectionLoader
 * Renders static onboarding templates with optional sidebar
 * Matches the container structure of DynamicSectionLoader for visual continuity
 */

import React, { Suspense } from 'react';
import { STATIC_TEMPLATE_REGISTRY } from '@/data/staticTemplateRegistry';
import { ONBOARDING_FLOW } from '@/data/onboardingFlow';
import { OnboardingData } from '@/types/onboarding';
import { StaticStepSidebar } from '@/components/StaticStepSidebar';
import { SectionLoadingFallback } from '@/components/SectionLoadingFallback';

interface StaticSectionLoaderProps {
    currentStepIndex: number;
    onNext: () => void;
    onBack: () => void;
    onSkip: () => void;
    onComplete: () => void;
    userData: OnboardingData;
    setUserData: (data: Partial<OnboardingData>) => void;
}

export const StaticSectionLoader: React.FC<StaticSectionLoaderProps> = ({
    currentStepIndex,
    onNext,
    onBack,
    onSkip,
    onComplete,
    userData,
    setUserData,
}) => {
    const currentStep = ONBOARDING_FLOW[currentStepIndex];

    if (!currentStep) {
        console.error('[StaticSectionLoader] No step found at index:', currentStepIndex);
        return null;
    }

    const TemplateComponent = STATIC_TEMPLATE_REGISTRY[currentStep.templateId];

    if (!TemplateComponent) {
        console.error('[StaticSectionLoader] No template found for:', currentStep.templateId);
        return null;
    }

    // Handle skip action - either go to next step or trigger transition
    const handleSkip = () => {
        if (currentStep.skipTriggersTransition) {
            onComplete();
        } else {
            onSkip();
        }
    };

    // Build props for the template
    const templateProps = {
        onNext,
        onBack: currentStepIndex > 0 ? onBack : undefined,
        onSkip: currentStep.hasVisibleSkip ? handleSkip : undefined,
        onComplete: currentStep.skipTriggersTransition ? onComplete : undefined,
        userData,
        setUserData,
        currentStep: currentStepIndex + 1,
        totalSteps: ONBOARDING_FLOW.length,
    };

    // Home page has no sidebar - full width layout
    if (!currentStep.showSidebar) {
        return (
            <div className="px-4 md:px-8 py-6 md:py-10">
                <div className="max-w-6xl mx-auto">
                    <Suspense fallback={<SectionLoadingFallback />}>
                        <TemplateComponent {...templateProps} />
                    </Suspense>
                </div>
            </div>
        );
    }

    // Steps with sidebar - two column layout
    return (
        <div className="container mx-auto max-w-[1400px] px-16 md:px-24 lg:px-32">
            <div className="flex min-h-[calc(100vh-120px)]">
                {/* Left Sidebar */}
                <StaticStepSidebar currentStepId={currentStep.id} />

                {/* Main Content */}
                <div className="flex-1 px-4 md:px-8 lg:px-12 py-6 md:py-10">
                    <div className="max-w-2xl mx-auto">
                        <Suspense fallback={<SectionLoadingFallback />}>
                            <TemplateComponent {...templateProps} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaticSectionLoader;
