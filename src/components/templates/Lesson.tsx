/**
 * Lesson - GENERIC
 * Structured lesson with objectives, content, and summary
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState } from 'react';
import { ArrowRight, LucideIcon, Zap, Target, BookOpen, CheckCircle, ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface LessonSection {
    icon?: string;
    title: string;
    content: string;
    imageUrl?: string;
    imagePrompt?: string;
    keyPoints?: string[];
}

interface LessonProps {
    title: string;
    subtitle?: string;
    duration?: string;
    difficulty?: string;
    imageUrl?: string;
    imagePrompt?: string;
    objectivesLabel?: string;
    objectives?: string[];
    sections?: LessonSection[];
    summaryLabel?: string;
    summary?: string;
    keyTakeaways?: string[];
    nextLabel?: string;
    nextPhrase?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return BookOpen;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || BookOpen;
};

export const Lesson: React.FC<LessonProps> = ({
    title,
    subtitle,
    duration,
    difficulty,
    imageUrl,
    imagePrompt,
    objectivesLabel,
    objectives,
    sections,
    summaryLabel,
    summary,
    keyTakeaways,
    nextLabel,
    nextPhrase,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const [activeSection, setActiveSection] = useState(0);
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {/* Header */}
            <div className="pb-8 border-b border-white/[0.06]">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Hero image */}
                    {(imageUrl || imagePrompt) && (
                        <div className="w-full md:w-1/3 aspect-video md:aspect-square rounded-xl overflow-hidden">
                            <SmartImage
                                assetId={imageUrl || imagePrompt || 'lesson-hero'}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="flex-grow">
                        {/* Meta badges */}
                        <div className="flex gap-3 mb-4">
                            {duration && (
                                <span className="px-3 py-1 text-xs rounded-full bg-sapphire/10 text-sapphire border border-sapphire/20">
                                    {duration}
                                </span>
                            )}
                            {difficulty && (
                                <span className="px-3 py-1 text-xs rounded-full bg-flamingo/10 text-flamingo border border-flamingo/20">
                                    {difficulty}
                                </span>
                            )}
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h1>
                        {subtitle && <p className="text-mist/60 text-lg">{subtitle}</p>}

                        {/* Objectives */}
                        {objectives && objectives.length > 0 && (
                            <div className="mt-6 p-4 rounded-xl bg-jade/5 border border-jade/20">
                                <div className="flex items-center gap-2 mb-3">
                                    <Target className="w-5 h-5 text-jade" />
                                    <span className="font-semibold text-jade">{objectivesLabel || 'Learning Objectives'}</span>
                                </div>
                                <ul className="space-y-2">
                                    {objectives.map((obj, i) => (
                                        <li key={i} className="flex items-start gap-2 text-mist/70">
                                            <CheckCircle className="w-4 h-4 text-jade/50 mt-0.5 flex-shrink-0" />
                                            {obj}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content sections */}
            {sections && sections.length > 0 && (
                <div className="flex-grow py-8">
                    {/* Section tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {sections.map((section, i) => (
                            <button
                                key={i}
                                onClick={() => { playClick(); setActiveSection(i); }}
                                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all
                                    ${i === activeSection
                                        ? 'bg-sapphire text-white'
                                        : 'bg-white/[0.05] text-mist/60 hover:text-white'}`}
                            >
                                {section.title}
                            </button>
                        ))}
                    </div>

                    {/* Active section content */}
                    {sections[activeSection] && (
                        <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06]">
                            <div className="grid md:grid-cols-2 gap-8">
                                {(sections[activeSection].imageUrl || sections[activeSection].imagePrompt) && (
                                    <div className="rounded-xl overflow-hidden">
                                        <SmartImage
                                            assetId={sections[activeSection].imageUrl || sections[activeSection].imagePrompt || `section-${activeSection}`}
                                            alt={sections[activeSection].title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-4">{sections[activeSection].title}</h3>
                                    <p className="text-mist/70 leading-relaxed mb-6">{sections[activeSection].content}</p>

                                    {sections[activeSection].keyPoints && (
                                        <div className="space-y-2">
                                            {sections[activeSection].keyPoints!.map((point, i) => (
                                                <div key={i} className="flex items-center gap-2 text-mist/60">
                                                    <ChevronRight className="w-4 h-4 text-sapphire flex-shrink-0" />
                                                    {point}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Summary */}
            {(summary || keyTakeaways) && (
                <div className="py-6 border-t border-white/[0.06]">
                    <h3 className="text-lg font-bold text-white mb-4">{summaryLabel || 'Summary'}</h3>
                    {summary && <p className="text-mist/70 mb-4">{summary}</p>}
                    {keyTakeaways && keyTakeaways.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-3">
                            {keyTakeaways.map((takeaway, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-jade/5 border border-jade/20">
                                    <CheckCircle className="w-5 h-5 text-jade flex-shrink-0" />
                                    <span className="text-mist/70">{takeaway}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Actions */}
            <div className="pt-6 flex justify-between">
                {nextLabel && nextPhrase ? (
                    <button
                        onClick={() => handleAction(nextPhrase)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.05] text-white rounded-xl 
                            hover:bg-white/[0.1] transition-colors"
                    >
                        {nextLabel}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                ) : <div />}

                {ctaLabel && ctaActionPhrase && (
                    <button
                        className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                            hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                            transition-all duration-200 text-lg shadow-lg shadow-flamingo/20"
                        onClick={() => handleAction(ctaActionPhrase)}
                    >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Lesson;
