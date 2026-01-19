/**
 * ConceptCard
 * Single-focus concept explanation with optional image
 * 
 * USE WHEN: Explaining a single concept, definition, "what is X"
 * STYLING: Premium glassmorphism with gradient accents
 * NAVIGATION: Card is clickable → notifyTele (via CTA)
 */

import React, { useState } from 'react';
import {
    ChevronRight,
    Lightbulb,
    Cpu,
    Code2,
    Layers,
    Terminal,
    Sparkles,
    BookOpen,
    Zap,
    Brain,
    Puzzle,
    Target
} from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ConceptCardProps {
    title?: string;
    definition?: string;
    details?: string;
    imageUrl?: string;
    imagePrompt?: string;
    ctaLabel?: string;
    ctaActionPhrase?: string;
    actionPhrase?: string;
    icon?: string;
    accentColor?: 'flamingo' | 'wave' | 'emerald' | 'amber' | 'violet';
}

// Icon mapping for dynamic icon selection
const iconMap: Record<string, React.ElementType> = {
    lightbulb: Lightbulb,
    cpu: Cpu,
    code: Code2,
    layers: Layers,
    terminal: Terminal,
    sparkles: Sparkles,
    book: BookOpen,
    zap: Zap,
    brain: Brain,
    puzzle: Puzzle,
    target: Target,
};

// Smart icon picker based on title keywords
const getSmartIcon = (title: string): React.ElementType => {
    const lower = title.toLowerCase();
    if (lower.includes('tele') || lower.includes('agent') || lower.includes('ai')) return Brain;
    if (lower.includes('architecture') || lower.includes('structure')) return Layers;
    if (lower.includes('function') || lower.includes('code') || lower.includes('navigate')) return Code2;
    if (lower.includes('template') || lower.includes('component') || lower.includes('visual')) return Puzzle;
    if (lower.includes('command') || lower.includes('slash') || lower.includes('terminal')) return Terminal;
    if (lower.includes('concept') || lower.includes('idea')) return Lightbulb;
    return Sparkles;
};

// ============================================
// UNIFIED COLOR SYSTEM - USES OFFICIAL MOBEUS BRAND COLORS
// Source of truth: tailwind.config.ts
// ============================================
// 
// BRAND PALETTE:
// - mist:     #F5F5F5 - Light text, icons
// - onyx:     #0D0D0D - Dark backgrounds  
// - flamingo: #9B5DE5 - Primary accent (PURPLE)
// - wave:     #003D4F - Secondary accent (DARK TEAL)
// - turmeric: #CC850A - Tertiary accent (GOLD)
// - jade:     #5EEAD4 - Success states (TEAL)
// - sapphire: #47A1AD - Links, info (BLUE-TEAL)
// - amethyst: #7C3AED - Deep purple accent
//
// ============================================

// Accent color gradients - USING OFFICIAL BRAND COLORS
const accentGradients = {
    flamingo: 'from-flamingo to-amethyst',           // Purple gradient
    wave: 'from-jade to-sapphire',                   // Teal gradient  
    emerald: 'from-jade to-jade/70',                 // Jade mono
    amber: 'from-turmeric to-turmeric/70',           // Turmeric mono
    violet: 'from-amethyst to-flamingo',             // Amethyst to flamingo
};

const accentBorders = {
    flamingo: 'border-flamingo/30 hover:border-flamingo/60',
    wave: 'border-jade/30 hover:border-jade/60',
    emerald: 'border-jade/30 hover:border-jade/60',
    amber: 'border-turmeric/30 hover:border-turmeric/60',
    violet: 'border-amethyst/30 hover:border-amethyst/60',
};

const accentGlows = {
    flamingo: 'hover:shadow-[0_0_30px_rgba(155,93,229,0.2)]',    // #9B5DE5
    wave: 'hover:shadow-[0_0_30px_rgba(94,234,212,0.2)]',        // #5EEAD4
    emerald: 'hover:shadow-[0_0_30px_rgba(94,234,212,0.2)]',     // #5EEAD4
    amber: 'hover:shadow-[0_0_30px_rgba(204,133,10,0.2)]',       // #CC850A
    violet: 'hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]',      // #7C3AED
};

const accentIconBg = {
    flamingo: 'bg-gradient-to-br from-flamingo to-amethyst',
    wave: 'bg-gradient-to-br from-jade to-sapphire',
    emerald: 'bg-gradient-to-br from-jade to-jade/80',
    amber: 'bg-gradient-to-br from-turmeric to-turmeric/80',
    violet: 'bg-gradient-to-br from-amethyst to-flamingo',
};

const accentButtonBg = {
    flamingo: 'bg-gradient-to-r from-flamingo to-amethyst hover:from-flamingo/90 hover:to-amethyst/90',
    wave: 'bg-gradient-to-r from-jade to-sapphire hover:from-jade/90 hover:to-sapphire/90',
    emerald: 'bg-gradient-to-r from-jade to-jade/80 hover:from-jade/90 hover:to-jade/70',
    amber: 'bg-gradient-to-r from-turmeric to-turmeric/80 hover:from-turmeric/90 hover:to-turmeric/70',
    violet: 'bg-gradient-to-r from-amethyst to-flamingo hover:from-amethyst/90 hover:to-flamingo/90',
};

const accentTopLine = {
    flamingo: 'bg-gradient-to-r from-flamingo to-amethyst',
    wave: 'bg-gradient-to-r from-jade to-sapphire',
    emerald: 'bg-gradient-to-r from-jade to-jade/70',
    amber: 'bg-gradient-to-r from-turmeric to-turmeric/70',
    violet: 'bg-gradient-to-r from-amethyst to-flamingo',
};

export const ConceptCard: React.FC<ConceptCardProps> = ({
    title = 'Concept',
    definition = '',
    details,
    imageUrl,
    imagePrompt,
    ctaLabel = 'Explore this concept',
    ctaActionPhrase,
    actionPhrase,
    icon,
    accentColor = 'wave',
}) => {
    const { playClick } = useSound();
    const [isHovered, setIsHovered] = useState(false);

    const handleAction = (phrase: string) => {
        playClick();
        notifyTele(phrase);
    };

    const finalActionPhrase = ctaActionPhrase || actionPhrase || `Tell me more about ${title}`;
    const hasImage = imageUrl || imagePrompt;

    // Get icon component
    const IconComponent = icon ? (iconMap[icon] || getSmartIcon(title)) : getSmartIcon(title);

    return (
        <div
            className={`
                group relative overflow-hidden rounded-2xl
                bg-gradient-to-br from-white/[0.08] to-white/[0.02]
                backdrop-blur-xl border transition-all duration-500 ease-out
                ${accentBorders[accentColor]}
                ${accentGlows[accentColor]}
                hover:translate-y-[-2px]
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Gradient accent line at top */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] ${accentTopLine[accentColor]} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

            {/* Subtle corner glow effect */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 ${accentIconBg[accentColor]} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />

            <div className="relative p-6 md:p-8">
                <div className={`flex ${hasImage ? 'flex-col lg:flex-row' : 'flex-col'} gap-6`}>

                    {/* Image section */}
                    {hasImage && (
                        <div className="flex-shrink-0 w-full lg:w-1/3">
                            <div className="aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/20">
                                <SmartImage
                                    assetId={imageUrl || imagePrompt || ''}
                                    alt={title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    )}

                    {/* Content section */}
                    <div className="flex-1 flex flex-col">
                        {/* Icon + Title row */}
                        <div className="flex items-start gap-4 mb-4">
                            {/* Icon container with gradient background */}
                            <div className={`
                                flex-shrink-0 w-12 h-12 rounded-xl
                                ${accentIconBg[accentColor]}
                                flex items-center justify-center
                                shadow-lg transition-transform duration-300
                                group-hover:scale-110 group-hover:rotate-3
                            `}>
                                <IconComponent className="w-6 h-6 text-white" />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl md:text-2xl font-semibold text-white leading-tight pt-2 group-hover:text-white/90 transition-colors">
                                {title}
                            </h3>
                        </div>

                        {/* Definition */}
                        {definition && (
                            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-4">
                                {definition}
                            </p>
                        )}

                        {/* Details with subtle styling */}
                        {details && (
                            <p className="text-sm md:text-base text-white/60 leading-relaxed mb-6 pl-4 border-l-2 border-white/10">
                                {details}
                            </p>
                        )}

                        {/* Spacer to push CTA to bottom */}
                        <div className="flex-1" />

                        {/* CTA Button */}
                        <button
                            className={`
                                group/btn inline-flex items-center gap-2 
                                px-5 py-2.5 rounded-xl
                                ${accentButtonBg[accentColor]}
                                text-white font-medium text-sm
                                shadow-lg transition-all duration-300
                                hover:shadow-xl hover:scale-[1.02]
                                active:scale-[0.98]
                                w-fit
                            `}
                            onClick={() => handleAction(finalActionPhrase)}
                        >
                            {ctaLabel}
                            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom decorative element */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
    );
};

export default ConceptCard;
