import React, { useEffect } from 'react';
import { teleAvatar as avatarImage } from '@/assets';
import { playThinkingSound, stopThinkingSound } from '@/utils/soundGenerator';

interface ImageGeneratingStateProps {
    prompt: string;
    className?: string;
}

/**
 * ImageGeneratingState - 4-Color Palette Version
 * Uses only: mist, onyx, flamingo, wave
 * Plays thinking sound while generating
 */
export const ImageGeneratingState: React.FC<ImageGeneratingStateProps> = ({ prompt, className = '' }) => {
    // Play thinking sound while generating
    useEffect(() => {
        playThinkingSound();
        return () => {
            stopThinkingSound();
        };
    }, []);

    return (
        <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-onyx/60 via-wave/20 to-onyx/80 backdrop-blur-sm border border-mist/20 rounded-3xl p-12 text-center min-h-[400px] overflow-hidden ${className}`}>
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-flamingo/10 via-wave/5 to-flamingo/10 animate-pulse" />

            {/* Radial glow effect */}
            <div className="absolute inset-0 bg-radial-gradient from-flamingo/10 via-transparent to-transparent blur-3xl animate-pulse" />

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-flamingo/40 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '0s' }} />
                <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-wave/60 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                <div className="absolute bottom-1/3 left-1/2 w-2.5 h-2.5 bg-mist/40 rounded-full animate-ping" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-6">
                {/* Avatar with glow */}
                <div className="relative mb-4">
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 bg-gradient-to-r from-flamingo/30 via-wave/30 to-flamingo/30 blur-2xl rounded-full animate-pulse scale-150" />

                    {/* Middle glow ring */}
                    <div className="absolute inset-0 bg-flamingo/20 blur-xl rounded-full animate-pulse scale-125" style={{ animationDuration: '2s' }} />

                    {/* Animated expanding rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute w-20 h-20 border-2 border-flamingo/40 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                        <div className="absolute w-24 h-24 border-2 border-wave/50 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                        <div className="absolute w-28 h-28 border-2 border-mist/20 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                    </div>

                    {/* Avatar circle with spinning border */}
                    <div className="relative w-16 h-16 mx-auto">
                        {/* Spinning gradient border */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-flamingo via-wave to-flamingo animate-spin" style={{ animationDuration: '3s' }} />
                        <div className="absolute inset-[3px] rounded-full bg-onyx/90 backdrop-blur-sm" />

                        {/* Avatar Image */}
                        <div className="absolute inset-[3px] rounded-full overflow-hidden">
                            <img
                                src={avatarImage}
                                alt="Catherine Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Catherine is generating message */}
                <div className="space-y-3">
                    <h3 className="text-xl font-light text-mist tracking-wide">
                        Catherine is generating...
                    </h3>

                    {/* Animated dots - using palette colors */}
                    <div className="flex items-center justify-center gap-1.5 pt-2">
                        <div className="w-2 h-2 bg-flamingo rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.4s' }} />
                        <div className="w-2 h-2 bg-wave rounded-full animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.4s' }} />
                        <div className="w-2 h-2 bg-mist rounded-full animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.4s' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};
