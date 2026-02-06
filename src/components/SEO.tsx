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
  title = 'CashCo Mortgage | Smart Financing for Smart Investors',
  description = 'Non-QM mortgages for rental income and fix-and-flip investments. Get your 30-day non-binding estimate today.',
  image = '/og-image.png',
  url = '/',
  type = 'website',
  keywords = ['CashCo', 'Non-QM Mortgage', 'Rental Property Financing', 'Fix and Flip Loans', 'Investment Property'],
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
    updateMetaTag('og:site_name', 'CashCo', true);

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

// Pre-configured SEO for sections - CashCo Mortgage Concierge
export const sectionSEO = {
  welcome: {
    title: 'CashCo Mortgage | Smart Financing for Smart Investors',
    description: 'Non-QM mortgages for rental income and fix-and-flip investments. Get your 30-day non-binding estimate.',
    keywords: ['CashCo', 'Non-QM Mortgage', 'Rental Property Financing', 'Fix and Flip Loans', 'Investment Property'],
  },

  rental: {
    title: 'Purchase to Rent Financing | CashCo Mortgage',
    description: 'Long-term rental income strategy. Flexible non-QM terms for investment property financing.',
    keywords: ['Rental Property Financing', 'Non-QM Loans', 'Investment Property', 'Purchase to Rent'],
  },

  flip: {
    title: 'Purchase to Flip Financing | CashCo Mortgage',
    description: 'Short-term renovation profits. Quick turnaround financing for fix-and-flip investors.',
    keywords: ['Fix and Flip Loans', 'Renovation Financing', 'House Flipping', 'Short-term Investment'],
  },

  estimate: {
    title: 'Get Your Mortgage Estimate | CashCo',
    description: 'Calculate your mortgage in minutes. Non-binding estimate valid for 30 days.',
    keywords: ['Mortgage Calculator', 'Mortgage Estimate', 'Non-Binding Quote', 'CashCo'],
  },

  home: {
    title: 'CashCo Mortgage | Smart Financing for Smart Investors',
    description: 'Specialized in non-QM financing for rental and flip properties.',
    keywords: ['CashCo', 'Investment Property Financing', 'Non-QM Mortgage'],
  },
};
