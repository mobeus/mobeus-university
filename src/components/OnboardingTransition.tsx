/**
 * OnboardingTransition
 * Animated transition overlay from static onboarding to dynamic experience
 * Content underneath slowly appears as the overlay fades
 */

import React, { useState, useEffect } from 'react';
import { teleAvatar as avatarProfile } from '@/assets';

interface OnboardingTransitionProps {
    isActive: boolean;
    onComplete: () => void;
}

const TRANSITION_PHASES = [
    { time: 0, text: 'Connecting to your AI Coach...' },
    { time: 800, text: 'Building your Skills Twin...' },
    { time: 1600, text: 'Preparing your journey...' },
    { time: 2400, text: 'Almost ready...' },
];

export const OnboardingTransition: React.FC<OnboardingTransitionProps> = ({
    isActive,
    onComplete
}) => {
    const [phase, setPhase] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const [bgRevealed, setBgRevealed] = useState(false);
    const [contentEmerging, setContentEmerging] = useState(false);

    useEffect(() => {
        if (!isActive) {
            setPhase(0);
            setFadeOut(false);
            setBgRevealed(false);
            setContentEmerging(false);
            return;
        }

        const timeouts: NodeJS.Timeout[] = [];

        // Start connecting to avatar IMMEDIATELY when transition begins
        const connectAvatar = async () => {
            const handleConnect = (window as any).handleConnectAvatar;
            if (handleConnect) {
                try {
                    await handleConnect();
                } catch (e) {
                    console.log('[OnboardingTransition] Avatar connection started');
                }
            }
        };
        connectAvatar();

        // Progress through phases
        TRANSITION_PHASES.forEach((p, index) => {
            const timeout = setTimeout(() => {
                setPhase(index);
            }, p.time);
            timeouts.push(timeout);
        });

        // Start revealing avatar background midway
        const bgRevealTimeout = setTimeout(() => {
            setBgRevealed(true);
        }, 1200);
        timeouts.push(bgRevealTimeout);

        // Start making content emerge (overlay becomes more transparent)
        const contentEmergingTimeout = setTimeout(() => {
            setContentEmerging(true);
        }, 2000);
        timeouts.push(contentEmergingTimeout);

        // Fade out and complete
        const fadeOutTimeout = setTimeout(() => {
            setFadeOut(true);
        }, 3500);
        timeouts.push(fadeOutTimeout);

        const completeTimeout = setTimeout(() => {
            onComplete();
        }, 4200);
        timeouts.push(completeTimeout);

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, [isActive, onComplete]);

    if (!isActive) return null;

    return (
        <div
            className={`
        fixed inset-0 z-[100] flex flex-col items-center justify-center 
        transition-all duration-700 ease-out
        ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
        >
            {/* Dark gradient background */}
            <div
                className={`absolute inset-0 transition-all duration-1000 ease-out ${contentEmerging
                    ? 'bg-gradient-to-b from-black/90 via-black/70 to-black/50'
                    : bgRevealed
                        ? 'bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80'
                        : 'bg-gradient-to-br from-black via-gray-900 to-black'
                    }`}
            />

            {/* Animated background glow */}
            <div className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ${contentEmerging ? 'opacity-50' : 'opacity-100'}`}>
                <div
                    className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 animate-pulse"
                    style={{
                        background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </div>

            {/* Content - moves up and fades as transition progresses */}
            <div
                className={`relative z-10 text-center space-y-8 transition-all duration-700 ${contentEmerging ? 'opacity-70 -translate-y-20' : 'opacity-100 translate-y-0'
                    } ${fadeOut ? 'opacity-0 -translate-y-32' : ''}`}
            >
                {/* Avatar profile image with animated ring */}
                <div className="relative">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/30 shadow-lg shadow-primary/20">
                        <img
                            src={avatarProfile}
                            alt="AI Career Coach"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Rotating loader ring */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-40 h-40 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>

                    {/* Pulsing glow behind avatar */}
                    <div className="absolute inset-0 flex items-center justify-center -z-10">
                        <div className="w-36 h-36 bg-primary/20 rounded-full blur-xl animate-pulse" />
                    </div>
                </div>

                {/* Phase text */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white animate-pulse">
                        {TRANSITION_PHASES[phase]?.text}
                    </h2>
                    <p className="text-white/50 text-sm">
                        Setting up your personalized experience
                    </p>
                </div>

                {/* Progress dots */}
                <div className="flex items-center justify-center gap-2">
                    {TRANSITION_PHASES.map((_, index) => (
                        <div
                            key={index}
                            className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${index <= phase ? 'bg-primary scale-100' : 'bg-mist/20 scale-75'}
              `}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OnboardingTransition;

