/**
 * Celebration
 * Celebration template shown after booking confirmation
 * Features confetti, success message, and meeting details
 */

import React, { useEffect, useState } from "react";
import { Check, Calendar, Clock, User, Mail, ArrowRight, PartyPopper, Sparkles } from "lucide-react";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";

interface MeetingDetails {
    hostName?: string;
    hostRole?: string;
    date?: string;
    time?: string;
    duration?: string;
    email?: string;
    meetingType?: string;
}

interface CelebrationProps {
    title?: string;
    subtitle?: string;
    message?: string;
    meetingDetails?: MeetingDetails;
    ctaLabel?: string;
    ctaActionPhrase?: string;
    showConfetti?: boolean;
    animationClass?: string;
    isExiting?: boolean;
}

// Confetti particle component
const Confetti: React.FC = () => {
    const [particles, setParticles] = useState<Array<{
        id: number;
        x: number;
        delay: number;
        duration: number;
        color: string;
        size: number;
    }>>([]);

    useEffect(() => {
        const colors = ['#ff6600', '#ffa500', '#ffcc00', '#ff3300', '#ffffff', '#00ff88', '#00ccff'];
        const newParticles = Array.from({ length: 60 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 2,
            duration: 2 + Math.random() * 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 4 + Math.random() * 8,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute animate-confetti-fall"
                    style={{
                        left: `${p.x}%`,
                        top: '-20px',
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        backgroundColor: p.color,
                        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                    }}
                />
            ))}
            <style>{`
                @keyframes confetti-fall {
                    0% {
                        transform: translateY(0) rotate(0deg) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg) scale(0.5);
                        opacity: 0;
                    }
                }
                .animate-confetti-fall {
                    animation: confetti-fall linear forwards;
                }
            `}</style>
        </div>
    );
};

export const Celebration: React.FC<CelebrationProps> = ({
    title = "Meeting Confirmed!",
    subtitle = "You're all set",
    message = "Your meeting has been scheduled. You'll receive a calendar invite shortly.",
    meetingDetails,
    ctaLabel = "Back to Home",
    ctaActionPhrase = "(M) Welcome - show me the 5 chapters overview",
    showConfetti = true,
    animationClass = "",
    isExiting = false,
}) => {
    const { playClick } = useSound();
    const [showCheck, setShowCheck] = useState(false);

    // Flash Tele on mount
    useEffect(() => {
        // Trigger Tele flash
        const flashTele = (window as any).teleNavigation?.flashTele;
        if (flashTele) {
            flashTele();
        }

        // Show check animation after a brief delay
        const timer = setTimeout(() => setShowCheck(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const handleCta = () => {
        playClick();
        if (ctaActionPhrase) {
            sendToTele(ctaActionPhrase);
        }
    };

    return (
        <div className={`w-full relative ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            {/* Confetti */}
            {showConfetti && <Confetti />}

            {/* Success Card */}
            <div className="relative z-10 max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md border-2 border-[#ff6600]/50 rounded-3xl p-8 md:p-12 shadow-2xl shadow-[#ff6600]/20">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-8">
                        <div className={`relative transition-all duration-500 ${showCheck ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ff6600] to-[#ff8533] flex items-center justify-center shadow-lg shadow-[#ff6600]/40">
                                <Check className="w-12 h-12 text-white stroke-[3]" />
                            </div>
                            {/* Sparkle effects */}
                            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-[#ff6600] animate-pulse" />
                            <Sparkles className="absolute -bottom-1 -left-3 w-5 h-5 text-[#ffcc00] animate-pulse delay-300" />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center items-center gap-2 mb-2">
                            <PartyPopper className="w-6 h-6 text-[#ff6600]" />
                            <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
                            <PartyPopper className="w-6 h-6 text-[#ff6600] transform scale-x-[-1]" />
                        </div>
                        <p className="text-white/60 text-lg">{subtitle}</p>
                    </div>

                    {/* Meeting Details */}
                    {meetingDetails && (
                        <div className="bg-white/5 rounded-xl p-6 mb-8 border border-white/10">
                            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Meeting Details</h3>
                            <div className="space-y-3">
                                {meetingDetails.hostName && (
                                    <div className="flex items-center gap-3">
                                        <User className="w-5 h-5 text-[#ff6600]" />
                                        <div>
                                            <span className="text-white font-medium">{meetingDetails.hostName}</span>
                                            {meetingDetails.hostRole && (
                                                <span className="text-white/50 ml-2">• {meetingDetails.hostRole}</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {meetingDetails.date && (
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-5 h-5 text-[#ff6600]" />
                                        <span className="text-white">{meetingDetails.date}</span>
                                    </div>
                                )}
                                {meetingDetails.time && (
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-[#ff6600]" />
                                        <span className="text-white">{meetingDetails.time}</span>
                                        {meetingDetails.duration && (
                                            <span className="text-white/50">({meetingDetails.duration})</span>
                                        )}
                                    </div>
                                )}
                                {meetingDetails.email && (
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-[#ff6600]" />
                                        <span className="text-white">{meetingDetails.email}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Message */}
                    <p className="text-center text-white/70 mb-8">{message}</p>

                    {/* CTA Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleCta}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff6600] to-[#ff8533] hover:from-[#ff6600] hover:to-[#ff6600] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#ff6600]/30 hover:shadow-[#ff6600]/50"
                        >
                            {ctaLabel}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Fiserv Badge */}
                <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                        <div className="w-3 h-3 rounded-full bg-[#ff6600]" />
                        Powered by Fiserv
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Celebration;
