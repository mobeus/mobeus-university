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
  title = 'AI/Works | Thoughtworks Agentic Delivery Platform',
  description = 'Transform trapped technical debt into modern, AI-ready systems. 30 years of Thoughtworks architectural wisdom, now encoded into intelligent agents.',
  image = '/og-image.png',
  url = '/',
  type = 'website',
  keywords = ['AI/Works', 'Thoughtworks', 'Agentic AI', 'Super Spec', 'Legacy Modernization', 'Enterprise AI', '3-3-3 Delivery'],
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
    updateMetaTag('og:site_name', 'AI/Works by Thoughtworks', true);

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

// Pre-configured SEO for sections - AI/Works Internal Enablement
export const sectionSEO = {
  welcome: {
    title: 'AI/Works | Thoughtworks Agentic Delivery Platform',
    description: 'Transform trapped technical debt into modern, AI-ready systems. The Super Spec Engine—specification first, code follows, zero technical debt.',
    keywords: ['AI/Works', 'Thoughtworks', 'Super Spec', 'agentic AI', 'enterprise transformation'],
  },

  value: {
    title: 'Value Proposition | AI/Works',
    description: 'Discover how AI/Works solves critical enterprise challenges—legacy modernization, zero technical debt, and 3-3-3 delivery model.',
    keywords: ['value proposition', 'legacy modernization', 'zero technical debt', 'enterprise AI'],
  },

  platform: {
    title: 'Platform Overview | AI/Works',
    description: 'Explore the 10 components of AI/Works: from reverse engineering to AIOps, the complete agentic development platform.',
    keywords: ['platform overview', 'Super Spec', 'CodeConcise', 'Control Plane', 'AIOps'],
  },

  benefits: {
    title: 'Key Benefits | AI/Works',
    description: 'Key capabilities that drive enterprise success: 40-60% cost reduction, 3-4 developers delivering 20x output, 90-day production.',
    keywords: ['benefits', 'ROI', 'cost reduction', 'developer productivity', 'enterprise efficiency'],
  },

  pricing: {
    title: 'Pricing & Engagement | AI/Works',
    description: 'Transparent 3-3-3 pricing model: $675K validation, $1.2M prototype, $2.35M production. Fixed-price confidence.',
    keywords: ['pricing', '3-3-3 model', 'engagement', 'fixed price', 'enterprise investment'],
  },

  'next-steps': {
    title: 'Next Steps | AI/Works',
    description: 'Ready to transform your development? Schedule a deep dive with our architecture team or identify your pilot use case.',
    keywords: ['next steps', 'contact', 'schedule demo', 'pilot program'],
  },

  competitive: {
    title: 'Competitive Positioning | AI/Works',
    description: 'How AI/Works beats the competition: legacy + greenfield, 30 years of wisdom, production-grade quality in 90 days.',
    keywords: ['competitive', 'vs Globant', 'vs Ascendion', 'vs Deloitte', 'differentiation'],
  },

  technical: {
    title: 'Technical Architecture | AI/Works',
    description: 'Deep dive into the Super Spec Engine, Control Plane, Context Library, and the 10-component AI/Works architecture.',
    keywords: ['technical', 'architecture', 'Super Spec', 'Control Plane', 'AIOps'],
  },

  security: {
    title: 'Security & Compliance | AI/Works',
    description: 'Enterprise-grade security shifted left: OWASP Top 10, HIPAA, GDPR, SOX, PCI-DSS compliance baked into generation.',
    keywords: ['security', 'compliance', 'HIPAA', 'GDPR', 'enterprise security'],
  },

  casestudies: {
    title: 'Case Studies | AI/Works',
    description: 'Real enterprise transformations: healthcare claims modernization, retail omnichannel platforms, financial services.',
    keywords: ['case studies', 'success stories', 'healthcare', 'retail', 'financial services'],
  },
};
