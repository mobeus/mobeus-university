/**
 * ArchitectureDiagram
 * Visual system architecture with components and connections
 */

import React from "react";
import { Cloud, Database, Shield, Zap, Server, Globe, ArrowUpDown } from "lucide-react";

interface ArchitectureComponent {
    id: string;
    name: string;
    description?: string;
    icon?: string;
    highlight?: boolean;
}

interface ArchitectureConnection {
    from: string;
    to: string;
    label?: string;
    bidirectional?: boolean;
}

interface ArchitectureLayer {
    id: string;
    name: string;
    components: ArchitectureComponent[];
}

interface ArchitectureDiagramProps {
    layers: ArchitectureLayer[];
    connections?: ArchitectureConnection[];
    title?: string;
    subtitle?: string;
    animationClass?: string;
    isExiting?: boolean;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
    cloud: Cloud,
    database: Database,
    shield: Shield,
    zap: Zap,
    server: Server,
    globe: Globe,
};

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
    layers = [],
    connections = [],
    title,
    subtitle,
    animationClass = "",
    isExiting = false,
}) => {
    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            {/* Header */}
            {title && (
                <div className="text-center mb-8">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    {subtitle && <p className="text-white/70 mt-1">{subtitle}</p>}
                </div>
            )}

            {/* Architecture Layers */}
            <div className="space-y-4">
                {layers.map((layer, layerIdx) => (
                    <div key={layer.id}>
                        {/* Layer Label */}
                        <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 pl-2">
                            {layer.name}
                        </div>

                        {/* Components */}
                        <div className="flex justify-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                            {layer.components.map((component) => {
                                const IconComponent = iconMap[component.icon || "server"] || Server;
                                return (
                                    <div
                                        key={component.id}
                                        className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all min-w-[120px] ${component.highlight
                                                ? "border-[#FF6600] bg-[#FF6600]/10 shadow-lg"
                                                : "border-white/20 bg-white/10"
                                            }`}
                                    >
                                        <div className={`p-3 rounded-lg ${component.highlight ? "bg-[#FF6600]/20" : "bg-white/10"
                                            }`}>
                                            <IconComponent className={`w-6 h-6 ${component.highlight ? "text-[#FF6600]" : "text-white/70"
                                                }`} />
                                        </div>
                                        <p className="font-medium text-white mt-2 text-center text-sm">
                                            {component.name}
                                        </p>
                                        {component.description && (
                                            <p className="text-xs text-white/50 mt-1 text-center">
                                                {component.description}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Connector to next layer */}
                        {layerIdx < layers.length - 1 && (
                            <div className="flex justify-center py-3">
                                <div className="flex flex-col items-center">
                                    <div className="w-0.5 h-4 bg-white/30" />
                                    <ArrowUpDown className="w-5 h-5 text-[#FF6600] my-1" />
                                    <div className="w-0.5 h-4 bg-white/30" />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Key Points */}
            <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex items-center gap-2 text-green-700 font-medium">
                        <Shield className="w-4 h-4" />
                        100% Cloud-Hosted
                    </div>
                    <p className="text-xs text-green-600 mt-1">No on-premise deployment</p>
                </div>
                <div className="p-4 rounded-lg bg-cyan-50 border border-cyan-200">
                    <div className="flex items-center gap-2 text-cyan-700 font-medium">
                        <Zap className="w-4 h-4" />
                        One API Integration
                    </div>
                    <p className="text-xs text-cyan-600 mt-1">REST + SDK options</p>
                </div>
                <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="flex items-center gap-2 text-orange-700 font-medium">
                        <Cloud className="w-4 h-4" />
                        Auto-Scaling
                    </div>
                    <p className="text-xs text-orange-600 mt-1">Handles any volume</p>
                </div>
            </div>
        </div>
    );
};

export default ArchitectureDiagram;
