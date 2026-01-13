/**
 * StaticJourneyNav
 * Marketing-style navigation for static onboarding pages
 * Shows informational links and CTA during the onboarding flow
 */

import React from 'react';

const NAV_LINKS = [
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'for-employers', label: 'For Employers' },
    { id: 'success-stories', label: 'Success Stories' },
    { id: 'support', label: 'Support' },
];

interface StaticJourneyNavProps {
    className?: string;
}

export const StaticJourneyNav: React.FC<StaticJourneyNavProps> = ({ className = '' }) => {
    return (
        <nav className={`flex items-center justify-end gap-8 ${className}`}>
            {/* Navigation links - right aligned, close to Sign In */}
            <div className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                    <button
                        key={link.id}
                        className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
                    >
                        {link.label}
                    </button>
                ))}
            </div>

            {/* Sign In and CTA */}
            <button className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200">
                Sign In
            </button>
            <button className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0d4d4d] hover:bg-[#0a3d3d] rounded-lg transition-colors duration-200 shadow-sm">
                Start Your Journey
            </button>
        </nav>
    );
};

export default StaticJourneyNav;
