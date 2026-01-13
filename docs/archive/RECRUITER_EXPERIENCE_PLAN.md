# Recruiter/Hiring Manager Experience Implementation Plan (v2)

## Overview

This document outlines the plan to support **recruiters and hiring managers** as customers on the trAIN Co platform. When a visitor identifies as a recruiter, the system will:

1. **Switch the navigation menu** to recruiter-specific items (green buttons, white text)
2. **Serve recruiter-specific templates** (reusing candidate templates where possible)
3. **Store recruiter data** in separate `visitor_info` fields (isolated from candidate data)
4. **Pull analytics** from the `intel-service` MCP server (recruiters only)

---

## Key Decisions (Confirmed)

| Question | Answer |
|----------|--------|
| Role switching | ✅ Users can switch between candidate and recruiter at any time |
| Data isolation | ✅ Separate storage - recruiters can't see candidate `visitor_info`, candidates can't see recruiter data |
| Company verification | ✅ No verification needed - immediate switch to recruiter mode |
| Candidate data access | ✅ Recruiters see `intel-service` data only, NOT individual `visitor_info` |
| Candidate intel access | ✅ Candidates CANNOT access `intel-service` data |
| Intel-service scope | ✅ Recruiters have full access to all `intel-service` resources |
| Tele access | ✅ Tele already has access to `intel-service` MCP server |
| Navigation style | ✅ Green buttons with white text for recruiters (vs yellow/black for candidates) |
| Mobile | ✅ Same responsive behavior as candidate experience |
| Celebrations | ✅ Reuse existing `CelebrationCard`, `AchievementUnlocked`, `ProgressMilestone` |

---

## Template Reuse Strategy

### Existing Templates That Can Be Reused Directly

| Template | Candidate Use | Recruiter Use | Modifications Needed |
|----------|---------------|---------------|---------------------|
| **ActionCarousel** | Welcome cards | Recruiter dashboard cards | ✅ None - works as-is |
| **JobsGrid** | Browse jobs | View posted jobs | ✅ Add `viewMode: 'recruiter'` prop for different metrics |
| **JobDetail** | View job details | Edit job details | ✅ Add `editable` prop |
| **ApplicationsTracker** | Track my applications | Track incoming applications | ✅ Add `viewMode: 'recruiter'` prop |
| **InterviewsTracker** | My interview schedule | Candidate interview schedule | ✅ Add `viewMode: 'recruiter'` prop |
| **InterviewScheduler** | Book my interview | Schedule candidate interview | ✅ Add `viewMode: 'recruiter'` prop |
| **CelebrationCard** | Milestones (applied, etc.) | Milestones (job filled, etc.) | ✅ Add recruiter `type` values |
| **AchievementUnlocked** | Skill achievements | Hiring achievements | ✅ None - works as-is |
| **ProgressMilestone** | Career progress | Hiring funnel progress | ✅ None - works as-is |

### Existing Templates That Need Adaptation

| Template | Recruiter Adaptation |
|----------|---------------------|
| **CandidateHeader** | Repurpose as `RecruiterHeader` for recruiter profile display |
| **CandidateSummary** | Repurpose as `RecruiterSummary` for company/recruiter bio |
| **SkillsProfile** | Show aggregate candidate skills in pipeline (read-only from intel-service) |

### New Templates Required (Minimal Set)

| Template | Purpose | Complexity |
|----------|---------|------------|
| **RecruiterDashboard** | HOME view with key metrics + quick actions | Medium |
| **CandidatePipeline** | Kanban-style view of candidates by stage | Medium |
| **AnalyticsDashboard** | Hiring funnel, source metrics, skills heatmap | Medium |
| **TasksList** | Recruiter task management | Low |

**Total New Templates: 4** (down from 11 in v1)

---

## Phase 1: Visitor Role Detection & State Management

### 1.1 Role Identification Mechanism

**How recruiters identify themselves:**
- Natural language: "I'm a recruiter", "I'm a hiring manager", "I want to post jobs", "I'm looking to hire"

**Tele Detection Rules (add to `glass-generator-prompt.md`):**
```markdown
### 🚨 VISITOR ROLE DETECTION 🚨

**RECRUITER triggers (detect and switch immediately):**
- "I'm a recruiter" / "I'm a hiring manager" / "I'm an HR professional"
- "I want to post a job" / "I need to hire" / "We're looking for candidates"
- "Show me candidates" / "How many people applied?" / "Show me hiring analytics"

**CANDIDATE triggers (default, or explicit switch back):**
- "I'm looking for a job" / "I want to apply" / "Show me my profile"
- "I'm a job seeker" / "Switch to candidate mode"

**When RECRUITER is detected:**
1. Save `{ visitorRole: "recruiter" }` to `visitor_info` immediately
2. Announce: "Switching to recruiter mode—let's find your next great hire."
3. Call `navigateToSection` with RecruiterDashboard template

**When CANDIDATE is detected (or switching back):**
1. Save `{ visitorRole: "candidate" }` to `visitor_info` immediately
2. Announce: "Switching to job seeker mode—let's build your career."
3. Call `navigateToSection` with candidate welcome template

**DATA ISOLATION RULES:**
- 🚨 RECRUITER mode: Use `search_conversation_history` to query INTEL-SERVICE only
- 🚨 RECRUITER mode: NEVER expose individual candidate `visitor_info` data
- 🚨 CANDIDATE mode: NEVER query or expose intel-service data
- 🚨 CANDIDATE mode: NEVER expose recruiter `visitor_info` fields
```

### 1.2 Separate Data Storage in `visitor_info`

**Candidate-specific fields (existing):**
```typescript
interface CandidateVisitorInfo {
  visitorRole: "candidate";
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  skills?: Skill[];
  experience?: Experience[];
  certifications?: Certification[];
  credentials?: Credential[];
  documentsUploaded?: Document[];
  jobsAppliedTo?: Application[];
  interviewsScheduled?: Interview[];
  trainingProgress?: TrainingProgress;
  skillQuizzes?: QuizResult[];
  languageSkills?: LanguageSkill[];
  preferredSector?: string;
}
```

**Recruiter-specific fields (NEW - completely separate):**
```typescript
interface RecruiterVisitorInfo {
  visitorRole: "recruiter";
  recruiterName?: string;
  recruiterEmail?: string;
  recruiterPhone?: string;
  recruiterTitle?: string;
  companyName?: string;
  companyWebsite?: string;
  industry?: string;
  companySize?: string;
  postedJobs?: Job[];
  scheduledInterviews?: RecruiterInterview[];
  offersExtended?: Offer[];
  savedSearches?: SavedSearch[];
  tasks?: RecruiterTask[];
}

interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  salary?: { min: number; max: number; currency: string };
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote" | "hybrid";
  department?: string;
  postedDate: string;
  status: "draft" | "active" | "paused" | "closed";
}

interface RecruiterInterview {
  id: string;
  jobId: string;
  candidateId: string; // Intel-service reference only
  candidateName: string; // From intel-service, not visitor_info
  date: string;
  time: string;
  type: "in-person" | "video" | "phone";
  status: "scheduled" | "completed" | "cancelled";
}

interface Offer {
  id: string;
  jobId: string;
  candidateId: string;
  candidateName: string;
  salary: string;
  startDate: string;
  status: "pending" | "accepted" | "declined" | "expired";
  sentDate: string;
}

interface RecruiterTask {
  id: string;
  title: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "completed";
  relatedJobId?: string;
}
```

---

## Phase 2: Dynamic Navigation Menu

### 2.1 Menu Configuration

**Candidate Menu (existing - 8 items, yellow/black buttons):**
```
HOME | MY TWIN | SKILLS | UPSKILL | MATCH | APPLY | INTERVIEW | ACCEPT
```

**Recruiter Menu (NEW - 7 items, green/white buttons):**
```
HOME | POSTINGS | APPLICATIONS | INTERVIEWS | OFFERS | TASKS | ANALYTICS
```

### 2.2 Navigation Implementation

**Create `useVisitorRole` hook:**
```typescript
// src/hooks/useVisitorRole.ts
import { useState, useEffect } from 'react';

type VisitorRole = "candidate" | "recruiter";

export const useVisitorRole = () => {
  const [role, setRole] = useState<VisitorRole>("candidate");

  useEffect(() => {
    // Listen for role changes from Tele via custom event
    const handleRoleChange = (e: CustomEvent<{ role: VisitorRole }>) => {
      setRole(e.detail.role);
    };

    window.addEventListener('visitorRoleChange', handleRoleChange as EventListener);
    
    // Check initial role from visitor_info (if persisted)
    const checkInitialRole = () => {
      const storedRole = localStorage.getItem('visitorRole');
      if (storedRole === 'recruiter') {
        setRole('recruiter');
      }
    };
    checkInitialRole();

    return () => {
      window.removeEventListener('visitorRoleChange', handleRoleChange as EventListener);
    };
  }, []);

  const switchRole = (newRole: VisitorRole) => {
    setRole(newRole);
    localStorage.setItem('visitorRole', newRole);
    window.dispatchEvent(new CustomEvent('visitorRoleChange', { detail: { role: newRole } }));
  };

  return { role, switchRole, isRecruiter: role === 'recruiter' };
};
```

**Modify `Navigation.tsx`:**
```typescript
// Add to Navigation.tsx
import { useVisitorRole } from '@/hooks/useVisitorRole';

const Navigation = ({ ... }) => {
  const { role, isRecruiter } = useVisitorRole();

  const candidateNavItems = [
    { id: 'home', label: 'HOME', teleQuery: '(M) Show me my welcome dashboard...' },
    { id: 'twin', label: 'MY TWIN', teleQuery: '(M) Show me my Skills Twin...' },
    { id: 'skills', label: 'SKILLS', teleQuery: '(M) Show me my skills...' },
    { id: 'upskill', label: 'UPSKILL', teleQuery: '(M) Show me training...' },
    { id: 'match', label: 'MATCH', teleQuery: '(M) Show me job matches...' },
    { id: 'apply', label: 'APPLY', teleQuery: '(M) Show me applications...' },
    { id: 'interview', label: 'INTERVIEW', teleQuery: '(M) Show me interviews...' },
    { id: 'accept', label: 'ACCEPT', teleQuery: '(M) Show me offers...' }
  ];

  const recruiterNavItems = [
    { id: 'home', label: 'HOME', teleQuery: '(M) Show me my recruiter dashboard with key metrics' },
    { id: 'postings', label: 'POSTINGS', teleQuery: '(M) Show me all my job postings and their status' },
    { id: 'applications', label: 'APPLICATIONS', teleQuery: '(M) Show me all candidate applications across my jobs' },
    { id: 'interviews', label: 'INTERVIEWS', teleQuery: '(M) Show me scheduled interviews with candidates' },
    { id: 'offers', label: 'OFFERS', teleQuery: '(M) Show me pending offers and acceptance status' },
    { id: 'tasks', label: 'TASKS', teleQuery: '(M) Show me my recruiting tasks and deadlines' },
    { id: 'analytics', label: 'ANALYTICS', teleQuery: '(M) Show me hiring analytics and pipeline metrics' }
  ];

  const navItems = isRecruiter ? recruiterNavItems : candidateNavItems;

  // Button styling based on role
  const buttonStyles = isRecruiter
    ? "bg-emerald-500 border-emerald-500 text-white hover:bg-emerald-400"
    : "bg-primary border-primary text-black hover:bg-primary/80";

  // ... rest of navigation with dynamic buttonStyles
};
```

---

## Phase 3: Template Modifications & New Templates

### 3.1 Modify Existing Templates (Add `viewMode` prop)

**Pattern for dual-mode templates:**
```typescript
interface JobsGridProps {
  jobs: Job[];
  viewMode?: "candidate" | "recruiter"; // NEW
  // ... existing props
}

export const JobsGrid: React.FC<JobsGridProps> = ({
  viewMode = "candidate",
  ...
}) => {
  const isRecruiter = viewMode === "recruiter";

  // Recruiter sees: applicant count, views, status controls
  // Candidate sees: match %, salary, apply button

  return (
    <div>
      {isRecruiter ? (
        // Recruiter-specific metrics: applicantCount, viewCount, status
        <RecruiterJobCard job={job} />
      ) : (
        // Candidate-specific: matchPercent, salary, apply
        <CandidateJobCard job={job} />
      )}
    </div>
  );
};
```

**Templates to modify:**

| Template | Add Props | Recruiter Behavior |
|----------|-----------|-------------------|
| `JobsGrid` | `viewMode`, `onEditJob`, `onPauseJob` | Show applicant count, view count, edit/pause buttons |
| `JobDetail` | `viewMode`, `editable`, `onSave` | Show edit form, applicant list, close job button |
| `ApplicationsTracker` | `viewMode` | Show candidate name, skills match, review buttons |
| `InterviewsTracker` | `viewMode` | Show candidate info, feedback input, reschedule |
| `InterviewScheduler` | `viewMode`, `candidateId` | Schedule for specific candidate |
| `CelebrationCard` | New `type` values | `"job-filled"`, `"offer-accepted"`, `"pipeline-milestone"` |

### 3.2 New Templates (4 total)

#### RecruiterDashboard
**Purpose:** Recruiter HOME - key metrics, quick actions, recent activity

```json
{
  "templateId": "RecruiterDashboard",
  "props": {
    "companyName": "NEOM",
    "recruiterName": "Sarah",
    "stats": [
      { "label": "Active Jobs", "value": 5, "trend": "+2 this week" },
      { "label": "Total Applicants", "value": 127, "trend": "+23 today" },
      { "label": "Interviews Scheduled", "value": 8, "trend": "3 this week" },
      { "label": "Offers Pending", "value": 3, "trend": "1 accepted" }
    ],
    "recentActivity": [
      { "type": "application", "message": "Ahmad applied for Data Analyst", "time": "2h ago", "teleText": "Tell me about Ahmad's application" },
      { "type": "interview", "message": "Interview with Sara completed", "time": "4h ago", "teleText": "Show me Sara's interview feedback" }
    ],
    "quickActions": [
      { "label": "Post New Job", "icon": "Plus", "teleText": "I want to post a new job" },
      { "label": "View Pipeline", "icon": "Users", "teleText": "Show me the candidate pipeline" },
      { "label": "Check Analytics", "icon": "BarChart", "teleText": "Show me hiring analytics" }
    ]
  }
}
```

#### CandidatePipeline
**Purpose:** Kanban-style view of candidates across hiring stages

```json
{
  "templateId": "CandidatePipeline",
  "props": {
    "jobId": "1",
    "jobTitle": "Data Analyst",
    "stages": [
      { "id": "applied", "label": "Applied", "count": 45, "color": "blue" },
      { "id": "screening", "label": "Screening", "count": 20, "color": "purple" },
      { "id": "interview", "label": "Interview", "count": 8, "color": "amber" },
      { "id": "offer", "label": "Offer", "count": 2, "color": "emerald" },
      { "id": "hired", "label": "Hired", "count": 0, "color": "green" }
    ],
    "candidates": [
      {
        "id": "c1",
        "name": "Ahmad Al-Rashid",
        "stage": "interview",
        "matchPercent": 92,
        "topSkills": ["Python", "SQL", "Tableau"],
        "appliedDate": "Jan 3",
        "teleText": "Tell me more about Ahmad Al-Rashid"
      }
    ],
    "filterByStage": null,
    "sortBy": "matchPercent"
  }
}
```

#### AnalyticsDashboard
**Purpose:** Hiring funnel, source metrics, skills distribution

```json
{
  "templateId": "AnalyticsDashboard",
  "props": {
    "timeRange": "last_30_days",
    "funnelData": {
      "applications": 127,
      "screened": 65,
      "interviewed": 32,
      "offers": 8,
      "hired": 5,
      "conversionRate": "3.9%"
    },
    "sourceBreakdown": [
      { "source": "Platform Direct", "applications": 80, "hiredPercent": 60 },
      { "source": "LinkedIn", "applications": 30, "hiredPercent": 25 },
      { "source": "Referral", "applications": 17, "hiredPercent": 15 }
    ],
    "topSkillsInPipeline": [
      { "skill": "Python", "count": 89, "percentOfCandidates": 70 },
      { "skill": "AWS", "count": 67, "percentOfCandidates": 53 },
      { "skill": "Data Analysis", "count": 54, "percentOfCandidates": 43 }
    ],
    "timeToHire": {
      "average": "18 days",
      "fastest": "7 days",
      "slowest": "45 days"
    }
  }
}
```

#### TasksList
**Purpose:** Recruiter task management with priorities and deadlines

```json
{
  "templateId": "TasksList",
  "props": {
    "tasks": [
      {
        "id": "t1",
        "title": "Review 5 new applications for Data Analyst",
        "dueDate": "Today",
        "priority": "high",
        "status": "pending",
        "relatedJob": "Data Analyst",
        "teleText": "Show me the new Data Analyst applications"
      },
      {
        "id": "t2",
        "title": "Send offer letter to Khalid",
        "dueDate": "Tomorrow",
        "priority": "high",
        "status": "pending",
        "relatedJob": "Cloud Engineer",
        "teleText": "Help me draft an offer for Khalid"
      },
      {
        "id": "t3",
        "title": "Schedule follow-up interview with Sara",
        "dueDate": "Jan 12",
        "priority": "medium",
        "status": "pending",
        "relatedJob": "UX Designer",
        "teleText": "Schedule a follow-up interview with Sara for UX Designer"
      }
    ],
    "showCompleted": false,
    "sortBy": "dueDate"
  }
}
```

---

## Phase 4: Intel Service MCP Integration

### 4.1 Data Isolation Rules

```
┌─────────────────────────────────────────────────────────────────┐
│                        DATA ACCESS MATRIX                        │
├───────────────────────┬─────────────────────┬───────────────────┤
│                       │ CANDIDATE MODE      │ RECRUITER MODE    │
├───────────────────────┼─────────────────────┼───────────────────┤
│ Own visitor_info      │ ✅ Read/Write       │ ✅ Read/Write     │
│ Other's visitor_info  │ ❌ No Access        │ ❌ No Access      │
│ Intel-service data    │ ❌ No Access        │ ✅ Full Access    │
│ Recruiter fields      │ ❌ Hidden           │ ✅ Read/Write     │
│ Candidate fields      │ ✅ Read/Write       │ ❌ Hidden         │
└───────────────────────┴─────────────────────┴───────────────────┘
```

### 4.2 Intel-Service Resources Available to Recruiters

| Resource | Description | Example Query |
|----------|-------------|---------------|
| `skills_registry` | All skills across all candidates | "How many candidates have Python?" |
| `certifications_index` | All certifications in the system | "Who has AWS certifications?" |
| `applications_log` | All job applications (anonymized) | "How many applied this week?" |
| `candidate_pool` | Aggregate candidate data (no PII) | "What's the average experience level?" |
| `skills_demand` | Skills most requested in job posts | "What skills are employers looking for?" |
| `hiring_trends` | Platform-wide hiring metrics | "What's the average time-to-hire?" |

### 4.3 Tele Prompt Rules for Intel-Service

**Add to `glass-generator-prompt.md`:**
```markdown
### 🚨 INTEL-SERVICE ACCESS (RECRUITER ONLY) 🚨

**When in RECRUITER mode, you can query intel-service for:**
- Aggregate candidate statistics (skill counts, certification counts)
- Application trends and pipeline metrics
- Platform-wide hiring analytics
- Skills demand analysis

**Example tool calls:**
```
search_conversation_history({ 
  source: "intel-service",
  query: "candidates with Python skills" 
})
```

**NEVER in recruiter mode:**
- Expose individual candidate names from visitor_info
- Show personal contact information
- Access candidate documents or private data

**Use AnalyticsDashboard or CandidatePipeline templates to display intel-service data.**
```

---

## Phase 5: Recruiter Flow & Shot Prompts

### 5.1 Role Switch Flow

**User:** "I'm a recruiter"

**Hook:** Switching to recruiter mode—let's find your next great hire.

```json
{
  "badge": "RECRUITER MODE",
  "title": "Welcome to Your Hiring Hub",
  "subtitle": "I'll help you find Vision 2030's best talent",
  "generativeSubsections": [{
    "id": "recruiter-welcome",
    "templateId": "RecruiterDashboard",
    "props": {
      "companyName": "",
      "recruiterName": "",
      "stats": [],
      "recentActivity": [],
      "quickActions": [
        { "label": "Post New Job", "icon": "Plus", "teleText": "I want to post a new job" },
        { "label": "View Analytics", "icon": "BarChart", "teleText": "Show me hiring analytics" }
      ],
      "emptyMessage": "Tell me your company name to get started"
    }
  }]
}
```

**Guide:** What's your company name? I'll set up your dashboard.

### 5.2 Post Job Flow

**User:** "I want to post a Data Analyst position"

**Hook:** Let's create your job posting—I'll capture everything.

```json
{
  "badge": "NEW POSTING",
  "title": "Create Job Posting",
  "generativeSubsections": [{
    "id": "job-form",
    "templateId": "JobDetail",
    "props": {
      "viewMode": "recruiter",
      "editable": true,
      "title": "Data Analyst",
      "company": "",
      "description": "",
      "requirements": [],
      "location": "",
      "type": "",
      "salary": ""
    }
  }]
}
```

**Guide:** Tell me the requirements, location, and salary range.

### 5.3 View Pipeline Flow

**User:** "Show me candidates for the Data Analyst role"

**Hook:** Here's your pipeline—45 applicants, 8 ready for interview.

```json
{
  "badge": "CANDIDATE PIPELINE",
  "title": "Data Analyst Candidates",
  "generativeSubsections": [{
    "id": "pipeline",
    "templateId": "CandidatePipeline",
    "props": {
      "jobId": "1",
      "jobTitle": "Data Analyst",
      "stages": [
        { "id": "applied", "label": "Applied", "count": 45 },
        { "id": "screening", "label": "Screening", "count": 20 },
        { "id": "interview", "label": "Interview", "count": 8 },
        { "id": "offer", "label": "Offer", "count": 2 },
        { "id": "hired", "label": "Hired", "count": 0 }
      ],
      "candidates": []
    }
  }]
}
```

**Guide:** Click any candidate to see their profile. Filter by stage to focus.

### 5.4 Analytics Flow

**User:** "Show me hiring analytics"

**Hook:** Here's your 30-day snapshot—conversion rate is 3.9%.

```json
{
  "badge": "ANALYTICS",
  "title": "Hiring Performance",
  "generativeSubsections": [{
    "id": "analytics",
    "templateId": "AnalyticsDashboard",
    "props": {
      "timeRange": "last_30_days",
      "funnelData": { "applications": 127, "screened": 65, "interviewed": 32, "offers": 8, "hired": 5 },
      "sourceBreakdown": [],
      "topSkillsInPipeline": []
    }
  }]
}
```

**Guide:** Filter by time range or job. Click metrics for details.

### 5.5 Switch Back to Candidate

**User:** "I'm looking for a job" or "Switch to candidate mode"

**Hook:** Switching to job seeker mode—let's build your career.

```json
{
  "badge": "YOUR CAREER COACH",
  "title": "Welcome Back",
  "subtitle": "Let's find your next opportunity",
  "generativeSubsections": [{
    "id": "welcome-carousel",
    "templateId": "ActionCarousel",
    "props": { ... }
  }]
}
```

---

## Phase 6: Implementation Checklist

### 6.1 Files to Create

| File | Purpose |
|------|---------|
| `src/hooks/useVisitorRole.ts` | Role state management hook |
| `src/types/recruiter.ts` | TypeScript interfaces for recruiter data |
| `src/components/templates/RecruiterDashboard.tsx` | Recruiter HOME template |
| `src/components/templates/CandidatePipeline.tsx` | Kanban candidate view |
| `src/components/templates/AnalyticsDashboard.tsx` | Hiring analytics |
| `src/components/templates/TasksList.tsx` | Recruiter task management |

### 6.2 Files to Modify

| File | Changes |
|------|---------|
| `src/components/Navigation.tsx` | Conditional menu items, green/white styling for recruiters |
| `src/components/templates/JobsGrid.tsx` | Add `viewMode` prop, recruiter metrics |
| `src/components/templates/JobDetail.tsx` | Add `viewMode`, `editable` props |
| `src/components/templates/ApplicationsTracker.tsx` | Add `viewMode` prop |
| `src/components/templates/InterviewsTracker.tsx` | Add `viewMode` prop |
| `src/components/templates/InterviewScheduler.tsx` | Add `viewMode`, `candidateId` props |
| `src/components/templates/CelebrationCard.tsx` | Add recruiter celebration types |
| `src/data/templateRegistry.ts` | Register 4 new templates |
| `glass-generator-prompt.md` | Add recruiter rules, schemas, shot prompts |
| `tele-knowledge.md` | Add recruiter persona knowledge |

### 6.3 Implementation Order

```
Phase 1: Foundation (Day 1)
├── Create src/types/recruiter.ts
├── Create src/hooks/useVisitorRole.ts
└── Expose role switching via window event

Phase 2: Navigation (Day 1)
├── Modify Navigation.tsx with role-based menus
├── Implement green/white button styling for recruiters
└── Test role switching UI

Phase 3: Template Modifications (Day 2)
├── Add viewMode to JobsGrid
├── Add viewMode to ApplicationsTracker
├── Add viewMode to InterviewsTracker
├── Add editable prop to JobDetail
└── Add recruiter types to CelebrationCard

Phase 4: New Templates (Day 2-3)
├── Create RecruiterDashboard
├── Create CandidatePipeline
├── Create AnalyticsDashboard
├── Create TasksList
└── Register all in templateRegistry.ts

Phase 5: Prompt Updates (Day 3)
├── Update glass-generator-prompt.md with recruiter rules
├── Update glass-generator-prompt.md with template schemas
├── Update tele-knowledge.md with recruiter persona
└── Add shot prompts for all recruiter flows

Phase 6: Testing & Polish (Day 4)
├── Test role switching end-to-end
├── Test data isolation (recruiter can't see candidate visitor_info)
├── Test intel-service queries in recruiter mode
├── Verify candidate can't access intel-service
└── Mobile responsiveness check
```

---

## Summary

| Metric | Value |
|--------|-------|
| **New Templates** | 4 (RecruiterDashboard, CandidatePipeline, AnalyticsDashboard, TasksList) |
| **Modified Templates** | 6 (JobsGrid, JobDetail, ApplicationsTracker, InterviewsTracker, InterviewScheduler, CelebrationCard) |
| **Reused Templates** | 9 (ActionCarousel, SkillsProfile, CandidateHeader, CandidateSummary, AchievementUnlocked, ProgressMilestone, + others) |
| **New Files** | 6 |
| **Modified Files** | 10 |
| **Estimated Effort** | 4 days |

**Key Innovations:**
1. **Role-based navigation** with distinct styling (green/white vs yellow/black)
2. **Template reuse** via `viewMode` prop pattern—minimal new code
3. **Strict data isolation**—recruiters see intel-service only, not visitor_info
4. **Seamless role switching**—users can toggle between candidate and recruiter anytime
5. **Intel-service integration**—aggregate analytics without exposing individual data

---

**Ready to implement?** Let me know when you want to start with Phase 1!
