/**
 * ContactCard
 * Contact information display
 * 
 * USE WHEN: Contact info, "how to reach us", sales contact
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Contact actions are clickable → notifyTele
 */

import React from 'react';
import { Mail, Phone, Calendar, MapPin, Linkedin, ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ContactCardProps {
    name: string;
    role?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedIn?: string;
    imageUrl?: string;
    imagePrompt?: string;
    bookMeetingActionPhrase?: string;
    contactActionPhrase: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({
    name,
    role,
    email,
    phone,
    location,
    linkedIn,
    imageUrl,
    imagePrompt,
    bookMeetingActionPhrase,
    contactActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const hasImage = imageUrl || imagePrompt;

    return (
        <div className="glass-template-container">
            <div className="glass-card-featured">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Avatar */}
                    {hasImage ? (
                        <div className="w-24 h-24 rounded-full overflow-hidden glass-image-container flex-shrink-0">
                            <SmartImage
                                assetId={imageUrl || imagePrompt || ''}
                                alt={name}
                                className="smart-image w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-sapphire/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-3xl font-bold text-sapphire">
                                {name.charAt(0)}
                            </span>
                        </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-template-title text-xl">{name}</h3>
                        {role && <p className="text-turmeric text-sm font-medium">{role}</p>}

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-template-content text-sm">
                            {email && (
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-mist/60" />
                                    <span>{email}</span>
                                </div>
                            )}
                            {phone && (
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-mist/60" />
                                    <span>{phone}</span>
                                </div>
                            )}
                            {location && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-mist/60" />
                                    <span>{location}</span>
                                </div>
                            )}
                            {linkedIn && (
                                <div className="flex items-center gap-2">
                                    <Linkedin className="w-4 h-4 text-mist/60" />
                                    <span>LinkedIn</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                        {bookMeetingActionPhrase && (
                            <button
                                className="btn-cta glass-card-clickable"
                                onClick={() => handleAction(bookMeetingActionPhrase)}
                            >
                                <Calendar className="w-4 h-4 mr-2" />
                                Book Meeting
                            </button>
                        )}
                        <button
                            className="glass-card-minimal glass-card-clickable text-center py-2 px-4 flex items-center justify-center gap-2"
                            onClick={() => handleAction(contactActionPhrase)}
                        >
                            <span>Contact</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
