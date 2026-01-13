/**
 * StaticHomePage
 * Full landing page for onboarding - includes hero, stats, journey, testimonials, transparency, and CTA
 */

import React from 'react';
import { ArrowRight, Play, CheckCircle, Users, Briefcase, Award, TrendingUp, Shield, FileCheck, Heart, Building2, GraduationCap, Target, UserCheck, Sparkles } from 'lucide-react';
import { StaticTemplateProps } from '@/types/onboarding';

export const StaticHomePage: React.FC<StaticTemplateProps> = ({ onNext, onSkip }) => {
    return (
        <div className="w-full">
            {/* ========================================
                SECTION 1: HERO
                ======================================== */}
            <div className="min-h-[calc(100vh-200px)] flex flex-col lg:flex-row items-center gap-8 lg:gap-16 pb-16">
                {/* Left Side - Hero Content */}
                <div className="flex-1 space-y-6">
                    {/* Credibility Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
                        <Award size={16} className="text-primary" />
                        <span className="text-sm font-medium text-primary">Backed by PIF</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                        Your Skills.<br />
                        Your Future.<br />
                        Your First Tech Career.
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-white/70 max-w-lg">
                        Join Saudi Arabia's premier talent platform connecting graduates with leading tech employers.
                        Build your skills, prove your readiness, and start your career journey with confidence.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-4 pt-4">
                        <button
                            onClick={onNext}
                            className="group flex items-center gap-2 px-6 py-3 bg-primary text-black font-semibold rounded-xl
              hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                        >
                            Start Your Journey
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-xl
              border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-default"
                        >
                            <Play size={16} />
                            Watch How It Works
                        </button>
                    </div>
                </div>

                {/* Right Side - Journey Preview Card */}
                <div className="w-full lg:w-96 backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6 space-y-6">
                    {/* Card Header */}
                    <div className="text-center space-y-2">
                        <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                            <TrendingUp size={24} className="text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold text-white">Your Journey Starts Here</h2>
                        <p className="text-sm text-white/50">Complete your path to employment</p>
                    </div>

                    {/* Journey Steps Preview */}
                    <div className="space-y-4">
                        {/* Skills Assessment */}
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-secondary/20 rounded-lg">
                                        <CheckCircle size={16} className="text-secondary" />
                                    </div>
                                    <span className="font-medium text-white">Skills Assessment</span>
                                </div>
                                <CheckCircle size={18} className="text-secondary" />
                            </div>
                            <p className="text-xs text-white/50 ml-11">Completed • 3-5 hours</p>
                        </div>

                        {/* Skills Twin Profile */}
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/20 rounded-lg">
                                        <Users size={16} className="text-primary" />
                                    </div>
                                    <span className="font-medium text-white">Skills Twin Profile</span>
                                </div>
                                <CheckCircle size={18} className="text-secondary" />
                            </div>
                            <div className="flex items-center justify-between ml-11">
                                <div>
                                    <p className="text-xs text-white/50">Competency Score</p>
                                    <p className="text-2xl font-bold text-white">92/100</p>
                                </div>
                                <span className="px-2 py-1 text-xs font-medium bg-primary text-black rounded-full">
                                    Tier 1
                                </span>
                            </div>
                        </div>

                        {/* Job Opportunities */}
                        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/20 rounded-lg">
                                        <Briefcase size={16} className="text-primary" />
                                    </div>
                                    <span className="font-medium text-white">Job Opportunities</span>
                                </div>
                                <span className="w-6 h-6 flex items-center justify-center bg-secondary text-black text-xs font-bold rounded-full">
                                    3
                                </span>
                            </div>
                            <p className="text-sm text-white/70 ml-11">
                                Leading employers are ready to interview qualified candidates
                            </p>
                            <div className="flex items-center gap-4 mt-3 ml-11 text-xs text-white/50">
                                <span>⏱️ Avg. 30 days to offer</span>
                                <span>📈 94% success rate</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========================================
                SECTION 2: TRUSTED BY LEADING ORGANIZATIONS
                ======================================== */}
            <div className="py-16 border-t border-white/10">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Trusted by Leading Organizations</h2>
                    <p className="text-white/50">Partnering with Saudi Arabia's top employers and training providers</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-xl flex items-center justify-center">
                            <Users size={24} className="text-primary" />
                        </div>
                        <div className="text-4xl font-bold text-primary mb-2">2,400+</div>
                        <div className="text-white/60">Graduates Placed</div>
                    </div>

                    <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="w-12 h-12 mx-auto mb-4 bg-secondary/20 rounded-xl flex items-center justify-center">
                            <Building2 size={24} className="text-secondary" />
                        </div>
                        <div className="text-4xl font-bold text-secondary mb-2">150+</div>
                        <div className="text-white/60">Partner Employers</div>
                    </div>

                    <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-xl flex items-center justify-center">
                            <TrendingUp size={24} className="text-primary" />
                        </div>
                        <div className="text-4xl font-bold text-primary mb-2">94%</div>
                        <div className="text-white/60">Placement Rate</div>
                    </div>
                </div>
            </div>

            {/* ========================================
                SECTION 3: YOUR JOURNEY TO YOUR FIRST TECH CAREER
                ======================================== */}
            <div className="py-16 border-t border-white/10">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Your Journey to Your First Tech Career</h2>
                    <p className="text-white/50">A simple 4-step process designed to showcase your true potential</p>
                </div>

                {/* Journey Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Step 1 */}
                    <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all">
                        <div className="absolute -top-3 left-6 w-8 h-8 bg-primary text-black font-bold rounded-full flex items-center justify-center text-sm">
                            1
                        </div>
                        <div className="pt-4">
                            <div className="w-12 h-12 mb-4 bg-primary/20 rounded-xl flex items-center justify-center">
                                <UserCheck size={24} className="text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Sign Up</h3>
                            <p className="text-sm text-white/60">
                                Create your account with basic information. Takes less than 2 minutes.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all">
                        <div className="absolute -top-3 left-6 w-8 h-8 bg-primary text-black font-bold rounded-full flex items-center justify-center text-sm">
                            2
                        </div>
                        <div className="pt-4">
                            <div className="w-12 h-12 mb-4 bg-secondary/20 rounded-xl flex items-center justify-center">
                                <GraduationCap size={24} className="text-secondary" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Complete Assessments</h3>
                            <p className="text-sm text-white/60">
                                Take our AI-powered skills assessments. Fair, unbiased, and comprehensive.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all">
                        <div className="absolute -top-3 left-6 w-8 h-8 bg-primary text-black font-bold rounded-full flex items-center justify-center text-sm">
                            3
                        </div>
                        <div className="pt-4">
                            <div className="w-12 h-12 mb-4 bg-primary/20 rounded-xl flex items-center justify-center">
                                <Sparkles size={24} className="text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Get Your Skills Twin</h3>
                            <p className="text-sm text-white/60">
                                Receive your AI-generated profile that showcases your verified capabilities.
                            </p>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all">
                        <div className="absolute -top-3 left-6 w-8 h-8 bg-primary text-black font-bold rounded-full flex items-center justify-center text-sm">
                            4
                        </div>
                        <div className="pt-4">
                            <div className="w-12 h-12 mb-4 bg-secondary/20 rounded-xl flex items-center justify-center">
                                <Target size={24} className="text-secondary" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Apply & Get Hired</h3>
                            <p className="text-sm text-white/60">
                                Get matched with employers and receive interview invitations directly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========================================
                SECTION 4: WILL THIS HELP ME GET A REAL JOB?
                ======================================== */}
            <div className="py-16 border-t border-white/10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left - FAQ Content */}
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Will This Help Me Get a Real Job?</h2>
                        <p className="text-white/70">
                            Yes. PIF Talent connects you directly with employers who are actively hiring.
                            No endless applications, no waiting in limbo.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-secondary/20 rounded-lg shrink-0">
                                    <CheckCircle size={16} className="text-secondary" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-white">Employer-Verified Skills</h4>
                                    <p className="text-sm text-white/60">
                                        Our assessments are designed with employer input, ensuring relevance.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-secondary/20 rounded-lg shrink-0">
                                    <CheckCircle size={16} className="text-secondary" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-white">Direct Employer Connections</h4>
                                    <p className="text-sm text-white/60">
                                        Employers browse verified profiles and reach out to you directly.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-secondary/20 rounded-lg shrink-0">
                                    <CheckCircle size={16} className="text-secondary" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-white">Proven Track Record</h4>
                                    <p className="text-sm text-white/60">
                                        94% of qualified candidates receive job offers within 30 days.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Testimonial Chat */}
                    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                            <span className="text-xs text-secondary font-medium">AI Career Coach</span>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white/10 rounded-2xl rounded-tl-sm p-4">
                                <p className="text-white/90 text-sm">
                                    "Based on your profile, I'm matching you with 3 employers in AI/ML roles.
                                    NEOM Academy and Aramco Digital have both viewed your Skills Twin this week!"
                                </p>
                            </div>

                            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                    <span className="text-primary font-bold text-sm">FA</span>
                                </div>
                                <div>
                                    <p className="font-medium text-white text-sm">Fatima A.</p>
                                    <p className="text-xs text-white/50">Placed at NEOM Academy • Data Analyst</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center">
                                <div>
                                    <p className="text-lg font-bold text-primary">7 days</p>
                                    <p className="text-xs text-white/50">To first interview</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-secondary">3</p>
                                    <p className="text-xs text-white/50">Offers received</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-primary">1 month</p>
                                    <p className="text-xs text-white/50">To employment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========================================
                SECTION 5: COMPLETE TRANSPARENCY
                ======================================== */}
            <div className="py-16 border-t border-white/10">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Complete Transparency. No Hidden Steps.</h2>
                    <p className="text-white/50">We believe in honest, straightforward processes</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Data Protection */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-2xl flex items-center justify-center">
                            <Shield size={32} className="text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Your Data is Protected</h3>
                        <p className="text-sm text-white/60">
                            Your information is encrypted and only shared with employers you approve.
                        </p>
                    </div>

                    {/* No Surprise Requirements */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-secondary/20 rounded-2xl flex items-center justify-center">
                            <FileCheck size={32} className="text-secondary" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">No Surprise Requirements</h3>
                        <p className="text-sm text-white/60">
                            Everything you need to know is upfront. No hidden fees, no unexpected steps.
                        </p>
                    </div>

                    {/* Always Free */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-2xl flex items-center justify-center">
                            <Heart size={32} className="text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Always Free for Candidates</h3>
                        <p className="text-sm text-white/60">
                            Our service is completely free for job seekers. Employers pay for access.
                        </p>
                    </div>
                </div>
            </div>

            {/* ========================================
                SECTION 6: READY TO START CTA
                ======================================== */}
            <div className="py-16 my-8 px-8 rounded-3xl bg-gradient-to-r from-[#1a3a3a] to-[#0d2a2a] border border-primary/20">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Start Your Tech Career?</h2>
                    <p className="text-white/70 mb-8">
                        Join thousands of graduates who've launched their careers through PIF Talent.
                        Your journey begins in under 5 minutes.
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <button
                            onClick={onNext}
                            className="group flex items-center gap-2 px-8 py-4 bg-primary text-black font-semibold rounded-xl
              hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                        >
                            Start Your Journey Now
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            className="flex items-center gap-2 px-6 py-4 bg-white/10 text-white font-medium rounded-xl
              border border-white/20 hover:bg-white/20 transition-all duration-300"
                        >
                            Quick Demo
                        </button>
                    </div>
                </div>
            </div>

            {/* ========================================
                SECTION 7: FOOTER
                ======================================== */}
            <div className="py-12 border-t border-white/10 mt-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="font-semibold text-primary mb-4">PIF Talent</h4>
                        <p className="text-sm text-white/50">
                            Connecting Saudi talent with technology careers through AI-powered matching.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">For Candidates</h4>
                        <ul className="space-y-2 text-sm text-white/50">
                            <li className="hover:text-white cursor-pointer transition-colors">How It Works</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Career Centers</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Success Stories</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Skills Guide</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">For Employers</h4>
                        <ul className="space-y-2 text-sm text-white/50">
                            <li className="hover:text-white cursor-pointer transition-colors">Find Talent</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Employer Plans</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Enterprise Features</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Contact Sales</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-white/50">
                            <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Our Mission</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-white/40">
                        © 2026 PIF Talent. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-white/40">
                        <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Cookies</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaticHomePage;
