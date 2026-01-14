# 🤖 AGENT.md - Fiserv DMA Development Reference

> **Digital Merchant Acquisition Platform**
> Last updated: January 14, 2026

---

## 1. PROJECT OVERVIEW

This is the **Fiserv DMA** platform - an AI-powered enterprise sales guide for banks evaluating merchant acquiring solutions.

### What This Platform Does
Tele (the AI voice agent) helps **bank executives** understand the DMA Offer Engine by:
1. Explaining why DMA matters and what value both the bank AND merchant get
2. Walking through the merchant experience to address friction concerns
3. Answering technical and business questions about integration
4. **Booking a follow-up meeting with Fiserv** to start integration

### Core Components
| Component | File/Location | Purpose |
|-----------|---------------|---------|
| **Tele** | External AI | Voice agent that SPEAKS and calls `navigateToSection` |
| **Glass** | This codebase | React app that DISPLAYS templates based on Tele commands |
| **glass-generator-prompt.md** | Root | Instructions for Tele on HOW to generate Glass JSON |
| **tele-knowledge.md** | Root | Domain knowledge for Tele on WHAT to say |

### Context Circle
```
┌─────────────────────────────┐
│     tele-knowledge.md       │  ← WHAT Tele knows and says
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│  glass-generator-prompt.md  │  ← HOW Tele shows it (templates + JSON)
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│   Template Components       │  ← WHAT the user sees (React)
└─────────────────────────────┘
```

---

## 2. TEMPLATE LIBRARY

### Generic Templates (Use for ANY content type)
| Template | Purpose | Key Props |
|----------|---------|-----------|
| **FeatureGrid** | Feature cards with icons | `features[]`, `columns` |
| **FeatureCallouts** | Large icon boxes | `callouts[]`, `columns` |
| **ImageCards** | Cards with 16:9 images | `offers[]`, `columns` |
| **SplitContent** | Image + text layout | `title`, `content`, `bulletPoints[]` |
| **ComparisonTable** | Side-by-side compare | `options[]`, `features[]` |
| **IconList** | Icon list | `items[]`, `layout` |
| **DataTable** | Sortable table | `columns[]`, `rows[]` |
| **MetricsGrid** | KPI cards | `metrics[]`, `columns` |
| **FAQAccordion** | Expandable Q&A | `items[]` |
| **TimelineRoadmap** | Timeline phases | `phases[]` |
| **ArchitectureDiagram** | System flow | `nodes[]`, `connections[]` |
| **TeamCards** | People profiles | `members[]` |
| **ContactCard** | Contact options | `contacts[]` |
| **Scheduler** | Meeting booking | `meetingDate`, `meetingTime` |
| **Celebration** | Success screen | `title`, `message`, `confetti` |

### Fiserv-Specific Templates (Do Not Rename)
| Template | Purpose |
|----------|---------|
| **BankPortalMockup** | Bank portal with offer carousel |
| **OnboardingStep** | Single step in 10-step flow |

---

## 3. NAVIGATION MENU (6 Items)

| # | Label | Purpose |
|---|-------|---------|
| 1 | **HOME** | Welcome overview |
| 2 | **BANK PORTAL** | Show offer in bank portal |
| 3 | **DEVICES** | Clover device comparison |
| 4 | **ONBOARDING** | 10-step carousel |
| 5 | **INTEGRATION** | One API details |
| 6 | **BOOK DEMO** | Book meeting |

---

## 4. KEY FILES

| File | Purpose | Max Lines |
|------|---------|-----------|
| `glass-generator-prompt.md` | Tele instructions | 1200 |
| `tele-knowledge.md` | Domain knowledge | 400 |
| `src/data/templateRegistry.ts` | Template registry | - |
| `src/pages/Index.tsx` | Main app entry | - |
| `src/components/Navigation.tsx` | Top nav bar | - |

---

## 5. TELE INTEGRATION

### navigateToSection Tool
```json
{
  "badge": "BADGE_TEXT",
  "title": "Section Title",
  "subtitle": "Optional subtitle",
  "generativeSubsections": [
    { "id": "unique-id", "templateId": "TemplateName", "props": { } }
  ]
}
```

### sendToTele / notifyTele
Every interactive element MUST trigger Tele with "Show" prefix:
```typescript
import { sendToTele } from "@/utils/teleInteraction";
sendToTele("Show me more about this feature");  // ALWAYS starts with "Show"
```

---

## 6. 4 IMMUTABLE LAWS

1. **Tool Signature Stability** — `navigateToSection` MUST NEVER change
2. **Interactive Tele-Action** — EVERY clickable MUST have action phrase starting with "Show"
3. **Mandatory Tool Call** — `navigateToSection` in EVERY Tele response
4. **Factual Accuracy** — Use EXACT figures from tele-knowledge.md

---

## 7. DEVELOPMENT COMMANDS

```bash
npm run dev -- --port 8591    # Start dev server
npx tsc --noEmit              # Type check
npm run build                 # Build production
```

---

## 8. THE SALES FLOW

### Tele's 5-Step Journey
1. **Build Value** — Explain why DMA matters
2. **Show the Experience** — Walk through merchant journey
3. **Answer Questions** — Handle technical and business questions
4. **Address Friction** — 10 steps = compliance done right
5. **Book the Appointment** — Schedule follow-up with Fiserv

**Ultimate Goal:** Every conversation ends with opportunity to **book a meeting**.

---

*This document is the authoritative technical reference for the Fiserv DMA platform.*
