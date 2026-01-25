---
description: Comprehensive audit of tele alignment, naming, spelling, assets, and architecture
---

# Audit Tele Workflow

A complete audit to ensure all parts of your tele are aligned, correctly named, properly spelled, and architecturally sound. This is the quality gate before going live.

## When to Use

- Before publishing a new tele
- After major changes to knowledge, prompts, or templates
- Before demos or hackathons
- When templates or shot prompts feel "off"
- Periodic health check

---

## 🚨 AUDIT PHILOSOPHY

### The 24-Shot Prompt Law
- **7 Journey Shot Prompts** → Tied to specific journey steps (nodes on the path)
- **5 Utility Shot Prompts** → Generic, reusable, off-journey (home, about, structure, etc.)

### Template Reusability Mandate
Templates must be **generically named** so they can be reused when users go off-journey. The 5 utility shot prompts should reference templates that work for ANY context, not just journey steps.

**Example:**
| ❌ BAD (Too Specific) | ✅ GOOD (Generic/Reusable) |
|----------------------|---------------------------|
| `HackathonPhases` | `ProcessSteps` |
| `WealthPillars` | `AccordionList` |
| `MercedesShowcase` | `ImageCarousel` |
| `SalesMetrics` | `CardGrid` |

---

## AUDIT SECTIONS

### SECTION 1: Goal, Journey & Compliance Alignment

// turbo
1. **Check Goal is Set:**
   ```bash
   grep -A 5 "---GOAL---" public/prompts/tele-knowledge.md
   ```

2. **Check Journey is Set:**
   ```bash
   grep -A 10 "---JOURNEY---" public/prompts/tele-knowledge.md
   ```

3. **🚨 Check Compliance Level is Set:**
   ```bash
   echo "=== COMPLIANCE CHECK ===" && \
   grep -A 3 "---COMPLIANCE---" public/prompts/tele-knowledge.md || echo "⚠️ NO COMPLIANCE LEVEL SET!"
   ```
   - **⚠️ WARNING:** If no `---COMPLIANCE---` section exists, flag: *"Compliance level not set. Run /set-journey to set HIGH/MEDIUM/LOW."*
   - Valid levels: HIGH, MEDIUM, LOW

4. **Verify Compliance in glass-prompt.md:**
   ```bash
   grep -A 5 "COMPLIANCE LEVEL" public/prompts/glass-prompt.md
   ```
   - Both files must have matching compliance levels

5. **Verify Final Step = Goal:**
   - The last journey step MUST achieve the Primary Goal
   - If misaligned, flag: ⚠️ "Journey does not end at goal"

---

### SECTION 2: File Length Constraints

// turbo
1. **Check line counts:**
   ```bash
   echo "=== FILE LENGTH AUDIT ===" && \
   echo "tele-knowledge.md: $(wc -l < public/prompts/tele-knowledge.md) lines (MAX 500)" && \
   echo "glass-prompt.md: $(wc -l < public/prompts/glass-prompt.md) lines (MAX 1500)"
   ```

2. **Flag violations:**
   - ⚠️ If tele-knowledge.md > 500 lines → Needs consolidation
   - ⚠️ If glass-prompt.md > 1500 lines → Needs pruning

---

### SECTION 3: Shot Prompt Audit (24 Max: 12 Journey + 12 Utility)

// turbo
1. **Count shot prompts:**
   ```bash
   echo "=== SHOT PROMPT AUDIT ===" && \
   echo "Total shot prompts: $(grep -c '^### ' public/prompts/glass-prompt.md) (MAX 24)"
   ```

2. **List all shot prompts:**
   ```bash
   grep '^### ' public/prompts/glass-prompt.md
   ```

3. **Classify each shot prompt:**
   - **JOURNEY (7 max):** Tied to journey steps 1-7
   - **UTILITY (5 max):** Generic (Home, About, Help, Structure, Templates)

4. **Verify 2+ templateIds per shot prompt:**
   - Each shot prompt's `generativeSubsections` MUST have ≥ 2 items

5. **Flag violations:**
   - ⚠️ If > 24 total → Delete least important
   - ⚠️ If journey shot prompts use non-reusable templates → Flag for rename

---

### SECTION 4: Template Audit (30 Max)

// turbo
1. **Count templates:**
   ```bash
   echo "=== TEMPLATE AUDIT ===" && \
   ls -1 src/components/templates/*.tsx | wc -l && echo " templates (MAX 30)"
   ```

2. **List all templates:**
   ```bash
   ls -1 src/components/templates/*.tsx | xargs -n1 basename | sed 's/.tsx$//'
   ```

3. **Check for non-generic names:**
   Review template names. Flag any that are:
   - Too specific to one use case (e.g., `HackathonTimeline` vs `Timeline`)
   - Named after specific industries/brands
   - Not reusable across different teles

4. **Verify template registry:**
   ```bash
   grep -c "lazy(() =>" src/data/templateRegistry.ts
   ```
   → Count should match template file count

---

### SECTION 5: Asset Audit

// turbo
1. **Count assets:**
   ```bash
   echo "=== ASSET AUDIT ===" && \
   echo "Carousel assets: $(ls -1 public/assets/carousel-slide-*.png 2>/dev/null | wc -l)" && \
   echo "Total images: $(find public/assets -name '*.png' -o -name '*.jpg' -o -name '*.svg' 2>/dev/null | wc -l)"
   ```

2. **List all asset files:**
   ```bash
   ls -la public/assets/
   ```

3. **Check carousel slide count matches journey steps:**
   - Journey steps = X → Should have X carousel slides
   - ⚠️ If mismatch, flag for regeneration

4. **Verify image naming convention:**
   - `carousel-slide-01.png` through `carousel-slide-0N.png`
   - `two-agent-architecture.png` (functional names)
   - No random/uuid names

5. **Check for orphan images:**
   ```bash
   # List images not referenced anywhere
   for img in public/assets/*.png; do
     name=$(basename "$img")
     if ! grep -rq "$name" src/ public/prompts/ index.html 2>/dev/null; then
       echo "ORPHAN: $name"
     fi
   done
   ```

---

### SECTION 6: JSON Signature Audit

// turbo
1. **Verify navigateToSection structure in glass-prompt.md:**
   ```bash
   grep -A 20 "navigateToSection:" public/prompts/glass-prompt.md | head -50
   ```

2. **Check JSON structure compliance:**
   - ✅ `{ badge, title, subtitle?, generativeSubsections: [{ id, templateId, props }] }`
   - ❌ No `id`, `templateId`, `props` at root level
   - ❌ No badge/title/subtitle inside props

3. **Validate JSON blocks:**
   ```bash
   # Extract and validate JSON blocks from glass-prompt.md
   grep -Pzo '```json\n\{[^`]+\}' public/prompts/glass-prompt.md 2>/dev/null | head -100
   ```

---

### SECTION 7: TypeScript Compilation

// turbo
1. **Run TypeScript check:**
   ```bash
   npx tsc --noEmit
   ```

2. **Flag any errors:**
   - Template type mismatches
   - Missing exports
   - Invalid prop types

---

### SECTION 8: Static Welcome Experience Alignment

// turbo
1. **Check WELCOME_VARIANTS in Index.tsx:**
   ```bash
   grep -A 50 "WELCOME_VARIANTS" src/pages/Index.tsx | head -60
   ```

2. **Verify carousel cards match journey steps:**
   - Each journey step should have a corresponding carousel card
   - `actionPhrase` should trigger correct journey shot prompt
   - `imageUrl` should point to valid asset

3. **🚨 CRITICAL: Verify ALL carousel cards have images:**
   ```bash
   echo "=== CAROUSEL IMAGE CHECK ===" && \
   grep -o 'imageUrl: "[^"]*"' src/pages/Index.tsx | while read line; do
     url=$(echo "$line" | sed 's/imageUrl: "//;s/"$//')
     file="public${url}"
     if [ -f "$file" ]; then
       echo "✅ EXISTS: $url"
     else
       echo "❌ MISSING: $url"
     fi
   done
   ```

4. **Check for cards WITHOUT imageUrl (VIOLATION):**
   ```bash
   # Each card in WELCOME_VARIANTS must have an imageUrl
   grep -A 5 "question:" src/pages/Index.tsx | grep -B 3 "actionPhrase" | grep -v "imageUrl" | head -20
   ```

5. **Check Navigation.tsx menu alignment:**
   ```bash
   grep -A 30 "navItems" src/components/Navigation.tsx | head -40
   ```

6. **Verify:**
   - Menu items reflect journey milestones
   - REPO link is first and highlighted (goal CTA)
   - Labels are short (1-2 words, CAPS)
   - **⚠️ ALL carousel cards have imageUrl pointing to valid file**

---

### SECTION 9: Volumetric Navigation Audit

// turbo
1. **Check all templates have notifyTele:**
   ```bash
   echo "=== VOLUMETRIC NAV AUDIT ===" && \
   for f in src/components/templates/*.tsx; do
     if ! grep -q "notifyTele" "$f"; then
       echo "MISSING notifyTele: $(basename $f)"
     fi
   done
   ```

2. **Check for dead-end clicks:**
   ```bash
   # Look for onClick handlers that don't call notifyTele
   grep -r "onClick=" src/components/templates/ | grep -v "notifyTele" | grep -v "handleAction"
   ```

3. **Verify handleAction pattern:**
   ```bash
   grep -l "handleAction" src/components/templates/*.tsx | wc -l
   ```

---

### SECTION 10: Fallback Handling Audit

1. **Check for null safety in templates:**
   ```bash
   # Look for potential crashes (array access without optional chaining)
   grep -rn "\.map(" src/components/templates/ | grep -v "\?\.map\|items?\.map\|cards?\.map"
   ```

2. **Verify default props:**
   - Each template should have sensible defaults
   - Empty arrays `[]` for lists
   - Empty strings `""` for text

3. **Check error boundaries:**
   ```bash
   grep -l "ErrorBoundary" src/components/*.tsx src/pages/*.tsx
   ```

---

### SECTION 11: Spelling Audit

// turbo
1. **Common misspellings check across all files:**
   ```bash
   echo "=== SPELLING AUDIT ===" && \
   grep -rni "tele" public/prompts/ src/pages/Index.tsx src/components/Navigation.tsx | grep -v "tele-knowledge\|teleglass\|notifyTele\|sendToTele\|TellTele\|teleNavigation\|teleQuery\|handleTele\|Tele\b" | head -20
   ```

2. **Check for consistent naming:**
   ```bash
   # Tele vs tele capitalization
   echo "Capitalization check:" && \
   grep -o "\btele\b\|\bTele\b" public/prompts/tele-knowledge.md | sort | uniq -c
   ```

3. **Brand name consistency:**
   - "Mobeus" (not "mobeus" in prose)
   - "Catherine" (not "catherine")
   - "Claude" (not "claude" in prose)

---

### SECTION 12: Order & Structure Audit

1. **Glass-prompt.md structure:**
   ```
   □ Version header
   □ Core Mandate section
   □ JSON Structure section
   □ Template Library section
   □ Utility Shot Prompts (5)
   □ Journey Shot Prompts (7)
   □ Footer/version
   ```

2. **Tele-knowledge.md structure:**
   ```
   □ Header with version
   □ ---GOAL--- section
   □ ---JOURNEY--- section
   □ Identity section
   □ Domain knowledge sections
   □ Technical reference sections
   □ Quick reference
   ```

3. **Carousel slide order:**
   - Slides should be numbered 01 through 07 (or N)
   - Order should match journey step order

---

### SECTION 13: Cross-File Alignment Audit

// turbo
1. **Verify all references match:**
   ```bash
   echo "=== CROSS-FILE ALIGNMENT ===" && \
   echo "Templates in registry:" && grep "lazy(() =>" src/data/templateRegistry.ts | wc -l && \
   echo "Template files:" && ls -1 src/components/templates/*.tsx | wc -l && \
   echo "Shot prompts:" && grep -c '^### ' public/prompts/glass-prompt.md && \
   echo "Carousel cards:" && grep -c "actionPhrase" src/pages/Index.tsx | head -1
   ```

2. **Check template names match registry:**
   ```bash
   # Templates defined in registry
   grep -o '"[A-Z][a-zA-Z]*":' src/data/templateRegistry.ts | tr -d '":' | sort
   ```

3. **Check templateId references in glass-prompt.md exist:**
   ```bash
   # Extract templateIds from glass-prompt.md
   grep -o '"templateId": "[^"]*"' public/prompts/glass-prompt.md | sort -u
   ```

---

### SECTION 14: Full Project Read (Complete Audit)

When performing a FULL audit, read the following files in order:

**Core Files (MUST READ):**
1. `public/prompts/tele-knowledge.md` — What tele knows
2. `public/prompts/glass-prompt.md` — How tele responds
3. `src/pages/Index.tsx` — Welcome experience & WELCOME_VARIANTS
4. `src/components/Navigation.tsx` — Menu items

**Template Files (SCAN):**
5. `src/data/templateRegistry.ts` — Template registration
6. All files in `src/components/templates/`

**Asset Files (LIST):**
7. `public/assets/` — All images

**Config Files (CHECK):**
8. `package.json` — Dependencies
9. `index.html` — Site functions, OpenGraph

---

## 🚨 AUDIT OUTPUT FORMAT

After completing audit, output a summary:

```
═══════════════════════════════════════════════════════════════
                    TELE AUDIT REPORT
═══════════════════════════════════════════════════════════════

PROJECT: [Project Name]
DATE: [Date]
VERSION: [Version from tele-knowledge.md]

═══════════════════════════════════════════════════════════════
                      CONSTRAINTS CHECK
═══════════════════════════════════════════════════════════════
| Constraint              | Actual | Limit | Status |
|------------------------|--------|-------|--------|
| tele-knowledge.md      | XXX    | 500   | ✅/⚠️  |
| glass-prompt.md        | XXX    | 1500  | ✅/⚠️  |
| Shot prompts           | XX     | 24    | ✅/⚠️  |
| Templates              | XX     | 30    | ✅/⚠️  |
| Carousel cards         | X      | 7     | ✅/⚠️  |

═══════════════════════════════════════════════════════════════
                      ALIGNMENT CHECK
═══════════════════════════════════════════════════════════════
| Check                          | Status |
|-------------------------------|--------|
| Goal defined                  | ✅/❌   |
| Journey defined (7 steps)     | ✅/❌   |
| Compliance level set          | ✅/❌   |
| Final step = Goal             | ✅/❌   |
| Carousel matches journey      | ✅/❌   |
| Carousel cards have images    | ✅/❌   |
| Nav menu aligned              | ✅/❌   |
| Template names generic        | ✅/⚠️   |
| TypeScript compiles           | ✅/❌   |
| Volumetric nav complete       | ✅/⚠️   |

═══════════════════════════════════════════════════════════════
                      ISSUES FOUND
═══════════════════════════════════════════════════════════════

[List any issues with severity and recommended fix]

1. [CRITICAL] Description → Fix: ...
2. [WARNING] Description → Fix: ...
3. [INFO] Description → Fix: ...

═══════════════════════════════════════════════════════════════
                    RECOMMENDED ACTIONS
═══════════════════════════════════════════════════════════════

□ [Action 1]
□ [Action 2]
□ [Action 3]

═══════════════════════════════════════════════════════════════
```

---

## Quick Audit Commands (Run All)

// turbo
```bash
echo "════════════════════════════════════════════════════════════" && \
echo "               QUICK TELE AUDIT" && \
echo "════════════════════════════════════════════════════════════" && \
echo "" && \
echo "📏 FILE LENGTHS:" && \
echo "  tele-knowledge.md: $(wc -l < public/prompts/tele-knowledge.md) lines (max 500)" && \
echo "  glass-prompt.md: $(wc -l < public/prompts/glass-prompt.md) lines (max 1500)" && \
echo "" && \
echo "📊 COUNTS:" && \
echo "  Shot prompts: $(grep -c '^### ' public/prompts/glass-prompt.md) (max 24)" && \
echo "  Templates: $(ls -1 src/components/templates/*.tsx 2>/dev/null | wc -l | tr -d ' ') (max 30)" && \
echo "  Carousel cards: $(grep -c 'actionPhrase' src/pages/Index.tsx | head -1)" && \
echo "  Nav items: $(grep -c 'id:' src/components/Navigation.tsx | head -1)" && \
echo "" && \
echo "🖼️ ASSETS:" && \
echo "  Carousel images: $(ls -1 public/assets/carousel-slide-*.png 2>/dev/null | wc -l | tr -d ' ')" && \
echo "  Total images: $(find public/assets -name '*.png' 2>/dev/null | wc -l | tr -d ' ')" && \
echo "" && \
echo "🎠 CAROUSEL IMAGE CHECK:" && \
for i in 01 02 03 04 05 06 07; do
  if [ -f "public/assets/carousel-slide-$i.png" ]; then
    echo "  ✅ carousel-slide-$i.png"
  else
    echo "  ❌ MISSING: carousel-slide-$i.png"
  fi
done && \
echo "" && \
echo "✅ COMPILATION:" && \
npx tsc --noEmit 2>&1 | tail -5 && \
echo "════════════════════════════════════════════════════════════"
```

---

## Post-Audit Actions

1. **If issues found:**
   - Fix in priority order: CRITICAL → WARNING → INFO
   - Re-run `/audit-tele` after fixes

2. **If all checks pass:**
   - Run `/publish` to deploy
   - Verify in browser

3. **For image issues:**
   - Delete orphan images
   - Regenerate missing carousel slides
   - Update references in Index.tsx

---

## Files This Audit Checks

| File | What's Audited |
|------|----------------|
| `public/prompts/tele-knowledge.md` | Goal, journey, length, spelling |
| `public/prompts/glass-prompt.md` | Shot prompts, JSON, length, spelling |
| `src/pages/Index.tsx` | Carousel, welcome experience |
| `src/components/Navigation.tsx` | Menu alignment |
| `src/components/templates/*.tsx` | Volumetric nav, fallbacks |
| `src/data/templateRegistry.ts` | Registration completeness |
| `public/assets/*` | Image counts, orphans, naming |
| `index.html` | Site functions |

---

_Audit Workflow v1.0 | Mobeus University_
