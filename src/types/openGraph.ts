export interface OpenGraphData {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
}

export interface URLPreviewMetadata {
  url: string;
  openGraphData?: OpenGraphData;
  isLoading?: boolean;
}
