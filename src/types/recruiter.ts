/**
 * Recruiter Types
 * 
 * TypeScript interfaces for recruiter-specific data structures.
 * These are stored in visitor_info separately from candidate data.
 */

export type VisitorRole = "candidate" | "recruiter";

// ============================================
// RECRUITER VISITOR INFO
// ============================================

export interface RecruiterVisitorInfo {
    visitorRole: "recruiter";
    recruiterName?: string;
    recruiterEmail?: string;
    recruiterPhone?: string;
    recruiterTitle?: string;
    companyName?: string;
    companyWebsite?: string;
    industry?: string;
    companySize?: string;
    postedJobs?: RecruiterJob[];
    scheduledInterviews?: RecruiterInterview[];
    offersExtended?: RecruiterOffer[];
    savedSearches?: SavedSearch[];
    tasks?: RecruiterTask[];
}

// ============================================
// JOB POSTING
// ============================================

export interface RecruiterJob {
    id: string;
    title: string;
    description: string;
    requirements: string[];
    salary?: {
        min: number;
        max: number;
        currency: string;
    };
    location: string;
    type: "full-time" | "part-time" | "contract" | "remote" | "hybrid";
    department?: string;
    postedDate: string;
    status: "draft" | "active" | "paused" | "closed";
    applicantCount?: number;
    viewCount?: number;
}

// ============================================
// RECRUITER INTERVIEWS
// ============================================

export interface RecruiterInterview {
    id: string;
    jobId: string;
    jobTitle?: string;
    candidateId: string; // Intel-service reference only
    candidateName: string; // From intel-service, not visitor_info
    candidateSkills?: string[];
    date: string;
    time: string;
    type: "in-person" | "video" | "phone";
    location?: string;
    status: "scheduled" | "completed" | "cancelled" | "rescheduled";
    feedback?: string;
    rating?: number;
}

// ============================================
// OFFERS
// ============================================

export interface RecruiterOffer {
    id: string;
    jobId: string;
    jobTitle?: string;
    candidateId: string;
    candidateName: string;
    salary: string;
    startDate: string;
    status: "pending" | "accepted" | "declined" | "expired";
    sentDate: string;
    expiryDate?: string;
    notes?: string;
}

// ============================================
// TASKS
// ============================================

export interface RecruiterTask {
    id: string;
    title: string;
    description?: string;
    dueDate: string;
    priority: "high" | "medium" | "low";
    status: "pending" | "completed";
    relatedJobId?: string;
    relatedJobTitle?: string;
    teleText?: string;
}

// ============================================
// SAVED SEARCHES
// ============================================

export interface SavedSearch {
    id: string;
    name: string;
    filters: {
        skills?: string[];
        experience?: string;
        location?: string;
        certifications?: string[];
    };
    createdDate: string;
    resultCount?: number;
}

// ============================================
// CANDIDATE PIPELINE (from intel-service)
// ============================================

export interface PipelineStage {
    id: string;
    label: string;
    count: number;
    color?: string;
}

export interface PipelineCandidate {
    id: string;
    name: string;
    stage: string;
    matchPercent?: number;
    topSkills?: string[];
    skills?: string[]; // Alias for topSkills
    appliedDate: string;
    lastActivity?: string;
    teleText?: string;
    actionPhrase?: string; // Alias for teleText
    trainingProgress?: number; // 0-100
    eta?: string; // e.g., "3 days"
}

// ============================================
// ANALYTICS (from intel-service)
// ============================================

export interface HiringFunnelData {
    applications: number;
    screened: number;
    interviewed: number;
    offers: number;
    hired: number;
    conversionRate?: string;
}

export interface SourceBreakdown {
    source: string;
    applications: number;
    hiredPercent: number;
}

export interface SkillDemand {
    skill: string;
    count: number;
    percentOfCandidates: number;
}

export interface TimeToHireMetrics {
    average: string;
    fastest: string;
    slowest: string;
}

// ============================================
// DASHBOARD COMPONENTS
// ============================================

export interface DashboardStat {
    label: string;
    value: number | string;
    trend?: string;
    icon?: string;
    teleText?: string;
}

export interface RecentActivity {
    type: "application" | "interview" | "offer" | "task" | "hire";
    message: string;
    time: string;
    teleText?: string;
}

export interface QuickAction {
    label: string;
    icon: string;
    teleText: string;
}
