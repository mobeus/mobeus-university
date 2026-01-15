/**
 * TimelineVertical
 * Vertical timeline with events/milestones
 * 
 * USE WHEN: History, event sequence, vertical roadmap
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each event is clickable → notifyTele
 */

import React from 'react';
import { Circle, CheckCircle } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface TimelineEvent {
    date?: string;
    title: string;
    description?: string;
    status?: 'pending' | 'active' | 'complete';
    actionPhrase: string;
}

interface TimelineVerticalProps {
    title?: string;
    events: TimelineEvent[];
}

export const TimelineVertical: React.FC<TimelineVerticalProps> = ({
    title,
    events = [],
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const getStatusStyles = (status?: 'pending' | 'active' | 'complete') => {
        switch (status) {
            case 'complete':
                return { icon: CheckCircle, color: 'text-jade', bg: 'bg-jade/20', line: 'bg-jade/40' };
            case 'active':
                return { icon: Circle, color: 'text-sapphire', bg: 'bg-sapphire/20', line: 'bg-sapphire/40' };
            default:
                return { icon: Circle, color: 'text-mist/40', bg: 'bg-mist/10', line: 'bg-mist/20' };
        }
    };

    return (
        <div className="glass-template-container">
            {title && <h3 className="text-template-title text-xl mb-6">{title}</h3>}

            <div className="relative pl-8">
                {/* Vertical line */}
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-mist/20" />

                <div className="space-y-6">
                    {events?.map((event, index) => {
                        const { icon: Icon, color, bg } = getStatusStyles(event.status);
                        return (
                            <div
                                key={index}
                                className="relative glass-card-clickable group"
                                onClick={() => handleAction(event.actionPhrase)}
                            >
                                {/* Status dot */}
                                <div className={`absolute -left-8 top-0 w-6 h-6 rounded-full ${bg} flex items-center justify-center`}>
                                    <Icon className={`w-4 h-4 ${color}`} />
                                </div>

                                <div className="glass-card-minimal">
                                    {event.date && (
                                        <span className="text-turmeric text-sm font-medium">{event.date}</span>
                                    )}
                                    <h4 className="text-template-subtitle group-hover:text-sapphire transition-colors">
                                        {event.title}
                                    </h4>
                                    {event.description && (
                                        <p className="text-template-content text-sm mt-1">{event.description}</p>
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

export default TimelineVertical;
