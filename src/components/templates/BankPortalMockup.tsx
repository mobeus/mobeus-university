import React, { useState, useEffect, useCallback } from "react";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";
import { ChevronLeft, ChevronRight, Building2, CreditCard, Wallet, ArrowUpRight, Receipt, FileText } from "lucide-react";

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
 * BankPortalMockup Template - Glassmorphism Redesign
 * 
 * White frosted glass aesthetic with pill-shaped buttons.
 * Mobile-first responsive design.
 */
export const BankPortalMockup: React.FC<BankPortalMockupProps> = ({
    bankName = "Modern Bank Co",
    userName = "John",
    accounts = [
        { id: "1", name: "Business Checking", availableBalance: "$15,289.19", currentBalance: "$15,289.19" },
        { id: "2", name: "Business Savings", availableBalance: "$42,320.29", currentBalance: "$42,320.29" },
    ],
    offers = [
        {
            id: "1",
            title: "Clover POS System",
            subtitle: "POINT OF SALE",
            description: "A powerful POS system optimized for your business. $49-$1,349 depending on device.",
            imageUrl: "/offers/clover-pos.png",
            ctaLabel: "Apply Now",
            actionPhrase: "Show me step 1",
            badge: "RECOMMENDED"
        },
        {
            id: "2",
            title: "Clover Capital",
            subtitle: "BUSINESS FUNDING",
            description: "Get fast access to working capital based on your sales history. Up to $500K available.",
            imageUrl: "/offers/clover-capital.png",
            ctaLabel: "Learn More",
            actionPhrase: "Tell me about Clover Capital",
            badge: "POPULAR"
        },
        {
            id: "3",
            title: "Business Credit Line",
            subtitle: "FLEXIBLE CREDIT",
            description: "Revolving credit line for your business needs. Rates as low as 8.99% APR.",
            imageUrl: "/offers/credit-line.png",
            ctaLabel: "Check Rates",
            actionPhrase: "Show me credit line options"
        }
    ],
    autoRotate = true,
    rotateInterval = 5000,
    consentText = "I consent to share data with Fiserv for this application",
    animationClass = "",
    isExiting = false,
}) => {
    const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
    const [isConsentChecked, setIsConsentChecked] = useState(false);
    const { playClick } = useSound();

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

    const handleOfferClick = useCallback(() => {
        playClick();
        // All offers lead to step 1 of onboarding
        sendToTele("Show me step 1");
    }, [playClick]);

    const handleAccountClick = useCallback((account: AccountRow) => {
        playClick();
        if (account.actionPhrase) sendToTele(account.actionPhrase);
    }, [playClick]);

    if (!offers || offers.length === 0) {
        console.warn('[BankPortalMockup] No offers provided');
        return null;
    }

    const currentOffer = offers[currentOfferIndex];

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            {/* Glassmorphism Container */}
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl overflow-hidden">

                {/* Header - Frosted Glass */}
                <div className="bg-white/40 backdrop-blur-md px-4 sm:px-6 py-4 border-b border-white/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-gray-800 font-semibold text-lg">{bankName}</p>
                                <p className="text-gray-600 text-sm">Welcome back, {userName}</p>
                            </div>
                        </div>

                        {/* Nav Pills */}
                        <nav className="hidden md:flex items-center gap-2">
                            {["Accounts", "Transfers", "Pay Bills"].map((tab, idx) => (
                                <button
                                    key={tab}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${idx === 0
                                        ? "bg-cyan-500 text-white shadow-md"
                                        : "text-gray-700 hover:bg-white/50"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row gap-6">

                        {/* Accounts Section - Frosted Cards */}
                        <div className="flex-1 space-y-6">
                            {/* Accounts */}
                            <div>
                                <h2 className="text-gray-800 text-xl font-bold mb-4 flex items-center gap-2">
                                    <Wallet className="w-5 h-5 text-cyan-600" />
                                    Your Accounts
                                </h2>

                                <div className="space-y-3">
                                    {accounts.map((account) => (
                                        <button
                                            key={account.id}
                                            onClick={() => handleAccountClick(account)}
                                            className="w-full bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40 hover:bg-white/80 transition-all shadow-sm hover:shadow-md text-left"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-xl flex items-center justify-center">
                                                        <CreditCard className="w-5 h-5 text-cyan-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-800 font-semibold text-base">{account.name}</p>
                                                        <p className="text-gray-500 text-sm">Available Balance</p>
                                                    </div>
                                                </div>
                                                <p className="text-gray-900 font-bold text-xl">{account.availableBalance}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div>
                                <h3 className="text-gray-700 font-semibold mb-3">Quick Actions</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <button className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40 hover:bg-white/80 transition-all text-center">
                                        <div className="w-10 h-10 mx-auto bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-2">
                                            <ArrowUpRight className="w-5 h-5 text-green-600" />
                                        </div>
                                        <span className="text-gray-700 text-sm font-medium">Transfer</span>
                                    </button>
                                    <button className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40 hover:bg-white/80 transition-all text-center">
                                        <div className="w-10 h-10 mx-auto bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-2">
                                            <Receipt className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <span className="text-gray-700 text-sm font-medium">Pay Bills</span>
                                    </button>
                                    <button className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40 hover:bg-white/80 transition-all text-center">
                                        <div className="w-10 h-10 mx-auto bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-2">
                                            <FileText className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <span className="text-gray-700 text-sm font-medium">Statements</span>
                                    </button>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div>
                                <h3 className="text-gray-700 font-semibold mb-3">Recent Activity</h3>
                                <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 divide-y divide-white/30">
                                    <div className="p-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                                <ArrowUpRight className="w-4 h-4 text-red-500 rotate-90" />
                                            </div>
                                            <div>
                                                <p className="text-gray-800 font-medium text-sm">Office Supplies Co</p>
                                                <p className="text-gray-500 text-xs">Today, 9:42 AM</p>
                                            </div>
                                        </div>
                                        <span className="text-red-600 font-semibold">-$245.00</span>
                                    </div>
                                    <div className="p-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                <ArrowUpRight className="w-4 h-4 text-green-500 -rotate-90" />
                                            </div>
                                            <div>
                                                <p className="text-gray-800 font-medium text-sm">Client Payment</p>
                                                <p className="text-gray-500 text-xs">Yesterday, 3:15 PM</p>
                                            </div>
                                        </div>
                                        <span className="text-green-600 font-semibold">+$1,250.00</span>
                                    </div>
                                    <div className="p-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                                <ArrowUpRight className="w-4 h-4 text-red-500 rotate-90" />
                                            </div>
                                            <div>
                                                <p className="text-gray-800 font-medium text-sm">Monthly Subscription</p>
                                                <p className="text-gray-500 text-xs">Jan 12, 2026</p>
                                            </div>
                                        </div>
                                        <span className="text-red-600 font-semibold">-$99.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Offer Carousel - Featured */}
                        <div className="lg:w-[380px] flex-shrink-0">
                            <div className="bg-white/70 backdrop-blur-lg rounded-3xl border border-white/50 shadow-xl overflow-hidden">

                                {/* Offer Image */}
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <img
                                        src={currentOffer?.imageUrl}
                                        alt={currentOffer?.title}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Badge */}
                                    {currentOffer?.badge && (
                                        <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                            {currentOffer.badge}
                                        </div>
                                    )}

                                    {/* Navigation Arrows */}
                                    {offers.length > 1 && (
                                        <>
                                            <button
                                                onClick={goToPrevious}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
                                            >
                                                <ChevronLeft className="w-5 h-5 text-gray-700" />
                                            </button>
                                            <button
                                                onClick={goToNext}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
                                            >
                                                <ChevronRight className="w-5 h-5 text-gray-700" />
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Offer Content */}
                                <div className="p-5">
                                    <p className="text-cyan-600 text-sm font-semibold uppercase tracking-wide mb-1">
                                        {currentOffer?.subtitle}
                                    </p>
                                    <h3 className="text-gray-900 font-bold text-xl mb-2">
                                        {currentOffer?.title}
                                    </h3>
                                    <p className="text-gray-600 text-base leading-relaxed mb-4">
                                        {currentOffer?.description}
                                    </p>

                                    {/* Consent */}
                                    <label className="flex items-start gap-3 text-sm text-gray-600 mb-5 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={isConsentChecked}
                                            onChange={(e) => setIsConsentChecked(e.target.checked)}
                                            className="mt-1 w-5 h-5 rounded-lg border-gray-300 text-cyan-500 focus:ring-cyan-500"
                                        />
                                        <span>{consentText}</span>
                                    </label>

                                    {/* CTA - Pill Button */}
                                    <button
                                        onClick={handleOfferClick}
                                        className="w-full bg-[#FF6600] hover:bg-[#E55A00] text-gray-900 font-bold py-4 px-6 rounded-full transition-all shadow-lg hover:shadow-xl text-lg"
                                    >
                                        {currentOffer?.ctaLabel}
                                    </button>

                                    {/* Carousel Dots */}
                                    {offers.length > 1 && (
                                        <div className="flex justify-center gap-2 mt-4">
                                            {offers.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        playClick();
                                                        setCurrentOfferIndex(index);
                                                    }}
                                                    className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentOfferIndex
                                                        ? "bg-[#FF6600] w-6"
                                                        : "bg-gray-400 hover:bg-gray-500"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Integration Badge */}
                            <div className="mt-4 text-center">
                                <span className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    Powered by Fiserv One API
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Messages - Frosted Glass Cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { title: "Seamless Integration", desc: "One API embeds into your existing portal" },
                    { title: "Native Experience", desc: "Adopts your bank's style automatically" },
                    { title: "Contextually Aware", desc: "Right offer, right place, right time" },
                ].map((msg, idx) => (
                    <div
                        key={idx}
                        className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/25 transition-all"
                    >
                        <h4 className="text-white font-semibold text-lg mb-1">{msg.title}</h4>
                        <p className="text-white/70 text-sm">{msg.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BankPortalMockup;
