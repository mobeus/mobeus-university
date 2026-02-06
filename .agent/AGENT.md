# 🤖 Mobeus University — Project Authority

> **This Tele:** Consumer brand experience for Mobeus  
> **Goal:** Get users to sign up for the Launch Event  
> **Message:** Help is here. The Screen Finally Cares.

---

## 🎯 THE SINGULAR GOAL

**Get visitors to sign up for the Launch Event (March/April 2026)**

Every template, shot prompt, and user interaction must drive toward this goal.

---

## 🧠 PROJECT IDENTITY

### Who We Are
- **Company:** Mobeus
- **Platform:** Teleglass (conversational labor platform)
- **Tagline:** "Help is here."
- **Message:** "The Screen Finally Cares"

### Who This Tele Is For
- **Primary:** Consumers and prospects
- **NOT FOR:** Developers, technical audiences, students

### Persona: Catherine
The Runtime Agent that demonstrates what conversational labor can do.

---

## 📊 CURRENT STATE

Run `/audit-tele` for live metrics. Expected healthy state:

```
✅ 30 templates (documented, validated)
✅ 12-24 shot prompts (journey-aligned)
✅ tele-knowledge.md: <500 lines
✅ glass-prompt.md: <1500 lines
✅ 0 template validation errors
✅ 0 frontend alignment errors
✅ TypeScript compiles cleanly
```

---

## 🗺️ THE JOURNEY

**5 Steps to Launch Event Signup:**

1. **Land** → Meet Catherine, see what a tele is
2. **Learn** → Understand Mobeus and "The Screen Finally Cares"
3. **See** → Watch examples of teles in action
4. **Feel** → Get excited about the impact
5. **Act** → Sign up for the Launch Event

**Compliance Level:** LOW — Visitors explore freely. We guide gently toward the goal but don't force a path.

---

## 📐 THE 6 IMMUTABLE LAWS

1. **VOLUMETRIC NAVIGATION** — Every clickable calls `notifyTele(actionPhrase)`
2. **TOOL CALL MANDATORY** — Catherine calls `navigateToSection` in EVERY response
3. **NO HALLUCINATION** — Use facts from `tele-knowledge.md` only
4. **TOOL SIGNATURE STABILITY** — `navigateToSection` format never changes
5. **GOAL ORIENTATION** — Everything drives toward Launch Event signup
6. **TEMPLATE DOCUMENTATION COMPLIANCE** — Props must match TypeScript interfaces EXACTLY
   - ZERO warnings allowed
   - Run validators before ANY changes
   - This is non-negotiable

---

## 🔧 DEVELOPMENT WORKFLOWS

### Setup (Once)
```bash
/set-goal      # Already done: Launch Event signup
/set-journey   # Already done: 5-step journey
```

### Day-to-Day Development
```bash
/add-knowledge → /audit-tele → /publish
/add-skill → /audit-tele → /publish  
/add-glass → /audit-tele → /publish
```

### Health Checks
```bash
/audit-tele    # Run before every publish
               # Run after major changes
               # Run before demos
```

---

## 📁 KEY FILES

| File | Purpose | Max Size |
|------|---------|----------|
| `public/prompts/tele-knowledge.md` | What Catherine knows | 500 lines |
| `public/prompts/glass-prompt.md` | How Catherine responds | 1500 lines |
| `src/pages/Index.tsx` | Welcome experience | - |
| `src/components/Navigation.tsx` | Main navigation | - |
| `src/assets/` | Branding (logo, images) | - |

---

## 🔒 PROTECTED FILES — NEVER DELETE

**These files are SACRED and must NEVER be deleted:**

### Core Prompt Files (The Brain)
- ✅ `public/prompts/tele-knowledge.md` — The tele's knowledge, mission, and personality
- ✅ `public/prompts/glass-prompt.md` — Template schemas and shot prompt examples

**Why Protected:**
- These files define the tele's entire intelligence
- Deleting them breaks the conversational experience
- They should be modified/updated, NEVER deleted
- Even during cleanup or refactoring, these stay

**RULE:** If you're cleaning up the project and see deletion suggestions for these files, **REJECT** them.

---

## 🎨 DESIGN SYSTEM — Rule of 3

### Colors
- **Primary (Purple):** `#A78BFA` - CTAs, accents
- **Secondary (Cyan):** `#67E8F9` - Links, info
- **Accent (Pink):** `#F472B6` - Highlights
- **Flamingo:** Used for primary CTAs
- **Sapphire:** Used for secondary elements

### Glass Classes (15 Total)
**3 levels × 5 colors:**
- Neutral: `glass-light`, `glass-medium`, `glass-heavy`
- Dark: `glass-light-dark`, `glass-medium-dark`, `glass-heavy-dark`
- Primary: `glass-light-primary`, `glass-medium-primary`, `glass-heavy-primary`
- Secondary: `glass-light-secondary`, `glass-medium-secondary`, `glass-heavy-secondary`
- Accent: `glass-light-accent`, `glass-medium-accent`, `glass-heavy-accent`

**Legacy classes (deprecated):** glass-subtle, glass-strong, glass-prominent

---

## ✅ VALIDATION SYSTEM

### Two Validators Run on Every Audit:

**1. Template Documentation Validator**
- File: `scripts/validate-template-docs.cjs`
- Checks: glass-prompt.md examples match TypeScript interfaces
- Standard: ZERO warnings allowed

**2. Frontend Alignment Validator**
- File: `scripts/validate-frontend-alignment.cjs`
- Checks: Index.tsx, Navigation.tsx aligned with brand/goal
- Validates: "Help is here" present, Launch Event CTAs, volumetric navigation

---

## 🚫 ANTI-GOALS

**What This Tele is NOT:**
- ❌ Teaching hackathon curriculum (removed)
- ❌ Deep technical architecture docs
- ❌ Development workflow tutorials
- ❌ How to build teles guide

**This is a CONSUMER brand experience, not a developer tool.**

---

## 📊 SHOT PROMPT STRATEGY

### Coverage (12-24 Total)

**Journey-Aligned Prompts:**
1. **Friction (Land)** - "This is frustrating" → Show the problem
2. **Solution (Learn)** - "What is Mobeus?" → Explain the vision
3. **Examples (See)** - "Show me examples" → Demo real use cases
4. **Impact (Feel)** - "Why does this matter?" → Share the mission
5. **Action (Act)** - "When does this launch?" → Drive to signup

**Supporting Prompts:**
- Help/Start commands
- Company info
- Product details
- FAQs

Every prompt must:
- ✅ Use 2-3 templates (rich visual experience)
- ✅ Be conversational (warm, helpful)
- ✅ End with CTA toward Launch Event
- ✅ Validate props before adding

---

## 🎯 TEMPLATES (30 Core)

**5 Core:** Hero, Stats, Trio, Banner, Story  
**5 Layout:** Carousel, WelcomeCarousel, Split, Grid, Accordion  
**5 Content:** Showcase, Guide, List, Timeline, Form  
**4 Comparison:** Compare, Quote, Metric, Steps  
**1 Image:** ImageSingle  
**5 Data:** Table, Infographic, Article, Feature, Paragraph  
**1 Teaching:** Lesson  
**1 Rating:** Scorecard  
**3 Text:** TextImageLeft, TextImageRight, TwoColumns  

**All 30 are documented in glass-prompt.md with validated examples.**

---

## 🚀 DEPLOYMENT

### Pre-Deployment Checklist
```
□ /audit-tele passes (0 errors, 0 warnings)
□ TypeScript compiles (npx tsc --noEmit)
□ Templates render correctly
□ Launch Event CTAs present
□ Mobile responsive
```

### Deploy to Runtime
```bash
node scripts/publish.cjs
```

### Deploy Frontend
```bash
npm run build
# Deploy dist/ to Vercel/Netlify/etc
```

---

## 📈 SUCCESS METRICS

**Goal:** Launch Event signups

**Leading Indicators:**
- Session duration
- Template interactions
- CTA clicks
- "Launch Event" mentions in chat

**Tracking:** Analytics should show path from first message → signup

---

## 🔄 MAINTENANCE

### Weekly
- Run `/audit-tele`
- Check for TypeScript errors
- Review analytics

### Monthly
- Update knowledge with new facts/stats
- Add new shot prompts based on user questions
- Optimize journey based on drop-off points

### Before Major Releases
- Full `/audit-tele`
- Test all shot prompts
- Verify mobile experience
- Check asset optimization

---

## 🆘 TROUBLESHOOTING

| Issue | Solution |
|-------|----------|
| Templates not rendering | Run `/audit-tele` - check validation |
| Props mismatch errors | Review glass-prompt.md examples |
| Frontend out of sync | Run `validate-frontend-alignment.cjs` |
| TypeScript errors | `npx tsc --noEmit` |
| Old branding showing | Check for "Teleco", "handle" in code |

---

## 📞 CRITICAL CONTACTS

**Repository:** mobeus/mobeus-university  
**Runtime API:** Teleglass platform  
**Port:** 3131 (local dev)

---

_Help is here. The Screen Finally Cares._

**v100.0 | Mobeus University | January 2026**
