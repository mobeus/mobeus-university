# 🤖 AGENT.md — Tele Platform Template

> **Fork this repo to create your own Tele** — a conversational AI experience
> v100.0 | January 2026

---

## 🚀 QUICK START: Make Your Own Tele

### 1. Fork & Clone
```bash
git clone [your-fork-url]
cd [your-project-name]
npm install
npm run dev -- --port 3131
```

### 2. Customize Your Tele
Edit these three files:
| File | What It Does |
|------|--------------|
| `public/prompts/tele-knowledge.md` | What your tele knows |
| `public/prompts/glass-prompt.md` | How your tele responds |
| `src/assets/` | Your logo and images |

### 3. Publish Changes
```bash
node scripts/publish.cjs
```

---

## 🎯 THE SINGULAR GOAL

Define your tele's **one goal**. Everything must drive toward it.

Example: **Get visitors to sign up for the Launch Event**

---

## 🏛️ ARCHITECTURE: Two-Agent System

| Agent | When | Purpose |
|-------|------|---------|
| **Build Agent** (You + Claude) | Development | Creates templates, writes knowledge |
| **Runtime Agent** (Catherine) | Live sessions | Talks to users, navigates sections |

### File Flow
```
Development: public/prompts/*.md  →  node scripts/publish.cjs  →  Runtime API
```

---

## 📁 PROJECT STRUCTURE

```
.
├── .agent/                    # AI agent configuration
│   ├── AGENT.md              # This file (you're reading it!)
│   └── workflows/            # Automation scripts
├── public/
│   ├── prompts/              # CORE: Your tele's brain
│   │   ├── tele-knowledge.md # What the tele knows
│   │   └── glass-prompt.md   # How the tele responds
│   └── images/               # Static images
├── src/
│   ├── components/
│   │   └── templates/        # Visual components (78 available)
│   ├── index.css             # All styles (Rule of 3 design system)
│   └── pages/Index.tsx       # Main app entry
├── scripts/
│   └── publish.cjs           # Sync prompts to runtime
└── package.json
```

---

## 📐 THE 5 IMMUTABLE LAWS

1. **VOLUMETRIC NAVIGATION** — Every clickable calls `notifyTele(actionPhrase)`
2. **TOOL CALL MANDATORY** — Catherine calls `navigateToSection` in EVERY response
3. **NO HALLUCINATION** — Use facts from `tele-knowledge.md` only
4. **TOOL SIGNATURE STABILITY** — `navigateToSection` format never changes
5. **GOAL ORIENTATION** — Everything drives toward your singular goal

---

## 🎨 DESIGN SYSTEM — Rule of 3

### Colors (3 Primary + 2 Neutrals)

| Token | Hex | Use |
|-------|-----|-----|
| Primary | `#A78BFA` | CTAs, accents |
| Secondary | `#67E8F9` | Links, info |
| Accent | `#F472B6` | Highlights |
| Mist | `#FFFFFF` | Text |
| Onyx | `#000000` | Background |

### Glass System (15 Classes)

**3 Blur Levels × 5 Colors:**

| Color | Light (16px) | Medium (24px) | Heavy (40px) |
|-------|--------------|---------------|--------------|
| Neutral | `.glass-light` | `.glass-medium` | `.glass-heavy` |
| Dark | `.glass-light-dark` | `.glass-medium-dark` | `.glass-heavy-dark` |
| Primary | `.glass-light-primary` | `.glass-medium-primary` | `.glass-heavy-primary` |
| Secondary | `.glass-light-secondary` | `.glass-medium-secondary` | `.glass-heavy-secondary` |
| Accent | `.glass-light-accent` | `.glass-medium-accent` | `.glass-heavy-accent` |

**When to use:**
- `glass-medium` — Standard cards
- `glass-heavy-dark` — Chat panels
- `glass-medium-primary` — Highlighted content

### Buttons (3 Types)

| Class | Style | Use |
|-------|-------|-----|
| `.btn-primary` | Solid | Main CTAs |
| `.btn-secondary` | Outlined | Secondary actions |
| `.btn-ghost` | Transparent | Tertiary |

### Responsive Breakpoints

| Prefix | Min Width | Use |
|--------|-----------|-----|
| (none) | 0px | Mobile first |
| `sm:` | 640px | Large phones |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |

**Pattern:** `className="text-sm md:text-base lg:text-lg"`

---

## 🔧 WORKFLOWS

| Command | Purpose |
|---------|---------|
| `/publish` | Sync prompts to Runtime Agent |
| `/add-glass` | Add a new template |
| `/add-knowledge` | Add domain knowledge |
| `/add-skill` | Add a shot prompt |
| `/audit-tele` | Check alignment with goal |
| `/set-goal` | Define your singular goal |
| `/set-journey` | Define user journey (7 steps max) |

---

## 📋 CREATE A NEW TEMPLATE

```tsx
import React from 'react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface Props {
  items?: Array<{ title: string; actionPhrase: string }>;
}

export const TemplateName: React.FC<Props> = ({ items = [] }) => {
  const { playClick } = useSound();

  const handleAction = (actionPhrase: string) => {
    playClick();
    notifyTele(actionPhrase);
  };

  return (
    <div className="glass-medium rounded-2xl p-4 md:p-6">
      {/* Mobile-first responsive content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="glass-light rounded-xl p-4 cursor-pointer 
                       hover:bg-white/10 transition-all"
            onClick={() => handleAction(item.actionPhrase)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};
```

Register in `src/data/templateRegistry.ts` and add to `glass-prompt.md`.

---

## 🧹 KEEPING IT LITE

### What to Delete
- `dist/` — Regenerates on build
- `.DS_Store` — macOS artifacts
- Unused templates (check with `/audit-tele`)

### Image Optimization
- Use WebP format when possible
- Compress PNGs to < 200KB
- Lazy load non-critical images

### CSS Cleanup
- Only use Rule of 3 glass classes
- Remove deprecated classes (run `/audit-tele`)

---

## 📱 RESPONSIVE CHECKLIST

```
□ All layouts use grid/flex with responsive variants
□ Text scales: text-sm md:text-base lg:text-lg
□ Padding scales: p-4 md:p-6 lg:p-8
□ Images have max-w-full
□ Touch targets are minimum 44px
□ Tested on 375px, 768px, 1024px, 1440px
```

---

## 🚀 DEPLOYMENT

```bash
npm run build           # Creates dist/
npm run preview         # Test production build locally
```

Deploy `dist/` to any static host (Vercel, Netlify, AWS Amplify).

---

## 📞 SUPPORT

- Run `/audit-tele` to check system health
- Check `public/prompts/` files for syntax errors
- Verify TypeScript: `npx tsc --noEmit`

---

_The Screen Finally Cares — Fork, customize, deploy._
_v100.0 | January 2026_
