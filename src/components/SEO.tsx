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
  title = 'Fiserv DMA | Digital Merchant Acquisition Platform',
  description = 'Enterprise sales guide for banks evaluating merchant acquiring solutions. Explore the complete merchant lifecycle from onboarding to long-term relationship management.',
  image = '/og-image.jpg',
  url = '/',
  type = 'website',
  keywords = ['merchant acquiring', 'digital merchant acquisition', 'Fiserv', 'payment processing', 'bank solutions', 'enterprise sales'],
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
    updateMetaTag('og:site_name', 'Fiserv DMA', true);

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

// Pre-configured SEO for sections - Fiserv DMA Buyer Journey
export const sectionSEO = {
  welcome: {
    title: 'Fiserv DMA | Digital Merchant Acquisition Platform',
    description: 'Guide your bank through the complete merchant lifecycle—from onboarding to long-term relationship management. Powered by Tele, your enterprise sales guide.',
    keywords: ['Fiserv', 'merchant acquisition', 'digital onboarding', 'payment processing', 'enterprise sales'],
  },

  value: {
    title: 'Value Proposition | Fiserv DMA',
    description: 'Discover how the Fiserv DMA platform solves critical challenges in merchant acquiring—reducing risk, increasing revenue, and strengthening relationships.',
    keywords: ['value proposition', 'merchant problems', 'bank solutions', 'risk reduction', 'revenue growth'],
  },

  platform: {
    title: 'Platform Overview | Fiserv DMA',
    description: 'Explore the complete merchant lifecycle: onboarding, activation, operations, settlement, and relationship management.',
    keywords: ['platform overview', 'merchant lifecycle', 'onboarding', 'transaction processing', 'settlement'],
  },

  benefits: {
    title: 'Key Benefits | Fiserv DMA',
    description: 'Key capabilities that drive bank success: fast onboarding, real-time visibility, fee transparency, and merchant retention tools.',
    keywords: ['benefits', 'capabilities', 'fast onboarding', 'fee transparency', 'merchant retention'],
  },

  pricing: {
    title: 'Fee Structure | Fiserv DMA',
    description: 'Transparent fee structure and pricing flexibility for merchant acquiring programs.',
    keywords: ['pricing', 'fee structure', 'merchant fees', 'interchange', 'processing costs'],
  },

  'next-steps': {
    title: 'Next Steps | Fiserv DMA',
    description: 'Ready to learn more? Schedule a conversation with our sales team or explore specific platform capabilities.',
    keywords: ['next steps', 'contact sales', 'schedule demo', 'learn more'],
  },

  onboarding: {
    title: 'Merchant Onboarding | Fiserv DMA',
    description: 'Digital-first merchant onboarding with automated underwriting, KYC verification, and compliance workflows.',
    keywords: ['merchant onboarding', 'KYC', 'compliance', 'underwriting', 'digital application'],
  },

  activation: {
    title: 'Merchant Activation | Fiserv DMA',
    description: 'Get merchants live quickly with device fulfillment tracking, approval visibility, and first transaction confirmation.',
    keywords: ['merchant activation', 'go-live', 'device fulfillment', 'first transaction'],
  },

  operations: {
    title: 'Transaction Operations | Fiserv DMA',
    description: 'Real-time transaction visibility, card type analysis, and self-service merchant portals.',
    keywords: ['transaction operations', 'payment processing', 'card types', 'merchant portal'],
  },

  settlement: {
    title: 'Settlement & Fees | Fiserv DMA',
    description: 'Itemized fee transparency, gross-to-net breakdowns, and automated reconciliation.',
    keywords: ['settlement', 'fees', 'reconciliation', 'funding', 'chargebacks'],
  },

  relationship: {
    title: 'Merchant Relationships | Fiserv DMA',
    description: 'Tools that position your bank as a financial partner—historical trends, proactive alerts, and growth opportunities.',
    keywords: ['merchant relationships', 'retention', 'account management', 'growth'],
  },
};
