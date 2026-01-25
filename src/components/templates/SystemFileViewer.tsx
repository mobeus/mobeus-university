/**
 * SystemFileViewer - Display knowledge and prompt files
 * Shows sections with summaries, MD content, and copy functionality
 * 
 * HIERARCHY: Glance (file name) → Look (sections) → Read (content)
 */

import React, { useState, useEffect } from 'react';
import {
    FileText, ChevronDown, ChevronUp, Copy, Check,
    RefreshCw, BookOpen, Zap, ArrowRight
} from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface SystemFileViewerProps {
    fileType: 'knowledge' | 'prompt';
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

interface FileSection {
    title: string;
    summary: string;
    content: string;
    isOpen: boolean;
}

const fileConfig = {
    knowledge: {
        path: '/prompts/tele-knowledge.md',
        title: 'tele-knowledge.md',
        subtitle: "What Catherine knows — this is my brain",
        icon: BookOpen,
        color: 'sapphire',
        description: 'Domain facts, terminology, and response patterns. This is WHAT the tele knows.',
    },
    prompt: {
        path: '/prompts/glass-prompt.md',
        title: 'glass-prompt.md',
        subtitle: "How Catherine responds — these are my reflexes",
        icon: Zap,
        color: 'flamingo',
        description: 'Shot prompts and response rules. This is HOW the tele responds.',
    },
};

const colorClasses = {
    sapphire: { bg: 'bg-sapphire/15', border: 'border-sapphire/30', text: 'text-sapphire', iconBg: 'bg-sapphire/30' },
    flamingo: { bg: 'bg-flamingo/15', border: 'border-flamingo/30', text: 'text-flamingo', iconBg: 'bg-flamingo/30' },
};

// Parse sections from markdown
const parseSections = (content: string): FileSection[] => {
    const sections: FileSection[] = [];

    // Split by ## headers
    const sectionRegex = /^## (.+)$/gm;
    const matches = [...content.matchAll(sectionRegex)];

    for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        const title = match[1].replace(/[🚨📚🎯🚀🔧💡]/g, '').trim();
        const startIndex = match.index! + match[0].length;
        const endIndex = matches[i + 1]?.index || content.length;
        const sectionContent = content.substring(startIndex, endIndex).trim();

        // Generate summary (first line or first 100 chars)
        const firstLine = sectionContent.split('\n')[0] || '';
        const summary = firstLine.length > 100
            ? firstLine.substring(0, 100) + '...'
            : firstLine || 'Configuration and settings';

        sections.push({
            title,
            summary: summary.replace(/^\*\*|\*\*$/g, '').replace(/^>/, '').trim(),
            content: sectionContent,
            isOpen: false,
        });
    }

    return sections;
};

export const SystemFileViewer: React.FC<SystemFileViewerProps> = ({
    fileType,
    ctaLabel = "What else would you like to explore?",
    ctaActionPhrase = "Go home",
}) => {
    const { playClick } = useSound();
    const [content, setContent] = useState<string>('');
    const [sections, setSections] = useState<FileSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copiedAll, setCopiedAll] = useState(false);
    const [copiedSection, setCopiedSection] = useState<number | null>(null);

    const config = fileConfig[fileType];
    const colors = colorClasses[config.color as keyof typeof colorClasses];
    const IconComponent = config.icon;

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const fetchContent = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(config.path);
            if (!response.ok) throw new Error('File not found');
            const text = await response.text();
            setContent(text);
            setSections(parseSections(text));
        } catch (err) {
            setError('Failed to load file');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, [fileType]);

    const toggleSection = (index: number) => {
        playClick();
        setSections(prev =>
            prev.map((s, i) => i === index ? { ...s, isOpen: !s.isOpen } : s)
        );
    };

    const copySection = async (index: number, sectionContent: string) => {
        playClick();
        await navigator.clipboard.writeText(sectionContent);
        setCopiedSection(index);
        setTimeout(() => setCopiedSection(null), 2000);
    };

    const copyAll = async () => {
        playClick();
        await navigator.clipboard.writeText(content);
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
    };

    return (
        <div className="glass-template-container">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
                        <IconComponent className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white font-mono">{config.title}</h1>
                        <p className="text-sm text-mist/50">{config.subtitle}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="p-2 rounded-lg hover:bg-mist/10 transition-colors"
                        onClick={copyAll}
                        title="Copy entire file"
                    >
                        {copiedAll ? (
                            <Check className="w-5 h-5 text-jade" />
                        ) : (
                            <Copy className="w-5 h-5 text-mist/50" />
                        )}
                    </button>
                    <button
                        className="p-2 rounded-lg hover:bg-mist/10 transition-colors"
                        onClick={fetchContent}
                        title="Refresh"
                    >
                        <RefreshCw className={`w-5 h-5 text-mist/50 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Description */}
            <div className={`p-4 rounded-xl ${colors.bg} border ${colors.border} mb-6`}>
                <p className="text-mist/80">{config.description}</p>
            </div>

            {/* Sections */}
            {loading ? (
                <div className="p-8 text-center text-mist/50">Loading...</div>
            ) : error ? (
                <div className="p-8 text-center text-coral">{error}</div>
            ) : (
                <div className="space-y-2 mb-8">
                    {sections.map((section, index) => (
                        <div key={index} className="rounded-xl bg-obsidian/50 border border-mist/10 overflow-hidden">
                            {/* Section Header */}
                            <button
                                className="w-full flex items-center justify-between p-4 text-left"
                                onClick={() => toggleSection(index)}
                            >
                                <div className="flex-1">
                                    <h3 className="font-semibold text-white mb-1">{section.title}</h3>
                                    <p className="text-sm text-mist/50 line-clamp-1">{section.summary}</p>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    <button
                                        className="p-1.5 rounded hover:bg-mist/10"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            copySection(index, section.content);
                                        }}
                                        title="Copy section"
                                    >
                                        {copiedSection === index ? (
                                            <Check className="w-4 h-4 text-jade" />
                                        ) : (
                                            <Copy className="w-4 h-4 text-mist/40" />
                                        )}
                                    </button>
                                    {section.isOpen ? (
                                        <ChevronUp className="w-5 h-5 text-mist/40" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-mist/40" />
                                    )}
                                </div>
                            </button>

                            {/* Section Content */}
                            {section.isOpen && (
                                <div className="px-4 pb-4">
                                    <div className="p-4 rounded-lg bg-obsidian border border-mist/10 max-h-80 overflow-y-auto">
                                        <pre className="text-sm text-mist/70 font-mono whitespace-pre-wrap">
                                            {section.content}
                                        </pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* File Stats */}
            <div className="flex items-center justify-center gap-6 text-sm text-mist/40 mb-6">
                <span>{sections.length} sections</span>
                <span>•</span>
                <span>{content.split('\n').length} lines</span>
                <span>•</span>
                <span>{(content.length / 1024).toFixed(1)} KB</span>
            </div>

            {/* CTA */}
            {ctaLabel && ctaActionPhrase && (
                <div className="text-center">
                    <button
                        className="inline-flex items-center gap-2 px-8 py-4 bg-flamingo text-white font-semibold rounded-full hover:bg-flamingo/90 transition-all text-lg"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default SystemFileViewer;
