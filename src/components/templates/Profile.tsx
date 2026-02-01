/**
 * Profile - GENERIC
 * User or company profile display
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, Mail, Phone, MapPin, Globe, Calendar, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ContactInfo {
    icon?: string;
    label: string;
    value: string;
    actionPhrase?: string;
}

interface Stat {
    value: string;
    label: string;
}

interface ProfileProps {
    avatarUrl?: string;
    avatarPrompt?: string;
    name?: string;
    role?: string;
    bio?: string;
    stats?: Stat[];
    contacts?: ContactInfo[];
    tags?: string[];
    primaryLabel?: string;
    primaryPhrase?: string;
    secondaryLabel?: string;
    secondaryPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const Profile: React.FC<ProfileProps> = ({
    avatarUrl,
    avatarPrompt,
    name,
    role,
    bio,
    stats,
    contacts,
    tags,
    primaryLabel,
    primaryPhrase,
    secondaryLabel,
    secondaryPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full">
            <div className="max-w-2xl">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-sapphire/30 mb-6">
                        <SmartImage
                            assetId={avatarUrl || avatarPrompt || 'avatar'}
                            alt={name || 'Profile'}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {name && <h1 className="text-3xl font-bold text-white mb-2">{name}</h1>}
                    {role && <p className="text-lg text-sapphire">{role}</p>}
                </div>

                {/* Stats */}
                {stats && stats.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                                <div className="text-sm text-mist/50">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Bio */}
                {bio && (
                    <div className="mb-8 p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
                        <p className="text-mist/70 leading-relaxed">{bio}</p>
                    </div>
                )}

                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {tags.map((tag, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 rounded-full text-sm bg-sapphire/10 text-sapphire border border-sapphire/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Contact Info */}
                {contacts && contacts.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-3 mb-8">
                        {contacts.map((contact, i) => {
                            const IconComp = getIcon(contact.icon);
                            return (
                                <button
                                    key={i}
                                    onClick={() => contact.actionPhrase && handleAction(contact.actionPhrase)}
                                    className={`flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]
                                        ${contact.actionPhrase ? 'hover:border-sapphire/30 cursor-pointer' : ''} transition-all text-left`}
                                >
                                    <IconComp className="w-5 h-5 text-sapphire flex-shrink-0" />
                                    <div>
                                        <div className="text-xs text-mist/40">{contact.label}</div>
                                        <div className="text-sm text-white">{contact.value}</div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                    {primaryLabel && primaryPhrase && (
                        <button
                            className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 
                                bg-flamingo text-white font-semibold rounded-full 
                                hover:bg-flamingo/90 transition-all shadow-lg shadow-flamingo/20"
                            onClick={() => handleAction(primaryPhrase)}
                        >
                            {primaryLabel}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                    {secondaryLabel && secondaryPhrase && (
                        <button
                            className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 
                                bg-white/[0.05] border border-white/[0.1] text-white font-semibold rounded-full 
                                hover:bg-white/[0.1] transition-all"
                            onClick={() => handleAction(secondaryPhrase)}
                        >
                            {secondaryLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
