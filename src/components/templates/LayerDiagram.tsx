/**
 * LayerDiagram
 * Stacked layer visualization
 * 
 * USE WHEN: Technology stack, layered architecture, abstraction levels
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each layer is clickable → notifyTele
 */

import React from 'react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Layer {
    id: string;
    name: string;
    description?: string;
    color?: 'sapphire' | 'jade' | 'turmeric' | 'flamingo' | 'amethyst';
    actionPhrase: string;
}

interface LayerDiagramProps {
    title?: string;
    layers: Layer[];
}

const colorMap = {
    sapphire: 'bg-sapphire/20 border-sapphire/40 hover:bg-sapphire/30',
    jade: 'bg-jade/20 border-jade/40 hover:bg-jade/30',
    turmeric: 'bg-turmeric/20 border-turmeric/40 hover:bg-turmeric/30',
    flamingo: 'bg-flamingo/20 border-flamingo/40 hover:bg-flamingo/30',
    amethyst: 'bg-amethyst/20 border-amethyst/40 hover:bg-amethyst/30',
};

export const LayerDiagram: React.FC<LayerDiagramProps> = ({
    title,
    layers = [],
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const defaultColors: (keyof typeof colorMap)[] = ['sapphire', 'jade', 'turmeric', 'flamingo', 'amethyst'];

    return (
        <div className="glass-template-container">
            {title && <h3 className="text-template-title text-xl mb-6 text-center">{title}</h3>}

            <div className="space-y-2">
                {layers?.map((layer, index) => {
                    const color = layer.color || defaultColors[index % defaultColors.length];
                    return (
                        <div
                            key={layer.id}
                            className={`glass-card-clickable rounded-xl border-2 p-4 transition-all ${colorMap[color]}`}
                            onClick={() => handleAction(layer.actionPhrase)}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-template-subtitle">{layer.name}</h4>
                                    {layer.description && (
                                        <p className="text-template-content text-sm mt-1">{layer.description}</p>
                                    )}
                                </div>
                                <div className="text-mist/40 text-sm">Layer {layers.length - index}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LayerDiagram;
