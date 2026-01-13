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
  title = 'Mobeus Conversational Product',
  description = 'Every company will become a conversational company. Explore how automotive operations transform through conversational AI and agentic labor across real-world applications.',
  image = 'https://ngre-proposal.lovable.app/og-image.jpg',
  url = 'https://ngre-proposal.lovable.app',
  type = 'website',
  keywords = ['conversational transformation', 'automotive AI', 'agentic labor', 'conversational company', 'Richie Etwaru', 'auto transformation', 'conversational AI', 'Tele'],
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
    updateMetaTag('og:site_name', 'The Conversational Transformation', true);

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

// Pre-configured SEO for sections
export const sectionSEO = {
  welcome: {
    title: 'Every Company Will Become a Conversational Company | Richie Etwaru',
    description: 'Experience automotive transformation through conversation. Explore AI applications across Internal, Partner, and Customer touchpoints—guided by Tele, the conversational transformation agent.',
    keywords: ['conversational transformation', 'conversational company', 'automotive AI', 'Richie Etwaru', 'agentic labor', 'Tele', 'auto digital transformation'],
  },

  starter: {
    title: 'Teleglass Platform | AI Architecture Overview',
    description: 'Explore the Teleglass platform: unified AI architecture with Any Model, Any Cloud, and Any Experience layers.',
    keywords: ['Teleglass', 'AI platform', 'virtual assistant', 'enterprise AI', 'multi-modal AI'],
  },

  'take-message': {
    title: 'Leave a Message | Teleglass',
    description: 'Request additional information, clarify details, or leave a message about our RFP proposal.',
    keywords: ['contact', 'message', 'RFP questions', 'information request', 'clarification'],
  },

  'scheduling': {
    title: 'Schedule a Meeting | Teleglass',
    description: 'Book a collaborative workshop, engagement check-in, or Q&A session with our team.',
    keywords: ['schedule meeting', 'book consultation', 'collaborative workshop', 'Q&A session'],
  },

  'role-play': {
    title: 'Role-Play Practice | Teleglass',
    description: 'Practice different conversation scenarios with AI personalities to refine your presentation approach.',
    keywords: ['role-play', 'practice', 'conversation scenarios', 'AI training', 'presentation skills'],
  },

  'dynamic-evidence': {
    title: 'Security & Compliance Evidence | Mercedes-Benz',
    description: 'Comprehensive security and compliance documentation for Mercedes-Benz digital platforms.',
    keywords: ['security', 'compliance', 'SOC 2', 'GDPR', 'enterprise security'],
  },

  'any-model': {
    title: 'Any Model | Teleglass - Unified AI Model Layer',
    description: 'Enable any tele to work with any model provider across text, audio, and visual modalities. Support for OpenAI, Anthropic, Mistral, Google, ElevenLabs, and more.',
    keywords: ['AI models', 'LLM', 'speech to text', 'text to speech', 'lip sync', 'model interoperability', 'Teleglass'],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Teleglass - Any Model Layer',
      provider: { '@type': 'Organization', name: 'Teleglass' },
      serviceType: 'AI Model Integration',
      description: 'Unified AI model layer supporting any model provider across modalities',
    },
  },

  'any-cloud': {
    title: 'Any Cloud | Teleglass - Enterprise Integration Layer',
    description: 'Connect teles directly to business logic, data, and workflows across any enterprise system. Support for 6,000+ MCP servers including Mercedes-Benz, Workday, ServiceNow, and more.',
    keywords: ['enterprise cloud', 'CRM integration', 'ERP', 'MCP servers', 'Mercedes-Benz', 'Workday', 'ServiceNow', 'Teleglass'],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Teleglass - Any Cloud Layer',
      provider: { '@type': 'Organization', name: 'Teleglass' },
      serviceType: 'Enterprise System Integration',
      description: 'Connect to any enterprise cloud and 6,000+ MCP servers',
    },
  },

  'any-experience': {
    title: 'Any Experience | Teleglass - Guided Interaction Layer',
    description: 'Experience the pinnacle of automotive luxury, innovation, and performance with Mercedes-Benz.',
    keywords: ['sales automation', 'customer service', 'employee training', 'AI experience', 'Teleglass', 'NPS', 'FCR'],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Teleglass - Any Experience Layer',
      provider: { '@type': 'Organization', name: 'Teleglass' },
      serviceType: 'Guided AI Interaction',
      description: 'Measurable outcomes across sales, service, and training',
    },
  },

  'accenture-services': {
    title: 'Professional Services | Pricing',
    description: 'Comprehensive implementation services for digital transformation including discovery, build, deployment, and hypercare support.',
    keywords: ['implementation services', 'implementation pricing', 'professional services', 'digital transformation', 'fixed-price model'],
  },

  'accenture-partnership': {
    title: 'Strategic Partnership | Innovation Alliance',
    description: 'Strategic partnership delivering industry-leading implementations and innovations.',
    keywords: ['strategic partnership', 'innovation alliance', 'platinum partner', 'implementation excellence'],
  },

  'accenture-experience': {
    title: 'Experience | Success Stories & Case Studies',
    description: 'Proven implementation experience across automotive and enterprise sectors with measurable results.',
    keywords: ['experience', 'case studies', 'implementations', 'success stories', 'proven results'],
  },

  'accenture-innovation': {
    title: 'Innovation | AI & Technology Leadership',
    description: 'Leading AI innovation and technology capabilities for digital implementations including generative AI and process automation.',
    keywords: ['innovation', 'AI capabilities', 'generative AI', 'technology leadership', 'innovation centers'],
  },

  'salesforce-platform': {
    title: 'Platform Architecture | Cloud Infrastructure',
    description: 'Comprehensive cloud platform with custom objects, Experience Cloud, and advanced integration capabilities.',
    keywords: ['cloud platform', 'platform architecture', 'custom objects', 'Experience Cloud'],
  },

  'salesforce-licensing': {
    title: 'Licensing | Platform License Types & Costs',
    description: 'Detailed breakdown of licensing options including Enterprise and Platform licenses.',
    keywords: ['licenses', 'platform licensing', 'license costs', 'user licenses'],
  },

  'resource-allocation': {
    title: 'Resource Allocation | Project Team Scaling',
    description: 'Dedicated team resource allocation across discovery, build, deploy, and hypercare phases for optimal project delivery.',
    keywords: ['resource allocation', 'team scaling', 'FTE allocation', 'project resources', 'implementation team'],
  },

  'client-success-stories': {
    title: 'Client Success Stories | Proven Implementation Results',
    description: 'Real transformation stories from implementations across automotive and retail industries.',
    keywords: ['client success', 'success stories', 'implementation results', 'customer testimonials', 'transformation outcomes'],
  },

  'industry-recognition': {
    title: 'Industry Recognition | Awards & Certifications',
    description: 'Award-winning expertise with platinum partnership status, industry recognition, and certified professionals.',
    keywords: ['industry awards', 'certifications', 'partner recognition', 'industry excellence', 'professional certifications'],
  },

  'support-coverage': {
    title: 'Global Support Coverage | 24x7 Support Services',
    description: 'Comprehensive global support with 24x7 coverage, follow-the-sun model, and 12 global support centers.',
    keywords: ['global support', '24x7 support', 'support coverage', 'follow-the-sun', 'support tiers'],
  },

  'service-level-agreements': {
    title: 'Service Level Agreements | Performance Guarantees',
    description: 'Committed SLAs with 99.9% uptime guarantee, 4-hour critical issue resolution, and financial accountability.',
    keywords: ['SLA', 'service level agreement', 'uptime guarantee', 'performance commitments', 'support SLA'],
  },

  'continuous-optimization': {
    title: 'Continuous Optimization | Ongoing Value Enhancement',
    description: 'Systematic optimization program delivering 20-35% additional annual value through continuous monitoring and improvement.',
    keywords: ['continuous optimization', 'ongoing improvement', 'value enhancement', 'optimization program', 'performance tuning'],
  },

  'outcomes-delivered': {
    title: 'Outcomes Delivered | Measurable Business Results',
    description: 'Proven business outcomes with $15M-$22M average annual value delivered across revenue, efficiency, and customer experience.',
    keywords: ['business outcomes', 'measurable results', 'ROI metrics', 'delivered value', 'performance metrics'],
  },

  'support-maintenance': {
    title: 'Support & Maintenance | Ongoing Service Plans',
    description: 'Comprehensive support and maintenance services ensuring platform stability, optimization, and continuous improvement.',
    keywords: ['support maintenance', 'ongoing support', 'maintenance plans', 'platform support', 'service plans'],
  },

  'training-investment': {
    title: 'Training Investment | Learning & Enablement Programs',
    description: 'Comprehensive training programs ensuring user adoption, skill development, and platform proficiency.',
    keywords: ['training investment', 'learning programs', 'user training', 'enablement', 'skill development'],
  },

  'training-pricing': {
    title: 'Training Pricing | Program Options & Costs',
    description: 'Flexible training program pricing with options for end-user, administrator, and developer training.',
    keywords: ['training pricing', 'training costs', 'learning programs', 'training options', 'enablement pricing'],
  },

  'delivery-team': {
    title: 'Delivery Team | Expert Project Organization',
    description: 'Dedicated delivery team with specialized roles ensuring successful implementation.',
    keywords: ['delivery team', 'project team', 'team structure', 'expert resources', 'implementation team'],
  },

  'business-objectives': {
    title: 'Business Objectives | Strategic Goals & Outcomes',
    description: 'Aligned business objectives driving transformation success and measurable value delivery.',
    keywords: ['business objectives', 'strategic goals', 'target outcomes', 'business goals', 'success criteria'],
  },

  'business-outcomes': {
    title: 'Business Outcomes | Expected Results & Value',
    description: 'Quantified business outcomes with clear metrics, timelines, and value realization expectations.',
    keywords: ['business outcomes', 'expected results', 'outcome metrics', 'value delivery', 'success metrics'],
  },

  'strategic-alignment': {
    title: 'Strategic Alignment | Business Strategy Integration',
    description: 'Solution alignment with organizational strategy ensuring long-term value and business transformation.',
    keywords: ['strategic alignment', 'business alignment', 'strategic fit', 'strategy integration', 'transformation alignment'],
  },

  'rfp-requirements': {
    title: 'RFP Requirements | Complete Requirements Coverage',
    description: 'Comprehensive mapping and coverage of all RFP requirements with detailed responses and evidence.',
    keywords: ['RFP requirements', 'requirements coverage', 'compliance', 'requirement mapping', 'RFP response'],
  },

  'knowledge-transfer': {
    title: 'Knowledge Transfer | Documentation & Handover',
    description: 'Comprehensive knowledge transfer ensuring team capability, documentation, and successful platform ownership.',
    keywords: ['knowledge transfer', 'documentation', 'training handover', 'knowledge sharing', 'platform documentation'],
  },

  'implementation-phase': {
    title: 'Implementation Phases | Delivery Methodology',
    description: 'Structured implementation approach across discovery, build, deployment, and hypercare phases.',
    keywords: ['implementation phases', 'delivery approach', 'project phases', 'implementation methodology', 'phased delivery'],
  },
};
