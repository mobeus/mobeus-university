/**
 * Form - GENERIC
 * Interactive form with live-updating fields
 * Split layout: Content on left, Form on right
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, User, Mail, Send, CheckCircle, Sparkles, PartyPopper, LucideIcon, ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { SmartImage } from '@/components/ui/SmartImage';

interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'date' | 'tel' | 'textarea';
    icon?: string;
    placeholder?: string;
    required?: boolean;
}

interface InfoItem {
    text: string;
}

interface Badge {
    icon?: string;
    label: string;
    variant?: 'default' | 'accent' | 'success';
}

interface ContentPanel {
    title?: string;
    subtitle?: string;
    paragraph?: string;
    imageUrl?: string;
    imagePrompt?: string;
    badges?: Badge[];
}

interface FormProps {
    headline?: string;
    subheadline?: string;
    fields?: FormField[];
    infoLabel?: string;
    infoItems?: InfoItem[];
    submitLabel?: string;
    submitActionPhrase?: string;
    values?: Record<string, string>;
    confirmed?: boolean;
    confirmationTitle?: string;
    confirmationMessage?: string;
    content?: ContentPanel;  // NEW: Left side content
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return User;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || User;
};

const MiniCalendar: React.FC<{ selectedDate: string | null }> = ({ selectedDate }) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const selectedDateObj = selectedDate ? new Date(selectedDate + 'T00:00:00') : null;
    const isSelectedInCurrentMonth = selectedDateObj &&
        selectedDateObj.getMonth() === currentMonth &&
        selectedDateObj.getFullYear() === currentYear;

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    const days = useMemo(() => {
        const result = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            result.push(<div key={`empty-${i}`} className="w-9 h-9" />);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === today.getDate();
            const isSelected = isSelectedInCurrentMonth && selectedDateObj?.getDate() === day;
            const isPast = day < today.getDate();

            result.push(
                <div
                    key={day}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-300 ${isSelected
                        ? 'bg-flamingo text-white scale-110 shadow-lg shadow-flamingo/30'
                        : isToday
                            ? 'bg-sapphire/20 text-sapphire border border-sapphire/30'
                            : isPast
                                ? 'text-mist/20'
                                : 'text-mist/60 hover:bg-white/5'
                        }`}
                >
                    {day}
                </div>
            );
        }
        return result;
    }, [currentMonth, currentYear, selectedDateObj, firstDayOfMonth, daysInMonth, isSelectedInCurrentMonth]);

    return (
        <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06]">
            <div className="flex items-center justify-between mb-5">
                <span className="text-lg font-semibold text-white">{monthNames[currentMonth]} {currentYear}</span>
                {selectedDate && (
                    <span className="text-xs text-flamingo flex items-center gap-1 px-3 py-1 rounded-full bg-flamingo/10">
                        <Sparkles className="w-3 h-3" />
                        Selected
                    </span>
                )}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <div key={i} className="w-9 h-8 text-xs text-mist/40 font-medium flex items-center justify-center">{d}</div>
                ))}
                {days}
            </div>
        </div>
    );
};

export const Form: React.FC<FormProps> = ({
    headline,
    subheadline,
    fields,
    infoLabel,
    infoItems,
    submitLabel,
    submitActionPhrase,
    values: propValues = {},
    confirmed = false,
    confirmationTitle,
    confirmationMessage,
    content,
}) => {
    const { playClick } = useSound();
    const [localValues, setLocalValues] = useState<Record<string, string>>(propValues);
    const [showCelebration, setShowCelebration] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Live update: When tele sends new values, update the form fields
    useEffect(() => {
        Object.entries(propValues).forEach(([key, val]) => {
            if (val && val !== localValues[key]) {
                setLocalValues(prev => ({ ...prev, [key]: val }));
            }
        });
    }, [propValues]);

    useEffect(() => {
        if (confirmed && !showCelebration) {
            setShowCelebration(true);
            setSubmitted(true);
            playClick();
            setTimeout(() => setShowCelebration(false), 4000);
        }
    }, [confirmed, showCelebration, playClick]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        playClick();
        if (submitActionPhrase && fields) {
            const summary = fields.map(f => `${f.label}: ${localValues[f.name] || ''}`).join(', ');
            notifyTele(`${submitActionPhrase} - ${summary}`);
        }
    };

    const hasDateField = fields?.some(f => f.type === 'date');
    const dateValue = hasDateField && fields ? localValues[fields.find(f => f.type === 'date')!.name] : null;
    const hasContent = content && (content.title || content.imageUrl || content.imagePrompt || content.paragraph);

    if (submitted || confirmed) {
        return (
            <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex items-center justify-center">
                <div className="p-16 rounded-3xl bg-gradient-to-b from-jade/10 to-jade/5 border border-jade/20 text-center max-w-lg">
                    <div className={`transition-all duration-700 ${showCelebration ? 'scale-110' : 'scale-100'}`}>
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <PartyPopper className={`w-10 h-10 text-flamingo ${showCelebration ? 'animate-bounce' : ''}`} />
                            <div className="w-20 h-20 rounded-full bg-jade/20 border border-jade/30 flex items-center justify-center">
                                <CheckCircle className={`w-10 h-10 text-jade ${showCelebration ? 'animate-pulse' : ''}`} />
                            </div>
                            <PartyPopper className={`w-10 h-10 text-flamingo ${showCelebration ? 'animate-bounce' : ''}`} style={{ transform: 'scaleX(-1)' }} />
                        </div>
                        {confirmationTitle && <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{confirmationTitle}</h3>}
                        {confirmationMessage && <p className="text-lg text-mist/60 max-w-sm mx-auto">{confirmationMessage}</p>}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6 h-full flex flex-col">
            {/* Optional header */}
            {(headline || subheadline) && (
                <div className="pb-6">
                    {headline && <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{headline}</h2>}
                    {subheadline && <p className="text-mist/60 mt-2">{subheadline}</p>}
                </div>
            )}

            {/* Split layout */}
            <div className="grid md:grid-cols-2 gap-8 flex-grow">

                {/* LEFT: Content Panel */}
                <div className="flex flex-col gap-6">
                    {/* Content panel with title, image, paragraph */}
                    {hasContent && (
                        <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06] flex-grow flex flex-col">
                            {/* Image */}
                            {(content.imageUrl || content.imagePrompt) && (
                                <div className="aspect-square rounded-xl overflow-hidden mb-6 border border-white/[0.06]">
                                    <SmartImage
                                        assetId={content.imageUrl || content.imagePrompt || 'form-image'}
                                        alt={content.title || 'Form'}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Title */}
                            {content.title && (
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{content.title}</h3>
                            )}

                            {/* Subtitle */}
                            {content.subtitle && (
                                <p className="text-lg text-sapphire font-medium mb-4">{content.subtitle}</p>
                            )}

                            {/* Paragraph */}
                            {content.paragraph && (
                                <p className="text-mist/60 leading-relaxed mb-6">{content.paragraph}</p>
                            )}

                            {/* Badges */}
                            {content.badges && content.badges.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {content.badges.map((badge, i) => {
                                        const BadgeIcon = getIcon(badge.icon);
                                        const variantClass = badge.variant === 'accent'
                                            ? 'bg-flamingo/10 text-flamingo border-flamingo/20'
                                            : badge.variant === 'success'
                                                ? 'bg-jade/10 text-jade border-jade/20'
                                                : 'bg-sapphire/10 text-sapphire border-sapphire/20';
                                        return (
                                            <div key={i} className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm ${variantClass}`}>
                                                {badge.icon && <BadgeIcon className="w-3 h-3" />}
                                                {badge.label}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Calendar if date field exists */}
                    {hasDateField && <MiniCalendar selectedDate={dateValue || null} />}

                    {/* Info items if provided */}
                    {infoItems && infoItems.length > 0 && (
                        <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06]">
                            {infoLabel && <h4 className="text-sm font-semibold text-flamingo mb-4 uppercase tracking-wider">{infoLabel}</h4>}
                            <ul className="space-y-3">
                                {infoItems.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-mist/70">
                                        <span className="w-2 h-2 rounded-full bg-sapphire mt-2 flex-shrink-0" />
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* RIGHT: Form Fields */}
                <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06]">
                    <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
                        {fields && fields.map((field) => {
                            const IconComp = getIcon(field.icon);
                            const value = localValues[field.name] || '';
                            const hasValue = !!value;

                            return (
                                <div key={field.name}>
                                    <label className="flex items-center gap-2 text-sm text-mist/60 mb-3 font-medium">
                                        <IconComp className="w-4 h-4" />
                                        {field.label}
                                        {hasValue && <Sparkles className="w-3 h-3 text-sapphire animate-pulse ml-auto" />}
                                    </label>
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            required={field.required}
                                            placeholder={field.placeholder}
                                            className={`w-full px-5 py-4 rounded-xl 
                                                bg-white/[0.02] border text-white text-lg
                                                placeholder:text-mist/30 
                                                focus:outline-none focus:bg-white/[0.04]
                                                transition-all duration-200 min-h-[120px] resize-none
                                                ${hasValue
                                                    ? 'border-sapphire/40 ring-1 ring-sapphire/20'
                                                    : 'border-white/[0.06] hover:border-white/[0.12]'
                                                }`}
                                            value={value}
                                            onChange={(e) => setLocalValues(prev => ({ ...prev, [field.name]: e.target.value }))}
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            required={field.required}
                                            placeholder={field.placeholder}
                                            className={`w-full px-5 py-4 rounded-xl 
                                                bg-white/[0.02] border text-white text-lg
                                                placeholder:text-mist/30 
                                                focus:outline-none focus:bg-white/[0.04]
                                                transition-all duration-200
                                                ${hasValue
                                                    ? 'border-sapphire/40 ring-1 ring-sapphire/20'
                                                    : 'border-white/[0.06] hover:border-white/[0.12]'
                                                }`}
                                            value={value}
                                            onChange={(e) => setLocalValues(prev => ({ ...prev, [field.name]: e.target.value }))}
                                        />
                                    )}
                                </div>
                            );
                        })}

                        {/* Spacer to push button to bottom */}
                        <div className="flex-grow" />

                        {/* Submit button - BOTTOM RIGHT */}
                        {submitLabel && (
                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-3 px-8 py-4 
                                        bg-flamingo text-white font-semibold rounded-full 
                                        hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                                        transition-all text-lg shadow-lg shadow-flamingo/20"
                                >
                                    {submitLabel}
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;

