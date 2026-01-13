---
description: Add domain knowledge to Tele (what Tele knows about)
---

# Add Knowledge Workflow

When adding new domain knowledge that Tele should know about, update `tele-knowledge.md`.

## When to Use
- Adding information about new events (LEAP, conferences)
- Adding information about new programs or services
- Adding Vision 2030 context
- Adding recruiter-specific knowledge
- Adding industry/sector knowledge

## Steps

1. Identify the knowledge type:
   - **Journey Knowledge** → Section 3 (THE 8-STEP TALENT JOURNEY)
   - **Vision 2030 Context** → Section 2 (THE VISION 2030 MISSION)
   - **Recruiter Knowledge** → Recruiter Mode section
   - **Event Knowledge** → Add new section or inline

2. Open `tele-knowledge.md` and find the appropriate section

// turbo
3. Check current line count:
   ```bash
   wc -l tele-knowledge.md
   ```
   **Limit: 600 lines max**

4. Add knowledge in this format:
   ```markdown
   ### [TOPIC NAME]
   *   **Key Point 1:** Brief description
   *   **Key Point 2:** Brief description
   *   **My Role:** How I help with this topic
   ```

5. Keep it concise:
   - ✅ Bullet points, not paragraphs
   - ✅ Action-oriented ("I help users...")
   - ✅ Include what Tele should SAY about this topic
   - ❌ No redundant information already in glass-generator-prompt.md

// turbo
6. Verify the file is under 500 lines:
   ```bash
   wc -l tele-knowledge.md
   ```

## Example: Adding Event Knowledge

```markdown
### LEAP 2026
*   **What:** World's largest tech event in Riyadh
*   **When:** April 13-16, 2026
*   **My Role:** I help candidates register, prepare for networking, and discover career opportunities at LEAP.
*   **What I Say:** "LEAP is happening April 13-16 in Riyadh. It's a great opportunity to network with global tech leaders. Want me to help you prepare?"
```

## Don't Forget
- ✅ Keep tele-knowledge.md ≤ 600 lines
- ✅ Knowledge should be WHAT Tele knows, not HOW Tele shows it (that's glass-generator-prompt.md)
- ✅ Include example phrases Tele might say
