/**
 * ProblemSolutionMatrix
 * Visual template that maps customer problems to software features,
 * showing problem frequency/severity, feature uniqueness, and value delivery.
 */

import React, { useState } from "react";
import {
    AlertTriangle,
    CheckCircle2,
    Sparkles,
    TrendingUp,
    Shield,
    Zap,
    Target,
    ChevronRight,
    BarChart3,
    Star,
    Award,
    LightbulbIcon,
} from "lucide-react";
import { useSound } from "@/hooks/useSound";
import { notifyTele } from "@/utils/acknowledgmentHelpers";

interface Problem {
    id: string;
    title: string;
    description?: string;
    severity: "critical" | "high" | "medium" | "low";
    frequency: number; // 0-100 percentage of customers affected
    category?: string;
    actionPhrase?: string;
}

interface Solution {
    id: string;
    problemId: string;
    feature: string;
    description?: string;
    uniqueness: "industry-first" | "best-in-class" | "competitive" | "standard";
    impact: "high" | "medium" | "low";
    implemented?: boolean;
    actionPhrase?: string;
}

interface ProblemSolutionMatrixProps {
    // Problems list
    problems: Problem[];

    // Solutions mapped to problems
    solutions: Solution[];

    // Summary stats
    totalProblemsAddressed?: number;
    uniqueFeatures?: number;
    customerSatisfactionLift?: string;

    // View mode
    viewMode?: "matrix" | "list";

    // Category filter
    categories?: string[];

    // Empty state
    emptyMessage?: string;
}

const severityConfig = {
    critical: {
        bg: "bg-rose-500/20",
        border: "border-rose-500/40",
        text: "text-rose-400",
        barColor: "bg-rose-500",
        label: "Critical",
        icon: AlertTriangle,
    },
    high: {
        bg: "bg-amber-500/20",
        border: "border-amber-500/40",
        text: "text-amber-400",
        barColor: "bg-amber-500",
        label: "High",
        icon: AlertTriangle,
    },
    medium: {
        bg: "bg-blue-500/20",
        border: "border-blue-500/40",
        text: "text-blue-400",
        barColor: "bg-blue-500",
        label: "Medium",
        icon: Target,
    },
    low: {
        bg: "bg-slate-500/20",
        border: "border-slate-500/40",
        text: "text-slate-400",
        barColor: "bg-slate-500",
        label: "Low",
        icon: Target,
    },
};

const uniquenessConfig = {
    "industry-first": {
        bg: "bg-gradient-to-r from-purple-500/20 to-pink-500/20",
        border: "border-purple-500/40",
        text: "text-purple-400",
        label: "Industry First",
        icon: Sparkles,
        glow: "shadow-lg shadow-purple-500/20",
    },
    "best-in-class": {
        bg: "bg-emerald-500/20",
        border: "border-emerald-500/40",
        text: "text-emerald-400",
        label: "Best in Class",
        icon: Award,
        glow: "shadow-lg shadow-emerald-500/20",
    },
    "competitive": {
        bg: "bg-blue-500/20",
        border: "border-blue-500/40",
        text: "text-blue-400",
        label: "Competitive",
        icon: TrendingUp,
        glow: "",
    },
    "standard": {
        bg: "bg-slate-500/20",
        border: "border-slate-500/40",
        text: "text-slate-400",
        label: "Standard",
        icon: CheckCircle2,
        glow: "",
    },
};

const impactConfig = {
    high: { bars: 3, color: "bg-emerald-500" },
    medium: { bars: 2, color: "bg-amber-500" },
    low: { bars: 1, color: "bg-slate-500" },
};

export const ProblemSolutionMatrix: React.FC<ProblemSolutionMatrixProps> = ({
    problems = [],
    solutions = [],
    totalProblemsAddressed,
    uniqueFeatures,
    customerSatisfactionLift,
    viewMode = "matrix",
    categories = [],
    emptyMessage = "No problems or solutions defined yet.",
}) => {
    const { playClick } = useSound();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [expandedProblem, setExpandedProblem] = useState<string | null>(null);

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const handleCategoryFilter = (category: string | null) => {
        playClick();
        setSelectedCategory(category);
    };

    const handleExpandProblem = (problemId: string) => {
        playClick();
        setExpandedProblem(expandedProblem === problemId ? null : problemId);
    };

    // Filter problems by category
    const filteredProblems = selectedCategory
        ? problems.filter(p => p.category === selectedCategory)
        : problems;

    // Get solutions for a specific problem
    const getSolutionsForProblem = (problemId: string) => {
        return solutions.filter(s => s.problemId === problemId);
    };

    // Calculate stats
    const industryFirstCount = solutions.filter(s => s.uniqueness === "industry-first").length;
    const bestInClassCount = solutions.filter(s => s.uniqueness === "best-in-class").length;
    const criticalProblemsAddressed = problems.filter(p =>
        p.severity === "critical" && solutions.some(s => s.problemId === p.id)
    ).length;

    const isEmpty = problems.length === 0;

    if (isEmpty) {
        return (
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <LightbulbIcon className="w-8 h-8 text-emerald-500/50" />
                </div>
                <p className="text-lg text-white/60 font-medium">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            {/* Header Stats */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-emerald-500/10">
                            <BarChart3 className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white/90">Problem → Solution Matrix</h3>
                            <p className="text-sm text-white/50">How Fiserv DMA addresses your challenges</p>
                        </div>
                    </div>
                </div>

                {/* Summary Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-2xl font-bold text-white">{totalProblemsAddressed || problems.length}</p>
                        <p className="text-xs text-white/50">Problems Addressed</p>
                    </div>
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30">
                        <p className="text-2xl font-bold text-purple-400">{industryFirstCount}</p>
                        <p className="text-xs text-white/50">Industry First Features</p>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                        <p className="text-2xl font-bold text-emerald-400">{bestInClassCount}</p>
                        <p className="text-xs text-white/50">Best in Class</p>
                    </div>
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30">
                        <p className="text-2xl font-bold text-rose-400">{criticalProblemsAddressed}</p>
                        <p className="text-xs text-white/50">Critical Issues Solved</p>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                    <button
                        onClick={() => handleCategoryFilter(null)}
                        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${selectedCategory === null
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
                            }`}
                    >
                        All Problems
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${selectedCategory === cat
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                    : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}

            {/* Problem Cards with Solutions */}
            <div className="space-y-4">
                {filteredProblems.map((problem) => {
                    const config = severityConfig[problem.severity];
                    const SeverityIcon = config.icon;
                    const problemSolutions = getSolutionsForProblem(problem.id);
                    const isExpanded = expandedProblem === problem.id;

                    return (
                        <div
                            key={problem.id}
                            className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl overflow-hidden transition-all ${isExpanded ? "ring-2 ring-emerald-500/30" : ""
                                }`}
                        >
                            {/* Problem Header */}
                            <button
                                onClick={() => handleExpandProblem(problem.id)}
                                className="w-full p-4 text-left hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3 flex-1">
                                        {/* Severity Badge */}
                                        <div className={`p-2 rounded-xl ${config.bg} flex-shrink-0`}>
                                            <SeverityIcon className={`w-5 h-5 ${config.text}`} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <h4 className="text-white font-medium">{problem.title}</h4>
                                                <span className={`px-2 py-0.5 rounded-full text-xs ${config.bg} ${config.text} border ${config.border}`}>
                                                    {config.label}
                                                </span>
                                                {problem.category && (
                                                    <span className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-white/50">
                                                        {problem.category}
                                                    </span>
                                                )}
                                            </div>
                                            {problem.description && (
                                                <p className="text-sm text-white/60 line-clamp-2">{problem.description}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Frequency Bar */}
                                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                        <span className="text-xs text-white/50">Frequency</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${config.barColor} rounded-full transition-all`}
                                                    style={{ width: `${problem.frequency}%` }}
                                                />
                                            </div>
                                            <span className={`text-sm font-medium ${config.text}`}>{problem.frequency}%</span>
                                        </div>
                                        <span className="text-xs text-white/40">of customers affected</span>
                                    </div>

                                    {/* Expand Arrow */}
                                    <ChevronRight className={`w-5 h-5 text-white/40 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                                </div>

                                {/* Solution Count Preview */}
                                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/10">
                                    <div className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                        <span className="text-sm text-white/70">{problemSolutions.length} solution{problemSolutions.length !== 1 ? "s" : ""}</span>
                                    </div>
                                    {problemSolutions.some(s => s.uniqueness === "industry-first") && (
                                        <div className="flex items-center gap-1.5">
                                            <Sparkles className="w-4 h-4 text-purple-400" />
                                            <span className="text-sm text-purple-400">Industry First</span>
                                        </div>
                                    )}
                                    {problemSolutions.some(s => s.uniqueness === "best-in-class") && (
                                        <div className="flex items-center gap-1.5">
                                            <Award className="w-4 h-4 text-emerald-400" />
                                            <span className="text-sm text-emerald-400">Best in Class</span>
                                        </div>
                                    )}
                                </div>
                            </button>

                            {/* Expanded Solutions */}
                            {isExpanded && problemSolutions.length > 0 && (
                                <div className="p-4 pt-0 space-y-3">
                                    <div className="border-t border-white/10 pt-4">
                                        <h5 className="text-sm font-medium text-white/70 mb-3 flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-emerald-400" />
                                            How Fiserv DMA Solves This
                                        </h5>
                                        <div className="grid gap-3">
                                            {problemSolutions.map((solution) => {
                                                const uConfig = uniquenessConfig[solution.uniqueness];
                                                const UniqueIcon = uConfig.icon;
                                                const iConfig = impactConfig[solution.impact];

                                                return (
                                                    <button
                                                        key={solution.id}
                                                        onClick={() => solution.actionPhrase && handleAction(solution.actionPhrase)}
                                                        className={`p-4 rounded-xl ${uConfig.bg} border ${uConfig.border} ${uConfig.glow} 
                                                            hover:border-emerald-500/40 transition-all text-left group`}
                                                    >
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="flex items-start gap-3 flex-1">
                                                                <div className={`p-2 rounded-lg bg-black/20 flex-shrink-0`}>
                                                                    <UniqueIcon className={`w-4 h-4 ${uConfig.text}`} />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                                        <span className="text-white font-medium group-hover:text-primary transition-colors">
                                                                            {solution.feature}
                                                                        </span>
                                                                        <span className={`px-2 py-0.5 rounded-full text-xs ${uConfig.bg} ${uConfig.text} border ${uConfig.border}`}>
                                                                            {uConfig.label}
                                                                        </span>
                                                                    </div>
                                                                    {solution.description && (
                                                                        <p className="text-sm text-white/60">{solution.description}</p>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Impact Indicator */}
                                                            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                                                <span className="text-xs text-white/50">Impact</span>
                                                                <div className="flex gap-0.5">
                                                                    {[1, 2, 3].map((bar) => (
                                                                        <div
                                                                            key={bar}
                                                                            className={`w-2 h-4 rounded-sm ${bar <= iConfig.bars ? iConfig.color : "bg-white/10"
                                                                                }`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex flex-wrap gap-6">
                    <div>
                        <h6 className="text-xs text-white/50 mb-2">Feature Uniqueness</h6>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(uniquenessConfig).map(([key, config]) => {
                                const Icon = config.icon;
                                return (
                                    <div key={key} className="flex items-center gap-1.5">
                                        <Icon className={`w-3 h-3 ${config.text}`} />
                                        <span className={`text-xs ${config.text}`}>{config.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <h6 className="text-xs text-white/50 mb-2">Problem Severity</h6>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(severityConfig).map(([key, config]) => (
                                <div key={key} className="flex items-center gap-1.5">
                                    <div className={`w-3 h-3 rounded ${config.barColor}`} />
                                    <span className={`text-xs ${config.text}`}>{config.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemSolutionMatrix;
