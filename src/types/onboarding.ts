/**
 * Onboarding Flow Types
 * Type definitions for the static onboarding experience
 */

export interface OnboardingStepConfig {
    id: string;
    templateId: string;
    showSidebar: boolean;
    hasVisibleSkip?: boolean;
    skipTriggersTransition?: boolean;
}

export interface OnboardingData {
    // Step 2: Login ID
    loginId?: string;

    // Step 3: Phone
    countryCode?: string;
    phoneNumber?: string;
    otpCode?: string;
    otpVerified?: boolean;

    // Step 4: Basic Info
    firstName?: string;
    lastName?: string;
    email?: string;
    dateOfBirth?: { day: number; month: number; year: number };
    gender?: 'male' | 'female';
    city?: string;

    // Step 5: Resume
    resumeFile?: File;
    resumeFileName?: string;
    resumeFileSize?: number;

    // Meta
    isReturningUser?: boolean;
    completedAt?: string;
}

export interface StaticTemplateProps {
    onNext: () => void;
    onBack?: () => void;
    onSkip?: () => void;
    onComplete?: () => void;
    userData: OnboardingData;
    setUserData: (data: Partial<OnboardingData>) => void;
    currentStep: number;
    totalSteps: number;
}

export interface SidebarStep {
    key: string;
    label: string;
    sublabel: string;
}
