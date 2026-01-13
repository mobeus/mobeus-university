import React, { lazy } from "react";

// Lazy load templates - Fiserv DMA Enterprise Sales Platform
export const TEMPLATE_REGISTRY: Record<string, React.FC<any>> = {
    // Fiserv DMA Enterprise Sales (6)
    ProblemSolutionMatrix: lazy(() => import("@/components/templates/ProblemSolutionMatrix").then(m => ({ default: m.ProblemSolutionMatrix }))),
    OnboardingJourney: lazy(() => import("@/components/templates/OnboardingJourney").then(m => ({ default: m.OnboardingJourney }))),
    FeatureGrid: lazy(() => import("@/components/templates/FeatureGrid").then(m => ({ default: m.FeatureGrid }))),
    DataTable: lazy(() => import("@/components/templates/DataTable").then(m => ({ default: m.DataTable }))),
    SplitContent: lazy(() => import("@/components/templates/SplitContent").then(m => ({ default: m.SplitContent }))),
    IconList: lazy(() => import("@/components/templates/IconList").then(m => ({ default: m.IconList }))),
};
