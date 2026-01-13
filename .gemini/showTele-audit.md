# showTele Audit - Adding Interactive Actions to All Templates

**Date:** January 9, 2026  
**Objective:** Ensure EVERY clickable element in ALL templates has a `showTele` action to enable conversation progression.

---

## 🚨 IMPLEMENTATION STRATEGY

For each template, we need to:
1. **Identify all clickable elements** (buttons, cards, links, interactive areas)
2. **Add `actionPhrase` or `teleText` prop** to template interfaces
3. **Wire up `showTele` calls** using `notifyTele()` from `@/utils/acknowledgmentHelpers`
4. **Update glass-prompt.md** to document the new interactive properties

---

## 📋 TEMPLATE AUDIT RESULTS

### ✅ ALREADY COMPLIANT (Have showTele)
These templates already implement showTele properly:

1. **ActionCarousel** ✅ - Cards and buttons use `actionPhrase`
2. **JobsGrid** ✅ - Job cards use `showTele`
3. **JobDetail** ✅ - Apply button uses `applyTeleText`
4. **ApplicationsTracker** ✅ - Cards use `showTele`
5. **InterviewsTracker** ✅ - Cards use `showTele`
6. **InterviewScheduler** ✅ - Has `showTele` actions
7. **SkillQuiz** ✅ - Options use `showTele`
8. **PracticeQuestion** ✅ - Options use `showTele`
9. **ObjectivesList** ✅ - Items use `showTele`
10. **CourseOverview** ✅ - Domain cards use `actionPhrase`
11. **DomainCard** ✅ - Task statements use `showTele`
12. **RecruiterAnalytics** ✅ - KPIs, jobs, trends all use `actionPhrase`
13. **RecruiterDashboard** ✅ - All actions use `teleText`
14. **RecruiterJobDetail** ✅ - Actions use `showTele`
15. **CandidatePipeline** ✅ - Candidate cards use `showTele`
16. **AnalyticsDashboard** ✅ - Metrics use `showTele`
17. **TasksList** ✅ - Tasks use `showTele`
18. **ServiceReference** ✅ - Service cards use `actionPhrase`
19. **ConceptExplainer** ✅ - Has examples with `showTele`
20. **LessonCarousel** ✅ - Step navigation uses `showTele`
21. **LessonSplit** ✅ - Buttons use `actionPhrase`
22. **CelebrationCard** ✅ - Next steps use `actionPhrase`
23. **LanguageFluencyTest** ✅ - Submit button uses `showTele`
24. **LanguageSkillsDisplay** ✅ - Language cards use `actionPhrase`

---

### ❌ NEEDS showTele IMPLEMENTATION

#### **1. CandidateHeader** 
**Missing interactions:**
- Edit Profile button - should allow user to say "I want to update my [field]"
- Profile photo click - suggest uploading new photo
- Contact info display - clicking should allow editing

**Recommended props to add:**
```typescript
interface CandidateHeaderProps {
  // ... existing props
  editActionPhrase?: string; // e.g., "I want to edit my profile"
  photoActionPhrase?: string; // e.g., "I want to change my profile picture"
  emailActionPhrase?: string; // e.g., "Update my email address"
  phoneActionPhrase?: string; // e.g., "Update my phone number"
}
```

---

#### **2. SkillsProfile**
**Missing interactions:**
- Individual skill cards - clicking should allow user to drill down or update skill level
- Category headers - clicking should filter or explain category
- Empty state - should suggest adding skills

**Recommended props to add:**
```typescript
interface Skill {
  // ... existing props
  actionPhrase?: string; // e.g., "Tell me more about my Python skills"
}

interface SkillsProfileProps {
  // ... existing props
  categoryActionPhrase?: string; // e.g., "Tell me about my {category} skills"
  addSkillActionPhrase?: string; // e.g., "I want to add a new skill"
}
```

---

#### **3. WorkHistory**
**Missing interactions:**
- Individual job cards - clicking should allow user to expand details or edit
- Timeline dots - clicking should jump to that period
- Empty state - should prompt user to add experience

**Recommended props to add:**
```typescript
interface JobEntry {
  // ... existing props
  actionPhrase?: string; // e.g., "Tell me more about my time at {company}"
}

interface WorkHistoryProps {
  // ... existing props
  addWorkActionPhrase?: string; // e.g., "I want to add work experience"
}
```

---

#### **4. CertificationsList**
**Missing interactions:**
- Certification cards - clicking should show details or verification status
- "View Credential" links - already have hrefs, but should also notify Tele
- Status badges - clicking could explain what the status means
- Empty state - should prompt adding certifications

**Recommended props to add:**
```typescript
interface Certification {
  // ... existing props
  actionPhrase?: string; // e.g., "Tell me about my {name} certification"
}

interface CertificationsListProps {
  // ... existing props
  addCertActionPhrase?: string; // e.g., "I want to add a certification"
  statusExplanationPhrase?: string; // e.g., "What does {status} mean?"
}
```

---

#### **5. EducationHistory**
**Missing interactions:**
- Education cards - clicking should allow expansion or editing
- Verified badge - clicking should explain verification
- Empty state - should prompt adding education

**Recommended props to add:**
```typescript
interface Degree {
  // ... existing props
  actionPhrase?: string; // e.g., "Tell me about my degree from {institution}"
}

interface EducationHistoryProps {
  // ... existing props
  addEducationActionPhrase?: string; // e.g., "I want to add my education"
}
```

---

#### **6. DocumentsStatus**
**Missing interactions:**
- Upload button - should prompt user about what to upload
- Download buttons - should notify Tele when clicked
- Document cards - clicking should show details or update status
- Status badges - clicking should explain status

**Recommended props to add:**
```typescript
interface Document {
  // ... existing props
  actionPhrase?: string; // e.g., "Show me details about {name}"
  downloadActionPhrase?: string; // e.g., "I want to download {name}"
}

interface DocumentsStatusProps {
  // ... existing props
  uploadActionPhrase?: string; // e.g., "I want to upload a document"
}
```

---

#### **7. CandidateSummary**
**Missing interactions:**
- Highlight cards - clicking should explain the metric
- Career objective section - clicking should allow editing
- Empty state - should prompt user to share background

**Recommended props to add:**
```typescript
interface CandidateSummaryProps {
  // ... existing props
  editSummaryActionPhrase?: string; // e.g., "I want to update my summary"
  editObjectiveActionPhrase?: string; // e.g., "I want to update my career objective"
  highlightActionPhrase?: string; // e.g., "Tell me more about {label}"
}
```

---

#### **8. DocumentUploader**
**Missing interactions:**
- Upload zone click - should guide user on what documents are needed
- File type badges - clicking should explain what formats are accepted
- Upload button - should prompt for specific document type

**Recommended props to add:**
```typescript
interface DocumentUploaderProps {
  // ... existing props  
  uploadActionPhrase?: string; // e.g., "I want to upload my {requestedDocument}"
  helpActionPhrase?: string; // e.g., "What documents do I need?"
}
```

---

#### **9. SkillsAssessment**
**Missing interactions:**
- Skill cards - clicking should start assessment for that skill
- Assessment status - clicking should show progress
- Category filters - clicking should filter skills

**Recommended props to add:**
```typescript
interface SkillItem {
  // ... existing props
  actionPhrase?: string; // e.g., "I want to test my {name} skills"
}

interface SkillsAssessmentProps {
  // ... existing props
  categoryActionPhrase?: string; // e.g., "Show me {category} assessments"
}
```

---

#### **10. FlashcardDeck**
**Missing interactions:**
- Previous/Next buttons - should notify Tele of navigation
- Mark as Mastered button - should celebrate and potentially suggest next steps
- Flashcard flip - could mention current state

**Recommended props to add:**
```typescript
interface FlashcardDeckProps {
  // ... existing props
  nextActionPhrase?: string; // e.g., "Next flashcard"
  prevActionPhrase?: string; // e.g., "Previous flashcard"
  masteredActionPhrase?: string; // e.g., "I've mastered {term}"
}
```

---

#### **11. StepByStep**
**Missing interactions:**
- Step cards - clicking should expand or navigate to that step
- Progress bar - clicking could show overall progress
- Completion checkmark - clicking completed steps could show details

**Recommended props to add:**
```typescript
interface Step {
  // ... existing props
  actionPhrase?: string; // e.g., "Show me details about {title}"
}

interface StepByStepProps {
  // ... existing props
  stepActionPhrase?: string; // e.g., "Go to step {stepNumber}"
}
```

---

#### **12. ImageGrid**
**Missing interactions:**
- Image cards - clicking should enlarge or explain image
- Badges - clicking should explain why this example matters
- Image hover - could add click-to-learn-more

**Recommended props to add:**
```typescript
interface ImageItem {
  // ... existing props
  actionPhrase?: string; // e.g., "Tell me about {label}"
}

interface ImageGridProps {
  // ... existing props
  imageClickAction?: string; // e.g., "Explain this example"
}
```

---

#### **13. VisualQuiz**
**Missing interactions:**
- Quiz answer selection - may already have, need to verify
- Submit button - should notify Tele
- Next question navigation - should prompt progression

**Need to verify implementation**

---

#### **14. CourseProgress**
**Missing interactions:**
- Domain cards - clicking should navigate to that domain
- Progress bars - clicking should show details
- Completion badges - clicking should celebrate

**Recommended props to add:**
```typescript
interface DomainProgress {
  // ... existing props
  actionPhrase?: string; // e.g., "Continue learning {domainTitle}"
}

interface CourseProgressProps {
  // ... existing props
  domainActionPhrase?: string; // e.g., "Show me domain {number}"
}
```

---

#### **15. AchievementUnlocked**
**Missing interactions:**
- Achievement card - clicking should show details
- Share button - should offer sharing options
- Next goal - should transition conversation

**Need to verify implementation**

---

#### **16. ProgressMilestone**
**Missing interactions:**
- Milestone card - clicking should explain significance
- Stat cards - clicking should drill down into metrics
- Encouragement action - should suggest next step

**Need to verify implementation**

---

## 🎯 PRIORITY ORDER FOR IMPLEMENTATION

### **Phase 1: Profile Templates** (Most frequently used)
1. ✏️ CandidateHeader
2. ✏️ SkillsProfile
3. ✏️ WorkHistory
4. ✏️ CandidateSummary

### **Phase 2: Credentials & Documents**
5. ✏️ CertificationsList
6. ✏️ EducationHistory
7. ✏️ DocumentsStatus
8. ✏️ DocumentUploader

### **Phase 3: Skills & Learning**
9. ✏️ SkillsAssessment
10. ✏️ FlashcardDeck
11. ✏️ StepByStep
12. ✏️ CourseProgress

### **Phase 4: UI/UX Enhancement**
13. ✏️ ImageGrid
14. ✏️ AchievementUnlocked
15. ✏️ ProgressMilestone
16. ✏️ VisualQuiz

---

## 🔧 IMPLEMENTATION PATTERN

For each template, follow this pattern:

### 1. Update Interface
```typescript
interface MyTemplateProps {
  // ... existing props
  primaryActionPhrase?: string;
  secondaryActionPhrase?: string;
  itemActionPhrase?: string; // For repeating items
}
```

### 2. Import Helper
```typescript
import { notifyTele } from "@/utils/acknowledgmentHelpers";
import { useSound } from "@/hooks/useSound";
```

### 3. Add Handler
```typescript
const { playClick } = useSound();

const handleAction = (phrase: string) => {
  playClick();
  notifyTele(phrase);
};
```

### 4. Wire Up Elements
```typescript
<button onClick={() => handleAction(editActionPhrase || "I want to edit this")}>
  Edit Profile
</button>
```

### 5. Update glass-prompt.md
```markdown
### MyTemplate Props
- `primaryActionPhrase` - Action when user clicks main button
- `itemActionPhrase` - Action for individual items (use {placeholder} for dynamic values)
```

---

## 📊 PROGRESS TRACKER

- **Total Templates:** 40
- **Already Compliant:** 24 (60%)
- **Need Implementation:** 16 (40%)
- **Critical (Phase 1):** 4
- **Important (Phase 2):** 4
- **Enhancement (Phase 3-4):** 8

---

## 🎨 BEST PRACTICES

1. **Always provide default phrases** - Don't require Tele to pass every single actionPhrase
2. **Use template literals** - Allow `{fieldName}` placeholders for dynamic text
3. **Group related actions** - Keep prop names consistent across templates
4. **Test the conversation flow** - Ensure each action leads to a natural next step
5. **Document in glass-prompt.md** - Update shot prompts to show usage

---

**Next Action:** Begin Phase 1 implementation with the 4 most critical profile templates.
