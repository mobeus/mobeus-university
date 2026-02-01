/**
 * TwoColumns - GENERIC
 * Two vertical columns of paragraphs (~250 words each)
 * Ideal for balanced narratives, comparisons, or parallel stories
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ColumnContent {
    title?: string;
    subtitle?: string;
    paragraph?: string;
}

interface TwoColumnsProps {
    headline?: string;
    subheadline?: string;
    leftColumn?: ColumnContent;
    rightColumn?: ColumnContent;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const TwoColumns: React.FC<TwoColumnsProps> = ({
    headline,
    subheadline,
    leftColumn,
    rightColumn,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const renderColumn = (column: ColumnContent | undefined) => {
        if (!column) return null;
        return (
            <div className="flex flex-col">
                {column.subtitle && (
                    <div className="text-sm text-sapphire font-semibold uppercase tracking-wider mb-3">
                        {column.subtitle}
                    </div>
                )}
                {column.title && (
                    <h3 className="text-2xl font-bold text-white tracking-tight mb-4">
                        {column.title}
                    </h3>
                )}
                {column.paragraph && (
                    <p className="text-mist/70 leading-relaxed text-lg">
                        {column.paragraph}
                    </p>
                )}
            </div>
        );
    };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {/* Header - Left Aligned */}
            {(headline || subheadline) && (
                <div className="mb-10">
                    {subheadline && (
                        <div className="text-sm text-[var(--color-secondary)] font-semibold uppercase tracking-wider mb-3">
                            {subheadline}
                        </div>
                    )}
                    {headline && (
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            {headline}
                        </h2>
                    )}
                </div>
            )}

            {/* Two Columns - Glass Cards */}
            <div className="grid md:grid-cols-2 gap-8 flex-grow">
                <div className="glass-medium rounded-2xl p-8">
                    {renderColumn(leftColumn)}
                </div>
                <div className="glass-medium rounded-2xl p-8">
                    {renderColumn(rightColumn)}
                </div>
            </div>

            {/* CTA */}
            {ctaLabel && ctaActionPhrase && (
                <div className="pt-8 flex justify-end">
                    <button
                        className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                            hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                            transition-all duration-200 text-lg shadow-lg shadow-flamingo/20"
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

export default TwoColumns;
