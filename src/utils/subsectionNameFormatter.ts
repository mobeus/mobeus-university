/**
 * Formats subsection IDs into human-readable display names
 * Handles common abbreviations and capitalizes words properly
 */
export const formatSubsectionName = (subsectionId: string): string => {
  // Remove section prefix (everything before and including the last hyphen before the actual subsection name)
  const parts = subsectionId.split('-');
  
  // Common abbreviations and special cases
  const specialCases: Record<string, string> = {
    'roi': 'ROI',
    'qa': 'Q&A',
    'faq': 'FAQ',
    'api': 'API',
    'ui': 'UI',
    'ux': 'UX',
    'sla': 'SLA',
    'kpi': 'KPI',
    'cta': 'Call to Action',
    'tpa': 'TPA',
    'nda': 'NDA',
    'rls': 'RLS',
  };
  
  // Capitalize each word and handle special cases
  const formatted = parts
    .map(part => {
      const lower = part.toLowerCase();
      return specialCases[lower] || part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(' ');
  
  return formatted;
};
