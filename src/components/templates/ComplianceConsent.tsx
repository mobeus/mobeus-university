/**
 * ComplianceConsent - Compliance Disclaimer with Confirmation
 * Displays mandatory compliance statement requiring explicit user consent
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { Shield, AlertCircle, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface ComplianceConsentProps {
    icon?: string;
    badge?: string;
    headline?: string;
    statement: string; // Required - the compliance statement
    confirmLabel?: string;
    confirmActionPhrase: string; // Required - what to send to tele on confirm
    variant?: 'default' | 'warning' | 'info';
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Shield;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Shield;
};

export const ComplianceConsent: React.FC<ComplianceConsentProps> = ({
    icon,
    badge = 'COMPLIANCE',
    headline = 'Important Disclosure',
    statement,
    confirmLabel = 'I Understand',
    confirmActionPhrase,
    variant = 'default',
}) => {
    const { playClick } = useSound();

    const handleConfirm = () => {
        playClick();
        notifyTele(confirmActionPhrase);
    };

    const IconComponent = getIcon(icon);

    // Variant styling
    const variantStyles = {
        default: {
            container: 'border-blue-500/30 bg-blue-500/5',
            badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            icon: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
            button: 'bg-blue-500 hover:bg-blue-600 text-white',
        },
        warning: {
            container: 'border-amber-500/30 bg-amber-500/5',
            badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
            icon: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
            button: 'bg-amber-500 hover:bg-amber-600 text-white',
        },
        info: {
            container: 'border-emerald-500/30 bg-emerald-500/5',
            badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
            icon: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
            button: 'bg-emerald-500 hover:bg-emerald-600 text-white',
        },
    };

    const styles = variantStyles[variant];

    return (
        <div className={`rounded-2xl border p-6 md:p-8 ${styles.container} backdrop-blur-sm`}>
            {/* Badge */}
            {badge && (
                <div className="flex justify-center mb-4">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${styles.badge}`}>
                        {badge}
                    </span>
                </div>
            )}

            {/* Icon & Headline */}
            <div className="flex flex-col items-center text-center mb-6">
                <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-4 ${styles.icon}`}>
                    <IconComponent className="w-8 h-8" />
                </div>
                {headline && <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{headline}</h3>}
            </div>

            {/* Compliance Statement */}
            <div className="bg-black/20 border border-white/10 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                    <p className="text-base md:text-lg text-white/90 leading-relaxed">{statement}</p>
                </div>
            </div>

            {/* Confirm Button */}
            <div className="flex justify-center">
                <button
                    onClick={handleConfirm}
                    className={`px-8 py-4 font-bold text-lg rounded-full 
                        hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg ${styles.button}`}
                >
                    {confirmLabel}
                </button>
            </div>

            {/* Helper Text */}
            <p className="text-center text-sm text-white/40 mt-4">
                You can also say "{confirmActionPhrase}" to continue
            </p>
        </div>
    );
};

export default ComplianceConsent;
