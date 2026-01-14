/**
 * MeetingScheduler
 * Dynamic scheduling template that updates as user provides date/time/duration
 * Designed for live updates - props change trigger visual updates
 */

import React, { useState } from "react";
import { Calendar, Clock, Timer, User, CheckCircle, Building, Video, Phone } from "lucide-react";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";

interface TimeSlot {
    id: string;
    time: string;
    available: boolean;
}

interface MeetingSchedulerProps {
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

export const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({
    meetingDate,
    meetingTime,
    meetingDuration = "30 minutes",
    meetingType = "video",
    title = "Schedule Your Meeting",
    subtitle = "Let's find a time that works for you",
    hostName = "Fiserv Integration Team",
    hostRole = "Solutions Specialist",
    hostCompany = "Fiserv",
    hostImageUrl,
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
        if (ctaActionPhrase) {
            sendToTele(ctaActionPhrase);
        }
    };

    const getMeetingTypeIcon = () => {
        switch (meetingType) {
            case "video": return <Video className="w-5 h-5 text-cyan-500" />;
            case "phone": return <Phone className="w-5 h-5 text-cyan-500" />;
            default: return <Building className="w-5 h-5 text-cyan-500" />;
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
                <div className="max-w-lg mx-auto">
                    {/* Success Card */}
                    <div className="bg-gradient-to-br from-green-50 to-cyan-50 border-2 border-green-500 rounded-2xl p-8 text-center animate-fade-in">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Meeting Confirmed!</h2>
                        <p className="text-gray-600 mb-6">
                            {confirmationMessage || "You're all set. We'll send you a calendar invite shortly."}
                        </p>

                        {/* Meeting Summary */}
                        <div className="bg-white rounded-xl p-5 border border-gray-200 text-left space-y-3">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-cyan-500" />
                                <span className="text-gray-900 font-medium">{meetingDate}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-cyan-500" />
                                <span className="text-gray-900 font-medium">{meetingTime}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Timer className="w-5 h-5 text-cyan-500" />
                                <span className="text-gray-600">{meetingDuration}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                {getMeetingTypeIcon()}
                                <span className="text-gray-600">{getMeetingTypeLabel()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Fiserv Badge */}
                    <div className="flex justify-center mt-6">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <div className="w-3 h-3 rounded-full bg-orange-400" />
                            Powered by Fiserv
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
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                    <p className="text-white/60 mt-1">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left: Host Info */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                            {hostImageUrl ? (
                                <img src={hostImageUrl} alt={hostName} className="w-14 h-14 rounded-full object-cover" />
                            ) : (
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
                                    <User className="w-7 h-7 text-white" />
                                </div>
                            )}
                            <div>
                                <h3 className="font-semibold text-white">{hostName}</h3>
                                <p className="text-sm text-cyan-400">{hostRole}</p>
                                <p className="text-xs text-white/50">{hostCompany}</p>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3 text-white/70">
                                {getMeetingTypeIcon()}
                                <span>{getMeetingTypeLabel()}</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/70">
                                <Timer className="w-4 h-4 text-white/50" />
                                <span>{meetingDuration}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Meeting Details */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                        <h3 className="font-semibold text-white mb-4">Meeting Details</h3>

                        {/* Date */}
                        <div className="mb-4">
                            <label className="text-sm text-white/60 block mb-1">Date</label>
                            <div className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${meetingDate ? "border-cyan-500 bg-cyan-500/10" : "border-dashed border-white/30 bg-white/5"
                                }`}>
                                <Calendar className={`w-5 h-5 ${meetingDate ? "text-cyan-400" : "text-white/40"}`} />
                                <span className={meetingDate ? "text-white font-medium" : "text-white/40"}>
                                    {meetingDate || "Tell me your preferred date..."}
                                </span>
                            </div>
                        </div>

                        {/* Time */}
                        <div className="mb-4">
                            <label className="text-sm text-white/60 block mb-1">Time</label>
                            <div className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${meetingTime ? "border-cyan-500 bg-cyan-500/10" : "border-dashed border-white/30 bg-white/5"
                                }`}>
                                <Clock className={`w-5 h-5 ${meetingTime ? "text-cyan-400" : "text-white/40"}`} />
                                <span className={meetingTime ? "text-white font-medium" : "text-white/40"}>
                                    {meetingTime || "What time works for you?"}
                                </span>
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="mb-6">
                            <label className="text-sm text-white/60 block mb-1">Duration</label>
                            <div className="flex items-center gap-3 p-3 rounded-lg border border-white/20 bg-white/5">
                                <Timer className="w-5 h-5 text-white/40" />
                                <span className="text-white/70">{meetingDuration}</span>
                            </div>
                        </div>

                        {/* Confirm Button - Only shows when date + time are set */}
                        {showConfirmButton && (
                            <button
                                onClick={handleConfirm}
                                className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-cyan-500/20 animate-pulse-soft"
                            >
                                {ctaLabel || "Confirm Meeting"}
                            </button>
                        )}

                        {!canConfirm && (
                            <p className="text-center text-sm text-white/40">
                                Just tell me when you're available
                            </p>
                        )}
                    </div>
                </div>

                {/* Available Time Slots (if provided) */}
                {availableSlots.length > 0 && (
                    <div className="mt-6">
                        <h3 className="font-semibold text-white mb-3">Available Times</h3>
                        <div className="flex flex-wrap gap-2">
                            {availableSlots.map((slot) => (
                                <button
                                    key={slot.id}
                                    onClick={() => handleSlotSelect(slot)}
                                    disabled={!slot.available}
                                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${selectedSlot === slot.id
                                        ? "border-cyan-500 bg-cyan-500 text-white"
                                        : slot.available
                                            ? "border-white/20 bg-white/10 hover:border-cyan-400 text-white"
                                            : "border-white/10 bg-white/5 text-white/30 cursor-not-allowed"
                                        }`}
                                >
                                    {slot.time}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Fiserv Badge */}
                <div className="flex justify-center mt-6">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                        <div className="w-3 h-3 rounded-full bg-orange-400" />
                        Powered by Fiserv
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes pulse-soft {
          0%, 100% { box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3); }
          50% { box-shadow: 0 4px 25px rgba(6, 182, 212, 0.5); }
        }
        .animate-pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }
      `}</style>
        </div>
    );
};

export default MeetingScheduler;
