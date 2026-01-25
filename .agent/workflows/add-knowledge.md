---
description: Add domain knowledge to Tele (what Tele knows about)
---

# Add Knowledge Workflow

When adding new domain knowledge that Tele should know about, update `public/prompts/tele-knowledge.md`.

## When to Use
- Adding information about new concepts or terminology
- Adding information about new features or capabilities
- Adding hackathon-related knowledge
- Adding platform-specific patterns
- Adding technical reference material

## Steps

1. Identify the knowledge type:
   - **Identity/Role** → ---IDENTITY--- section
   - **Architecture** → ---ARCHITECTURE--- section
   - **Templates** → ---TEMPLATES-REGISTRY--- section
   - **Curriculum** → ---CURRICULUM--- section
   - **Hackathon** → ---HACKATHON--- section
   - **Commands** → ---COMMANDS--- section

2. Open `public/prompts/tele-knowledge.md` and find the appropriate section

// turbo
3. Check current line count:
   ```bash
   wc -l public/prompts/tele-knowledge.md public/prompts/glass-prompt.md
   ```
   **Constraints:**
   - tele-knowledge.md: **≤ 500 lines**
   - glass-prompt.md: **≤ 1500 lines**

4. Add knowledge in compact notation format:
   ```markdown
   key:value|another value
   nested-key:
     sub-key:{property1,property2}
   ```

5. Keep it concise:
   - [+] Compact notation, not paragraphs
   - [+] Use pipes (|) for multiple values
   - [+] Use colons (:) for key-value pairs
   - [+] Include what Tele should SAY about this topic
   - [-] No redundant information already in public/prompts/glass-prompt.md

// turbo
6. Verify constraints:
   ```bash
   echo "tele-knowledge.md: $(wc -l < public/prompts/tele-knowledge.md) lines (max 500)" && \
   echo "glass-prompt.md: $(wc -l < public/prompts/glass-prompt.md) lines (max 1500)" && \
   echo "Shot prompts: $(grep -c '^### ' public/prompts/glass-prompt.md) (max 15)"
   ```

## Example: Adding a New Command

```markdown
---COMMANDS---
"What is a tele?"→ConceptCard
"Explain the architecture"→Two-agent diagram
"Show me the hackathon phases"→HackathonTimeline
"NEW COMMAND"→TemplateToShow
```

## Example: Adding Hackathon Phase

```markdown
---HACKATHON---
phases:
  1-voice-coding:0:00-0:30|Train tele by speaking in admin mode
  NEW-PHASE:TIMING|Description of what happens
```

## Constraints (Check Every Time)

| File | Max | Check |
|------|-----|-------|
| tele-knowledge.md | 500 lines | `wc -l public/prompts/tele-knowledge.md` |
| glass-prompt.md | 1500 lines | `wc -l public/prompts/glass-prompt.md` |
| Shot Prompts | 12 | `grep -c '^### ' public/prompts/glass-prompt.md` |

## Don't Forget
- [+] Keep public/prompts/tele-knowledge.md ≤ **500 lines**
- [+] Knowledge should be WHAT Tele knows, not HOW Tele shows it
- [+] Use compact notation (key:value|key2:value2)
- [+] Update the version number at the end of the file
- [+] Maintain the ---SECTION--- format for organization
- [+] Use consistent naming/spelling across all files

## After Adding Knowledge

// turbo
1. Run `/audit-tele` to verify alignment:
   ```bash
   echo "=== ALIGNMENT CHECK ===" && \
   echo "Lines: $(wc -l < public/prompts/tele-knowledge.md) / 500" && \
   grep "Primary Goal:\|---GOAL---\|---JOURNEY---" public/prompts/tele-knowledge.md
   ```

2. Run `/publish` to deploy changes
