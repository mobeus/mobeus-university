import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string[];
  structuredData?: object;
}

export const SEO = ({
  title = 'Teleco | The Assisted Future',
  description = 'Machines helping mankind. A population of helpful teles giving humanity space for life. Help is here.',
  image = '/og-image.png',
  url = '/',
  type = 'website',
  keywords = ['Teleco', 'Tele', 'The Assisted Future', 'Space for Life', 'Conversational Labor', 'Help is Here'],
  structuredData,
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Teleco', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Structured Data (JSON-LD)
    if (structuredData) {
      let scriptElement = document.querySelector('script[type="application/ld+json"]');

      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptElement);
      }

      scriptElement.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, image, url, type, keywords, structuredData]);

  return null;
};

// Pre-configured SEO for sections - Teleco Platform
export const sectionSEO = {
  welcome: {
    title: 'Teleco | The Assisted Future',
    description: 'Machines helping mankind. A population of helpful teles giving humanity space for life.',
    keywords: ['Teleco', 'The Assisted Future', 'Tele', 'Space for Life', 'Help is Here'],
  },

  platform: {
    title: 'The Teleco Platform | Operating System for Conversational Labor',
    description: 'The infrastructure that deploys a population of helpful teles at scale. Language in, outcomes out.',
    keywords: ['Teleco Platform', 'Conversational Labor', 'Tele', 'Infrastructure'],
  },

  teles: {
    title: 'The Tele Population | Helpful Conversational Workers',
    description: 'A population of helpful teles — conversational workers accelerating The Assisted Future.',
    keywords: ['Tele', 'Tele Population', 'Conversational Workers', 'Help is Here'],
  },

  future: {
    title: 'The Assisted Future | Space for Life',
    description: 'A world where machines truly help mankind, giving humanity space for life. Time for family, creativity, and joy.',
    keywords: ['The Assisted Future', 'Space for Life', 'Machines Helping Mankind'],
  },

  launch: {
    title: 'Launch Event | The Assisted Future Arrives',
    description: 'March/April 2026 — The historic moment when machines start truly helping mankind. Be there.',
    keywords: ['Launch Event', 'The Assisted Future', 'Teleco', 'March 2026'],
  },

  home: {
    title: 'Teleco | The Assisted Future',
    description: 'Machines helping mankind. A population of helpful teles giving humanity space for life. Help is here.',
    keywords: ['Teleco', 'The Assisted Future', 'Tele', 'Space for Life'],
  },
};

