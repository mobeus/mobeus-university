import React, { lazy } from "react";

// Lazy load templates - Fiserv DMA Enterprise Sales Platform
export const TEMPLATE_REGISTRY: Record<string, React.FC<any>> = {
    // Fiserv DMA Enterprise Sales (1)
    ProblemSolutionMatrix: lazy(() => import("@/components/templates/ProblemSolutionMatrix").then(m => ({ default: m.ProblemSolutionMatrix }))),
};
