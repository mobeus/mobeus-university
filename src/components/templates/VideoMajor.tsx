/**
 * VideoMajor - GENERIC
 * 2/3 video with 1/3 text content
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState, useRef } from 'react';
import { ArrowRight, Play, Pause, LucideIcon, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ContentItem {
    icon?: string;
    text: string;
}

interface VideoMajorProps {
    videoUrl?: string;
    posterUrl?: string;
    posterPrompt?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    items?: ContentItem[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Zap;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Zap;
};

export const VideoMajor: React.FC<VideoMajorProps> = ({
    videoUrl,
    posterUrl,
    posterPrompt,
    title,
    subtitle,
    description,
    items,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
        playClick();
    };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full">
            <div className="grid md:grid-cols-3 gap-6 h-full">
                {/* 2/3 Video */}
                <div className="md:col-span-2 rounded-2xl overflow-hidden border border-white/[0.06] relative group">
                    {videoUrl ? (
                        <>
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover"
                                poster={posterUrl}
                                muted
                                loop
                                playsInline
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                            >
                                <source src={videoUrl} type="video/mp4" />
                            </video>

                            <div
                                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                                onClick={togglePlay}
                            >
                                {!isPlaying && (
                                    <div className="w-16 h-16 rounded-full bg-flamingo/90 flex items-center justify-center
                                        hover:bg-flamingo hover:scale-110 transition-all shadow-lg shadow-flamingo/30">
                                        <Play className="w-6 h-6 text-white ml-1" />
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full aspect-video relative">
                            <SmartImage
                                assetId={posterUrl || posterPrompt || 'video-poster'}
                                alt={title || 'Video'}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <Play className="w-6 h-6 text-white ml-1" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 1/3 Content */}
                <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] flex flex-col">
                    {(title || subtitle) && (
                        <div className="mb-6">
                            {subtitle && <div className="text-sm text-sapphire font-semibold uppercase tracking-wider mb-2">{subtitle}</div>}
                            {title && <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>}
                        </div>
                    )}

                    {description && <p className="text-mist/60 mb-6 leading-relaxed">{description}</p>}

                    {items && items.length > 0 && (
                        <div className="space-y-3 flex-grow">
                            {items.map((item, i) => {
                                const IconComp = getIcon(item.icon);
                                return (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                                        <IconComp className="w-4 h-4 text-sapphire flex-shrink-0" />
                                        <span className="text-sm text-mist/70">{item.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {ctaLabel && ctaActionPhrase && (
                        <button
                            className="mt-6 w-full inline-flex items-center justify-center gap-3 px-6 py-4 
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
    );
};

export default VideoMajor;
