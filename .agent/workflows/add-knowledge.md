---
description: Add domain knowledge to Tele (what Tele knows about)
---

# Add Knowledge Workflow

When adding new domain knowledge that Tele should know about, update `public/tele-knowledge.md`.

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

2. Open `public/tele-knowledge.md` and find the appropriate section

// turbo
3. Check current line count:
   ```bash
   wc -l public/tele-knowledge.md
   ```
   **Target: ~150 lines max (token efficiency)**

4. Add knowledge in compact notation format:
   ```markdown
   key:value|another value
   nested-key:
     sub-key:{property1,property2}
   ```

5. Keep it concise:
   - ✅ Compact notation, not paragraphs
   - ✅ Use pipes (|) for multiple values
   - ✅ Use colons (:) for key-value pairs
   - ✅ Include what Tele should SAY about this topic
   - ❌ No redundant information already in public/glass-prompt.md

// turbo
6. Verify the file is under 150 lines:
   ```bash
   wc -l public/tele-knowledge.md
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

## Don't Forget
- ✅ Keep public/tele-knowledge.md ≤ 150 lines (token efficiency)
- ✅ Knowledge should be WHAT Tele knows, not HOW Tele shows it (that's public/glass-prompt.md)
- ✅ Use compact notation (key:value|key2:value2)
- ✅ Update the version number at the end of the file
- ✅ Maintain the ---SECTION--- format for organization
