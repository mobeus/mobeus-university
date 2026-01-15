/**
 * ProofPointCard
 * Evidence/proof visualization
 * 
 * USE WHEN: Validation points, evidence, credibility builders
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Card is clickable → notifyTele
 */

import React from 'react';
import { CheckCircle, Award, Shield, ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ProofPointCardProps {
    type: 'certification' | 'award' | 'validation' | 'guarantee';
    title: string;
    description: string;
    source?: string;
    date?: string;
    actionPhrase: string;
}

const typeConfig = {
    certification: { icon: Shield, color: 'text-sapphire', bg: 'bg-sapphire/20' },
    award: { icon: Award, color: 'text-turmeric', bg: 'bg-turmeric/20' },
    validation: { icon: CheckCircle, color: 'text-jade', bg: 'bg-jade/20' },
    guarantee: { icon: Shield, color: 'text-amethyst', bg: 'bg-amethyst/20' },
};

export const ProofPointCard: React.FC<ProofPointCardProps> = ({
    type,
    title,
    description,
    source,
    date,
    actionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = () => {
        playClick();
        notifyTele(actionPhrase);
    };

    const config = typeConfig[type] || typeConfig.validation;
    const Icon = config.icon;

    return (
        <div className="glass-template-container">
            <div
                className="glass-card-featured glass-card-clickable group"
                onClick={handleAction}
            >
                <div className="flex items-start gap-4">
                    <div className={`template-icon-container ${config.bg} ${config.color}`}>
                        <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-medium uppercase ${config.color}`}>
                                {type}
                            </span>
                            {date && <span className="text-mist/40 text-xs">• {date}</span>}
                        </div>

                        <h3 className="text-template-title text-lg mb-2 group-hover:text-sapphire transition-colors">
                            {title}
                        </h3>

                        <p className="text-template-content">{description}</p>

                        {source && (
                            <p className="text-mist/60 text-sm mt-2 italic">— {source}</p>
                        )}

                        <div className="flex items-center text-sapphire font-medium text-sm mt-4">
                            <span>View details</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProofPointCard;
