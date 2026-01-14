/**
 * ContactCard
 * Display contact information with CTAs for human support
 */

import React from "react";
import { Phone, Mail, MessageCircle, Calendar, User, ExternalLink } from "lucide-react";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";

interface ContactOption {
    id: string;
    type: "phone" | "email" | "chat" | "calendar" | "person";
    title: string;
    value?: string;
    description?: string;
    available?: boolean;
    actionPhrase?: string;
}

interface ContactCardProps {
    contacts: ContactOption[];
    title?: string;
    subtitle?: string;
    animationClass?: string;
    isExiting?: boolean;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
    phone: Phone,
    email: Mail,
    chat: MessageCircle,
    calendar: Calendar,
    person: User,
};

export const ContactCard: React.FC<ContactCardProps> = ({
    contacts = [],
    title = "Need Human Help?",
    subtitle = "Our team is here for you",
    animationClass = "",
    isExiting = false,
}) => {
    const { playClick } = useSound();

    const handleContactClick = (contact: ContactOption) => {
        playClick();
        if (contact.actionPhrase) {
            sendToTele(contact.actionPhrase);
        }
    };

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6">
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                    <p className="text-gray-500 mt-1">{subtitle}</p>
                </div>

                {/* Contact Options */}
                <div className="grid gap-4">
                    {contacts.map((contact) => {
                        const IconComponent = iconMap[contact.type] || User;
                        return (
                            <button
                                key={contact.id}
                                onClick={() => handleContactClick(contact)}
                                disabled={contact.available === false}
                                className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${contact.available === false
                                        ? "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                                        : "border-gray-200 bg-white hover:border-cyan-500 hover:shadow-md cursor-pointer"
                                    }`}
                            >
                                <div className={`p-3 rounded-lg ${contact.available === false ? "bg-gray-100" : "bg-cyan-100"
                                    }`}>
                                    <IconComponent className={`w-6 h-6 ${contact.available === false ? "text-gray-400" : "text-cyan-600"
                                        }`} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-gray-900">{contact.title}</h3>
                                        {contact.available && (
                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                                                Available Now
                                            </span>
                                        )}
                                    </div>
                                    {contact.value && (
                                        <p className="text-cyan-600 font-medium mt-0.5">{contact.value}</p>
                                    )}
                                    {contact.description && (
                                        <p className="text-sm text-gray-500 mt-0.5">{contact.description}</p>
                                    )}
                                </div>
                                <ExternalLink className="w-5 h-5 text-gray-400" />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
