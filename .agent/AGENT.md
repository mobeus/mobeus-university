# 🤖 AGENT.md - Mobeus University Development Reference

> **Two-Agent Architecture Documentation**
> Catherine v65.0 | Streamlined Colors + Core Concepts
> Last updated: January 18, 2026

---

## ⚠️ CRITICAL REMINDER: SYNC KNOWLEDGE FILES

**When `tele-knowledge.md` or `glass-prompt.md` is modified, YOU MUST remind the user:**

> 🔄 **SYNC REQUIRED:** The following file(s) were modified and need to be copied to the Runtime LLM:
> - `tele-knowledge.md` (if changed)
> - `glass-prompt.md` (if changed)
>
> **Process:** Copy the contents of both files → Paste into the Runtime LLM's system prompt/knowledge base

This is MANDATORY because the Runtime Agent (Catherine/GPT 5.0) has a separate context and won't see Build Agent file changes automatically.

---

## 1. TWO-AGENT ARCHITECTURE

This platform uses a **Two-Agent Architecture** where two different AI agents collaborate:

### Build Agent (You - Claude Opus 4.5)
- **When:** Development time (writing code, editing files)
- **Does:** Creates templates, writes knowledge, defines shot prompts
- **Context:** Full codebase access via IDE
- **MCP Servers:** None (uses file system directly)
- **Key Files:**
  - `AGENT.md` (this file) — Your reference document
  - `public/tele-knowledge.md` — Domain knowledge you maintain
  - `public/glass-prompt.md` — Shot prompts you define
  - `src/components/templates/*.tsx` — Templates you create

### Runtime Agent (Catherine - OpenAI GPT 5.0)
- **When:** Live user sessions (speaking, responding)
- **Does:** Talks to users, calls `navigateToSection` tool
- **Context:** Limited context window (knowledge + prompt files)
- **MCP Servers:** Gmail, Calendar, etc. (future)
- **Key Files:**
  - `public/tele-knowledge.md` — What she knows
  - `public/glass-prompt.md` — How she responds (tool definition)

### How They Collaborate
```
┌─────────────────────────────────────────────────────────────────┐
│                      BUILD TIME                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              BUILD AGENT (Claude)                         │   │
│  │  • Creates templates in src/components/templates/         │   │
│  │  • Writes knowledge in public/tele-knowledge.md           │   │
│  │  • Defines shot prompts in public/glass-prompt.md         │   │
│  │  • Registers templates in templateRegistry.ts             │   │
│  └──────────────────────────────────────────────────────────┘   │
│                            │                                      │
│                            ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              SHARED FILES                                 │   │
│  │  • public/tele-knowledge.md → WHAT tele knows             │   │
│  │  • public/glass-prompt.md → HOW tele responds             │   │
│  │  • Template Components → WHAT user sees                   │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                       RUNTIME                                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              RUNTIME AGENT (Catherine/GPT 5.0)            │   │
│  │  • Reads public/tele-knowledge.md for domain facts        │   │
│  │  • Reads public/glass-prompt.md for response patterns     │   │
│  │  • Calls navigateToSection() tool every turn              │   │
│  │  • Speaks naturally to users                              │   │
│  └──────────────────────────────────────────────────────────┘   │
│                            │                                      │
│                            ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              GLASS (React App)                            │   │
│  │  • Receives navigateToSection calls                       │   │
│  │  • Renders templates from templateRegistry                │   │
│  │  • Handles volumetric navigation (clicks → notifyTele)    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. PROJECT OVERVIEW

This is **Mobeus University** — a teaching platform where Catherine (the Runtime Agent) teaches developers how to build teles (conversational AI applications).

### Core Identity
- **Tele:** Catherine — A hackathon prep programming teacher
- **Audience:** Developers learning to build teles
- **Mission:** Teach the Tele Builder Hackathon curriculum
- **Platform:** Mobeus Teleglass Platform
- **Design Philosophy:** Zero Friction | Clean Transparency | Reactive Mastery

### The Hackathon Curriculum (3 hours, 6 phases)
| Phase | Time | Focus | Deliverable |
|-------|------|-------|-------------|
| 1. Voice Coding | 0:00-0:30 | Train tele by speaking | 5+ facts, 3+ rules |
| 2. Vibe Coding | 0:30-1:00 | Iterate with Build Agent | Working concept |
| 3. Templates | 1:00-1:30 | Create visual components | 2-3 custom templates |
| 4. Knowledge | 1:30-2:00 | Structure domain knowledge | Knowledge section |
| 5. Rules | 2:00-2:30 | Define shot prompts | 10+ shot prompts |
| 6. Design | 2:30-3:00 | Polish and ship | Production-ready tele |

---

## 3. KEY FILES

### Shared Between Agents (in /public)
| File | Purpose | Line Limit |
|------|---------|------------|
| `public/tele-knowledge.md` | Domain knowledge — what Catherine knows | ~150 lines |
| `public/glass-prompt.md` | Tool definition — templates, shot prompts | ~1400 lines |

### Build Agent Reference
| File | Purpose |
|------|---------|
| `AGENT.md` | This file — Build Agent reference |
| `src/data/templateRegistry.ts` | Template registry (19 templates) |
| `.agent/workflows/*.md` | Workflow definitions |

### Glass Application
| File | Purpose |
|------|---------|
| `src/pages/Index.tsx` | Main page, navigateToSection implementation |
| `src/components/TeleglassSection.tsx` | Avatar, chat, controls |
| `src/components/DynamicSectionLoader.tsx` | Template renderer |

---

## 4. TEMPLATE REGISTRY (19 Templates)

### Current Templates
| Category | Templates |
|----------|-----------|
| **Hackathon** | HackathonTimeline, PhaseOverview, ReadinessCheck, ReadinessAssessment, ReadinessExperience |
| **Concept Teaching** | ConceptCard, ConceptExplainer, TalkingPoints, ProcessSteps |
| **Navigation** | CardGrid, WelcomeCarousel, CTABanner |
| **Layout & Content** | SplitContent, AccordionList |
| **Tools & Code** | ToolCard, CodeBlock |
| **Live Viewers** | KnowledgeFileViewer, PromptFileViewer, FolderStructure |

---

## 5. WORKFLOWS

### /add-glass — Add Template
Create a new visual component:
1. Create `src/components/templates/[Name].tsx`
2. Use centralized CSS classes from `src/index.css`
3. Every clickable → `notifyTele(actionPhrase)`
4. Register in `src/data/templateRegistry.ts`
5. Add schema to `public/glass-prompt.md`
6. Verify: `npx tsc --noEmit`

### /add-knowledge — Add Domain Knowledge
Add to `public/tele-knowledge.md`:
1. Use compact YAML-like notation
2. Focus on WHAT tele knows
3. Keep concise and efficient

### /tele-should — Add Shot Prompt
Add response mapping to `public/glass-prompt.md`:
1. Format: `USER: "phrase"` → `navigateToSection: {json}` → `TELE SAYS: "response"`
2. Always call navigateToSection
3. Maintain natural speech patterns

---

## 6. THE 5 IMMUTABLE LAWS

1. **VOLUMETRIC NAVIGATION** — Every clickable MUST call `notifyTele(actionPhrase)`. NO DEAD ENDS.
2. **TOOL SIGNATURE STABILITY** — `navigateToSection` signature MUST NEVER change.
3. **NO HALLUCINATION** — If a feature isn't documented, acknowledge it.
4. **MANDATORY TOOL CALL** — Catherine calls `navigateToSection` in EVERY response.
5. **FACTUAL ACCURACY** — Use EXACT figures from `public/tele-knowledge.md`.

---

## 7. CENTRALIZED STYLING

**ALL STYLES MUST BE IN `src/index.css`**

### Brand Colors (8-Color Palette)
| Color | Hex | Use |
|-------|-----|-----|
| Mist | `#F5F5F5` | Text, icons |
| Onyx | `#0D0D0D` | Backgrounds |
| Flamingo | `#9B5DE5` | CTAs, primary (purple) |
| Wave | `#003D4F` | Dark teal bg |
| Turmeric | `#CC850A` | Secondary |
| Jade | `#5EEAD4` | Success |
| Sapphire | `#47A1AD` | Default buttons |
| Amethyst | `#7C3AED` | Accents |

### CSS Classes
- **Containers:** `glass-template-container`, `glass-image-container`
- **Cards:** `glass-card-minimal`, `glass-card-standard`, `glass-card-featured`, `glass-card-clickable`
- **Typography:** `text-template-title`, `text-template-subtitle`, `text-template-content`
- **Buttons:** `btn-cta`, `btn-sapphire`, `btn-turmeric`, `btn-ghost`
- **Grids:** `template-grid-2`, `template-grid-3`, `template-grid-4`

### ❌ DON'T
```tsx
<div className="bg-mist/10 border border-mist/20 rounded-2xl p-6">
```

### ✅ DO
```tsx
<div className="glass-template-container">
```

---

## 8. SMARTIMAGE SYSTEM

Hybrid image system that auto-chooses between pre-generated and AI-generated:

```
assetId → Check ASSET_REGISTRY → Found? → Load file
                    │
                    └── Not found? → AI Generate → Cache
```

### Usage
```tsx
<SmartImage 
  assetId={imageUrl || imagePrompt}
  alt={title}
  className="smart-image"
/>
```

---

## 9. DEVELOPMENT

```bash
npm run dev -- --port 3131    # Start dev server
npx tsc --noEmit              # Type check
npm run build                 # Production build
```

### Debug Mode
- **Shift+K** — Toggle TeleAcknowledge debug toasts

---

## 10. TEMPLATE SKELETON

```tsx
/**
 * [TemplateName]
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Every clickable element calls notifyTele()
 */
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
    <div className="glass-template-container">
      {items.map((item, i) => (
        <div 
          key={i} 
          className="glass-card-standard glass-card-clickable"
          onClick={() => handleAction(item.actionPhrase)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};
```

---

## 11. QUICK REFERENCE

### Navigation Flow
```
User clicks → playClick() → notifyTele(actionPhrase) → sendToTele() 
  → UIFramework.TellTele() → Catherine processes → navigateToSection() 
  → DynamicSectionLoader renders → User sees new templates → ∞
```

### Window Globals
- `window.navigateToSection(data)` — Main tool for Catherine → Glass
- `window.showEmotion(emotion)` — Trigger avatar emotion
- `window.teleConnect` — Connect avatar
- `window.teleNavigation` — Navigation API

---

## 12. SITE FUNCTION REGISTRATION

Site functions are how the **Runtime Agent (Catherine)** operates the **Glass (React app)**. When you create a new site function, follow this complete process:

### Registration Steps

| Step | File | Action |
|------|------|--------|
| **1** | `index.html` | Create bridge in `UIFrameworkSiteFunctions` registry |
| **2** | `vite-env.d.ts` | Declare TypeScript types for `Window` interface |
| **3** | `uiFrameworkRegistration.ts` | Add to `NavigationAPI` interface |
| **4** | `Index.tsx` | Implement function in `teleNavigation` object |
| **5** | `Index.tsx` | Clean up in useEffect return |
| **6** | **CONNECT TO APP** | ⚠️ Backend discovers new functions on first connection |

### ⚠️ CRITICAL: Backend Discovery

**When the app loads for the first time and connects to the backend:**

1. The UIFramework reads `window.UIFrameworkSiteFunctions` registry
2. Backend compares against its current list of registered functions
3. **New functions are automatically discovered and registered**
4. Backend now has an updated list of available site functions
5. Runtime Agent (Catherine) can now call the new function

**This means:** After adding a new site function, you MUST load the app and establish a connection for the backend to discover and register it. The function won't be available to Catherine until this discovery happens.

### Bridge Pattern (index.html)

```javascript
const myFunctionBridge = {
  myNewFunction(param) {
    if (typeof param !== "string") return undefined;
    if (typeof window !== "undefined" && 
        typeof window.myNewFunction === "function") {
      return window.myNewFunction(param);
    }
    return undefined;
  },
};

// Merge into registry
window.UIFrameworkSiteFunctions = {
  ...existingRegistry,
  ...myFunctionBridge,
};
```

### Existing Site Functions
| Function | Purpose |
|----------|---------|
| `navigateToSection` | Main navigation tool — renders templates |
| `flashTele` | Flash avatar ring effect |
| `setVolume` / `adjustVolume` / `getVolume` | Avatar volume control |
| `startWebcam` / `stopWebcam` | Webcam control |
| `zoomLevel` | UI zoom control |
| `externalCall` | External API integration |
| `dynamicDataLoader` | Load dynamic JSON data |
| `auther` / `checker` / `getCookieValue` | Authentication functions |

---

*Mobeus University — Teaching the World to Build Teles*
*Two-Agent Architecture: Build Agent (Claude) + Runtime Agent (Catherine/GPT 5.0)*
*Catherine v63.0 | Zero Friction Release | January 18, 2026*
