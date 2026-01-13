/**
 * FeatureGrid
 * Grid of feature cards (3-4 per row) with icons, titles, and descriptions.
 * Perfect for value propositions, stage overviews, and capability highlights.
 */

import React from "react";
import {
    Shield,
    TrendingUp,
    DollarSign,
    Users,
    Zap,
    CheckCircle,
    Clock,
    Heart,
    Star,
    Award,
    Target,
    BarChart3,
    Lock,
    Eye,
    FileCheck,
    Layers,
    LucideIcon,
} from "lucide-react";
import { useSound } from "@/hooks/useSound";
import { notifyTele } from "@/utils/acknowledgmentHelpers";

interface FeatureCard {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    icon?: string;
    stat?: string;
    statLabel?: string;
    highlight?: boolean;
    badge?: string;
    actionPhrase?: string;
}

interface FeatureGridProps {
    features: FeatureCard[];
    columns?: 2 | 3 | 4;
    showStats?: boolean;
    emptyMessage?: string;
}

const iconMap: Record<string, LucideIcon> = {
    shield: Shield,
    trending: TrendingUp,
    dollar: DollarSign,
    users: Users,
    zap: Zap,
    check: CheckCircle,
    clock: Clock,
    heart: Heart,
    star: Star,
    award: Award,
    target: Target,
    chart: BarChart3,
    lock: Lock,
    eye: Eye,
    file: FileCheck,
    layers: Layers,
};

export const FeatureGrid: React.FC<FeatureGridProps> = ({
    features = [],
    columns = 3,
    showStats = false,
    emptyMessage = "No features to display.",
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    if (features.length === 0) {
        return (
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-12 text-center">
                <p className="text-lg text-white/60 font-medium">{emptyMessage}</p>
            </div>
        );
    }

    const gridCols = {
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    };

    return (
        <div className={`grid ${gridCols[columns]} gap-4`}>
            {features.map((feature) => {
                const Icon = iconMap[feature.icon?.toLowerCase() || "star"] || Star;

                return (
                    <button
                        key={feature.id}
                        onClick={() => feature.actionPhrase && handleAction(feature.actionPhrase)}
                        disabled={!feature.actionPhrase}
                        className={`backdrop-blur-md bg-white/10 border rounded-2xl p-5 text-left transition-all group
                            ${feature.highlight
                                ? "border-emerald-500/40 ring-2 ring-emerald-500/20"
                                : "border-white/20 hover:border-emerald-500/30"}
                            ${feature.actionPhrase ? "cursor-pointer hover:bg-white/15" : "cursor-default"}`}
                    >
                        {/* Badge */}
                        {feature.badge && (
                            <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-3">
                                {feature.badge}
                            </span>
                        )}

                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.highlight ? "bg-emerald-500/20" : "bg-white/10"
                            }`}>
                            <Icon className={`w-6 h-6 ${feature.highlight ? "text-emerald-400" : "text-white/70"}`} />
                        </div>

                        {/* Title & Subtitle */}
                        <h4 className="text-white font-medium mb-1 group-hover:text-primary transition-colors">
                            {feature.title}
                        </h4>
                        {feature.subtitle && (
                            <p className="text-sm text-white/50 mb-2">{feature.subtitle}</p>
                        )}

                        {/* Description */}
                        {feature.description && (
                            <p className="text-sm text-white/60 line-clamp-3">{feature.description}</p>
                        )}

                        {/* Stat */}
                        {showStats && feature.stat && (
                            <div className="mt-4 pt-4 border-t border-white/10">
                                <p className="text-2xl font-bold text-emerald-400">{feature.stat}</p>
                                {feature.statLabel && (
                                    <p className="text-xs text-white/50">{feature.statLabel}</p>
                                )}
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default FeatureGrid;
