/**
 * RoadmapView
 * Product/feature roadmap visualization
 * 
 * USE WHEN: Future plans, roadmap, "what's coming", release timeline
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each lane/item is clickable → notifyTele
 */

import React from 'react';
import { Calendar, Rocket, Star } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface RoadmapItem {
    id: string;
    title: string;
    description?: string;
    status?: 'done' | 'current' | 'planned' | 'future';
    highlight?: boolean;
    actionPhrase: string;
}

interface RoadmapLane {
    id: string;
    label: string;
    items: RoadmapItem[];
}

interface RoadmapViewProps {
    title?: string;
    lanes: RoadmapLane[];
}

const statusConfig = {
    done: { color: 'border-jade/40 bg-jade/10', dot: 'bg-jade' },
    current: { color: 'border-sapphire/40 bg-sapphire/10', dot: 'bg-sapphire' },
    planned: { color: 'border-turmeric/40 bg-turmeric/10', dot: 'bg-turmeric' },
    future: { color: 'border-mist/20 bg-mist/5', dot: 'bg-mist/40' },
};

export const RoadmapView: React.FC<RoadmapViewProps> = ({
    title,
    lanes = [],
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            {title && (
                <div className="flex items-center justify-center gap-2 mb-6">
                    <Rocket className="w-5 h-5 text-sapphire" />
                    <h3 className="text-template-title text-xl">{title}</h3>
                </div>
            )}

            <div className="overflow-x-auto">
                <div className="flex gap-4 min-w-max">
                    {lanes?.map((lane) => (
                        <div key={lane.id} className="w-64 flex-shrink-0">
                            {/* Lane Header */}
                            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-mist/20">
                                <Calendar className="w-4 h-4 text-mist/60" />
                                <span className="text-template-subtitle text-sm">{lane.label}</span>
                            </div>

                            {/* Lane Items */}
                            <div className="space-y-3">
                                {lane.items?.map((item) => {
                                    const config = statusConfig[item.status || 'planned'];
                                    return (
                                        <div
                                            key={item.id}
                                            className={`glass-card-clickable rounded-lg border p-3 group relative ${config.color}`}
                                            onClick={() => handleAction(item.actionPhrase)}
                                        >
                                            {item.highlight && (
                                                <Star className="absolute -top-1 -right-1 w-4 h-4 text-turmeric fill-turmeric" />
                                            )}
                                            <div className="flex items-start gap-2">
                                                <div className={`w-2 h-2 rounded-full mt-1.5 ${config.dot}`} />
                                                <div className="flex-1">
                                                    <h4 className="text-template-subtitle text-sm group-hover:text-sapphire transition-colors">
                                                        {item.title}
                                                    </h4>
                                                    {item.description && (
                                                        <p className="text-template-content text-xs mt-1">{item.description}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-mist/10">
                <div className="flex items-center gap-2 text-xs text-template-content">
                    <div className="w-2 h-2 rounded-full bg-jade" />
                    <span>Done</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-template-content">
                    <div className="w-2 h-2 rounded-full bg-sapphire" />
                    <span>Current</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-template-content">
                    <div className="w-2 h-2 rounded-full bg-turmeric" />
                    <span>Planned</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-template-content">
                    <div className="w-2 h-2 rounded-full bg-mist/40" />
                    <span>Future</span>
                </div>
            </div>
        </div>
    );
};

export default RoadmapView;
