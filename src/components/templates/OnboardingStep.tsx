import React, { useState, useCallback } from "react";
import { sendToTele } from "@/utils/teleInteraction";
import { useSound } from "@/hooks/useSound";
import { Check, ChevronUp, ChevronDown, Plus, Minus, Building2, ArrowLeft, ArrowRight } from "lucide-react";
import { getDeviceIcon, getCategoryIcon, Confetti, AnimatedCheckmark, PaymentCardIcon } from "./OnboardingStepComponents";

interface CategoryOption {
    id: string;
    label: string;
    icon: string;
    selected?: boolean;
    actionPhrase?: string;
}

interface PlanOption {
    id: string;
    tier: string;
    title: string;
    price: string;
    description: string;
    features?: string[];
    recommended?: boolean;
    actionPhrase?: string;
}

interface DeviceOption {
    id: string;
    name: string;
    title: string;
    subtitle: string;
    price: string;
    imageUrl?: string;
    features?: string[];
}

interface FormFieldOption {
    id: string;
    label: string;
    subtitle?: string;
}

interface FormField {
    id: string;
    type: "radio" | "text" | "textarea" | "select";
    label: string;
    subtitle?: string;
    placeholder?: string;
    options?: FormFieldOption[];
    defaultValue?: string;
}

interface FormSection {
    id: string;
    title: string;
    subtitle?: string;
    fields: FormField[];
}

interface ReviewItem {
    label: string;
    value: string;
}

interface ReviewSection {
    id: string;
    title: string;
    items: ReviewItem[];
}

interface ProgressStep {
    id: string;
    label: string;
    status: "completed" | "current" | "upcoming";
}

interface OnboardingStepProps {
    stepNumber: number;
    totalSteps?: number;
    title: string;
    subtitle?: string;
    categories?: CategoryOption[];
    allowMultiple?: boolean;
    plans?: PlanOption[];
    devices?: DeviceOption[];
    formSections?: FormSection[];
    reviewSections?: ReviewSection[];
    progressSteps?: ProgressStep[];
    showBackButton?: boolean;
    bankName?: string;
    userName?: string;
    activeTab?: string;
    ctaLabel?: string;
    backLabel?: string;
    ctaActionPhrase?: string;
    backActionPhrase?: string;
    showPrivacyLink?: boolean;
    animationClass?: string;
    isExiting?: boolean;
    isCelebration?: boolean;
    celebrationMessage?: string;
    celebrationDetails?: string[];
}

/**
 * OnboardingStep Template - Glassmorphism Redesign
 * 
 * White frosted glass with pill-shaped buttons.
 * Mobile-first responsive design.
 */
export const OnboardingStep: React.FC<OnboardingStepProps> = ({
    stepNumber,
    totalSteps = 10,
    title,
    subtitle,
    categories = [],
    allowMultiple = true,
    plans = [],
    devices = [],
    formSections = [],
    reviewSections = [],
    progressSteps = [],
    showBackButton = true,
    bankName = "Modern Bank Co",
    userName = "John",
    ctaLabel = "Continue",
    backLabel = "Back",
    ctaActionPhrase,
    backActionPhrase,
    showPrivacyLink = true,
    animationClass = "",
    isExiting = false,
    isCelebration = false,
    celebrationMessage,
    celebrationDetails = [],
}) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
    const [deviceQuantities, setDeviceQuantities] = useState<Record<string, number>>({});
    const [expandedDevice, setExpandedDevice] = useState<string | null>(null);
    const [formValues, setFormValues] = useState<Record<string, string>>({});
    const { playClick } = useSound();

    const toggleCategory = useCallback((categoryId: string) => {
        playClick();
        setSelectedCategories(prev => {
            if (prev.includes(categoryId)) return prev.filter(id => id !== categoryId);
            if (allowMultiple) return [...prev, categoryId];
            return [categoryId];
        });
    }, [allowMultiple, playClick]);

    const handlePlanSelect = useCallback((planId: string, actionPhrase?: string) => {
        playClick();
        setSelectedPlan(planId);
        if (actionPhrase) sendToTele(actionPhrase);
        else if (ctaActionPhrase) sendToTele(ctaActionPhrase);
    }, [playClick, ctaActionPhrase]);

    const togglePlanDetails = useCallback((planId: string) => {
        playClick();
        setExpandedPlan(prev => prev === planId ? null : planId);
    }, [playClick]);

    const updateDeviceQuantity = useCallback((deviceId: string, delta: number) => {
        playClick();
        setDeviceQuantities(prev => {
            const newQty = Math.max(0, (prev[deviceId] || 0) + delta);
            return { ...prev, [deviceId]: newQty };
        });
    }, [playClick]);

    const toggleDeviceDetails = useCallback((deviceId: string) => {
        playClick();
        setExpandedDevice(prev => prev === deviceId ? null : deviceId);
    }, [playClick]);

    const handleFormChange = useCallback((fieldId: string, value: string) => {
        setFormValues(prev => ({ ...prev, [fieldId]: value }));
    }, []);

    const handleContinue = useCallback(() => {
        playClick();
        // Navigate to next step or return to bank portal after completion
        if (stepNumber >= totalSteps) {
            // After step 10 (celebration), return to bank portal
            sendToTele("Show me the bank portal");
        } else {
            const nextStep = stepNumber + 1;
            sendToTele(`Show me step ${nextStep}`);
        }
    }, [stepNumber, totalSteps, playClick]);

    const handleBack = useCallback(() => {
        playClick();
        // Navigate to previous step
        const prevStep = stepNumber - 1;
        if (prevStep >= 1) {
            sendToTele(`Show me step ${prevStep}`);
        } else if (backActionPhrase) {
            sendToTele(backActionPhrase);
        }
    }, [stepNumber, backActionPhrase, playClick]);

    const progress = (stepNumber / totalSteps) * 100;
    const totalDevices = Object.values(deviceQuantities).reduce((sum, qty) => sum + qty, 0);
    const totalDevicePrice = devices.reduce((sum, d) => sum + (deviceQuantities[d.id] || 0) * (parseFloat(d.price.replace(/[$,]/g, "")) || 0), 0);

    const hasFormContent = formSections.length > 0;
    const canContinue = (categories.length === 0 && plans.length === 0 && devices.length === 0 && !hasFormContent) ||
        (categories.length > 0 && selectedCategories.length > 0) ||
        (plans.length > 0) ||
        (devices.length > 0 && totalDevices > 0) ||
        hasFormContent;

    return (
        <div className={`w-full ${animationClass} ${isExiting ? "opacity-50" : ""}`}>
            {/* Main Glassmorphism Container */}
            <div className="bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="bg-white/40 backdrop-blur-md px-4 sm:px-6 py-4 border-b border-white/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-gray-800 font-semibold text-base sm:text-lg">{bankName}</p>
                                <p className="text-gray-600 text-sm">Merchant Application</p>
                            </div>
                        </div>

                        {/* Step Progress Pills */}
                        {!isCelebration && (
                            <div className="hidden sm:flex items-center gap-2">
                                <span className="bg-cyan-500/20 text-cyan-700 font-semibold px-4 py-2 rounded-full text-sm">
                                    Step {stepNumber} of {totalSteps}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Progress Bar */}
                {!isCelebration && (
                    <div className="bg-white/30 h-2">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}

                {/* Progress Steps */}
                {progressSteps.length > 0 && (
                    <div className="bg-white/30 backdrop-blur-sm px-4 sm:px-8 py-4 border-b border-white/20 overflow-x-auto">
                        <div className="flex items-center justify-between min-w-max gap-4">
                            {progressSteps.map((step, idx) => (
                                <div key={step.id} className="flex items-center">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step.status === "completed" ? "bg-cyan-500 text-white" :
                                            step.status === "current" ? "bg-cyan-500 text-white ring-4 ring-cyan-200" :
                                                "bg-white/50 text-gray-500"
                                            }`}>
                                            {step.status === "completed" ? <Check className="w-4 h-4" /> : idx + 1}
                                        </div>
                                        <span className={`text-sm whitespace-nowrap ${step.status === "current" ? "text-gray-800 font-semibold" : "text-gray-600"
                                            }`}>
                                            {step.label}
                                        </span>
                                    </div>
                                    {idx < progressSteps.length - 1 && (
                                        <div className="w-8 sm:w-12 h-0.5 bg-white/40 mx-2" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="p-4 sm:p-6 lg:p-8 min-h-[400px]">

                    {/* Celebration Mode */}
                    {isCelebration ? (
                        <div className="w-full relative py-4">
                            <Confetti />

                            {/* Header - Full Width */}
                            <div className="text-center mb-8">
                                <AnimatedCheckmark />
                                <h1 className="text-3xl sm:text-4xl font-bold text-white mt-6 mb-3">{title}</h1>
                                {celebrationMessage && (
                                    <p className="text-white/70 text-lg max-w-xl mx-auto">{celebrationMessage}</p>
                                )}
                            </div>

                            {/* 3-Column Layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                                {/* Left - What's Included */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <Check className="w-5 h-5 text-[#FF6600]" />
                                        What's Included
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-[#FF6600]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-3 h-3 text-[#FF6600]" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">Your Clover Device</p>
                                                <p className="text-white/50 text-sm">Ships in 1-5 business days</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-[#FF6600]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-3 h-3 text-[#FF6600]" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">Merchant Account</p>
                                                <p className="text-white/50 text-sm">Payment processing activated</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-[#FF6600]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-3 h-3 text-[#FF6600]" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">24/7 Support</p>
                                                <p className="text-white/50 text-sm">Dedicated merchant assistance</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Center - Order Confirmation */}
                                <div className="bg-gradient-to-br from-[#FF6600]/20 to-[#FF6600]/5 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#FF6600]/40">
                                    <h3 className="text-lg font-bold text-white mb-4">Order Confirmation</h3>
                                    {celebrationDetails.length > 0 ? (
                                        <div className="space-y-3">
                                            {celebrationDetails.map((detail, idx) => (
                                                <div key={idx} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                                                    <Check className="w-5 h-5 text-[#FF6600] mt-0.5 flex-shrink-0" />
                                                    <span className="text-white">{detail}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                                <Check className="w-5 h-5 text-[#FF6600]" />
                                                <span className="text-white">Application approved</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                                <Check className="w-5 h-5 text-[#FF6600]" />
                                                <span className="text-white">Account created</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                                <Check className="w-5 h-5 text-[#FF6600]" />
                                                <span className="text-white">Device shipping soon</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right - Next Steps */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <ArrowRight className="w-5 h-5 text-[#FF6600]" />
                                        What's Next
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-[#FF6600] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">1</div>
                                            <div>
                                                <p className="text-white font-medium">Check Your Email</p>
                                                <p className="text-white/50 text-sm">Confirmation & tracking sent</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-[#FF6600]/60 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">2</div>
                                            <div>
                                                <p className="text-white font-medium">Receive Device</p>
                                                <p className="text-white/50 text-sm">Via FedEx in 1-5 days</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-[#FF6600]/30 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">3</div>
                                            <div>
                                                <p className="text-white font-medium">Start Accepting</p>
                                                <p className="text-white/50 text-sm">Plug in and go live</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="flex justify-center">
                                <button
                                    onClick={handleContinue}
                                    className="bg-[#FF6600] hover:bg-[#E55A00] text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl text-lg inline-flex items-center gap-2"
                                >
                                    {ctaLabel}
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={`mx-auto ${hasFormContent ? "max-w-3xl" : "max-w-5xl"}`}>
                            {/* Title Section */}
                            <div className="text-center mb-8">
                                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h1>
                                {subtitle && <p className="text-white/80 text-lg">{subtitle}</p>}
                            </div>

                            {/* Form Sections */}
                            {formSections.map((section) => (
                                <div key={section.id} className="mb-8 text-left">
                                    <h2 className="text-xl font-semibold text-white mb-1">{section.title}</h2>
                                    {section.subtitle && <p className="text-white/70 mb-4">{section.subtitle}</p>}

                                    <div className="space-y-4">
                                        {section.fields.map((field) => (
                                            <div key={field.id}>
                                                {field.type === "radio" && field.options && (
                                                    <div className="space-y-3">
                                                        {field.options.map((opt) => (
                                                            <label
                                                                key={opt.id}
                                                                className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all bg-white/50 backdrop-blur-sm hover:bg-white/70 ${formValues[field.id] === opt.id
                                                                    ? "border-cyan-500 bg-white/70"
                                                                    : "border-white/40"
                                                                    }`}
                                                                onClick={() => { playClick(); handleFormChange(field.id, opt.id); }}
                                                            >
                                                                <div className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${formValues[field.id] === opt.id ? "border-cyan-500 bg-cyan-500" : "border-gray-300"
                                                                    }`}>
                                                                    {formValues[field.id] === opt.id && (
                                                                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <p className="text-gray-900 font-semibold text-lg">{opt.label}</p>
                                                                    {opt.subtitle && <p className="text-gray-500">{opt.subtitle}</p>}
                                                                </div>
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}

                                                {field.type === "text" && (
                                                    <div>
                                                        <label className="block text-white font-semibold mb-2 text-lg">{field.label}</label>
                                                        <input
                                                            type="text"
                                                            placeholder={field.placeholder}
                                                            value={formValues[field.id] || field.defaultValue || ""}
                                                            onChange={(e) => handleFormChange(field.id, e.target.value)}
                                                            className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
                                                        />
                                                    </div>
                                                )}

                                                {field.type === "select" && field.options && (
                                                    <div>
                                                        <label className="block text-white font-semibold mb-2 text-lg">{field.label}</label>
                                                        <div className="relative">
                                                            <select
                                                                value={formValues[field.id] || ""}
                                                                onChange={(e) => handleFormChange(field.id, e.target.value)}
                                                                className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none text-lg"
                                                            >
                                                                <option value="">Select...</option>
                                                                {field.options.map((opt) => (
                                                                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                                                                ))}
                                                            </select>
                                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* Review Sections */}
                            {reviewSections.length > 0 && (
                                <div className="space-y-6 mb-8 text-left">
                                    {reviewSections.map((section, sectionIdx) => (
                                        <div key={section.id} className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 border border-white/40">
                                            <h2 className="text-xl font-semibold text-cyan-600 mb-4">
                                                {sectionIdx + 1}. {section.title}
                                            </h2>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {section.items.map((item, itemIdx) => (
                                                    <div key={itemIdx} className="flex justify-between py-2">
                                                        <span className="text-gray-500">{item.label}</span>
                                                        <span className="font-semibold text-gray-900">{item.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Category Selection */}
                            {categories.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                    {categories.map((cat) => {
                                        const isSelected = selectedCategories.includes(cat.id);
                                        return (
                                            <button
                                                key={cat.id}
                                                onClick={() => toggleCategory(cat.id)}
                                                className={`relative bg-white/60 backdrop-blur-sm border-2 rounded-2xl p-6 transition-all hover:bg-white/80 hover:shadow-lg ${isSelected ? "border-cyan-500 bg-white/80 shadow-lg" : "border-white/40"
                                                    }`}
                                            >
                                                <div className={`absolute top-3 right-3 w-6 h-6 rounded-lg flex items-center justify-center ${isSelected ? "bg-cyan-500" : "border-2 border-gray-300"
                                                    }`}>
                                                    {isSelected && <Check className="w-4 h-4 text-white" />}
                                                </div>
                                                <div className="text-gray-600 mb-3 flex justify-center">
                                                    {getCategoryIcon(cat.icon)}
                                                </div>
                                                <span className="text-gray-900 font-semibold text-lg">{cat.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Plan Selection */}
                            {plans.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                    {plans.map((plan) => {
                                        const isExpanded = expandedPlan === plan.id;
                                        return (
                                            <div
                                                key={plan.id}
                                                className={`relative bg-white/70 backdrop-blur-lg border-2 rounded-3xl overflow-hidden transition-all hover:shadow-xl flex flex-col ${selectedPlan === plan.id ? "border-cyan-500 shadow-xl" : "border-white/40"
                                                    }`}
                                            >
                                                {plan.recommended && (
                                                    <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl">
                                                        RECOMMENDED
                                                    </div>
                                                )}
                                                <div className="pt-8 pb-2 flex justify-center">
                                                    <PaymentCardIcon />
                                                </div>
                                                <div className="px-6 pb-6 flex flex-col flex-grow">
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{plan.tier}</p>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.title}</h3>
                                                    <p className="text-3xl font-bold text-gray-900 mb-2">{plan.price}</p>
                                                    <p className="text-gray-500 mb-4 flex-grow">{plan.description}</p>

                                                    {plan.features && plan.features.length > 0 && (
                                                        <>
                                                            <button
                                                                onClick={() => togglePlanDetails(plan.id)}
                                                                className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-4"
                                                            >
                                                                Details {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                            </button>
                                                            {isExpanded && (
                                                                <ul className="text-left text-gray-600 space-y-2 mb-4 border-t border-white/40 pt-4">
                                                                    {plan.features.map((f, i) => (
                                                                        <li key={i} className="flex items-start gap-2">
                                                                            <Check className="w-5 h-5 text-cyan-500 mt-0.5" />{f}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </>
                                                    )}

                                                    <button
                                                        onClick={() => handlePlanSelect(plan.id, plan.actionPhrase)}
                                                        className={`w-full py-4 rounded-full font-bold text-lg transition-all ${selectedPlan === plan.id
                                                            ? "bg-[#FF6600] text-gray-900 shadow-lg"
                                                            : "border-2 border-[#FF6600] text-[#FF6600] hover:bg-orange-50"
                                                            }`}
                                                    >
                                                        Select Plan
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Device Selection */}
                            {devices.length > 0 && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                        {devices.map((device) => {
                                            const qty = deviceQuantities[device.id] || 0;
                                            const isExpanded = expandedDevice === device.id;
                                            return (
                                                <div
                                                    key={device.id}
                                                    className={`bg-white/70 backdrop-blur-lg border-2 rounded-3xl overflow-hidden transition-all hover:shadow-xl ${qty > 0 ? "border-cyan-500 shadow-xl" : "border-white/40"
                                                        }`}
                                                >
                                                    <div className="h-40 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white overflow-hidden">
                                                        {device.imageUrl ? (
                                                            <img src={device.imageUrl} alt={device.name} className="w-full h-full object-contain p-4" />
                                                        ) : getDeviceIcon(device.name)}
                                                    </div>
                                                    <div className="px-5 pb-5">
                                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{device.name}</p>
                                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{device.title}</h3>
                                                        <p className="text-gray-500 text-sm mb-2">{device.subtitle}</p>
                                                        <p className="text-2xl font-bold text-gray-900 mb-4">{device.price}</p>

                                                        {device.features && device.features.length > 0 && (
                                                            <>
                                                                <button
                                                                    onClick={() => toggleDeviceDetails(device.id)}
                                                                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-4"
                                                                >
                                                                    Details {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                                </button>
                                                                {isExpanded && (
                                                                    <ul className="text-left text-sm text-gray-600 space-y-1.5 mb-4 border-t border-white/40 pt-3">
                                                                        {device.features.map((f, i) => (
                                                                            <li key={i} className="flex items-start gap-2">
                                                                                <Check className="w-4 h-4 text-cyan-500 mt-0.5" />{f}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                )}
                                                            </>
                                                        )}

                                                        {/* Quantity Control - Pill Style */}
                                                        <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-full overflow-hidden border border-white/40">
                                                            <button
                                                                onClick={() => updateDeviceQuantity(device.id, -1)}
                                                                disabled={qty === 0}
                                                                className={`w-14 h-12 flex items-center justify-center ${qty === 0 ? "text-gray-300" : "text-gray-600 hover:bg-white/80"
                                                                    }`}
                                                            >
                                                                <Minus className="w-5 h-5" />
                                                            </button>
                                                            <span className="text-xl font-bold text-gray-900">{qty}</span>
                                                            <button
                                                                onClick={() => updateDeviceQuantity(device.id, 1)}
                                                                className="w-14 h-12 flex items-center justify-center bg-[#FF6600] text-gray-900 hover:bg-[#E55A00]"
                                                            >
                                                                <Plus className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Order Summary */}
                                    {totalDevices > 0 && (
                                        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 mb-6 inline-flex items-center gap-8 border border-white/40 shadow-lg">
                                            <div>
                                                <p className="text-gray-500 text-sm">Devices</p>
                                                <p className="text-2xl font-bold text-gray-900">{totalDevices}</p>
                                            </div>
                                            <div className="w-px h-12 bg-gray-200" />
                                            <div>
                                                <p className="text-gray-500 text-sm">Total</p>
                                                <p className="text-2xl font-bold text-cyan-600">${totalDevicePrice.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Footer Actions */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-white/30">
                                {showPrivacyLink && (
                                    <a href="#" className="text-cyan-600 hover:underline">Privacy Policy</a>
                                )}
                                <div className="flex items-center gap-3">
                                    {showBackButton && (
                                        <button
                                            onClick={handleBack}
                                            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white/70 hover:text-white hover:bg-white/20 transition-all border border-white/20"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                            {backLabel}
                                        </button>
                                    )}
                                    <button
                                        onClick={handleContinue}
                                        disabled={!canContinue}
                                        className={`px-8 py-4 rounded-full font-bold text-lg transition-all ${!canContinue
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-[#FF6600] hover:bg-[#E55A00] text-gray-900 shadow-lg hover:shadow-xl"
                                            }`}
                                    >
                                        {ctaLabel}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Step Indicator - Mobile */}
            <div className="mt-4 text-center sm:hidden">
                <span className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
                    Step {stepNumber} of {totalSteps}
                </span>
            </div>
        </div>
    );
};

export default OnboardingStep;
