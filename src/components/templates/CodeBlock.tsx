/**
 * CodeBlock
 * Syntax-highlighted code display for teaching programming concepts
 * 
 * USE WHEN: Showing code snippets, examples, signatures
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Optional click action for code exploration
 */

import React, { useState } from 'react';
import { Copy, Check, ChevronRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  actionPhrase?: string;
}

// Simple syntax highlighting for common tokens
const highlightCode = (code: string, language: string): React.ReactNode[] => {
  // Keywords by language
  const keywords: Record<string, string[]> = {
    typescript: ['import', 'export', 'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'interface', 'type', 'extends', 'implements', 'async', 'await', 'from', 'default', 'true', 'false', 'null', 'undefined', 'new', 'this', 'typeof', 'void'],
    tsx: ['import', 'export', 'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'interface', 'type', 'extends', 'implements', 'async', 'await', 'from', 'default', 'true', 'false', 'null', 'undefined', 'new', 'this', 'typeof', 'void'],
    javascript: ['import', 'export', 'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'extends', 'async', 'await', 'from', 'default', 'true', 'false', 'null', 'undefined', 'new', 'this', 'typeof'],
    json: ['true', 'false', 'null'],
    markdown: [],
  };

  const langKeywords = keywords[language] || keywords['typescript'];
  
  const lines = code.split('\n');
  
  return lines.map((line, lineIndex) => {
    // Process line for highlighting
    let processed = line;
    
    // Highlight strings (both single and double quotes)
    processed = processed.replace(/(["'`])(?:(?!\1)[^\\]|\\.)*\1/g, '<span class="text-turmeric">$&</span>');
    
    // Highlight comments
    processed = processed.replace(/(\/\/.*$)/gm, '<span class="text-mist/50 italic">$1</span>');
    
    // Highlight keywords (word boundaries)
    langKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
      processed = processed.replace(regex, '<span class="text-sapphire font-medium">$1</span>');
    });
    
    // Highlight types (PascalCase words)
    processed = processed.replace(/\b([A-Z][a-zA-Z0-9]*)\b/g, (match) => {
      // Don't re-highlight if already in a span
      if (langKeywords.includes(match.toLowerCase())) return match;
      return `<span class="text-flamingo">${match}</span>`;
    });
    
    // Highlight numbers
    processed = processed.replace(/\b(\d+)\b/g, '<span class="text-turmeric">$1</span>');
    
    return (
      <span 
        key={lineIndex} 
        dangerouslySetInnerHTML={{ __html: processed || '&nbsp;' }} 
      />
    );
  });
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  title,
  showLineNumbers = false,
  actionPhrase,
}) => {
  const { playClick } = useSound();
  const [copied, setCopied] = useState(false);

  const handleAction = () => {
    if (actionPhrase) {
      playClick();
      notifyTele(actionPhrase);
    }
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const lines = code.split('\n');
  const highlightedLines = highlightCode(code, language);

  return (
    <div 
      className={`glass-template-container ${actionPhrase ? 'glass-card-clickable' : ''}`}
      onClick={actionPhrase ? handleAction : undefined}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {title && (
            <h4 className="text-template-subtitle text-sm font-medium">{title}</h4>
          )}
          <span className="template-badge-mist text-xs">{language.toUpperCase()}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-mist/60 hover:text-mist transition-colors px-2 py-1 rounded hover:bg-white/10"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Container */}
      <div className="bg-black/40 rounded-lg border border-mist/20 overflow-x-auto">
        <pre className="p-4 text-sm font-mono leading-relaxed">
          <code className="text-mist/90">
            {highlightedLines.map((line, index) => (
              <div key={index} className="flex">
                {showLineNumbers && (
                  <span className="select-none text-mist/30 pr-4 text-right min-w-[2.5rem]">
                    {index + 1}
                  </span>
                )}
                <span className="flex-1">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Action indicator */}
      {actionPhrase && (
        <div className="flex items-center justify-end mt-3 text-sapphire text-xs">
          <span>Click to explore</span>
          <ChevronRight className="w-3 h-3 ml-1" />
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
