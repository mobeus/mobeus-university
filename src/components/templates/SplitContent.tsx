/**
 * SplitContent
 * Image on one side, text content on the other.
 * Perfect for feature explanations and detailed breakdowns.
 * 
 * STYLING: Uses centralized CSS classes from index.css
 * - .glass-template-container for the main panel
 * - .glass-image-container for image section
 * - .btn-cta for CTA buttons
 * - .text-template-* for typography
 */

import React from "react";
import { ChevronRight, CheckCircle } from "lucide-react";
import { useSound } from "@/hooks/useSound";
import { notifyTele } from "@/utils/acknowledgmentHelpers";
import { SmartImage } from "@/components/ui/SmartImage";

interface BulletPoint {
    text: string;
    actionPhrase?: string;
}

interface SplitContentProps {
    title: string;
    subtitle?: string;
    content: string;
    bulletPoints?: (string | BulletPoint)[];
    imageUrl?: string;
    imagePrompt?: string;
    imagePosition?: "left" | "right";
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const SplitContent: React.FC<SplitContentProps> = ({
    title,
    subtitle,
    content,
    bulletPoints = [],
    imageUrl,
    imagePrompt,
    imagePosition = "left",
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const ImageSection = () => (
        <div className="flex-shrink-0 w-full md:w-2/5">
            <div className="aspect-video glass-image-container">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : imagePrompt ? (
                    // Live AI generation using SmartImage
                    <SmartImage
                        assetId={imagePrompt}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center p-4">
                        <p className="text-template-bullet text-center opacity-40">
                            Visual representation
                        </p>
                    </div>
                )}
            </div>
        </div>
    );

    const ContentSection = () => (
        <div className="flex-1 space-y-4">
            {/* Title & Subtitle */}
            <div>
                <h3 className="text-template-title mb-1">{title}</h3>
                {subtitle && (
                    <p className="text-template-subtitle">{subtitle}</p>
                )}
            </div>

            {/* Main Content */}
            <p className="text-template-content">{content}</p>

            {/* Bullet Points */}
            {bulletPoints.length > 0 && (
                <ul className="space-y-2">
                    {bulletPoints.map((point, idx) => {
                        const isObject = typeof point === "object";
                        const text = isObject ? point.text : point;
                        const actionPhrase = isObject ? point.actionPhrase : undefined;

                        return (
                            <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-flamingo mt-0.5 flex-shrink-0" />
                                {actionPhrase ? (
                                    <button
                                        onClick={() => handleAction(actionPhrase)}
                                        className="text-template-bullet hover:text-flamingo transition-colors text-left"
                                    >
                                        {text}
                                    </button>
                                ) : (
                                    <span className="text-template-bullet">{text}</span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}

            {/* CTA Button - Uses centralized .btn-cta class */}
            {ctaLabel && ctaActionPhrase && (
                <button
                    onClick={() => handleAction(ctaActionPhrase)}
                    className="btn-cta"
                >
                    {ctaLabel}
                    <ChevronRight className="w-4 h-4" />
                </button>
            )}
        </div>
    );

    return (
        <div className="glass-template-container">
            <div className={`flex flex-col md:flex-row gap-6 ${imagePosition === "right" ? "md:flex-row-reverse" : ""
                }`}>
                <ImageSection />
                <ContentSection />
            </div>
        </div>
    );
};

export default SplitContent;
