---
description: Generate comprehensive documentation for your tele — goal, journey, templates, and outcomes
---

# Document Tele Workflow

Creates a readable markdown documentation file that explains your tele to stakeholders, developers, or users. The documentation goes into `public/` and describes the goal, journey, templates, shot prompts, and opportunities for improvement.

## When to Use

- Before a demo or presentation
- Onboarding new team members
- Creating a handoff document
- Documenting for stakeholders who won't read code
- Creating training materials

## Output

Creates: `public/TELE-DOCUMENTATION.md`

---

## Steps

### Step 1: Gather Information

// turbo
1. **Read the goal and journey:**
   ```bash
   grep -A 20 "---GOAL---" public/prompts/tele-knowledge.md && \
   echo "" && \
   grep -A 50 "---JOURNEY---" public/prompts/tele-knowledge.md
   ```

2. **Get version and identity:**
   ```bash
   head -10 public/prompts/tele-knowledge.md && \
   grep -A 10 "## Identity" public/prompts/tele-knowledge.md
   ```

3. **List all shot prompts:**
   ```bash
   grep "^### " public/prompts/glass-prompt.md
   ```

4. **List all templates:**
   ```bash
   ls -1 src/components/templates/*.tsx | xargs -n1 basename | sed 's/.tsx$//'
   ```

---

### Step 2: Create the Documentation File

// turbo
Create `public/TELE-DOCUMENTATION.md` with this structure:

```markdown
# [Tele Name] Documentation

> Generated: [Date] | Version: [Version from knowledge file]

---

## 🎯 Goal

**Primary Goal:** [From ---GOAL--- section]

**Success Metric:** [How we know the goal is achieved]

**User Journey:** [Start state] → [End state]

---

## 🗺️ The Journey

Users move through **[N] steps** from start to goal:

| Step | Name | User State | What Happens |
|------|------|------------|--------------|
| 1 | [Step 1 Name] | [State] | [Description] |
| 2 | [Step 2 Name] | [State] | [Description] |
| ... | ... | ... | ... |
| N | **[Goal Step]** | **Ready** | **GOAL ACHIEVED** |

---

## 💬 Example Conversations

### Starting the Journey

```
USER: "What can I build?"

CATHERINE: "In 3 hours, you'll build a conversational product with a 
beginning, journey, and goal. You don't need deep coding — just speak 
and type. Want to see how?"

[Shows: ConceptCard with "The 3-Hour Promise"]
```

### Mid-Journey Interaction

```
USER: "What are wire commands?"

CATHERINE: "Wire commands are your power tools. Type /add-glass to 
create templates, /add-knowledge to teach facts, /tele-should to 
define responses. Ready to see what's inside a tele?"

[Shows: ProcessSteps with the five wire commands]
```

### Reaching the Goal

```
USER: "How do I start?"

CATHERINE: "You've completed the journey! Click the GitHub link to 
get the repo. Clone it, run npm install, start building. You get 
3 free hours. Deploy across SMS, phone, chat, voice, or avatar!"

[Shows: CTABanner with GitHub link + TalkingPoints + CardGrid of channels]
```

---

## 🎨 Template Library

This tele uses **[N] templates** to create visual experiences:

### Core Templates

| Template | Purpose | Used For |
|----------|---------|----------|
| `ConceptCard` | Explain a single concept with detail | Step 1, Step 3 |
| `ProcessSteps` | Show ordered steps or workflows | Step 2, Step 4 |
| `CardGrid` | Display multiple options/choices | Home, Step 3, Step 6 |
| `CTABanner` | Call-to-action with button | Every step (CTA) |
| `AccordionList` | Expandable content sections | Step 5 |
| `TalkingPoints` | Key points with details | Step 7 |

### Utility Templates

| Template | Purpose |
|----------|---------|
| `WelcomeCarousel` | Initial welcome experience |
| `KnowledgeFileViewer` | Show live knowledge file |
| `PromptFileViewer` | Show live prompt file |
| `FolderStructure` | Display project structure |

---

## 📝 Shot Prompts

The tele has **12 shot prompts** (7 journey + 5 utility):

### Journey Shot Prompts (7)

| # | Trigger | Templates Used | Purpose |
|---|---------|---------------|---------|
| 1 | "What can I build" | ConceptCard, CTABanner | Step 1: The Promise |
| 2 | "How do I build it" | ProcessSteps, CTABanner | Step 2: How to Build |
| 3 | "Core concepts" | CardGrid, CTABanner | Step 3: Core Concepts |
| 4 | "Wire commands" | ProcessSteps, CTABanner | Step 4: Wire Commands |
| 5 | "Anatomy of a tele" | AccordionList, CTABanner | Step 5: Anatomy |
| 6 | "Use cases" | CardGrid, CTABanner | Step 6: Use Cases |
| 7 | "How do I start" | CTABanner, TalkingPoints, CardGrid | Step 7: GOAL |

### Utility Shot Prompts (5)

| # | Trigger | Templates Used | Purpose |
|---|---------|---------------|---------|
| 1 | "Go home" / "Welcome" | CardGrid, CTABanner | Return to start |
| 2 | "About Mobeus" | SplitContent, CTABanner | Company info |
| 3 | "Show knowledge file" | KnowledgeFileViewer, CTABanner | Transparency |
| 4 | "Show prompt file" | PromptFileViewer, CTABanner | Transparency |
| 5 | "Project structure" | FolderStructure, CTABanner | Technical view |

---

## 📊 Metrics & Constraints

| Metric | Current | Limit | Status |
|--------|---------|-------|--------|
| tele-knowledge.md lines | [X] | 500 | ✅/⚠️ |
| glass-prompt.md lines | [X] | 1500 | ✅/⚠️ |
| Shot Prompts | [X] | 12 | ✅/⚠️ |
| Templates | [X] | 30 | ✅/⚠️ |
| Journey Steps | [X] | 7 | ✅/⚠️ |

---

## 🚀 Opportunities for Improvement

### Content Enhancements

1. **[Opportunity 1]**
   - Current: [What exists]
   - Improvement: [What could be better]
   - Impact: [Why it matters]

2. **[Opportunity 2]**
   - Current: [What exists]
   - Improvement: [What could be better]
   - Impact: [Why it matters]

### Template Enhancements

1. **[Template Enhancement]**
   - Could add: [Feature/capability]
   - Would enable: [New use case]

### Journey Refinements

1. **[Journey Refinement]**
   - Current friction: [What's hard]
   - Proposed fix: [How to improve]

---

## 🔧 Technical Reference

### Key Files

| File | Purpose |
|------|---------|
| `public/prompts/tele-knowledge.md` | What the tele knows |
| `public/prompts/glass-prompt.md` | How the tele responds |
| `src/pages/Index.tsx` | Welcome experience |
| `src/components/Navigation.tsx` | Menu items |
| `src/components/templates/` | All visual templates |

### Wire Commands

| Command | Purpose |
|---------|---------|
| `/add-glass` | Create new templates |
| `/add-knowledge` | Add domain knowledge |
| `/tele-should` | Define response patterns |
| `/set-goal` | Define the singular goal |
| `/set-journey` | Define the user journey |
| `/audit-tele` | Verify alignment |
| `/publish` | Deploy changes |

---

## 📅 Changelog

| Date | Change | Author |
|------|--------|--------|
| [Date] | Initial documentation | [Author] |

---

_Generated by /document-tele workflow_
```

---

### Step 3: Customize with Actual Data

After creating the template, fill in:

1. **From tele-knowledge.md:**
   - Goal, success metric, user journey
   - Identity/persona name
   - Version number
   - Journey steps (from ---JOURNEY--- section)

2. **From glass-prompt.md:**
   - All shot prompt triggers
   - Templates used in each shot prompt
   - Example TELE SAYS responses for dialogue examples

3. **From templates directory:**
   - Complete template list
   - Categorize by purpose

4. **Opportunities (analyze and suggest):**
   - Missing journey steps?
   - Templates that could be combined?
   - Shot prompts that overlap?
   - Knowledge gaps?

---

### Step 4: Verify the Documentation

// turbo
1. Check the file was created:
   ```bash
   ls -la public/TELE-DOCUMENTATION.md && \
   wc -l public/TELE-DOCUMENTATION.md
   ```

2. Verify it's readable:
   ```bash
   head -50 public/TELE-DOCUMENTATION.md
   ```

---

## Example Dialogue Patterns

When documenting conversations, use this format:

### Pattern 1: Simple Q&A
```
USER: "[Question]"

CATHERINE: "[Natural response with guidance to next step]"

[Shows: TemplateName with brief description of content]
```

### Pattern 2: Multi-Turn Flow
```
USER: "[Initial question]"

CATHERINE: "[Answer that guides to next topic]"

[Shows: Template1, Template2]

---

USER: "[Follow-up based on CTA click]"

CATHERINE: "[Builds on previous, advances journey]"

[Shows: Template3]
```

### Pattern 3: Off-Journey Recovery
```
USER: "[Random question not in journey]"

CATHERINE: "[Helpful answer] Let me show you something 
related. [Guides back to journey]"

[Shows: Utility template that connects back to journey]
```

---

## Opportunities Analysis Checklist

When filling the "Opportunities" section, analyze:

```
□ Are all journey steps equally strong?
□ Is any step too long or complex?
□ Are there gaps in the journey logic?
□ Could any templates be combined?
□ Are shot prompts too similar (merge them)?
□ Is the goal clearly achievable at step N?
□ Are there missing use cases?
□ Could the welcome experience be stronger?
□ Are CTAs compelling enough?
□ Is the persona voice consistent?
```

---

## Files Created by This Workflow

| File | Location | Purpose |
|------|----------|---------|
| `TELE-DOCUMENTATION.md` | `public/` | Main documentation |

---

## After Creating Documentation

1. **Review for accuracy** — Does it match the actual tele?
2. **Share with stakeholders** — Send the markdown or render as PDF
3. **Keep updated** — Re-run `/document-tele` after major changes
4. **Use for onboarding** — New team members start here

---

_Document Tele Workflow v1.0 | Mobeus University_
