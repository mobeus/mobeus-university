---
description: Add a new experience/template to the platform
---

# Add Experience Workflow

When adding a new template (called an "experience"), follow these steps:

## Prerequisites
- Template name should be PascalCase (e.g., `InterviewCoach`, `JobDetails`)
- **[!] TEMPLATE NAMES MUST BE GENERIC** — Reusable across different teles, not specific to one domain
- Understand what props the template needs
- **[!] ALL STYLES MUST USE CENTRALIZED CSS CLASSES FROM `src/index.css`**
- **[!] EVERY CLICKABLE ELEMENT MUST CALL `notifyTele(actionPhrase)` — NO DEAD ENDS**

### Template Naming Convention

| ❌ Too Specific (Avoid) | ✅ Generic (Preferred) |
|------------------------|------------------------|
| `HackathonTimeline` | `ProcessSteps` |
| `WealthPillars` | `AccordionList` |
| `MercedesShowcase` | `ImageCarousel` |
| `SalesMetrics` | `CardGrid` |

**Why?** Templates must be reusable when users go off-journey. The 5 utility shot prompts need templates that work for ANY context.

**After creating:** Run `/audit-tele` to verify naming and registration.

## [!] CRITICAL: VOLUMETRIC NAVIGATION (LAW #1)

This is a **VOLUMETRIC CONVERSATIONAL PRODUCT**. Every click continues the conversation.

**The Rule**: EVERY clickable element (card, button, list item, metric, icon, link, image) MUST:
1. Have `cursor-pointer` styling
2. Call `notifyTele(actionPhrase)` on click
3. Play click sound via `useSound` hook
4. Include `actionPhrase` in props for dynamic content

**Example**:
```tsx
const handleAction = (actionPhrase: string) => {
  playClick();
  notifyTele(actionPhrase);
};

// In JSX
<div 
  className="glass-card-standard glass-card-clickable"
  onClick={() => handleAction("Show me more about this topic")}
>
```

## Steps

// turbo
1. Create the template component:
   - File: `src/components/templates/[Name].tsx`
   - Include TypeScript interface for props
   - **USE CENTRALIZED CSS CLASSES ONLY** (see below)
   - **EVERY CLICKABLE ELEMENT CALLS `notifyTele(actionPhrase)`**
   - Include `actionPhrase` in props for all clickable content

// turbo
2. Register the template in templateRegistry.ts:
   - Add lazy import to `src/data/templateRegistry.ts`
   - Follow existing pattern: `[Name]: lazy(() => import("@/components/templates/[Name]").then(m => ({ default: m.[Name] })))`

3. Add template schema to glass-generator-prompt.md:
   - Find the "Template Schemas" section
   - Add the template name with its props interface
   - **Include `actionPhrase` for all clickable content props**
   - Keep it compact (3-5 lines max)

4. Add shot prompt to glass-generator-prompt.md:
   - Find the "Shot Prompts" section
   - Add example of USER prompt → Tele response with navigateToSection JSON
   - Include what Tele should SAY after

// turbo
5. Verify TypeScript compiles:
   ```bash
   npx tsc --noEmit
   ```

6. Test in browser:
   - Send a prompt to Tele that should trigger the new template
   - Verify template renders correctly
   - **Verify EVERY clickable element triggers Catherine response**

---

## IMAGE HANDLING

### Hybrid Image System
Templates use `SmartImage` which automatically:
1. Checks if `assetId` matches pre-generated asset → loads instantly
2. If NOT in registry → treats as prompt → AI generates (~3-5s)

### Template Props for Images
```typescript
interface TemplateImageProps {
  imageUrl?: string;      // Path to pre-generated asset
  imagePrompt?: string;   // Prompt for AI generation
}
```

### Usage Pattern in Templates
```tsx
import { SmartImage } from '@/components/ui/SmartImage';

// In the template:
<SmartImage 
  assetId={imageUrl || imagePrompt}
  alt={title}
  className="smart-image"
/>
```

### Guidelines
| Scenario | Use |
|----------|-----|
| Logos, avatars, badges | `imageUrl` (pre-generated) |
| Abstract concepts, diagrams | `imagePrompt` (AI-generated) |
| Product screenshots | `imageUrl` (pre-generated) |

---

## [!] CRITICAL: CENTRALIZED STYLING

### DO NOT use inline Tailwind classes like this:
```tsx
// ❌ BAD - Will be rejected
<div className="bg-mist/10 border border-mist/20 rounded-2xl p-6 backdrop-blur-sm">
```

### USE centralized CSS classes:
```tsx
// ✅ GOOD - Use this
<div className="glass-template-container">
```

### Available CSS Classes (from src/index.css)

**Containers:**
- `glass-template-container` — Main template panel
- `glass-image-container` — Image sections

**Cards:**
- `glass-card-minimal` — Subtle cards
- `glass-card-standard` — Standard cards
- `glass-card-featured` — Prominent cards
- `glass-card-clickable` — Add for interactive cards

**Buttons:**
- `btn-cta` — Flamingo (primary CTA)
- `btn-sapphire` — Sapphire blue (default)
- `btn-turmeric` — Turmeric yellow (secondary)
- `btn-ghost` — Minimal outline

**Typography:**
- `text-template-title` — Headings (mist/white)
- `text-template-subtitle` — Subtitles (flamingo)
- `text-template-content` — Body text (mist/70)
- `text-template-bullet` — List items (mist/80)

**Layouts:**
- `template-grid-2`, `template-grid-3`, `template-grid-4` — Grid layouts
- `template-flex-row`, `template-flex-col` — Flex layouts

**Lists:**
- `template-list` — List container
- `template-list-item` — List item row
- `template-list-icon` — Icon (flamingo color)

**Badges:**
- `template-badge` — Flamingo
- `template-badge-sapphire` — Sapphire
- `template-badge-turmeric` — Turmeric
- `template-badge-mist` — Mist/white

**Metrics:**
- `template-metric` — Container
- `template-metric-value` — Big number
- `template-metric-label` — Label

**Icons:**
- `template-icon-container` — Icon wrapper (40px)
- `template-icon-container-lg` — Large icon wrapper (56px)

**Dividers:**
- `template-divider` — Horizontal separator
- `template-divider-vertical` — Vertical separator

### Need a New Style?

If existing classes don't cover your need:
1. **Add it to `src/index.css`** in the appropriate section
2. **Name it semantically** (e.g., `.glass-card-pricing`)
3. **Document it** in AGENT.md
4. **Use it** via the class name

---

## Template Skeleton

```tsx
/**
 * [TemplateName]
 * [Brief description]
 * 
 * STYLING: Uses centralized CSS classes from index.css
 * NAVIGATION: Every clickable element calls notifyTele()
 */

import React from 'react';
import { [Icons] } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';

interface [TemplateName]Props {
  // Include actionPhrase for all clickable content
  items?: Array<{
    title: string;
    description?: string;
    actionPhrase: string;  // REQUIRED for volumetric navigation
  }>;
}

export const [TemplateName]: React.FC<[TemplateName]Props> = ({ items = [] }) => {
  const { playClick } = useSound();

  // Standard handler for ALL clickable elements
  const handleAction = (actionPhrase: string) => {
    playClick();
    notifyTele(actionPhrase);
  };

  return (
    <div className="glass-template-container">
      <div className="template-grid-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="glass-card-standard glass-card-clickable"
            onClick={() => handleAction(item.actionPhrase)}
          >
            <h3 className="text-template-title">{item.title}</h3>
            <p className="text-template-content">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default [TemplateName];
```

---

## VERIFICATION CHECKLIST (MANDATORY)

After creating EVERY template, verify ALL boxes:

### Step 1: Code Quality
```
□ TypeScript compiles: npx tsc --noEmit
□ No inline Tailwind classes (grep for "className=" and check)
□ All CSS classes exist in index.css
□ Proper null checks: items?.map, item?.title
```

### Step 2: Volumetric Navigation (CRITICAL)
```
□ EVERY clickable element has onClick={() => handleAction(actionPhrase)}
□ handleAction calls playClick() then notifyTele()
□ actionPhrase is in props (not hardcoded)
□ glass-card-clickable class on clickable elements
□ NO dead-end clicks (console.log, empty handlers)
```

### Step 3: Registration
```
□ Added to src/data/templateRegistry.ts
□ Lazy import pattern correct
□ Template name matches export
```

### Step 4: Documentation (glass-prompt.md)
```
□ Added USE WHEN trigger conditions
□ JSON schema with types (required vs optional)
□ Example valid JSON
□ Common mistakes section if complex
```

### Step 5: Visual Testing
```
□ Renders in browser without errors
□ Responsive: mobile + desktop
□ Dark glass aesthetic maintained
□ Hover effects working
```

### Step 6: Tele Testing
```
□ Tele selects template correctly for trigger phrases
□ Tele sends valid props (no runtime errors)
□ Clicks continue conversation (volumetric navigation works)
```

---

## [!] COMMON MISTAKES TO AVOID

### 1. Dead-End Clicks (CRITICAL)
```tsx
// [-] WRONG - Dead end!
<div onClick={() => console.log('clicked')}>

// [-] WRONG - No actionPhrase
<div onClick={() => notifyTele("hardcoded string")}>

// [+] CORRECT
<div onClick={() => handleAction(item.actionPhrase)}>
```

### 2. Missing Null Safety
```tsx
// [-] WRONG - Will crash if items undefined
{items.map(item => <div>{item.title}</div>)}

// [+] CORRECT
{items?.map((item, index) => (
  <div key={index}>{item?.title || 'Untitled'}</div>
))}
```

### 3. Inline Tailwind
```tsx
// [-] WRONG - Breaks centralized styling
<div className="bg-white/10 p-4 rounded-lg border">

// [+] CORRECT
<div className="glass-card-standard">
```

### 4. Forgot to Register
```tsx
// [-] Template exists but won't render!
// MUST add to src/data/templateRegistry.ts:
MetricsGrid: lazy(() => import("@/components/templates/MetricsGrid")
  .then(m => ({ default: m.MetricsGrid }))),
```

### 5. Props Mismatch with Tele
```tsx
// [-] Template expects array, Tele sends string
interface Props { metrics: Metric[] }  // Component expects array
// But public/glass-prompt.md shows: "metrics": "40-60%"  // Wrong!

// [+] public/glass-prompt.md must match exactly:
// "metrics": [{ "value": "40-60%", "label": "Cost Reduction", "actionPhrase": "..." }]
```

### 6. Missing handleAction Pattern
```tsx
// [-] WRONG - No sound, direct call
onClick={() => notifyTele(actionPhrase)}

// [+] CORRECT - Sound + call
const handleAction = (actionPhrase: string) => {
  playClick();
  notifyTele(actionPhrase);
};
onClick={() => handleAction(item.actionPhrase)}
```

---

## Quick Reference

### Required Imports
```tsx
import React from 'react';
import { [Icons] } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';  // If images
```

### Required Hook
```tsx
const { playClick } = useSound();
```

### Required Handler
```tsx
const handleAction = (actionPhrase: string) => {
  playClick();
  notifyTele(actionPhrase);
};
```

### Required Props Pattern
```tsx
interface TemplateProps {
  items?: Array<{
    title: string;
    description?: string;
    actionPhrase: string;  // REQUIRED for clickable
  }>;
  imageUrl?: string;       // Pre-generated asset
  imagePrompt?: string;    // AI-generated
}
```

