/**
 * AboutCompany - Rich company information template
 * 
 * USE WHEN: Displaying company information, mission, partners, and team
 * FEATURES: Mission statement, partner logos, stats, team highlights
 */

import React from 'react';
import { ArrowRight, ExternalLink, Award, Users, Zap, Globe } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface Partner {
    name: string;
    type?: string;
    logoUrl?: string;
}

interface Stat {
    value: string;
    label: string;
    icon?: 'award' | 'users' | 'zap' | 'globe';
}

interface TeamMember {
    name: string;
    role: string;
    imageUrl?: string;
}

interface AboutCompanyProps {
    missionHeadline?: string;
    missionStatement?: string;
    tagline?: string;
    partners?: Partner[];
    stats?: Stat[];
    team?: TeamMember[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
    secondaryCtaLabel?: string;
    secondaryCtaActionPhrase?: string;
}

const iconMap = {
    award: Award,
    users: Users,
    zap: Zap,
    globe: Globe,
};

export const AboutCompany: React.FC<AboutCompanyProps> = ({
    missionHeadline = "Building the UI Layer for AI",
    missionStatement = "We believe every AI project deserves a user interface that people can actually use. Teles bridge the gap between powerful AI frameworks and consumer-ready experiences.",
    tagline = "Conversation + Visuals = Adoption",
    partners = [
        { name: "NVIDIA", type: "Inception Partner" },
        { name: "Accenture", type: "Spotlight Partner" },
        { name: "Google Cloud", type: "Partner" },
    ],
    stats = [
        { value: "3", label: "Hours to Build", icon: "zap" },
        { value: "5", label: "Deployment Channels", icon: "globe" },
        { value: "87%", label: "Adoption Lift", icon: "users" },
        { value: "1", label: "Codebase, All Channels", icon: "award" },
    ],
    team = [],
    ctaLabel = "Get the Repo",
    ctaActionPhrase = "How do I start",
    secondaryCtaLabel = "See Use Cases",
    secondaryCtaActionPhrase = "Show me use cases",
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container space-y-8">
            {/* Mission Section */}
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {missionHeadline}
                </h2>
                <p className="text-lg text-mist/80 leading-relaxed mb-4">
                    {missionStatement}
                </p>
                <p className="text-xl font-semibold text-sapphire">
                    {tagline}
                </p>
            </div>

            {/* Stats Grid */}
            {stats && stats.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => {
                        const IconComponent = iconMap[stat.icon || 'zap'];
                        return (
                            <div
                                key={index}
                                className="text-center p-6 rounded-xl bg-obsidian/40 border border-mist/10"
                            >
                                <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                                    <IconComponent className="w-5 h-5 text-sapphire" />
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-mist/60">
                                    {stat.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Partners Section */}
            {partners && partners.length > 0 && (
                <div className="p-6 rounded-xl bg-obsidian/40 border border-mist/10">
                    <h3 className="text-center text-sm font-semibold text-mist/50 uppercase tracking-wider mb-6">
                        Trusted Partners
                    </h3>
                    <div className="flex flex-wrap justify-center items-center gap-8">
                        {partners.map((partner, index) => (
                            <div
                                key={index}
                                className="text-center"
                            >
                                <div className="text-lg font-bold text-white">
                                    {partner.name}
                                </div>
                                {partner.type && (
                                    <div className="text-xs text-sapphire">
                                        {partner.type}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* What We Do - Value Props */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-obsidian/40 border border-mist/10">
                    <div className="w-10 h-10 mb-4 rounded-lg bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-sapphire" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Build in 3 Hours</h4>
                    <p className="text-sm text-mist/70">
                        From zero to deployed tele. Speak it or type it — no deep coding required.
                    </p>
                </div>
                <div className="p-5 rounded-xl bg-obsidian/40 border border-mist/10">
                    <div className="w-10 h-10 mb-4 rounded-lg bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-sapphire" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Deploy Anywhere</h4>
                    <p className="text-sm text-mist/70">
                        One codebase, five channels. Web, SMS, phone, avatar, and chat.
                    </p>
                </div>
                <div className="p-5 rounded-xl bg-obsidian/40 border border-mist/10">
                    <div className="w-10 h-10 mb-4 rounded-lg bg-sapphire/20 border border-sapphire/30 flex items-center justify-center">
                        <Users className="w-5 h-5 text-sapphire" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Drive Adoption</h4>
                    <p className="text-sm text-mist/70">
                        Conversation + visuals = people actually use it. No more shelf-ware.
                    </p>
                </div>
            </div>

            {/* Team Section (if provided) */}
            {team && team.length > 0 && (
                <div>
                    <h3 className="text-center text-sm font-semibold text-mist/50 uppercase tracking-wider mb-6">
                        The Team
                    </h3>
                    <div className="flex flex-wrap justify-center gap-6">
                        {team.map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-obsidian/60 border border-mist/20 overflow-hidden">
                                    {member.imageUrl ? (
                                        <SmartImage
                                            assetId={member.imageUrl}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-2xl text-mist/30">
                                            {member.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="text-white font-semibold">{member.name}</div>
                                <div className="text-xs text-mist/60">{member.role}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {ctaLabel && ctaActionPhrase && (
                    <button
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all text-lg"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                )}
                {secondaryCtaLabel && secondaryCtaActionPhrase && (
                    <button
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-mist/30 text-white font-semibold rounded-full hover:bg-mist/10 transition-all text-lg"
                        onClick={() => handleAction(secondaryCtaActionPhrase)}
                    >
                        {secondaryCtaLabel}
                        <ExternalLink className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default AboutCompany;
