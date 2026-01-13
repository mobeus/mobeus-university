/**
 * Static Template Registry
 * Maps template IDs to their React components for the static onboarding flow
 */

import { lazy } from 'react';

// Lazy load all static templates for code splitting
export const STATIC_TEMPLATE_REGISTRY: Record<string, React.LazyExoticComponent<React.FC<any>>> = {
    StaticHomePage: lazy(() => import('@/components/static-templates/StaticHomePage').then(m => ({ default: m.StaticHomePage }))),
    StaticLoginIDVerify: lazy(() => import('@/components/static-templates/StaticLoginIDVerify').then(m => ({ default: m.StaticLoginIDVerify }))),
    StaticPhoneEntry: lazy(() => import('@/components/static-templates/StaticPhoneEntry').then(m => ({ default: m.StaticPhoneEntry }))),
    StaticOTPVerify: lazy(() => import('@/components/static-templates/StaticOTPVerify').then(m => ({ default: m.StaticOTPVerify }))),
    StaticBasicInfo: lazy(() => import('@/components/static-templates/StaticBasicInfo').then(m => ({ default: m.StaticBasicInfo }))),
    StaticResumeUpload: lazy(() => import('@/components/static-templates/StaticResumeUpload').then(m => ({ default: m.StaticResumeUpload }))),
    StaticSkillsAssessment: lazy(() => import('@/components/static-templates/StaticSkillsAssessment').then(m => ({ default: m.StaticSkillsAssessment }))),
};

export default STATIC_TEMPLATE_REGISTRY;
