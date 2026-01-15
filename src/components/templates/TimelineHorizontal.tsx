/**
 * TimelineHorizontal
 * Horizontal timeline with milestone markers
 * 
 * USE WHEN: 3-3-3 delivery model, project phases, roadmaps, timelines
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each milestone is clickable → notifyTele
 */

import React from 'react';
import { Circle, CheckCircle } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Milestone {
    label: string;
    duration?: string;
    description?: string;
    status?: 'pending' | 'active' | 'complete';
    actionPhrase: string;
}

interface TimelineHorizontalProps {
    milestones: Milestone[];
}

export const TimelineHorizontal: React.FC<TimelineHorizontalProps> = ({
    milestones = [],
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const getStatusStyles = (status?: 'pending' | 'active' | 'complete') => {
        switch (status) {
            case 'complete':
                return { icon: CheckCircle, color: 'text-jade', bg: 'bg-jade/20' };
            case 'active':
                return { icon: Circle, color: 'text-sapphire', bg: 'bg-sapphire/20' };
            default:
                return { icon: Circle, color: 'text-mist/40', bg: 'bg-mist/10' };
        }
    };

    return (
        <div className="glass-template-container">
            <div className="relative">
                {/* Timeline line */}
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-mist/20" />

                {/* Milestones */}
                <div className="flex justify-between relative">
                    {milestones?.map((milestone, index) => {
                        const { icon: Icon, color, bg } = getStatusStyles(milestone.status);
                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center glass-card-clickable flex-1"
                                onClick={() => handleAction(milestone.actionPhrase)}
                            >
                                <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center z-10`}>
                                    <Icon className={`w-6 h-6 ${color}`} />
                                </div>
                                <div className="mt-4 text-center">
                                    {milestone.duration && (
                                        <div className="template-badge-sapphire mb-2">{milestone.duration}</div>
                                    )}
                                    <h4 className="text-template-subtitle">{milestone.label}</h4>
                                    {milestone.description && (
                                        <p className="text-template-content text-sm mt-1 max-w-[150px]">
                                            {milestone.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TimelineHorizontal;
