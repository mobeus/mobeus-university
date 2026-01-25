/**
 * LiveFileViewer - View live markdown files
 * System transparency - shows actual file content
 * 
 * HIERARCHY: Glance (file name) → Look (sections) → Read (content)
 */

import React, { useState, useEffect } from 'react';
import { FileText, ChevronDown, ChevronUp, Copy, Check, RefreshCw, ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface LiveFileViewerProps {
    filePath: string;
    headline?: string;
    description?: string;
    showLineNumbers?: boolean;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

interface Section {
    title: string;
    content: string;
    isOpen: boolean;
}

export const LiveFileViewer: React.FC<LiveFileViewerProps> = ({
    filePath,
    headline,
    description,
    showLineNumbers = false,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [content, setContent] = useState<string>('');
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copiedSection, setCopiedSection] = useState<number | null>(null);

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const fetchContent = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error('File not found');
            const text = await response.text();
            setContent(text);
            parseSections(text);
        } catch (err) {
            setError('Failed to load file');
        } finally {
            setLoading(false);
        }
    };

    const parseSections = (text: string) => {
        const sectionRegex = /^## (.+)$/gm;
        const parts: Section[] = [];
        let lastIndex = 0;
        let match;

        while ((match = sectionRegex.exec(text)) !== null) {
            if (lastIndex > 0) {
                const prevEnd = match.index;
                const prevContent = text.substring(lastIndex, prevEnd).trim();
                if (parts.length > 0) {
                    parts[parts.length - 1].content = prevContent;
                }
            }
            parts.push({
                title: match[1],
                content: '',
                isOpen: false,
            });
            lastIndex = match.index + match[0].length;
        }

        if (parts.length > 0 && lastIndex > 0) {
            parts[parts.length - 1].content = text.substring(lastIndex).trim();
        }

        if (parts.length === 0) {
            parts.push({ title: 'Content', content: text, isOpen: true });
        }

        setSections(parts);
    };

    useEffect(() => {
        fetchContent();
    }, [filePath]);

    const toggleSection = (index: number) => {
        playClick();
        setSections(prev =>
            prev.map((s, i) => i === index ? { ...s, isOpen: !s.isOpen } : s)
        );
    };

    const copySection = async (index: number, content: string) => {
        playClick();
        await navigator.clipboard.writeText(content);
        setCopiedSection(index);
        setTimeout(() => setCopiedSection(null), 2000);
    };

    const fileName = filePath.split('/').pop() || filePath;

    return (
        <div className="glass-template-container">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sapphire/20 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-sapphire" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{headline || fileName}</h1>
                        {description && <p className="text-sm text-mist/50">{description}</p>}
                    </div>
                </div>
                <button
                    className="p-2 rounded-lg hover:bg-mist/10 transition-colors"
                    onClick={fetchContent}
                >
                    <RefreshCw className={`w-5 h-5 text-mist/50 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Content */}
            {loading ? (
                <div className="p-8 text-center text-mist/50">Loading...</div>
            ) : error ? (
                <div className="p-8 text-center text-coral">{error}</div>
            ) : (
                <div className="space-y-2 mb-6">
                    {sections.map((section, index) => (
                        <div key={index} className="rounded-xl bg-obsidian/50 border border-mist/10 overflow-hidden">
                            <button
                                className="w-full flex items-center justify-between p-4 text-left"
                                onClick={() => toggleSection(index)}
                            >
                                <span className="font-semibold text-white">{section.title}</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="p-1.5 rounded hover:bg-mist/10"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            copySection(index, section.content);
                                        }}
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
                            {section.isOpen && (
                                <div className="px-4 pb-4">
                                    <pre className="text-sm text-mist/60 font-mono whitespace-pre-wrap overflow-x-auto">
                                        {section.content}
                                    </pre>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

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

export default LiveFileViewer;
