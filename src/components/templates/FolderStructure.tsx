/**
 * FolderStructure
 * Displays the project folder structure with descriptions
 * 
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Every clickable element calls notifyTele()
 */

import React from 'react';
import { Folder, File, ChevronRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface FolderItem {
    name: string;
    type: 'folder' | 'file';
    description: string;
    children?: FolderItem[];
    actionPhrase?: string;
}

interface FolderStructureProps {
    title?: string;
    subtitle?: string;
    structure?: FolderItem[];
}

export const FolderStructure: React.FC<FolderStructureProps> = ({
    title = 'Project Structure',
    subtitle = 'How the codebase is organized',
    structure = [
        {
            name: '.agent/',
            type: 'folder',
            description: 'Build Agent files (Claude)',
            children: [
                { name: 'AGENT.md', type: 'file', description: 'Build Agent instructions' },
                { name: 'workflows/', type: 'folder', description: 'Slash command workflows' }
            ]
        },
        {
            name: 'src/',
            type: 'folder',
            description: 'Application source code',
            children: [
                { name: 'assets/', type: 'folder', description: 'Bundled images' },
                { name: 'components/', type: 'folder', description: 'React components' },
                { name: 'templates/', type: 'folder', description: '16 visual templates' }
            ]
        },
        {
            name: 'public/',
            type: 'folder',
            description: 'Static files served as-is',
            children: [
                { name: 'images/', type: 'folder', description: 'Carousel and diagrams' }
            ]
        },
        { name: 'glass-prompt.md', type: 'file', description: 'Runtime Agent shot prompts' },
        { name: 'tele-knowledge.md', type: 'file', description: 'Domain knowledge' }
    ]
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const renderItem = (item: FolderItem, depth: number = 0) => {
        const isFolder = item.type === 'folder';
        const Icon = isFolder ? Folder : File;
        const iconColor = isFolder ? 'text-turmeric' : 'text-sapphire';

        return (
            <div key={item.name} style={{ marginLeft: depth * 20 }}>
                <div
                    className="glass-card-minimal p-3 mb-2 glass-card-clickable flex items-center gap-3"
                    onClick={() => handleAction(item.actionPhrase || `Tell me more about ${item.name}`)}
                >
                    <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
                    <div className="flex-grow">
                        <div className="flex items-center gap-2">
                            <code className="text-jade text-sm font-semibold">{item.name}</code>
                            {isFolder && <ChevronRight className="w-4 h-4 text-mist/40" />}
                        </div>
                        <p className="text-template-content text-xs">{item.description}</p>
                    </div>
                </div>
                {item.children?.map(child => renderItem(child, depth + 1))}
            </div>
        );
    };

    return (
        <div className="glass-template-container">
            <h2 className="text-template-title text-2xl mb-2">{title}</h2>
            <p className="text-template-content mb-6">{subtitle}</p>

            <div className="grid gap-1">
                {structure.map(item => renderItem(item, 0))}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-mist/10 flex gap-6">
                <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-turmeric" />
                    <span className="text-template-content text-sm">Folder</span>
                </div>
                <div className="flex items-center gap-2">
                    <File className="w-4 h-4 text-sapphire" />
                    <span className="text-template-content text-sm">File</span>
                </div>
            </div>
        </div>
    );
};

export default FolderStructure;
