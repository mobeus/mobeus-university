/**
 * useOnboardingFlow
 * Hook to manage state and progression through the static onboarding flow
 */

import { useState, useCallback, useEffect } from 'react';
import { OnboardingData } from '@/types/onboarding';
import { ONBOARDING_FLOW } from '@/data/onboardingFlow';

const LOCAL_STORAGE_KEY = 'fiserv_dma_onboarding_complete';

interface UseOnboardingFlowReturn {
    // State
    currentStepIndex: number;
    isOnboardingComplete: boolean;
    isTransitioning: boolean;
    userData: OnboardingData;

    // Actions
    goToNext: () => void;
    goToBack: () => void;
    goToSkip: () => void;
    completeOnboarding: () => void;
    setUserData: (data: Partial<OnboardingData>) => void;
    resetOnboarding: () => void;

    // Computed
    currentStepId: string;
    totalSteps: number;
    progress: number;
}

export const useOnboardingFlow = (): UseOnboardingFlowReturn => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [userData, setUserDataState] = useState<OnboardingData>({
        // Pre-populated demo data - Sara AlHarbi profile
        loginId: '1234567890',
        phoneNumber: '501234567',
        countryCode: '+966',
        // Basic Info from sample customer persona
        firstName: 'Sara',
        lastName: 'AlHarbi',
        email: 'sara.alharbi@example.com',
        dateOfBirth: { day: 15, month: 6, year: 2003 }, // Makes her ~22 years old
        gender: 'female',
        city: 'Riyadh',
    });

    // Check localStorage on mount (but always start from beginning)
    useEffect(() => {
        try {
            const savedComplete = localStorage.getItem(LOCAL_STORAGE_KEY);
            // We track if they've onboarded before, but they still go through onboarding
            if (savedComplete === 'true') {
                setUserDataState(prev => ({ ...prev, isReturningUser: true }));
            }
        } catch (error) {
            // localStorage not available
        }
    }, []);

    // Get current step info
    const currentStep = ONBOARDING_FLOW[currentStepIndex];
    const currentStepId = currentStep?.id || 'home';
    const totalSteps = ONBOARDING_FLOW.length;
    const progress = ((currentStepIndex + 1) / totalSteps) * 100;

    // Navigate to next step
    const goToNext = useCallback(() => {
        if (currentStepIndex < totalSteps - 1) {
            setCurrentStepIndex(prev => prev + 1);
        }
    }, [currentStepIndex, totalSteps]);

    // Navigate to previous step
    const goToBack = useCallback(() => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        }
    }, [currentStepIndex]);

    // Skip current step (same as next for most steps)
    const goToSkip = useCallback(() => {
        const current = ONBOARDING_FLOW[currentStepIndex];

        // If skip triggers transition, complete onboarding
        if (current?.skipTriggersTransition) {
            setIsTransitioning(true);
            // Transition will be handled by Index.tsx
        } else {
            // Otherwise just go to next step
            goToNext();
        }
    }, [currentStepIndex, goToNext]);

    // Complete onboarding flow
    const completeOnboarding = useCallback(() => {
        setIsTransitioning(true);

        // After transition animation, mark as complete
        setTimeout(() => {
            setIsOnboardingComplete(true);
            setIsTransitioning(false);

            // Save to localStorage
            try {
                localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
            } catch (error) {
                // localStorage not available
            }

            // Record completion timestamp
            setUserDataState(prev => ({ ...prev, completedAt: new Date().toISOString() }));
        }, 3000); // 3 second transition animation
    }, []);

    // Update user data
    const setUserData = useCallback((data: Partial<OnboardingData>) => {
        setUserDataState(prev => ({ ...prev, ...data }));
    }, []);

    // Reset onboarding (for testing)
    const resetOnboarding = useCallback(() => {
        setCurrentStepIndex(0);
        setIsOnboardingComplete(false);
        setIsTransitioning(false);
        setUserDataState({});
        try {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        } catch (error) {
            // localStorage not available
        }
    }, []);

    return {
        currentStepIndex,
        isOnboardingComplete,
        isTransitioning,
        userData,
        goToNext,
        goToBack,
        goToSkip,
        completeOnboarding,
        setUserData,
        resetOnboarding,
        currentStepId,
        totalSteps,
        progress,
    };
};

export default useOnboardingFlow;
