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

            {/* Full Width Layout */}
            <div className="relative z-10 w-full">
                {/* Hero Header */}
                <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#ff6600] to-[#ff8533] shadow-lg shadow-[#ff6600]/40 mb-4 transition-all duration-500 ${showCheck ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                        <Check className="w-10 h-10 text-white stroke-[3]" />
                    </div>
                    <div className="flex justify-center items-center gap-2 mb-2">
                        <PartyPopper className="w-6 h-6 text-[#ff6600]" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
                        <PartyPopper className="w-6 h-6 text-[#ff6600] transform scale-x-[-1]" />
                    </div>
                    <p className="text-white/70 text-lg max-w-xl mx-auto">{message}</p>
                </div>

                {/* Three Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Left Column - What You're Getting */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-[#ff6600]" />
                            What You're Getting
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#ff6600]/20 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-4 h-4 text-[#ff6600]" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">One API Integration</p>
                                    <p className="text-white/50 text-sm">Single endpoint for all merchant services</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#ff6600]/20 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-4 h-4 text-[#ff6600]" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Your Branding</p>
                                    <p className="text-white/50 text-sm">White-label experience for your bank</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#ff6600]/20 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-4 h-4 text-[#ff6600]" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">New Revenue Stream</p>
                                    <p className="text-white/50 text-sm">Monetize merchant relationships</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Center Column - Meeting Details */}
                    <div className="bg-gradient-to-br from-[#ff6600]/20 to-[#ff6600]/5 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#ff6600]/40">
                        <h3 className="text-lg font-bold text-white mb-4">Meeting Details</h3>
                        {meetingDetails && (
                            <div className="space-y-4">
                                {meetingDetails.hostName && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#ff6600]/20 flex items-center justify-center">
                                            <User className="w-5 h-5 text-[#ff6600]" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{meetingDetails.hostName}</p>
                                            {meetingDetails.hostRole && (
                                                <p className="text-white/50 text-sm">{meetingDetails.hostRole}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {meetingDetails.date && (
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                        <Calendar className="w-5 h-5 text-[#ff6600]" />
                                        <span className="text-white font-medium">{meetingDetails.date}</span>
                                    </div>
                                )}
                                {meetingDetails.time && (
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                        <Clock className="w-5 h-5 text-[#ff6600]" />
                                        <span className="text-white font-medium">{meetingDetails.time}</span>
                                        {meetingDetails.duration && (
                                            <span className="text-white/50 text-sm">• {meetingDetails.duration}</span>
                                        )}
                                    </div>
                                )}
                                {meetingDetails.meetingType && (
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                        <div className="w-5 h-5 rounded-full bg-green-500/30 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-green-400" />
                                        </div>
                                        <span className="text-white font-medium capitalize">{meetingDetails.meetingType}</span>
                                    </div>
                                )}
                                {meetingDetails.email && (
                                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                        <Mail className="w-5 h-5 text-[#ff6600]" />
                                        <span className="text-white text-sm">{meetingDetails.email}</span>
                                    </div>
                                )}
                            </div>
                        )}
                        {!meetingDetails && (
                            <p className="text-white/50">Calendar invite will be sent shortly.</p>
                        )}
                    </div>

                    {/* Right Column - What's Next */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <ArrowRight className="w-5 h-5 text-[#ff6600]" />
                            What Happens Next
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#ff6600] flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">1</div>
                                <div>
                                    <p className="text-white font-medium">Calendar Invite</p>
                                    <p className="text-white/50 text-sm">Check your email for meeting link</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#ff6600]/60 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">2</div>
                                <div>
                                    <p className="text-white font-medium">Discovery Call</p>
                                    <p className="text-white/50 text-sm">We'll discuss your bank's needs</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#ff6600]/30 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">3</div>
                                <div>
                                    <p className="text-white font-medium">Custom Demo</p>
                                    <p className="text-white/50 text-sm">See your branded portal in action</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleCta}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff6600] to-[#ff8533] hover:from-[#ff6600] hover:to-[#ff6600] text-white font-bold rounded-full transition-all shadow-lg shadow-[#ff6600]/30 hover:shadow-[#ff6600]/50"
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
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
