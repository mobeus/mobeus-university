/**
 * TimelineRoadmap
 * Visual timeline showing phases, milestones, and durations
 */

import React from "react";
import { CheckCircle, Clock, ArrowRight, Calendar } from "lucide-react";

interface Phase {
    id: string;
    title: string;
    duration: string;
    description: string;
    milestones?: string[];
    status?: "completed" | "current" | "upcoming";
}

interface TimelineRoadmapProps {
    phases: Phase[];
    totalDuration?: string;
    startLabel?: string;
    endLabel?: string;
    animationClass?: string;
    isExiting?: boolean;
}

export const TimelineRoadmap: React.FC<TimelineRoadmapProps> = ({
    phases = [],
    totalDuration = "6-8 weeks",
    startLabel = "Demo",
    endLabel = "Go Live",
    animationClass = "",
    isExiting = false,
}) => {
    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            {/* Total Duration Header */}
            <div className="flex items-center justify-between mb-8 p-4 bg-gradient-to-r from-cyan-500/10 to-orange-500/10 rounded-xl border border-cyan-500/20">
                <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-cyan-500" />
                    <div>
                        <p className="text-sm text-gray-500">Total Timeline</p>
                        <p className="text-2xl font-bold text-gray-900">{totalDuration}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">{startLabel}</span>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">{endLabel}</span>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-cyan-400 to-orange-500" />

                {/* Phases */}
                <div className="space-y-6">
                    {phases.map((phase, idx) => (
                        <div key={phase.id} className="relative pl-20">
                            {/* Timeline Dot */}
                            <div className={`absolute left-6 w-5 h-5 rounded-full border-4 ${phase.status === "completed" ? "bg-cyan-500 border-cyan-200" :
                                    phase.status === "current" ? "bg-orange-500 border-orange-200 animate-pulse" :
                                        "bg-gray-300 border-gray-100"
                                }`} />

                            {/* Phase Card */}
                            <div className={`p-5 rounded-xl border transition-all ${phase.status === "current" ? "bg-white border-cyan-500 shadow-lg" : "bg-gray-50 border-gray-200"
                                }`}>
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold text-gray-900">{phase.title}</h3>
                                    <span className="flex items-center gap-1.5 text-sm text-cyan-600 font-medium">
                                        <Clock className="w-4 h-4" />
                                        {phase.duration}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-3">{phase.description}</p>

                                {phase.milestones && phase.milestones.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {phase.milestones.map((milestone, mIdx) => (
                                            <span key={mIdx} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                                                <CheckCircle className="w-3 h-3 text-green-500" />
                                                {milestone}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TimelineRoadmap;
