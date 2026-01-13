---
description: Tell Tele how to respond to specific user requests (shot prompts)
---

# Tele-Should Workflow

When you want Tele to respond a certain way to a user request, add a shot prompt to `glass-generator-prompt.md`.

## When to Use
- "Tele should show X when user asks Y"
- "Tele should respond with [template] for [intent]"
- Adding new user intent → template mapping

## Steps

1. Identify what the user will say (the trigger phrase)

2. Identify what template(s) Tele should show

3. Open `glass-generator-prompt.md` and find the **Shot Prompts** section

// turbo
4. Check current line count:
   ```bash
   wc -l glass-generator-prompt.md
   ```
   **Limit: 1200 lines max**

5. Add shot prompt in this format:
   ```markdown
   ### [Intent Description]
   USER: "[Example user phrase]"

   navigateToSection:
   ```json
   {
     "badge": "SECTION_NAME",
     "title": "Display Title",
     "generativeSubsections": [
       { "id": "unique-id", "templateId": "TemplateName", "props": { ...data } }
     ]
   }
   ```

   TELE SAYS: "[What Tele says - no UI meta language]"
   ```

6. Follow the rules:
   - ✅ `id`, `templateId`, `props` ONLY at subsection level
   - ✅ ALL data inside `props`
   - ✅ TELE SAYS uses natural language, no "Here is your..."
   - ❌ Never badge/title/subtitle inside props

// turbo
7. Verify the file is under 1000 lines:
   ```bash
   wc -l glass-generator-prompt.md
   ```

## Example Shot Prompt

```markdown
### View Certifications
USER: "Show me my certifications"

navigateToSection:
```json
{
  "badge": "MY TWIN",
  "title": "Your Certifications",
  "generativeSubsections": [
    { 
      "id": "certs-1", 
      "templateId": "CertificationsList", 
      "props": { 
        "certifications": [
          { "name": "AWS Cloud Practitioner", "status": "verified", "issuer": "AWS" }
        ]
      }
    }
  ]
}
```

TELE SAYS: "You've got some solid credentials here. Want to add more or see which jobs match these certs?"
```

## Don't Forget
- ✅ Keep glass-generator-prompt.md ≤ 1200 lines
- ✅ Tele speaks naturally, not "Here is your X"
- ✅ Include the guide (next step suggestion) in TELE SAYS
- ✅ Use realistic data in props examples

## 🚨 CRITICAL RULE: Always Call navigateToSection

**Tele MUST call `navigateToSection` in EVERY response, even if the content would be identical to what's currently displayed.**

This is because:
1. The UI needs the tool call to confirm Tele is responding
2. Without the tool call, the user sees no visual update
3. The tool call triggers animations and state updates

**WRONG:**
```
USER: "Show me my progress"
TELE: "Here's your progress..." (no navigateToSection call)
→ User sees nothing new, thinks Tele is broken
```

**CORRECT:**
```
USER: "Show me my progress"
TELE: Calls navigateToSection with CourseProgress template
TELE SAYS: "Here's your learning journey. You're 65% through..."
→ User sees the template load/refresh
```

Even if identical content is already showing:
- **STILL CALL navigateToSection**
- The UI handles duplicate content gracefully
- The user gets visual confirmation Tele heard them

