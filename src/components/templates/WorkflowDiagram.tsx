/**
 * WorkflowDiagram
 * Visual flowchart showing process steps with status indicators
 */

import React from "react";
import { ArrowRight, ArrowDown, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface WorkflowStep {
    id: string;
    title: string;
    description?: string;
    duration?: string;
    status?: "completed" | "active" | "pending";
    branches?: WorkflowStep[];
}

interface WorkflowDiagramProps {
    steps: WorkflowStep[];
    title?: string;
    orientation?: "horizontal" | "vertical";
    animationClass?: string;
    isExiting?: boolean;
}

export const WorkflowDiagram: React.FC<WorkflowDiagramProps> = ({
    steps = [],
    title,
    orientation = "vertical",
    animationClass = "",
    isExiting = false,
}) => {
    const getStatusIcon = (status?: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case "active":
                return <Clock className="w-5 h-5 text-cyan-500 animate-pulse" />;
            default:
                return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
        }
    };

    const getStatusStyle = (status?: string) => {
        switch (status) {
            case "completed":
                return "border-green-500 bg-green-50";
            case "active":
                return "border-cyan-500 bg-cyan-50 shadow-lg";
            default:
                return "border-gray-200 bg-white";
        }
    };

    const renderStep = (step: WorkflowStep, isLast: boolean) => (
        <div key={step.id} className="flex flex-col items-center">
            {/* Step Card */}
            <div className={`relative w-full max-w-xs p-4 rounded-xl border-2 transition-all ${getStatusStyle(step.status)}`}>
                <div className="flex items-start gap-3">
                    {getStatusIcon(step.status)}
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{step.title}</h3>
                        {step.description && (
                            <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                        )}
                        {step.duration && (
                            <p className="text-xs text-cyan-600 mt-2 font-medium">{step.duration}</p>
                        )}
                    </div>
                </div>

                {/* Branches */}
                {step.branches && step.branches.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-2">Possible outcomes:</p>
                        <div className="space-y-2">
                            {step.branches.map((branch) => (
                                <div key={branch.id} className="flex items-center gap-2 text-sm">
                                    <ArrowRight className="w-3 h-3 text-gray-400" />
                                    <span className={`${branch.status === "completed" ? "text-green-600" : "text-gray-600"}`}>
                                        {branch.title}
                                    </span>
                                    {branch.duration && (
                                        <span className="text-xs text-gray-400">({branch.duration})</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Connector */}
            {!isLast && (
                <div className="flex flex-col items-center py-2">
                    <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-500 to-cyan-300" />
                    <ArrowDown className="w-4 h-4 text-cyan-500 -mt-1" />
                </div>
            )}
        </div>
    );

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            {title && (
                <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">{title}</h2>
            )}

            <div className="flex flex-col items-center space-y-0">
                {steps.map((step, idx) => renderStep(step, idx === steps.length - 1))}
            </div>
        </div>
    );
};

export default WorkflowDiagram;
