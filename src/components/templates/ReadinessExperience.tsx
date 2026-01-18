/**
 * ReadinessExperience
 * Interactive assessment where user speaks about concepts, bars fill in real-time
 * Full-screen celebration with flash teles and animations when all concepts pass
 * 
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Every clickable element calls notifyTele()
 */

import React, { useEffect, useState, useRef } from 'react';
import { Rocket, Sparkles, CheckCircle2, Zap, Star } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ReadinessConcept {
    concept: string;
    description: string;
    progress?: number; // 0-100, updated by runtime agent
    actionPhrase?: string;
}

interface ReadinessExperienceProps {
    title?: string;
    subtitle?: string;
    concepts?: ReadinessConcept[];
    threshold?: number; // Default 80%
    celebrationActionPhrase?: string;
}

export const ReadinessExperience: React.FC<ReadinessExperienceProps> = ({
    title = 'Speak to Prove Your Knowledge',
    subtitle = 'Tell me what you know about each concept. Watch your progress bars fill as you explain.',
    concepts = [
        { concept: 'What is a Tele?', description: 'Conversational AI with visual interface', progress: 0, actionPhrase: 'I want to explain what a tele is' },
        { concept: 'Two-Agent Architecture', description: 'Build LLM + Runtime LLM working together', progress: 0, actionPhrase: 'I want to explain the two agents' },
        { concept: 'navigateToSection', description: 'The bridge between tele and glass', progress: 0, actionPhrase: 'I want to explain navigateToSection' },
        { concept: 'Slash Commands', description: '/add-glass, /add-knowledge, /tele-should', progress: 0, actionPhrase: 'I want to explain slash commands' },
        { concept: 'Hackathon Phases', description: '6 phases × 30 minutes each', progress: 0, actionPhrase: 'I want to explain the hackathon phases' },
    ],
    threshold = 80,
    celebrationActionPhrase = 'Start the hackathon overview',
}) => {
    const { playClick } = useSound();
    const [showCelebration, setShowCelebration] = useState(false);
    const [flashActive, setFlashActive] = useState(false);
    const [celebrationPhase, setCelebrationPhase] = useState(0);
    const celebrationAudioRef = useRef<HTMLAudioElement | null>(null);

    // Check if all concepts are above threshold
    const allPassed = concepts.every(c => (c.progress || 0) >= threshold);
    const averageProgress = concepts.reduce((sum, c) => sum + (c.progress || 0), 0) / concepts.length;
    const passedCount = concepts.filter(c => (c.progress || 0) >= threshold).length;

    // Trigger celebration when all pass
    useEffect(() => {
        if (allPassed && !showCelebration) {
            setShowCelebration(true);
            // Start celebration animation sequence
            const flashInterval = setInterval(() => {
                setFlashActive(prev => !prev);
            }, 150);

            // Progress through celebration phases
            const phaseInterval = setInterval(() => {
                setCelebrationPhase(prev => (prev + 1) % 5);
            }, 400);

            // Clean up after 5 seconds
            setTimeout(() => {
                clearInterval(flashInterval);
                clearInterval(phaseInterval);
                setFlashActive(false);
            }, 5000);

            return () => {
                clearInterval(flashInterval);
                clearInterval(phaseInterval);
            };
        }
    }, [allPassed]);

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const getProgressColor = (progress: number) => {
        if (progress >= threshold) return 'bg-jade';
        if (progress >= 50) return 'bg-turmeric';
        if (progress >= 25) return 'bg-flamingo';
        return 'bg-mist/20';
    };

    const getProgressBorderColor = (progress: number) => {
        if (progress >= threshold) return 'border-jade/60';
        if (progress >= 50) return 'border-turmeric/60';
        if (progress >= 25) return 'border-flamingo/60';
        return 'border-mist/20';
    };

    // Avatar URLs for flash teles in celebration
    const flashTeles = [
        '/assets/carousel-slide-01.png',
        '/assets/carousel-slide-02.png',
        '/assets/carousel-slide-03.png',
        '/assets/carousel-slide-04.png',
        '/assets/carousel-slide-05.png',
        '/assets/carousel-slide-06.png',
    ];

    // FULL-SCREEN CELEBRATION
    if (showCelebration) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
                style={{
                    background: flashActive
                        ? 'linear-gradient(135deg, rgba(26, 77, 46, 0.95), rgba(71, 161, 173, 0.95))'
                        : 'linear-gradient(135deg, rgba(0, 61, 79, 0.98), rgba(13, 13, 13, 0.98))'
                }}
            >
                {/* Animated Background Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${2 + Math.random() * 3}s`,
                            }}
                        >
                            <Sparkles className={`w-4 h-4 ${flashActive ? 'text-turmeric' : 'text-jade/40'}`} />
                        </div>
                    ))}
                </div>

                {/* Flash Teles Grid */}
                <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-8 p-8 opacity-30">
                    {flashTeles.map((url, idx) => (
                        <div
                            key={idx}
                            className={`w-24 h-24 rounded-full overflow-hidden transition-all duration-200 ${celebrationPhase === idx ? 'scale-150 opacity-100 ring-4 ring-jade' : 'scale-100 opacity-40'
                                }`}
                            style={{
                                animationDelay: `${idx * 0.1}s`,
                            }}
                        >
                            <img src={url} alt="" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

                {/* Central Celebration Content */}
                <div className="relative z-10 text-center px-8">
                    {/* Pulsing Rocket */}
                    <div className="relative mb-8 inline-block">
                        <div className={`absolute inset-0 rounded-full ${flashActive ? 'bg-jade/40 animate-ping' : 'bg-jade/20'}`}
                            style={{ transform: 'scale(2)' }}
                        />
                        <div className={`relative w-32 h-32 rounded-full flex items-center justify-center 
                            ${flashActive ? 'bg-gradient-to-br from-jade to-turmeric' : 'bg-gradient-to-br from-jade to-sapphire'}
                            shadow-2xl transition-all duration-150`}
                        >
                            <Rocket className={`w-16 h-16 text-white ${flashActive ? 'animate-bounce' : 'animate-pulse'}`} />
                        </div>
                    </div>

                    {/* Hackathon Ready Badge */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Star className={`w-8 h-8 ${flashActive ? 'text-turmeric animate-spin' : 'text-jade'}`} />
                        <span className={`text-3xl font-black tracking-wider px-8 py-3 rounded-full 
                            ${flashActive ? 'bg-turmeric text-onyx' : 'bg-jade text-white'} 
                            transition-all duration-150 shadow-glow`}
                        >
                            HACKATHON READY
                        </span>
                        <Star className={`w-8 h-8 ${flashActive ? 'text-turmeric animate-spin' : 'text-jade'}`} />
                    </div>

                    {/* Celebration Text */}
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-4 animate-pulse">
                        🎉 You Did It! 🎉
                    </h1>
                    <p className="text-xl text-mist/80 mb-2">
                        All concepts mastered at <span className="text-jade font-bold">{Math.round(averageProgress)}%</span>
                    </p>
                    <p className="text-mist/60 mb-8">
                        You're ready to build your own tele!
                    </p>

                    {/* Concept Results */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-2xl mx-auto">
                        {concepts.map((concept, idx) => (
                            <div
                                key={idx}
                                className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200
                                    ${flashActive ? 'bg-jade/40 scale-105' : 'bg-jade/20'}`}
                            >
                                <CheckCircle2 className="w-4 h-4 text-jade" />
                                <span className="text-mist text-sm">{concept.concept}</span>
                                <span className="text-jade font-bold text-sm">{concept.progress}%</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <button
                        className={`px-12 py-5 text-xl font-bold rounded-full transition-all duration-200
                            ${flashActive
                                ? 'bg-turmeric text-onyx scale-110 shadow-2xl'
                                : 'bg-jade text-white hover:scale-105 shadow-glow'
                            }`}
                        onClick={() => handleAction(celebrationActionPhrase)}
                    >
                        <Zap className="w-6 h-6 inline mr-2" />
                        Begin Your Hackathon Journey
                    </button>
                </div>

                {/* Thinking Animation Dots */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${celebrationPhase === i ? 'bg-jade scale-150' : 'bg-mist/30'
                                }`}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // ASSESSMENT VIEW
    return (
        <div className="glass-template-container">
            {/* PROMINENT SPEAKING CTA - Clean and intuitive */}
            <div className="mb-6 p-5 bg-jade/10 rounded-2xl border border-jade/30">
                <p className="text-center text-jade text-xl font-bold mb-1">
                    I'm listening — just start talking about any topic below
                </p>
                <p className="text-center text-mist/60 text-sm">
                    Your progress bars will update automatically as you explain each concept
                </p>
            </div>

            {/* Overall Progress */}
            <div className="mb-6 p-4 glass-card-minimal">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-mist font-medium">Overall Readiness</span>
                    <div className="flex items-center gap-2">
                        <span className="text-mist/60 text-sm">{passedCount}/{concepts.length}</span>
                        <span className={`text-xl font-black ${averageProgress >= threshold ? 'text-jade' : 'text-turmeric'}`}>
                            {Math.round(averageProgress)}%
                        </span>
                    </div>
                </div>
                <div className="w-full h-4 bg-mist/10 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-1000 ease-out rounded-full ${averageProgress >= threshold
                            ? 'bg-gradient-to-r from-jade to-sapphire'
                            : 'bg-gradient-to-r from-flamingo via-turmeric to-jade'
                            }`}
                        style={{ width: `${averageProgress}%` }}
                    />
                </div>
            </div>

            {/* Concepts Grid */}
            <div className="space-y-4 mb-8">
                {concepts.map((concept, idx) => {
                    const isPassed = (concept.progress || 0) >= threshold;
                    const needsAttention = !isPassed && (concept.progress || 0) > 0;

                    return (
                        <div
                            key={idx}
                            className={`glass-card-minimal p-5 cursor-pointer transition-all duration-300 
                                ${getProgressBorderColor(concept.progress || 0)}
                                ${isPassed ? 'bg-jade/10' : needsAttention ? 'bg-turmeric/5 hover:bg-turmeric/10' : 'hover:border-sapphire/40'}
                                ${needsAttention ? 'ring-2 ring-turmeric/30' : ''}`}
                            onClick={() => concept.actionPhrase && handleAction(concept.actionPhrase)}
                        >
                            <div className="flex items-start gap-4">
                                {/* Status Icon - Number or Checkmark */}
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                                    ${isPassed ? 'bg-jade/20' : 'bg-mist/10'}`}
                                >
                                    {isPassed ? (
                                        <CheckCircle2 className="w-5 h-5 text-jade" />
                                    ) : (
                                        <span className="text-mist/60 font-bold">{idx + 1}</span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-mist font-bold">{concept.concept}</h3>
                                        <span className={`text-lg font-black ${isPassed ? 'text-jade' : needsAttention ? 'text-turmeric' : 'text-mist/40'
                                            }`}>
                                            {concept.progress || 0}%
                                        </span>
                                    </div>
                                    <p className="text-mist/60 text-sm mb-3">{concept.description}</p>

                                    {/* Progress Bar */}
                                    <div className="w-full h-3 bg-mist/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-1000 ease-out rounded-full ${getProgressColor(concept.progress || 0)}`}
                                            style={{ width: `${concept.progress || 0}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Simple reminder */}
            <div className="text-center text-mist/50 text-sm">
                <span className="text-jade font-bold">{threshold}%+</span> on all topics = 🎉 Celebration mode!
            </div>
        </div>
    );
};

export default ReadinessExperience;
