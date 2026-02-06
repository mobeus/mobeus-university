/**
 * FlipPropertyReview - RICH GENERIC
 * Review captured flip property data before compliance
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { Hammer, DollarSign, MapPin, TrendingUp, Edit, CheckCircle } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface FlipPropertyReviewProps {
    badge?: string;
    headline?: string;
    subheadline?: string;
    propertyAddress: string;
    purchasePrice: number;
    renovationCosts: number;
    expectedSalePrice: number;
    assetId?: string;
    editLabel?: string;
    editActionPhrase?: string;
    confirmLabel?: string;
    confirmActionPhrase: string; // Required - what to send when user confirms
}

export const FlipPropertyReview: React.FC<FlipPropertyReviewProps> = ({
    badge = 'REVIEW',
    headline = 'Review Your Information',
    subheadline = 'Please confirm these details are correct',
    propertyAddress,
    purchasePrice,
    renovationCosts,
    expectedSalePrice,
    assetId = 'flip-property',
    editLabel = 'Edit Details',
    editActionPhrase = 'edit flip details',
    confirmLabel = 'Looks Good',
    confirmActionPhrase,
}) => {
    const { playClick } = useSound();

    const handleAction = (actionPhrase: string) => {
        playClick();
        notifyTele(actionPhrase);
    };

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    // Calculate potential profit
    const potentialProfit = expectedSalePrice - (purchasePrice + renovationCosts);

    return (
        <div className="glass-medium rounded-2xl p-6 md:p-8">
            {/* Badge */}
            {badge && (
                <div className="flex justify-center mb-4">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {badge}
                    </span>
                </div>
            )}

            {/* Header */}
            <div className="text-center mb-6">
                {headline && <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{headline}</h3>}
                {subheadline && <p className="text-sm text-white/60">{subheadline}</p>}
            </div>

            {/* Image + Data Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Left: AI-Generated Image */}
                <div className="relative h-64 lg:h-full rounded-xl overflow-hidden border border-white/10 bg-black/20">
                    <SmartImage
                        assetId={assetId}
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <Hammer className="w-5 h-5 text-amber-400" />
                        <span className="text-xs font-bold uppercase tracking-wide text-amber-400">Fix & Flip</span>
                    </div>
                </div>

                {/* Right: Data Display */}
                <div className="space-y-4">
                    {/* Property Address */}
                    <div className="glass-light rounded-xl p-4 border border-white/5">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-5 h-5 text-amber-400" />
                            </div>
                            <div className="flex-1">
                                <div className="text-xs text-white/40 uppercase tracking-wide mb-1">Property Address</div>
                                <div className="text-base font-semibold text-white">{propertyAddress}</div>
                            </div>
                        </div>
                    </div>

                    {/* Purchase Price */}
                    <div className="glass-light rounded-xl p-4 border border-white/5">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                                <DollarSign className="w-5 h-5 text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <div className="text-xs text-white/40 uppercase tracking-wide mb-1">Purchase Price</div>
                                <div className="text-xl font-bold text-blue-400">{formatCurrency(purchasePrice)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Renovation Costs */}
                    <div className="glass-light rounded-xl p-4 border border-white/5">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                                <Hammer className="w-5 h-5 text-orange-400" />
                            </div>
                            <div className="flex-1">
                                <div className="text-xs text-white/40 uppercase tracking-wide mb-1">Renovation Costs</div>
                                <div className="text-xl font-bold text-orange-400">{formatCurrency(renovationCosts)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Expected Sale Price & Profit */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass-light rounded-xl p-4 border border-white/5">
                            <div className="flex flex-col items-center text-center">
                                <TrendingUp className="w-5 h-5 text-emerald-400 mb-2" />
                                <div className="text-[10px] text-white/40 uppercase tracking-wide mb-1">Expected Sale</div>
                                <div className="text-sm font-bold text-white">{formatCurrency(expectedSalePrice)}</div>
                            </div>
                        </div>

                        <div className="glass-light-primary rounded-xl p-4 border border-emerald-500/30">
                            <div className="flex flex-col items-center text-center">
                                <DollarSign className="w-5 h-5 text-emerald-400 mb-2" />
                                <div className="text-[10px] text-white/40 uppercase tracking-wide mb-1">Est. Profit</div>
                                <div className={`text-sm font-bold ${potentialProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {formatCurrency(potentialProfit)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-3 justify-center">
                {editActionPhrase && (
                    <button
                        onClick={() => handleAction(editActionPhrase)}
                        className="px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-full 
                            hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <Edit className="w-4 h-4" />
                        {editLabel}
                    </button>
                )}
                <button
                    onClick={() => handleAction(confirmActionPhrase)}
                    className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-full 
                        hover:bg-emerald-600 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                    <CheckCircle className="w-5 h-5" />
                    {confirmLabel}
                </button>
            </div>
        </div>
    );
};

export default FlipPropertyReview;
