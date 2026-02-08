/**
 * Diagram - RICH GENERIC
 * Visual system architecture — labeled nodes with connections and descriptions
 * Designed for Teleglass triangle, Double Agent Architecture, etc.
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface DiagramNode {
    id: string;
    icon?: string;
    title: string;
    subtitle?: string;
    description?: string;
    variant?: 'primary' | 'secondary' | 'accent';
    actionPhrase?: string;
}

interface DiagramConnection {
    from: string;
    to: string;
    label?: string;
}

interface DiagramProps {
    icon?: string;
    badge?: string;
    headline?: string;
    subtitle?: string;
    nodes: DiagramNode[];
    connections?: DiagramConnection[];
    centerLabel?: string;
    caption?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

const variantStyles = {
    primary: {
        bg: 'bg-gradient-to-br from-flamingo/15 to-flamingo/5',
        border: 'border-flamingo/25',
        ring: 'ring-flamingo/15',
        iconBg: 'bg-flamingo/15 border-flamingo/25',
        iconColor: 'text-flamingo',
        titleColor: 'text-white',
        glow: 'shadow-flamingo/10',
    },
    secondary: {
        bg: 'bg-gradient-to-br from-sapphire/15 to-sapphire/5',
        border: 'border-sapphire/25',
        ring: 'ring-sapphire/15',
        iconBg: 'bg-sapphire/15 border-sapphire/25',
        iconColor: 'text-sapphire',
        titleColor: 'text-white',
        glow: 'shadow-sapphire/10',
    },
    accent: {
        bg: 'bg-gradient-to-br from-jade/15 to-jade/5',
        border: 'border-jade/25',
        ring: 'ring-jade/15',
        iconBg: 'bg-jade/15 border-jade/25',
        iconColor: 'text-jade',
        titleColor: 'text-white',
        glow: 'shadow-jade/10',
    },
};

export const Diagram: React.FC<DiagramProps> = ({
    icon,
    badge,
    headline,
    subtitle,
    nodes,
    connections,
    centerLabel,
    caption,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const HeaderIcon = getIcon(icon);

    // Determine layout based on number of nodes
    const nodeCount = nodes.length;
    const isTriangle = nodeCount === 3;
    const isPair = nodeCount === 2;

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {/* Header */}
            {(badge || headline) && (
                <div className="mb-8">
                    {(badge || icon) && (
                        <div className="flex items-center gap-3 mb-4">
                            {icon && (
                                <div className="w-12 h-12 rounded-xl bg-flamingo/10 border border-flamingo/20 flex items-center justify-center">
                                    <HeaderIcon className="w-6 h-6 text-flamingo" />
                                </div>
                            )}
                            {badge && (
                                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-flamingo/10 text-flamingo border border-flamingo/20">
                                    {badge}
                                </span>
                            )}
                        </div>
                    )}
                    {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                    {subtitle && <p className="text-mist/60 mt-2">{subtitle}</p>}
                </div>
            )}

            {/* Diagram Area */}
            <div className="flex-grow flex flex-col items-center justify-center py-6 md:py-10">
                {/* Triangle layout */}
                {isTriangle && (
                    <div className="relative w-full max-w-lg mx-auto">
                        {/* SVG Connection lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid meet">
                            {/* Triangle lines */}
                            <line x1="200" y1="50" x2="60" y2="260" stroke="url(#grad-line)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
                            <line x1="200" y1="50" x2="340" y2="260" stroke="url(#grad-line)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
                            <line x1="60" y1="260" x2="340" y2="260" stroke="url(#grad-line)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
                            {/* Connection label dots */}
                            {connections && connections.map((conn, i) => {
                                const positions = [
                                    { x: 130, y: 155 }, // top-left midpoint
                                    { x: 270, y: 155 }, // top-right midpoint
                                    { x: 200, y: 260 }, // bottom midpoint
                                ];
                                const pos = positions[i % 3];
                                return conn.label ? (
                                    <text key={i} x={pos?.x} y={pos?.y} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="10" fontWeight="500">
                                        {conn.label}
                                    </text>
                                ) : null;
                            })}
                            <defs>
                                <linearGradient id="grad-line" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="rgb(var(--flamingo-rgb, 244 114 182))" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="rgb(var(--jade-rgb, 52 211 153))" stopOpacity="0.6" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Center label */}
                        {centerLabel && (
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 z-10">
                                <div className="px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-sm">
                                    <span className="text-xs font-semibold text-mist/50 uppercase tracking-wider">{centerLabel}</span>
                                </div>
                            </div>
                        )}

                        {/* Top node */}
                        <div className="flex justify-center mb-8 md:mb-12">
                            <NodeCard node={nodes[0]} onAction={handleAction} />
                        </div>

                        {/* Bottom two nodes */}
                        <div className="flex justify-between gap-4 px-2">
                            <NodeCard node={nodes[1]} onAction={handleAction} />
                            <NodeCard node={nodes[2]} onAction={handleAction} />
                        </div>
                    </div>
                )}

                {/* Pair layout */}
                {isPair && (
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-lg">
                        <NodeCard node={nodes[0]} onAction={handleAction} />
                        <div className="flex flex-col items-center gap-2">
                            {connections && connections[0]?.label && (
                                <span className="text-xs text-mist/40 font-medium">{connections[0].label}</span>
                            )}
                            <div className="w-16 h-[2px] bg-gradient-to-r from-flamingo/40 to-jade/40 rounded-full" />
                        </div>
                        <NodeCard node={nodes[1]} onAction={handleAction} />
                    </div>
                )}

                {/* Grid fallback for 4+ nodes */}
                {!isTriangle && !isPair && (
                    <div className={`grid gap-4 w-full ${nodeCount <= 4 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                        {nodes.map((node, i) => (
                            <NodeCard key={i} node={node} onAction={handleAction} />
                        ))}
                    </div>
                )}
            </div>

            {/* Caption */}
            {caption && (
                <div className="text-center mt-4">
                    <p className="text-mist/40 text-sm italic">{caption}</p>
                </div>
            )}

            {/* CTA */}
            {ctaLabel && ctaActionPhrase && (
                <div className="pt-6 flex justify-center">
                    <button
                        className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                            hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                            transition-all text-lg shadow-lg shadow-flamingo/20"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

// Node card component
const NodeCard: React.FC<{ node: DiagramNode; onAction: (phrase: string) => void }> = ({ node, onAction }) => {
    const styles = variantStyles[node.variant || 'primary'];
    const Icon = getIcon(node.icon);

    return (
        <div
            onClick={() => node.actionPhrase && onAction(node.actionPhrase)}
            className={`relative rounded-2xl p-5 ${styles.bg} border ${styles.border} ring-1 ${styles.ring}
                shadow-lg ${styles.glow} max-w-[200px] w-full
                ${node.actionPhrase ? 'cursor-pointer hover:scale-[1.03] hover:shadow-xl' : ''}
                transition-all duration-300`}
        >
            <div className="flex flex-col items-center text-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${styles.iconBg} border flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${styles.iconColor}`} />
                </div>
                <div>
                    <div className={`text-sm font-bold ${styles.titleColor}`}>{node.title}</div>
                    {node.subtitle && (
                        <div className="text-xs text-mist/40 mt-1">{node.subtitle}</div>
                    )}
                </div>
                {node.description && (
                    <p className="text-xs text-mist/50 leading-relaxed">{node.description}</p>
                )}
            </div>
        </div>
    );
};

export default Diagram;
