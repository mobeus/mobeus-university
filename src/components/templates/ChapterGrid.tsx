/**
 * ChapterGrid
 * Visual timeline template showing onboarding steps with activities,
 * people involved, and expected duration between phases.
 */

import React, { useState } from "react";
import {
    Clock,
    Users,
    CheckCircle2,
    Circle,
    ChevronDown,
    ChevronUp,
    ArrowRight,
    User,
    Building,
    Shield,
    FileCheck,
    Zap,
    AlertCircle,
} from "lucide-react";
import { useSound } from "@/hooks/useSound";
import { notifyTele } from "@/utils/acknowledgmentHelpers";

interface Person {
    role: string;
    responsibility?: string;
    icon?: "user" | "building" | "shield" | "system";
}

interface Activity {
    id: string;
    name: string;
    description?: string;
    duration?: string;
    isAutomated?: boolean;
    actionPhrase?: string;
}

interface JourneyStep {
    id: string;
    stepNumber: number;
    title: string;
    subtitle?: string;
    description?: string;
    status: "completed" | "current" | "upcoming" | "blocked";
    duration: string; // e.g., "2-3 days", "30 minutes", "Instant"
    durationToNext?: string; // Time until next step begins
    activities: Activity[];
    peopleInvolved: Person[];
    blockers?: string[];
    actionPhrase?: string;
}

interface ChapterGridProps {
    // Journey title
    journeyTitle?: string;
    journeySubtitle?: string;

    // Steps in the journey
    steps: JourneyStep[];

    // Summary stats
    totalDuration?: string;
    currentStep?: number;
    completionPercent?: number;

    // View options
    showTimeline?: boolean;
    expandedByDefault?: boolean;

    // Empty state
    emptyMessage?: string;
}

const statusConfig = {
    completed: {
        bg: "bg-emerald-500/20",
        border: "border-emerald-500/40",
        text: "text-emerald-400",
        icon: CheckCircle2,
        label: "Completed",
    },
    current: {
        bg: "bg-blue-500/20",
        border: "border-blue-500/40",
        text: "text-blue-400",
        icon: Zap,
        label: "In Progress",
    },
    upcoming: {
        bg: "bg-white/10",
        border: "border-white/20",
        text: "text-white/60",
        icon: Circle,
        label: "Upcoming",
    },
    blocked: {
        bg: "bg-rose-500/20",
        border: "border-rose-500/40",
        text: "text-rose-400",
        icon: AlertCircle,
        label: "Blocked",
    },
};

const personIconMap = {
    user: User,
    building: Building,
    shield: Shield,
    system: Zap,
};

export const ChapterGrid: React.FC<ChapterGridProps> = ({
    journeyTitle = "Merchant Onboarding Journey",
    journeySubtitle,
    steps = [],
    totalDuration,
    currentStep,
    completionPercent,
    showTimeline = true,
    expandedByDefault = false,
    emptyMessage = "No journey steps defined yet.",
}) => {
    const { playClick } = useSound();
    const [expandedSteps, setExpandedSteps] = useState<Set<string>>(
        expandedByDefault ? new Set(steps.map(s => s.id)) : new Set()
    );

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const toggleStep = (stepId: string) => {
        playClick();
        setExpandedSteps(prev => {
            const newSet = new Set(prev);
            if (newSet.has(stepId)) {
                newSet.delete(stepId);
            } else {
                newSet.add(stepId);
            }
            return newSet;
        });
    };

    // Calculate current step if not provided
    const calculatedCurrentStep = currentStep ?? steps.findIndex(s => s.status === "current") + 1;
    const completedSteps = steps.filter(s => s.status === "completed").length;
    const calculatedPercent = completionPercent ?? Math.round((completedSteps / steps.length) * 100);

    const isEmpty = steps.length === 0;

    if (isEmpty) {
        return (
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <FileCheck className="w-8 h-8 text-emerald-500/50" />
                </div>
                <p className="text-lg text-white/60 font-medium">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            {/* Header with Progress */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-white/90">{journeyTitle}</h3>
                        {journeySubtitle && (
                            <p className="text-sm text-white/50">{journeySubtitle}</p>
                        )}
                    </div>
                    {totalDuration && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <Clock className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm text-white/70">{totalDuration}</span>
                        </div>
                    )}
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-white/50">
                        <span>Step {calculatedCurrentStep} of {steps.length}</span>
                        <span>{calculatedPercent}% Complete</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                            style={{ width: `${calculatedPercent}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Journey Steps */}
            <div className="space-y-4">
                {steps.map((step, index) => {
                    const config = statusConfig[step.status];
                    const StatusIcon = config.icon;
                    const isExpanded = expandedSteps.has(step.id);
                    const isLast = index === steps.length - 1;

                    return (
                        <div key={step.id} className="relative">
                            {/* Timeline connector */}
                            {showTimeline && !isLast && (
                                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-white/20 to-transparent"
                                    style={{ height: isExpanded ? 'calc(100% - 2rem)' : '60px' }} />
                            )}

                            {/* Step Card */}
                            <div className={`backdrop-blur-md ${config.bg} border ${config.border} rounded-2xl overflow-hidden transition-all`}>
                                {/* Step Header */}
                                <button
                                    onClick={() => toggleStep(step.id)}
                                    className="w-full p-4 text-left hover:bg-white/5 transition-colors"
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Step Number & Icon */}
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center`}>
                                            <StatusIcon className={`w-6 h-6 ${config.text}`} />
                                        </div>

                                        {/* Step Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <span className="text-xs text-white/40">Step {step.stepNumber}</span>
                                                <span className={`px-2 py-0.5 rounded-full text-xs ${config.bg} ${config.text} border ${config.border}`}>
                                                    {config.label}
                                                </span>
                                            </div>
                                            <h4 className="text-white font-medium">{step.title}</h4>
                                            {step.subtitle && (
                                                <p className="text-sm text-white/60 mt-0.5">{step.subtitle}</p>
                                            )}
                                        </div>

                                        {/* Duration & Expand */}
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            <div className="text-right">
                                                <div className="flex items-center gap-1.5 text-sm text-white/70">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {step.duration}
                                                </div>
                                                {step.peopleInvolved.length > 0 && (
                                                    <div className="flex items-center gap-1.5 text-xs text-white/50 mt-1">
                                                        <Users className="w-3 h-3" />
                                                        {step.peopleInvolved.length} involved
                                                    </div>
                                                )}
                                            </div>
                                            {isExpanded ? (
                                                <ChevronUp className="w-5 h-5 text-white/40" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-white/40" />
                                            )}
                                        </div>
                                    </div>
                                </button>

                                {/* Expanded Content */}
                                {isExpanded && (
                                    <div className="px-4 pb-4 space-y-4">
                                        <div className="border-t border-white/10 pt-4">
                                            {/* Description */}
                                            {step.description && (
                                                <p className="text-sm text-white/70 mb-4">{step.description}</p>
                                            )}

                                            {/* Activities */}
                                            {step.activities.length > 0 && (
                                                <div className="mb-4">
                                                    <h5 className="text-xs font-medium text-white/50 uppercase tracking-wide mb-2">
                                                        Activities
                                                    </h5>
                                                    <div className="space-y-2">
                                                        {step.activities.map((activity) => (
                                                            <button
                                                                key={activity.id}
                                                                onClick={() => activity.actionPhrase && handleAction(activity.actionPhrase)}
                                                                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all text-left group"
                                                            >
                                                                <div className="flex items-start justify-between gap-2">
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-sm text-white group-hover:text-primary transition-colors">
                                                                                {activity.name}
                                                                            </span>
                                                                            {activity.isAutomated && (
                                                                                <span className="px-1.5 py-0.5 rounded text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30">
                                                                                    Automated
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        {activity.description && (
                                                                            <p className="text-xs text-white/50 mt-0.5">{activity.description}</p>
                                                                        )}
                                                                    </div>
                                                                    {activity.duration && (
                                                                        <span className="text-xs text-white/40 flex-shrink-0">{activity.duration}</span>
                                                                    )}
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* People Involved */}
                                            {step.peopleInvolved.length > 0 && (
                                                <div className="mb-4">
                                                    <h5 className="text-xs font-medium text-white/50 uppercase tracking-wide mb-2">
                                                        People Involved
                                                    </h5>
                                                    <div className="flex flex-wrap gap-2">
                                                        {step.peopleInvolved.map((person, idx) => {
                                                            const PersonIcon = personIconMap[person.icon || "user"];
                                                            return (
                                                                <div
                                                                    key={idx}
                                                                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"
                                                                >
                                                                    <PersonIcon className="w-4 h-4 text-emerald-400" />
                                                                    <div>
                                                                        <span className="text-sm text-white">{person.role}</span>
                                                                        {person.responsibility && (
                                                                            <p className="text-xs text-white/50">{person.responsibility}</p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Blockers */}
                                            {step.blockers && step.blockers.length > 0 && (
                                                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30">
                                                    <h5 className="text-xs font-medium text-rose-400 uppercase tracking-wide mb-2">
                                                        ⚠️ Blockers
                                                    </h5>
                                                    <ul className="space-y-1">
                                                        {step.blockers.map((blocker, idx) => (
                                                            <li key={idx} className="text-sm text-white/70">• {blocker}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Time to Next Step */}
                            {!isLast && step.durationToNext && (
                                <div className="flex items-center justify-center gap-2 py-3 ml-6">
                                    <ArrowRight className="w-4 h-4 text-white/30" />
                                    <span className="text-xs text-white/40">{step.durationToNext} until next step</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Summary Footer */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex flex-wrap gap-6 justify-center">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-white">{steps.length}</p>
                        <p className="text-xs text-white/50">Total Steps</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-emerald-400">{completedSteps}</p>
                        <p className="text-xs text-white/50">Completed</p>
                    </div>
                    {totalDuration && (
                        <div className="text-center">
                            <p className="text-2xl font-bold text-blue-400">{totalDuration}</p>
                            <p className="text-xs text-white/50">Est. Duration</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChapterGrid;
