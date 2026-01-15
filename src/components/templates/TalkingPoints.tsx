/**
 * TalkingPoints
 * Bulleted key messages for verbal delivery
 * 
 * USE WHEN: Sales talking points, pitch preparation, "what should I say"
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each point is clickable → notifyTele
 */

import React from 'react';
import { MessageCircle, ChevronRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface TalkingPoint {
    point: string;
    detail?: string;
    actionPhrase: string;
}

interface TalkingPointsProps {
    title?: string;
    subtitle?: string;
    points: TalkingPoint[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const TalkingPoints: React.FC<TalkingPointsProps> = ({
    title,
    subtitle,
    points = [],
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            {title && <h3 className="text-template-title text-xl mb-2">{title}</h3>}
            {subtitle && <p className="text-template-content mb-4">{subtitle}</p>}

            <div className="template-flex-col">
                {points?.map((item, index) => (
                    <div
                        key={index}
                        className="glass-card-minimal glass-card-clickable flex items-start gap-4 group"
                        onClick={() => handleAction(item.actionPhrase)}
                    >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sapphire/20 flex items-center justify-center">
                            <MessageCircle className="w-4 h-4 text-sapphire" />
                        </div>
                        <div className="flex-1">
                            <p className="text-template-subtitle group-hover:text-sapphire transition-colors">
                                "{item.point}"
                            </p>
                            {item.detail && (
                                <p className="text-template-content text-sm mt-1 italic">
                                    {item.detail}
                                </p>
                            )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-mist/40 group-hover:text-sapphire transition-colors" />
                    </div>
                ))}
            </div>

            {ctaActionPhrase && ctaLabel && (
                <div className="mt-6">
                    <button
                        className="btn-cta"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default TalkingPoints;
