/**
 * Subsection Navigation Utilities
 * 
 * PHASE 2: Helpers for dual subsection navigation with multi-subsection support
 */

/**
 * Check if a subsection should be visible based on active filter
 */
export const shouldShowSubsection = (
  subsectionId: string,
  activeSubSection: string[] | null
): boolean => {
  // No filter = show everything
  if (!activeSubSection) return true;
  
  // Filter active = only show if ID is in the array
  return activeSubSection.includes(subsectionId);
};

/**
 * Parse subsection ID from section#subsection format
 */
export const parseSubsectionId = (
  navigationId: string
): { sectionId: string; subsectionId: string | null } => {
  const [sectionId, subsectionId] = navigationId.split("#");
  return {
    sectionId,
    subsectionId: subsectionId || null,
  };
};

/**
 * Build full subsection ID following convention: {section-id}-{subsection-name}
 */
export const buildSubsectionId = (
  sectionId: string,
  subsectionName: string
): string => {
  return `${sectionId}-${subsectionName}`;
};

/**
 * Filter React children based on active subsection
 */
export const filterChildrenBySubsection = (
  children: React.ReactNode,
  activeSubSection: string | null
): React.ReactNode => {
  if (!activeSubSection) return children;
  
  // This is a simplified filter - in practice, use SubsectionWrapper
  // for more granular control
  return children;
};
