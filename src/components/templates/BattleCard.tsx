/**
 * BattleCard
 * Competitive positioning against specific competitor
 * 
 * USE WHEN: Competitor analysis, "how do we beat X", battle card
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Card CTA is clickable → notifyTele
 */

import React from 'react';
import { Swords, Check, X, ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Differentiator {
    point: string;
    us: boolean;
    them: boolean;
}

interface BattleCardProps {
    competitor: string;
    theirClaim: string;
    ourCounter: string;
    differentiators?: Differentiator[];
    winningMove?: string;
    actionPhrase: string;
}

export const BattleCard: React.FC<BattleCardProps> = ({
    competitor,
    theirClaim,
    ourCounter,
    differentiators = [],
    winningMove,
    actionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = () => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            <div className="glass-card-featured glass-card-clickable" onClick={handleAction}>
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-flamingo/20 flex items-center justify-center">
                        <Swords className="w-6 h-6 text-flamingo" />
                    </div>
                    <div>
                        <span className="text-mist/60 text-sm">Battle Card vs.</span>
                        <h3 className="text-template-title text-xl">{competitor}</h3>
                    </div>
                </div>

                {/* Their Claim vs Our Counter */}
                <div className="template-grid-2 mb-6">
                    <div className="glass-card-minimal border-l-2 border-flamingo/50">
                        <span className="text-flamingo text-xs font-medium uppercase">Their Claim</span>
                        <p className="text-template-content mt-1">"{theirClaim}"</p>
                    </div>
                    <div className="glass-card-minimal border-l-2 border-jade/50">
                        <span className="text-jade text-xs font-medium uppercase">Our Counter</span>
                        <p className="text-template-content mt-1">"{ourCounter}"</p>
                    </div>
                </div>

                {/* Differentiators */}
                {differentiators?.length > 0 && (
                    <div className="mb-6">
                        <h4 className="text-template-subtitle text-sm mb-3">Key Differentiators</h4>
                        <div className="space-y-2">
                            {differentiators.map((diff, index) => (
                                <div key={index} className="flex items-center gap-4 text-sm">
                                    <span className="flex-1 text-template-content">{diff.point}</span>
                                    <div className="flex gap-4">
                                        {diff.us ? (
                                            <Check className="w-5 h-5 text-jade" />
                                        ) : (
                                            <X className="w-5 h-5 text-mist/30" />
                                        )}
                                        {diff.them ? (
                                            <Check className="w-5 h-5 text-flamingo/60" />
                                        ) : (
                                            <X className="w-5 h-5 text-mist/30" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Winning Move */}
                {winningMove && (
                    <div className="glass-card-minimal bg-sapphire/10 border-sapphire/30">
                        <span className="text-sapphire text-xs font-medium uppercase">Winning Move</span>
                        <p className="text-template-subtitle mt-1">{winningMove}</p>
                    </div>
                )}

                <div className="flex items-center text-sapphire font-medium mt-4">
                    <span>See full battle strategy</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                </div>
            </div>
        </div>
    );
};

export default BattleCard;
