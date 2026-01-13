/**
 * Subsection Image Prompts
 * 
 * This hook provides image generation prompts for dynamic content.
 * For Fiserv DMA, these are placeholder prompts that can be used
 * when generating AI images for platform visuals.
 */

// Fiserv DMA themed image prompts
const SUBSECTION_IMAGE_PROMPTS: Record<string, string> = {
  'merchant-onboarding': 'Modern digital merchant onboarding interface, clean business UI, emerald accent colors, progress indicators, professional fintech aesthetic',
  'transaction-dashboard': 'Real-time transaction monitoring dashboard, data visualization, card type breakdown charts, modern fintech UI, dark glass aesthetic',
  'settlement-view': 'Financial settlement interface, itemized fee breakdown, gross-to-net visualization, clean accounting UI, professional design',
  'risk-signals': 'Risk monitoring dashboard, fraud alert indicators, compliance status, security-focused fintech UI, emerald accents',
  'merchant-portal': 'Merchant self-service portal, account management interface, transaction history, modern banking UI',
};

export const useSubsectionImage = (subsectionId: string): string | null => {
  return SUBSECTION_IMAGE_PROMPTS[subsectionId] || null;
};

export default useSubsectionImage;
