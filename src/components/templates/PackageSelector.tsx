/**
 * PackageSelector
 * Interactive package selection for vehicle configuration with live updates
 * 
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Every clickable element calls notifyTele()
 */

import React, { useState, useEffect } from 'react';
import { Check, Package, Plus, Minus, DollarSign, Info } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface VehiclePackage {
    id: string;
    name: string;
    price: string;
    description: string;
    features?: string[];
    isPopular?: boolean;
    isSelected?: boolean;
    actionPhrase?: string;
}

interface PackageSelectorProps {
    /** Title for the package section */
    title?: string;
    /** Subtitle/description */
    subtitle?: string;
    /** Vehicle model this applies to */
    vehicleModel?: string;
    /** Available packages */
    packages?: VehiclePackage[];
    /** Running total (updated as packages are selected) */
    basePrice?: string;
    /** Action when user confirms selection */
    confirmActionPhrase?: string;
    /** Action to move to next step */
    nextStepActionPhrase?: string;
    nextStepLabel?: string;
}

export const PackageSelector: React.FC<PackageSelectorProps> = ({
    title = "Select Your Packages",
    subtitle,
    vehicleModel,
    packages = [],
    basePrice = "$0",
    confirmActionPhrase,
    nextStepActionPhrase,
    nextStepLabel = "Continue to Exterior",
}) => {
    const { playClick } = useSound();

    // Local state for package selection (live updating)
    const [selectedPackages, setSelectedPackages] = useState<Set<string>>(() => {
        const initial = new Set<string>();
        packages.forEach(pkg => {
            if (pkg.isSelected) initial.add(pkg.id);
        });
        return initial;
    });

    // Calculate running total
    const calculateTotal = (): string => {
        const base = parseFloat(basePrice.replace(/[$,]/g, '')) || 0;
        let packagesTotal = 0;

        packages.forEach(pkg => {
            if (selectedPackages.has(pkg.id)) {
                // Extract numeric value from price string (e.g., "$2,500" -> 2500)
                const priceMatch = pkg.price.match(/[\d,]+/);
                if (priceMatch) {
                    packagesTotal += parseFloat(priceMatch[0].replace(/,/g, ''));
                }
            }
        });

        const total = base + packagesTotal;
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(total);
    };

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const togglePackage = (pkg: VehiclePackage) => {
        playClick();

        setSelectedPackages(prev => {
            const next = new Set(prev);
            if (next.has(pkg.id)) {
                next.delete(pkg.id);
            } else {
                next.add(pkg.id);
            }
            return next;
        });

        // Notify Tele about the selection change
        if (pkg.actionPhrase) {
            const isNowSelected = !selectedPackages.has(pkg.id);
            notifyTele(`${isNowSelected ? 'Added' : 'Removed'} ${pkg.name} package`);
        }
    };

    const selectedCount = selectedPackages.size;
    const totalPackagesPrice = (): string => {
        let total = 0;
        packages.forEach(pkg => {
            if (selectedPackages.has(pkg.id)) {
                const priceMatch = pkg.price.match(/[\d,]+/);
                if (priceMatch) {
                    total += parseFloat(priceMatch[0].replace(/,/g, ''));
                }
            }
        });
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(total);
    };

    return (
        <div className="glass-template-container">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <Package className="w-6 h-6 text-flamingo" />
                    <h2 className="text-template-title text-2xl font-bold">{title}</h2>
                </div>
                {subtitle && <p className="text-template-content">{subtitle}</p>}
                {vehicleModel && (
                    <p className="text-mist/50 text-sm mt-1">For your {vehicleModel}</p>
                )}
            </div>

            {/* Live Total Display */}
            <div className="glass-card-featured p-4 mb-6 flex items-center justify-between">
                <div>
                    <p className="text-mist/60 text-sm">Selected Packages</p>
                    <p className="text-mist font-bold text-lg">{selectedCount} package{selectedCount !== 1 ? 's' : ''} • {totalPackagesPrice()}</p>
                </div>
                <div className="text-right">
                    <p className="text-mist/60 text-sm">Running Total</p>
                    <p className="text-jade font-bold text-2xl">{calculateTotal()}</p>
                </div>
            </div>

            {/* Package Grid */}
            <div className="template-grid-2 gap-4 mb-6">
                {packages.map((pkg) => {
                    const isSelected = selectedPackages.has(pkg.id);

                    return (
                        <div
                            key={pkg.id}
                            className={`glass-card-standard glass-card-clickable relative p-4 transition-all duration-300 ${isSelected
                                    ? 'border-jade/60 bg-jade/10 shadow-[0_0_20px_rgba(94,234,212,0.2)]'
                                    : 'hover:border-flamingo/40'
                                }`}
                            onClick={() => togglePackage(pkg)}
                        >
                            {/* Popular Badge */}
                            {pkg.isPopular && (
                                <div className="absolute -top-2 -right-2 template-badge text-xs px-2 py-1">
                                    POPULAR
                                </div>
                            )}

                            {/* Selection Indicator */}
                            <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all ${isSelected
                                    ? 'bg-jade text-onyx'
                                    : 'bg-mist/10 text-mist/40'
                                }`}>
                                {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            </div>

                            {/* Package Info */}
                            <div className="pr-8">
                                <h3 className="text-template-title font-bold mb-1">{pkg.name}</h3>
                                <p className="text-jade font-bold mb-2">{pkg.price}</p>
                                <p className="text-template-content text-sm mb-3">{pkg.description}</p>

                                {/* Features List */}
                                {pkg.features && pkg.features.length > 0 && (
                                    <ul className="space-y-1">
                                        {pkg.features.slice(0, 4).map((feature, idx) => (
                                            <li key={idx} className="text-mist/60 text-xs flex items-center gap-2">
                                                <span className="w-1 h-1 rounded-full bg-flamingo" />
                                                {feature}
                                            </li>
                                        ))}
                                        {pkg.features.length > 4 && (
                                            <li className="text-flamingo text-xs">+{pkg.features.length - 4} more</li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Actions */}
            <div className="template-divider my-6" />

            <div className="flex flex-wrap gap-3">
                {nextStepActionPhrase && (
                    <button
                        className="btn-cta flex-1 min-w-[200px]"
                        onClick={() => handleAction(nextStepActionPhrase)}
                    >
                        {nextStepLabel} →
                    </button>
                )}

                {confirmActionPhrase && (
                    <button
                        className="btn-ghost flex-1 min-w-[150px]"
                        onClick={() => handleAction(confirmActionPhrase)}
                    >
                        Review Selection
                    </button>
                )}
            </div>

            {/* Info Footer */}
            <div className="mt-4 flex items-center gap-2 text-mist/40 text-xs">
                <Info className="w-4 h-4" />
                <span>Click packages to add or remove. Total updates automatically.</span>
            </div>
        </div>
    );
};

export default PackageSelector;
