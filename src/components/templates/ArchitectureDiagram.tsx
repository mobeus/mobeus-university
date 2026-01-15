/**
 * ArchitectureDiagram
 * System architecture visualization
 * 
 * USE WHEN: Technical architecture, system components, "show me the architecture"
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each component is clickable → notifyTele
 */

import React from 'react';
import { Box, Database, Cloud, Server, Code, Shield, Cpu, Layers } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ArchitectureComponent {
    id: string;
    name: string;
    description?: string;
    icon?: string;
    layer?: 'top' | 'middle' | 'bottom';
    actionPhrase: string;
}

interface ArchitectureDiagramProps {
    title?: string;
    components: ArchitectureComponent[];
}

const iconMap: Record<string, React.ElementType> = {
    box: Box,
    database: Database,
    cloud: Cloud,
    server: Server,
    code: Code,
    shield: Shield,
    cpu: Cpu,
    layers: Layers,
};

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
    title,
    components = [],
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const getIcon = (iconName?: string) => {
        const IconComponent = iconMap[iconName?.toLowerCase() || 'box'] || Box;
        return <IconComponent className="w-6 h-6" />;
    };

    // Group by layer
    const topLayer = components.filter(c => c.layer === 'top');
    const middleLayer = components.filter(c => c.layer === 'middle' || !c.layer);
    const bottomLayer = components.filter(c => c.layer === 'bottom');

    const renderComponent = (component: ArchitectureComponent) => (
        <div
            key={component.id}
            className="glass-card-standard glass-card-clickable flex-1 min-w-[140px] text-center group"
            onClick={() => handleAction(component.actionPhrase)}
        >
            <div className="template-icon-container mx-auto mb-2 group-hover:scale-110 transition-transform">
                {getIcon(component.icon)}
            </div>
            <h4 className="text-template-subtitle text-sm group-hover:text-sapphire transition-colors">
                {component.name}
            </h4>
            {component.description && (
                <p className="text-template-content text-xs mt-1">{component.description}</p>
            )}
        </div>
    );

    return (
        <div className="glass-template-container">
            {title && <h3 className="text-template-title text-xl mb-6 text-center">{title}</h3>}

            <div className="space-y-4">
                {/* Top Layer */}
                {topLayer.length > 0 && (
                    <div className="glass-card-minimal bg-sapphire/5 p-4">
                        <div className="text-sapphire text-xs font-medium mb-3 text-center">Presentation Layer</div>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {topLayer.map(renderComponent)}
                        </div>
                    </div>
                )}

                {/* Connector */}
                {topLayer.length > 0 && middleLayer.length > 0 && (
                    <div className="flex justify-center">
                        <div className="w-0.5 h-4 bg-mist/20" />
                    </div>
                )}

                {/* Middle Layer */}
                {middleLayer.length > 0 && (
                    <div className="glass-card-minimal bg-jade/5 p-4">
                        <div className="text-jade text-xs font-medium mb-3 text-center">Business Logic Layer</div>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {middleLayer.map(renderComponent)}
                        </div>
                    </div>
                )}

                {/* Connector */}
                {middleLayer.length > 0 && bottomLayer.length > 0 && (
                    <div className="flex justify-center">
                        <div className="w-0.5 h-4 bg-mist/20" />
                    </div>
                )}

                {/* Bottom Layer */}
                {bottomLayer.length > 0 && (
                    <div className="glass-card-minimal bg-turmeric/5 p-4">
                        <div className="text-turmeric text-xs font-medium mb-3 text-center">Data Layer</div>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {bottomLayer.map(renderComponent)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArchitectureDiagram;
