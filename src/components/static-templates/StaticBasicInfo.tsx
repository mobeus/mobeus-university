/**
 * StaticBasicInfo
 * Step 4: Basic information form (name, email, DOB, gender, city)
 */

import React, { useState } from 'react';
import { User, ArrowRight, ArrowLeft, Shield, Lock, Info, CheckCircle, Lightbulb } from 'lucide-react';
import { StaticTemplateProps } from '@/types/onboarding';

const CITIES = [
    'Riyadh',
    'Jeddah',
    'Mecca',
    'Medina',
    'Dammam',
    'Khobar',
    'Dhahran',
    'Taif',
    'Tabuk',
    'Buraidah',
    'Jubail',
    'Yanbu',
    'Other',
];

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
const YEARS = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - 18 - i);

export const StaticBasicInfo: React.FC<StaticTemplateProps> = ({
    onNext,
    onBack,
    onSkip,
    userData,
    setUserData
}) => {
    const [firstName, setFirstName] = useState(userData.firstName || '');
    const [lastName, setLastName] = useState(userData.lastName || '');
    const [email, setEmail] = useState(userData.email || '');
    const [day, setDay] = useState<number | undefined>(userData.dateOfBirth?.day);
    const [month, setMonth] = useState<number | undefined>(userData.dateOfBirth?.month);
    const [year, setYear] = useState<number | undefined>(userData.dateOfBirth?.year);
    const [gender, setGender] = useState<'male' | 'female' | undefined>(userData.gender);
    const [city, setCity] = useState(userData.city || '');

    const displayPhone = userData.phoneNumber
        ? `${userData.countryCode || '+966'} ${userData.phoneNumber}`
        : '';

    const isValid = firstName && lastName && email && day && month && year && gender && city;

    const handleSubmit = () => {
        if (isValid) {
            setUserData({
                firstName,
                lastName,
                email,
                dateOfBirth: { day: day!, month: month!, year: year! },
                gender,
                city
            });
            onNext();
        }
    };

    return (
        <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20">
                <User size={14} className="text-primary" />
                <span className="text-sm font-medium text-white">Basic Information</span>
            </div>

            {/* Title */}
            <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Tell Us About Yourself
                </h1>
                <p className="text-white/60">
                    Please provide your basic information to complete your profile setup.
                </p>
            </div>

            {/* Form Card */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
                {/* Name Row */}
                <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                        <span className="text-sm font-medium text-white/80 mb-2 block">
                            First Name <span className="text-red-400">*</span>
                        </span>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter your first name"
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40
                focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                        />
                    </label>

                    <label className="block">
                        <span className="text-sm font-medium text-white/80 mb-2 block">
                            Last Name <span className="text-red-400">*</span>
                        </span>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter your last name"
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40
                focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                        />
                    </label>
                </div>

                {/* Email */}
                <label className="block">
                    <span className="text-sm font-medium text-white/80 mb-2 block">
                        Email Address <span className="text-red-400">*</span>
                    </span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40
              focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                    <p className="text-xs text-white/40 mt-2">
                        We'll use this email for important notifications about your applications.
                    </p>
                </label>

                {/* Phone (Read-only if verified) */}
                {displayPhone && (
                    <div className="block">
                        <span className="text-sm font-medium text-white/80 mb-2 block">Phone Number</span>
                        <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/20 rounded-xl">
                            <CheckCircle size={16} className="text-secondary" />
                            <span className="text-white">{displayPhone}</span>
                            <span className="text-xs text-secondary ml-auto">Verified</span>
                        </div>
                    </div>
                )}

                {/* Date of Birth */}
                <div>
                    <span className="text-sm font-medium text-white/80 mb-2 block">
                        Date of Birth <span className="text-red-400">*</span>
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                        <select
                            value={day || ''}
                            onChange={(e) => setDay(Number(e.target.value))}
                            className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white
                focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                        >
                            <option value="" className="bg-gray-900 text-white/50">Day</option>
                            {DAYS.map(d => (
                                <option key={d} value={d} className="bg-gray-900">{d}</option>
                            ))}
                        </select>

                        <select
                            value={month || ''}
                            onChange={(e) => setMonth(Number(e.target.value))}
                            className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white
                focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                        >
                            <option value="" className="bg-gray-900 text-white/50">Month</option>
                            {MONTHS.map((m, i) => (
                                <option key={m} value={i + 1} className="bg-gray-900">{m}</option>
                            ))}
                        </select>

                        <select
                            value={year || ''}
                            onChange={(e) => setYear(Number(e.target.value))}
                            className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white
                focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                        >
                            <option value="" className="bg-gray-900 text-white/50">Year</option>
                            {YEARS.map(y => (
                                <option key={y} value={y} className="bg-gray-900">{y}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Gender */}
                <div>
                    <span className="text-sm font-medium text-white/80 mb-3 block">
                        Gender <span className="text-red-400">*</span>
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setGender('male')}
                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all
                ${gender === 'male'
                                    ? 'bg-primary/20 border-primary text-white'
                                    : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'}`}
                        >
                            <span>♂️</span>
                            <span>Male</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setGender('female')}
                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all
                ${gender === 'female'
                                    ? 'bg-primary/20 border-primary text-white'
                                    : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'}`}
                        >
                            <span>♀️</span>
                            <span>Female</span>
                        </button>
                    </div>
                </div>

                {/* City */}
                <label className="block">
                    <span className="text-sm font-medium text-white/80 mb-2 block">
                        City <span className="text-red-400">*</span>
                    </span>
                    <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white
              focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    >
                        <option value="" className="bg-gray-900 text-white/50">Select your city</option>
                        {CITIES.map(c => (
                            <option key={c} value={c} className="bg-gray-900">{c}</option>
                        ))}
                    </select>
                </label>
            </div>

            {/* Info Box */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <Lightbulb size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-medium text-white/80">Why We Need This Information</p>
                    <p className="text-sm text-white/60 mt-1">
                        Your basic information helps employers understand your background and helps us match you with
                        suitable opportunities in your region.
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
                Continue to Upload CV
                <ArrowRight size={18} />
            </button>

            {/* Skip - More Visible */}
            {onSkip && (
                <button
                    onClick={onSkip}
                    className="w-full py-3 text-white/50 hover:text-white/70 transition-colors text-center border border-white/10 rounded-xl hover:bg-white/5"
                >
                    Skip for now
                </button>
            )}

            {/* Back Link */}
            {onBack && (
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/50 hover:text-white/70 transition-colors mx-auto"
                >
                    <ArrowLeft size={16} />
                    Back to Phone Verification
                </button>
            )}

            {/* Footer Trust Badges */}
            <div className="flex items-center justify-center gap-6 pt-4 text-xs text-white/40">
                <div className="flex items-center gap-1.5">
                    <Lock size={12} />
                    <span>Your data is encrypted</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Shield size={12} />
                    <span>Never shared without consent</span>
                </div>
            </div>
        </div>
    );
};

export default StaticBasicInfo;
