/**
 * CodeExample - Code snippet display
 * Reusable for any code showcase
 * 
 * HIERARCHY: Glance (language badge) → Look (code) → Read (line details)
 */

import React, { useState } from 'react';
import { Copy, Check, ArrowRight, Code } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface CodeExampleProps {
    headline?: string;
    description?: string;
    code: string;
    language?: string;
    filename?: string;
    showLineNumbers?: boolean;
    highlightLines?: number[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const CodeExample: React.FC<CodeExampleProps> = ({
    headline,
    description,
    code,
    language = 'typescript',
    filename,
    showLineNumbers = true,
    highlightLines = [],
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [copied, setCopied] = useState(false);

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const handleCopy = async () => {
        playClick();
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const lines = code.split('\n');

    return (
        <div className="glass-template-container">
            {headline && (
                <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{headline}</h1>
                    {description && <p className="text-lg text-mist/70">{description}</p>}
                </div>
            )}

            {/* Code Block */}
            <div className="rounded-2xl bg-obsidian border border-mist/10 overflow-hidden mb-6">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-mist/10 bg-obsidian/50">
                    <div className="flex items-center gap-3">
                        {/* Dots */}
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-coral/50" />
                            <div className="w-3 h-3 rounded-full bg-turmeric/50" />
                            <div className="w-3 h-3 rounded-full bg-jade/50" />
                        </div>

                        {/* Filename or Language */}
                        <div className="flex items-center gap-2">
                            <Code className="w-4 h-4 text-mist/40" />
                            <span className="text-sm text-mist/50 font-mono">
                                {filename || language}
                            </span>
                        </div>
                    </div>

                    {/* Copy Button */}
                    <button
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-mist/50 hover:text-mist/80 transition-colors"
                        onClick={handleCopy}
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 text-jade" />
                                <span className="text-jade">Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4" />
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Code */}
                <div className="p-4 overflow-x-auto">
                    <pre className="text-sm font-mono leading-relaxed">
                        {lines.map((line, index) => {
                            const lineNum = index + 1;
                            const isHighlighted = highlightLines.includes(lineNum);

                            return (
                                <div
                                    key={index}
                                    className={`flex ${isHighlighted ? 'bg-flamingo/10 -mx-4 px-4' : ''}`}
                                >
                                    {showLineNumbers && (
                                        <span className="w-8 text-right mr-4 text-mist/30 select-none flex-shrink-0">
                                            {lineNum}
                                        </span>
                                    )}
                                    <code className="text-mist/70 whitespace-pre">{line}</code>
                                </div>
                            );
                        })}
                    </pre>
                </div>
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

export default CodeExample;
