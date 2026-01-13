/**
 * Onboarding Flow Configuration
 * Defines the order and settings for each static onboarding step
 */

import { OnboardingStepConfig, SidebarStep } from '@/types/onboarding';

export const ONBOARDING_FLOW: OnboardingStepConfig[] = [
    { id: 'home', templateId: 'StaticHomePage', showSidebar: false },
    { id: 'login-id', templateId: 'StaticLoginIDVerify', showSidebar: true },
    { id: 'phone', templateId: 'StaticPhoneEntry', showSidebar: true },
    { id: 'otp', templateId: 'StaticOTPVerify', showSidebar: true },
    { id: 'basic-info', templateId: 'StaticBasicInfo', showSidebar: true, hasVisibleSkip: true },
    { id: 'resume', templateId: 'StaticResumeUpload', showSidebar: true, hasVisibleSkip: true },
    { id: 'skills-assessment', templateId: 'StaticSkillsAssessment', showSidebar: true, hasVisibleSkip: true, skipTriggersTransition: true },
];

// Sidebar step definitions (for progress tracker)
// Note: Home page is excluded as it doesn't show sidebar
export const SIDEBAR_STEPS: SidebarStep[] = [
    { key: 'login-id', label: 'Login ID Verification', sublabel: 'Secure identity confirmation' },
    { key: 'phone', label: 'Phone Verification', sublabel: 'OTP confirmation' },
    { key: 'basic-info', label: 'Basic Information', sublabel: 'Name and contact details' },
    { key: 'resume', label: 'Upload CV', sublabel: 'Background and interest' },
    { key: 'skills-assessment', label: 'Skills Assessment', sublabel: 'Your career baseline' },
];

// Get the index of a step by its ID
export const getStepIndex = (stepId: string): number => {
    return ONBOARDING_FLOW.findIndex(step => step.id === stepId);
};

// Get sidebar step index (excludes home page, maps phone+otp to same step)
export const getSidebarStepIndex = (stepId: string): number => {
    if (stepId === 'home') return -1;
    if (stepId === 'otp') return SIDEBAR_STEPS.findIndex(s => s.key === 'phone');
    return SIDEBAR_STEPS.findIndex(s => s.key === stepId);
};

// Count completed sidebar steps
export const getCompletedSidebarSteps = (currentStepId: string): number => {
    const sidebarIndex = getSidebarStepIndex(currentStepId);
    return sidebarIndex >= 0 ? sidebarIndex : 0;
};
