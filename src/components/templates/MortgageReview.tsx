import React, { useState, useEffect } from "react";
import { DollarSign, Home, Calculator, Info, TrendingUp, TrendingDown } from "lucide-react";

interface MortgageReviewProps {
    // Property Details
    propertyAddress: string;
    purchasePrice: number;
    propertyType?: "rental" | "flip";
    propertyImage?: string;

    // Financial Details (for rental)
    expectedMonthlyRent?: number;
    annualPropertyTaxes: number;
    annualInsurance: number;

    // Mortgage Parameters
    defaultDownPayment?: number;
    defaultInterestRate?: number; // APR (e.g., 5.5)
    defaultTerm?: number; // in years (e.g., 30)

    // Animation
    animationClass?: string;
    isExiting?: boolean;
}

export const MortgageReview: React.FC<MortgageReviewProps> = ({
    propertyAddress,
    purchasePrice,
    propertyType = "rental",
    propertyImage,
    expectedMonthlyRent,
    annualPropertyTaxes,
    annualInsurance,
    defaultDownPayment,
    defaultInterestRate,
    defaultTerm,
    animationClass = "",
    isExiting = false,
}) => {
    // Initialize state from props
    const [state, setState] = useState({
        propertyAddress,
        purchasePrice,
        propertyType,
        annualPropertyTaxes,
        annualInsurance,
        expectedMonthlyRent,
        defaultDownPayment,
        defaultInterestRate,
        defaultTerm,
    });

    // Sync state with props when they change
    useEffect(() => {
        setState({
            propertyAddress,
            purchasePrice,
            propertyType,
            annualPropertyTaxes,
            annualInsurance,
            expectedMonthlyRent,
            defaultDownPayment,
            defaultInterestRate,
            defaultTerm,
        });
    }, [
        propertyAddress,
        purchasePrice,
        propertyType,
        annualPropertyTaxes,
        annualInsurance,
        expectedMonthlyRent,
        defaultDownPayment,
        defaultInterestRate,
        defaultTerm,
    ]);

    // Expose global update function for tele interaction
    useEffect(() => {
        (window as any).updateMortgageReview = (newData: Partial<MortgageReviewProps>) => {
            console.log("Updating MortgageReview with:", newData);
            setState((prev) => ({
                ...prev,
                ...newData,
            }));
        };

        return () => {
            delete (window as any).updateMortgageReview;
        };
    }, []);

    // Local state for interactive controls
    const initialDownPayment = state.defaultDownPayment || state.purchasePrice * 0.1;
    const initialRate = state.defaultInterestRate || 5.5;
    const initialTerm = state.defaultTerm || 30;

    const [downPayment, setDownPayment] = useState(initialDownPayment);
    const [interestRate, setInterestRate] = useState(initialRate);
    const [term, setTerm] = useState(initialTerm);

    // Sync local state when global state updates (from tele)
    useEffect(() => {
        if (state.defaultDownPayment !== undefined) setDownPayment(state.defaultDownPayment);
        if (state.defaultInterestRate !== undefined) setInterestRate(state.defaultInterestRate);
        if (state.defaultTerm !== undefined) setTerm(state.defaultTerm);
    }, [state.defaultDownPayment, state.defaultInterestRate, state.defaultTerm]);

    // Calculated values
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [cashFlow, setCashFlow] = useState(0);

    // Mortgage calculation
    useEffect(() => {
        const loanAmount = state.purchasePrice - downPayment;
        const monthlyRate = interestRate / 100 / 12;
        const numPayments = term * 12;

        // Standard mortgage formula
        let principalAndInterest = 0;
        if (monthlyRate === 0) {
            principalAndInterest = loanAmount / numPayments;
        } else {
            principalAndInterest =
                (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
                (Math.pow(1 + monthlyRate, numPayments) - 1);
        }

        // Monthly taxes and insurance
        const monthlyTaxes = state.annualPropertyTaxes / 12;
        const monthlyIns = state.annualInsurance / 12;

        // Total monthly payment
        const total = principalAndInterest + monthlyTaxes + monthlyIns;

        // Total interest over life of loan
        const totalPaid = principalAndInterest * numPayments;
        const interest = totalPaid - loanAmount;

        setMonthlyPayment(principalAndInterest);
        setTotalPayment(total);
        setTotalInterest(interest);

        // Cash flow for rental properties
        if (state.propertyType === "rental" && state.expectedMonthlyRent) {
            setCashFlow(state.expectedMonthlyRent - total);
        }
    }, [
        state.purchasePrice,
        downPayment,
        interestRate,
        term,
        state.annualPropertyTaxes,
        state.annualInsurance,
        state.propertyType,
        state.expectedMonthlyRent,
    ]);

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

    const downPaymentPercent = ((downPayment / state.purchasePrice) * 100).toFixed(1);

    return (
        <div className={`w-full grid grid-cols-1 lg:grid-cols-3 gap-8 ${animationClass} ${isExiting ? "animate-fade-out" : ""}`}>
            {/* 1/3 Left: Controls Panel */}
            <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-6 flex flex-col h-full">
                <div className="flex items-center gap-3 text-blue-400 mb-2">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Calculator size={24} />
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase opacity-80">Mortgage Calculator</span>
                </div>

                {/* Controls */}
                <div className="space-y-6 flex-1">
                    {/* Down Payment Slider */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-white/60">Down Payment</span>
                            <span className="text-white font-mono">
                                {formatCurrency(downPayment)} ({downPaymentPercent}%)
                            </span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={state.purchasePrice * 0.5}
                            step={1000}
                            value={downPayment}
                            onChange={(e) => setDownPayment(Number(e.target.value))}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>

                    {/* Interest Rate Selector */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-white/60">Interest Rate (APR)</span>
                            <span className="text-white font-mono">{interestRate.toFixed(2)}%</span>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                            {[3.5, 4.5, 5.5, 6.5, 7.5].map((rate) => (
                                <button
                                    key={rate}
                                    onClick={() => setInterestRate(rate)}
                                    className={`py-1 rounded text-xs border ${interestRate === rate
                                            ? "border-blue-500 text-blue-400 bg-blue-500/10"
                                            : "border-white/10 text-white/40 hover:border-white/30"
                                        }`}
                                >
                                    {rate}%
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Loan Term Selector */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-white/60">Loan Term</span>
                            <span className="text-white font-mono">{term} years</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {[15, 20, 25, 30].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTerm(t)}
                                    className={`py-1 rounded text-xs border ${term === t
                                            ? "border-blue-500 text-blue-400 bg-blue-500/10"
                                            : "border-white/10 text-white/40 hover:border-white/30"
                                        }`}
                                >
                                    {t}y
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Rate Info */}
                    <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-start gap-2">
                        <Info size={14} className="text-white/40 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-[10px] text-white/40 uppercase tracking-wide">Estimate Disclaimer</p>
                            <p className="text-xs text-white/60">Non-binding, valid 30 days. Rates based on excellent credit.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2/3 Right: Visualization & Big Numbers */}
            <div className="lg:col-span-2 flex flex-col space-y-4">
                {/* Property Card */}
                <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Home size={20} className="text-blue-400" />
                            <span className="text-xs text-blue-400 font-bold uppercase tracking-wide">
                                {state.propertyType === "rental" ? "Rental Property" : "Flip Property"}
                            </span>
                        </div>
                        <h3 className="text-2xl font-light text-white mb-1">{state.propertyAddress}</h3>
                        <p className="text-white/50 text-sm">Purchase Price: {formatCurrency(state.purchasePrice)}</p>
                    </div>
                </div>

                {/* Payment Display */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    {/* Monthly Payment Hero */}
                    <div className="bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <DollarSign size={100} />
                        </div>
                        <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Total Monthly Payment</span>
                        <div className="text-5xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-lg">
                            <span className="text-2xl align-top opacity-50">$</span>
                            {Math.round(totalPayment).toLocaleString()}
                        </div>
                        <span className="text-white/40 text-sm mt-2">/ month</span>
                    </div>

                    {/* Breakdown */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-sm text-white/60">Principal & Interest</span>
                                <span className="text-sm font-mono text-white">{formatCurrency(monthlyPayment)}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-sm text-white/60">Property Taxes</span>
                                <span className="text-sm font-mono text-white">{formatCurrency(state.annualPropertyTaxes / 12)}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-sm text-white/60">Insurance</span>
                                <span className="text-sm font-mono text-white">{formatCurrency(state.annualInsurance / 12)}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/10">
                                <span className="text-sm text-white font-semibold">Total Monthly</span>
                                <span className="text-sm font-mono text-white font-bold">{formatCurrency(totalPayment)}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-white/60">Total Interest ({term}y)</span>
                                <span className="text-sm font-mono text-white/60">{formatCurrency(totalInterest)}</span>
                            </div>

                            {/* Cash Flow for Rental Properties */}
                            {state.propertyType === "rental" && state.expectedMonthlyRent && (
                                <div className={`flex justify-between items-center py-2 px-3 rounded-lg ${cashFlow >= 0 ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-amber-500/10 border border-amber-500/20"
                                    }`}>
                                    <div className="flex items-center gap-2">
                                        {cashFlow >= 0 ? <TrendingUp size={16} className="text-emerald-400" /> : <TrendingDown size={16} className="text-amber-400" />}
                                        <span className={`text-sm font-semibold ${cashFlow >= 0 ? "text-emerald-400" : "text-amber-400"}`}>
                                            Monthly Cash Flow
                                        </span>
                                    </div>
                                    <span className={`text-sm font-mono font-bold ${cashFlow >= 0 ? "text-emerald-400" : "text-amber-400"}`}>
                                        {cashFlow >= 0 ? "+" : ""}{formatCurrency(cashFlow)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
