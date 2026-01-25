---
description: Define the ordered journey your tele guides users through — 7 steps or fewer
---

# Set Journey Workflow

A journey is the ordered path users take from START to GOAL. Each step has a dedicated template, image, and shot prompt (minimum 2 templateIds per shot prompt).

**This workflow also updates:**
- Welcome carousel cards (Index.tsx)
- Navigation menu items (Navigation.tsx)

## When to Use

- After setting the goal (`/set-goal`)
- Designing a new user flow
- Restructuring an unfocused tele
- Before hackathon demo prep

---

## 🚨 CRITICAL CONSTRAINTS

### 1. Maximum 7 Steps
Journeys with too many steps overwhelm users and bloat prompts.

### 2. Journey Must End in Goal
The final step MUST achieve the goal defined in `/set-goal`. 

**⚠️ WARN USER:** If the journey's final step doesn't clearly achieve the goal, stop and ask: *"Your journey ends at [Step N], but your goal is [Goal]. Does this step achieve the goal? If not, restructure the journey."*

### 3. Maximum 30 Templates
Total templates in `src/components/templates/` must not exceed 30.

### 4. Maximum 12 Shot Prompts
Total shot prompts in `glass-prompt.md` must not exceed 12.

**⚠️ WARN USER:** If shot prompt count > 12:
1. List all shot prompts with their purpose
2. Identify which are NOT part of the journey
3. Delete the least important non-journey shot prompts
4. Keep the 7 journey steps + 5 utility shot prompts max

### 5. File Length Constraints (CHECK EVERY TIME)

| File | Max Lines | Action if Exceeded |
|------|-----------|-------------------|
| `tele-knowledge.md` | **500 lines** | Consolidate sections |
| `glass-prompt.md` | **1500 lines** | Remove non-journey shot prompts |

### 6. Minimum 2 TemplateIds Per Shot Prompt
Each journey step's shot prompt MUST use at least 2 different templateIds.

### 7. Template Variety Across Steps
The same template combination cannot be used for every step.

### 8. Template Reusability Mandate
Templates MUST be **generically named** so they can be reused when users go off-journey. The 5 utility shot prompts need templates that work for ANY context.

**Example:**
| ❌ Too Specific | ✅ Reusable |
|----------------|-------------|
| `HackathonTimeline` | `ProcessSteps` |
| `WealthPillars` | `AccordionList` |
| `SalesMetrics` | `CardGrid` |

**Audit Check:** Run `/audit-tele` to verify template naming after journey updates.

### 9. 🚨 MANDATORY: Journey Compliance Level

**⚠️ WARNING:** If the user does not set a compliance level, STOP and ask: *"What compliance level should this tele use for the journey? (HIGH/MEDIUM/LOW)"*

Every journey MUST have a **compliance level** that determines how strictly the tele guides users through the steps:

| Level | Behavior | Use Case |
|-------|----------|----------|
| **HIGH** | Tele actively steers user to next step. CTAs are prominent. Off-journey questions redirect. Every response pushes toward goal. | Sales funnels, onboarding, compliance training |
| **MEDIUM** | Tele suggests next step but allows exploration. CTAs present but not forceful. Off-journey questions answered, then guided back. | Product demos, educational content |
| **LOW** | Tele follows user's lead. Next steps offered but not pushed. User can explore freely. Goal is available but not forced. | Informational sites, exploratory tools, this tele |

**When compliance is set, update:**
1. `tele-knowledge.md` — Add `---COMPLIANCE---` section with level and behavior rules
2. `glass-prompt.md` — Adjust TELE SAYS patterns to match compliance

**Example updates by level:**

**HIGH Compliance:**
```markdown
# tele-knowledge.md
---COMPLIANCE---
Level: HIGH
Behavior: Always suggest next step. Redirect off-journey. Push toward goal.

# glass-prompt.md (TELE SAYS patterns)
TELE SAYS: "...[content]... Ready for the next step? Let's move to [Step N]."
```

**MEDIUM Compliance:**
```markdown
# tele-knowledge.md
---COMPLIANCE---
Level: MEDIUM
Behavior: Suggest next step. Answer off-journey, then guide back.

# glass-prompt.md (TELE SAYS patterns)
TELE SAYS: "...[content]... Would you like to explore [Step N] next, or is there something else?"
```

**LOW Compliance:**
```markdown
# tele-knowledge.md
---COMPLIANCE---
Level: LOW
Behavior: Follow user's lead. Offer options without pushing. Goal available when ready.

# glass-prompt.md (TELE SAYS patterns)
TELE SAYS: "...[content]... Where would you like to go from here?"
```

---

## Journey Anatomy

```
┌─────────────────────────────────────────────────────────────────────┐
│  JOURNEY: [Name]                                                    │
│  GOAL: [What user achieves at the end]                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  STEP 1: [Name]                                                    │
│  ├── Welcome Carousel Card (Index.tsx)                             │
│  ├── Navigation Menu Item (Navigation.tsx)                         │
│  ├── Dedicated Template + Image                                    │
│  └── Shot Prompt (2+ templateIds)                                  │
│                           │                                         │
│                           ▼                                         │
│  ...                                                                │
│                           │                                         │
│                           ▼                                         │
│  STEP N: [GOAL ACHIEVED] ⚠️ MUST match /set-goal                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Steps

### Step 1: Check Prerequisites & Constraints

// turbo
1. Verify goal is set:
   ```bash
   grep "Primary Goal:" public/prompts/tele-knowledge.md
   ```

2. Check current file lengths:
   ```bash
   wc -l public/prompts/tele-knowledge.md public/prompts/glass-prompt.md
   ```
   
3. Count current shot prompts:
   ```bash
   grep -c "^### " public/prompts/glass-prompt.md
   ```

4. Count current templates:
   ```bash
   ls -1 src/components/templates/*.tsx | wc -l
   ```

**⚠️ CONSTRAINT CHECK:**
- tele-knowledge.md ≤ 500 lines
- glass-prompt.md ≤ 1500 lines  
- Shot prompts ≤ 12
- Templates ≤ 30

If any exceeded, address BEFORE proceeding.

---

### Step 2: Define Journey Steps (Max 7)

1. Validate journey steps from user input:
   - [+] 7 steps or fewer
   - [+] Clear progression
   - [+] **FINAL STEP = GOAL**
   - [-] No circular loops

2. **⚠️ GOAL CHECK:** Final step must achieve the goal from ---GOAL--- section.

---

### Step 3: Update Welcome Carousel (Index.tsx)

// turbo
1. Open `src/pages/Index.tsx`

2. Find `WELCOME_VARIANTS` array (around line 35-90)

3. Update the `cards` array to match journey steps:

```typescript
const WELCOME_VARIANTS = [
  {
    badge: "JOURNEY",
    title: "[Journey Name]",
    subtitle: "[Journey subtitle]",
    generativeSubsections: [
      {
        id: "journey-carousel",
        templateId: "WelcomeCarousel",
        props: {
          autoPlayInterval: 60000,
          cards: [
            {
              question: "[Step 1 Question]",
              subtext: "[Step 1 Subtitle]",
              imageUrl: "/assets/carousel-slide-01.png",
              actionPhrase: "[Step 1 trigger phrase]"
            },
            {
              question: "[Step 2 Question]",
              subtext: "[Step 2 Subtitle]",
              imageUrl: "/assets/carousel-slide-02.png",
              actionPhrase: "[Step 2 trigger phrase]"
            },
            // ... one card per journey step
            {
              question: "[Final Step - GOAL]",
              subtext: "[Goal description]",
              imageUrl: "/assets/carousel-slide-07.png",
              actionPhrase: "[Goal trigger phrase]"
            }
          ]
        }
      }
    ]
  }
];
```

4. Ensure carousel has exactly as many cards as journey steps (max 7)

---

### Step 4: Update Navigation Menu (Navigation.tsx)

// turbo
1. Open `src/components/Navigation.tsx`

2. Find `navItems` array (around line 41-80)

3. Update menu items to reflect key journey steps + REPO link:

```typescript
const navItems: Array<{
  id: string;
  label: string;
  teleQuery?: string;
  externalUrl?: string;
  isHighlighted?: boolean;
}> = [
  {
    id: 'repo',
    label: '📦 GET THE REPO',
    externalUrl: 'https://github.com/mobeus/mobeus-university',
    isHighlighted: true  // Goal CTA always highlighted
  },
  {
    id: 'step-1',
    label: '[STEP 1 LABEL]',
    teleQuery: '[Step 1 actionPhrase]'
  },
  {
    id: 'step-3',
    label: '[STEP 3 LABEL]',  // Skip some steps - max 6 nav items
    teleQuery: '[Step 3 actionPhrase]'
  },
  // ... key journey milestones (not all 7)
];
```

4. **Rules:**
   - REPO link always first and highlighted (goal CTA)
   - Max 6-7 nav items total
   - Select most important journey steps (not all 7)
   - Use short labels (1-2 words, ALL CAPS)

---

### Step 5: Create/Update Shot Prompts (Max 12 Total)

// turbo
1. Count existing shot prompts:
   ```bash
   grep -c "^### " public/prompts/glass-prompt.md
   ```

2. **⚠️ If count > 5 (non-journey):**
   - Journey needs 7 shot prompts
   - Only 5 slots left for utilities
   - Delete the least important non-journey shot prompts

3. Journey shot prompts structure:
   - `## JOURNEY SHOT PROMPTS` section
   - 7 shot prompts (one per step)
   - Each with 2+ templateIds

4. Utility shot prompts (max 5):
   - Home/Welcome
   - About/Company
   - Help/FAQ
   - Project Structure
   - Templates Overview

---

### Step 6: Verify File Length Constraints

// turbo
1. Check final line counts:
   ```bash
   wc -l public/prompts/tele-knowledge.md public/prompts/glass-prompt.md
   ```

2. **⚠️ If tele-knowledge.md > 500 lines:**
   - Consolidate redundant sections
   - Remove duplicate information
   - Use compact notation

3. **⚠️ If glass-prompt.md > 1500 lines:**
   - Remove non-essential shot prompts
   - Consolidate similar shot prompts
   - Keep journey shot prompts (priority)

---

### Step 7: Verify and Publish

// turbo
1. Final constraint check:
   ```bash
   echo "=== CONSTRAINT CHECK ===" && \
   echo "tele-knowledge.md: $(wc -l < public/prompts/tele-knowledge.md) lines (max 500)" && \
   echo "glass-prompt.md: $(wc -l < public/prompts/glass-prompt.md) lines (max 1500)" && \
   echo "Shot prompts: $(grep -c '^### ' public/prompts/glass-prompt.md) (max 12)" && \
   echo "Templates: $(ls -1 src/components/templates/*.tsx | wc -l) (max 30)"
   ```

2. TypeScript check:
   ```bash
   npx tsc --noEmit
   ```

3. Publish:
   ```bash
   node scripts/publish.cjs
   ```

---

## Verification Checklist

```
□ Journey has ≤ 7 steps
□ Final step achieves the ---GOAL---
□ Welcome carousel updated (Index.tsx)
□ Navigation menu updated (Navigation.tsx)
□ Shot prompts ≤ 12 total (7 journey + 5 utility)
□ Templates are generically named (reusable)
□ tele-knowledge.md ≤ 500 lines
□ glass-prompt.md ≤ 1500 lines
□ Templates ≤ 30
□ Each shot prompt uses ≥ 2 templateIds
□ TypeScript compiles
□ /audit-tele executed (full alignment check)
□ /publish executed
```

---

## Quick Reference

| Constraint | Limit | Action if Exceeded |
|------------|-------|-------------------|
| Journey Steps | ≤ 7 | Consolidate steps |
| Shot Prompts | ≤ 12 | Remove non-journey prompts |
| tele-knowledge.md | ≤ 500 lines | Consolidate content |
| glass-prompt.md | ≤ 1500 lines | Remove prompts |
| Templates | ≤ 30 | Delete unused |
| Nav Items | ≤ 7 | Select key steps |
| Carousel Cards | = Journey Steps | Match 1:1 |

---

## Files Modified by This Workflow

| File | What Changes |
|------|--------------|
| `public/prompts/tele-knowledge.md` | ---JOURNEY--- section |
| `public/prompts/glass-prompt.md` | Journey shot prompts |
| `src/pages/Index.tsx` | WELCOME_VARIANTS carousel |
| `src/components/Navigation.tsx` | navItems menu |
