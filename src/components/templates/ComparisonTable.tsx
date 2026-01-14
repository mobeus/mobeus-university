/**
 * ComparisonTable
 * Epic side-by-side device comparison with hero images
 * Premium dark glass aesthetic with Fiserv orange accents
 */

import React, { useState } from "react";
import { Check, X, Star, Zap, ChevronRight } from "lucide-react";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";

interface ComparisonFeature {
    name: string;
    category?: string;
    values: (boolean | string)[];
}

interface ComparisonOption {
    id: string;
    name: string;
    description?: string;
    highlighted?: boolean;
    imageUrl?: string;
    tagline?: string;
    price?: string;
    bestFor?: string;
}

interface ComparisonTableProps {
    options: ComparisonOption[];
    features: ComparisonFeature[];
    title?: string;
    subtitle?: string;
    animationClass?: string;
    isExiting?: boolean;
}

// Default device images for Clover products
const getDefaultImage = (deviceName: string): string | null => {
    const name = deviceName.toLowerCase();
    // Use reliable placeholder images with device-like aesthetics
    if (name.includes('go')) {
        return 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&q=80';
    }
    if (name.includes('flex')) {
        return 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400&h=300&fit=crop&q=80';
    }
    if (name.includes('mini')) {
        return 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=400&h=300&fit=crop&q=80';
    }
    if (name.includes('station')) {
        return 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=400&h=300&fit=crop&q=80';
    }
    return null;
};

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
    options = [],
    features = [],
    title = "Choose Your Perfect Device",
    subtitle = "Compare features and find the right fit for your business",
    animationClass = "",
    isExiting = false,
}) => {
    const { playClick } = useSound();
    const [selectedOption, setSelectedOption] = useState<string | null>(
        options.find(o => o.highlighted)?.id || null
    );

    const handleSelectDevice = (option: ComparisonOption) => {
        playClick();
        setSelectedOption(option.id);
        sendToTele(`Show me more about the ${option.name}`);
    };

    const renderValue = (value: boolean | string, isHighlighted: boolean) => {
        if (typeof value === "boolean") {
            return value ? (
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${isHighlighted ? 'bg-[#ff6600]/20' : 'bg-green-500/20'}`}>
                    <Check className={`w-5 h-5 ${isHighlighted ? 'text-[#ff6600]' : 'text-green-500'}`} />
                </div>
            ) : (
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5">
                    <X className="w-4 h-4 text-white/30" />
                </div>
            );
        }
        return <span className={`font-medium ${isHighlighted ? 'text-white' : 'text-white/80'}`}>{value}</span>;
    };

    // Group features by category
    const groupedFeatures: { category: string; items: ComparisonFeature[] }[] = [];
    let currentCategory = "";

    features.forEach(feature => {
        const cat = feature.category || "Features";
        if (cat !== currentCategory) {
            groupedFeatures.push({ category: cat, items: [] });
            currentCategory = cat;
        }
        groupedFeatures[groupedFeatures.length - 1].items.push(feature);
    });

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            {/* Hero Header */}
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>
                <p className="text-white/60 text-lg">{subtitle}</p>
            </div>

            {/* Device Cards - Hero Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {options.map((option, index) => (
                    <div
                        key={option.id}
                        onClick={() => handleSelectDevice(option)}
                        className={`relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 ${selectedOption === option.id || option.highlighted
                            ? 'ring-2 ring-[#ff6600] scale-[1.02] shadow-2xl shadow-[#ff6600]/20'
                            : 'ring-1 ring-white/20 hover:ring-white/40 hover:scale-[1.01]'
                            }`}
                    >
                        {/* Recommended Badge */}
                        {option.highlighted && (
                            <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-3 py-1 bg-[#ff6600] rounded-full text-xs font-bold text-white shadow-lg">
                                <Star className="w-3 h-3 fill-current" />
                                RECOMMENDED
                            </div>
                        )}

                        {/* Device Image - Fill to edges */}
                        <div className="relative aspect-[4/3] bg-gradient-to-br from-[#001a2c] to-[#003d5c] overflow-hidden">
                            {(() => {
                                const imageUrl = option.imageUrl || getDefaultImage(option.name);
                                return imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={option.name}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#ff6600]/30 to-[#ff6600]/10 flex items-center justify-center">
                                            <Zap className="w-16 h-16 text-[#ff6600]/50" />
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#001a2c] via-transparent to-transparent opacity-80" />

                            {/* Floating Particles (decorative) */}
                            <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#ff6600]/30 animate-pulse" />
                            <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-cyan-400/40 animate-pulse delay-300" />
                        </div>

                        {/* Device Info */}
                        <div className={`p-6 ${option.highlighted ? 'bg-[#ff6600]/10' : 'bg-white/5'} backdrop-blur-sm`}>
                            <h3 className="text-xl font-bold text-white mb-1">{option.name}</h3>
                            {option.tagline && (
                                <p className="text-[#ff6600] text-sm font-medium mb-2">{option.tagline}</p>
                            )}
                            {option.description && (
                                <p className="text-white/60 text-sm mb-4">{option.description}</p>
                            )}

                            {/* Best For Tag */}
                            {option.bestFor && (
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg text-xs text-white/80 mb-4">
                                    <Zap className="w-3 h-3 text-[#ff6600]" />
                                    Best for: {option.bestFor}
                                </div>
                            )}

                            {/* Price if available */}
                            {option.price && (
                                <div className="text-2xl font-bold text-white mb-4">
                                    {option.price}
                                    <span className="text-sm font-normal text-white/50">/mo</span>
                                </div>
                            )}

                            {/* CTA Button */}
                            <button
                                className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${selectedOption === option.id || option.highlighted
                                    ? 'bg-[#ff6600] text-white shadow-lg shadow-[#ff6600]/30'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                Learn More
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Comparison Table - Dark Glass Style */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-4 border-b border-white/10">
                    <div className="p-5 flex items-center">
                        <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">Features</span>
                    </div>
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={`p-5 text-center border-l border-white/10 ${option.highlighted ? 'bg-[#ff6600]/10' : ''
                                }`}
                        >
                            <div className={`font-bold text-lg ${option.highlighted ? 'text-[#ff6600]' : 'text-white'}`}>
                                {option.name}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Feature Rows */}
                {groupedFeatures.map((group, gIdx) => (
                    <React.Fragment key={group.category}>
                        {/* Category Header */}
                        <div className="grid grid-cols-4 bg-white/5 border-b border-white/10">
                            <div className="col-span-4 px-5 py-3">
                                <span className="text-sm font-bold text-[#ff6600] uppercase tracking-wider">
                                    {group.category}
                                </span>
                            </div>
                        </div>

                        {/* Feature Rows */}
                        {group.items.map((feature, fIdx) => (
                            <div
                                key={fIdx}
                                className="grid grid-cols-4 border-b border-white/5 hover:bg-white/5 transition-colors"
                            >
                                <div className="p-4 text-white/80 flex items-center">
                                    {feature.name}
                                </div>
                                {feature.values.map((value, vIdx) => (
                                    <div
                                        key={vIdx}
                                        className={`p-4 text-center flex items-center justify-center border-l border-white/5 ${options[vIdx]?.highlighted ? 'bg-[#ff6600]/5' : ''
                                            }`}
                                    >
                                        {renderValue(value, options[vIdx]?.highlighted || false)}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>

            {/* Bottom CTA Section */}
            <div className="mt-10 text-center">
                <p className="text-white/60 mb-6">Need help choosing the right device for your business?</p>
                <button
                    onClick={() => {
                        playClick();
                        sendToTele("Help me choose the right Clover device");
                    }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff6600] to-[#ff8533] hover:from-[#ff6600] hover:to-[#ff6600] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#ff6600]/30 hover:shadow-xl hover:shadow-[#ff6600]/40"
                >
                    Get Personalized Recommendation
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float { animation: float 3s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

export default ComparisonTable;
