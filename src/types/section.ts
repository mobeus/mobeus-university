/**
 * Standard Section Component Props
 * All section components should implement this interface for consistency
 */

import { SubsectionMetadata } from "./subsection";

export interface StandardSectionProps {
  /**
   * Animation class for section transitions
   * Applied during enter/exit animations
   */
  animationClass?: string;

  /**
   * Active subsection filter
   * - null = show all subsections (full section view)
   * - string[] = show only specified subsections (filtered view)
   */
  activeSubSection?: string[] | null;

  /**
   * Metadata for active subsections
   * Used to dynamically generate badge/title/subtitle for subsections
   * Only provided when activeSubSection is set
   */
  activeSubSectionMetadata?: SubsectionMetadata[] | null;

  /**
   * Exit animation state
   * Used for coordinated section transitions
   */
  isExiting?: boolean;
}

/**
 * Extended props for implementation phase sections
 * Includes phase selector in addition to standard props
 */
export interface ImplementationPhaseSectionProps extends StandardSectionProps {
  phase: 'discovery' | 'build' | 'deploy';
}
