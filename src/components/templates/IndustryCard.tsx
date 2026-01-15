/**
 * IndustryCard
 * Industry-specific information
 * 
 * USE WHEN: Vertical focus, industry capabilities, "do you work in X industry"
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Card is clickable → notifyTele
 */

import React from 'react';
import { Building2, ArrowRight, Check } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface IndustryCardProps {
    industry: string;
    headline: string;
    description: string;
    capabilities?: string[];
    clients?: string[];
    imageUrl?: string;
    imagePrompt?: string;
    actionPhrase: string;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({
    industry,
    headline,
    description,
    capabilities = [],
    clients = [],
    imageUrl,
    imagePrompt,
    actionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = () => {
        playClick();
        notifyTele(actionPhrase);
    };

    const hasImage = imageUrl || imagePrompt;

    return (
        <div className="glass-template-container">
            <div className="glass-card-featured glass-card-clickable" onClick={handleAction}>
                <div className={`flex ${hasImage ? 'flex-col md:flex-row' : 'flex-col'} gap-6`}>
                    {/* Image */}
                    {hasImage && (
                        <div className="flex-shrink-0 w-full md:w-1/3">
                            <div className="aspect-square glass-image-container rounded-lg overflow-hidden">
                                <SmartImage
                                    assetId={imageUrl || imagePrompt || ''}
                                    alt={industry}
                                    className="smart-image w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <Building2 className="w-6 h-6 text-sapphire" />
                            <span className="template-badge-sapphire">{industry}</span>
                        </div>

                        <h3 className="text-template-title text-xl mb-2">{headline}</h3>
                        <p className="text-template-content mb-4">{description}</p>

                        {/* Capabilities */}
                        {capabilities?.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-turmeric text-xs font-medium uppercase mb-2">Key Capabilities</h4>
                                <div className="flex flex-wrap gap-2">
                                    {capabilities.map((cap, index) => (
                                        <span key={index} className="glass-card-minimal py-1 px-3 text-sm flex items-center gap-1">
                                            <Check className="w-3 h-3 text-jade" />
                                            {cap}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Clients */}
                        {clients?.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-mist/60 text-xs font-medium uppercase mb-2">Reference Clients</h4>
                                <p className="text-template-content text-sm">{clients.join(', ')}</p>
                            </div>
                        )}

                        <div className="flex items-center text-sapphire font-medium">
                            <span>Explore {industry} solutions</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndustryCard;
