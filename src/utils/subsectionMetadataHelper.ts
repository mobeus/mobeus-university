/**
 * Subsection Metadata Helper (Stubbed)
 * Legacy navigationRules.json removed - returning empty metadata
 */

import { SubsectionMetadata } from '@/types/subsection';

/**
 * Get metadata for specific subsections within a section
 * Returns empty array - subsection metadata is now defined in SECTION_METADATA
 */
export const getSubsectionMetadata = (
  sectionId: string,
  subsectionIds: string[]
): SubsectionMetadata[] => {
  return [];
};

/**
 * Match user intent to subsection IDs
 * Returns empty array - intent matching not implemented
 */
export const matchIntentToSubsections = (
  sectionId: string,
  userQuery: string
): string[] => {
  return [];
};

/**
 * Get full subsection metadata for matched IDs
 * Returns empty array
 */
export const getSubsectionMetadataObjects = (
  sectionId: string,
  subsectionIds: string[]
): SubsectionMetadata[] => {
  return [];
};

/**
 * Get all available subsections for a section
 * Returns empty array
 */
export const getAvailableSubsections = (sectionId: string): string[] => {
  return [];
};

/**
 * Check if a section has subsection support
 * Returns false - subsection support now in SECTION_METADATA
 */
export const hasSubsectionSupport = (sectionId: string): boolean => {
  return false;
};
