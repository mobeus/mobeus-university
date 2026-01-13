# 🤖 AGENT.md - trAIN Co Development Reference

> **Saudi Vision 2030 Upskilling Platform**
> Last updated: January 12, 2026

---

## 1. PROJECT OVERVIEW

This is the **trAIN Co** platform - an AI-powered career concierge for Saudi Arabia's Vision 2030 workforce transformation initiative.

### Core Components
| Component | File/Location | Purpose |
|-----------|---------------|---------|
| **Tele** | External AI | Voice agent that SPEAKS and calls `navigateToSection` |
| **Glass** | This codebase | React app that DISPLAYS templates based on Tele commands |
| **glass-generator-prompt.md** | Root | Instructions for Tele on HOW to generate Glass JSON |
| **tele-knowledge.md** | Root | Domain knowledge for Tele on WHAT to say |

### Architecture Flow
```
User speaks → Tele processes → Tele calls navigateToSection(JSON) → Glass renders templates
```

---

## 🗣️ VOCABULARY (For Developers Talking to Agents)

When the developer says **this**, the agent should understand **that**:

### Slash Commands (Workflows)
| Command | Workflow | Purpose |
|---------|----------|---------|
| `/add-glass` | `.agent/workflows/add-glass.md` | Add new template (experience) to the platform |
| `/add-knowledge` | `.agent/workflows/add-knowledge.md` | Add domain knowledge to tele-knowledge.md |
| `/tele-should` | `.agent/workflows/tele-should.md` | Add shot prompt for specific user request |

### Component Shorthand
| Developer Says | Means | File(s) to Modify |
|----------------|-------|-------------------|
| "add glass for X" / "experience for X" | Create new template | Use `/add-glass` workflow |
| "static page" / "static step" | Static onboarding template | `static-templates/` + `staticTemplateRegistry.ts` + `onboardingFlow.ts` |
| "Tele should know" / "add knowledge" | Domain knowledge | Use `/add-knowledge` workflow |
| "Tele should show X when Y" | Shot prompt | Use `/tele-should` workflow |
| "wire it up" | Register template | `templateRegistry.ts` or `staticTemplateRegistry.ts` |
| "image" / "asset" | Asset registry entry | `assetRegistry.ts` |
| "push to training" | Git push | `git push training main` |

### Example Commands
| You Say | Agent Does |
|---------|------------|
| `/add-glass InterviewCoach` | Creates template, registers, adds to prompts |
| `/add-knowledge` about LEAP 2026 | Updates tele-knowledge.md with event info |
| `/tele-should` show jobs when user says "find me work" | Adds shot prompt to glass-generator-prompt.md |

---



## 2. KEY FILES

### Prompt Files (Tele reads these)
| File | Purpose | Line Limit |
|------|---------|------------|
| `glass-generator-prompt.md` | Template schemas, JSON format, shot prompts | ≤1200 lines |
| `tele-knowledge.md` | Domain knowledge, journey steps, persona | ≤600 lines |

### Registries
| File | Purpose |
|------|---------|
| `src/data/templateRegistry.ts` | Dynamic templates (Tele-controlled) |
| `src/data/staticTemplateRegistry.ts` | Static templates (onboarding flow) |
| `src/data/assetRegistry.ts` | Image asset IDs → paths/prompts |
| `src/data/onboardingFlow.ts` | Static onboarding step sequence |

### Core Components
| File | Purpose |
|------|---------|
| `src/pages/Index.tsx` | Main page, navigation API, state management |
| `src/components/DynamicSectionLoader.tsx` | Renders Tele's generative subsections |
| `src/components/StaticSectionLoader.tsx` | Renders static onboarding templates |
| `src/hooks/useVisitorRole.ts` | Role management (candidate/recruiter) |
| `src/utils/teleInteraction.ts` | Send messages to Tele |

---

## 3. THE navigateToSection API

Tele calls this to display content:

```javascript
window.teleNavigation.navigateToSection({
  "badge": "SECTION_NAME",
  "title": "Display Title",
  "subtitle": "Optional subtitle",
  "generativeSubsections": [
    {
      "id": "unique-id",
      "templateId": "TemplateName",
      "props": { /* template-specific data */ }
    }
  ]
})
```

### JSON Rules (NON-NEGOTIABLE)
1. **Root keys only:** `badge`, `title`, `subtitle`, `generativeSubsections`
2. **Subsection keys only:** `id`, `templateId`, `props`
3. **ALL data inside `props`** - never at subsection root
4. **Never:** `badge`/`title`/`subtitle` inside subsections

### 🚨 3 IMMUTABLE LAWS 🚨
1. **Constraint: Tool Signature Stability** — The `navigateToSection` tool signature MUST NEVER be changed.
2. **Rule: Interactive Tele-Action** — EVERY clickable element in the generated JSON MUST have a `showTele` action (using `actionPhrase` or `teleText` props).
3. **Rule: Mandatory Tool Call** — The `navigateToSection` tool MUST be called in EVERY response.

---

## 4. TEMPLATES

### Dynamic Templates (47 total - Tele-controlled)

**Candidate Profile (8)**
- `CandidateHeader` - Profile header with photo, name, score
- `CandidateSummary` - Bio summary
- `WorkHistory` - Employment timeline
- `EducationHistory` - Education entries
- `CertificationsList` - Certifications with status
- `SkillsProfile` - Skills with proficiency bars
- `DocumentsStatus` - Document verification status
- `DocumentUploader` - Upload interface

**Skills & Assessment (2)**
- `SkillsAssessment` - Skills evaluation interface
- `SkillQuiz` - Quiz questions with choices

**Language (2)**
- `LanguageFluencyTest` - Language test interface
- `LanguageSkillsDisplay` - Language proficiency display

**Jobs & Applications (7)**
- `JobsGrid` - Grid of job cards
- `JobDetail` - Full job description
- `ApplicationsTracker` - Application status list
- `InterviewsTracker` - Interview schedule
- `InterviewScheduler` - Book interview slots
- `InterviewPrep` - Interview preparation resources
- `OfferReview` - Review and respond to offers

**Teaching & Learning (6)**
- `LessonCarousel` - Scrollable lesson cards
- `ImageGrid` - Grid of images
- `LessonSplit` - Image + text layout
- `StepByStep` - Numbered steps
- `VisualQuiz` - Image-based quiz
- (LessonCarousel counted once for scrollable cards)

**Job Skills Training (3)**
- `SkillLesson` - Technical skill lessons with code examples
- `InteractiveDemo` - Tool/software interactive demonstrations
- `LearningPath` - Multi-module learning roadmaps with ROI

**Course & Training (8)**
- `CourseOverview` - Course intro
- `DomainCard` - Knowledge domain card
- `ObjectivesList` - Learning objectives
- `ConceptExplainer` - Concept breakdown
- `ServiceReference` - Service documentation
- `PracticeQuestion` - Practice quiz question
- `CourseProgress` - Progress tracker
- `FlashcardDeck` - Flashcard interface

**Celebrations (3)**
- `CelebrationCard` - Milestone celebration
- `AchievementUnlocked` - Badge unlock animation
- `ProgressMilestone` - Progress checkpoint

**Recruiter (8)**
- `RecruiterDashboard` - Recruiter home view
- `CandidatePipeline` - Candidate kanban board
- `AnalyticsDashboard` - Hiring analytics
- `RecruiterAnalytics` - KPI and job performance
- `TasksList` - Task management
- `RecruiterJobDetail` - Editable job posting
- `RecruiterTaskHub` - Impact-prioritized tasks
- `OfferPipeline` - Offer tracking with pre-employment checks

**Welcome (1)**
- `ActionCarousel` - Welcome action cards

### Static Templates (7 total - Onboarding flow)
| Order | Template | Purpose |
|-------|----------|---------|
| 1 | `StaticHomePage` | Landing page |
| 2 | `StaticLoginIDVerify` | National ID entry |
| 3 | `StaticPhoneEntry` | Phone number |
| 4 | `StaticOTPVerify` | OTP verification |
| 5 | `StaticBasicInfo` | Name, email, DOB |
| 6 | `StaticResumeUpload` | Resume upload |
| 7 | `StaticSkillsAssessment` | Skills intro |

---

## 5. ROLE SYSTEM

### Roles
| Role | Theme | Navigation Items |
|------|-------|------------------|
| `candidate` | Yellow/Gold | HOME, MY TWIN, SKILLS, TRAIN, MATCH, APPLY, INTERVIEW, ACCEPT |
| `recruiter` | Emerald Green | HOME, POSTINGS, CANDIDATES, INTERVIEWS, OFFERS, TASKS, ANALYTICS |

### Role Switching
```javascript
// Tele can call these
window.switchToRecruiter()
window.switchToCandidate()

// Check current role
window.getVisitorRole()    // Returns 'candidate' or 'recruiter'
window.isRecruiterMode()   // Returns boolean
```

### Auto-Detection
Index.tsx auto-detects role from template IDs:
- Recruiter templates → switches to recruiter mode
- `ActionCarousel` / career coach → switches to candidate mode

---

## 6. SMART IMAGES

### Asset Registry
Located at `src/data/assetRegistry.ts`

```typescript
// Asset definition
{
  "job-exploration": {
    "path": "/assets/welcome/job-exploration.png",
    "alt": "Job exploration illustration"
  }
}
```

### SmartImage Component
Located at `src/components/ui/SmartImage.tsx`

```tsx
<SmartImage assetId="job-exploration" />
```

**Behavior:**
1. Look up `assetId` in registry
2. If found → load local image
3. If not found → treat as prompt → generate via AI
4. Cache generated images in memory

---

## 7. FLOW: Static → Dynamic

### Onboarding (Static)
```
StaticHomePage → LoginID → Phone → OTP → BasicInfo → Resume → SkillsAssessment
                                                                     ↓
                                                            OnboardingTransition
                                                                     ↓
                                                           Dynamic Experience
```

### Controlled by
- `src/data/onboardingFlow.ts` - Step sequence
- `src/hooks/useOnboardingFlow.ts` - State management
- `src/components/StaticSectionLoader.tsx` - Rendering
- `src/components/OnboardingTransition.tsx` - Transition animation

---

## 8. MCP TOOLS (For AI Agents)

### save_visitor_info
Persists candidate/recruiter data.

```json
{
  "visitorRole": "candidate",
  "candidate": {
    "name": "Ahmed",
    "email": "ahmed@example.com",
    "skills": [...],
    "workHistory": [...]
  }
}
```

### search_conversation_history
Searches past Tele conversations for context.

### intel-service (MCP Server)
Recruiter-only data access:
- Candidate pool analytics
- Job posting performance
- Interview metrics
- Offer tracking

**Data Isolation:** Candidates NEVER see recruiter data. Data isolation enforced via MCP server permissions.

---

## 9. SHOT PROMPTS

Shot prompts in `glass-generator-prompt.md` show Tele example responses:

```markdown
### Show Profile
USER: "Show me my profile"

navigateToSection:
{
  "badge": "MY TWIN",
  "title": "Your Skills Twin",
  "generativeSubsections": [
    { "id": "header-1", "templateId": "CandidateHeader", "props": {...} }
  ]
}

TELE SAYS: "Your profile is looking strong. Want to add more skills?"
```

---

## 10. UTILITY FUNCTIONS

| Function | File | Purpose |
|----------|------|---------|
| `sendToTele(prompt)` | `teleInteraction.ts` | Send message to Tele |
| `notifyTele(message)` | `acknowledgmentHelpers.ts` | Notify Tele of UI action |
| `exposeNavigationAPI()` | `uiFrameworkRegistration.ts` | Register navigation for Tele |
| `exposeVisitorRoleAPI()` | `useVisitorRole.ts` | Register role functions |

---

## 11. STATUS NORMALIZATION PATTERN

### Problem
Tele may send status values that don't exactly match template expectations (e.g., `"Offer Received"` instead of `"accepted"`), causing status counts to break.

### Solution
Templates with status-based counts MUST implement a `normalizeStatus()` function:

```typescript
type StatusType = "pending" | "reviewing" | "interview" | "accepted" | "rejected";

const normalizeStatus = (status: string): StatusType => {
    const normalized = status?.toLowerCase().trim() || "";
    
    if (normalized.includes("pending") || normalized.includes("submitted")) return "pending";
    if (normalized.includes("review") || normalized.includes("screening")) return "reviewing";
    if (normalized.includes("interview") || normalized.includes("scheduled")) return "interview";
    if (normalized.includes("accept") || normalized.includes("offer") || normalized.includes("hired")) return "accepted";
    if (normalized.includes("reject") || normalized.includes("declined")) return "rejected";
    
    return "pending"; // Default fallback
};
```

### Templates with Status Normalization
| Template | Status Values |
|----------|---------------|
| `ApplicationsTracker` | pending, reviewing, interview, accepted, rejected |
| `InterviewsTracker` | upcoming, completed, cancelled, rescheduled |
| `DocumentsStatus` | verified, pending, expired, missing |
| `TasksList` | pending, completed |

### Rules for New Templates
1. **Accept `status: string`** in the interface (not a union type)
2. **Implement `normalizeStatus()`** with keyword matching
3. **Use `normalizeStatus()` everywhere** status is compared or counted
4. **Default to a sensible fallback** (usually first status value)

## 11. CSS & STYLING

- **Framework:** TailwindCSS
- **Theme:** Dark mode, glassmorphism
- **Colors:** 
  - Primary (Gold): `#C9A227`
  - Secondary (Green): `#10B981`
  - Recruiter (Emerald): `#059669`
- **File:** `src/index.css`

---

## 12. CONSTRAINTS

| Resource | Current | Limit |
|----------|---------|-------|
| Dynamic Templates | 47 | 50 |
| Static Templates | 7 | -- |
| glass-generator-prompt.md | ~1047 lines | 1200 |
| tele-knowledge.md | ~407 lines | 600 |

---

## 13. DEVELOPMENT WORKFLOW

### Adding a Template
1. Create `src/components/templates/MyTemplate.tsx`
2. Register in `src/data/templateRegistry.ts`
3. Document in `glass-generator-prompt.md` (schema + shot prompt)

### Adding Static Onboarding Step
1. Create `src/components/static-templates/StaticMyStep.tsx`
2. Register in `src/data/staticTemplateRegistry.ts`
3. Add to `src/data/onboardingFlow.ts`
4. Add to `SIDEBAR_STEPS` if showing progress

### 🚨 GIT PUSH POLICY (MANDATORY)

**NEVER push to any git remote without the user's EXPLICIT approval.**

This means:
- ❌ No auto-running `git push` commands
- ❌ No pushing as part of a workflow without asking first
- ✅ Always ask "Ready to push?" and wait for confirmation
- ✅ User must explicitly say "yes", "push it", "go ahead", etc.

Even if the user says "commit and push", the agent MUST pause before the push step and confirm.

### Git Remotes
| Remote | URL |
|--------|-----|
| training | `git@github.com:mobeus/training-mobeus-com.git` |

---

## 14. DOCUMENTATION FILES

| File | Purpose | Status |
|------|---------|--------|
| `AGENT.md` | Technical reference for developers | ✅ Maintained |
| `glass-generator-prompt.md` | Tele template schemas + shot prompts | ✅ Maintained |
| `tele-knowledge.md` | Domain knowledge for Tele | ✅ Maintained |

### Planning Docs (Archived - Implementation Complete)
| File | Location |
|------|----------|

---

## 15. 🔒 DOCUMENTATION SYNC PROTOCOL (MANDATORY)

### The Problem
Three files must stay in sync. If any is updated without the others, the system becomes inconsistent:

| File | Purpose | Update When |
|------|---------|-------------|
| `glass-generator-prompt.md` | HOW Tele generates JSON (templates, props, shot prompts) | Any template or prop change |
| `tele-knowledge.md` | WHAT Tele knows (voice, data, journey stages) | Any menu or journey change |
| `AGENT.md` | Developer reference (patterns, workflows, constraints) | Any architectural change |

### Shared Elements (Must Match in Both Files)
| Element | glass-generator-prompt.md | tele-knowledge.md |
|---------|---------------------------|-------------------|
| **Candidate Journey Stages** | Navigation Menu (8 stages) | Section 2b & 3 |
| **Recruiter Journey Stages** | Recruiter Navigation (7 stages) | Section 13 |
| **Flow Statements** | Lines 41-42 | Lines 12, 17 |
| **Template Names** | Template Library sections | Section 6b |

### Sync Rules

**RULE 1: Any change to navigation/menus → Update BOTH files**
```
IF changing: HOME, MY TWIN, SKILLS, TRAIN, MATCH, APPLY, INTERVIEW, ACCEPT
   OR: POSTINGS, CANDIDATES, INTERVIEWS, OFFERS, ONBOARDING, ANALYTICS
THEN: Update BOTH glass-generator-prompt.md AND tele-knowledge.md
```

**RULE 2: Any new template → Update glass-generator-prompt.md AND component**
```
IF adding templateId to shot prompt
THEN: 
  1. Verify template exists in src/components/templates/
  2. Verify all props in shot prompt are in component interface
  3. Update Template Library section with prop schema
```

**RULE 3: Any new prop in shot prompt → Update component FIRST**
```
WRONG ORDER: Write shot prompt → forget component → runtime error
RIGHT ORDER: Update component interface → test → write shot prompt
```

**RULE 4: After any documentation change → Run sync check**
```bash
# Quick sync verification
grep -E "CANDIDATES|ONBOARDING" glass-generator-prompt.md tele-knowledge.md
grep -E "APPLICATIONS|TASKS" glass-generator-prompt.md tele-knowledge.md
```

### Verification Checklist
Before committing documentation changes:
- [ ] Both files have identical journey stage names
- [ ] Both files have identical flow statements
- [ ] All shot prompt props exist in component interfaces
- [ ] Template library matches templateRegistry.ts

---

## 16. 🛡️ DEFENSIVE TEMPLATE CODING (MANDATORY)

### The Problem
Tele sends JSON props to templates. If props are missing, malformed, or wrong types, templates crash with "Error loading template X".

### MANDATORY: All Template Components Must

**RULE 1: Default all props that can be undefined**
```typescript
// ❌ WRONG - will crash if domains is undefined
export const MyTemplate = ({ domains }) => {
    const total = domains.reduce(...) // 💥 CRASH
}

// ✅ CORRECT - safe default
export const MyTemplate = ({ domains = [] }) => {
    const safeDomains = Array.isArray(domains) ? domains : [];
    const total = safeDomains.reduce(...) // ✅ SAFE
}
```

**RULE 2: Use optional chaining on nested access**
```typescript
// ❌ WRONG - will crash if d is undefined
sum + d.totalObjectives

// ✅ CORRECT
sum + (d?.totalObjectives || 0)
```

**RULE 3: Never trust array props - always validate**
```typescript
const safeArray = Array.isArray(prop) ? prop : [];
```

**RULE 4: All clickable actions must have fallbacks**
```typescript
const phrase = item.actionPhrase || item.teleText || `Default action for ${item.title}`;
```

### Before Adding Any New Template
1. Add defaults to ALL array/object props in destructuring
2. Add `safe*` wrapper for any prop that gets iterated/reduced
3. Test with `undefined` passed as that prop
4. Test with malformed data (wrong structure)

---

## 17. 📊 TEMPLATE PROPS REFERENCE

### Enhanced Props (Recently Added)

These props were added to support ROI-framed upskilling and recruiter intelligence:

| Template | Prop | Type | Purpose |
|----------|------|------|---------|
| **LearningPath** | `roiSummary` | `{ rolesUnlocked, avgSalary, salaryIncrease?, timeToHire?, successRate? }` | Show ROI of completing the path |
| **LearningPath** | `successStory` | `string` | Social proof quote |
| **CourseProgress** | `opportunityUnlock` | `{ currentMatches, atCompletion, newRolesUnlocked?, nextMilestone? }` | Show job matches at completion |
| **CelebrationCard** | `journeySummary` | `{ daysFromStart, skillsGained[], applicationsSubmitted, interviewsCompleted }` | Recap user's journey |
| **RecruiterAnalytics** | `diagnosis` | `{ issue, detail?, candidates_in_training?, training_eta? }` | Explain why job isn't filling |
| **RecruiterAnalytics** | `recommendations` | `{ id, action, impact?, actionPhrase? }[]` | Actionable suggestions |
| **CandidatePipeline** | `trainingProgress` | `number (0-100)` | Candidate's training completion |
| **CandidatePipeline** | `eta` | `string` | When candidate will be ready |
| **CandidatePipeline** | `action` | `{ label, actionPhrase }` | Global action button |
| **JobsGrid** | `marketInsight` | `string` | Demand intelligence banner |
| **JobsGrid** | `urgency` (per job) | `string` | Hiring urgency indicator |
| **JobDetail** | `competitiveInsight` | `string` | Applicant competition analysis |

### Action Props (Standard)

All interactive templates should support these action props:

| Prop | Purpose | Example |
|------|---------|---------|
| `actionPhrase` | Primary action text for Tele | `"Apply for this role"` |
| `teleText` | Alternative to actionPhrase | `"Show me more details"` |
| `*ActionPhrase` | Specific action (e.g., `applyActionPhrase`) | `"Submit application for {title}"` |

### Template Categories by Prop Patterns

**Cards/Grids (iterate over items):**
```typescript
interface ItemProps {
    items: Item[];           // ALWAYS default to []
    sortBy?: string;
    filterBy?: string;
    emptyMessage?: string;   // Fallback when items.length === 0
}
```

**Detail Views (single entity):**
```typescript
interface DetailProps {
    title: string;
    subtitle?: string;
    description?: string;
    // Nested objects always optional
    metadata?: { ... };
    actions?: Action[];
}
```

**Progress/Analytics (computed values):**
```typescript
interface ProgressProps {
    items: Item[];
    overallScore?: number;
    // Computed in component, not passed
}
```

---

## 18. 🔧 KEY HOOKS & UTILITIES

### Hooks

| Hook | File | Purpose | Usage |
|------|------|---------|-------|
| `useSound` | `hooks/useSound.ts` | Play UI sounds | `const { playClick } = useSound()` |
| `useVisitorRole` | `hooks/useVisitorRole.ts` | Get/set candidate or recruiter role | `const { role, isRecruiter } = useVisitorRole()` |
| `useOnboardingFlow` | `hooks/useOnboardingFlow.ts` | Manage static onboarding state | `const { currentStep, goNext } = useOnboardingFlow()` |
| `useSubsectionImage` | `hooks/useSubsectionImage.ts` | AI image generation for subsections | `const { imageUrl, isLoading } = useSubsectionImage(prompt)` |
| `use-toast` | `hooks/use-toast.ts` | Toast notifications | `const { toast } = useToast()` |

### Utilities

| Utility | File | Purpose | Usage |
|---------|------|---------|-------|
| `notifyTele` | `utils/acknowledgmentHelpers.ts` | Send action to Tele (preferred) | `notifyTele("Show my profile")` |
| `sendToTele` | `utils/teleInteraction.ts` | Send raw message to Tele | `sendToTele("User clicked apply")` |
| `exposeNavigationAPI` | `utils/uiFrameworkRegistration.ts` | Register `navigateToSection` | Called once on app init |
| `showTele` | `window.showTele` | Direct Tele trigger (use `notifyTele` instead) | Legacy, avoid |

### Helper Pattern: notifyTele vs showTele

```typescript
// ✅ PREFERRED - goes through helper
import { notifyTele } from "@/utils/acknowledgmentHelpers";
notifyTele("Show my profile");

// ❌ AVOID - direct window access
if (window.showTele) window.showTele("Show my profile");
```

### Type Definitions

| File | Purpose |
|------|---------|
| `types/recruiter.ts` | Recruiter interfaces (PipelineCandidate, DashboardStat, etc.) |
| `types/onboarding.ts` | Static onboarding step types |
| `types/section.ts` | GenerativeSubsection, TemplateProps |
| `types/subsection.ts` | Subsection metadata types |

---

## 19. 🚨 ERROR HANDLING

### Template Error Boundaries

All templates are wrapped in error boundaries by `DynamicSectionLoader.tsx`. When a template crashes:

1. Error is caught by boundary
2. User sees "Error loading template X"
3. Console shows full error stack
4. Other templates continue working

### Common Error Causes

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot read property 'X' of undefined` | Missing prop default | Add `prop = []` or `prop = {}` |
| `X.map is not a function` | Prop is not an array | Wrap with `Array.isArray(X) ? X : []` |
| `Error loading template X` | Component crash | Check console, add defensive code |

### Debugging Template Issues

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Check if component exports correctly
grep "export const MyTemplate" src/components/templates/MyTemplate.tsx
grep "MyTemplate" src/data/templateRegistry.ts
```

---

*This document is the authoritative technical reference for the trAIN Co platform.*

