import React, { useState, useEffect } from 'react';

interface BuildInfo {
    hash: string;
    timestamp: string;
    author: string;
    branch: string;
    buildDate: string;
}

export const GitVersionIndicator: React.FC = () => {
    const [buildInfo, setBuildInfo] = useState<BuildInfo | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        const loadBuildInfo = async () => {
            try {
                // Try to load the generated build info
                const response = await fetch('/src/generated/buildInfo.json');
                if (response.ok) {
                    const data = await response.json();
                    setBuildInfo(data);
                } else {
                    throw new Error('Build info not found');
                }
            } catch (error) {
                // Fallback for development - use last known build time
                // This prevents showing "current time" as build time
                const fallback: BuildInfo = {
                    hash: 'dev',
                    timestamp: 'Jan 12, 2026, 10:44 PM',
                    author: 'Richie Etwaru',
                    branch: 'main',
                    buildDate: '2026-01-13T03:44:23.000Z'
                };
                setBuildInfo(fallback);
            }
        };

        loadBuildInfo();

        // Listen for chat state changes
        const handleChatStateChange = (event: CustomEvent) => {
            setIsChatOpen(event.detail?.isOpen || false);
        };

        window.addEventListener('chatStateChange' as any, handleChatStateChange);

        return () => {
            window.removeEventListener('chatStateChange' as any, handleChatStateChange);
        };
    }, []);

    if (!buildInfo || isChatOpen) return null;

    return (
        <div
            className="fixed top-4 right-4 z-50 pointer-events-none select-none transition-opacity duration-300"
            style={{
                fontFamily: 'monospace',
                fontSize: '5.5px',
                color: 'rgba(255, 255, 255, 0.175)',
                letterSpacing: '0.5px',
                textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                textAlign: 'right',
                lineHeight: '1.5',
            }}
        >
            <div style={{ fontSize: '5px', opacity: 0.6 }}>Last Compiled</div>
            <div style={{ fontWeight: 'bold' }}>{buildInfo.timestamp}</div>
            <div style={{ fontSize: '5px', opacity: 0.6, marginTop: '4px' }}>Engineer</div>
            <div style={{ fontWeight: 'bold' }}>{buildInfo.author}</div>
            <div style={{ fontSize: '4.5px', opacity: 0.4, marginTop: '4px' }}>{buildInfo.hash} · {buildInfo.branch}</div>
        </div>
    );
};
