---
description: Tell Tele how to respond to specific user requests (shot prompts)
---

# Tele-Should Workflow

When you want Tele to respond a certain way to a user request, add a shot prompt to `public/prompts/glass-prompt.md`.

## [!] CRITICAL: Always Call navigateToSection

**Tele MUST call `navigateToSection` in EVERY response, even if the content is identical to what's currently displayed.**

- The UI needs the tool call to confirm Tele is responding
- Without the call, users see nothing and think Tele is broken
- Even if same content is showing: **STILL CALL navigateToSection**

## 🚨 HIDDEN JOURNEY RULE

**The user should NOT know they are on a journey.**

- ❌ Never show "STEP 1 OF 7" or step counts in badges
- ❌ Never say "let's move to the next step"
- ❌ Never reveal there are 7 steps
- ✅ Use descriptive badges like "PLATFORM", "CONCEPTS", "USE CASES"
- ✅ Offer options naturally without forcing progression
- ✅ Let users explore freely

## When to Use
- "Tele should show X when user asks Y"
- "Tele should respond with [template] for [intent]"
- Adding new user intent → template mapping

## Steps

1. Identify what the user will say (the trigger phrase)

2. Identify what template(s) Tele should show

3. Open `public/prompts/glass-prompt.md` and find the **Shot Prompts** section

// turbo
4. Check current line count:
   ```bash
   wc -l public/prompts/glass-prompt.md
   ```
   **Limit: 1500 lines max**

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
   - [+] `id`, `templateId`, `props` ONLY at subsection level
   - [+] ALL data inside `props`
   - [+] TELE SAYS uses natural language, no "Here is your..."
   - [+] NO step counts or journey progression language
   - [-] Never badge/title/subtitle inside props

// turbo
7. Verify the file is under 1500 lines:
   ```bash
   wc -l public/prompts/glass-prompt.md
   ```

## Example Shot Prompt

```markdown
### Explain Any Wire Command
USER: "Tell me about /add-glass" / "What is /add-knowledge" / "Explain /tele-should"

navigateToSection:
```json
{
  "badge": "WIRE COMMAND",
  "title": "/add-glass",
  "generativeSubsections": [
    { 
      "id": "wire-detail", 
      "templateId": "WireCommandDetail", 
      "props": { 
        "command": "/add-glass"
      }
    }
  ]
}
```

TELE SAYS: "This command creates visual templates. Want to see the others or try something else?"
```

## 🚨 The 15-Shot Prompt Rule

**Total: 15 Shot Prompts Maximum**
- **7 Journey Shot Prompts** → Map to journey nodes (hidden from user)
- **8 Utility Shot Prompts** → Generic patterns, wire commands, use cases, files

### Shot Prompt Consolidation
Use **generic patterns** instead of individual prompts:
- ✅ One prompt for "Explain any wire command" using WireCommandDetail with `command` prop
- ✅ One prompt for "Describe any use case" using UseCaseDetail with dynamic props
- ❌ Not one shot prompt per wire command
- ❌ Not one shot prompt per use case

---

## 🚨 Constraints (Check Every Time)

// turbo
```bash
echo "=== CONSTRAINT CHECK ===" && \
echo "tele-knowledge.md: $(wc -l < public/prompts/tele-knowledge.md) lines (max 500)" && \
echo "glass-prompt.md: $(wc -l < public/prompts/glass-prompt.md) lines (max 1500)" && \
echo "Shot prompts: $(grep -c '^### ' public/prompts/glass-prompt.md) (max 15)"
```

| Constraint | Limit | Action if Exceeded |
|------------|-------|-------------------|
| tele-knowledge.md | ≤ **500 lines** | Consolidate content |
| glass-prompt.md | ≤ **1500 lines** | Remove non-journey prompts |
| Shot Prompts | ≤ **15 total** | Keep 7 journey + 8 utility max |

## [!] CRITICAL RULE: Always Call navigateToSection

**Tele MUST call `navigateToSection` in EVERY response.**

Even if identical content is already showing:
- **STILL CALL navigateToSection**
- The UI handles duplicate content gracefully
- The user gets visual confirmation Tele heard them
