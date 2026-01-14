/**
 * OnboardingStepComponents
 * Sub-components for OnboardingStep template
 * Extracted to keep OnboardingStep.tsx under 600 lines
 */

import React from "react";

// Device Icons
export const DeviceGoIcon = () => (
    <div className="relative w-32 h-24 flex items-center justify-center">
        <div className="w-20 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg relative">
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-green-400 opacity-80" />
            <div className="absolute bottom-2 right-2 w-8 h-1 bg-gray-300 rounded" />
        </div>
    </div>
);

export const DeviceFlexIcon = () => (
    <div className="relative w-32 h-24 flex items-center justify-center">
        <div className="w-12 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg relative overflow-hidden">
            <div className="absolute top-1 left-1 right-1 bottom-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded" />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-gray-700 rounded-full" />
        </div>
    </div>
);

export const DeviceMiniIcon = () => (
    <div className="relative w-32 h-24 flex items-center justify-center">
        <div className="w-28 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg relative transform rotate-[-5deg]">
            <div className="absolute top-1 left-1 right-1 bottom-4 bg-white rounded border border-gray-200" />
            <div className="absolute top-2 left-2 right-2 h-2 bg-cyan-500/20 rounded" />
            <div className="absolute top-5 left-2 right-2 space-y-1">
                <div className="h-1 bg-gray-200 rounded w-3/4" />
                <div className="h-1 bg-gray-200 rounded w-1/2" />
            </div>
        </div>
    </div>
);

export const getDeviceIcon = (deviceName: string) => {
    switch (deviceName.toLowerCase()) {
        case "go": return <DeviceGoIcon />;
        case "flex": return <DeviceFlexIcon />;
        case "mini": return <DeviceMiniIcon />;
        default: return <DeviceGoIcon />;
    }
};

export const PaymentCardIcon = () => (
    <svg className="w-24 h-24" viewBox="0 0 96 96" fill="none">
        <path d="M60 75c-3 0-5.5-1.5-7-4l-8-14c-1-2-3-3-5-3h-4c-3 0-5-2-5-5v-10c0-3 2-5 5-5h6c2 0 4 1 5 3l2 4" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="38" y="20" width="40" height="28" rx="3" stroke="#22c55e" strokeWidth="2.5" fill="none" transform="rotate(-15 58 34)" />
        <rect x="48" y="30" width="8" height="6" rx="1" stroke="#22c55e" strokeWidth="1.5" fill="none" transform="rotate(-15 52 33)" />
        <path d="M50 42 L72 38" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
        case "retail":
            return (<svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="8" y="12" width="32" height="28" rx="2" /><path d="M8 20h32" /><path d="M20 28h8" /></svg>);
        case "services":
            return (<svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 20c0-4.4 3.6-8 8-8s8 3.6 8 8" /><path d="M12 36l6-8 4 4 8-12 6 8" /><circle cx="24" cy="16" r="4" /></svg>);
        case "food":
            return (<svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 12v24M20 12v8c0 2-2 4-4 4s-4-2-4-4v-8" /><path d="M32 12v4c0 4-2 8-4 8v12" /><circle cx="36" cy="16" r="2" /><circle cx="36" cy="24" r="2" /></svg>);
        default:
            return (<svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="8" y="8" width="32" height="32" rx="4" /></svg>);
    }
};

// Confetti celebration component
export const Confetti = () => {
    const colors = ['#22d3ee', '#f97316', '#22c55e', '#eab308', '#ec4899', '#8b5cf6'];
    const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: colors[i % colors.length],
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
        size: 6 + Math.random() * 8,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute animate-confetti-fall"
                    style={{
                        left: `${p.left}%`,
                        top: '-20px',
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                        transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                />
            ))}
            <style>{`
                @keyframes confetti-fall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(600px) rotate(720deg); opacity: 0; }
                }
                .animate-confetti-fall {
                    animation: confetti-fall 3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

// Animated checkmark for celebration
export const AnimatedCheckmark = () => (
    <div className="relative w-16 h-16 mx-auto mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full animate-pulse-slow" />
        <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-10 h-10 text-white animate-check-draw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" className="animate-check-path" />
            </svg>
        </div>
        <style>{`
            @keyframes pulse-slow {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.9; }
            }
            @keyframes check-draw {
                0% { stroke-dashoffset: 24; }
                100% { stroke-dashoffset: 0; }
            }
            .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
            .animate-check-path { 
                stroke-dasharray: 24;
                stroke-dashoffset: 24;
                animation: check-draw 0.5s ease-out 0.3s forwards;
            }
        `}</style>
    </div>
);
