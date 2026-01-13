/**
 * StaticLoginIDVerify
 * Step 2: Login ID / National ID verification
 */

import React, { useState, useEffect } from 'react';
import { Lock, ArrowRight, ArrowLeft, Shield, Clock } from 'lucide-react';
import { StaticTemplateProps } from '@/types/onboarding';

export const StaticLoginIDVerify: React.FC<StaticTemplateProps> = ({
    onNext,
    onBack,
    onSkip,
    userData,
    setUserData
}) => {
    const [loginId, setLoginId] = useState(userData.loginId || '');
    const [isValid, setIsValid] = useState(false);

    // Validate pre-populated data on mount
    useEffect(() => {
        if (loginId.length === 10) {
            setIsValid(true);
        }
    }, []);

    const handleLoginIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
        setLoginId(value);
        setIsValid(value.length === 10);
    };

    const handleSubmit = () => {
        if (isValid) {
            setUserData({ loginId });
            onNext();
        }
    };

    return (
        <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20">
                <Lock size={14} className="text-primary" />
                <span className="text-sm font-medium text-white">Secure Verification</span>
            </div>

            {/* Title */}
            <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Verify Your Login ID
                </h1>
                <p className="text-white/60">
                    We need to confirm your identity to create your secure account. This takes less than 2 minutes.
                </p>
            </div>

            {/* Form Card */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <label className="block">
                    <span className="text-sm font-medium text-white/80 mb-2 block">Login ID Number</span>
                    <div className="relative">
                        <input
                            type="text"
                            value={loginId}
                            onChange={handleLoginIdChange}
                            placeholder="Enter your 10-digit Login ID"
                            className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40
                focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
                            <Lock size={18} />
                        </div>
                    </div>
                    <p className="text-xs text-white/40 mt-2">
                        Your Login ID is used only for verification purposes
                    </p>
                </label>
            </div>

            {/* Info Box */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <Shield size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <p className="text-sm text-white/70">
                    This information is encrypted and never shared with employers without your consent.
                </p>
            </div>

            {/* Primary CTA */}
            <button
                onClick={handleSubmit}
                disabled={!isValid}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-black font-semibold rounded-xl
          hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
          disabled:hover:bg-primary"
            >
                Continue to Phone Verification
                <ArrowRight size={18} />
            </button>

            {/* Back Link */}
            {onBack && (
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/50 hover:text-white/70 transition-colors mx-auto"
                >
                    <ArrowLeft size={16} />
                    Back to Home
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
                    <span>2 Minutes</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Lock size={12} />
                    <span>Encrypted</span>
                </div>
            </div>
        </div>
    );
};

export default StaticLoginIDVerify;
