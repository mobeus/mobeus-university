/**
 * ReadinessAssessment
 * Interactive assessment where user speaks about topics and progress bars fill
 * 
 * USE WHEN: Final check before hackathon - user demonstrates understanding verbally
 * FEATURES: All topics visible, progress bars animate, celebration at 80%+
 */

import React, { useEffect, useState } from 'react';
import { Rocket, Star, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ReadinessTopic {
    topic: string;
    description: string;
    progress?: number; // 0-100, updated by runtime agent
    actionPhrase?: string;
}

interface ReadinessAssessmentProps {
    title?: string;
    subtitle?: string;
    topics?: ReadinessTopic[];
    threshold?: number; // Default 80%
    celebrationActionPhrase?: string;
}

export const ReadinessAssessment: React.FC<ReadinessAssessmentProps> = ({
    title = 'Hackathon Readiness Assessment',
    subtitle = 'Tell me what you know about each topic. I will track your understanding.',
    topics = [
        { topic: 'What is a Tele?', description: 'Conversational AI app with visual interface', progress: 0, actionPhrase: 'Assess my understanding of teles' },
        { topic: 'Two-Agent Architecture', description: 'Build LLM + Runtime LLM working together', progress: 0, actionPhrase: 'Assess my understanding of two agents' },
        { topic: 'navigateToSection', description: 'The bridge between tele and glass', progress: 0, actionPhrase: 'Assess my understanding of navigateToSection' },
        { topic: 'Slash Commands', description: '/add-glass, /add-knowledge, /tele-should', progress: 0, actionPhrase: 'Assess my understanding of slash commands' },
        { topic: 'Hackathon Phases', description: '6 phases x 30 minutes each', progress: 0, actionPhrase: 'Assess my understanding of hackathon phases' },
    ],
    threshold = 80,
    celebrationActionPhrase = 'Start the hackathon overview',
}) => {
    const { playClick } = useSound();
    const [showCelebration, setShowCelebration] = useState(false);

    // Check if all topics are above threshold
    const allPassed = topics.every(t => (t.progress || 0) >= threshold);
    const averageProgress = topics.reduce((sum, t) => sum + (t.progress || 0), 0) / topics.length;

    useEffect(() => {
        if (allPassed && !showCelebration) {
            setShowCelebration(true);
        }
    }, [allPassed]);

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const getProgressColor = (progress: number) => {
        if (progress >= threshold) return 'bg-jade';
        if (progress >= 50) return 'bg-turmeric';
        return 'bg-flamingo';
    };

    const getProgressIcon = (progress: number) => {
        if (progress >= threshold) return <CheckCircle2 className="w-5 h-5 text-jade" />;
        if (progress > 0) return <MessageCircle className="w-5 h-5 text-turmeric" />;
        return <MessageCircle className="w-5 h-5 text-mist/40" />;
    };

    if (showCelebration) {
        return (
            <div className="glass-template-container text-center">
                {/* Celebration Animation */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-jade/20 rounded-full animate-ping" />
                    </div>
                    <div className="relative z-10 flex items-center justify-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-jade to-sapphire rounded-full flex items-center justify-center shadow-glow">
                            <Rocket className="w-12 h-12 text-white animate-bounce" />
                        </div>
                    </div>
                </div>

                {/* Celebration Text */}
                <div className="mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-6 h-6 text-turmeric animate-pulse" />
                        <span className="template-badge-jade text-lg px-4 py-2">HACKATHON READY</span>
                        <Sparkles className="w-6 h-6 text-turmeric animate-pulse" />
                    </div>
                    <h2 className="text-template-title text-4xl mb-4">🎉 Congratulations!</h2>
                    <p className="text-template-content text-xl mb-2">
                        You've demonstrated understanding of all key concepts!
                    </p>
                    <p className="text-mist/60">
                        Average score: <span className="text-jade font-bold">{Math.round(averageProgress)}%</span>
                    </p>
                </div>

                {/* Topic Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {topics.map((topic, idx) => (
                        <div key={idx} className="glass-card-minimal p-4 flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-jade flex-shrink-0" />
                            <div className="flex-1 text-left">
                                <p className="text-mist font-medium">{topic.topic}</p>
                                <p className="text-jade text-sm">{topic.progress}% understanding</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <button
                    className="btn-cta w-full py-4 text-lg flex items-center justify-center gap-2"
                    onClick={() => handleAction(celebrationActionPhrase)}
                >
                    <Rocket className="w-5 h-5" />
                    Begin Your Hackathon Journey
                </button>
            </div>
        );
    }

    return (
        <div className="glass-template-container">
            {/* Header */}
            <div className="text-left mb-8">
                <h2 className="text-template-title text-3xl mb-2">{title}</h2>
                <p className="text-template-content">{subtitle}</p>
            </div>

            {/* Overall Progress */}
            <div className="mb-8 p-4 glass-card-minimal">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-mist font-medium">Overall Readiness</span>
                    <span className={`font-bold ${averageProgress >= threshold ? 'text-jade' : 'text-turmeric'}`}>
                        {Math.round(averageProgress)}%
                    </span>
                </div>
                <div className="w-full h-4 bg-mist/10 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-1000 rounded-full ${averageProgress >= threshold ? 'bg-jade' : 'bg-gradient-to-r from-flamingo to-turmeric'}`}
                        style={{ width: `${averageProgress}%` }}
                    />
                </div>
                <p className="text-center text-mist/50 text-sm mt-2">
                    {averageProgress >= threshold
                        ? '🎉 All systems go!'
                        : `Need ${threshold}%+ on all topics to unlock hackathon mode`
                    }
                </p>
            </div>

            {/* Topics Grid */}
            <div className="space-y-4 mb-8">
                {topics.map((topic, idx) => (
                    <div
                        key={idx}
                        className={`glass-card-minimal p-4 cursor-pointer transition-all hover:border-sapphire/40 ${(topic.progress || 0) >= threshold ? 'border-jade/40 bg-jade/5' : ''}`}
                        onClick={() => topic.actionPhrase && handleAction(topic.actionPhrase)}
                    >
                        <div className="flex items-start gap-4">
                            {/* Status Icon */}
                            <div className="flex-shrink-0 mt-1">
                                {getProgressIcon(topic.progress || 0)}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-mist font-bold">{topic.topic}</h3>
                                    <span className={`text-sm font-medium ${(topic.progress || 0) >= threshold ? 'text-jade' : 'text-mist/60'}`}>
                                        {topic.progress || 0}%
                                    </span>
                                </div>
                                <p className="text-mist/60 text-sm mb-3">{topic.description}</p>

                                {/* Progress Bar */}
                                <div className="w-full h-2 bg-mist/10 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 rounded-full ${getProgressColor(topic.progress || 0)}`}
                                        style={{ width: `${topic.progress || 0}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Instructions */}
            <div className="text-center p-4 bg-sapphire/10 rounded-xl border border-sapphire/20">
                <MessageCircle className="w-8 h-8 text-sapphire mx-auto mb-2" />
                <p className="text-mist font-medium mb-1">How to use this assessment</p>
                <p className="text-mist/60 text-sm">
                    Click any topic and tell me what you know about it. I'll update your progress based on your explanation.
                    Get all bars to {threshold}%+ to unlock "Hackathon Ready" mode!
                </p>
            </div>
        </div>
    );
};

export default ReadinessAssessment;
