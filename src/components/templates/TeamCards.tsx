/**
 * TeamCards
 * Display team members or contacts in card format
 */

import React from "react";
import { Mail, Phone, Calendar, Linkedin, MessageCircle } from "lucide-react";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";

interface TeamMember {
    id: string;
    name: string;
    role: string;
    department?: string;
    email?: string;
    phone?: string;
    imageUrl?: string;
    specialty?: string;
    actionPhrase?: string;
}

interface TeamCardsProps {
    members: TeamMember[];
    title?: string;
    subtitle?: string;
    columns?: 2 | 3 | 4;
    animationClass?: string;
    isExiting?: boolean;
}

export const TeamCards: React.FC<TeamCardsProps> = ({
    members = [],
    title,
    subtitle,
    columns = 3,
    animationClass = "",
    isExiting = false,
}) => {
    const { playClick } = useSound();

    const handleMemberClick = (member: TeamMember) => {
        playClick();
        if (member.actionPhrase) {
            sendToTele(member.actionPhrase);
        }
    };

    const gridCols = {
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-2 md:grid-cols-4",
    };

    const getInitials = (name: string) => {
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    };

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            {/* Header */}
            {title && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    {subtitle && <p className="text-white/70 mt-1">{subtitle}</p>}
                </div>
            )}

            {/* Team Grid */}
            <div className={`grid ${gridCols[columns]} gap-4`}>
                {members.map((member) => (
                    <div
                        key={member.id}
                        onClick={() => handleMemberClick(member)}
                        className={`p-5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/30 transition-all ${member.actionPhrase ? "cursor-pointer" : ""
                            }`}
                    >
                        {/* Avatar */}
                        <div className="flex items-center gap-4 mb-4">
                            {member.imageUrl ? (
                                <img
                                    src={member.imageUrl}
                                    alt={member.name}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white font-bold text-lg">
                                    {getInitials(member.name)}
                                </div>
                            )}
                            <div>
                                <h3 className="font-semibold text-white">{member.name}</h3>
                                <p className="text-sm text-orange-400">{member.role}</p>
                                {member.department && (
                                    <p className="text-xs text-white/50">{member.department}</p>
                                )}
                            </div>
                        </div>

                        {/* Specialty */}
                        {member.specialty && (
                            <p className="text-sm text-white/70 mb-4">{member.specialty}</p>
                        )}

                        {/* Contact Actions */}
                        <div className="flex items-center gap-2">
                            {member.email && (
                                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                                    <Mail className="w-4 h-4 text-white/70" />
                                </button>
                            )}
                            {member.phone && (
                                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                                    <Phone className="w-4 h-4 text-white/70" />
                                </button>
                            )}
                            <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                                <Calendar className="w-4 h-4 text-white/70" />
                            </button>
                            <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                                <MessageCircle className="w-4 h-4 text-white/70" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default TeamCards;
