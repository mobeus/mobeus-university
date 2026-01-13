/**
 * StaticOTPVerify
 * Step 3b: OTP verification with 6-digit code input
 */

import React, { useState, useRef, useEffect } from 'react';
import { Phone, ArrowRight, Shield, Zap, Lock, Info, Edit } from 'lucide-react';
import { StaticTemplateProps } from '@/types/onboarding';

export const StaticOTPVerify: React.FC<StaticTemplateProps> = ({
    onNext,
    onBack,
    onSkip,
    userData,
    setUserData
}) => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const displayPhone = userData.phoneNumber
        ? `${userData.countryCode || '+966'} ${userData.phoneNumber.slice(0, 2)} ${userData.phoneNumber.slice(2, 5)} ${userData.phoneNumber.slice(5)}`
        : '+966 50 123 4567';

    const isValid = otp.every(digit => digit !== '') && otp.join('').length === 6;

    // Focus first input on mount
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    // Auto-verify when all 6 digits are entered
    useEffect(() => {
        const allDigitsFilled = otp.every(digit => digit !== '') && otp.join('').length === 6;
        if (allDigitsFilled) {
            // Small delay for visual feedback before auto-submitting
            const timer = setTimeout(() => {
                setUserData({ otpCode: otp.join(''), otpVerified: true });
                onNext();
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [otp, onNext, setUserData]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Auto-advance to next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newOtp = [...otp];
        pastedData.split('').forEach((char, i) => {
            if (i < 6) newOtp[i] = char;
        });
        setOtp(newOtp);
        inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    };

    const handleSubmit = () => {
        if (isValid) {
            setUserData({ otpCode: otp.join(''), otpVerified: true });
            onNext();
        }
    };

    const handleResend = () => {
        // Mock resend - just show a toast-like feedback
        alert('Code sent!');
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
                    Enter Verification Code
                </h1>
                <p className="text-white/60">
                    We've sent a 6-digit code to <span className="text-primary font-medium">{displayPhone}</span>
                </p>
            </div>

            {/* OTP Input Card */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                <div>
                    <span className="text-sm font-medium text-white/80 mb-4 block text-center">Enter 6-Digit Code</span>

                    {/* OTP Boxes */}
                    <div className="flex justify-center gap-3" onPaste={handlePaste}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-14 text-center text-2xl font-bold bg-white/5 border border-white/20 rounded-xl text-white
                  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                            />
                        ))}
                    </div>
                </div>

                {/* Resend Link */}
                <p className="text-center text-sm text-white/50">
                    Didn't receive the code?{' '}
                    <button onClick={handleResend} className="text-primary hover:underline">
                        Resend Code
                    </button>
                </p>
            </div>

            {/* Help Box */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <Info size={18} className="text-white/50 shrink-0 mt-0.5" />
                <div className="text-sm text-white/60 space-y-1">
                    <p className="font-medium text-white/70">Didn't receive the code?</p>
                    <ul className="list-disc list-inside space-y-0.5">
                        <li>Check your SMS inbox</li>
                        <li>Ensure you have network coverage</li>
                        <li>Wait up to 2 minutes for delivery</li>
                        <li>Request a new code if needed</li>
                    </ul>
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
                Verify Phone Number
                <ArrowRight size={18} />
            </button>

            {/* Change Phone Link */}
            {onBack && (
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/50 hover:text-white/70 transition-colors mx-auto"
                >
                    <Edit size={16} />
                    Change Phone Number
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
                    <span>Secure Verification</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Zap size={12} />
                    <span>Instant Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Lock size={12} />
                    <span>Encrypted</span>
                </div>
            </div>
        </div>
    );
};

export default StaticOTPVerify;
