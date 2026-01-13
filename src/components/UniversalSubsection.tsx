import React, { Suspense } from "react";
import { TEMPLATE_REGISTRY } from "@/data/templateRegistry";

interface UniversalSubsectionProps {
    id: string;
    animationClass?: string;
    isExiting?: boolean;
}

/**
 * UniversalSubsection
 * 
 * Legacy component for static subsection rendering.
 * For Fiserv DMA, all templates are loaded dynamically via TEMPLATE_REGISTRY
 * in DynamicSectionLoader. This component is kept for backwards compatibility
 * with any remaining static content.
 */
export const UniversalSubsection: React.FC<UniversalSubsectionProps> = ({
    id,
    animationClass = "",
    isExiting = false,
}) => {
    // This component is deprecated - all templates now use TEMPLATE_REGISTRY
    // via DynamicSectionLoader for generative content
    console.warn(`[UniversalSubsection] Static subsection "${id}" requested. Use generative templates instead.`);

    return (
        <div className="p-8 border border-white/10 bg-white/5 rounded-lg text-white/60">
            <h3 className="font-bold text-white/80">Static Content</h3>
            <p>Subsection ID: <code className="text-emerald-400">{id}</code></p>
            <p className="text-sm mt-2">This content should be migrated to generative templates.</p>
        </div>
    );
};
