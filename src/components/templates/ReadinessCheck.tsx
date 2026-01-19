/**
 * ReadinessCheck
 * "Are you ready?" checklist to confirm understanding before hackathon
 * 
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Every clickable element calls notifyTele()
 */

import React from 'react';
import { CheckCircle, Circle, XCircle, Rocket, ChevronRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface CheckItem {
    text: string;
    learnMorePhrase?: string;
}

interface ReadinessCheckProps {
    title?: string;
    subtitle?: string;
    items?: CheckItem[];
    allReadyLabel?: string;
    allReadyActionPhrase?: string;
    notReadyLabel?: string;
    notReadyActionPhrase?: string;
}

export const ReadinessCheck: React.FC<ReadinessCheckProps> = ({
    title = 'Are You Ready?',
    subtitle = 'Make sure you understand these concepts before the hackathon',
    items = [
        { text: 'I understand what a tele is', learnMorePhrase: 'What is a tele and what will I build' },
        { text: 'I understand the two-agent architecture', learnMorePhrase: 'Explain the two agent architecture' },
        { text: 'I know what navigateToSection does', learnMorePhrase: 'Explain navigateToSection' },
        { text: 'I know the 6 hackathon phases', learnMorePhrase: 'Show me the hackathon phases' },
    ],
    allReadyLabel = "I'm Ready for the Hackathon! 🚀",
    allReadyActionPhrase = 'Go home',
    notReadyLabel = 'Review the concepts again',
    notReadyActionPhrase = 'Go home'
}) => {
    const { playClick } = useSound();
    const [checked, setChecked] = React.useState<boolean[]>(new Array(items.length).fill(false));

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const toggleCheck = (index: number) => {
        const newChecked = [...checked];
        newChecked[index] = !newChecked[index];
        setChecked(newChecked);
        playClick();
    };

    const allChecked = checked.every(Boolean);
    const checkedCount = checked.filter(Boolean).length;
    const progress = (checkedCount / items.length) * 100;

    return (
        <div className="glass-template-container">
            {/* Header */}
            <div className="text-left mb-8">
                <h2 className="text-template-title text-3xl mb-2">{title}</h2>
                <p className="text-template-content">{subtitle}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-mist/60 text-sm">Progress</span>
                    <span className="text-template-subtitle">{checkedCount} / {items.length}</span>
                </div>
                <div className="w-full h-3 bg-mist/10 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-500 rounded-full ${allChecked ? 'bg-jade' : 'bg-flamingo'}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Checklist */}
            <div className="space-y-4 mb-8">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`glass-card-minimal p-4 flex items-center gap-4 cursor-pointer transition-all ${checked[index] ? 'border-jade/40 bg-jade/5' : 'hover:border-mist/30'
                            }`}
                        onClick={() => toggleCheck(index)}
                    >
                        <div className="flex-shrink-0">
                            {checked[index] ? (
                                <CheckCircle className="w-6 h-6 text-jade" />
                            ) : (
                                <Circle className="w-6 h-6 text-mist/40" />
                            )}
                        </div>
                        <span className={`flex-1 ${checked[index] ? 'text-mist line-through opacity-70' : 'text-template-content'}`}>
                            {item.text}
                        </span>
                        {!checked[index] && item.learnMorePhrase && (
                            <button
                                className="text-sapphire text-sm hover:underline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAction(item.learnMorePhrase!);
                                }}
                            >
                                Learn more
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* CTA */}
            {allChecked ? (
                <button
                    className="btn-cta w-full py-4 text-lg flex items-center justify-center gap-2 animate-pulse"
                    onClick={() => handleAction(allReadyActionPhrase)}
                >
                    <Rocket className="w-5 h-5" />
                    {allReadyLabel}
                </button>
            ) : (
                <div className="space-y-3">
                    <button
                        className="btn-ghost w-full py-3 text-lg flex items-center justify-center gap-2"
                        onClick={() => handleAction(notReadyActionPhrase)}
                    >
                        {notReadyLabel}
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    <p className="text-center text-mist/50 text-sm">
                        Check all items when you understand them
                    </p>
                </div>
            )}
        </div>
    );
};

export default ReadinessCheck;
