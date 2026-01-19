import React, { useEffect, useState, useRef } from 'react';

/**
 * CursorThinkingIndicator
 * 
 * Shows a glowing sphere that appears first at the click position,
 * followed by subtle expanding rings while Tele is thinking.
 * Disappears when the navigation response arrives.
 * No sound - purely visual feedback.
 */
export const CursorThinkingIndicator: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null);
    const fadeTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        // Capture click position on any click
        const handleClick = (e: MouseEvent) => {
            setClickPosition({ x: e.clientX, y: e.clientY });
        };

        // Start showing when teleThinkingStart fires
        const handleThinkingStart = () => {
            setIsActive(true);
        };

        // Stop showing when navigation completes
        const handleNavigationChange = (e: CustomEvent<{ isLoading: boolean }>) => {
            if (!e.detail.isLoading) {
                fadeTimeoutRef.current = window.setTimeout(() => {
                    setIsActive(false);
                }, 150);
            }
        };

        window.addEventListener('click', handleClick, true);
        window.addEventListener('teleThinkingStart', handleThinkingStart);
        window.addEventListener('navigationLoadingChange', handleNavigationChange as EventListener);

        return () => {
            window.removeEventListener('click', handleClick, true);
            window.removeEventListener('teleThinkingStart', handleThinkingStart);
            window.removeEventListener('navigationLoadingChange', handleNavigationChange as EventListener);
            if (fadeTimeoutRef.current) {
                clearTimeout(fadeTimeoutRef.current);
            }
        };
    }, []);

    if (!isActive || !clickPosition) return null;

    return (
        <div
            className="fixed pointer-events-none z-[9999]"
            style={{
                left: clickPosition.x,
                top: clickPosition.y,
                transform: 'translate(-50%, -50%)',
            }}
        >
            {/* Primary glowing sphere - appears first */}
            <div
                className="absolute rounded-full animate-pulse"
                style={{
                    width: '20px',
                    height: '20px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(155, 93, 229, 0.9) 0%, rgba(124, 58, 237, 0.6) 40%, rgba(155, 93, 229, 0.2) 70%, transparent 100%)',
                    boxShadow: '0 0 15px rgba(155, 93, 229, 0.7), 0 0 30px rgba(124, 58, 237, 0.4), 0 0 45px rgba(155, 93, 229, 0.2)',
                    animation: 'spherePulse 1s ease-in-out infinite',
                }}
            />

            {/* Inner bright core */}
            <div
                className="absolute rounded-full"
                style={{
                    width: '8px',
                    height: '8px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(155, 93, 229, 0.8) 60%, transparent 100%)',
                    animation: 'corePulse 0.8s ease-in-out infinite',
                }}
            />

            {/* Subtle ring 1 - closest, appears with delay */}
            <div
                className="absolute rounded-full border border-flamingo/40"
                style={{
                    width: '30px',
                    height: '30px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    animation: 'ringExpand 2s ease-out infinite',
                    animationDelay: '0.3s',
                    opacity: 0,
                }}
            />

            {/* Subtle ring 2 - middle */}
            <div
                className="absolute rounded-full border border-amethyst/30"
                style={{
                    width: '30px',
                    height: '30px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    animation: 'ringExpand 2s ease-out infinite',
                    animationDelay: '0.8s',
                    opacity: 0,
                }}
            />

            {/* Subtle ring 3 - outermost, most faint */}
            <div
                className="absolute rounded-full border border-flamingo/20"
                style={{
                    width: '30px',
                    height: '30px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    animation: 'ringExpand 2s ease-out infinite',
                    animationDelay: '1.3s',
                    opacity: 0,
                }}
            />

            {/* CSS Keyframes */}
            <style>{`
                @keyframes spherePulse {
                    0%, 100% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1.15);
                        opacity: 0.85;
                    }
                }
                
                @keyframes corePulse {
                    0%, 100% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(0.85);
                        opacity: 0.7;
                    }
                }
                
                @keyframes ringExpand {
                    0% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 0.5;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(3);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default CursorThinkingIndicator;
