import { SubsectionMetadata } from './subsection';
import { EvidenceData } from './evidence';

/**
 * Navigation History Entry
 * Stores complete state snapshot for instant restoration without re-querying Tele
 */
export interface NavigationHistoryEntry {
    timestamp: number;
    section: string;
    type: 'welcome' | 'dynamic';

    // Complete state snapshot for instant restoration
    snapshot: {
        // Section-level state
        activeSection: string;
        activeSubSection: string[] | null;
        activeSubSectionMetadata: SubsectionMetadata[] | null;

        // Dynamic section data (if applicable)
        dynamicSectionData: {
            badge: string;
            title: string;
            subtitle?: string;
            subsectionIds: string[];
            generativeSubsections?: any[];
        } | null;

        // Display data (for dynamic-evidence sections)
        displayData: EvidenceData | null;

        // Original navigation payload (for reference/debugging)
        originalPayload: any;
    };
}

/**
 * Navigation History State
 */
export interface NavigationHistoryState {
    history: NavigationHistoryEntry[];
    currentIndex: number;
}
