/**
 * VehicleShowcase
 * Displays a vehicle with a live AI-generated image and key specs
 * 
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Every clickable element calls notifyTele()
 */

import React from 'react';
import { Car, Zap, Gauge, DollarSign, Settings, Fuel } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface VehicleSpec {
    label: string;
    value: string;
    icon?: 'power' | 'speed' | 'price' | 'engine' | 'fuel' | 'drivetrain';
    actionPhrase?: string;
}

interface VehicleShowcaseProps {
    /** Vehicle model name (e.g., "Mercedes-Benz GLC 300") */
    model: string;
    /** Vehicle tagline or class (e.g., "Midsize Luxury SUV") */
    tagline?: string;
    /** Starting MSRP */
    price?: string;
    /** Image prompt for AI generation (describe the vehicle) */
    imagePrompt?: string;
    /** Pre-generated image URL (optional, falls back to imagePrompt) */
    imageUrl?: string;
    /** Key specifications */
    specs?: VehicleSpec[];
    /** Highlight features */
    highlights?: string[];
    /** Primary CTA */
    ctaLabel?: string;
    ctaActionPhrase?: string;
    /** Secondary actions */
    secondaryActions?: Array<{
        label: string;
        actionPhrase: string;
    }>;
}

const ICON_MAP = {
    power: Zap,
    speed: Gauge,
    price: DollarSign,
    engine: Settings,
    fuel: Fuel,
    drivetrain: Car,
};

export const VehicleShowcase: React.FC<VehicleShowcaseProps> = ({
    model,
    tagline,
    price,
    imagePrompt,
    imageUrl,
    specs = [],
    highlights = [],
    ctaLabel = "Configure This Vehicle",
    ctaActionPhrase,
    secondaryActions = [],
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    // Generate a descriptive image prompt if only model is provided
    const effectiveImagePrompt = imageUrl || imagePrompt ||
        `A stunning ${model} luxury vehicle, professional automotive photography, dramatic lighting, showroom quality, 3/4 front angle view, dark elegant background`;

    return (
        <div className="glass-template-container">
            {/* Hero Section with Image */}
            <div className="relative mb-8">
                {/* Vehicle Image - AI Generated */}
                <div className="glass-image-container rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <SmartImage
                        assetId={effectiveImagePrompt}
                        alt={model}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Price Badge Overlay */}
                {price && (
                    <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full border border-mist/20">
                        <span className="text-jade font-bold text-lg">From {price}</span>
                    </div>
                )}
            </div>

            {/* Vehicle Title */}
            <div className="mb-6">
                <h2 className="text-template-title text-3xl font-bold mb-2">{model}</h2>
                {tagline && (
                    <p className="text-template-subtitle text-lg">{tagline}</p>
                )}
            </div>

            {/* Key Specs Grid */}
            {specs.length > 0 && (
                <div className="template-grid-3 mb-6">
                    {specs.map((spec, index) => {
                        const IconComponent = spec.icon ? ICON_MAP[spec.icon] : Car;
                        return (
                            <div
                                key={index}
                                className={`glass-card-minimal p-4 text-center ${spec.actionPhrase ? 'glass-card-clickable' : ''}`}
                                onClick={() => spec.actionPhrase && handleAction(spec.actionPhrase)}
                            >
                                <IconComponent className="w-6 h-6 text-flamingo mx-auto mb-2" />
                                <div className="text-mist font-bold text-xl">{spec.value}</div>
                                <div className="text-mist/60 text-sm">{spec.label}</div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Highlights */}
            {highlights.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-template-content text-sm uppercase tracking-wider mb-3 text-mist/50">Key Features</h3>
                    <div className="flex flex-wrap gap-2">
                        {highlights.map((highlight, index) => (
                            <span
                                key={index}
                                className="template-badge-mist px-3 py-1 rounded-full text-sm"
                            >
                                {highlight}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Divider */}
            <div className="template-divider my-6" />

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
                {ctaActionPhrase && (
                    <button
                        className="btn-cta flex-1 min-w-[200px]"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                    </button>
                )}

                {secondaryActions.map((action, index) => (
                    <button
                        key={index}
                        className="btn-ghost flex-1 min-w-[150px]"
                        onClick={() => handleAction(action.actionPhrase)}
                    >
                        {action.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default VehicleShowcase;
