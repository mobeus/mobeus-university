/**
 * MapSingle - GENERIC
 * Single map display with markers and info
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, MapPin, Navigation, Phone, Clock, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Location {
    name: string;
    address?: string;
    phone?: string;
    hours?: string;
    lat?: number;
    lng?: number;
}

interface MapSingleProps {
    title?: string;
    subtitle?: string;
    embedUrl?: string;
    location?: Location;
    details?: { icon?: string; label: string; value: string }[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
    directionsLabel?: string;
    directionsPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return MapPin;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || MapPin;
};

export const MapSingle: React.FC<MapSingleProps> = ({
    title,
    subtitle,
    embedUrl,
    location,
    details,
    ctaLabel,
    ctaActionPhrase,
    directionsLabel,
    directionsPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {(title || subtitle) && (
                <div className="pb-6">
                    {title && <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{title}</h2>}
                    {subtitle && <p className="text-mist/60">{subtitle}</p>}
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-6 flex-grow">
                {/* Map */}
                <div className="md:col-span-2 rounded-2xl overflow-hidden border border-white/[0.06] bg-obsidian/50 min-h-[300px]">
                    {embedUrl ? (
                        <iframe
                            src={embedUrl}
                            className="w-full h-full"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sapphire/10 to-flamingo/5">
                            <div className="text-center">
                                <MapPin className="w-16 h-16 text-mist/20 mx-auto mb-4" />
                                <p className="text-mist/40">Map placeholder</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Location Info */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] flex flex-col">
                    {location && (
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-white mb-4">{location.name}</h3>

                            <div className="space-y-3">
                                {location.address && (
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-4 h-4 text-sapphire mt-1 flex-shrink-0" />
                                        <span className="text-mist/70 text-sm">{location.address}</span>
                                    </div>
                                )}
                                {location.phone && (
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-sapphire flex-shrink-0" />
                                        <span className="text-mist/70 text-sm">{location.phone}</span>
                                    </div>
                                )}
                                {location.hours && (
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-4 h-4 text-sapphire flex-shrink-0" />
                                        <span className="text-mist/70 text-sm">{location.hours}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {details && details.length > 0 && (
                        <div className="space-y-3 flex-grow">
                            {details.map((detail, i) => {
                                const IconComp = getIcon(detail.icon);
                                return (
                                    <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                        <div className="flex items-center gap-2 mb-1">
                                            <IconComp className="w-3 h-3 text-mist/40" />
                                            <span className="text-xs text-mist/40">{detail.label}</span>
                                        </div>
                                        <div className="text-sm text-white font-medium">{detail.value}</div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div className="space-y-3 mt-6">
                        {directionsLabel && directionsPhrase && (
                            <button
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 
                                    bg-white/[0.05] border border-white/[0.1] text-white font-semibold rounded-full 
                                    hover:bg-white/[0.1] transition-all"
                                onClick={() => handleAction(directionsPhrase)}
                            >
                                <Navigation className="w-4 h-4" />
                                {directionsLabel}
                            </button>
                        )}
                        {ctaLabel && ctaActionPhrase && (
                            <button
                                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 
                                    bg-flamingo text-white font-semibold rounded-full 
                                    hover:bg-flamingo/90 transition-all shadow-lg shadow-flamingo/20"
                                onClick={() => handleAction(ctaActionPhrase)}
                            >
                                {ctaLabel}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapSingle;
