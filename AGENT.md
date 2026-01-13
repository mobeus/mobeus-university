# 🤖 AGENT.md - Fiserv DMA Development Reference

> **Digital Merchant Acquisition Platform**
> Last updated: January 13, 2026

---

## 1. PROJECT OVERVIEW

This is the **Fiserv DMA** platform - an AI-powered enterprise sales guide for banks evaluating merchant acquiring solutions.

### Core Components
| Component | File/Location | Purpose |
|-----------|---------------|---------|
| **Tele** | External AI | Voice agent that SPEAKS and calls `navigateToSection` |
| **Glass** | This codebase | React app that DISPLAYS templates based on Tele commands |
| **glass-generator-prompt.md** | Root | Instructions for Tele on HOW to generate Glass JSON |
| **tele-knowledge.md** | Root | Domain knowledge for Tele on WHAT to say |

### Architecture Flow
```
User speaks → Tele processes → Tele calls navigateToSection(JSON) → Glass renders templates
```

---

## 2. TEMPLATE LIBRARY (6 Templates)

### Available Templates
| Template | Purpose | Key Props |
|----------|---------|-----------|
| **ProblemSolutionMatrix** | Map problems to solutions | `problems[]`, `solutions[]` |
| **OnboardingJourney** | Step-by-step timeline | `steps[]`, `totalDuration` |
| **FeatureGrid** | Feature cards in grid | `features[]`, `columns` |
| **DataTable** | Sortable data table | `columns[]`, `rows[]` |
| **SplitContent** | Image + text layout | `title`, `content`, `bulletPoints[]` |
| **IconList** | Icon list (grid/vertical) | `items[]`, `layout` |

### Template Registry
Location: `src/data/templateRegistry.ts`

```typescript
export const TEMPLATE_REGISTRY = {
    ProblemSolutionMatrix,
    OnboardingJourney,
    FeatureGrid,
    DataTable,
    SplitContent,
    IconList
};
```

---

## 3. NAVIGATION MENU (Buyer Journey)

| # | Label | Triggers | Purpose |
|---|-------|----------|---------|
| 1 | **HOME** | Welcome screen | Platform overview |
| 2 | **VALUE** | ProblemSolutionMatrix | What problems we solve |
| 3 | **PLATFORM** | OnboardingJourney | Full platform walkthrough |
| 4 | **BENEFITS** | IconList | Key capabilities |
| 5 | **PRICING** | DataTable | Fee structure & transparency |
| 6 | **NEXT STEPS** | FeatureGrid | How to proceed |

---

## 4. KEY FILES

### Core Files
| File | Purpose |
|------|---------|
| `src/pages/Index.tsx` | Main app entry, navigation handling |
| `src/components/Navigation.tsx` | Top navigation bar |
| `src/components/TeleglassSection.tsx` | Template rendering |
| `src/data/templateRegistry.ts` | Template lazy loading |

### Documentation Files
| File | Purpose |
|------|---------|
| `glass-generator-prompt.md` | Tele instructions for generating JSON |
| `tele-knowledge.md` | Domain knowledge for Tele |
| `AGENT.md` | This file - developer reference |

### Template Files
| File | Template |
|------|----------|
| `src/components/templates/ProblemSolutionMatrix.tsx` | Problem-solution mapping |
| `src/components/templates/OnboardingJourney.tsx` | Timeline steps |
| `src/components/templates/FeatureGrid.tsx` | Feature cards |
| `src/components/templates/DataTable.tsx` | Sortable table |
| `src/components/templates/SplitContent.tsx` | Image + text |
| `src/components/templates/IconList.tsx` | Icon list |

---

## 5. TELE INTEGRATION

### navigateToSection Tool
Tele calls this tool to update what the user sees:

```json
{
  "badge": "BADGE_TEXT",
  "title": "Section Title",
  "subtitle": "Optional subtitle",
  "generativeSubsections": [
    {
      "id": "unique-id",
      "templateId": "TemplateName",
      "props": { /* template-specific props */ }
    }
  ]
}
```

### showTele / notifyTele
Every interactive element MUST trigger Tele:

```typescript
import { notifyTele } from "@/utils/acknowledgmentHelpers";

// On click
notifyTele("Show me more about this feature");
```

---

## 6. STYLING

### Design System
- **Primary Color:** Emerald (`emerald-500`)
- **Background:** Dark glass (`bg-black/20 backdrop-blur-2xl`)
- **Borders:** `border-white/10`
- **Text:** White with transparency (`text-white/70`)

### Glass Effect Pattern
```css
.glass-panel {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 7. DEVELOPMENT COMMANDS

```bash
# Start dev server
npm run dev -- --port 8591

# Type check
npx tsc --noEmit

# Build
npm run build
```

---

## 8. CONSTRAINTS

### Immutable Rules
1. **Tool Signature Stability** — `navigateToSection` MUST NEVER change
2. **Interactive Tele-Action** — EVERY clickable MUST have `showTele` action
3. **Mandatory Tool Call** — `navigateToSection` in EVERY Tele response

### File Limits
| File | Max Lines |
|------|-----------|
| glass-generator-prompt.md | 1200 |
| tele-knowledge.md | 600 |
| Template files | 600 each |

### Template Budget
- Maximum 6 templates in registry
- Each template must have shot prompts in glass-generator-prompt.md

---

## 9. BUYER PERSONAS

| Persona | Focus | What They Want |
|---------|-------|----------------|
| **Sales Leaders** | Revenue growth | Pricing flexibility, acquisition speed |
| **Operations Teams** | Efficiency | Automation, exception handling |
| **Risk Teams** | Compliance | Underwriting controls, fraud prevention |
| **Relationship Managers** | Retention | Self-service, transparency |

---

## 10. THE MERCHANT LIFECYCLE

### 5 Stages
1. **ONBOARDING** — Merchant compliance, KYC, setup
2. **ACTIVATION** — Go-live, device fulfillment
3. **OPERATIONS** — Transactions, daily processing
4. **SETTLEMENT** — Fees, funding, reconciliation
5. **RELATIONSHIP** — Account management, growth

---

*This document is the authoritative technical reference for the Fiserv DMA platform.*
