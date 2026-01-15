/**
 * FeatureList
 * Bulleted features with icons and optional details
 * 
 * USE WHEN: Listing capabilities, security features, platform features
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each feature is clickable → notifyTele
 */

import React from 'react';
import { Check, Shield, Zap, Lock, Globe, Server, Cloud, Code, Settings } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Feature {
    icon?: string;
    text: string;
    detail?: string;
    actionPhrase: string;
}

interface FeatureListProps {
    title?: string;
    features: Feature[];
    columns?: 1 | 2;
}

const iconMap: Record<string, React.ElementType> = {
    check: Check,
    shield: Shield,
    zap: Zap,
    lock: Lock,
    globe: Globe,
    server: Server,
    cloud: Cloud,
    code: Code,
    settings: Settings,
};

export const FeatureList: React.FC<FeatureListProps> = ({
    title,
    features = [],
    columns = 1,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const getIcon = (iconName?: string) => {
        const IconComponent = iconMap[iconName?.toLowerCase() || 'check'] || Check;
        return <IconComponent className="w-5 h-5 text-jade flex-shrink-0" />;
    };

    return (
        <div className="glass-template-container">
            {title && <h3 className="text-template-title mb-4">{title}</h3>}
            <div className={columns === 2 ? 'template-grid-2' : 'template-flex-col'}>
                {features?.map((feature, index) => (
                    <div
                        key={index}
                        className="glass-card-minimal glass-card-clickable flex items-start gap-3"
                        onClick={() => handleAction(feature.actionPhrase)}
                    >
                        {getIcon(feature.icon)}
                        <div className="flex-1">
                            <div className="text-template-subtitle">{feature.text}</div>
                            {feature.detail && (
                                <div className="text-template-content text-sm mt-1">{feature.detail}</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureList;
