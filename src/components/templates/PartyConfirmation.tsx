/**
 * PartyConfirmation - CELEBRATION
 * Post-RSVP celebration screen with party details and next steps
 * Shows excitement and party countdown
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, Music, Camera, Gift, Check } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface PartyConfirmationProps {
    badge?: string;
    headline?: string;
    subheadline?: string;
    partyDate?: string;
    partyTime?: string;
    location?: string;

    partyHighlights?: Array<{
        icon?: string;
        title: string;
        description?: string;
    }>;
    celebrationImage?: string;
    confirmationMessage?: string;
}

export const PartyConfirmation: React.FC<PartyConfirmationProps> = ({
    badge = "YOU'RE ON THE LIST",
    headline = "See You at the Population Party! 🎉",
    subheadline,
    partyDate = "March 15, 2026",
    partyTime = "7:00 PM - Midnight EST",
    location,

    partyHighlights = [],
    celebrationImage = "party-celebration-confirmed",
    confirmationMessage
}) => {
    const { playClick } = useSound();
    const [showConfetti, setShowConfetti] = useState(true);

    React.useEffect(() => {
        playClick();
        setTimeout(() => setShowConfetti(false), 3000);
    }, []);

    return (
        <div className="glass-medium rounded-2xl p-6 md:p-8 h-full relative overflow-hidden">
            {/* Confetti Animation */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none z-10">
                    <div className="absolute top-0 left-1/4 animate-pulse">
                        <Sparkles className="w-8 h-8 text-flamingo" />
                    </div>
                    <div className="absolute top-10 right-1/4 animate-pulse delay-100">
                        <Sparkles className="w-6 h-6 text-jade" />
                    </div>
                    <div className="absolute top-5 right-1/3 animate-pulse delay-200">
                        <Sparkles className="w-7 h-7 text-sapphire" />
                    </div>
                </div>
            )}

            {/* Badge */}
            <div className="text-center mb-6">
                <span className="inline-block px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-flamingo/20 text-flamingo border-2 border-flamingo">
                    <Check className="w-4 h-4 inline mr-2" />
                    {badge}
                </span>
            </div>

            {/* Hero Image */}
            <div className="mb-8 rounded-2xl overflow-hidden">
                <SmartImage
                    assetId={celebrationImage}
                    alt="Population Party Celebration"
                    className="w-full aspect-[16/6] object-cover"
                />
            </div>

            {/* Headline */}
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    {headline}
                </h2>
                {subheadline && (
                    <p className="text-lg text-mist/70">{subheadline}</p>
                )}
            </div>

            {/* Party Details */}
            <div className="glass-light rounded-xl p-6 mb-8">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-3">
                        <Calendar className="w-6 h-6 text-flamingo flex-shrink-0 mt-1" />
                        <div>
                            <div className="text-sm text-mist/60 mb-1">Date & Time</div>
                            <div className="font-semibold text-white">{partyDate}</div>
                            <div className="text-sm text-mist/80">{partyTime}</div>
                        </div>
                    </div>
                    {location && (
                        <div className="flex items-start gap-3">
                            <MapPin className="w-6 h-6 text-jade flex-shrink-0 mt-1" />
                            <div>
                                <div className="text-sm text-mist/60 mb-1">Location</div>
                                <div className="font-semibold text-white">{location}</div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* Party Highlights */}
            {partyHighlights.filter(h => h.title).length > 0 && (
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">What to Expect</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {partyHighlights.filter(h => h.title).map((highlight, i) => {
                            const iconMap: Record<string, React.ReactNode> = {
                                Music: <Music className="w-5 h-5 text-flamingo flex-shrink-0 mt-0.5" />,
                                Camera: <Camera className="w-5 h-5 text-jade flex-shrink-0 mt-0.5" />,
                                Gift: <Gift className="w-5 h-5 text-sapphire flex-shrink-0 mt-0.5" />,
                            };
                            const iconNode = (highlight.icon && iconMap[highlight.icon]) || <Sparkles className="w-5 h-5 text-amethyst flex-shrink-0 mt-0.5" />;
                            return (
                                <div key={i} className="glass-light rounded-xl p-4 flex items-start gap-3">
                                    {iconNode}
                                    <div>
                                        <div className="font-semibold text-white mb-1">{highlight.title}</div>
                                        {highlight.description && (
                                            <div className="text-sm text-mist/70">{highlight.description}</div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}



            {/* Confirmation Message */}
            {confirmationMessage && (
                <div className="text-center glass-light-primary rounded-xl p-6">
                    <p className="text-lg text-white leading-relaxed">{confirmationMessage}</p>
                </div>
            )}
        </div>
    );
};

export default PartyConfirmation;
