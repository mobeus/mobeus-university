/**
 * KnowledgeFileViewer
 * Live template displaying tele-knowledge.md content
 * 
 * LIVE: Fetches actual file content at runtime
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Every clickable element calls notifyTele()
 */

import React, { useState, useEffect } from 'react';
import { Book, Copy, Check, ChevronDown, ChevronUp, FileText, RefreshCw } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ParsedSection {
    title: string;
    content: string;
    level: number;
}

interface SectionProps {
    title: string;
    content: string;
    defaultOpen?: boolean;
    actionPhrase?: string;
}

const Section: React.FC<SectionProps> = ({ title, content, defaultOpen = false, actionPhrase }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [copied, setCopied] = useState(false);
    const { playClick } = useSound();

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(content);
        setCopied(true);
        playClick();
        setTimeout(() => setCopied(false), 2000);
    };

    const handleAction = () => {
        if (actionPhrase) {
            playClick();
            notifyTele(actionPhrase);
        }
    };

    return (
        <div className="glass-card-standard mb-4 overflow-hidden">
            <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3">
                    <div className="template-icon-container">
                        <FileText className="w-5 h-5 text-flamingo" />
                    </div>
                    <h3 className="text-template-title text-lg">{title}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="Copy section"
                    >
                        {copied ? <Check className="w-4 h-4 text-jade" /> : <Copy className="w-4 h-4 text-mist/60" />}
                    </button>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-mist/60" /> : <ChevronDown className="w-5 h-5 text-mist/60" />}
                </div>
            </div>
            {isOpen && (
                <div className="px-4 pb-4">
                    <div className="bg-black/30 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-mist/90 font-mono whitespace-pre-wrap leading-relaxed">
                            {content}
                        </pre>
                    </div>
                    {actionPhrase && (
                        <button
                            onClick={handleAction}
                            className="mt-3 btn-ghost text-sm"
                        >
                            Learn more →
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export const KnowledgeFileViewer: React.FC = () => {
    const [rawContent, setRawContent] = useState<string>('');
    const [sections, setSections] = useState<ParsedSection[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    // Fetch the actual file content
    useEffect(() => {
        const fetchContent = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/tele-knowledge.md');
                if (!response.ok) throw new Error('Failed to fetch file');
                const text = await response.text();
                setRawContent(text);

                // Parse sections (split by ## headers)
                const parsed = parseMarkdownSections(text);
                setSections(parsed);
                setError(null);
            } catch (err) {
                setError('Could not load file content');
                console.error('Error fetching tele-knowledge.md:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, []);

    // Parse markdown into sections by ## headers
    const parseMarkdownSections = (content: string): ParsedSection[] => {
        const lines = content.split('\n');
        const result: ParsedSection[] = [];
        let currentSection: ParsedSection | null = null;
        let currentContent: string[] = [];

        for (const line of lines) {
            // Check for ## headers (level 2)
            const h2Match = line.match(/^## (.+)$/);
            if (h2Match) {
                // Save previous section
                if (currentSection) {
                    currentSection.content = currentContent.join('\n').trim();
                    result.push(currentSection);
                }
                // Start new section
                currentSection = {
                    title: h2Match[1],
                    content: '',
                    level: 2
                };
                currentContent = [];
            } else if (currentSection) {
                currentContent.push(line);
            }
        }

        // Save last section
        if (currentSection) {
            currentSection.content = currentContent.join('\n').trim();
            result.push(currentSection);
        }

        return result;
    };

    const handleRefresh = async () => {
        playClick();
        setIsLoading(true);
        try {
            const response = await fetch('/tele-knowledge.md?t=' + Date.now());
            if (!response.ok) throw new Error('Failed to fetch file');
            const text = await response.text();
            setRawContent(text);
            const parsed = parseMarkdownSections(text);
            setSections(parsed);
            setError(null);
        } catch (err) {
            setError('Could not reload file content');
        } finally {
            setIsLoading(false);
        }
    };

    // Map section titles to action phrases
    const getActionPhrase = (title: string): string | undefined => {
        const mapping: Record<string, string> = {
            'Who I Am': 'What is a tele',
            'The Two-Agent Architecture': 'Show me the two-agent architecture',
            'Folder Structure': 'Show me the folder structure',
            'The 20 Templates': 'Show me all templates',
            'The 3 Slash Commands': 'Show me the slash commands',
            'The 6 Hackathon Phases': 'Show me the hackathon phases',
            'Key Concepts': 'Explain navigateToSection',
            'Design System': 'Show me the design system',
            'Readiness Assessment': 'Check my readiness',
        };
        return mapping[title];
    };

    if (isLoading) {
        return (
            <div className="glass-template-container">
                <div className="flex items-center justify-center py-12">
                    <RefreshCw className="w-8 h-8 text-flamingo animate-spin" />
                    <span className="ml-3 text-mist/70">Loading tele-knowledge.md...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="glass-template-container">
                <div className="text-center py-12">
                    <p className="text-red-400">{error}</p>
                    <button onClick={handleRefresh} className="mt-4 btn-cta">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-template-container">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="template-icon-container-lg">
                        <Book className="w-6 h-6 text-flamingo" />
                    </div>
                    <div>
                        <h2 className="text-template-title text-2xl">tele-knowledge.md</h2>
                        <p className="text-template-content text-sm">Catherine's Knowledge Base — Live Content</p>
                    </div>
                </div>
                <button
                    onClick={handleRefresh}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Refresh content"
                >
                    <RefreshCw className="w-5 h-5 text-mist/60" />
                </button>
            </div>

            <div className="mb-4 p-3 bg-jade/10 border border-jade/20 rounded-lg">
                <p className="text-sm text-jade">
                    📄 Showing actual file content ({rawContent.split('\n').length} lines).
                    Expand any section to see the raw markdown.
                </p>
            </div>

            {sections.map((section, index) => (
                <Section
                    key={index}
                    title={section.title}
                    content={section.content}
                    defaultOpen={index === 0}
                    actionPhrase={getActionPhrase(section.title)}
                />
            ))}

            <div className="mt-6 pt-4 border-t border-mist/10 text-center">
                <p className="text-template-content text-sm">Mobeus University — Catherine v100.0 — System Transparency Release</p>
                <button
                    onClick={() => handleAction("Go home")}
                    className="mt-3 btn-cta"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default KnowledgeFileViewer;
