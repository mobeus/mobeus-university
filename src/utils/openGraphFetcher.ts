import { OpenGraphData } from "@/types/openGraph";

export async function fetchOpenGraphData(url: string): Promise<OpenGraphData> {
  try {
    // Using microlink.io as a reliable OG scraping service
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&meta=true`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch metadata');
    }
    
    const result = await response.json();
    
    if (result.status === 'success' && result.data) {
      const data = result.data;
      
      return {
        url,
        title: data.title || data.publisher || new URL(url).hostname,
        description: data.description,
        image: data.image?.url || data.logo?.url,
        siteName: data.publisher || new URL(url).hostname,
      };
    }
    
    // If no data returned, fallback to basic preview
    throw new Error('No metadata available');
  } catch (error) {
    // Fallback: extract domain and show basic preview
    try {
      const domain = new URL(url).hostname;
      return {
        url,
        title: domain,
        siteName: domain,
      };
    } catch {
      throw new Error("Invalid URL");
    }
  }
}

export function extractURLsFromText(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
}
