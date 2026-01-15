/**
 * GanttChart
 * Project timeline/Gantt visualization
 * 
 * USE WHEN: Project timelines, task scheduling, resource planning
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each task is clickable → notifyTele
 */

import React from 'react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface GanttTask {
    id: string;
    name: string;
    start: number; // 0-100 position
    duration: number; // 0-100 width
    status?: 'pending' | 'in-progress' | 'complete';
    actionPhrase: string;
}

interface GanttChartProps {
    title?: string;
    tasks: GanttTask[];
    periods?: string[];
}

const statusColors = {
    pending: 'bg-mist/20',
    'in-progress': 'bg-sapphire',
    complete: 'bg-jade',
};

export const GanttChart: React.FC<GanttChartProps> = ({
    title,
    tasks = [],
    periods = ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            {title && <h3 className="text-template-title text-xl mb-4">{title}</h3>}

            <div className="glass-card-standard overflow-x-auto">
                {/* Header */}
                <div className="flex border-b border-mist/10 pb-2 mb-4">
                    <div className="w-32 flex-shrink-0 text-template-subtitle text-sm">Task</div>
                    <div className="flex-1 flex">
                        {periods.map((period, i) => (
                            <div key={i} className="flex-1 text-center text-template-content text-xs">
                                {period}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tasks */}
                <div className="space-y-3">
                    {tasks?.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center glass-card-clickable group"
                            onClick={() => handleAction(task.actionPhrase)}
                        >
                            <div className="w-32 flex-shrink-0 text-template-subtitle text-sm pr-4 truncate group-hover:text-sapphire transition-colors">
                                {task.name}
                            </div>
                            <div className="flex-1 relative h-8 bg-mist/5 rounded">
                                <div
                                    className={`absolute top-1 bottom-1 rounded transition-all ${statusColors[task.status || 'pending']
                                        }`}
                                    style={{
                                        left: `${task.start}%`,
                                        width: `${task.duration}%`,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="flex gap-4 mt-4 pt-4 border-t border-mist/10">
                    <div className="flex items-center gap-2 text-xs text-template-content">
                        <div className="w-3 h-3 rounded bg-mist/20" />
                        <span>Pending</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-template-content">
                        <div className="w-3 h-3 rounded bg-sapphire" />
                        <span>In Progress</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-template-content">
                        <div className="w-3 h-3 rounded bg-jade" />
                        <span>Complete</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GanttChart;
