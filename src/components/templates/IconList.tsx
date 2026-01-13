/**
 * IconList
 * Vertical list of items with icons.
 * Perfect for benefits, checklists, feature lists, and quick scannable content.
 */

import React from "react";
import {
    CheckCircle,
    Shield,
    TrendingUp,
    DollarSign,
    Users,
    Zap,
    Clock,
    Heart,
    Star,
    Award,
    Target,
    Lock,
    Eye,
    FileCheck,
    AlertCircle,
    Info,
    ChevronRight,
    LucideIcon,
} from "lucide-react";
import { useSound } from "@/hooks/useSound";
import { notifyTele } from "@/utils/acknowledgmentHelpers";

interface ListItem {
    id: string;
    title: string;
    description?: string;
    icon?: string;
    variant?: "default" | "success" | "warning" | "info";
    actionPhrase?: string;
}

interface IconListProps {
    items: ListItem[];
    layout?: "vertical" | "horizontal" | "grid";
    showDividers?: boolean;
    compact?: boolean;
    emptyMessage?: string;
}

const iconMap: Record<string, LucideIcon> = {
    check: CheckCircle,
    shield: Shield,
    trending: TrendingUp,
    dollar: DollarSign,
    users: Users,
    zap: Zap,
    clock: Clock,
    heart: Heart,
    star: Star,
    award: Award,
    target: Target,
    lock: Lock,
    eye: Eye,
    file: FileCheck,
    alert: AlertCircle,
    info: Info,
};

const variantStyles = {
    default: {
        bg: "bg-white/10",
        icon: "text-white/70",
        border: "border-white/10",
    },
    success: {
        bg: "bg-emerald-500/10",
        icon: "text-emerald-400",
        border: "border-emerald-500/30",
    },
    warning: {
        bg: "bg-amber-500/10",
        icon: "text-amber-400",
        border: "border-amber-500/30",
    },
    info: {
        bg: "bg-blue-500/10",
        icon: "text-blue-400",
        border: "border-blue-500/30",
    },
};

export const IconList: React.FC<IconListProps> = ({
    items = [],
    layout = "vertical",
    showDividers = false,
    compact = false,
    emptyMessage = "No items to display.",
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    if (items.length === 0) {
        return (
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-12 text-center">
                <p className="text-lg text-white/60 font-medium">{emptyMessage}</p>
            </div>
        );
    }

    const layoutClasses = {
        vertical: "flex flex-col",
        horizontal: "flex flex-row flex-wrap gap-4",
        grid: "grid grid-cols-1 md:grid-cols-2 gap-4",
    };

    return (
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4">
            <div className={layoutClasses[layout]}>
                {items.map((item, idx) => {
                    const Icon = iconMap[item.icon?.toLowerCase() || "check"] || CheckCircle;
                    const variant = variantStyles[item.variant || "default"];
                    const isLast = idx === items.length - 1;

                    const content = (
                        <div className={`flex items-start gap-3 ${compact ? "py-2" : "py-3"} ${layout === "horizontal" ? "flex-1 min-w-[200px]" : ""
                            }`}>
                            {/* Icon */}
                            <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${variant.bg} border ${variant.border} flex items-center justify-center`}>
                                <Icon className={`w-4 h-4 ${variant.icon}`} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p className={`text-white font-medium ${compact ? "text-sm" : ""}`}>
                                    {item.title}
                                </p>
                                {item.description && (
                                    <p className="text-sm text-white/60 mt-0.5">{item.description}</p>
                                )}
                            </div>

                            {/* Arrow for clickable items */}
                            {item.actionPhrase && (
                                <ChevronRight className="w-4 h-4 text-white/30 flex-shrink-0 mt-1" />
                            )}
                        </div>
                    );

                    if (item.actionPhrase) {
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleAction(item.actionPhrase!)}
                                className={`text-left hover:bg-white/5 rounded-lg transition-colors w-full ${showDividers && !isLast && layout === "vertical" ? "border-b border-white/10" : ""
                                    }`}
                            >
                                {content}
                            </button>
                        );
                    }

                    return (
                        <div
                            key={item.id}
                            className={showDividers && !isLast && layout === "vertical" ? "border-b border-white/10" : ""}
                        >
                            {content}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default IconList;
