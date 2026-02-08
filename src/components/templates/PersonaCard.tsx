/**
 * PersonaCard - RICH GENERIC
 * Character profile card — name, location, role, pain point, transformation
 * Designed to make you care about a person before you hear their story
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, LucideIcon, Zap, MapPin, Briefcase, Quote } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface PersonaCardProps {
    icon?: string;
    badge?: string;
    name: string;
    role: string;
    location: string;
    imageUrl?: string;
    imagePrompt?: string;
    painPoint: string;
    transformation: string;
    impactQuote?: string;
    stats?: { value: string; label: string }[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const PersonaCard: React.FC<PersonaCardProps> = ({
    icon,
    badge,
    name,
    role,
    location,
    imageUrl,
    imagePrompt,
    painPoint,
    transformation,
    impactQuote,
    stats,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const HeaderIcon = getIcon(icon);
    const hasImage = imageUrl || imagePrompt;

    // Generate initials for avatar fallback
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {/* Top Bar - Badge */}
            {badge && (
                <div className="flex items-center gap-3 mb-6">
                    {icon && (
                        <div className="w-10 h-10 rounded-xl bg-sapphire/10 border border-sapphire/20 flex items-center justify-center">
                            <HeaderIcon className="w-5 h-5 text-sapphire" />
                        </div>
                    )}
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sapphire/10 text-sapphire border border-sapphire/20">
                        {badge}
                    </span>
                </div>
            )}

            {/* Profile Section */}
            <div className="flex items-start gap-5 mb-6">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                    {hasImage ? (
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-white/10 shadow-lg">
                            <SmartImage
                                assetId={imageUrl || imagePrompt || `persona-${name}`}
                                alt={name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-flamingo/20 to-sapphire/20 border-2 border-white/10 flex items-center justify-center shadow-lg">
                            <span className="text-2xl md:text-3xl font-bold text-white/80">{initials}</span>
                        </div>
                    )}
                    {/* Online-style indicator */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-jade border-2 border-[var(--midnight)] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                </div>

                {/* Name & Details */}
                <div className="flex-grow min-w-0">
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight truncate">{name}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        <div className="flex items-center gap-1.5 text-mist/50">
                            <Briefcase className="w-3.5 h-3.5" />
                            <span className="text-sm">{role}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-mist/50">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="text-sm">{location}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pain Point — The Struggle */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-red-400/60 mb-2">The Struggle</div>
                <p className="text-mist/55 leading-relaxed text-sm">{painPoint}</p>
            </div>

            {/* Transformation — With a Tele */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-jade/10 to-jade/[0.03] border border-jade/20 mb-4 flex-grow">
                <div className="text-xs font-bold uppercase tracking-wider text-jade/80 mb-2">With a Tele</div>
                <p className="text-mist/75 leading-relaxed text-sm">{transformation}</p>
            </div>

            {/* Impact Quote */}
            {impactQuote && (
                <div className="relative p-5 rounded-2xl bg-gradient-to-r from-flamingo/[0.06] to-transparent border border-flamingo/15 mb-4">
                    <Quote className="absolute top-4 right-4 w-8 h-8 text-flamingo/15" />
                    <p className="text-white/90 font-medium italic text-base leading-relaxed pr-8">
                        "{impactQuote}"
                    </p>
                </div>
            )}

            {/* Bottom Row — Stats Cards + CTA */}
            {(stats && stats.length > 0) || (ctaLabel && ctaActionPhrase) ? (
                <div className="flex items-stretch gap-3 pt-2">
                    {/* Stat Cards — left columns */}
                    {stats && stats.length > 0 && stats.map((stat, i) => (
                        <div
                            key={i}
                            className="flex-1 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-col items-center justify-center
                                hover:bg-white/[0.06] transition-colors"
                        >
                            <div className="text-2xl md:text-3xl font-bold text-jade tracking-tight">{stat.value}</div>
                            <div className="text-[11px] text-mist/40 mt-1 text-center leading-tight">{stat.label}</div>
                        </div>
                    ))}

                    {/* CTA — right column */}
                    {ctaLabel && ctaActionPhrase && (
                        <button
                            className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-flamingo text-white font-semibold rounded-2xl
                                hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                                transition-all text-base shadow-lg shadow-flamingo/20 whitespace-nowrap"
                            onClick={() => handleAction(ctaActionPhrase)}
                        >
                            {ctaLabel}
                            <ArrowRight className="w-5 h-5 flex-shrink-0" />
                        </button>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default PersonaCard;
