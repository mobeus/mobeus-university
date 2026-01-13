/**
 * StaticSkillsAssessment
 * Step 6: Skills Assessment intro page with preliminary resume insights
 * Shows after resume upload, before transition to dynamic experience
 */

import React, { useState } from 'react';
import {
    Target,
    ArrowRight,
    ArrowLeft,
    Clock,
    MessageCircle,
    Sparkles,
    Zap,
    TrendingUp,
    TrendingDown,
    CircleDot,
    CheckCircle,
    HelpCircle,
    Mail,
    Calendar,
    BookOpen,
    Shield,
} from 'lucide-react';
import { StaticTemplateProps } from '@/types/onboarding';

// Journey milestone data
const JOURNEY_MILESTONES = [
    { id: 'resume', label: 'Resume', sublabel: 'Complete', status: 'completed' },
    { id: 'skills', label: 'Skills Quiz', sublabel: 'In Progress', status: 'current' },
    { id: 'assessment', label: 'Assessment', sublabel: 'Next', status: 'upcoming' },
    { id: 'profile', label: 'Profile', sublabel: 'Pending', status: 'upcoming' },
    { id: 'match', label: 'Job Match', sublabel: 'Pending', status: 'upcoming' },
    { id: 'apply', label: 'Apply', sublabel: 'Pending', status: 'upcoming' },
];

// What makes this different points
const DIFFERENTIATORS = [
    {
        icon: MessageCircle,
        title: 'Natural Conversation',
        description: 'Talk with your AI career coach like a real career advisor. No rigid forms or multiple-choice only.',
    },
    {
        icon: Target,
        title: 'Three Core Dimensions',
        description: 'Assess skills, strengths/weaknesses, and communication abilities—all of which matter for Vision 2030 roles.',
    },
    {
        icon: Zap,
        title: 'Instant Results',
        description: 'Get your personalized Skills Twin and baseline scores in minutes, not days.',
    },
];

// Simulated preliminary skills from resume
const PRELIMINARY_SKILLS = [
    { name: 'Technical Skills', level: 75, trend: 'missing' },
    { name: 'Interview Flash', level: 45, trend: 'low' },
    { name: 'Communication Skills', level: 60, trend: 'low' },
];

// Skill gaps
const MISSING_SKILLS = ['Advanced Data Analytics', 'Cloud Computing (AWS)', 'API Development'];
const LOW_PROFICIENCY = ['Project Management', 'Expense Analysis', 'Leadership Skills'];

export const StaticSkillsAssessment: React.FC<StaticTemplateProps> = ({
    onNext,
    onBack,
    onSkip,
    onComplete,
    userData,
}) => {
    const [isHovering, setIsHovering] = useState(false);

    // Calculate preliminary score from resume (simulated)
    const preliminaryScore = 70;
    const skillsAnalyzed = 5;
    const userName = userData.firstName || 'there';

    const handleStartAssessment = () => {
        // Complete triggers transition to dynamic experience
        if (onComplete) {
            onComplete();
        } else {
            onNext();
        }
    };

    const handleSkip = () => {
        // Skip also triggers transition
        if (onSkip) {
            onSkip();
        }
    };

    return (
        <div className="space-y-8 pb-8">
            {/* Header - Welcome and Journey Progress */}
            <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                    Welcome, {userName}
                </h1>
                <p className="text-white/60">
                    Ready to unlock your full potential? Let's continue your journey.
                </p>

                {/* Journey Progress Bar */}
                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-white/80">Your Career Quest</h3>
                        <span className="text-sm font-medium text-primary">14%</span>
                    </div>

                    {/* Milestone Track */}
                    <div className="relative">
                        <div className="absolute top-4 left-0 right-0 h-0.5 bg-white/10" />
                        <div className="absolute top-4 left-0 w-[14%] h-0.5 bg-primary" />

                        <div className="flex justify-between relative">
                            {JOURNEY_MILESTONES.map((milestone, index) => (
                                <div key={milestone.id} className="flex flex-col items-center" style={{ width: `${100 / JOURNEY_MILESTONES.length}%` }}>
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all ${milestone.status === 'completed'
                                                ? 'bg-primary text-black'
                                                : milestone.status === 'current'
                                                    ? 'bg-primary/20 border-2 border-primary text-primary'
                                                    : 'bg-white/10 text-white/40'
                                            }`}
                                    >
                                        {milestone.status === 'completed' ? (
                                            <CheckCircle size={16} />
                                        ) : (
                                            <CircleDot size={16} />
                                        )}
                                    </div>
                                    <span className={`text-xs mt-2 ${milestone.status === 'current' ? 'text-primary font-medium' : 'text-white/40'}`}>
                                        {milestone.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6 flex items-center gap-3">
                        <Calendar size={16} className="text-white/40" />
                        <span className="text-sm text-white/60">Journey Progress</span>
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: '14%' }} />
                        </div>
                        <span className="text-sm font-medium text-primary">14%</span>
                    </div>
                </div>
            </div>

            {/* AI Career Coach Introduction Card */}
            <div className="backdrop-blur-md bg-gradient-to-br from-teal-900/40 to-slate-900/60 border border-teal-500/20 rounded-2xl p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                            <Sparkles size={24} className="text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-1">Meet Your AI Career Coach</h2>
                            <p className="text-white/60">Interactive skills assessment through conversation</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30">
                        <Clock size={14} className="text-amber-400" />
                        <span className="text-sm text-amber-400 font-medium">15-20 Minutes</span>
                    </div>
                </div>

                {/* What Makes This Different */}
                <div className="mt-8 space-y-4">
                    <h3 className="text-lg font-semibold text-white">What Makes This Different</h3>
                    <div className="grid gap-4">
                        {DIFFERENTIATORS.map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <item.icon size={20} className="text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-white">{item.title}</h4>
                                    <p className="text-sm text-white/60 mt-0.5">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pro Tip */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mt-4">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                            <Zap size={16} className="text-amber-400" />
                        </div>
                        <div>
                            <h4 className="font-medium text-amber-400">Pro Tip</h4>
                            <p className="text-sm text-white/60 mt-0.5">
                                Speak freely, with confidence. The assessment works best when you share real thoughts without over-rehearsing. Focus on honest, clear communication.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Ready to Begin CTA */}
                <div className="mt-8 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <ArrowRight size={24} className="text-white/40" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Ready to Begin?</h3>
                    <p className="text-sm text-white/50 max-w-md mb-6">
                        The assessment is designed for an interactive and conversational experience.
                        It takes approximately 15-20 minutes to complete and will give you an accurate picture of where you stand.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                        <button
                            onClick={handleStartAssessment}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-black font-semibold rounded-xl
                hover:bg-primary/90 transition-all duration-300 group"
                        >
                            Start Skills Assessment
                            <ArrowRight size={18} className={`transition-transform ${isHovering ? 'translate-x-1' : ''}`} />
                        </button>
                        <button
                            onClick={handleSkip}
                            className="flex items-center justify-center gap-2 px-4 py-4 border border-white/20 text-white/70 rounded-xl
                hover:bg-white/5 transition-all"
                        >
                            <Clock size={16} />
                            Save & Exit
                        </button>
                    </div>
                </div>
            </div>

            {/* Current Skills Baseline (Resume Insights) */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-primary" />
                    <h3 className="text-lg font-semibold text-white">Current Skills Baseline (Resume Insights)</h3>
                </div>
                <p className="text-sm text-white/50">
                    Based on your resume analysis, we've generated a preliminary skills profile.
                    <span className="text-primary font-medium"> You're in the TOP 40% </span>
                    of similar candidates. Complete the Skills Assessment for a comprehensive, detailed analysis of your true capabilities.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Preliminary Score */}
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h4 className="text-sm font-medium text-white/60 mb-4">PRELIMINARY SCORE</h4>
                        <div className="flex items-center gap-6">
                            {/* Circular Progress */}
                            <div className="relative w-24 h-24">
                                <svg className="w-24 h-24 -rotate-90">
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="40"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="none"
                                        className="text-white/10"
                                    />
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="40"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="none"
                                        className="text-primary"
                                        strokeDasharray={`${(preliminaryScore / 100) * 251.2} 251.2`}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-primary">{preliminaryScore}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-white/60 text-sm">Top 40% of candidates</p>
                                <p className="text-white/40 text-xs mt-1">Based on {skillsAnalyzed} basic areas</p>
                            </div>
                        </div>
                    </div>

                    {/* Preliminary Skills Breakdown */}
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h4 className="text-sm font-medium text-white/60 mb-4">Preliminary Skills Breakdown</h4>
                        <div className="space-y-3">
                            {PRELIMINARY_SKILLS.map((skill, i) => (
                                <div key={i}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-white/80">{skill.name}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${skill.trend === 'missing'
                                                ? 'bg-red-500/20 text-red-400'
                                                : 'bg-amber-500/20 text-amber-400'
                                            }`}>
                                            {skill.trend === 'missing' ? 'Missing' : 'Pending'}
                                        </span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${skill.level >= 70 ? 'bg-emerald-500' : skill.level >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                                            style={{ width: `${skill.level}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-primary mt-4 flex items-center gap-1">
                            <Sparkles size={12} />
                            Full validated scores will appear after completing Skills Assessment
                        </p>
                    </div>
                </div>
            </div>

            {/* Preliminary Skills Gaps */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingDown size={18} className="text-amber-400" />
                    <h3 className="font-semibold text-white">Preliminary Skills Gaps</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Missing Skills */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <h4 className="text-sm font-medium text-white/80">Missing Skills</h4>
                        </div>
                        <div className="space-y-2">
                            {MISSING_SKILLS.map((skill, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                                        <TrendingDown size={14} className="text-red-400" />
                                    </div>
                                    <span className="text-sm text-white/80">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Low Proficiency */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-3 h-3 rounded-full bg-amber-500" />
                            <h4 className="text-sm font-medium text-white/80">Low Proficiency Areas</h4>
                        </div>
                        <div className="space-y-2">
                            {LOW_PROFICIENCY.map((skill, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                                        <TrendingUp size={14} className="text-amber-400" />
                                    </div>
                                    <span className="text-sm text-white/80">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA for Gap Analytics */}
                <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <div className="flex items-start gap-3">
                        <Target size={20} className="text-primary flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-medium text-white">Complete Assessment for Accurate Gap Analytics</h4>
                            <p className="text-sm text-white/60 mt-1">
                                The preliminary gap analysis is based on your resume. The Skills Assessment will provide a comprehensive,
                                validated analysis of your true capabilities with actionable recommendations.
                            </p>
                            <button
                                onClick={handleStartAssessment}
                                className="mt-3 flex items-center gap-2 px-4 py-2 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-all"
                            >
                                Start Assessment
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Help Section */}
            <div className="grid md:grid-cols-3 gap-4">
                <button className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <HelpCircle size={24} className="text-primary" />
                    </div>
                    <h4 className="font-medium text-white mb-1">Why Assess Skills?</h4>
                    <p className="text-sm text-white/50">Learn how we'll measure your skills fairly and accurately.</p>
                    <span className="text-primary text-sm mt-2 flex items-center gap-1">
                        Read Guide <ArrowRight size={14} />
                    </span>
                </button>

                <button className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <Mail size={24} className="text-primary" />
                    </div>
                    <h4 className="font-medium text-white mb-1">Need Help?</h4>
                    <p className="text-sm text-white/50">Our support team is here to answer your questions about the process.</p>
                    <span className="text-primary text-sm mt-2 flex items-center gap-1">
                        Contact Support <ArrowRight size={14} />
                    </span>
                </button>

                <button
                    onClick={handleSkip}
                    className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                >
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3">
                        <Clock size={24} className="text-white/50" />
                    </div>
                    <h4 className="font-medium text-white mb-1">Not Ready Now?</h4>
                    <p className="text-sm text-white/50">Save & exit. Your progress is automatically saved.</p>
                    <span className="text-white/60 text-sm mt-2 flex items-center gap-1">
                        Save & Exit <ArrowRight size={14} />
                    </span>
                </button>
            </div>

            {/* Back Link */}
            {onBack && (
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/50 hover:text-white/70 transition-colors mx-auto"
                >
                    <ArrowLeft size={16} />
                    Back to Resume Upload
                </button>
            )}

            {/* Trust Footer */}
            <div className="flex items-center justify-center gap-6 pt-4 text-xs text-white/40 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                    <Shield size={12} />
                    <span>Your data is secure</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock size={12} />
                    <span>Progress auto-saved</span>
                </div>
            </div>
        </div>
    );
};

export default StaticSkillsAssessment;
