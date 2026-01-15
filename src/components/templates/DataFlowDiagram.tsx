/**
 * DataFlowDiagram
 * Data flow between systems
 * 
 * USE WHEN: Integration flows, data pipelines, system connections
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each node is clickable → notifyTele
 */

import React from 'react';
import { ArrowRight, Database, Cloud, Server, Code, Shield } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface FlowNode {
    id: string;
    name: string;
    type?: 'source' | 'process' | 'destination';
    icon?: 'database' | 'cloud' | 'server' | 'code' | 'shield';
    actionPhrase: string;
}

interface DataFlowDiagramProps {
    title?: string;
    nodes: FlowNode[];
}

const iconMap = {
    database: Database,
    cloud: Cloud,
    server: Server,
    code: Code,
    shield: Shield,
};

const typeColors = {
    source: 'bg-turmeric/20 border-turmeric/40',
    process: 'bg-sapphire/20 border-sapphire/40',
    destination: 'bg-jade/20 border-jade/40',
};

export const DataFlowDiagram: React.FC<DataFlowDiagramProps> = ({
    title,
    nodes = [],
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const getIcon = (iconName?: string) => {
        const IconComponent = iconMap[iconName as keyof typeof iconMap] || Server;
        return <IconComponent className="w-6 h-6" />;
    };

    return (
        <div className="glass-template-container">
            {title && <h3 className="text-template-title text-xl mb-6 text-center">{title}</h3>}

            <div className="flex flex-wrap items-center justify-center gap-4">
                {nodes?.map((node, index) => (
                    <React.Fragment key={node.id}>
                        <div
                            className={`glass-card-clickable rounded-xl border-2 p-4 min-w-[140px] text-center group ${typeColors[node.type || 'process']
                                }`}
                            onClick={() => handleAction(node.actionPhrase)}
                        >
                            <div className="template-icon-container mx-auto mb-2 group-hover:scale-110 transition-transform">
                                {getIcon(node.icon)}
                            </div>
                            <h4 className="text-template-subtitle text-sm group-hover:text-sapphire transition-colors">
                                {node.name}
                            </h4>
                            {node.type && (
                                <span className="text-mist/40 text-xs capitalize">{node.type}</span>
                            )}
                        </div>

                        {index < nodes.length - 1 && (
                            <ArrowRight className="w-6 h-6 text-mist/40 flex-shrink-0" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default DataFlowDiagram;
