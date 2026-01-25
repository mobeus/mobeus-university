---
description: Define the singular goal your tele must achieve — updates knowledge, templates, and prompts
---

# Set Goal Workflow

Every tele has ONE goal. This workflow defines that goal and aligns all components to achieve it.

## When to Use

- Starting a new tele project
- Pivoting an existing tele's purpose
- Clarifying a vague or scattered tele direction
- Before hackathon demo prep

## [!] CRITICAL: One Goal Only

A tele with multiple goals becomes unfocused. This workflow enforces a **singular, measurable goal**.

**Good goals:**
- "Help users find and apply for jobs matching their skills"
- "Guide hackathon participants through building their first tele"
- "Convert visitors into demo requests for enterprise sales"

**Bad goals:**
- "Be helpful" (too vague)
- "Answer questions and show products and schedule demos" (multiple goals)

---

## Steps

### Step 1: Define the Goal

1. Ask the user: **"What is the ONE thing this tele must accomplish?"**

2. Validate the goal meets these criteria:
   - [+] Specific and measurable
   - [+] Single outcome (not compound)
   - [+] User-centric (describes what USER achieves)
   - [-] Not a feature list
   - [-] Not technology-focused

3. Refine until clear. Example refinement:
   ```
   User: "Help with jobs"
   → "Help users find jobs matching their skills and apply with one click"
   ```

---

### Step 2: Update tele-knowledge.md

// turbo
1. Open `public/prompts/tele-knowledge.md`

2. Find or create the `---GOAL---` section at the TOP of the file (after frontmatter)

3. Add/replace the goal block:
   ```markdown
   ---GOAL---
   
   **Primary Goal:** [The refined goal statement]
   
   **Success Metric:** [How we know the goal is achieved]
   
   **User Journey:** [Start state] → [End state]
   
   ---
   ```

4. Example:
   ```markdown
   ---GOAL---
   
   **Primary Goal:** Guide hackathon participants to build and demo their first tele in 3 hours
   
   **Success Metric:** Participant completes all 6 phases and presents a working demo
   
   **User Journey:** Curious beginner → Confident tele builder presenting on stage
   
   ---
   ```

---

### Step 3: Evaluate Templates

// turbo
1. List all templates in `src/components/templates/`
   ```bash
   ls -1 src/components/templates/*.tsx | head -30
   ```

2. For each template, assess:
   - **Supports Goal**: Template directly helps achieve the goal
   - **Neutral**: Template is utility (navigation, layout)
   - **Distracts**: Template pulls user away from goal

3. Create a goal alignment table in your analysis:
   ```
   | Template | Alignment | Notes |
   |----------|-----------|-------|
   | HackathonTimeline | SUPPORTS | Core journey visualization |
   | ReadinessCheck | SUPPORTS | Validates preparation |
   | CardGrid | NEUTRAL | Navigation utility |
   | [SomeTemplate] | DISTRACTS | Remove from shot prompts |
   ```

4. For DISTRACTING templates:
   - Don't delete the template file
   - Remove or deprioritize from glass-prompt.md shot prompts
   - Consider if they should be accessible but not prominently shown

---

### Step 4: Align Shot Prompts

// turbo
1. Open `public/prompts/glass-prompt.md`

2. Review every shot prompt and ask:
   > "Does this response move the user toward the goal?"

3. For each shot prompt, take one action:

   **KEEP**: Directly supports goal
   - No changes needed
   
   **ADJUST**: Related but unfocused
   - Add goal-oriented CTA to TELE SAYS
   - Add actionPhrase pointing toward goal
   
   **DEPRIORITIZE**: Off-topic but useful
   - Move to bottom of file
   - Keep for edge cases
   
   **REMOVE**: Actively distracts from goal
   - Delete the shot prompt entirely

4. Add goal-reminder to home/welcome shot prompt:
   ```markdown
   TELE SAYS: "[Natural greeting that references the goal]"
   ```

---

### Step 5: Add Goal-Oriented CTAs

1. Review templates that SUPPORT the goal

2. Ensure every template ends with a goal-advancing CTA:
   ```json
   {
     "ctaLabel": "[Action toward goal]",
     "ctaActionPhrase": "[Next step in journey]"
   }
   ```

3. Check that the "happy path" is clear:
   - User lands → sees goal-aligned welcome
   - Each click → moves toward goal
   - Goal achieved → celebration + next action

---

### Step 6: Verify Alignment

// turbo
1. Check line counts:
   ```bash
   wc -l public/prompts/tele-knowledge.md public/prompts/glass-prompt.md
   ```

2. Search for goal references:
   ```bash
   grep -i "goal" public/prompts/tele-knowledge.md
   ```

3. Run TypeScript check:
   ```bash
   npx tsc --noEmit
   ```

---

## Goal Section Template

Copy this into `tele-knowledge.md`:

```markdown
---GOAL---

**Primary Goal:** [What the user will achieve]

**Success Metric:** [Measurable outcome]

**User Journey:** [Start] → [Middle checkpoints] → [End state]

**Anti-Goals (what this tele does NOT do):**
- [Thing that distracts from goal]
- [Another distraction to avoid]

---
```

---

## [!] Common Mistakes

### 1. Compound Goals
```
[-] "Help users find jobs AND build resumes AND practice interviews"
[+] "Help users find and apply for jobs matching their skills"
```

### 2. Vague Goals
```
[-] "Be a helpful assistant"
[+] "Convert demo visitors into scheduled sales calls"
```

### 3. Technology-Focused Goals
```
[-] "Use AI to display templates"
[+] "Guide users through the hackathon phases"
```

### 4. Forgetting to Update Shot Prompts
```
[-] Updated tele-knowledge.md only
[+] Updated tele-knowledge.md AND aligned glass-prompt.md
```

---

## Verification Checklist

After setting a goal, verify ALL boxes:

```
□ Goal is singular (not compound)
□ Goal is measurable
□ ---GOAL--- section added to tele-knowledge.md
□ Templates evaluated for alignment
□ Shot prompts reviewed and adjusted
□ Home/welcome includes goal reference
□ Happy path is clear (each click → goal)
□ TypeScript compiles: npx tsc --noEmit
□ /audit-tele executed to verify alignment
□ /publish executed to deploy changes
```

---

## Example: Mobeus University Goal

```markdown
---GOAL---

**Primary Goal:** Prepare hackathon participants to build and present their first tele in 3 hours

**Success Metric:** Participant completes readiness assessment at 80%+ and understands wire commands

**User Journey:** 
Curious newcomer → Understands teles → Knows architecture → Ready for hackathon → Confident builder

**Anti-Goals:**
- Teaching advanced customization (that's for post-hackathon)
- Deep-diving into code implementation (Claude handles that)
- Covering non-hackathon use cases

---
```
