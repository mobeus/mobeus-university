/**
 * FeatureCallouts
 * 4 large feature boxes with icons and descriptions
 * Premium dark glass aesthetic with Fiserv orange accents
 */

import React from "react";
import {
    Shield, Zap, Globe, Cloud, Lock, Code, Clock,
    FileJson, Webhook, Server, Database,
    CheckCircle, ArrowRight
} from "lucide-react";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";

interface FeatureCallout {
    id: string;
    icon: string;
    title: string;
    description: string;
    highlight?: boolean;
    actionPhrase?: string;
}

interface FeatureCalloutsProps {
    title?: string;
    subtitle?: string;
    callouts: FeatureCallout[];
    columns?: 2 | 4;
    ctaLabel?: string;
    ctaActionPhrase?: string;
    animationClass?: string;
    isExiting?: boolean;
}

const getIcon = (iconName: string, className: string = "w-8 h-8") => {
    const icons: Record<string, React.ReactNode> = {
        shield: <Shield className={className} />,
        zap: <Zap className={className} />,
        globe: <Globe className={className} />,
        cloud: <Cloud className={className} />,
        lock: <Lock className={className} />,
        code: <Code className={className} />,
        clock: <Clock className={className} />,
        json: <FileJson className={className} />,
        webhook: <Webhook className={className} />,
        server: <Server className={className} />,
        database: <Database className={className} />,
        check: <CheckCircle className={className} />,
    };
    return icons[iconName.toLowerCase()] || <Zap className={className} />;
};

export const FeatureCallouts: React.FC<FeatureCalloutsProps> = ({
    title,
    subtitle,
    callouts = [],
    columns = 4,
    ctaLabel,
    ctaActionPhrase,
    animationClass = "",
    isExiting = false,
}) => {
    const { playClick } = useSound();

    const handleCalloutClick = (callout: FeatureCallout) => {
        if (callout.actionPhrase) {
            playClick();
            sendToTele(callout.actionPhrase);
        }
    };

    const handleCtaClick = () => {
        if (ctaActionPhrase) {
            playClick();
            sendToTele(ctaActionPhrase);
        }
    };

    const gridCols = columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            {/* Header */}
            {(title || subtitle) && (
                <div className="text-center mb-10">
                    {title && <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>}
                    {subtitle && <p className="text-white/60 text-lg">{subtitle}</p>}
                </div>
            )}

            {/* Feature Callout Grid */}
            <div className={`grid ${gridCols} gap-6`}>
                {callouts.map((callout, index) => (
                    <div
                        key={callout.id}
                        onClick={() => handleCalloutClick(callout)}
                        className={`group relative rounded-2xl p-6 transition-all duration-300 ${callout.actionPhrase ? 'cursor-pointer' : ''
                            } ${callout.highlight
                                ? 'bg-gradient-to-br from-[#ff6600]/20 to-[#ff6600]/5 border-2 border-[#ff6600]/50 shadow-lg shadow-[#ff6600]/10'
                                : 'bg-white/10 border border-white/20 hover:border-white/40 hover:bg-white/15'
                            }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Icon */}
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-5 ${callout.highlight
                            ? 'bg-[#ff6600]/20 text-[#ff6600]'
                            : 'bg-white/10 text-[#ff6600] group-hover:bg-[#ff6600]/20'
                            } transition-all`}>
                            {getIcon(callout.icon, "w-8 h-8")}
                        </div>

                        {/* Content */}
                        <h3 className="text-lg font-bold text-white mb-2">{callout.title}</h3>
                        <p className="text-white/60 text-sm leading-relaxed">{callout.description}</p>

                        {/* Hover Arrow */}
                        {callout.actionPhrase && (
                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight className="w-5 h-5 text-[#ff6600]" />
                            </div>
                        )}

                        {/* Highlight Badge */}
                        {callout.highlight && (
                            <div className="absolute -top-3 left-6 px-3 py-1 bg-[#ff6600] rounded-full text-xs font-bold text-white">
                                KEY FEATURE
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* CTA Button */}
            {ctaLabel && ctaActionPhrase && (
                <div className="mt-10 text-center">
                    <button
                        onClick={handleCtaClick}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff6600] to-[#ff8533] hover:from-[#ff6600] hover:to-[#ff6600] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#ff6600]/30"
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* Fiserv Badge */}
            <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2 text-xs text-white/50">
                    <div className="w-3 h-3 rounded-full bg-[#ff6600]" />
                    Powered by Fiserv
                </div>
            </div>
        </div>
    );
};

export default FeatureCallouts;
