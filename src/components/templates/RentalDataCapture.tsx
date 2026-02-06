/**
 * RentalDataCapture - RICH GENERIC
 * Conversational form to capture rental property data
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React, { useState } from 'react';
import { Home, DollarSign, TrendingUp, FileText } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface RentalDataCaptureProps {
    headline?: string;
    subheadline?: string;
    assetId?: string;
    submitLabel?: string;
    submitActionPhrase?: string;
    // Pre-fill values (optional)
    defaultPropertyAddress?: string;
    defaultPurchasePrice?: number;
    defaultExpectedMonthlyRent?: number;
    defaultAnnualPropertyTaxes?: number;
    defaultAnnualInsurance?: number;
}

export const RentalDataCapture: React.FC<RentalDataCaptureProps> = ({
    headline = 'Rental Property Details',
    subheadline = 'Provide your property information',
    assetId = 'rental-property',
    submitLabel = 'Calculate Estimate',
    submitActionPhrase = 'submit rental data',
    defaultPropertyAddress = '',
    defaultPurchasePrice,
    defaultExpectedMonthlyRent,
    defaultAnnualPropertyTaxes,
    defaultAnnualInsurance,
}) => {
    const { playClick } = useSound();

    const [propertyAddress, setPropertyAddress] = useState(defaultPropertyAddress);
    const [purchasePrice, setPurchasePrice] = useState(defaultPurchasePrice?.toString() || '');
    const [expectedMonthlyRent, setExpectedMonthlyRent] = useState(defaultExpectedMonthlyRent?.toString() || '');
    const [annualPropertyTaxes, setAnnualPropertyTaxes] = useState(defaultAnnualPropertyTaxes?.toString() || '');
    const [annualInsurance, setAnnualInsurance] = useState(defaultAnnualInsurance?.toString() || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        playClick();

        // Build data object
        const data = {
            propertyAddress,
            purchasePrice: parseFloat(purchasePrice) || 0,
            expectedMonthlyRent: parseFloat(expectedMonthlyRent) || 0,
            annualPropertyTaxes: parseFloat(annualPropertyTaxes) || 0,
            annualInsurance: parseFloat(annualInsurance) || 0,
        };

        // Send to tele with phrase and data
        notifyTele(`${submitActionPhrase} ${JSON.stringify(data)}`);
    };

    const isValid =
        propertyAddress.trim() &&
        purchasePrice &&
        parseFloat(purchasePrice) > 0 &&
        expectedMonthlyRent &&
        parseFloat(expectedMonthlyRent) > 0 &&
        annualPropertyTaxes &&
        parseFloat(annualPropertyTaxes) > 0 &&
        annualInsurance &&
        parseFloat(annualInsurance) > 0;

    return (
        <div className="glass-medium rounded-2xl p-6 md:p-8 h-full">
            {/* Header */}
            <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{headline}</h3>
                {subheadline && <p className="text-mist/60">{subheadline}</p>}
            </div>

            {/* Image */}
            <div className="mb-6 rounded-xl overflow-hidden">
                <SmartImage assetId={assetId} alt="Rental Property" className="w-full h-48 object-cover" />
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
                        placeholder="123 Main St, Austin, TX 78701"
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
                        placeholder="450000"
                        min="0"
                        step="1000"
                    />
                </div>

                {/* Expected Monthly Rent */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-mist mb-2">
                        <TrendingUp className="w-4 h-4" />
                        Expected Monthly Rent
                    </label>
                    <input
                        type="number"
                        value={expectedMonthlyRent}
                        onChange={(e) => setExpectedMonthlyRent(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
                            placeholder:text-mist/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="3200"
                        min="0"
                        step="100"
                    />
                </div>

                {/* Annual Property Taxes */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-mist mb-2">
                        <FileText className="w-4 h-4" />
                        Annual Property Taxes
                    </label>
                    <input
                        type="number"
                        value={annualPropertyTaxes}
                        onChange={(e) => setAnnualPropertyTaxes(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
                            placeholder:text-mist/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="9000"
                        min="0"
                        step="100"
                    />
                </div>

                {/* Annual Insurance */}
                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-mist mb-2">
                        <FileText className="w-4 h-4" />
                        Annual Insurance
                    </label>
                    <input
                        type="number"
                        value={annualInsurance}
                        onChange={(e) => setAnnualInsurance(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
                            placeholder:text-mist/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="2250"
                        min="0"
                        step="100"
                    />
                </div>

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

export default RentalDataCapture;
