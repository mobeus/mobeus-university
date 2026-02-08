---
description: Check if everything is healthy — files, schemas, compilation, alignment
---

# /check — Check If Everything's Healthy

Run this before publishing, after big changes, or before demos.

---

## Step 1: Health Check

```bash
echo "════════════════════════════════════════════════════════════" && \
echo "               TELE CHECK — The Screen Finally Cares" && \
echo "════════════════════════════════════════════════════════════" && \
echo "" && \
echo "📏 FILE SIZES:" && \
echo "  tele-knowledge.md: $(wc -l <public/prompts/tele-knowledge.md | tr -d ' ') lines (max 750)" && \
echo "  glass-prompt.md:   $(wc -l <public/prompts/glass-prompt.md | tr -d ' ') lines" && \
echo "" && \
echo "📊 TEMPLATES:" && \
echo "  Components: $(ls -1 src/components/templates/*.tsx 2>/dev/null | wc -l | tr -d ' ')" && \
echo "" && \
echo "🎯 GOAL:" && \
grep -i "goal\|the screen finally cares" public/prompts/tele-knowledge.md | head -3 && \
echo "" && \
echo "🔑 AGNOSTIC FOUNDATIONS:" && \
grep -i "agnostic" public/prompts/tele-knowledge.md | head -10 && \
echo "════════════════════════════════════════════════════════════"
```

## Step 2: Generate Template Schemas

Makes sure the Runtime Agent sends valid JSON that the frontend can render.

```bash
node scripts/generate-template-schemas.cjs
```

## Step 3: Verify Schemas

```bash
if grep -q "TEMPLATE-SCHEMAS-START" public/prompts/glass-prompt.md && grep -q "TEMPLATE-SCHEMAS-END" public/prompts/glass-prompt.md; then
  echo "✅ Schema markers found"
  echo "   Templates documented: $(grep -c '^### ' public/prompts/glass-prompt.md)"
else
  echo "❌ Schema markers MISSING — run Step 2"
fi
```

## Step 4: Compile Check

```bash
npx tsc --noEmit 2>&1 | tail -10
```

## Checklist

```
□ tele-knowledge.md is max 750 lines
□ All agnostic foundations listed
□ Template schemas generated and injected
□ TypeScript compiles
□ Ready to /publish
```

---

_The Screen Finally Cares_
