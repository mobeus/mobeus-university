/**
 * PromptFileViewer
 * Live template displaying glass-prompt.md content
 * 
 * LIVE: Fetches actual file content at runtime
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Every clickable element calls notifyTele()
 */

import React, { useState, useEffect } from 'react';
import { FileCode, Copy, Check, ChevronDown, ChevronUp, FileText, RefreshCw, Zap } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ParsedSection {
    title: string;
    content: string;
    level: number;
    badge?: string;
}

interface SectionProps {
    title: string;
    content: string;
    defaultOpen?: boolean;
    badge?: string;
    actionPhrase?: string;
}

const Section: React.FC<SectionProps> = ({ title, content, defaultOpen = false, badge, actionPhrase }) => {
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
                        <FileText className="w-5 h-5 text-sapphire" />
                    </div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-template-title text-lg">{title}</h3>
                        {badge && (
                            <span className="text-xs px-2 py-0.5 rounded bg-flamingo/20 text-flamingo">
                                {badge}
                            </span>
                        )}
                    </div>
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
                    <div className="bg-black/30 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto">
                        <pre className="text-sm text-mist/90 font-mono whitespace-pre-wrap leading-relaxed">
                            {content}
                        </pre>
                    </div>
                    {actionPhrase && (
                        <button
                            onClick={handleAction}
                            className="mt-3 btn-ghost text-sm"
                        >
                            Try this prompt →
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export const PromptFileViewer: React.FC = () => {
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
                const response = await fetch('/glass-prompt.md');
                if (!response.ok) throw new Error('Failed to fetch file');
                const text = await response.text();
                setRawContent(text);

                // Parse sections (split by ### headers for shot prompts)
                const parsed = parseMarkdownSections(text);
                setSections(parsed);
                setError(null);
            } catch (err) {
                setError('Could not load file content');
                console.error('Error fetching glass-prompt.md:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, []);

    // Parse markdown into sections by ## and ### headers
    const parseMarkdownSections = (content: string): ParsedSection[] => {
        const lines = content.split('\n');
        const result: ParsedSection[] = [];
        let currentSection: ParsedSection | null = null;
        let currentContent: string[] = [];

        for (const line of lines) {
            // Check for ## headers (major sections)
            const h2Match = line.match(/^## (.+)$/);
            // Check for ### headers (shot prompts)
            const h3Match = line.match(/^### (.+)$/);

            if (h2Match || h3Match) {
                // Save previous section
                if (currentSection) {
                    currentSection.content = currentContent.join('\n').trim();
                    if (currentSection.content.length > 0) {
                        result.push(currentSection);
                    }
                }

                // Start new section
                const title = h2Match ? h2Match[1] : h3Match![1];
                const level = h2Match ? 2 : 3;

                // Determine badge based on title
                let badge: string | undefined;
                if (title.includes('CRITICAL') || title.includes('MANDATE')) badge = 'CRITICAL';
                else if (title.includes('RULES')) badge = 'RULES';
                else if (title.match(/^\d+\./)) badge = 'SHOT PROMPT';
                else if (title.match(/^\d+[a-z]?\./)) badge = 'SHOT PROMPT';
                else if (level === 3 && !title.includes('JSON')) badge = 'SHOT PROMPT';

                currentSection = {
                    title: title.replace(/🚨|📚|🎯|💡/g, '').trim(),
                    content: '',
                    level,
                    badge
                };
                currentContent = [];
            } else if (currentSection) {
                currentContent.push(line);
            }
        }

        // Save last section
        if (currentSection) {
            currentSection.content = currentContent.join('\n').trim();
            if (currentSection.content.length > 0) {
                result.push(currentSection);
            }
        }

        return result;
    };

    const handleRefresh = async () => {
        playClick();
        setIsLoading(true);
        try {
            const response = await fetch('/glass-prompt.md?t=' + Date.now());
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

    // Extract action phrase from section content if it contains USER: pattern
    const extractActionPhrase = (title: string, content: string): string | undefined => {
        // Look for **USER:** pattern in content
        const userMatch = content.match(/\*\*USER:\*\*\s*"([^"]+)"/);
        if (userMatch) {
            return userMatch[1];
        }

        // Fallback mappings for common sections
        const mapping: Record<string, string> = {
            '1. Go Home': 'Go home',
            '2. What is a Tele?': 'What is a tele',
            '3. Two-Agent Architecture': 'Show me the two-agent architecture',
            '4. Hackathon Phases': 'Show me the hackathon phases',
            '5. Slash Commands': 'Show me the slash commands',
            '5a. Tools Overview': 'Show me the tools I will use',
            '6. Readiness Experience (Voice-Based Assessment)': 'Check my readiness',
        };

        return mapping[title];
    };

    if (isLoading) {
        return (
            <div className="glass-template-container">
                <div className="flex items-center justify-center py-12">
                    <RefreshCw className="w-8 h-8 text-flamingo animate-spin" />
                    <span className="ml-3 text-mist/70">Loading glass-prompt.md...</span>
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
                        <FileCode className="w-6 h-6 text-flamingo" />
                    </div>
                    <div>
                        <h2 className="text-template-title text-2xl">glass-prompt.md</h2>
                        <p className="text-template-content text-sm">Catherine's Shot Prompts — Live Content</p>
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
                    Expand any section to see the raw markdown including JSON examples.
                </p>
            </div>

            <div className="mb-4 p-3 bg-flamingo/10 border border-flamingo/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-flamingo" />
                    <p className="text-sm text-flamingo font-semibold">PROTECTED SECTION — JSON STRUCTURE</p>
                </div>
                <p className="text-xs text-mist/70">
                    The JSON structure rules in this file are NON-NEGOTIABLE. Every subsection must have only: id, templateId, props.
                </p>
            </div>

            {sections.map((section, index) => (
                <Section
                    key={index}
                    title={section.title}
                    content={section.content}
                    defaultOpen={index === 0}
                    badge={section.badge}
                    actionPhrase={extractActionPhrase(section.title, section.content)}
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

export default PromptFileViewer;
