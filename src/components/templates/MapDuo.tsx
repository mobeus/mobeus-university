/**
 * MapDuo - GENERIC
 * Two maps side by side for comparison
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, MapPin, Navigation } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface MapConfig {
    title?: string;
    embedUrl?: string;
    address?: string;
    actionLabel?: string;
    actionPhrase?: string;
}

interface MapDuoProps {
    headline?: string;
    maps?: [MapConfig, MapConfig];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const MapDuo: React.FC<MapDuoProps> = ({
    headline,
    maps,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">


            {maps && (
                <div className="grid md:grid-cols-2 gap-6 flex-grow">
                    {maps.map((map, i) => (
                        <div
                            key={i}
                            className="rounded-2xl overflow-hidden border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent flex flex-col"
                        >
                            {map.title && (
                                <div className="p-4 border-b border-white/[0.06]">
                                    <h3 className="text-lg font-bold text-white">{map.title}</h3>
                                    {map.address && (
                                        <div className="flex items-center gap-2 mt-1">
                                            <MapPin className="w-3 h-3 text-mist/40" />
                                            <span className="text-sm text-mist/60">{map.address}</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex-grow min-h-[200px]">
                                {map.embedUrl ? (
                                    <iframe
                                        src={map.embedUrl}
                                        className="w-full h-full"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sapphire/10 to-flamingo/5">
                                        <MapPin className="w-12 h-12 text-mist/20" />
                                    </div>
                                )}
                            </div>

                            {map.actionLabel && map.actionPhrase && (
                                <div className="p-4 border-t border-white/[0.06]">
                                    <button
                                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 
                                            bg-white/[0.05] border border-white/[0.1] text-white rounded-xl
                                            hover:bg-white/[0.1] transition-all text-sm"
                                        onClick={() => handleAction(map.actionPhrase!)}
                                    >
                                        <Navigation className="w-4 h-4" />
                                        {map.actionLabel}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {ctaLabel && ctaActionPhrase && (
                <div className="pt-8 flex justify-end">
                    <button
                        className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                            hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                            transition-all duration-200 text-lg shadow-lg shadow-flamingo/20"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default MapDuo;
