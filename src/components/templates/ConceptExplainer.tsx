/**
 * ConceptExplainer
 * Explains a concept with What/Why/How structure
 * Perfect for teaching tele concepts before hackathon
 * 
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Every clickable element calls notifyTele()
 */

import React from 'react';
import { HelpCircle, Lightbulb, Wrench, ChevronRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ConceptExplainerProps {
    title?: string;
    badge?: string;
    what?: string;
    why?: string;
    how?: string;
    example?: string;
    imageUrl?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const ConceptExplainer: React.FC<ConceptExplainerProps> = ({
    title = 'Concept',
    badge = 'KEY CONCEPT',
    what = 'What this concept is',
    why = 'Why it matters for your tele',
    how = 'How you will use it at the hackathon',
    example,
    imageUrl,
    ctaLabel = 'Continue',
    ctaActionPhrase = 'Go home'
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            {/* Header */}
            <div className="text-left mb-8">
                <span className="template-badge inline-block mb-4">{badge}</span>
                <h2 className="text-template-title text-3xl">{title}</h2>
            </div>

            {/* Optional Image */}
            {imageUrl && (
                <div className="glass-image-container mb-8">
                    <img src={imageUrl} alt={title} className="w-full rounded-xl" />
                </div>
            )}

            {/* What/Why/How Grid */}
            <div className="grid gap-6 mb-8">
                {/* What */}
                <div
                    className="glass-card-standard p-6 glass-card-clickable"
                    onClick={() => handleAction(`Tell me more about what ${title} is`)}
                >
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-sapphire/20 flex items-center justify-center flex-shrink-0">
                            <HelpCircle className="w-6 h-6 text-sapphire" />
                        </div>
                        <div>
                            <h3 className="text-template-subtitle text-sapphire mb-2">What is it?</h3>
                            <p className="text-template-content">{what}</p>
                        </div>
                    </div>
                </div>

                {/* Why */}
                <div
                    className="glass-card-standard p-6 glass-card-clickable"
                    onClick={() => handleAction(`Tell me more about why ${title} matters`)}
                >
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-turmeric/20 flex items-center justify-center flex-shrink-0">
                            <Lightbulb className="w-6 h-6 text-turmeric" />
                        </div>
                        <div>
                            <h3 className="text-template-subtitle text-turmeric mb-2">Why does it matter?</h3>
                            <p className="text-template-content">{why}</p>
                        </div>
                    </div>
                </div>

                {/* How */}
                <div
                    className="glass-card-standard p-6 glass-card-clickable"
                    onClick={() => handleAction(`Show me how ${title} works`)}
                >
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-jade/20 flex items-center justify-center flex-shrink-0">
                            <Wrench className="w-6 h-6 text-jade" />
                        </div>
                        <div>
                            <h3 className="text-template-subtitle text-jade mb-2">How will you use it?</h3>
                            <p className="text-template-content">{how}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Example (optional) */}
            {example && (
                <div className="glass-card-minimal p-6 mb-8 border-l-4 border-flamingo">
                    <h3 className="text-template-subtitle text-flamingo mb-2">Example</h3>
                    <p className="text-template-content italic">{example}</p>
                </div>
            )}

            {/* CTA */}
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

export default ConceptExplainer;
