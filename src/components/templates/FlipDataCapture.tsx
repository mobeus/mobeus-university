/**
 * FlipDataCapture - RICH GENERIC
 * Conversational form to capture flip property data
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState } from 'react';
import { Home, DollarSign, Hammer, TrendingUp } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface FlipDataCaptureProps {
    headline?: string;
    subheadline?: string;
    assetId?: string;
    submitLabel?: string;
    submitActionPhrase?: string;
    // Pre-fill values (optional)
    defaultPropertyAddress?: string;
    defaultPurchasePrice?: number;
    defaultRenovationCosts?: number;
    defaultExpectedSalePrice?: number;
}

export const FlipDataCapture: React.FC<FlipDataCaptureProps> = ({
    headline = 'Flip Property Details',
    subheadline = 'Provide your flip project information',
    assetId = 'flip-property',
    submitLabel = 'Calculate Estimate',
    submitActionPhrase = 'submit flip data',
    defaultPropertyAddress = '',
    defaultPurchasePrice,
    defaultRenovationCosts,
    defaultExpectedSalePrice,
}) => {
    const { playClick } = useSound();

    const [propertyAddress, setPropertyAddress] = useState(defaultPropertyAddress);
    const [purchasePrice, setPurchasePrice] = useState(defaultPurchasePrice?.toString() || '');
    const [renovationCosts, setRenovationCosts] = useState(defaultRenovationCosts?.toString() || '');
    const [expectedSalePrice, setExpectedSalePrice] = useState(defaultExpectedSalePrice?.toString() || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        playClick();

        // Build data object
        const data = {
            propertyAddress,
            purchasePrice: parseFloat(purchasePrice) || 0,
            renovationCosts: parseFloat(renovationCosts) || 0,
            expectedSalePrice: parseFloat(expectedSalePrice) || 0,
        };

        // Send to tele with phrase and data
        notifyTele(`${submitActionPhrase} ${JSON.stringify(data)}`);
    };

    const isValid =
        propertyAddress.trim() &&
        purchasePrice &&
        parseFloat(purchasePrice) > 0 &&
        renovationCosts &&
        parseFloat(renovationCosts) > 0 &&
        expectedSalePrice &&
        parseFloat(expectedSalePrice) > 0;

    // Calculate potential profit
    const profit =
        isValid
            ? parseFloat(expectedSalePrice) - parseFloat(purchasePrice) - parseFloat(renovationCosts)
            : 0;

    return (
        <div className="glass-medium rounded-2xl p-6 md:p-8 h-full">
            {/* Header */}
            <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{headline}</h3>
                {subheadline && <p className="text-mist/60">{subheadline}</p>}
            </div>

            {/* Image */}
            <div className="mb-6 rounded-xl overflow-hidden">
                <SmartImage assetId={assetId} alt="Flip Property Renovation" className="w-full h-48 object-cover" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Property Address */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-mist mb-2">
                        <Home className="w-4 h-4" />
                        Property Address
                    </label>
                    <input
                        type="text"
                        value={propertyAddress}
                        onChange={(e) => setPropertyAddress(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
                            placeholder:text-mist/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="789 Oak Ave, Dallas, TX 75201"
                    />
                </div>

                {/* Purchase Price */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-mist mb-2">
                        <DollarSign className="w-4 h-4" />
                        Purchase Price
                    </label>
                    <input
                        type="number"
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
                            placeholder:text-mist/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="300000"
                        min="0"
                        step="1000"
                    />
                </div>

                {/* Renovation Costs */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-mist mb-2">
                        <Hammer className="w-4 h-4" />
                        Renovation Costs
                    </label>
                    <input
                        type="number"
                        value={renovationCosts}
                        onChange={(e) => setRenovationCosts(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
                            placeholder:text-mist/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="75000"
                        min="0"
                        step="1000"
                    />
                </div>

                {/* Expected Sale Price */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-mist mb-2">
                        <TrendingUp className="w-4 h-4" />
                        Expected Sale Price
                    </label>
                    <input
                        type="number"
                        value={expectedSalePrice}
                        onChange={(e) => setExpectedSalePrice(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
                            placeholder:text-mist/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="450000"
                        min="0"
                        step="1000"
                    />
                </div>

                {/* Projected Profit (if all fields filled) */}
                {isValid && (
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-mist">Projected Profit:</span>
                            <span className={`text-xl font-bold ${profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                ${profit.toLocaleString()}
                            </span>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!isValid}
                    className={`w-full px-6 py-4 rounded-full font-semibold text-lg transition-all ${isValid
                            ? 'bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]'
                            : 'bg-white/5 text-mist/40 cursor-not-allowed'
                        }`}
                >
                    {submitLabel}
                </button>
            </form>
        </div>
    );
};

export default FlipDataCapture;
