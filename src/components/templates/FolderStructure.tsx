/**
 * FolderStructure
 * Displays the project folder structure with collapsible folders
 * 
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Only special files (tele-knowledge.md, glass-prompt.md) are clickable
 */

import React, { useState } from 'react';
import { Folder, FolderOpen, File, ChevronRight, ChevronDown, Sparkles } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface FolderItem {
    name: string;
    type: 'folder' | 'file';
    description?: string;
    children?: FolderItem[];
    actionPhrase?: string;
    isHighlighted?: boolean;
}

interface FolderStructureProps {
    title?: string;
    subtitle?: string;
    structure?: FolderItem[];
}

// Default structure with actual project files
const DEFAULT_STRUCTURE: FolderItem[] = [
    {
        name: '.agent/',
        type: 'folder',
        description: 'Build Agent files (Claude)',
        children: [
            { name: 'AGENT.md', type: 'file', description: 'Build Agent instructions' },
            {
                name: 'workflows/',
                type: 'folder',
                description: 'Slash command workflows',
                children: [
                    { name: 'add-glass.md', type: 'file' },
                    { name: 'add-knowledge.md', type: 'file' },
                    { name: 'tele-should.md', type: 'file' },
                    { name: 'create-site-function.md', type: 'file' },
                ]
            }
        ]
    },
    {
        name: 'src/',
        type: 'folder',
        description: 'Application source code',
        children: [
            {
                name: 'components/',
                type: 'folder',
                description: 'React components',
                children: [
                    {
                        name: 'templates/',
                        type: 'folder',
                        description: '19 visual templates',
                        children: [
                            { name: 'CardGrid.tsx', type: 'file' },
                            { name: 'WelcomeCarousel.tsx', type: 'file' },
                            { name: 'HackathonTimeline.tsx', type: 'file' },
                            { name: 'ConceptCard.tsx', type: 'file' },
                            { name: 'ProcessSteps.tsx', type: 'file' },
                            { name: 'CodeBlock.tsx', type: 'file' },
                            { name: 'FolderStructure.tsx', type: 'file' },
                            { name: '...and 12 more', type: 'file' },
                        ]
                    },
                    { name: 'TeleglassSection.tsx', type: 'file' },
                    { name: 'DynamicSectionLoader.tsx', type: 'file' },
                    { name: 'Navigation.tsx', type: 'file' },
                ]
            },
            {
                name: 'data/',
                type: 'folder',
                children: [
                    { name: 'templateRegistry.ts', type: 'file', description: 'Template component registry' },
                ]
            },
            {
                name: 'utils/',
                type: 'folder',
                children: [
                    { name: 'acknowledgmentHelpers.ts', type: 'file' },
                    { name: 'uiFrameworkRegistration.ts', type: 'file' },
                ]
            },
            {
                name: 'pages/',
                type: 'folder',
                children: [
                    { name: 'Index.tsx', type: 'file', description: 'Main app logic' },
                ]
            },
        ]
    },
    {
        name: 'public/',
        type: 'folder',
        description: 'Static files served at runtime',
        children: [
            {
                name: 'assets/', type: 'folder', children: [
                    { name: 'two-agent-architecture.png', type: 'file' },
                    { name: 'mobeus-hero-tagline.png', type: 'file' },
                ]
            },
            {
                name: 'images/', type: 'folder', children: [
                    { name: 'welcome-carousel/', type: 'folder' },
                ]
            },
            {
                name: 'glass-prompt.md',
                type: 'file',
                description: 'Runtime Agent shot prompts — click to view live',
                isHighlighted: true,
                actionPhrase: 'Show me the glass prompt file'
            },
            {
                name: 'tele-knowledge.md',
                type: 'file',
                description: 'Domain knowledge — click to view live',
                isHighlighted: true,
                actionPhrase: 'Show me the knowledge file'
            },
        ]
    },
    {
        name: 'index.html',
        type: 'file',
        description: 'Entry point + UIFramework injection'
    },
    {
        name: 'vite.config.ts',
        type: 'file',
    },
    {
        name: 'package.json',
        type: 'file',
    },
];

export const FolderStructure: React.FC<FolderStructureProps> = ({
    structure = DEFAULT_STRUCTURE
}) => {
    const { playClick } = useSound();
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['.agent/', 'src/', 'public/']));

    const toggleFolder = (path: string) => {
        playClick();
        setExpandedFolders(prev => {
            const next = new Set(prev);
            if (next.has(path)) {
                next.delete(path);
            } else {
                next.add(path);
            }
            return next;
        });
    };

    const handleFileClick = (item: FolderItem) => {
        if (item.actionPhrase) {
            playClick();
            notifyTele(item.actionPhrase);
        }
    };

    const renderItem = (item: FolderItem, depth: number = 0, parentPath: string = '') => {
        const isFolder = item.type === 'folder';
        const currentPath = parentPath + item.name;
        const isExpanded = expandedFolders.has(currentPath);
        const hasChildren = item.children && item.children.length > 0;
        const isClickable = item.actionPhrase && item.isHighlighted;

        if (isFolder) {
            return (
                <div key={currentPath}>
                    {/* Folder row */}
                    <div
                        className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                        style={{ marginLeft: depth * 16 }}
                        onClick={() => toggleFolder(currentPath)}
                    >
                        {/* Expand/collapse chevron */}
                        {hasChildren ? (
                            isExpanded ? (
                                <ChevronDown className="w-4 h-4 text-mist/50 flex-shrink-0" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-mist/50 flex-shrink-0" />
                            )
                        ) : (
                            <span className="w-4" />
                        )}

                        {/* Folder icon */}
                        {isExpanded ? (
                            <FolderOpen className="w-5 h-5 text-turmeric flex-shrink-0" />
                        ) : (
                            <Folder className="w-5 h-5 text-turmeric flex-shrink-0" />
                        )}

                        {/* Folder name */}
                        <code className="text-jade text-sm font-semibold">{item.name}</code>

                        {/* Description */}
                        {item.description && (
                            <span className="text-mist/50 text-xs ml-2">— {item.description}</span>
                        )}
                    </div>

                    {/* Children */}
                    {isExpanded && hasChildren && (
                        <div>
                            {item.children!.map(child => renderItem(child, depth + 1, currentPath))}
                        </div>
                    )}
                </div>
            );
        }

        // File row
        return (
            <div
                key={currentPath}
                className={`flex items-center gap-2 py-1.5 px-2 rounded-lg transition-colors ${isClickable
                        ? 'hover:bg-flamingo/20 cursor-pointer border border-flamingo/30 bg-flamingo/10 my-1'
                        : 'hover:bg-white/5'
                    }`}
                style={{ marginLeft: depth * 16 + 20 }}
                onClick={() => isClickable && handleFileClick(item)}
            >
                {/* Sparkle for highlighted files */}
                {item.isHighlighted && (
                    <Sparkles className="w-4 h-4 text-flamingo flex-shrink-0 animate-pulse" />
                )}

                {/* File icon */}
                <File className={`w-4 h-4 flex-shrink-0 ${item.isHighlighted ? 'text-flamingo' : 'text-sapphire'}`} />

                {/* File name */}
                <code className={`text-sm ${item.isHighlighted ? 'text-flamingo font-bold' : 'text-mist/80'}`}>
                    {item.name}
                </code>

                {/* Description */}
                {item.description && (
                    <span className={`text-xs ml-2 ${item.isHighlighted ? 'text-flamingo/70' : 'text-mist/40'}`}>
                        — {item.description}
                    </span>
                )}

                {/* Click indicator for highlighted files */}
                {isClickable && (
                    <span className="ml-auto text-flamingo text-xs font-medium">
                        View →
                    </span>
                )}
            </div>
        );
    };

    const expandAll = () => {
        playClick();
        const allPaths = new Set<string>();
        const collectPaths = (items: FolderItem[], parentPath: string = '') => {
            items.forEach(item => {
                if (item.type === 'folder') {
                    const path = parentPath + item.name;
                    allPaths.add(path);
                    if (item.children) {
                        collectPaths(item.children, path);
                    }
                }
            });
        };
        collectPaths(structure);
        setExpandedFolders(allPaths);
    };

    const collapseAll = () => {
        playClick();
        setExpandedFolders(new Set());
    };

    return (
        <div className="glass-template-container">
            {/* Controls */}
            <div className="flex items-center gap-4 mb-4">
                <button
                    onClick={expandAll}
                    className="text-xs text-mist/60 hover:text-mist transition-colors"
                >
                    Expand All
                </button>
                <span className="text-mist/30">|</span>
                <button
                    onClick={collapseAll}
                    className="text-xs text-mist/60 hover:text-mist transition-colors"
                >
                    Collapse All
                </button>
            </div>

            {/* File tree */}
            <div className="bg-black/30 rounded-xl p-4 font-mono text-sm">
                {structure.map(item => renderItem(item, 0))}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-mist/10 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-turmeric" />
                    <span className="text-template-content text-sm">Folder (click to expand)</span>
                </div>
                <div className="flex items-center gap-2">
                    <File className="w-4 h-4 text-sapphire" />
                    <span className="text-template-content text-sm">File</span>
                </div>
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-flamingo" />
                    <span className="text-template-content text-sm">Live file (click to view)</span>
                </div>
            </div>
        </div>
    );
};

export default FolderStructure;
