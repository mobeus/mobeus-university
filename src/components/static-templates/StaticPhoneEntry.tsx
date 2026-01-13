/**
 * StaticPhoneEntry
 * Step 3a: Phone number entry with country code
 */

import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, ArrowLeft, Shield, Clock, Lock, Info } from 'lucide-react';
import { StaticTemplateProps } from '@/types/onboarding';

const COUNTRY_CODES = [
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+974', country: 'Qatar', flag: '🇶🇦' },
    { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
    { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
    { code: '+968', country: 'Oman', flag: '🇴🇲' },
    { code: '+1', country: 'USA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
];

export const StaticPhoneEntry: React.FC<StaticTemplateProps> = ({
    onNext,
    onBack,
    onSkip,
    userData,
    setUserData
}) => {
    const [countryCode, setCountryCode] = useState(userData.countryCode || '+966');
    const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber || '');
    const [isValid, setIsValid] = useState(false);

    // Validate pre-populated data on mount
    useEffect(() => {
        if (phoneNumber.length >= 9) {
            setIsValid(true);
        }
    }, []);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 15);
        setPhoneNumber(value);
        setIsValid(value.length >= 9);
    };

    const handleSubmit = () => {
        if (isValid) {
            setUserData({ countryCode, phoneNumber });
            onNext();
        }
    };

    return (
        <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20">
                <Phone size={14} className="text-primary" />
                <span className="text-sm font-medium text-white">Phone Verification</span>
            </div>

            {/* Title */}
            <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Enter Your Phone Number
                </h1>
                <p className="text-white/60">
                    We'll send you a verification code to confirm your phone number. This helps secure your account.
                </p>
            </div>

            {/* Form Card */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <label className="block">
                    <span className="text-sm font-medium text-white/80 mb-2 block">Mobile Number</span>
                    <div className="flex gap-2">
                        {/* Country Code Dropdown */}
                        <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="px-3 py-3 bg-white/5 border border-white/20 rounded-xl text-white
                focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all
                appearance-none cursor-pointer min-w-[100px]"
                        >
                            {COUNTRY_CODES.map((cc) => (
                                <option key={cc.code} value={cc.code} className="bg-gray-900">
                                    {cc.flag} {cc.code}
                                </option>
                            ))}
                        </select>

                        {/* Phone Input */}
                        <div className="relative flex-1">
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={handlePhoneChange}
                                placeholder="50 123 4567"
                                className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40
                  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
                                <Phone size={18} />
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-white/40 mt-2">
                        Enter your 9-digit mobile number without the country code
                    </p>
                </label>
            </div>

            {/* Info Box */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-medium text-white/80">Why we need your phone number</p>
                    <p className="text-sm text-white/60 mt-1">
                        Your phone number is used for account security and important updates about your applications.
                        We'll send you a one-time code to verify it's really you.
                    </p>
                </div>
            </div>

            {/* Primary CTA */}
            <button
                onClick={handleSubmit}
                disabled={!isValid}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-black font-semibold rounded-xl
          hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
          disabled:hover:bg-primary"
            >
                Send Verification Code
                <ArrowRight size={18} />
            </button>

            {/* Back Link */}
            {onBack && (
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/50 hover:text-white/70 transition-colors mx-auto"
                >
                    <ArrowLeft size={16} />
                    Back to ID Verification
                </button>
            )}

            {/* Skip Link */}
            {onSkip && (
                <button
                    onClick={onSkip}
                    className="block text-xs text-white/30 hover:text-white/50 transition-colors mx-auto mt-4"
                >
                    Skip for now
                </button>
            )}

            {/* Footer Trust Badges */}
            <div className="flex items-center justify-center gap-6 pt-4 text-xs text-white/40">
                <div className="flex items-center gap-1.5">
                    <Shield size={12} />
                    <span>Bank-Level Security</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock size={12} />
                    <span>1 Minute</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Lock size={12} />
                    <span>Encrypted</span>
                </div>
            </div>
        </div>
    );
};

export default StaticPhoneEntry;
