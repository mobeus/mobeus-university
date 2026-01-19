/**
 * StyleGuide
 * Displays the design system with colors, frost effects, and CSS classes
 * 
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Every clickable element calls notifyTele()
 */

import React from 'react';
import { Palette, Sparkles, Type, LayoutGrid } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ColorItem {
    name: string;
    hex: string;
    useFor: string;
    actionPhrase?: string;
}

interface ClassItem {
    name: string;
    description: string;
    actionPhrase?: string;
}

interface StyleGuideProps {
    title?: string;
    colors?: ColorItem[];
    frostLevels?: ClassItem[];
    cssClasses?: {
        category: string;
        items: ClassItem[];
    }[];
}

export const StyleGuide: React.FC<StyleGuideProps> = ({
    title = 'Design System',
    colors = [
        { name: 'Mist', hex: '#F5F5F5', useFor: 'Primary text, light elements' },
        { name: 'Onyx', hex: '#0D0D0D', useFor: 'Dark backgrounds' },
        { name: 'Flamingo', hex: '#9B5DE5', useFor: 'Accent, CTAs, badges' },
        { name: 'Wave', hex: '#003D4F', useFor: 'Deep teal backgrounds' },
        { name: 'Turmeric', hex: '#CC850A', useFor: 'Secondary accents' },
        { name: 'Jade', hex: '#5EEAD4', useFor: 'Success, highlights' },
        { name: 'Sapphire', hex: '#47A1AD', useFor: 'Links, information' },
        { name: 'Amethyst', hex: '#7C3AED', useFor: 'Premium features' }
    ],
    frostLevels = [
        { name: 'backdrop-blur-sm', description: '4px — Subtle frost' },
        { name: 'backdrop-blur', description: '8px — Standard frost' },
        { name: 'backdrop-blur-md', description: '12px — Medium frost' },
        { name: 'backdrop-blur-lg', description: '16px — Heavy frost' },
        { name: 'backdrop-blur-xl', description: '24px — Maximum frost' }
    ],
    cssClasses = [
        {
            category: 'Cards',
            items: [
                { name: 'glass-card-minimal', description: 'Subtle (5% white)' },
                { name: 'glass-card-standard', description: 'Standard (10% white)' },
                { name: 'glass-card-featured', description: 'Prominent (15% white)' }
            ]
        },
        {
            category: 'Buttons',
            items: [
                { name: 'btn-cta', description: 'Flamingo primary' },
                { name: 'btn-sapphire', description: 'Blue actions' },
                { name: 'btn-turmeric', description: 'Yellow secondary' }
            ]
        }
    ]
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    return (
        <div className="glass-template-container">
            <h2 className="text-template-title text-2xl mb-6">{title}</h2>

            {/* Brand Colors */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <div className="template-icon-container">
                        <Palette className="w-5 h-5 text-flamingo" />
                    </div>
                    <h3 className="text-template-subtitle">Brand Colors</h3>
                </div>
                <div className="template-grid-4">
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            className="glass-card-minimal p-4 glass-card-clickable"
                            onClick={() => handleAction(color.actionPhrase || `Tell me more about the ${color.name} color`)}
                        >
                            <div
                                className="w-full h-12 rounded-lg mb-3"
                                style={{ backgroundColor: color.hex }}
                            />
                            <h4 className="text-template-title text-sm font-semibold">{color.name}</h4>
                            <p className="text-template-content text-xs">{color.hex}</p>
                            <p className="text-template-content text-xs mt-1">{color.useFor}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Frost Levels */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <div className="template-icon-container">
                        <Sparkles className="w-5 h-5 text-sapphire" />
                    </div>
                    <h3 className="text-template-subtitle">Glass Frost Effects</h3>
                </div>
                <div className="grid gap-3">
                    {frostLevels.map((frost, index) => (
                        <div
                            key={index}
                            className="glass-card-standard p-4 glass-card-clickable flex items-center justify-between"
                            onClick={() => handleAction(frost.actionPhrase || `Tell me more about ${frost.name}`)}
                        >
                            <code className="text-jade text-sm">{frost.name}</code>
                            <span className="text-template-content text-sm">{frost.description}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* CSS Classes */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="template-icon-container">
                        <LayoutGrid className="w-5 h-5 text-turmeric" />
                    </div>
                    <h3 className="text-template-subtitle">CSS Classes</h3>
                </div>
                <div className="grid gap-6">
                    {cssClasses.map((category, catIndex) => (
                        <div key={catIndex}>
                            <h4 className="text-template-title text-sm mb-3">{category.category}</h4>
                            <div className="grid gap-2">
                                {category.items.map((item, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        className="glass-card-minimal p-3 glass-card-clickable flex items-center justify-between"
                                        onClick={() => handleAction(item.actionPhrase || `Show me an example of ${item.name}`)}
                                    >
                                        <code className="text-flamingo text-sm">{item.name}</code>
                                        <span className="text-template-content text-sm">{item.description}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StyleGuide;
