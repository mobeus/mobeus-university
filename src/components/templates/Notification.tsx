/**
 * Notification - GENERIC
 * Alert/notification banner with action
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { X, LucideIcon, AlertTriangle, CheckCircle, Info, XCircle, Bell } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface NotificationProps {
    icon?: string;
    title?: string;
    message?: string;
    variant?: 'info' | 'success' | 'warning' | 'error';
    dismissible?: boolean;
    dismissPhrase?: string;
    actionLabel?: string;
    actionPhrase?: string;
}

const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return Bell;
    const icons = LucideIcons as unknown as Record<string, LucideIcon>;
    return icons[iconName] || Bell;
};

export const Notification: React.FC<NotificationProps> = ({
    icon,
    title,
    message,
    variant = 'info',
    dismissible = true,
    dismissPhrase,
    actionLabel,
    actionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const variantConfig = {
        info: {
            bg: 'from-sapphire/20 to-sapphire/5',
            border: 'border-sapphire/30',
            icon: Info,
            iconColor: 'text-sapphire',
        },
        success: {
            bg: 'from-jade/20 to-jade/5',
            border: 'border-jade/30',
            icon: CheckCircle,
            iconColor: 'text-jade',
        },
        warning: {
            bg: 'from-yellow-500/20 to-yellow-500/5',
            border: 'border-yellow-500/30',
            icon: AlertTriangle,
            iconColor: 'text-yellow-500',
        },
        error: {
            bg: 'from-red-500/20 to-red-500/5',
            border: 'border-red-500/30',
            icon: XCircle,
            iconColor: 'text-red-500',
        },
    };

    const config = variantConfig[variant];
    const IconComp = icon ? getIcon(icon) : config.icon;

    return (
        <div className="glass-medium rounded-2xl p-4 md:p-6">
            <div className={`relative p-6 rounded-2xl bg-gradient-to-r ${config.bg} border ${config.border}`}>
                <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 ${config.iconColor}`}>
                        <IconComp className="w-6 h-6" />
                    </div>

                    <div className="flex-grow">
                        {title && <h3 className="text-lg font-bold text-white mb-1">{title}</h3>}
                        {message && <p className="text-mist/70">{message}</p>}

                        {actionLabel && actionPhrase && (
                            <button
                                className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                                    ${variant === 'error' ? 'bg-red-500 text-white hover:bg-red-600' :
                                        variant === 'warning' ? 'bg-yellow-500 text-black hover:bg-yellow-600' :
                                            variant === 'success' ? 'bg-jade text-white hover:bg-jade/90' :
                                                'bg-sapphire text-white hover:bg-sapphire/90'}
                                    transition-colors`}
                                onClick={() => handleAction(actionPhrase)}
                            >
                                {actionLabel}
                            </button>
                        )}
                    </div>

                    {dismissible && dismissPhrase && (
                        <button
                            onClick={() => handleAction(dismissPhrase)}
                            className="flex-shrink-0 w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center
                                text-mist/40 hover:text-white hover:bg-white/[0.1] transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notification;
