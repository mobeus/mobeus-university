/**
 * HackathonTimeline
 * Displays the 6-phase hackathon journey with progress tracking
 * 
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Every clickable element calls notifyTele()
 */

import React from 'react';
import { Mic, MessageSquare, Layout, BookOpen, FileText, Palette, Play, Clock, CheckCircle, Circle } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface HackathonPhase {
    id: string;
    title: string;
    time: string;
    duration: string;
    description: string;
    deliverable: string;
    status?: 'completed' | 'current' | 'upcoming';
    actionPhrase: string;
}

interface HackathonTimelineProps {
    title?: string;
    subtitle?: string;
    totalDuration?: string;
    phases?: HackathonPhase[];
    currentPhase?: number;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const PHASE_ICONS: Record<string, React.ElementType> = {
    'voice-coding': Mic,
    'vibe-coding': MessageSquare,
    'templates': Layout,
    'knowledge': BookOpen,
    'rules': FileText,
    'design': Palette,
};

const DEFAULT_PHASES: HackathonPhase[] = [
    {
        id: 'voice-coding',
        title: 'Voice Coding',
        time: '0:00 - 0:30',
        duration: '30 min',
        description: 'Train your tele by speaking in admin mode. Add knowledge and rules through voice commands.',
        deliverable: 'Tele knows 5+ facts and 3+ behavioral rules',
        status: 'upcoming',
        actionPhrase: 'Start voice coding phase'
    },
    {
        id: 'vibe-coding',
        title: 'Vibe Coding',
        time: '0:30 - 1:00',
        duration: '30 min',
        description: 'Iterate with Build Agent through natural conversation. Describe your goal, refine through dialogue.',
        deliverable: 'Working tele concept with basic templates',
        status: 'upcoming',
        actionPhrase: 'Start vibe coding phase'
    },
    {
        id: 'templates',
        title: 'Template Building',
        time: '1:00 - 1:30',
        duration: '30 min',
        description: 'Create custom visual components using the /add-glass workflow.',
        deliverable: '2-3 custom templates working',
        status: 'upcoming',
        actionPhrase: 'Start template building phase'
    },
    {
        id: 'knowledge',
        title: 'Knowledge Shaping',
        time: '1:30 - 2:00',
        duration: '30 min',
        description: 'Structure domain knowledge using the /add-knowledge workflow.',
        deliverable: 'Comprehensive tele-knowledge.md section',
        status: 'upcoming',
        actionPhrase: 'Start knowledge shaping phase'
    },
    {
        id: 'rules',
        title: 'Rules & Shot Prompts',
        time: '2:00 - 2:30',
        duration: '30 min',
        description: 'Define response mappings using the /tele-should workflow.',
        deliverable: '10+ shot prompts in glass-prompt.md',
        status: 'upcoming',
        actionPhrase: 'Start rules and prompts phase'
    },
    {
        id: 'design',
        title: 'Design & Polish',
        time: '2:30 - 3:00',
        duration: '30 min',
        description: 'Visual refinement, branding, and end-to-end testing.',
        deliverable: 'Production-ready tele with consistent design',
        status: 'upcoming',
        actionPhrase: 'Start design phase'
    }
];

export const HackathonTimeline: React.FC<HackathonTimelineProps> = ({
    title = 'Tele Builder Hackathon',
    subtitle = 'Build a complete tele from scratch in 3 hours',
    totalDuration = '3 hours',
    phases = DEFAULT_PHASES,
    currentPhase = 0,
    ctaLabel = 'Begin Hackathon',
    ctaActionPhrase = 'Start voice coding phase'
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    // Apply current phase status
    const phasesWithStatus = phases.map((phase, index) => ({
        ...phase,
        status: index < currentPhase ? 'completed' as const :
            index === currentPhase ? 'current' as const :
                'upcoming' as const
    }));

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="w-5 h-5 text-jade" />;
            case 'current':
                return <Play className="w-5 h-5 text-flamingo animate-pulse" />;
            default:
                return <Circle className="w-5 h-5 text-mist/40" />;
        }
    };

    return (
        <div className="glass-template-container">
            {/* Header */}
            <div className="text-left mb-8">
                <div className="template-badge inline-block mb-4">{totalDuration}</div>
                <h2 className="text-template-title text-3xl mb-2">{title}</h2>
                <p className="text-template-content">{subtitle}</p>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-flamingo via-sapphire to-jade opacity-30" />

                {/* Phases */}
                <div className="space-y-4">
                    {phasesWithStatus.map((phase, index) => {
                        const IconComponent = PHASE_ICONS[phase.id] || Circle;
                        const isClickable = phase.status !== 'completed';

                        return (
                            <div
                                key={phase.id}
                                className={`relative pl-16 ${isClickable ? 'glass-card-clickable' : ''}`}
                                onClick={isClickable ? () => handleAction(phase.actionPhrase) : undefined}
                            >
                                {/* Phase icon */}
                                <div className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center ${phase.status === 'current' ? 'bg-flamingo/20 border-2 border-flamingo' :
                                    phase.status === 'completed' ? 'bg-jade/20 border-2 border-jade' :
                                        'bg-mist/10 border border-mist/20'
                                    }`}>
                                    <IconComponent className={`w-5 h-5 ${phase.status === 'current' ? 'text-flamingo' :
                                        phase.status === 'completed' ? 'text-jade' :
                                            'text-mist/60'
                                        }`} />
                                </div>

                                {/* Phase content */}
                                <div className={`glass-card-minimal p-4 ${phase.status === 'current' ? 'border-flamingo/40' : ''
                                    }`}>
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            {getStatusIcon(phase.status || 'upcoming')}
                                            <h3 className="text-template-title text-lg">{phase.title}</h3>
                                        </div>
                                        <div className="flex items-center gap-2 text-mist/60 text-sm">
                                            <Clock className="w-4 h-4" />
                                            <span>{phase.time}</span>
                                        </div>
                                    </div>

                                    <p className="text-template-content text-sm mb-3">{phase.description}</p>

                                    <div className="flex items-center gap-2">
                                        <span className="template-badge-sapphire text-xs">Deliverable</span>
                                        <span className="text-mist/70 text-sm">{phase.deliverable}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* CTA */}
            <div className="mt-8 text-left">
                <button
                    className="btn-cta px-8 py-3 text-lg"
                    onClick={() => handleAction(ctaActionPhrase)}
                >
                    <Play className="w-5 h-5 mr-2 inline" />
                    {ctaLabel}
                </button>
            </div>
        </div>
    );
};

export default HackathonTimeline;
