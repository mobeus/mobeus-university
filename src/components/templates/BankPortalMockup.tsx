import React, { useState, useEffect, useCallback } from "react";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";
import { ChevronLeft, ChevronRight, MessageSquare, Printer, ChevronDown } from "lucide-react";

interface OfferCard {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    ctaLabel: string;
    actionPhrase: string;
    badge?: string;
}

interface AccountRow {
    id: string;
    name: string;
    availableBalance: string;
    currentBalance: string;
    actionPhrase?: string;
}

interface BankPortalMockupProps {
    bankName?: string;
    bankLogo?: string;
    userName?: string;
    accounts?: AccountRow[];
    offers: OfferCard[];
    autoRotate?: boolean;
    rotateInterval?: number;
    consentText?: string;
    privacyLink?: string;
    animationClass?: string;
    isExiting?: boolean;
}

/**
 * BankPortalMockup Template
 * 
 * Simulates a bank's digital portal with embedded Offer Engine carousel.
 * Demonstrates how offers seamlessly integrate into existing banking interfaces.
 * 
 * Key Messages:
 * - One API integration
 * - Adopts bank's style and aesthetics
 * - Contextually aware offer placement
 * - Non-intrusive, homogenous experience
 */
export const BankPortalMockup: React.FC<BankPortalMockupProps> = ({
    bankName = "First Financial Bank",
    userName = "John Doe",
    accounts = [
        { id: "1", name: "Open Checking", availableBalance: "$5,289.19", currentBalance: "$5,289.19" },
        { id: "2", name: "Open Savings", availableBalance: "$10,320.29", currentBalance: "$10,320.29" },
        { id: "3", name: "Secondary Savings", availableBalance: "$1,800.19", currentBalance: "$1,800.19" },
    ],
    offers = [],
    autoRotate = true,
    rotateInterval = 5000,
    consentText = "By checking this box I consent to shared data with Fiserv",
    animationClass = "",
    isExiting = false,
}) => {
    const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
    const [isConsentChecked, setIsConsentChecked] = useState(false);
    const { playClick } = useSound();

    // Auto-rotate offers (safely handles empty offers)
    useEffect(() => {
        if (!autoRotate || !offers || offers.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentOfferIndex((prev) => (prev + 1) % offers.length);
        }, rotateInterval);

        return () => clearInterval(timer);
    }, [autoRotate, rotateInterval, offers]);

    const goToPrevious = useCallback(() => {
        if (!offers || offers.length === 0) return;
        playClick();
        setCurrentOfferIndex((prev) => (prev - 1 + offers.length) % offers.length);
    }, [offers, playClick]);

    const goToNext = useCallback(() => {
        if (!offers || offers.length === 0) return;
        playClick();
        setCurrentOfferIndex((prev) => (prev + 1) % offers.length);
    }, [offers, playClick]);

    const handleOfferClick = useCallback((offer: OfferCard) => {
        playClick();
        sendToTele(offer.actionPhrase);
    }, [playClick]);

    const handleAccountClick = useCallback((account: AccountRow) => {
        playClick();
        if (account.actionPhrase) {
            sendToTele(account.actionPhrase);
        }
    }, [playClick]);

    // Early return if no offers - prevents crash and renders nothing
    if (!offers || offers.length === 0) {
        console.warn('[BankPortalMockup] No offers provided, skipping render');
        return null;
    }

    const currentOffer = offers[currentOfferIndex];

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            {/* Browser Chrome Simulation */}
            <div className="bg-gray-100 rounded-t-xl border border-gray-300 overflow-hidden shadow-xl">
                {/* Top Bar - Bank Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
                    {/* Bank Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.09 5.1 7.63 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z" />
                            </svg>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <nav className="flex items-center gap-8">
                        <button className="text-cyan-600 font-medium border-b-2 border-cyan-600 pb-2 px-1">
                            Accounts
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 pb-2 px-1">
                            Transfers
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 pb-2 px-1">
                            Pay Bills
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 pb-2 px-1">
                            Manage Money
                        </button>
                    </nav>

                    {/* User Actions */}
                    <div className="flex items-center gap-4 text-gray-500 text-sm">
                        <button className="flex items-center gap-1 hover:text-gray-700">
                            <MessageSquare className="w-4 h-4" />
                            Live Chat
                        </button>
                        <span className="text-gray-300">|</span>
                        <button className="flex items-center gap-1 hover:text-gray-700">
                            <Printer className="w-4 h-4" />
                            Print
                        </button>
                        <span className="text-gray-300">|</span>
                        <button className="flex items-center gap-1 hover:text-gray-700">
                            {userName}
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-gray-50 p-6 flex gap-6 min-h-[400px]">
                    {/* Left Side - Accounts Table */}
                    <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-cyan-600 text-xl font-semibold mb-4">Accounts</h2>

                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-gray-700 text-sm font-medium border-b border-gray-200">
                                    <th className="pb-3">Accounts</th>
                                    <th className="pb-3">Available Balance</th>
                                    <th className="pb-3">Current Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.map((account) => (
                                    <tr
                                        key={account.id}
                                        className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                                        onClick={() => handleAccountClick(account)}
                                    >
                                        <td className="py-4 text-cyan-600 hover:underline">{account.name}</td>
                                        <td className="py-4 text-gray-800">{account.availableBalance}</td>
                                        <td className="py-4 text-gray-800">{account.currentBalance}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Right Side - Offer Engine Carousel */}
                    <div className="w-80 flex-shrink-0">
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                            {/* Offer Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={currentOffer?.imageUrl}
                                    alt={currentOffer?.title}
                                    className="w-full h-full object-cover transition-all duration-500"
                                />

                                {/* Carousel Navigation */}
                                {offers.length > 1 && (
                                    <>
                                        <button
                                            onClick={goToPrevious}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5 text-gray-700" />
                                        </button>
                                        <button
                                            onClick={goToNext}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
                                        >
                                            <ChevronRight className="w-5 h-5 text-gray-700" />
                                        </button>
                                    </>
                                )}

                                {/* Badge */}
                                {currentOffer?.badge && (
                                    <div className="absolute top-3 right-3 bg-cyan-500 text-white text-xs font-bold px-2 py-1 rounded">
                                        {currentOffer.badge}
                                    </div>
                                )}
                            </div>

                            {/* Offer Content */}
                            <div className="p-4">
                                <h3 className="text-cyan-600 font-semibold text-lg mb-1">
                                    {currentOffer?.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                    {currentOffer?.description}
                                </p>

                                {/* Consent Checkbox */}
                                <label className="flex items-start gap-2 text-xs text-gray-500 mb-4 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isConsentChecked}
                                        onChange={(e) => setIsConsentChecked(e.target.checked)}
                                        className="mt-0.5 rounded border-gray-300"
                                    />
                                    <span>{consentText}</span>
                                </label>

                                {/* CTA Button */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleOfferClick(currentOffer)}
                                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-4 py-2 rounded transition-colors text-sm flex-1"
                                    >
                                        {currentOffer?.ctaLabel}
                                    </button>
                                    <div className="w-3 h-3 rounded-full bg-orange-400" title="Powered by Fiserv" />
                                </div>

                                {/* Privacy Link */}
                                <a href="#" className="block text-center text-cyan-600 text-xs mt-3 hover:underline">
                                    Privacy Policy
                                </a>
                            </div>

                            {/* Carousel Indicators */}
                            {offers.length > 1 && (
                                <div className="flex justify-center gap-2 pb-4">
                                    {offers.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                playClick();
                                                setCurrentOfferIndex(index);
                                            }}
                                            className={`w-2 h-2 rounded-full transition-colors ${index === currentOfferIndex ? "bg-cyan-500" : "bg-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Integration Badge */}
                        <div className="mt-4 text-center">
                            <span className="inline-flex items-center gap-2 text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
                                <span className="w-2 h-2 bg-green-400 rounded-full" />
                                Offer Engine via One API
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Messages Below */}
            <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/10">
                    <h4 className="text-white font-semibold mb-1">Seamless Integration</h4>
                    <p className="text-white/70 text-sm">One API embeds into existing digital services</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/10">
                    <h4 className="text-white font-semibold mb-1">Native Experience</h4>
                    <p className="text-white/70 text-sm">Adopts bank's style and aesthetics automatically</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/10">
                    <h4 className="text-white font-semibold mb-1">Contextually Aware</h4>
                    <p className="text-white/70 text-sm">Right offer, right place, right time</p>
                </div>
            </div>
        </div>
    );
};

export default BankPortalMockup;
