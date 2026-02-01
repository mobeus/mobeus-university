---
description: Tell Tele how to respond to specific user requests (shot prompts)
---

# Add Skill Workflow

Add a new skill (shot prompt) to teach your tele how to respond.

## Shot Prompt Structure

```markdown
### SHOT N: "Trigger phrase" / "Alternate phrase"
\`\`\`json
{
  "badge": "BADGE",
  "title": "Title",
  "generativeSubsections": [
    { "id": "section1", "templateId": "TemplateName", "props": { ... } },
    { "id": "section2", "templateId": "TemplateName", "props": { ... } }
  ]
}
\`\`\`
TELE SAYS: "What Catherine says before showing the templates (2-4 sentences)."
```

## Rules

1. **Always call navigateToSection** — No text-only responses
2. **Use 2-3 templates** per shot prompt for rich experiences
3. **Keep TELE SAYS conversational** — Natural, warm, helpful
4. **End with a question or CTA** — Guide toward Launch Event

## Where to Add

Add to `public/prompts/tele-knowledge.md` in the SHOT PROMPTS section.

## After Adding

Run `/publish` to deploy.

---

_The Screen Finally Cares_
