/**
 * ClientLogoGrid
 * Grid of client/partner logos
 * 
 * USE WHEN: Social proof, client showcase, "who uses this"
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Each logo is clickable → notifyTele
 */

import React from 'react';
import { Building2 } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ClientLogo {
    name: string;
    imageUrl?: string;
    imagePrompt?: string;
    actionPhrase: string;
}

interface ClientLogoGridProps {
    title?: string;
    subtitle?: string;
    logos: ClientLogo[];
    columns?: 3 | 4 | 6;
}

export const ClientLogoGrid: React.FC<ClientLogoGridProps> = ({
    title,
    subtitle,
    logos = [],
    columns = 4,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const getGridClass = () => {
        switch (columns) {
            case 3: return 'template-grid-3';
            case 6: return 'grid grid-cols-3 md:grid-cols-6 gap-4';
            default: return 'template-grid-4';
        }
    };

    return (
        <div className="glass-template-container">
            {title && <h3 className="text-template-title text-xl mb-2 text-center">{title}</h3>}
            {subtitle && <p className="text-template-content text-center mb-6">{subtitle}</p>}

            <div className={getGridClass()}>
                {logos?.map((logo, index) => (
                    <div
                        key={index}
                        className="glass-card-minimal glass-card-clickable flex items-center justify-center p-4 aspect-[3/2] group"
                        onClick={() => handleAction(logo.actionPhrase)}
                    >
                        {(logo.imageUrl || logo.imagePrompt) ? (
                            <SmartImage
                                assetId={logo.imageUrl || logo.imagePrompt || ''}
                                alt={logo.name}
                                className="smart-image max-h-12 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-mist/40 group-hover:text-mist/80 transition-colors">
                                <Building2 className="w-8 h-8" />
                                <span className="text-xs text-center">{logo.name}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientLogoGrid;
