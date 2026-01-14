/**
 * PricingTable
 * Display pricing tiers with features and CTAs
 */

import React from "react";
import { Check, Star, Zap } from "lucide-react";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";

interface PricingFeature {
    text: string;
    included: boolean;
}

interface PricingTier {
    id: string;
    name: string;
    price: string;
    period?: string;
    description: string;
    features: PricingFeature[];
    highlighted?: boolean;
    badge?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

interface PricingTableProps {
    tiers: PricingTier[];
    showComparison?: boolean;
    note?: string;
    animationClass?: string;
    isExiting?: boolean;
}

export const PricingTable: React.FC<PricingTableProps> = ({
    tiers = [],
    showComparison = true,
    note,
    animationClass = "",
    isExiting = false,
}) => {
    const { playClick } = useSound();

    const handleTierClick = (tier: PricingTier) => {
        playClick();
        if (tier.ctaActionPhrase) {
            sendToTele(tier.ctaActionPhrase);
        }
    };

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            <div className={`grid gap-6 ${tiers.length === 2 ? "grid-cols-2" : tiers.length >= 3 ? "grid-cols-3" : "grid-cols-1"}`}>
                {tiers.map((tier) => (
                    <div
                        key={tier.id}
                        className={`relative rounded-2xl border-2 overflow-hidden transition-all hover:shadow-xl ${tier.highlighted
                                ? "border-cyan-500 shadow-lg shadow-cyan-500/10"
                                : "border-gray-200"
                            }`}
                    >
                        {/* Badge */}
                        {tier.badge && (
                            <div className="absolute top-0 right-0 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-bl-lg">
                                {tier.badge}
                            </div>
                        )}

                        {/* Header */}
                        <div className={`p-6 ${tier.highlighted ? "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white" : "bg-gray-50"}`}>
                            <h3 className={`text-lg font-bold ${tier.highlighted ? "text-white" : "text-gray-900"}`}>
                                {tier.name}
                            </h3>
                            <div className="flex items-baseline gap-1 mt-2">
                                <span className={`text-4xl font-bold ${tier.highlighted ? "text-white" : "text-gray-900"}`}>
                                    {tier.price}
                                </span>
                                {tier.period && (
                                    <span className={tier.highlighted ? "text-white/70" : "text-gray-500"}>
                                        /{tier.period}
                                    </span>
                                )}
                            </div>
                            <p className={`text-sm mt-2 ${tier.highlighted ? "text-white/80" : "text-gray-600"}`}>
                                {tier.description}
                            </p>
                        </div>

                        {/* Features */}
                        <div className="p-6 bg-white">
                            <ul className="space-y-3">
                                {tier.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <Check className={`w-5 h-5 mt-0.5 ${feature.included ? "text-green-500" : "text-gray-300"}`} />
                                        <span className={feature.included ? "text-gray-700" : "text-gray-400 line-through"}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {tier.ctaLabel && (
                                <button
                                    onClick={() => handleTierClick(tier)}
                                    className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all ${tier.highlighted
                                            ? "bg-cyan-500 hover:bg-cyan-600 text-white"
                                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    {tier.ctaLabel}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {note && (
                <p className="text-center text-sm text-gray-500 mt-6">{note}</p>
            )}
        </div>
    );
};

export default PricingTable;
