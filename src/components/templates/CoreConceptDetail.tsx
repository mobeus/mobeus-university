/**
 * CoreConceptDetail
 * Deep dive into a single core concept with live-generated imagery
 * Shows comprehensive explanation with What/Why/How/Example structure
 * 
 * USE WHEN: Explaining a single core concept in detail
 * PROPS: { 
 *   name, 
 *   tagline?,
 *   imagePrompt?, 
 *   what, 
 *   why, 
 *   how, 
 *   example?, 
 *   codeSnippet?,
 *   tips?[],
 *   relatedConcepts?[{ name, actionPhrase }],
 *   ctaLabel?, 
 *   ctaActionPhrase? 
 * }
 */

import React from 'react';
import {
    HelpCircle,
    Lightbulb,
    Wrench,
    Quote,
    Code,
    Star,
    ChevronRight,
    ArrowRight,
    Sparkles
} from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface RelatedConcept {
    name: string;
    actionPhrase: string;
}

interface CoreConceptDetailProps {
    name?: string;
    tagline?: string;
    imagePrompt?: string;
    what?: string;
    why?: string;
    how?: string;
    example?: string;
    codeSnippet?: string;
    tips?: string[];
    relatedConcepts?: RelatedConcept[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const CoreConceptDetail: React.FC<CoreConceptDetailProps> = ({
    name = 'Core Concept',
    tagline = 'Understanding this concept is key to building your tele',
    imagePrompt,
    what = 'This concept represents a fundamental building block.',
    why = 'Understanding this will help you build better tele experiences.',
    how = 'You will use this throughout the hackathon.',
    example,
    codeSnippet,
    tips = [],
    relatedConcepts = [],
    ctaLabel = 'Continue Learning',
    ctaActionPhrase = 'Show me the next concept',
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    // Generate a smart image prompt if not provided
    const effectiveImagePrompt = imagePrompt ||
        `Abstract 3D visualization representing "${name}" concept, glowing blue and purple, futuristic tech aesthetic, clean minimal design, dark background with light accents`;

    return (
        <div className="glass-template-container">
            {/* Hero Section with Live Generated Image */}
            <div className="relative mb-8 rounded-2xl overflow-hidden">
                <div className="aspect-[21/9] w-full">
                    <SmartImage
                        assetId={effectiveImagePrompt}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/50 to-transparent" />

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="template-badge mb-3">CORE CONCEPT</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-mist mb-2">{name}</h1>
                    <p className="text-mist/80 text-lg max-w-2xl">{tagline}</p>
                </div>
            </div>

            {/* What/Why/How Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* What */}
                <div
                    className="glass-card-standard p-6 glass-card-clickable group"
                    onClick={() => handleAction(`Tell me more about what ${name} is`)}
                >
                    <div className="w-12 h-12 rounded-xl bg-sapphire/20 flex items-center justify-center mb-4">
                        <HelpCircle className="w-6 h-6 text-sapphire" />
                    </div>
                    <h3 className="text-sapphire font-bold text-lg mb-2">What is it?</h3>
                    <p className="text-mist/80 text-base leading-relaxed">{what}</p>
                    <div className="flex items-center text-sapphire text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                </div>

                {/* Why */}
                <div
                    className="glass-card-standard p-6 glass-card-clickable group"
                    onClick={() => handleAction(`Tell me more about why ${name} matters`)}
                >
                    <div className="w-12 h-12 rounded-xl bg-turmeric/20 flex items-center justify-center mb-4">
                        <Lightbulb className="w-6 h-6 text-turmeric" />
                    </div>
                    <h3 className="text-turmeric font-bold text-lg mb-2">Why does it matter?</h3>
                    <p className="text-mist/80 text-base leading-relaxed">{why}</p>
                    <div className="flex items-center text-turmeric text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                </div>

                {/* How */}
                <div
                    className="glass-card-standard p-6 glass-card-clickable group"
                    onClick={() => handleAction(`Show me how to use ${name}`)}
                >
                    <div className="w-12 h-12 rounded-xl bg-jade/20 flex items-center justify-center mb-4">
                        <Wrench className="w-6 h-6 text-jade" />
                    </div>
                    <h3 className="text-jade font-bold text-lg mb-2">How will you use it?</h3>
                    <p className="text-mist/80 text-base leading-relaxed">{how}</p>
                    <div className="flex items-center text-jade text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                </div>
            </div>

            {/* Example Section */}
            {example && (
                <div className="glass-card-minimal p-6 mb-6 border-l-4 border-flamingo">
                    <div className="flex items-start gap-4">
                        <Quote className="w-8 h-8 text-flamingo flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-flamingo font-bold text-lg mb-2">Real Example</h3>
                            <p className="text-mist/90 text-base italic leading-relaxed">{example}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Code Snippet */}
            {codeSnippet && (
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <Code className="w-5 h-5 text-wave" />
                        <h3 className="text-wave font-bold">Code Example</h3>
                    </div>
                    <div className="glass-card-minimal p-4 rounded-xl">
                        <pre className="text-sm text-mist/90 font-mono overflow-x-auto whitespace-pre-wrap">
                            {codeSnippet}
                        </pre>
                    </div>
                </div>
            )}

            {/* Tips Section */}
            {tips.length > 0 && (
                <div className="glass-card-standard p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 text-turmeric" />
                        <h3 className="text-turmeric font-bold">Pro Tips</h3>
                    </div>
                    <ul className="space-y-3">
                        {tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <Sparkles className="w-4 h-4 text-turmeric/70 flex-shrink-0 mt-1" />
                                <span className="text-mist/80">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Related Concepts */}
            {relatedConcepts.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-mist/60 text-sm font-semibold uppercase tracking-wider mb-4">
                        Related Concepts
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {relatedConcepts.map((related, index) => (
                            <button
                                key={index}
                                className="glass-card-minimal px-4 py-2 rounded-full text-sm text-sapphire hover:bg-sapphire/20 transition-colors flex items-center gap-2"
                                onClick={() => handleAction(related.actionPhrase)}
                            >
                                {related.name}
                                <ChevronRight className="w-3 h-3" />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* CTA Button */}
            <button
                className="btn-cta w-full py-4 text-lg flex items-center justify-center gap-2"
                onClick={() => handleAction(ctaActionPhrase)}
            >
                {ctaLabel}
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default CoreConceptDetail;
