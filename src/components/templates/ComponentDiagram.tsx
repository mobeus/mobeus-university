/**
 * ComponentDiagram
 * Component relationship visualization
 * 
 * USE WHEN: System components, module breakdown, component relationships
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each component is clickable → notifyTele
 */

import React from 'react';
import { Box, Package, Puzzle, Layers } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Component {
    id: string;
    name: string;
    description?: string;
    type?: 'core' | 'module' | 'service' | 'library';
    subComponents?: string[];
    actionPhrase: string;
}

interface ComponentDiagramProps {
    title?: string;
    components: Component[];
}

const typeConfig = {
    core: { icon: Box, color: 'bg-sapphire/20 border-sapphire/40 text-sapphire' },
    module: { icon: Package, color: 'bg-jade/20 border-jade/40 text-jade' },
    service: { icon: Puzzle, color: 'bg-turmeric/20 border-turmeric/40 text-turmeric' },
    library: { icon: Layers, color: 'bg-amethyst/20 border-amethyst/40 text-amethyst' },
};

export const ComponentDiagram: React.FC<ComponentDiagramProps> = ({
    title,
    components = [],
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            {title && <h3 className="text-template-title text-xl mb-6 text-center">{title}</h3>}

            <div className="template-grid-2">
                {components?.map((component) => {
                    const config = typeConfig[component.type || 'module'];
                    const Icon = config.icon;

                    return (
                        <div
                            key={component.id}
                            className={`glass-card-clickable rounded-xl border-2 p-4 group ${config.color.split(' ').slice(0, 2).join(' ')}`}
                            onClick={() => handleAction(component.actionPhrase)}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`template-icon-container ${config.color.split(' ')[0]}`}>
                                    <Icon className={`w-5 h-5 ${config.color.split(' ')[2]}`} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-template-subtitle group-hover:text-sapphire transition-colors">
                                        {component.name}
                                    </h4>
                                    <span className="text-mist/40 text-xs capitalize">{component.type || 'module'}</span>
                                    {component.description && (
                                        <p className="text-template-content text-sm mt-2">{component.description}</p>
                                    )}
                                    {component.subComponents && component.subComponents.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {component.subComponents.map((sub, i) => (
                                                <span key={i} className="text-xs bg-mist/10 px-2 py-0.5 rounded">
                                                    {sub}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ComponentDiagram;
