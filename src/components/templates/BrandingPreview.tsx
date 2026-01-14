/**
 * BrandingPreview
 * Preview of white-label customization options
 */

import React, { useState } from "react";
import { Palette, Type, Image, Eye, Sparkles } from "lucide-react";
import { useSound } from "@/hooks/useSound";

interface BrandingOption {
    id: string;
    name: string;
    type: "color" | "font" | "logo" | "theme";
    value: string;
    preview?: string;
}

interface BrandingPreviewProps {
    options: BrandingOption[];
    bankName?: string;
    previewMode?: "portal" | "onboarding" | "card";
    animationClass?: string;
    isExiting?: boolean;
}

export const BrandingPreview: React.FC<BrandingPreviewProps> = ({
    options = [],
    bankName = "Your Bank",
    previewMode = "card",
    animationClass = "",
    isExiting = false,
}) => {
    const [activeColor, setActiveColor] = useState(
        options.find(o => o.type === "color")?.value || "#0891b2"
    );
    const [activeFont, setActiveFont] = useState(
        options.find(o => o.type === "font")?.value || "Inter"
    );
    const { playClick } = useSound();

    const handleOptionClick = (option: BrandingOption) => {
        playClick();
        if (option.type === "color") {
            setActiveColor(option.value);
        } else if (option.type === "font") {
            setActiveFont(option.value);
        }
    };

    const colorOptions = options.filter(o => o.type === "color");
    const fontOptions = options.filter(o => o.type === "font");

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            <div className="grid grid-cols-2 gap-6">
                {/* Controls */}
                <div className="space-y-6">
                    {/* Color Picker */}
                    <div className="p-5 rounded-xl border border-gray-200 bg-white">
                        <div className="flex items-center gap-2 mb-4">
                            <Palette className="w-5 h-5 text-cyan-500" />
                            <h3 className="font-semibold text-gray-900">Brand Colors</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {colorOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleOptionClick(option)}
                                    className={`w-10 h-10 rounded-lg border-2 transition-all ${activeColor === option.value ? "ring-2 ring-cyan-500 ring-offset-2" : ""
                                        }`}
                                    style={{ backgroundColor: option.value, borderColor: option.value }}
                                    title={option.name}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Font Picker */}
                    <div className="p-5 rounded-xl border border-gray-200 bg-white">
                        <div className="flex items-center gap-2 mb-4">
                            <Type className="w-5 h-5 text-cyan-500" />
                            <h3 className="font-semibold text-gray-900">Typography</h3>
                        </div>
                        <div className="space-y-2">
                            {fontOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleOptionClick(option)}
                                    className={`w-full p-3 rounded-lg border-2 text-left transition-all ${activeFont === option.value
                                            ? "border-cyan-500 bg-cyan-50"
                                            : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    style={{ fontFamily: option.value }}
                                >
                                    <span className="font-medium">{option.name}</span>
                                    <p className="text-sm text-gray-500 mt-1">The quick brown fox jumps</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Customization List */}
                    <div className="p-5 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-5 h-5 text-orange-500" />
                            <h3 className="font-semibold text-gray-900">What's Customizable</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                Primary & secondary colors
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                Font family & sizes
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                Bank logo & branding
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                Button styles & CTAs
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                Email templates & messaging
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Live Preview */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Eye className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-500">Live Preview</span>
                    </div>
                    <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
                        {/* Preview Header */}
                        <div className="p-4" style={{ backgroundColor: activeColor }}>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white/20 rounded-lg" />
                                <span className="font-bold text-white" style={{ fontFamily: activeFont }}>
                                    {bankName}
                                </span>
                            </div>
                        </div>

                        {/* Preview Content */}
                        <div className="p-6 bg-white">
                            <h2 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: activeFont }}>
                                Grow Your Business
                            </h2>
                            <p className="text-gray-600 text-sm mb-4" style={{ fontFamily: activeFont }}>
                                Accept payments with Clover POS, powered by {bankName}.
                            </p>

                            {/* Preview Card */}
                            <div className="p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: `${activeColor}20` }} />
                                    <div>
                                        <p className="font-semibold" style={{ fontFamily: activeFont }}>Clover Go</p>
                                        <p className="text-sm text-gray-500">Accept cards anywhere</p>
                                    </div>
                                </div>
                                <button
                                    className="w-full py-2.5 rounded-lg text-white font-medium"
                                    style={{ backgroundColor: activeColor, fontFamily: activeFont }}
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>

                        {/* Preview Footer */}
                        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400" style={{ fontFamily: activeFont }}>
                                    Powered by Fiserv
                                </span>
                                <div className="w-3 h-3 rounded-full bg-orange-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandingPreview;
