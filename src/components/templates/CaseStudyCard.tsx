/**
 * CaseStudyCard
 * Client case study with results
 * 
 * USE WHEN: Proof points, customer success, "show me examples"
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Card is clickable → notifyTele
 */

import React from 'react';
import { Building2, ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface Result {
    metric: string;
    value: string;
}

interface CaseStudyCardProps {
    clientName: string;
    industry: string;
    challenge: string;
    solution: string;
    results: Result[];
    imageUrl?: string;
    imagePrompt?: string;
    actionPhrase: string;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
    clientName,
    industry,
    challenge,
    solution,
    results = [],
    imageUrl,
    imagePrompt,
    actionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = () => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            <div
                className="glass-card-featured glass-card-clickable group"
                onClick={handleAction}
            >
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Image/Logo section */}
                    <div className="flex-shrink-0 w-full md:w-1/3">
                        {(imageUrl || imagePrompt) ? (
                            <div className="aspect-video glass-image-container rounded-lg overflow-hidden">
                                <SmartImage
                                    assetId={imageUrl || imagePrompt || ''}
                                    alt={clientName}
                                    className="smart-image w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="aspect-video bg-mist/10 rounded-lg flex items-center justify-center">
                                <Building2 className="w-16 h-16 text-mist/30" />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-template-title text-xl">{clientName}</h3>
                            <span className="template-badge">{industry}</span>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div>
                                <span className="text-turmeric text-sm font-medium">Challenge:</span>
                                <p className="text-template-content">{challenge}</p>
                            </div>
                            <div>
                                <span className="text-jade text-sm font-medium">Solution:</span>
                                <p className="text-template-content">{solution}</p>
                            </div>
                        </div>

                        {/* Results */}
                        {results?.length > 0 && (
                            <div className="flex flex-wrap gap-4 mb-4">
                                {results.map((result, index) => (
                                    <div key={index} className="glass-card-minimal py-2 px-4">
                                        <div className="text-sapphire font-bold text-lg">{result.value}</div>
                                        <div className="text-template-content text-xs">{result.metric}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center text-sapphire font-medium group-hover:translate-x-1 transition-transform">
                            <span>View full case study</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaseStudyCard;
