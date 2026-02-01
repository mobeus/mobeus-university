---
description: Audit tele alignment — verify everything drives toward the Launch Event goal
---

# Audit Tele Workflow

Comprehensive check that all parts of your tele are aligned with the singular goal.

## When to Use

- Before publishing
- After major changes
- Before demos
- Periodic health check

---

## 🎯 THE GOAL

Everything must drive toward: **Get users to sign up for the Launch Event.**

---

## Quick Audit

// turbo-all
```bash
echo "════════════════════════════════════════════════════════════" && \
echo "               TELE AUDIT — The Screen Finally Cares" && \
echo "════════════════════════════════════════════════════════════" && \
echo "" && \
echo "📏 FILE LENGTHS:" && \
echo "  tele-knowledge.md: $(wc -l < public/prompts/tele-knowledge.md) lines (max 500)" && \
echo "  glass-prompt.md: $(wc -l < public/prompts/glass-prompt.md) lines (max 1500)" && \
echo "" && \
echo "📊 COUNTS:" && \
echo "  Shot prompts: $(grep -c 'SHOT' public/prompts/tele-knowledge.md) (target: 24)" && \
echo "  Templates: $(ls -1 src/components/templates/*.tsx 2>/dev/null | wc -l | tr -d ' ') (max 80)" && \
echo "" && \
echo "🎯 GOAL CHECK:" && \
grep -i "launch" public/prompts/tele-knowledge.md | head -3 && \
echo "" && \
echo "🎨 STYLE CHECK (Rule of 3):" && \
echo "  Valid glass classes: glass-light, glass-medium, glass-heavy + color variants" && \
echo "  Legacy classes found:" && \
echo "    glass-subtle: $(grep -r 'glass-subtle' src/components --include='*.tsx' 2>/dev/null | wc -l | tr -d ' ')" && \
echo "    glass-strong: $(grep -r 'glass-strong' src/components --include='*.tsx' 2>/dev/null | wc -l | tr -d ' ')" && \
echo "    glass-prominent: $(grep -r 'glass-prominent' src/components --include='*.tsx' 2>/dev/null | wc -l | tr -d ' ')" && \
echo "    teal-glass-*: $(grep -r 'teal-glass' src/components --include='*.tsx' 2>/dev/null | wc -l | tr -d ' ')" && \
echo "  New glass classes:" && \
echo "    glass-light*: $(grep -r 'glass-light' src/components --include='*.tsx' 2>/dev/null | wc -l | tr -d ' ')" && \
echo "    glass-medium*: $(grep -r 'glass-medium' src/components --include='*.tsx' 2>/dev/null | wc -l | tr -d ' ')" && \
echo "    glass-heavy*: $(grep -r 'glass-heavy' src/components --include='*.tsx' 2>/dev/null | wc -l | tr -d ' ')" && \
echo "" && \
echo "✅ COMPILATION:" && \
npx tsc --noEmit 2>&1 | tail -5 && \
echo "════════════════════════════════════════════════════════════"
```

---

## Alignment Checklist

After audit, verify:

```
□ Goal is clear: Launch Event signup
□ Shot prompts direct toward goal
□ Templates render correctly
□ Every clickable calls notifyTele()
□ TypeScript compiles
□ /publish executed

STYLE SYSTEM (Rule of 3):
□ Using only valid glass classes (see AGENT.md)
□ Legacy classes migrated (glass-subtle → glass-light, etc.)
□ 15 glass classes: 3 levels × 5 colors
□ 3 button types: btn-primary, btn-secondary, btn-ghost
□ 5 colors: primary, secondary, accent + mist/onyx
```

---

## Glass Class Reference

| Color | Light | Medium | Heavy |
|-------|-------|--------|-------|
| Neutral | `.glass-light` | `.glass-medium` | `.glass-heavy` |
| Dark | `.glass-light-dark` | `.glass-medium-dark` | `.glass-heavy-dark` |
| Primary | `.glass-light-primary` | `.glass-medium-primary` | `.glass-heavy-primary` |
| Secondary | `.glass-light-secondary` | `.glass-medium-secondary` | `.glass-heavy-secondary` |
| Accent | `.glass-light-accent` | `.glass-medium-accent` | `.glass-heavy-accent` |

---

_The Screen Finally Cares_

