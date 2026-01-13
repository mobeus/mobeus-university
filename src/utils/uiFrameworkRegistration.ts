/**
 * UI Framework Navigation API Exposure
 * 
 * Exposes navigation functions to window.teleNavigation for Tele (conversational AI)
 * to operate the Glass (this UI). Part of the Mobeus Teleglass Platform architecture.
 * 
 * Architecture:
 * - Glass (this code) = Built in Lovable, renders subsections
 * - Tele (separate) = Trained in Mobeus Teleglass Platform, operates Glass via this API
 * - glass-generator-prompt.md = Instructions for Tele to generate Glass JSON
 * 
 * See /docs/ARCHITECTURE.md for complete system documentation.
 */

// SUBSECTION-ONLY ARCHITECTURE
interface NavigationData {
  badge?: string;
  title?: string;
  subtitle?: string;
  headers?: string[];
  subsectionsIds?: string[];
  subsectionIds?: string[]; // alternate spelling
  section?: string;
  sectionId?: string;
  subsections?: any;
}

interface NavigationAPI {
  navigateToSection: (navigationData: NavigationData | string) => boolean;
  getCurrentSection: () => string;
  flashTele: () => void;
  setCarColor?: (color: string) => boolean;
  getCarColor?: () => string;
}

/**
 * Expose navigation API to window for console access and Tele integration
 */
export const exposeNavigationAPI = (navigationAPI: NavigationAPI): void => {
  (window as any).teleNavigation = navigationAPI;
  (window as any).navigateToSection = navigationAPI.navigateToSection;

  // Note: setCarColor and getCarColor are already exposed by CarColorContext
  // The navigationAPI contains wrapper functions that call the window functions
  // We don't overwrite them here to avoid circular references
};
