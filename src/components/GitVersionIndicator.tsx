import React, { useState, useEffect } from 'react';

/**
 * BUILD INFO
 * Uses Vite's define feature to inject build timestamp at compile time
 * __BUILD_TIMESTAMP__ is replaced during `npm run build` or `npm run dev`
 */

// Build-time injected values (defined in vite.config.ts)
declare const __BUILD_TIMESTAMP__: string;

const getBuildInfo = () => {
    try {
        return {
            timestamp: typeof __BUILD_TIMESTAMP__ !== 'undefined'
                ? __BUILD_TIMESTAMP__
                : new Date().toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'America/New_York'
                }),
            author: 'Richie Etwaru',
            branch: 'beta3.1',
        };
    } catch {
        return {
            timestamp: 'Build time unknown',
            author: 'Richie Etwaru',
            branch: 'beta3.1',
        };
    }
};

const BUILD_INFO = getBuildInfo();

export const GitVersionIndicator: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        // Listen for chat state changes
        const handleChatStateChange = (event: CustomEvent) => {
            setIsChatOpen(event.detail?.isOpen || false);
        };

        window.addEventListener('chatStateChange' as any, handleChatStateChange);

        return () => {
            window.removeEventListener('chatStateChange' as any, handleChatStateChange);
        };
    }, []);

    if (isChatOpen) return null;

    return (
        <div
            className="fixed top-4 right-4 z-50 pointer-events-none select-none transition-opacity duration-300"
            style={{
                fontFamily: 'monospace',
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.5)',
                letterSpacing: '0.5px',
                textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                textAlign: 'right',
                lineHeight: '1.5',
            }}
        >
            <div style={{ fontSize: '10px', opacity: 0.6 }}>Last Compiled</div>
            <div style={{ fontWeight: 'bold' }}>{BUILD_INFO.timestamp}</div>
            <div style={{ fontSize: '10px', opacity: 0.6, marginTop: '4px' }}>Engineer</div>
            <div style={{ fontSize: '10px', opacity: 0.6 }}>{BUILD_INFO.author}</div>
            <div style={{ fontSize: '9px', color: '#5EEAD4', opacity: 1, marginTop: '4px' }}>{BUILD_INFO.branch}</div>
        </div>
    );
};
