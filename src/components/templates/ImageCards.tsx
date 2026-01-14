/**
 * ImageCards
 * Display merchant offers with 16:9 images at the top, dark glass styling
 * Design: Image fills top of card edge-to-edge, content below
 */

import React from "react";
import { TrendingUp, DollarSign, CreditCard, Zap } from "lucide-react";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";

interface OfferCard {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    imageUrl?: string;
    icon?: string;
    badge?: string;
    ctaLabel?: string;
    actionPhrase?: string;
}

interface ImageCardsProps {
    offers: OfferCard[];
    columns?: 2 | 3 | 4;
    animationClass?: string;
    isExiting?: boolean;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
    trending: TrendingUp,
    dollar: DollarSign,
    card: CreditCard,
    zap: Zap,
};

// Default placeholder images for Fiserv offers
const defaultImages: Record<string, string> = {
    "clover-pos": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop&q=80",
    "clover-capital": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=450&fit=crop&q=80",
    "credit-line": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop&q=80",
    "default": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&q=80",
};

export const ImageCards: React.FC<ImageCardsProps> = ({
    offers = [],
    columns = 3,
    animationClass = "",
    isExiting = false,
}) => {
    const { playClick } = useSound();

    const handleOfferClick = (offer: OfferCard) => {
        playClick();
        if (offer.actionPhrase) {
            sendToTele(offer.actionPhrase);
        }
    };

    const getImageUrl = (offer: OfferCard): string => {
        if (offer.imageUrl) return offer.imageUrl;
        return defaultImages[offer.id] || defaultImages["default"];
    };

    const gridCols = {
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    };

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
                {offers.map((offer, index) => {
                    const IconComponent = iconMap[offer.icon || "zap"] || Zap;

                    return (
                        <div
                            key={offer.id}
                            onClick={() => handleOfferClick(offer)}
                            className={`
                                group relative overflow-hidden rounded-2xl
                                bg-white/5 border border-white/10
                                backdrop-blur-sm
                                transition-all duration-500 ease-out
                                hover:bg-white/10 hover:border-white/20
                                hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                                hover:-translate-y-1
                                ${offer.actionPhrase ? "cursor-pointer" : ""}
                                animate-fade-in
                            `}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* 16:9 Image Container - Full Width */}
                            <div className="relative w-full aspect-video overflow-hidden">
                                <img
                                    src={getImageUrl(offer)}
                                    alt={offer.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                {/* Badge */}
                                {offer.badge && (
                                    <div className="absolute top-3 left-3 px-2 py-1 bg-[#ff6600]/90 rounded-md text-white text-xs font-bold tracking-wide">
                                        {offer.badge}
                                    </div>
                                )}

                                {/* Icon overlay */}
                                <div className="absolute bottom-3 left-3 p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                                    <IconComponent className="w-5 h-5 text-white" />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-4 md:p-5">
                                <h3 className="text-lg font-bold text-white mb-1">
                                    {offer.title}
                                </h3>
                                {offer.subtitle && (
                                    <p className="text-sm text-[#ff6600] font-medium mb-2">
                                        {offer.subtitle}
                                    </p>
                                )}
                                <p className="text-sm text-white/70 leading-relaxed">
                                    {offer.description}
                                </p>

                                {/* CTA */}
                                {offer.ctaLabel && (
                                    <div className="mt-4">
                                        <span className="text-sm text-[#ff6600] font-medium group-hover:underline">
                                            {offer.ctaLabel} →
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ImageCards;
