/**
 * VideoSingle - GENERIC
 * Full-width video player with title and description
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState, useRef } from 'react';
import { ArrowRight, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface VideoSingleProps {
    title?: string;
    subtitle?: string;
    videoUrl?: string;
    posterUrl?: string;
    posterPrompt?: string;
    description?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const VideoSingle: React.FC<VideoSingleProps> = ({
    title,
    subtitle,
    videoUrl,
    posterUrl,
    posterPrompt,
    description,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [showControls, setShowControls] = useState(true);
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

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
        playClick();
    };

    const toggleFullscreen = () => {
        if (videoRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                videoRef.current.requestFullscreen();
            }
        }
        playClick();
    };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {(title || subtitle) && (
                <div className="text-center pb-6">
                    {title && <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{title}</h2>}
                    {subtitle && <p className="text-mist/60">{subtitle}</p>}
                </div>
            )}

            <div
                className="flex-grow rounded-2xl overflow-hidden border border-white/[0.06] relative group"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => isPlaying && setShowControls(false)}
            >
                {videoUrl ? (
                    <>
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            poster={posterUrl}
                            muted={isMuted}
                            loop
                            playsInline
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        >
                            <source src={videoUrl} type="video/mp4" />
                        </video>

                        {/* Play overlay */}
                        {!isPlaying && (
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                                onClick={togglePlay}
                            >
                                <div className="w-20 h-20 rounded-full bg-flamingo/90 flex items-center justify-center
                                    hover:bg-flamingo hover:scale-110 transition-all shadow-lg shadow-flamingo/30">
                                    <Play className="w-8 h-8 text-white ml-1" />
                                </div>
                            </div>
                        )}

                        {/* Controls */}
                        <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent
                            transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={togglePlay}
                                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                                >
                                    {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
                                </button>
                                <div className="flex-grow" />
                                <button
                                    onClick={toggleMute}
                                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                                >
                                    {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                                </button>
                                <button
                                    onClick={toggleFullscreen}
                                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                                >
                                    <Maximize className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="w-full h-full aspect-video flex items-center justify-center bg-obsidian/50">
                        <SmartImage
                            assetId={posterUrl || posterPrompt || 'video-poster'}
                            alt={title || 'Video'}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Play className="w-8 h-8 text-white ml-1" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {description && (
                <div className="pt-4">
                    <p className="text-mist/60 text-center">{description}</p>
                </div>
            )}

            {ctaLabel && ctaActionPhrase && (
                <div className="pt-8 flex justify-center">
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

export default VideoSingle;
