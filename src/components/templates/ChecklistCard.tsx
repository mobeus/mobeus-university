/**
 * ChecklistCard
 * Interactive checklist with progress tracking
 */

import React from "react";
import { CheckCircle, Circle, AlertCircle, ChevronRight } from "lucide-react";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";

interface ChecklistItem {
    id: string;
    title: string;
    description?: string;
    status: "completed" | "pending" | "required";
    actionPhrase?: string;
}

interface ChecklistCardProps {
    items: ChecklistItem[];
    title?: string;
    subtitle?: string;
    showProgress?: boolean;
    animationClass?: string;
    isExiting?: boolean;
}

export const ChecklistCard: React.FC<ChecklistCardProps> = ({
    items = [],
    title = "Requirements",
    subtitle,
    showProgress = true,
    animationClass = "",
    isExiting = false,
}) => {
    const { playClick } = useSound();
    const completedCount = items.filter(i => i.status === "completed").length;
    const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

    const handleItemClick = (item: ChecklistItem) => {
        playClick();
        if (item.actionPhrase) {
            sendToTele(item.actionPhrase);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case "required":
                return <AlertCircle className="w-5 h-5 text-orange-500" />;
            default:
                return <Circle className="w-5 h-5 text-gray-300" />;
        }
    };

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}

                {showProgress && (
                    <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-500">{completedCount} of {items.length} complete</span>
                            <span className="text-sm font-medium text-cyan-600">{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Checklist */}
            <div className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${item.status === "completed"
                                ? "border-green-200 bg-green-50"
                                : item.status === "required"
                                    ? "border-orange-200 bg-orange-50"
                                    : "border-gray-200 bg-white hover:border-gray-300"
                            } ${item.actionPhrase ? "cursor-pointer hover:shadow-md" : ""}`}
                    >
                        {getStatusIcon(item.status)}
                        <div className="flex-1">
                            <h3 className={`font-medium ${item.status === "completed" ? "text-gray-500 line-through" : "text-gray-900"
                                }`}>
                                {item.title}
                            </h3>
                            {item.description && (
                                <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
                            )}
                        </div>
                        {item.actionPhrase && (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChecklistCard;
