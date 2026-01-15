/**
 * ResourceLinks
 * List of links/resources
 * 
 * USE WHEN: Documentation, resources, related links, "where can I learn more"
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each link is clickable → notifyTele
 */

import React from 'react';
import { ExternalLink, FileText, Video, BookOpen, Link2 } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ResourceLink {
    title: string;
    description?: string;
    type?: 'doc' | 'video' | 'guide' | 'link';
    actionPhrase: string;
}

interface ResourceLinksProps {
    title?: string;
    resources: ResourceLink[];
}

const iconMap: Record<string, React.ElementType> = {
    doc: FileText,
    video: Video,
    guide: BookOpen,
    link: Link2,
};

export const ResourceLinks: React.FC<ResourceLinksProps> = ({
    title,
    resources = [],
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const getIcon = (type?: string) => {
        const IconComponent = iconMap[type || 'link'] || Link2;
        return <IconComponent className="w-5 h-5" />;
    };

    const getTypeColor = (type?: string) => {
        switch (type) {
            case 'doc': return 'text-sapphire bg-sapphire/20';
            case 'video': return 'text-flamingo bg-flamingo/20';
            case 'guide': return 'text-jade bg-jade/20';
            default: return 'text-mist/60 bg-mist/10';
        }
    };

    return (
        <div className="glass-template-container">
            {title && <h3 className="text-template-title text-xl mb-4">{title}</h3>}

            <div className="space-y-2">
                {resources?.map((resource, index) => (
                    <div
                        key={index}
                        className="glass-card-minimal glass-card-clickable flex items-center gap-4 group"
                        onClick={() => handleAction(resource.actionPhrase)}
                    >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(resource.type)}`}>
                            {getIcon(resource.type)}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-template-subtitle group-hover:text-sapphire transition-colors">
                                {resource.title}
                            </h4>
                            {resource.description && (
                                <p className="text-template-content text-sm">{resource.description}</p>
                            )}
                        </div>
                        <ExternalLink className="w-5 h-5 text-mist/40 group-hover:text-sapphire transition-colors" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourceLinks;
