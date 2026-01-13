export interface EvidenceQuestion {
  id: string;
  subtype?: string;
  question: string;
  response: string;
  evidence?: string[];
  sources?: string[];
  priority?: string;
  score?: number;
}

export interface EvidenceHighlights {
  bestPractice: string;
  lookout: string;
  unique: string;
}

export interface EvidenceData {
  domain?: string;
  domainName?: string;
  title?: string;
  summary: string;
  questions: EvidenceQuestion[];
  highlights: EvidenceHighlights | null;
}
