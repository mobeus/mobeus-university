/**
 * Logo Component
 * Standalone logo for use in both static onboarding and dynamic navigation
 */

import React from 'react';
// Updated logo: Cashco branding (Feb 5, 2026)
import { default as cashcoLogo } from '@/assets/cashco-logo.png';

interface LogoProps {
    onClick?: () => void;
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ onClick, className = '' }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`no-lightboard flex items-center hover:opacity-80 transition-opacity ${className}`}
            disabled={!onClick}
        >
            <img
                src={cashcoLogo}
                alt="Cashco"
                className="no-lightboard h-[27px] w-auto object-contain max-w-none transition-all duration-300 ease-in-out"
                style={{ aspectRatio: 'auto' }}
            />
        </button>
    );
};

export default Logo;
