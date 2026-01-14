/**
 * Scheduler
 * Personal meeting scheduling template focused on the individual you'll meet
 * Full-width layout with 16:9 hero image of the host
 */

import React, { useState } from "react";
import { Calendar, Clock, Timer, User, CheckCircle, Building, Video, Phone, Mail, ArrowRight } from "lucide-react";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";

interface TimeSlot {
    id: string;
    time: string;
    available: boolean;
}

interface SchedulerProps {
    // Meeting details (can be updated dynamically)
    meetingDate?: string;       // e.g., "January 15, 2026" or "Tomorrow"
    meetingTime?: string;       // e.g., "2:00 PM"
    meetingDuration?: string;   // e.g., "30 minutes"
    meetingType?: "video" | "phone" | "in-person";

    // Display options
    title?: string;
    subtitle?: string;
    hostName?: string;
    hostRole?: string;
    hostCompany?: string;
    hostImageUrl?: string;
    hostBio?: string;           // Short bio about the host
    hostExpertise?: string[];   // Areas of expertise

    // Available time slots (if user needs to pick)
    availableSlots?: TimeSlot[];
    availableDates?: string[];

    // State
    isConfirmed?: boolean;
    confirmationMessage?: string;

    // Actions
    ctaLabel?: string;
    ctaActionPhrase?: string;

    // Standard props
    animationClass?: string;
    isExiting?: boolean;
}

export const Scheduler: React.FC<SchedulerProps> = ({
    meetingDate,
    meetingTime,
    meetingDuration = "30 minutes",
    meetingType = "video",
    title = "Meet Your Dedicated Specialist",
    subtitle = "Let's connect to discuss your goals",
    hostName = "Sarah Mitchell",
    hostRole = "Senior Integration Specialist",
    hostCompany = "Fiserv",
    hostImageUrl,
    hostBio = "Helping financial institutions transform their merchant acquisition strategy with innovative digital solutions.",
    hostExpertise = ["Merchant Onboarding", "API Integration", "Digital Payments"],
    availableSlots = [],
    availableDates = [],
    isConfirmed = false,
    confirmationMessage,
    ctaLabel,
    ctaActionPhrase,
    animationClass = "",
    isExiting = false,
}) => {
    const { playClick } = useSound();
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [email, setEmail] = useState("");

    // Determine if we have enough info to show confirm button
    const canConfirm = Boolean(meetingDate && meetingTime);
    const showConfirmButton = canConfirm && !isConfirmed;

    const handleSlotSelect = (slot: TimeSlot) => {
        if (!slot.available) return;
        playClick();
        setSelectedSlot(slot.id);
        sendToTele(`I'd like to schedule at ${slot.time}`);
    };

    const handleConfirm = () => {
        playClick();

        // Flash Tele
        const flashTele = (window as any).teleNavigation?.flashTele;
        if (flashTele) {
            flashTele();
        }

        // Navigate to celebration with meeting details
        const celebrationPayload = {
            badge: "CONFIRMED",
            title: "Meeting Confirmed!",
            subtitle: "You're all set",
            generativeSubsections: [{
                id: "meeting-celebration",
                templateId: "Celebration",
                props: {
                    title: "Meeting Confirmed!",
                    subtitle: "You're all set",
                    message: "Your meeting has been scheduled. You'll receive a calendar invite shortly at your email.",
                    meetingDetails: {
                        hostName: hostName,
                        hostRole: hostRole,
                        date: meetingDate,
                        time: meetingTime,
                        duration: meetingDuration,
                        email: email || undefined,
                        meetingType: meetingType
                    },
                    ctaLabel: "Back to Home",
                    ctaActionPhrase: "(M) Welcome - show me the 5 chapters overview",
                    showConfetti: true
                }
            }]
        };

        // Navigate to celebration
        const navigate = (window as any).teleNavigation?.navigateToSection;
        if (navigate) {
            navigate(celebrationPayload);
        }

        // Also notify Tele to speak
        if (ctaActionPhrase) {
            sendToTele(ctaActionPhrase);
        } else {
            sendToTele(`Show me the meeting confirmation celebration for ${meetingDate} at ${meetingTime}`);
        }
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            playClick();
            sendToTele(`My email is ${email}`);
        }
    };

    const getMeetingTypeIcon = () => {
        switch (meetingType) {
            case "video": return <Video className="w-5 h-5" />;
            case "phone": return <Phone className="w-5 h-5" />;
            default: return <Building className="w-5 h-5" />;
        }
    };

    const getMeetingTypeLabel = () => {
        switch (meetingType) {
            case "video": return "Video Conference";
            case "phone": return "Phone Call";
            default: return "In-Person Meeting";
        }
    };

    // Confirmed state
    if (isConfirmed) {
        return (
            <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
                {/* Success Card - Full Width */}
                <div className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/50 rounded-2xl p-8 text-center animate-fade-in backdrop-blur-sm">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6 shadow-lg shadow-green-500/30">
                        <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-3">Meeting Confirmed!</h2>
                    <p className="text-white/70 mb-8 text-lg">
                        {confirmationMessage || `You're all set to meet with ${hostName}. Check your email for the calendar invite.`}
                    </p>

                    {/* Meeting Summary - Centered */}
                    <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-left space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#ff6600]/20 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-[#ff6600]" />
                            </div>
                            <div>
                                <p className="text-white/50 text-xs">Date</p>
                                <p className="text-white font-medium">{meetingDate}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#ff6600]/20 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-[#ff6600]" />
                            </div>
                            <div>
                                <p className="text-white/50 text-xs">Time</p>
                                <p className="text-white font-medium">{meetingTime}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#ff6600]/20 flex items-center justify-center">
                                {getMeetingTypeIcon()}
                            </div>
                            <div>
                                <p className="text-white/50 text-xs">Format</p>
                                <p className="text-white font-medium">{getMeetingTypeLabel()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
                `}</style>
            </div>
        );
    }

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            {/* Hero Section - 16:9 Image with Overlay */}
            <div className="relative w-full aspect-video max-h-[400px] rounded-2xl overflow-hidden mb-8">
                {hostImageUrl ? (
                    <img
                        src={hostImageUrl}
                        alt={hostName}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#ff6600] via-[#ff6600]/80 to-[#003d5c] flex items-center justify-center">
                        <User className="w-24 h-24 text-white/50" />
                    </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#003d5c] via-transparent to-transparent" />

                {/* Host Info Overlay - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-end justify-between gap-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">{hostName}</h2>
                            <p className="text-[#ff6600] font-semibold text-lg mt-1">{hostRole}</p>
                            <p className="text-white/70">{hostCompany}</p>
                        </div>
                        <div className="hidden md:flex items-center gap-3 text-white/80">
                            {getMeetingTypeIcon()}
                            <span>{getMeetingTypeLabel()}</span>
                            <span className="text-white/40">•</span>
                            <Timer className="w-4 h-4" />
                            <span>{meetingDuration}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content - Full Width Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - About the Host */}
                <div className="lg:col-span-2 space-y-6">
                    {/* About Section */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
                        <p className="text-white/70 leading-relaxed mb-6">{hostBio}</p>

                        {/* Expertise Tags */}
                        {hostExpertise && hostExpertise.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {hostExpertise.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-[#ff6600]/20 border border-[#ff6600]/40 rounded-full text-sm text-[#ff6600]"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Mobile: Meeting Type & Duration */}
                    <div className="md:hidden bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 flex items-center justify-around">
                        <div className="flex items-center gap-2 text-white/70">
                            {getMeetingTypeIcon()}
                            <span className="text-sm">{getMeetingTypeLabel()}</span>
                        </div>
                        <div className="w-px h-6 bg-white/20" />
                        <div className="flex items-center gap-2 text-white/70">
                            <Timer className="w-4 h-4" />
                            <span className="text-sm">{meetingDuration}</span>
                        </div>
                    </div>

                    {/* Available Time Slots (if provided) */}
                    {availableSlots.length > 0 && (
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                            <h3 className="font-semibold text-white mb-4">Available Times</h3>
                            <div className="flex flex-wrap gap-3">
                                {availableSlots.map((slot) => (
                                    <button
                                        key={slot.id}
                                        onClick={() => handleSlotSelect(slot)}
                                        disabled={!slot.available}
                                        className={`px-5 py-3 rounded-lg border-2 text-sm font-medium transition-all ${selectedSlot === slot.id
                                            ? "border-[#ff6600] bg-[#ff6600] text-white"
                                            : slot.available
                                                ? "border-white/20 bg-white/10 hover:border-[#ff6600]/60 hover:bg-[#ff6600]/10 text-white"
                                                : "border-white/10 bg-white/5 text-white/30 cursor-not-allowed"
                                            }`}
                                    >
                                        {slot.time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* What to Expect Section */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">What to Expect</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#ff6600]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-[#ff6600] text-sm font-bold">1</span>
                                </div>
                                <div>
                                    <p className="text-white font-medium">Discovery Call</p>
                                    <p className="text-white/50 text-sm">We'll learn about your bank's merchant acquisition goals</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#ff6600]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-[#ff6600] text-sm font-bold">2</span>
                                </div>
                                <div>
                                    <p className="text-white font-medium">Custom Demo</p>
                                    <p className="text-white/50 text-sm">See the Offer Engine configured for your brand</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#ff6600]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-[#ff6600] text-sm font-bold">3</span>
                                </div>
                                <div>
                                    <p className="text-white font-medium">Next Steps</p>
                                    <p className="text-white/50 text-sm">Get a clear implementation roadmap and timeline</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Meeting Details & Booking Form */}
                <div className="space-y-6">
                    {/* Meeting Details Card */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                        <h3 className="font-semibold text-white mb-5">Schedule Your Call</h3>

                        {/* Date */}
                        <div className="mb-4">
                            <label className="text-sm text-white/60 block mb-2">Date</label>
                            <div className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${meetingDate
                                ? "border-[#ff6600] bg-[#ff6600]/10"
                                : "border-dashed border-white/30 bg-white/5"
                                }`}>
                                <Calendar className={`w-5 h-5 ${meetingDate ? "text-[#ff6600]" : "text-white/40"}`} />
                                <span className={meetingDate ? "text-white font-medium" : "text-white/40"}>
                                    {meetingDate || "Select your preferred date..."}
                                </span>
                            </div>
                        </div>

                        {/* Time */}
                        <div className="mb-4">
                            <label className="text-sm text-white/60 block mb-2">Time</label>
                            <div className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${meetingTime
                                ? "border-[#ff6600] bg-[#ff6600]/10"
                                : "border-dashed border-white/30 bg-white/5"
                                }`}>
                                <Clock className={`w-5 h-5 ${meetingTime ? "text-[#ff6600]" : "text-white/40"}`} />
                                <span className={meetingTime ? "text-white font-medium" : "text-white/40"}>
                                    {meetingTime || "What time works for you?"}
                                </span>
                            </div>
                        </div>

                        {/* Duration Display */}
                        <div className="mb-6">
                            <label className="text-sm text-white/60 block mb-2">Duration</label>
                            <div className="flex items-center gap-3 p-4 rounded-lg border border-white/20 bg-white/5">
                                <Timer className="w-5 h-5 text-white/40" />
                                <span className="text-white/70">{meetingDuration}</span>
                            </div>
                        </div>

                        {/* Email Capture */}
                        <div className="mb-6">
                            <label className="text-sm text-white/60 block mb-2">Your Email</label>
                            <form onSubmit={handleEmailSubmit} className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@company.com"
                                    className="w-full pl-12 pr-4 py-4 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-[#ff6600] focus:bg-[#ff6600]/5 transition-all"
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            </form>
                        </div>

                        {/* Confirm Button */}
                        {showConfirmButton ? (
                            <button
                                onClick={handleConfirm}
                                className="w-full py-4 px-6 bg-[#ff6600] hover:bg-[#ff6600]/90 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#ff6600]/20"
                            >
                                {ctaLabel || "Confirm Meeting"}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <p className="text-center text-sm text-white/50 py-2">
                                Just tell me when you're available
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Fiserv Badge - Centered at Bottom */}
            <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2 text-xs text-white/50">
                    <div className="w-3 h-3 rounded-full bg-[#ff6600]" />
                    Powered by Fiserv
                </div>
            </div>

            <style>{`
                @keyframes pulse-soft {
                    0%, 100% { box-shadow: 0 4px 15px rgba(255, 102, 0, 0.3); }
                    50% { box-shadow: 0 4px 25px rgba(255, 102, 0, 0.5); }
                }
                .animate-pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

export default Scheduler;
