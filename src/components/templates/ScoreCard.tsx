/**
 * ScoreCard
 * Rating/scoring visualization
 * 
 * USE WHEN: Assessments, capability scores, maturity models
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each criterion is clickable → notifyTele
 */

import React from 'react';
import { Star, Circle } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ScoreCriterion {
    label: string;
    score: number;
    maxScore: number;
    description?: string;
    actionPhrase: string;
}

interface ScoreCardProps {
    title?: string;
    subtitle?: string;
    criteria: ScoreCriterion[];
    showOverall?: boolean;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
    title,
    subtitle,
    criteria = [],
    showOverall = true,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const overallScore = criteria.reduce((sum, c) => sum + c.score, 0);
    const overallMax = criteria.reduce((sum, c) => sum + c.maxScore, 0);
    const overallPercent = overallMax > 0 ? (overallScore / overallMax) * 100 : 0;

    const getScoreColor = (score: number, max: number) => {
        const percent = (score / max) * 100;
        if (percent >= 80) return 'text-jade';
        if (percent >= 60) return 'text-turmeric';
        return 'text-flamingo';
    };

    return (
        <div className="glass-template-container">
            <div className="glass-card-featured">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        {title && <h3 className="text-template-title text-xl">{title}</h3>}
                        {subtitle && <p className="text-template-content text-sm mt-1">{subtitle}</p>}
                    </div>
                    {showOverall && (
                        <div className="text-center">
                            <div className={`text-3xl font-bold ${getScoreColor(overallScore, overallMax)}`}>
                                {overallPercent.toFixed(0)}%
                            </div>
                            <div className="text-template-content text-xs">Overall</div>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    {criteria?.map((criterion, index) => {
                        const percent = (criterion.score / criterion.maxScore) * 100;
                        return (
                            <div
                                key={index}
                                className="glass-card-minimal glass-card-clickable group"
                                onClick={() => handleAction(criterion.actionPhrase)}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-template-subtitle group-hover:text-sapphire transition-colors">
                                        {criterion.label}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: criterion.maxScore }, (_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < criterion.score ? 'text-turmeric fill-turmeric' : 'text-mist/30'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="h-2 bg-mist/10 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-300 ${percent >= 80 ? 'bg-jade' : percent >= 60 ? 'bg-turmeric' : 'bg-flamingo'
                                            }`}
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                                {criterion.description && (
                                    <p className="text-template-content text-xs mt-2">{criterion.description}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ScoreCard;
