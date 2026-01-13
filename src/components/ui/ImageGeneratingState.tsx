import React from 'react';
import avatarImage from '@/assets/avatar_profile.png';

interface ImageGeneratingStateProps {
    prompt: string;
    className?: string;
}

export const ImageGeneratingState: React.FC<ImageGeneratingStateProps> = ({ prompt, className = '' }) => {
    return (
        <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-black/60 via-blue-900/20 to-purple-900/20 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center min-h-[400px] overflow-hidden ${className}`}>
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-purple-500/10 animate-pulse" />

            {/* Radial glow effect */}
            <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 via-transparent to-transparent blur-3xl animate-pulse" />

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/40 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '0s' }} />
                <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                <div className="absolute bottom-1/3 left-1/2 w-2.5 h-2.5 bg-purple-400/40 rounded-full animate-ping" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-6">
                {/* Tele Avatar with glow */}
                <div className="relative mb-4">
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-purple-500/30 blur-2xl rounded-full animate-pulse scale-150" />

                    {/* Middle glow ring */}
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse scale-125" style={{ animationDuration: '2s' }} />

                    {/* Animated expanding rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute w-20 h-20 border-2 border-blue-400/40 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                        <div className="absolute w-24 h-24 border-2 border-cyan-400/30 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                        <div className="absolute w-28 h-28 border-2 border-purple-400/20 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                    </div>

                    {/* Avatar circle with spinning border */}
                    <div className="relative w-16 h-16 mx-auto">
                        {/* Spinning gradient border */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 animate-spin" style={{ animationDuration: '3s' }} />
                        <div className="absolute inset-[3px] rounded-full bg-black/90 backdrop-blur-sm" />

                        {/* Avatar Image */}
                        <div className="absolute inset-[3px] rounded-full overflow-hidden">
                            <img
                                src={avatarImage}
                                alt="Magic Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Tele is generating message */}
                <div className="space-y-3">
                    <h3 className="text-xl font-light text-white tracking-wide">
                        Tele is generating...
                    </h3>

                    {/* Animated dots */}
                    <div className="flex items-center justify-center gap-1.5 pt-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.4s' }} />
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.4s' }} />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.4s' }} />
                    </div>
                </div>

                {/* Prompt display with elegant styling */}
                <div className="w-full max-w-[400px] mt-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 overflow-hidden text-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium mb-3">Prompt</p>
                    <p className="text-sm text-white/80 leading-relaxed italic line-clamp-3">
                        "{prompt}"
                    </p>
                </div>
            </div>
        </div>
    );
};
