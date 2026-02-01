/**
 * Team - GENERIC
 * Team/support display with features and members
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, Check, LucideIcon, Users } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Feature {
    icon?: string;
    text: string;
}

interface Member {
    icon?: string;
    role: string;
    description: string;
}

interface TeamProps {
    leftIcon?: string;
    headline?: string;
    subheadline?: string;
    description?: string;
    features?: Feature[];
    membersLabel?: string;
    members?: Member[];
    successNote?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Users;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Users;
};

export const Team: React.FC<TeamProps> = ({
    leftIcon,
    headline,
    subheadline,
    description,
    features,
    membersLabel,
    members,
    successNote,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };
    const LeftIconComp = getIcon(leftIcon);

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            <div className="grid md:grid-cols-2 gap-8 flex-grow">

                <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06] flex flex-col">
                    {(headline || leftIcon) && (
                        <div className="flex items-start gap-5 mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-sapphire/10 border border-sapphire/20 
                                flex items-center justify-center flex-shrink-0">
                                <LeftIconComp className="w-8 h-8 text-sapphire" />
                            </div>
                            <div className="pt-1">
                                {headline && <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h3>}
                                {subheadline && <p className="text-sapphire font-medium mt-1">{subheadline}</p>}
                            </div>
                        </div>
                    )}

                    {description && <p className="text-mist/70 text-lg leading-relaxed mb-8">{description}</p>}

                    {features && features.length > 0 && (
                        <div className="space-y-4 flex-grow">
                            {features.map((item, i) => {
                                const IconComp = getIcon(item.icon);
                                return (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl 
                                        bg-white/[0.02] border border-white/[0.04]
                                        hover:bg-white/[0.04] transition-colors">
                                        <IconComp className="w-5 h-5 text-sapphire flex-shrink-0" />
                                        <span className="text-mist/80">{item.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    {membersLabel && (
                        <p className="text-xs text-mist/40 uppercase tracking-widest font-medium pl-1">{membersLabel}</p>
                    )}

                    {members && members.map((member, i) => {
                        const MemberIcon = getIcon(member.icon);
                        return (
                            <div key={i} className="p-6 rounded-2xl bg-gradient-to-r from-white/[0.03] to-transparent 
                                border border-white/[0.06] flex items-center gap-5
                                hover:border-flamingo/20 transition-all group">
                                <div className="w-14 h-14 rounded-xl bg-flamingo/10 border border-flamingo/20 
                                    flex items-center justify-center flex-shrink-0
                                    group-hover:bg-flamingo/15 transition-colors">
                                    <MemberIcon className="w-7 h-7 text-flamingo" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg">{member.role}</p>
                                    <p className="text-sm text-mist/50 mt-0.5">{member.description}</p>
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex-grow" />

                    {successNote && (
                        <div className="p-5 rounded-xl bg-jade/10 border border-jade/20">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-jade/15 flex items-center justify-center">
                                    <Check className="w-4 h-4 text-jade" />
                                </div>
                                <span className="text-jade font-medium">{successNote}</span>
                            </div>
                        </div>
                    )}

                    {ctaLabel && ctaActionPhrase && (
                        <button
                            className="w-full inline-flex items-center justify-center gap-3 px-6 py-5 
                                bg-flamingo text-white font-semibold rounded-2xl 
                                hover:bg-flamingo/90 transition-all text-lg shadow-lg shadow-flamingo/20"
                            onClick={() => handleAction(ctaActionPhrase)}
                        >
                            {ctaLabel}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Team;
